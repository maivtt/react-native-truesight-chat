import type { PropsWithChildren, ReactElement } from 'react';
import React from 'react';
import styles from './EmojiPicker.scss';
import nameof from 'ts-nameof.macro';
import categories from '../../../../icons/emoji/categories';
import { Dimensions, FlatList, Text, TouchableOpacity } from 'react-native';
import { emojisByCategory } from '../../../../icons/emoji';
import shortnameToUnicode from '../../../../helper/shortnameToUnicode';
import TruesightChat from 'react-native-truesight-chat';
import { TabView } from 'react-native-tab-view';
import TabBar from './components/TabBar';

const { width: SCREEN_WIDTH } = Dimensions.get('screen');

export function EmojiPicker(
  props: PropsWithChildren<EmojiPickerProps>
): ReactElement {
  const { onEmojiPress } = props;
  const { atomicStyles } = TruesightChat;

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState(
    categories.tabs.map((tab) => ({ key: tab.category, title: tab.tabLabel }))
  );

  const renderScene = ({ route }: any) => (
    <FlatList
      data={emojisByCategory[route.key]}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={[{ margin: (SCREEN_WIDTH - 200) / 18 }]}
          onPress={() => {
            if (onEmojiPress) {
              onEmojiPress(shortnameToUnicode[`:${item}:`]);
            }
          }}
        >
          <Text style={styles.emoji}>{shortnameToUnicode[`:${item}:`]}</Text>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item}
      numColumns={8}
    />
  );

  return (
    <TabView
      renderTabBar={(props) => <TabBar setIndex={setIndex} {...props} />}
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      initialLayout={{ width: SCREEN_WIDTH }}
      style={[atomicStyles.bgWhite]}
    />
  );
}

export interface EmojiPickerProps {
  onEmojiPress?: (item: any) => void;
}

EmojiPicker.defaultProps = {
  //
};

EmojiPicker.displayName = nameof(EmojiPicker);

export default EmojiPicker;
