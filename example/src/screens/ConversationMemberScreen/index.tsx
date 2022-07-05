import type { PropsWithChildren, ReactElement } from 'react';
import React from 'react';
import nameof from 'ts-nameof.macro';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { ConversationMemberScreenParams } from './ConversationMemberScreenParams';
import { ConversationMemberList } from 'react-native-truesight-chat';

export function ConversationMemberScreen(
  props: PropsWithChildren<ConversationMemberScreenProps>
): ReactElement {
  const { navigation, route } = props;

  return (
    <>
      <ConversationMemberList
        navigation={navigation}
        conversation={route.params?.conversation ?? {}}
        tabLabel={['Tất cả', 'Quản trị viên']}
      />
    </>
  );
}

export interface ConversationMemberScreenProps
  extends NativeStackScreenProps<
    Record<string, ConversationMemberScreenParams>
  > {
  //
}

ConversationMemberScreen.defaultProps = {
  //
};

ConversationMemberScreen.displayName = nameof(ConversationMemberScreen);

export default ConversationMemberScreen;
