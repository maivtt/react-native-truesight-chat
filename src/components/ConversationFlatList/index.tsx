import React from 'react';
import type { PropsWithChildren, ReactElement } from 'react';
import nameof from 'ts-nameof.macro';
import { useList } from '../../hooks/use-list';
import TruesightChat, {
  Conversation,
  ConversationFilter,
} from 'react-native-truesight-chat';
import { SearchField } from '../../types/Search';
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
    navigation,
    target,
    renderItem,
    style,
    containerStyle,
    contentContainerStyle,
    avatarContainerStyle,
    textLabelStyle,
    textDescriptionStyle,
    unreadComponent,
    avatar,
    avatarRadius,
  } = props;

  const [list, , loading, refreshing, , handleLoadMore, handleRefresh] =
    useList<Conversation, ConversationFilter, SearchField.NAME>(
      ConversationFilter,
      TruesightChat.listConversation,
      TruesightChat.countConversation,
      SearchField.NAME
    );

  const renderDefaultItem: ListRenderItem<Conversation> = React.useCallback(
    ({ item, index }: ListRenderItemInfo<Conversation>) => {
      return (
        <TouchableOpacity
          key={index}
          style={[atomicStyles.flexRowCenter, containerStyle]}
          onPress={() => {
            if (target) {
              navigation.navigate(target!, {
                conversation: item,
              });
            }
          }}
        >
          {avatar && (
            <View style={[avatarContainerStyle]}>
              <Avatar radius={avatarRadius ?? 50} source={item?.avatar} />
            </View>
          )}

          <View
            style={[
              atomicStyles.flex,
              atomicStyles.ml4,
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
      avatar,
      avatarContainerStyle,
      avatarRadius,
      containerStyle,
      contentContainerStyle,
      navigation,
      target,
      textDescriptionStyle,
      textLabelStyle,
      unreadComponent,
    ]
  );

  return (
    <>
      <FlatList
        style={style}
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

  style?: StyleProp<ViewStyle>;

  containerStyle?: StyleProp<ViewStyle>;

  contentContainerStyle?: StyleProp<ViewStyle>;

  avatarContainerStyle?: StyleProp<ViewStyle>;

  headerContainerStyle?: StyleProp<ViewStyle>;

  textLabelStyle?: StyleProp<TextStyle>;

  textDescriptionStyle?: StyleProp<TextStyle>;

  unreadComponent?: ReactElement;

  navigation: any;

  target: string;

  avatar?: boolean;

  avatarRadius?: number;
}

ConversationFlatList.defaultProps = {
  avatar: true,
};

ConversationFlatList.displayName = nameof(ConversationFlatList);

export default ConversationFlatList;
