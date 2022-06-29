import type { PropsWithChildren, ReactElement } from 'react';
import React from 'react';
import styles from './Camera.scss';
import nameof from 'ts-nameof.macro';
import { RNCamera } from 'react-native-camera';
import {
  ActivityIndicator,
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  TouchableOpacity,
  View,
} from 'react-native';
import { conversationService } from '../../services';
import { getImageNameByUri } from '../../helper/file-helper';
import SvgIcon from '../atoms/SvgIcon/SvgIcon';
import TextLib from '../atoms/TextLib';
import TruesightChat, {
  ImagePickerResponse,
} from 'react-native-truesight-chat';
import { useThemeValue } from 'react-native-redux-theming';

const PLATFORM_IS_ANDROID: boolean = Platform.OS === 'android';

export function Camera(props: PropsWithChildren<CameraProps>): ReactElement {
  const { onCancel, loading, onSend, sendLabel } = props;
  const { atomicStyles } = TruesightChat;
  const primaryColor = useThemeValue('primaryColor');

  const [
    ref,
    cameraType,
    handleChangeCamera,
    currentImage,
    handleClearPhoto,
    handleCapture,
  ] = conversationService.useCamera();

  const handleSend = React.useCallback(() => {
    if (currentImage && onSend) {
      onSend([
        {
          fileName: getImageNameByUri(currentImage.uri)!,
          uri: currentImage?.uri,
          timestamp: new Date().getTime(),
        },
      ]);
    }
  }, [currentImage, onSend]);

  return (
    <>
      <RNCamera
        style={styles.camera}
        flashMode="auto"
        captureAudio={false}
        useNativeZoom={true}
        pictureSize={PLATFORM_IS_ANDROID ? '2048x1536' : undefined}
        useCamera2Api={true}
        //defaultVideoQuality={RNCamera.Constants.VideoQuality['4:3']}
        ref={ref}
        type={cameraType}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
      />
      <SafeAreaView style={styles.bottom}>
        <TouchableOpacity style={styles.changeCamera} onPress={onCancel}>
          <SvgIcon
            component={require('../../../assets/icons/clear-white.svg')}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.shotBtn} onPress={handleCapture}>
          <SvgIcon
            component={require('../../../assets/icons/shot-button.svg')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.changeCamera}
          onPress={handleChangeCamera}
        >
          <SvgIcon
            component={require('../../../assets/icons/change-camera.svg')}
          />
        </TouchableOpacity>
      </SafeAreaView>
      {currentImage && (
        <View style={styles.image}>
          <Image
            style={styles.image}
            source={{ uri: currentImage.uri }}
            defaultSource={require('../../../assets/images/default-avatar.png')}
          />
          <TouchableOpacity style={styles.cancel} onPress={handleClearPhoto}>
            <SvgIcon
              component={require('../../../assets/icons/clear-white.svg')}
            />
          </TouchableOpacity>
          <Pressable
            onPress={handleSend}
            style={[styles.buttonSave, { backgroundColor: primaryColor }]}
          >
            <TextLib style={[atomicStyles.textBold, { color: '#FFF' }]}>
              {sendLabel ?? 'Send'}
            </TextLib>
            {loading && (
              <ActivityIndicator color={'#FFF'} style={[atomicStyles.ml4]} />
            )}
          </Pressable>
        </View>
      )}
    </>
  );
}

export interface CameraProps {
  loading?: boolean;

  onCancel?: () => void;

  onSend?: (pic: ImagePickerResponse[]) => void;

  sendLabel?: string;
}

Camera.defaultProps = {
  //
};

Camera.displayName = nameof(Camera);

export default Camera;
