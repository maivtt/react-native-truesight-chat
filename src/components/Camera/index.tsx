import type { PropsWithChildren, ReactElement } from 'react';
import React from 'react';
import styles from './Camera.scss';
import nameof from 'ts-nameof.macro';
import {
  ActivityIndicator,
  Image,
  Pressable,
  SafeAreaView,
  TouchableOpacity,
  View,
} from 'react-native';
import { getImageNameByUri } from '../../helper/file-helper';
import SvgIcon from '../atoms/SvgIcon/SvgIcon';
import TextLib from '../atoms/TextLib';
import TruesightChat, {
  ImagePickerResponse,
} from 'react-native-truesight-chat';
import { useThemeValue } from 'react-native-redux-theming';
import { useCamera } from '../../services/use-camera';

export function Camera(props: PropsWithChildren<CameraProps>): ReactElement {
  const { cameraComponent, onCancel, loading, onSend, sendLabel } = props;
  const { atomicStyles } = TruesightChat;
  const primaryColor = useThemeValue('primaryColor');

  const [
    ,
    ,
    handleChangeCamera,
    currentImage,
    handleClearPhoto,
    handleCapture,
  ] = useCamera();

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
      {cameraComponent}
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

  cameraComponent?: ReactElement;
}

Camera.defaultProps = {
  //
};

Camera.displayName = nameof(Camera);

export default Camera;
