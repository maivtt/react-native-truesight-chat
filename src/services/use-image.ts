import React from 'react';
import { LogBox, PermissionsAndroid, Platform } from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import type { ImagePickerResponse } from 'react-native-truesight-chat';

const PLATFORM_IS_ANDROID: boolean = Platform.OS === 'android';

const PAGINATION = 15;

export function useImage(
  navigation: any
): [
  ImagePickerResponse[],
  (image: ImagePickerResponse) => void,
  { [p: string]: { image: ImagePickerResponse; order: number } },
  () => void,
  () => Promise<void>,
  number
] {
  const [images, setImages] = React.useState<ImagePickerResponse[]>([]);

  const [selectItemsObject, setSelectItemsObject] = React.useState<{
    [key: string]: {
      image: ImagePickerResponse;
      order: number;
    };
  }>({});

  const [pageInfo, setPageInfo] = React.useState({
    has_next_page: true,
    end_cursor: null,
  });

  LogBox.ignoreLogs([
    'Encountered two children with the same key, `undefined:undefined:undefined`.',
  ]);

  const loadMoreImages = React.useCallback(async () => {
    let res: any = null;
    if (pageInfo.has_next_page && pageInfo.end_cursor === null) {
      res = await CameraRoll.getPhotos({
        first: 30,
        assetType: 'Photos',
        groupTypes: 'All',
      });
    } else if (pageInfo.has_next_page) {
      res = await CameraRoll.getPhotos({
        first: PAGINATION,
        after: pageInfo.end_cursor!,
      });
    }
    if (res) {
      await setPageInfo(res.page_info);

      const resImages: ImagePickerResponse[] = res.edges.map((e: any) => {
        return {
          groupName: e.node.group_name,
          uri: e.node.image.uri,
          height: e.node.image.height,
          width: e.node.image.width,
          fileName: e.node.image.filename,
          timestamp: e.node.timestamp,
          type: e.node.type,
        };
      });

      const data = images.concat(resImages);

      setImages(data);
    }
  }, [images, pageInfo.end_cursor, pageInfo.has_next_page]);

  const requestPermission = async () => {
    try {
      const androidGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Photos Permissions',
          message: 'We need to access your photos !',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );

      if (androidGranted === PermissionsAndroid.RESULTS.GRANTED) {
      } else {
        console.log('Folder permission denied');
      }
    } catch (err) {
      //
    }
  };

  React.useEffect(() => {
    const unsubscribe = navigation?.addListener('focus', async () => {
      if (PLATFORM_IS_ANDROID) {
        await requestPermission();
      }
      await loadMoreImages();
      await loadMoreImages();
    });

    return function cleanup() {
      unsubscribe!();
    };
  }, [loadMoreImages, navigation]);

  const reset = () => {
    setSelectItemsObject({});
  };

  const onSelectHandle = React.useCallback(
    (image: ImagePickerResponse) => {
      const length = Object.keys(selectItemsObject).length;

      const data = { ...selectItemsObject };
      if (data[image.uri]) {
        const keys = Object.keys(data);
        for (let i = 0; i < keys.length; i++) {
          if (data[keys[i]].order > data[image.uri].order) {
            data[keys[i]].order -= 1;
          }
        }

        delete data[image.uri];
      } else {
        // if (limitImageNumber && length >= limitImageNumber) {
        //   overLimitedImageNumberHandle && overLimitedImageNumberHandle();
        //   return;
        // }

        data[image.uri] = {
          order: length + 1,
          image: image,
        };
      }
      setSelectItemsObject(data);
    },
    [selectItemsObject]
  );

  return [
    images,
    onSelectHandle,
    selectItemsObject,
    reset,
    loadMoreImages,
    Object.keys(selectItemsObject).length,
  ];
}
