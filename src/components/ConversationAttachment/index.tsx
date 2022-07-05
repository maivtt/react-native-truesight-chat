import type { PropsWithChildren, ReactElement } from 'react';
import React from 'react';
import styles from './ConversationAttachment.scss';
import nameof from 'ts-nameof.macro';
import {
  Dimensions,
  FlatList,
  Image,
  ListRenderItem,
  ListRenderItemInfo,
  View,
} from 'react-native';
import { conversationService } from '../../services';
import type {
  Conversation,
  ConversationAttachment as ConversationAttachmentModel,
} from 'react-native-truesight-chat';
import TruesightChat from 'react-native-truesight-chat';
import moment from 'moment';
import TextLib from '../atoms/TextLib';
import { getDate } from '../../helper/string-helper';
import SvgIcon from '../atoms/SvgIcon/SvgIcon';
import Tab from '../atoms/Tab';
import ListLoading from '../atoms/ListLoading';
import ListFooter from '../atoms/ListFooter';

const { width: SCREEN_WIDTH } = Dimensions.get('screen');

export function ConversationAttachment(
  props: PropsWithChildren<ConversationAttachmentProps>
): ReactElement {
  const { conversation, listError, listEnd, listEmpty, leftLabel, rightLabel } =
    props;
  const { atomicStyles } = TruesightChat;

  const [
    list,
    loading,
    refreshing,
    handleLoadMore,
    handleRefresh,
    tab,
    handleChangeTab,
  ] = conversationService.useAttachment(conversation);

  let arr: any[] = [];

  list.forEach((e: any) => {
    let date = new Date(e?.createdAt).setUTCHours(0, 0, 0, 0);
    if (arr[date]) {
      arr[date].push(e);
    } else {
      arr[date] = [e];
    }
  });

  const renderItem: ListRenderItem<ConversationAttachmentModel> =
    React.useCallback(
      ({ item, index }: ListRenderItemInfo<ConversationAttachmentModel>) => {
        if (tab === 0) {
          return (
            <>
              <View
                style={[
                  styles.imageItem,
                  { height: SCREEN_WIDTH / 3, width: SCREEN_WIDTH / 3 - 2 },
                ]}
                key={index}
              >
                <Image
                  style={[atomicStyles.w100, atomicStyles.h100]}
                  source={{ uri: item?.url }}
                />
              </View>
            </>
          );
        }
        return (
          <>
            {(index === 0 ||
              moment(getDate(item?.createdAt)).diff(
                moment(getDate(list[index - 1]?.createdAt)),
                'days'
              ) !== 0) && (
              <TextLib
                style={[
                  atomicStyles.mx4,
                  atomicStyles.my1,
                  atomicStyles.semibold,
                ]}
              >
                {moment(item?.createdAt).format('LLL')}
              </TextLib>
            )}
            <View
              style={[
                atomicStyles.flex,
                atomicStyles.flexRowStart,
                atomicStyles.px4,
                atomicStyles.py3,
              ]}
              key={index}
            >
              <SvgIcon
                component={require('../../../assets/icons/attachment.svg')}
              />
              <View style={atomicStyles.ml2}>
                <TextLib
                  style={[
                    atomicStyles.textDark,
                    { maxWidth: SCREEN_WIDTH - 120 },
                  ]}
                  numberOfLines={1}
                >
                  {item?.name}
                </TextLib>
                <TextLib style={atomicStyles.mt1}>
                  {moment(item?.createdAt).format('DD/MM/YYYY - hh:mm')}
                </TextLib>
              </View>
            </View>
          </>
        );
      },
      [atomicStyles, list, tab]
    );

  return (
    <>
      <Tab
        tab={tab}
        onTab={handleChangeTab}
        label={[leftLabel, rightLabel]}
        style={atomicStyles.pb2}
      />
      <FlatList
        key={tab === 0 ? '_' : '#'}
        renderItem={renderItem}
        data={list}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item: ConversationAttachmentModel) =>
          item.id!.toString()
        }
        numColumns={tab === 0 ? 3 : undefined}
        refreshing={refreshing}
        onEndReachedThreshold={0.5}
        onEndReached={handleLoadMore}
        onRefresh={handleRefresh}
        ListEmptyComponent={
          <ListLoading
            loading={loading}
            listEmpty={listEmpty}
            listError={listError}
          />
        }
        ListFooterComponent={
          <ListFooter
            isData={true}
            check={false}
            style={atomicStyles.pb4}
            listEnd={listEnd}
          />
        }
      />
    </>
  );
}

export interface ConversationAttachmentProps {
  conversation: Conversation;

  leftLabel: string;

  rightLabel: string;

  listEmpty?: string;

  listError?: string;

  listEnd?: string;
}

ConversationAttachment.defaultProps = {
  leftLabel: 'Images',
  rightLabel: 'Files',
};

ConversationAttachment.displayName = nameof(ConversationAttachment);

export default ConversationAttachment;
