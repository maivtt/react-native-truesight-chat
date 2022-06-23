import React from 'react';
import type { PropsWithChildren, ReactElement } from 'react';
import nameof from 'ts-nameof.macro';
import { emojiCategoryStyles } from './EmojiCategory.styles';
import { FlatList, TouchableOpacity, Text } from 'react-native';
import { emojisByCategory } from '../../../../../../icons/emoji';
import shortnameToUnicode from '../../../../../../helper/shortnameToUnicode';

export function EmojiCategory(
  props: PropsWithChildren<EmojiCategoryProps>
): ReactElement {
  const { category } = props;

  return (
    <>
      <FlatList
        data={emojisByCategory[category]}
        renderItem={({ item }) => (
          <TouchableOpacity style={emojiCategoryStyles.emojiContainer}>
            <Text style={emojiCategoryStyles.emoji}>
              {shortnameToUnicode[`:${item}:`]}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item}
        numColumns={8}
      />
    </>
  );
}

export interface EmojiCategoryProps {
  category: any;
}

EmojiCategory.defaultProps = {
  //
};

EmojiCategory.displayName = nameof(EmojiCategory);

export default EmojiCategory;
