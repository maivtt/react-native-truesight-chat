import React from 'react';
import styles from './ImagePicker.scss';
import type { PropsWithChildren, ReactElement } from 'react';
import nameof from 'ts-nameof.macro';
import {
  Dimensions,
  FlatList,
  ListRenderItem,
  ListRenderItemInfo,
  Pressable,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import TruesightChat from 'react-native-truesight-chat';
import SvgIcon from '../../../atoms/SvgIcon/SvgIcon';
import TextLib from '../../../atoms/TextLib';
import ImageItem from '../../../atoms/ImageItem';
const { width: SCREEN_WIDTH } = Dimensions.get('screen');

export interface ImagePickerResponse {
  groupName?: string;

  uri: string;

  height?: number;

  width?: number;

  fileName: string;

  timestamp: number;

  type?: string;
}

export function ImagePicker(
  props: PropsWithChildren<ImagePickerProps>
): ReactElement {
  const {
    onCancel,
    endingPickImageHandle,
    images,
    onSelectHandle,
    selectItemsObject,
    reset,
    loadMoreImages,
    numberSelectedItem,
    onCapture,
  } = props;
  const { atomicStyles } = TruesightChat;
  const [translate] = useTranslation();

  const handlePressSendImage = React.useCallback(() => {
    const images = Object.keys(selectItemsObject!).map(
      (item: string) => selectItemsObject![item].image
    );
    endingPickImageHandle(images);
    if (reset) {
      reset();
    }
    onCancel!();
  }, [endingPickImageHandle, onCancel, reset, selectItemsObject]);

  const renderItem: ListRenderItem<any> = React.useCallback(
    ({ item, index }: ListRenderItemInfo<any>) => {
      return (
        <>
          {index === 0 && (
            <TouchableOpacity
              style={[
                atomicStyles.justifyContentCenter,
                atomicStyles.alignItemsCenter,
                { height: SCREEN_WIDTH / 3, width: SCREEN_WIDTH / 3 + 2 },
              ]}
              onPress={onCapture}
            >
              <TextLib style={atomicStyles.mb2}>
                {translate('Lang.Messenger.Conversation.Camera')}
              </TextLib>
              <SvgIcon
                component={require('../../../../../assets/icons/camera.svg')}
              />
            </TouchableOpacity>
          )}
          <ImageItem
            image={item}
            key={index}
            selected={!!selectItemsObject![item.uri]}
            onSelect={onSelectHandle!}
            order={
              selectItemsObject![item.uri]
                ? selectItemsObject![item.uri].order
                : null
            }
          />
        </>
      );
    },
    [atomicStyles, onCapture, onSelectHandle, selectItemsObject, translate]
  );

  return (
    <View>
      <View style={[atomicStyles.alignItemsCenter, atomicStyles.mt2]}>
        <View style={[styles.topLine, atomicStyles.bgPrimary]} />
      </View>

      {images!.length > 0 && (
        <FlatList
          data={images}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => item?.uri + index.toString}
          numColumns={3}
          onEndReachedThreshold={0.5}
          onEndReached={loadMoreImages}
          contentContainerStyle={atomicStyles.mt3}
        />
      )}
      {numberSelectedItem! > 0 && (
        <Pressable
          onPress={handlePressSendImage}
          style={[
            styles.sentButton,
            atomicStyles.bgPrimary,
            //{ bottom: bottom + 16 },
          ]}
        >
          <TextLib style={[atomicStyles.textBold, atomicStyles.textWhite]}>
            {translate('Lang.Messenger.Conversation.SendImage', {
              total: numberSelectedItem! > 1 ? numberSelectedItem : '',
            })}
          </TextLib>
        </Pressable>
      )}
    </View>
  );
}

export interface ImagePickerProps {
  onCancel?: () => void;

  limitImageNumber?: number;

  overLimitedImageNumberHandle?: () => void;

  endingPickImageHandle: (images: ImagePickerResponse[]) => void;

  header?: ReactElement;

  fullScreen?: boolean;

  images?: ImagePickerResponse[];

  onSelectHandle?: (image: ImagePickerResponse) => void;

  selectItemsObject?: {
    [p: string]: { image: ImagePickerResponse; order: number };
  };

  reset?: () => void;

  loadMoreImages?: () => Promise<void>;

  numberSelectedItem?: number;

  onCapture?: () => void;
}

ImagePicker.defaultProps = {
  //
};

ImagePicker.displayName = nameof(ImagePicker);

export default ImagePicker;