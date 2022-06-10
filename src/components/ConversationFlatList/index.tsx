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
  Text,
  View,
} from 'react-native';
import ListLoading from '../atoms/ListLoading';
import ListFooter from '../atoms/ListFooter';
import atomicStyles from '../../styles';

export function ConversationFlatList(
  props: PropsWithChildren<ConversationFlatListProps>
): ReactElement {
  const { renderItem } = props;

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
        <View key={index}>
          <View>{}</View>
          <View>
            <Text>{item?.latestContent}</Text>
          </View>
        </View>
      );
    },
    []
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
}

ConversationFlatList.defaultProps = {
  //
};

ConversationFlatList.displayName = nameof(ConversationFlatList);

export default ConversationFlatList;
