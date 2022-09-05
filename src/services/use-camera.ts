import type { Ref } from 'react';
import React from 'react';

export function useCamera(): [
  React.RefObject<any>,
  'front' | 'back',
  () => Promise<void>,
  any,
  () => void,
  () => Promise<void>
] {
  const ref: Ref<any> = React.useRef<any>(null);

  const [currentImage, setCurrentImage] = React.useState<any>();

  const [cameraType, setCameraType] = React.useState<'front' | 'back'>('back');

  const handleChangeCamera = React.useCallback(async () => {
    if (cameraType === 'back') {
      setCameraType('front');
    } else {
      setCameraType('back');
    }
  }, [cameraType]);

  const handleCapture = React.useCallback(async () => {
    const photo: any = await ref.current!.takePictureAsync();
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
