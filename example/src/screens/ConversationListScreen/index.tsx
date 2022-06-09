import React from 'react';
import type { PropsWithChildren, ReactElement } from 'react';
import nameof from 'ts-nameof.macro';
import { ConversationFlatList } from 'react-native-truesight-chat';

export function ConversationListScreen(
  props: PropsWithChildren<ConversationListScreenProps>
): ReactElement {
  const {} = props;

  return (
    <>
      <ConversationFlatList />
    </>
  );
}

export interface ConversationListScreenProps {
  //
}

ConversationListScreen.defaultProps = {
  //
};

ConversationListScreen.displayName = nameof(ConversationListScreen);

export default ConversationListScreen;
