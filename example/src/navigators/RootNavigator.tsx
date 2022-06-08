import type { FC, PropsWithChildren, ReactElement } from 'react';
import React from 'reactn';
import nameof from 'ts-nameof.macro';
import * as Screens from '../screens';
import { ConversationListScreen } from '../screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

const { Navigator, Screen } = createNativeStackNavigator();

/**
 * File: RootNavigator.tsx
 * @created 2020-12-14 10:46:04
 * @author Thanh Tùng <ht@thanhtunguet.info>
 * @type {FC<PropsWithChildren<RootNavigatorProps>>}
 */
const RootNavigator: FC<
  PropsWithChildren<RootNavigatorProps>
> = (): ReactElement => {
  return (
    <NavigationContainer>
      <Navigator initialRouteName={ConversationListScreen.displayName}>
        {Object.values(Screens).map((ScreenComponent: any) => (
          <Screen
            component={ScreenComponent}
            name={ScreenComponent.displayName!}
            key={ScreenComponent.displayName!}
            initialParams={{}}
          />
        ))}
      </Navigator>
    </NavigationContainer>
  );
};

export interface RootNavigatorProps {
  //
}

RootNavigator.defaultProps = {
  //
};

RootNavigator.propTypes = {
  //
};

RootNavigator.displayName = nameof(RootNavigator);

export default RootNavigator;
