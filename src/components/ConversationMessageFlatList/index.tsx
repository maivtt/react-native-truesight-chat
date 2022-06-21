import React from 'react';
import './ConversationMessageFlatList.scss';
import type { PropsWithChildren, ReactElement } from 'react';
import nameof from 'ts-nameof.macro';
import type {
  Conversation,
  ConversationMessage,
} from 'react-native-truesight-chat';
import {
  FlatList,
  ListRenderItem,
  ListRenderItemInfo,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';
import { LoadingStatus, useList } from '../../hooks/use-list';
import { END_REACHED_THRESHOLD } from '../../../example/src/config/consts';
import ListFooter from '../atoms/ListFooter';
import TruesightChat, {
  ConversationMessageFilter,
  TruesightThemeExtension,
} from 'react-native-truesight-chat';
import { SearchField, SearchType } from '../../types/Search';
import MessageItem from '../atoms/MessageItem/MessageItem';
import moment from 'moment';
import { getDate } from '../../helper/string-helper';
import atomicStyles from '../../styles';
import TextLib from '../atoms/TextLib';
import { useThemeValue } from 'react-native-redux-theming';

export function ConversationMessageFlatList(
  props: PropsWithChildren<ConversationMessageFlatListProps>
): ReactElement {
  const { conversation, globalUser, onSwipe, style } = props;
  const messageTextSecondaryColor = useThemeValue<TruesightThemeExtension>(
    'messageTextSecondaryColor'
  );

  const [list, total, loading, refreshing, , handleLoadMore] = useList<
    ConversationMessage,
    ConversationMessageFilter,
    SearchField.NAME
  >(
    ConversationMessageFilter,
    TruesightChat.listConversationMessage,
    TruesightChat.countConversationMessage,
    SearchField.NAME,
    SearchType.CONTAIN,
    {
      ...new ConversationMessageFilter(),
      conversationId: {
        equal: conversation.id,
      },
    }
  );

  const renderItem: ListRenderItem<ConversationMessage> = React.useCallback(
    ({ item, index }: ListRenderItemInfo<ConversationMessage>) => {
      return (
        <MessageItem
          globalUser={globalUser ?? {}}
          conversationMessage={item}
          key={index}
          consecutive={
            index !== 0 && list[index - 1]?.globalUserId === item?.globalUserId
          }
          onSwipe={onSwipe}
          header={
            index === total ||
            moment(getDate(item?.createdAt)).diff(
              moment(getDate(list[index + 1]?.createdAt)),
              'days'
            ) !== 0 ? (
              <View
                style={[
                  atomicStyles.pb3,
                  atomicStyles.pt4,
                  atomicStyles.flexRowCenter,
                ]}
              >
                <TextLib
                  style={[
                    atomicStyles.sub3,
                    { color: messageTextSecondaryColor },
                  ]}
                >
                  {moment(item?.createdAt).calendar()}
                </TextLib>
              </View>
            ) : undefined
          }
        />
      );
    },
    [globalUser, list, messageTextSecondaryColor, onSwipe, total]
  );

  return (
    <>
      <FlatList
        renderItem={renderItem}
        data={list}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item: ConversationMessage, index: number) =>
          item?.id?.toString() + index?.toString()
        }
        inverted={!(loading === LoadingStatus.FAIL)}
        scrollEventThrottle={10}
        refreshing={refreshing}
        onEndReachedThreshold={END_REACHED_THRESHOLD}
        onEndReached={handleLoadMore}
        ListHeaderComponent={<></>}
        ListHeaderComponentStyle={[]}
        ListFooterComponent={
          <ListFooter
            isData={true}
            isEnd={false}
            check={total !== list?.length}
          />
        }
        style={style}
      />
    </>
  );
}

export interface ConversationMessageFlatListProps {
  conversation: Conversation;

  globalUser?: any;

  onSwipe?: (conversationMessage: ConversationMessage) => void;

  style?: StyleProp<ViewStyle>;
}

ConversationMessageFlatList.defaultProps = {
  //
};

ConversationMessageFlatList.displayName = nameof(ConversationMessageFlatList);

export default ConversationMessageFlatList;
