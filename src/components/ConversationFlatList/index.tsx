import React from 'react';
import type { PropsWithChildren, ReactElement } from 'react';
import nameof from 'ts-nameof.macro';
import { useList } from '../../hooks/use-list';
import { Conversation, ConversationFilter } from 'react-native-truesight-chat';
import { SearchField } from '../../types/Search';
import { conversationRepository } from '../../../example/src/repositories/conversation-repository';
import { END_REACHED_THRESHOLD } from '../../../example/src/config/consts';
import {
  FlatList,
  ListRenderItem,
  ListRenderItemInfo,
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import ListLoading from '../atoms/ListLoading';
import ListFooter from '../atoms/ListFooter';
import atomicStyles from '../../styles';
import Avatar from '../atoms/Avatar';
import { getConversationName } from '../../helper/string-helper';
import SvgIcon from '../atoms/SvgIcon/SvgIcon';
import { conversationFlatListStyles } from './ConversationFlatList.styles';

export function ConversationFlatList(
  props: PropsWithChildren<ConversationFlatListProps>
): ReactElement {
  const {
    renderItem,
    containerStyle,
    contentContainerStyle,
    avatarContainerStyle,
    textLabelStyle,
    textDescriptionStyle,
    unreadComponent,
    onPress,
  } = props;

  const [list, , loading, refreshing, , handleLoadMore, handleRefresh] =
    useList<Conversation, ConversationFilter, SearchField.NAME>(
      ConversationFilter,
      conversationRepository.list,
      conversationRepository.count,
      SearchField.NAME
    );

  const renderDefaultItem: ListRenderItem<Conversation> = React.useCallback(
    ({ item, index }: ListRenderItemInfo<Conversation>) => {
      return (
        <TouchableOpacity
          key={index}
          style={[atomicStyles.flexRowCenter, containerStyle]}
          onPress={() => {
            if (onPress) {
              onPress(item);
            }
          }}
        >
          <View style={[avatarContainerStyle]}>
            <Avatar radius={50} source={item?.avatar} />
          </View>
          <View
            style={[
              atomicStyles.flex,
              atomicStyles.mx4,
              atomicStyles.py3,
              atomicStyles.justifyContentBetween,
              contentContainerStyle,
            ]}
          >
            <Text
              style={[
                atomicStyles.h4,
                atomicStyles.medium,
                item?.countUnread &&
                  item?.countUnread > 0 &&
                  atomicStyles.medium,
                textLabelStyle,
              ]}
              numberOfLines={1}
            >
              {getConversationName(item)}
            </Text>
            <View style={[atomicStyles.flexRowBetween]}>
              <Text
                style={[
                  atomicStyles.h5,
                  atomicStyles.light,
                  atomicStyles.flex,
                  textDescriptionStyle,
                ]}
                numberOfLines={1}
              >
                {item?.latestContent}
              </Text>
              {item?.latestGlobalUser && (
                <View style={[atomicStyles.justifyContentEnd]}>
                  {unreadComponent ?? (
                    <>
                      {item?.countUnread && item.countUnread > 0 ? (
                        <View style={[conversationFlatListStyles.unread]}>
                          <Text
                            style={[
                              atomicStyles.h6,
                              atomicStyles.medium,
                              conversationFlatListStyles.textUnread,
                            ]}
                          >
                            {item?.countUnread > 99 ? '99+' : item?.countUnread}
                          </Text>
                        </View>
                      ) : (
                        <SvgIcon
                          component={require('../../../assets/icons/check.svg')}
                        />
                      )}
                    </>
                  )}
                </View>
              )}
            </View>
          </View>
        </TouchableOpacity>
      );
    },
    [
      avatarContainerStyle,
      containerStyle,
      contentContainerStyle,
      onPress,
      textDescriptionStyle,
      textLabelStyle,
      unreadComponent,
    ]
  );

  return (
    <>
      <FlatList
        renderItem={renderItem ?? renderDefaultItem}
        data={list}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item: Conversation) => item.id!.toString()}
        refreshing={refreshing}
        onEndReachedThreshold={END_REACHED_THRESHOLD}
        onEndReached={handleLoadMore}
        onRefresh={handleRefresh}
        ListEmptyComponent={<ListLoading loading={loading} />}
        ListFooterComponent={
          <ListFooter isData={true} check={false} style={atomicStyles.pb4} />
        }
      />
    </>
  );
}

export interface ConversationFlatListProps {
  renderItem?: ListRenderItem<Conversation>;

  containerStyle?: StyleProp<ViewStyle>;

  contentContainerStyle?: StyleProp<ViewStyle>;

  avatarContainerStyle?: StyleProp<ViewStyle>;

  headerContainerStyle?: StyleProp<ViewStyle>;

  textLabelStyle?: StyleProp<TextStyle>;

  textDescriptionStyle?: StyleProp<TextStyle>;

  unreadComponent?: ReactElement;

  onPress?: (conversation: Conversation) => void;
}

ConversationFlatList.defaultProps = {
  //
};

ConversationFlatList.displayName = nameof(ConversationFlatList);

export default ConversationFlatList;
