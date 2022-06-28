import type { PropsWithChildren, ReactElement } from 'react';
import React from 'react';
import styles from './ImageItem.scss';
import nameof from 'ts-nameof.macro';
import { Dimensions, Image, Pressable, View } from 'react-native';
import { useThemeValue } from 'react-native-redux-theming';
import TruesightChat from 'react-native-truesight-chat';
import TextLib from '../TextLib';
import type { ImagePickerResponse } from '../../../types/ImagePickerResponse';

const { width: SCREEN_WIDTH } = Dimensions.get('screen');

export function ImageItem(
  props: PropsWithChildren<ImageItemProps>
): ReactElement {
  const { image, onSelect, selected, order } = props;
  const primaryColor = useThemeValue('primaryColor');
  const { atomicStyles } = TruesightChat;

  const handleSelect = React.useCallback(() => {
    if (image && typeof onSelect === 'function') {
      onSelect(image);
    }
  }, [image, onSelect]);

  return (
    <>
      <Pressable
        style={[
          styles.container,
          { height: SCREEN_WIDTH / 3, width: SCREEN_WIDTH / 3 },
        ]}
        onPress={handleSelect}
      >
        {image?.uri && (
          <Image
            style={styles.image}
            source={{ uri: image.uri }}
            defaultSource={require('../../../../assets/images/default-avatar.png')}
          />
        )}
        {selected && (
          <View style={styles.overLay}>
            <View
              style={[
                styles.numberIndicator,
                { backgroundColor: primaryColor },
              ]}
            >
              <TextLib style={[atomicStyles.h5, { color: '#FFFFFF' }]}>
                {order}
              </TextLib>
            </View>
          </View>
        )}
      </Pressable>
    </>
  );
}

export interface ImageItemProps {
  image?: ImagePickerResponse;

  onSelect: (image: ImagePickerResponse) => void;

  selected: boolean;

  order: null | number;
}

ImageItem.defaultProps = {
  //
};

ImageItem.displayName = nameof(ImageItem);

export default ImageItem;
