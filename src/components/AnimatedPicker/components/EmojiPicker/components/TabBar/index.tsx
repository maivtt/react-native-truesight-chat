import type { PropsWithChildren, ReactElement } from 'react';
import React from 'react';
import nameof from 'ts-nameof.macro';
import { Animated, TouchableOpacity, View } from 'react-native';
import { tabBarStyles } from './TabBar.styles';
import type { NavigationState } from 'react-native-tab-view';

export function TabBar(props: PropsWithChildren<TabBarProps>): ReactElement {
  const { navigationState, position, setIndex } = props;

  const inputRange = navigationState.routes.map((_x: any, i: any) => i);
  return (
    <View style={tabBarStyles.container}>
      {navigationState.routes.map((route: any, index: any) => {
        const opacity = position.interpolate({
          inputRange,
          outputRange: inputRange.map((inputIndex: any) =>
            inputIndex === index ? 1 : 0.5
          ),
        });
        return (
          <TouchableOpacity
            key={index}
            style={tabBarStyles.tab}
            onPress={() => setIndex(index)}
          >
            <Animated.Text style={[{ opacity }]}>{route.title}</Animated.Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export interface TabBarProps {
  navigationState: NavigationState<any>;

  position: Animated.AnimatedInterpolation;

  setIndex: any;
}

TabBar.defaultProps = {
  //
};

TabBar.displayName = nameof(TabBar);

export default TabBar;
