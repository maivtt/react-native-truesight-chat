import type { PropsWithChildren, ReactElement } from 'react';
import React from 'react';
import styles from './Tab.scss';
import nameof from 'ts-nameof.macro';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { TouchableOpacity, View } from 'react-native';
import TextLib from '../TextLib';
import TruesightChat from 'react-native-truesight-chat';

export function Tab(props: PropsWithChildren<TabProps>): ReactElement {
  const {
    tab,
    onTab,
    label,
    tabStyle,
    labelContainerStyle,
    labelStyle,
    selectedStyle,
    selectedContainerStyle,
  } = props;

  const { atomicStyles } = TruesightChat;

  return (
    <>
      <View
        style={[
          atomicStyles.px4,
          atomicStyles.pt2,
          atomicStyles.flexRowBetween,
          tabStyle,
        ]}
      >
        <TouchableOpacity
          style={[
            styles.tab,
            tab === 0 && styles.tabSelected,
            labelContainerStyle,
            tab === 0 && selectedContainerStyle,
          ]}
          onPress={onTab(0)}
        >
          <TextLib
            style={[
              atomicStyles.bold,
              atomicStyles.textDark,
              labelStyle,
              tab === 0 && selectedStyle,
            ]}
          >
            {label[0]}
          </TextLib>
        </TouchableOpacity>
        <View style={atomicStyles.mx1} />
        <TouchableOpacity
          style={[
            styles.tab,
            tab === 1 && styles.tabSelected,
            labelContainerStyle,
            tab === 1 && selectedContainerStyle,
          ]}
          onPress={onTab(1)}
        >
          <TextLib
            style={[
              atomicStyles.bold,
              atomicStyles.textDark,
              labelStyle,
              tab === 1 && selectedStyle,
            ]}
          >
            {label[1]}
          </TextLib>
        </TouchableOpacity>
      </View>
    </>
  );
}

export interface TabProps {
  tab: number;

  onTab: (tab: number) => () => void;

  label: string[];

  tabStyle?: StyleProp<ViewStyle>;

  labelContainerStyle?: StyleProp<ViewStyle>;

  selectedContainerStyle?: StyleProp<ViewStyle>;

  selectedStyle?: StyleProp<TextStyle>;

  labelStyle?: StyleProp<TextStyle>;
}

Tab.defaultProps = {
  //
};

Tab.displayName = nameof(Tab);

export default Tab;
