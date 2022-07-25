import type { PropsWithChildren, ReactElement } from 'react';
import React from 'react';
import styles from './DetailOptions.scss';
import nameof from 'ts-nameof.macro';
import TruesightChat from 'react-native-truesight-chat';
import {
  Dimensions,
  ScrollView,
  StyleProp,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Modal from 'react-native-modal';
import TextLib from '../atoms/TextLib';

const { height: SCREEN_HEIGHT } = Dimensions.get('screen');

export function DetailOptions(
  props: PropsWithChildren<DetailOptionsProps>
): ReactElement {
  const {
    isVisible,
    onBackdropPress,
    onOptionPress,
    onCancel,
    options,
    cancel,
    dashColor,
    dashLength,
    modalStyle,
    itemStyle,
    cancelStyle,
    cancelContainerStyle,
  } = props;
  const { atomicStyles } = TruesightChat;

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onBackdropPress}
      animationIn="fadeInUpBig"
      animationOut="fadeOutDown"
      style={[
        atomicStyles.flexColumn,
        atomicStyles.justifyContentEnd,
        atomicStyles.alignContentEnd,
      ]}
    >
      <View style={[styles.modal]}>
        {options && options?.length > 10 ? (
          <ScrollView
            style={[styles.border, { height: SCREEN_HEIGHT * 0.7 }, modalStyle]}
          >
            {options?.map((item: any, index: number) => {
              return (
                <View key={index}>
                  <TouchableOpacity
                    style={[
                      atomicStyles.flexRowCenter,
                      styles.modalItem,
                      itemStyle,
                    ]}
                    onPress={() => {
                      if (onOptionPress) {
                        onOptionPress(item);
                      }
                    }}
                  >
                    <TextLib
                      style={[
                        atomicStyles.texRegular,
                        atomicStyles.textBlueColor,
                      ]}
                    >
                      {typeof item === 'string' ? item : item?.name}
                    </TextLib>
                  </TouchableOpacity>
                  {index < options.length - 1 && (
                    <View
                      style={[
                        atomicStyles.w90,
                        atomicStyles.my1,
                        {
                          backgroundColor: dashColor ?? '#000',
                          height: dashLength ?? 1,
                        },
                      ]}
                    />
                  )}
                </View>
              );
            })}
          </ScrollView>
        ) : (
          <View style={[styles.border, modalStyle]}>
            {options?.map((item: any, index: number) => {
              return (
                <View key={index}>
                  <TouchableOpacity
                    style={[
                      atomicStyles.flexRowCenter,
                      styles.modalItem,
                      itemStyle,
                    ]}
                    onPress={() => {
                      if (onOptionPress) {
                        onOptionPress(item);
                      }
                    }}
                  >
                    <TextLib
                      style={[
                        atomicStyles.texRegular,
                        atomicStyles.textBlueColor,
                      ]}
                    >
                      {typeof item === 'string' ? item : item?.name}
                    </TextLib>
                  </TouchableOpacity>
                  {index < options.length - 1 && (
                    <View
                      style={[
                        atomicStyles.w90,
                        atomicStyles.my1,
                        {
                          backgroundColor: dashColor ?? '#000',
                          height: dashLength ?? 1,
                        },
                      ]}
                    />
                  )}
                </View>
              );
            })}
          </View>
        )}

        {cancel && (
          <TouchableOpacity
            style={[
              atomicStyles.flexRowCenter,
              styles.modalItem,
              atomicStyles.bgWhite,
              atomicStyles.my2,
              cancelContainerStyle,
            ]}
            onPress={onCancel}
          >
            <TextLib
              style={[
                atomicStyles.texRegular,
                atomicStyles.textError,
                cancelStyle,
              ]}
            >
              {cancel}
            </TextLib>
          </TouchableOpacity>
        )}
      </View>
    </Modal>
  );
}

export interface DetailOptionsProps {
  isVisible: boolean;

  options: any[];

  onBackdropPress: () => void;

  onOptionPress?: (option: any) => void;

  onCancel?: () => void;

  cancel?: string;

  dashColor?: string;

  dashLength?: number;

  modalStyle?: StyleProp<ViewStyle>;

  itemStyle?: StyleProp<ViewStyle>;

  cancelContainerStyle?: StyleProp<ViewStyle>;

  cancelStyle?: StyleProp<TextStyle>;
}

DetailOptions.defaultProps = {
  cancel: true,
};

DetailOptions.displayName = nameof(DetailOptions);

export default DetailOptions;
