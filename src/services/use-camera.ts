import type { Ref } from 'react';
import React from 'react';
import type { RNCamera, TakePictureResponse } from 'react-native-camera';

export function useCamera(): [
  React.RefObject<RNCamera>,
  'front' | 'back',
  () => Promise<void>,
  TakePictureResponse | undefined,
  () => void,
  () => Promise<void>
] {
  const ref: Ref<RNCamera> = React.useRef<RNCamera>(null);

  const [currentImage, setCurrentImage] = React.useState<TakePictureResponse>();

  const [cameraType, setCameraType] = React.useState<'front' | 'back'>('back');

  const handleChangeCamera = React.useCallback(async () => {
    if (cameraType === 'back') {
      setCameraType('front');
    } else {
      setCameraType('back');
    }
  }, [cameraType]);

  const handleCapture = React.useCallback(async () => {
    const photo: TakePictureResponse = await ref.current!.takePictureAsync();
    setCurrentImage(photo);
  }, []);

  const handleClearPhoto = React.useCallback(() => {
    setCurrentImage(undefined);
  }, []);

  return [
    ref,
    cameraType,
    handleChangeCamera,
    currentImage,
    handleClearPhoto,
    handleCapture,
  ];
}
