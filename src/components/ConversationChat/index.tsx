import type { PropsWithChildren, ReactElement } from 'react';
import React from 'react';
import nameof from 'ts-nameof.macro';
import type { StyleProp, ViewStyle } from 'react-native';
import { Keyboard } from 'react-native';
import {
  AnimatedPicker,
  AttachmentType,
  Conversation,
  ConversationFooter,
  ConversationMessage,
} from 'react-native-truesight-chat';
import ConversationMessageFlatList from '../ConversationMessageFlatList';
import { conversationService } from '../../services';

export function ConversationChat(
  props: PropsWithChildren<ConversationChatProps>
): ReactElement {
  const {
    navigation,
    conversation,
    globalUser,
    conversationFooterStyle,
    conversationListStyle,
    newMessage,
    onRemoveMessage,
  } = props;
  const [attachmentType, setAttachmentType] = React.useState(
    AttachmentType.None
  );

  const [
    conversationMessages,
    conversationMessageTotal,
    listLoading,
    refreshing,
    ,
    handleLoadMore,
    content,
    typingLoading,
    ,
    handleChat,
    handleSend,
    handleChooseImage,
    handleOpenDocumentPicker,
    reMessage,
    handleSelectedMessage,
    handleClearReplyMessage,
    handleEmoji,
    ,
    handleChangeCameraVisible,
  ] = conversationService.useChat(
    conversation,
    globalUser,
    newMessage,
    onRemoveMessage
  );

  const [
    images,
    onSelectHandle,
    selectItemsObject,
    reset,
    loadMoreImages,
    numberSelectedItem,
  ] = conversationService.useImage(navigation);

  return (
    <>
      <ConversationMessageFlatList
        list={conversationMessages}
        total={conversationMessageTotal}
        loading={listLoading}
        refreshing={refreshing}
        onLoadMore={handleLoadMore}
        globalUser={globalUser}
        onSwipe={handleSelectedMessage}
        typingLoading={typingLoading}
        style={conversationListStyle}
      />

      <ConversationFooter
        value={content}
        onChangeText={handleChat}
        onSend={handleSend}
        onImage={() => {
          Keyboard.dismiss();
          if (attachmentType === AttachmentType.Image) {
            setAttachmentType(AttachmentType.None);
          } else {
            setAttachmentType(AttachmentType.Image);
          }
        }}
        onDocument={handleOpenDocumentPicker}
        onEmoticons={() => {
          Keyboard.dismiss();
          if (attachmentType === AttachmentType.Sticker) {
            setAttachmentType(AttachmentType.None);
          } else {
            setAttachmentType(AttachmentType.Sticker);
          }
        }}
        onPressIn={() => {
          setAttachmentType(AttachmentType.None);
        }}
        reply={reMessage}
        onReply={handleClearReplyMessage}
        style={conversationFooterStyle}
        footer={
          <AnimatedPicker
            type={attachmentType}
            onCancel={() => {
              setAttachmentType(AttachmentType.None);
            }}
            endingPickImageHandle={handleChooseImage}
            onEmoji={handleEmoji}
            images={images}
            onSelectHandle={onSelectHandle}
            selectItemsObject={selectItemsObject}
            reset={reset}
            loadMoreImages={loadMoreImages}
            numberSelectedItem={numberSelectedItem}
            onCapture={handleChangeCameraVisible}
          />
        }
      />
    </>
  );
}

export interface ConversationChatProps {
  navigation: any;

  conversation: Conversation;

  globalUser?: any;

  onSwipe?: (conversationMessage: ConversationMessage) => void;

  style?: StyleProp<ViewStyle>;

  conversationListStyle?: StyleProp<ViewStyle>;

  conversationFooterStyle?: StyleProp<ViewStyle>;

  newMessage?: ConversationMessage;

  onRemoveMessage?: () => void;
}

ConversationChat.defaultProps = {
  //
};

ConversationChat.displayName = nameof(ConversationChat);

export default ConversationChat;
