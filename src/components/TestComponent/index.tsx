import React from 'react';
import './TestComponent.scss';
import type { PropsWithChildren, ReactElement } from 'react';
import nameof from 'ts-nameof.macro';
import TruesightChat from 'react-native-truesight-chat';

const {} = TruesightChat;

export function TestComponent(
  props: PropsWithChildren<TestComponentProps>
): ReactElement {
  const { children } = props;

  return <>{children}</>;
}

export interface TestComponentProps {
  //
}

TestComponent.defaultProps = {
  //
};

TestComponent.displayName = nameof(TestComponent);

export default TestComponent;
