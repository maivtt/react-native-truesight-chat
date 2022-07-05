import type { PropsWithChildren, ReactElement } from 'react';
import React from 'react';
import nameof from 'ts-nameof.macro';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ConversationAttachmentList } from 'react-native-truesight-chat';
import type { ConversationAttachmentScreenParams } from './ConversationAttachmentScreenParams';

export function ConversationAttachmentScreen(
  props: PropsWithChildren<ConversationAttachmentScreenProps>
): ReactElement {
  const { route } = props;

  return (
    <>
      <ConversationAttachmentList
        conversation={route?.params?.conversation ?? {}}
        leftLabel={'Hình ảnh'}
        rightLabel={'File phương tiện'}
      />
    </>
  );
}

export interface ConversationAttachmentScreenProps
  extends NativeStackScreenProps<
    Record<string, ConversationAttachmentScreenParams>
  > {
  //
}

ConversationAttachmentScreen.defaultProps = {
  //
};

ConversationAttachmentScreen.displayName = nameof(ConversationAttachmentScreen);

export default ConversationAttachmentScreen;
