import React from 'react';
import styles from './Tab.scss';
import type { PropsWithChildren, ReactElement } from 'react';
import nameof from 'ts-nameof.macro';
import type { StyleProp, ViewStyle } from 'react-native';
import { TouchableOpacity, View } from 'react-native';
import TextLib from '../TextLib';
import TruesightChat from 'react-native-truesight-chat';

export function Tab(props: PropsWithChildren<TabProps>): ReactElement {
  const { tab, onTab, label, style } = props;

  const { atomicStyles } = TruesightChat;

  return (
    <>
      <View
        style={[
          atomicStyles.px4,
          atomicStyles.pt2,
          atomicStyles.flexRowBetween,
          style,
        ]}
      >
        <TouchableOpacity
          style={[styles.tab, tab === 0 && styles.tabSelected]}
          onPress={onTab(0)}
        >
          <TextLib style={[atomicStyles.bold, atomicStyles.textDark]}>
            {label[0]}
          </TextLib>
        </TouchableOpacity>
        <View style={atomicStyles.mx1} />
        <TouchableOpacity
          style={[styles.tab, tab === 1 && styles.tabSelected]}
          onPress={onTab(1)}
        >
          <TextLib style={[atomicStyles.bold, atomicStyles.textDark]}>
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

  style?: StyleProp<ViewStyle>;
}

Tab.defaultProps = {
  //
};

Tab.displayName = nameof(Tab);

export default Tab;
