import React from 'react';
import { useBoolean, useSubscription } from 'react3l-common';
import { finalize } from 'rxjs';
import type { AxiosError } from 'axios';
import type {
  Conversation,
  ConversationMessage,
  GlobalUser,
  ImagePickerResponse,
} from 'react-native-truesight-chat';
import TruesightChat, {
  ConversationFile,
  ConversationMessageFilter,
} from 'react-native-truesight-chat';
import type { DocumentPickerResponse } from 'react-native-document-picker';
import DocumentPicker, { isInProgress } from 'react-native-document-picker';
import {
  ConversationMessageReducer,
  conversationMessageReducer,
  ConversationMessageReducerActionType,
} from '../reducers/conversation-message-reducer';
import { LoadingStatus, useList } from '../hooks/use-list';
import { SearchField, SearchType } from '../types/Search';

export function useChat(
  conversation: Conversation,
  currentGlobalUser: GlobalUser,
  newMessage?: ConversationMessage,
  onRemoveMessage?: () => void
): [
  ConversationMessage[],
  number,
  LoadingStatus,
  boolean,
  any,
  () => void,
  any,
  any,
  any,
  (content: string) => void,
  (value: string) => void,
  (
    images: ImagePickerResponse[] | DocumentPickerResponse[],
    type?: number
  ) => void,
  () => void,
  any,
  (mes: ConversationMessage) => void,
  () => void,
  (emoji: string) => void,
  boolean,
  () => void
] {
  const subscription = useSubscription();

  const [cameraVisible, handleChangeCameraVisible] = useBoolean(false);

  const [conversationMessages, setConversationMessages] = React.useState<
    ConversationMessage[]
  >([]);
  const [conversationMessageTotal, setConversationMessageTotal] =
    React.useState<number>(0);

  const [{ content, reMessage, loading, error }, dispatch] =
    React.useReducer<ConversationMessageReducer>(conversationMessageReducer, {
      loading: false,
      content: '',
      reMessage: null,
    });

  const [
    list,
    total,
    listLoading,
    refreshing,
    ,
    handleLoadMore,
    handleRefresh,
  ] = useList<ConversationMessage, ConversationMessageFilter, SearchField.NAME>(
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

  const handleChat = React.useCallback((value: string) => {
    dispatch({
      type: ConversationMessageReducerActionType.SetContent,
      content: value,
    });
  }, []);

  const handleEmoji = React.useCallback(
    (emoji: string) => {
      dispatch({
        type: ConversationMessageReducerActionType.SetContent,
        content: content + emoji,
      });
    },
    [content]
  );

  const handleChooseImage = React.useCallback(
    (
      images: ImagePickerResponse[] | DocumentPickerResponse[],
      type?: number
    ) => {
      dispatch({
        type: ConversationMessageReducerActionType.TurnOnLoading,
      });
      subscription.add(
        TruesightChat.multiUploadFile(images).subscribe({
          next: (results: ConversationFile[]) => {
            if (results.length > 0) {
              const conversationAttachments = results.map((image) => ({
                name: image.name,
                url: TruesightChat.serverUrl + image?.path,
                conversationAttachmentTypeId: type ?? 1,
              }));
              TruesightChat.create({
                conversationId: conversation?.id,
                globalUserId: currentGlobalUser?.id,
                replyId: reMessage?.id,
                conversationAttachments,
              })
                .pipe(
                  finalize(() => {
                    dispatch({
                      type: ConversationMessageReducerActionType.TurnOffLoading,
                    });
                  })
                )
                .subscribe({
                  next: () => {},
                  error: (axiosError: AxiosError) => {
                    console.log(
                      'Không thể gửi tin nhắn ' + axiosError?.response?.status
                    );
                  },
                });
            } else {
              dispatch({
                type: ConversationMessageReducerActionType.TurnOffLoading,
              });
              console.log('Lỗi không trả về list images');
            }
          },
          error: (axiosError: AxiosError) => {
            dispatch({
              type: ConversationMessageReducerActionType.TurnOffLoading,
            });
            console.log('Không thể gửi ảnh ' + axiosError?.response?.status);
          },
        })
      );
    },
    [conversation, currentGlobalUser, reMessage, subscription]
  );

  const handleSend = React.useCallback(
    (value: string) => {
      if (!value || value === '') {
        return;
      }
      dispatch({
        type: ConversationMessageReducerActionType.TurnOnLoading,
      });
      subscription.add(
        TruesightChat.create({
          conversationId: conversation?.id,
          globalUserId: currentGlobalUser?.id,
          content: value,
          replyId: reMessage?.id,
        })
          .pipe(
            finalize(() => {
              dispatch({
                type: ConversationMessageReducerActionType.TurnOffLoading,
              });
            })
          )
          .subscribe({
            next: () => {},
            error: (axiosError: AxiosError<Conversation>) => {
              if (
                axiosError.response?.status === 400 &&
                axiosError.response?.data
              ) {
                const e = axiosError.response.data.errors;
                if (e) {
                  console.log(e.toString());
                }
              }
              console.log(axiosError);
            },
          })
      );
      dispatch({
        type: ConversationMessageReducerActionType.ClearContent,
      });
    },
    [conversation, currentGlobalUser, reMessage, subscription]
  );

  const handleError = React.useCallback((err: unknown) => {
    if (DocumentPicker.isCancel(err)) {
      // User cancelled the picker, exit any dialogs or menus and move on
    } else if (isInProgress(err)) {
      console.log(
        'multiple pickers were opened, only the last will be considered'
      );
    } else {
      throw err;
    }
  }, []);

  const handleOpenDocumentPicker = React.useCallback(() => {
    DocumentPicker.pickMultiple()
      .then((res) => {
        if (res) {
          handleChooseImage(res, 3);
        }
      })
      .catch(handleError);
  }, [handleChooseImage, handleError]);

  const handleSelectedMessage = React.useCallback(
    (mes: ConversationMessage) => {
      dispatch({
        type: ConversationMessageReducerActionType.SetReMessage,
        reMessage: mes,
      });
    },
    []
  );

  const handleClearReplyMessage = React.useCallback(() => {
    dispatch({
      type: ConversationMessageReducerActionType.ClearReMessage,
    });
  }, []);

  React.useEffect(() => {
    setConversationMessages((value: ConversationMessage[]) => [
      ...new Set([...value, ...list]),
    ]);
    setConversationMessageTotal(total);
  }, [list, total]);

  React.useEffect(() => {
    if (newMessage) {
      if (newMessage.conversationId === conversation.id) {
        setConversationMessages([newMessage, ...conversationMessages]);
        setConversationMessageTotal(conversationMessageTotal + 1);
        if (onRemoveMessage) {
          onRemoveMessage();
        }
      }
    }
  }, [
    conversation,
    conversationMessageTotal,
    conversationMessages,
    newMessage,
    onRemoveMessage,
  ]);

  return [
    conversationMessages,
    conversationMessageTotal,
    listLoading,
    refreshing,
    handleRefresh,
    handleLoadMore,
    content!,
    loading,
    error,
    handleChat,
    handleSend,
    handleChooseImage,
    handleOpenDocumentPicker,
    reMessage,
    handleSelectedMessage,
    handleClearReplyMessage,
    handleEmoji,
    cameraVisible,
    handleChangeCameraVisible,
  ];
}
