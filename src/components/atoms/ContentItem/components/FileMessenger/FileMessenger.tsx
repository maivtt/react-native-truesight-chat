import type { FC, PropsWithChildren, ReactElement } from 'react';
import React from 'react';
import nameof from 'ts-nameof.macro';
import styles from './FileMessenger.scss';
import { Text, TouchableOpacity, View } from 'react-native';
import { useThemeValue } from 'react-native-redux-theming';
import atomicStyles from '../../../../../styles';
import type { ConversationAttachment } from 'react-native-truesight-chat';
import FileIcon from '../../../../../icons/FileIcon';

/**
 * File: FileMessenger.tsx
 * @created 2022-05-24 09:39:26
 * @author maivtt14 <vungoc2901@gmail.com>
 * @type {FC<PropsWithChildren<FileMessengerProps>>}
 */
const FileMessenger: FC<PropsWithChildren<FileMessengerProps>> = (
  props: PropsWithChildren<FileMessengerProps>
): ReactElement => {
  const { conversationAttachments, onPress, onLongPress, reply, isOther } =
    props;
  const primaryColor = useThemeValue('primaryColor');

  return (
    <>
      <TouchableOpacity
        style={[
          styles.width,
          {
            backgroundColor: isOther ? '#e6e6e5' : primaryColor,
          },
        ]}
        onPress={onPress}
        onLongPress={onLongPress}
      >
        <>
          {reply}
          <View style={atomicStyles.flexRowStart}>
            <View style={styles.file}>
              <FileIcon size={30} color={'#000'} />
            </View>
            <Text style={[atomicStyles.pl2, atomicStyles.textUnderline]}>
              {conversationAttachments && conversationAttachments[0]?.name}
            </Text>
          </View>
        </>
      </TouchableOpacity>
    </>
  );
};

export interface FileMessengerProps {
  conversationAttachments?: ConversationAttachment;

  onPress?: () => void;

  onLongPress?: () => void;

  reply?: ReactElement;

  isOther?: boolean;
}

FileMessenger.defaultProps = {
  //
};

FileMessenger.propTypes = {
  //
};

FileMessenger.displayName = nameof(FileMessenger);

export default FileMessenger;
