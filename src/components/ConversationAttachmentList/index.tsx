import type { PropsWithChildren, ReactElement } from 'react';
import React from 'react';
import styles from './ConversationAttachmentList.scss';
import nameof from 'ts-nameof.macro';
import {
  Dimensions,
  FlatList,
  Image,
  ListRenderItem,
  ListRenderItemInfo,
  StyleProp,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import TruesightChat, {
  Conversation,
  ConversationAttachment as ConversationAttachmentModel,
} from 'react-native-truesight-chat';
import { conversationService } from '../../services';
import moment from 'moment';
import { getDate } from '../../helper/string-helper';
import TextLib from '../atoms/TextLib';
import SvgIcon from '../atoms/SvgIcon/SvgIcon';
import Tab from '../atoms/Tab';
import ListLoading from '../atoms/ListLoading';
import ListFooter from '../atoms/ListFooter';

const { width: SCREEN_WIDTH } = Dimensions.get('screen');

export function ConversationAttachmentList(
  props: PropsWithChildren<ConversationAttachmentListProps>
): ReactElement {
  const {
    conversation,
    listError,
    listEnd,
    listEmpty,
    leftLabel,
    rightLabel,
    tabStyle,
    labelContainerStyle,
    labelStyle,
    selectedStyle,
    selectedContainerStyle,
  } = props;
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
                  style={[{ maxWidth: SCREEN_WIDTH - 120 }]}
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
        tabStyle={[atomicStyles.pb2, tabStyle]}
        labelStyle={labelStyle}
        labelContainerStyle={labelContainerStyle}
        selectedStyle={selectedStyle}
        selectedContainerStyle={selectedContainerStyle}
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

export interface ConversationAttachmentListProps {
  conversation: Conversation;

  leftLabel: string;

  rightLabel: string;

  listEmpty?: string;

  listError?: string;

  listEnd?: string;

  tabStyle?: StyleProp<ViewStyle>;

  labelContainerStyle?: StyleProp<ViewStyle>;

  selectedContainerStyle?: StyleProp<ViewStyle>;

  selectedStyle?: StyleProp<TextStyle>;

  labelStyle?: StyleProp<TextStyle>;
}

ConversationAttachmentList.defaultProps = {
  //
};

ConversationAttachmentList.displayName = nameof(ConversationAttachmentList);

export default ConversationAttachmentList;
