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
  Text,
  View,
} from 'react-native';
import { LoadingStatus, useList } from '../../hooks/use-list';
import { END_REACHED_THRESHOLD } from '../../../example/src/config/consts';
import ListFooter from '../atoms/ListFooter';
import TruesightChat, {
  ConversationMessageFilter,
} from 'react-native-truesight-chat';
import { SearchField, SearchType } from '../../types/Search';
import MessageItem from '../atoms/MessageItem/MessageItem';
import moment from 'moment';
import { getDate } from '../../helper/string-helper';

export function ConversationMessageFlatList(
  props: PropsWithChildren<ConversationMessageFlatListProps>
): ReactElement {
  const { conversation } = props;

  const [list, total, loading, refreshing, , handleLoadMore, handleRefresh] =
    useList<ConversationMessage, ConversationMessageFilter, SearchField.NAME>(
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
          globalUser={{ id: 1 }}
          conversationMessage={item}
          key={index}
          consecutive={
            index !== 0 && list[index - 1]?.globalUserId === item?.globalUserId
          }
          //onSwipe={onSwipe}
          header={
            index === total ||
            moment(getDate(item?.createdAt)).diff(
              moment(getDate(list[index + 1]?.createdAt)),
              'days'
            ) !== 0 ? (
              <View style={[]}>
                <Text>{moment(item?.createdAt).calendar()}</Text>
              </View>
            ) : undefined
          }
        />
      );
    },
    [list, total]
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
        onRefresh={handleRefresh}
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
      />
    </>
  );
}

export interface ConversationMessageFlatListProps {
  conversation: Conversation;
}

ConversationMessageFlatList.defaultProps = {
  //
};

ConversationMessageFlatList.displayName = nameof(ConversationMessageFlatList);

export default ConversationMessageFlatList;
