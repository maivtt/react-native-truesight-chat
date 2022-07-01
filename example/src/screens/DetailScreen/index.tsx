import React from 'react';
import type { PropsWithChildren, ReactElement } from 'react';
import nameof from 'ts-nameof.macro';
import { DetailItemView, DetailOptions } from 'react-native-truesight-chat';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View } from 'react-native';
import { useBoolean } from 'react3l-common';

export function DetailScreen(
  props: PropsWithChildren<DetailScreenProps>
): ReactElement {
  const {} = props;
  const [visible, handleVisible] = useBoolean(false);

  return (
    <View style={[{ marginLeft: 16, marginRight: 16 }]}>
      <DetailItemView
        title={'THÔNG TIN NHÓM'}
        label={'Xem thành viên nhóm'}
        icon={require('../../../../assets/icons/group.svg')}
      />
      <DetailItemView
        label={'File phương tiện'}
        icon={require('../../../../assets/icons/group.svg')}
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

export interface DetailScreenProps extends NativeStackScreenProps<any> {
  //
}

DetailScreen.defaultProps = {
  //
};

DetailScreen.displayName = nameof(DetailScreen);

export default DetailScreen;
