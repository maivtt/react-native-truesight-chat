import React from 'react';
import type {
  Conversation,
  ConversationAttachment,
} from 'react-native-truesight-chat';
import TruesightChat, {
  ConversationAttachmentFilter,
} from 'react-native-truesight-chat';
import type { LoadingStatus } from '../hooks/use-list';
import { Action, useList } from '../hooks/use-list';
import { SearchField } from '../types/Search';
import { DocumentType } from '../types/DocumentType';

export function useAttachment(
  conversation: Conversation
): [
  ConversationAttachment[],
  LoadingStatus,
  boolean,
  () => void,
  () => void,
  number,
  (tab: number) => () => void
] {
  const [tab, setTab] = React.useState<number>(0);

  const [
    list,
    ,
    loading,
    refreshing,
    ,
    handleLoadMore,
    handleRefresh,
    ,
    dispatch,
  ] = useList<
    ConversationAttachment,
    ConversationAttachmentFilter,
    SearchField.NAME
  >(
    ConversationAttachmentFilter,
    TruesightChat.listConversationAttachment,
    TruesightChat.countConversationAttachment,
    SearchField.NAME,
    undefined,
    {
      ...new ConversationAttachmentFilter(),
      conversationId: {
        equal: conversation.id,
      },
      conversationAttachmentTypeId: { equal: DocumentType.IMAGE },
    },
    30
  );

  const handleChangeTab = React.useCallback(
    (tab: number) => () => {
      setTab(tab);
      dispatch({
        type: Action.resetFilter,
        newFilter: {
          ...new ConversationAttachmentFilter(),
          conversationId: {
            equal: conversation.id,
          },
          conversationAttachmentTypeId:
            tab === 0
              ? { equal: DocumentType.IMAGE }
              : { notEqual: DocumentType.IMAGE },
          skip: 0,
        },
      });
    },
    [conversation, dispatch]
  );

  return [
    list,
    loading,
    refreshing,
    handleLoadMore,
    handleRefresh,
    tab,
    handleChangeTab,
  ];
}
