import type { PropsWithChildren, ReactElement } from 'react';
import React from 'react';
import nameof from 'ts-nameof.macro';
import { DetailItemView, DetailOptions } from 'react-native-truesight-chat';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View } from 'react-native';
import { useBoolean } from 'react3l-common';
import { ConversationAttachmentScreen } from '../index';
import type { DetailScreenParams } from './DetailScreenParams';
import ConversationMemberScreen from '../ConversationMemberScreen';

export function DetailScreen(
  props: PropsWithChildren<DetailScreenProps>
): ReactElement {
  const { navigation, route } = props;
  const [visible, handleVisible] = useBoolean(false);

  return (
    <View style={[{ marginLeft: 16, marginRight: 16 }]}>
      <DetailItemView
        key={0}
        title={'THÔNG TIN NHÓM'}
        label={'Xem thành viên nhóm'}
        icon={require('../../../../assets/icons/group.svg')}
        onPress={() => {
          navigation.navigate(ConversationMemberScreen.displayName!, {
            conversation: route.params?.conversation ?? {},
          });
        }}
      />
      <DetailItemView
        key={1}
        label={'File phương tiện'}
        icon={require('../../../../assets/icons/group.svg')}
        onPress={() => {
          navigation.navigate(ConversationAttachmentScreen.displayName!, {
            conversation: route.params?.conversation ?? {},
          });
        }}
      />
      <DetailItemView
        title={'HÀNH ĐỘNG KHÁC'}
        label={'Chỉnh sửa'}
        icon={require('../../../../assets/icons/send.svg')}
        labelStyle={[{ color: 'darkseagreen' }]}
        rightComponent={<View />}
        onPress={handleVisible}
      />

      <DetailOptions
        isVisible={visible}
        options={['Đổi ảnh đoạn chat', 'Đổi tên đoạn chat']}
        onBackdropPress={handleVisible}
        onCancel={handleVisible}
        cancel={'Huỷ'}
        dashColor={'#d3d3d3'}
        dashLength={0.5}
        cancelStyle={[{ color: 'red' }]}
      />
    </View>
  );
}

export interface DetailScreenProps
  extends NativeStackScreenProps<Record<string, DetailScreenParams>> {
  //
}

DetailScreen.defaultProps = {
  //
};

DetailScreen.displayName = nameof(DetailScreen);

export default DetailScreen;
