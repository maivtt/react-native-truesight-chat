import type { PropsWithChildren, ReactElement } from 'react';
import React from 'react';
import styles from './ConversationMessageFlatList.scss';
import nameof from 'ts-nameof.macro';
import type { ConversationMessage } from 'react-native-truesight-chat';
import TruesightChat, {
  TruesightThemeExtension,
} from 'react-native-truesight-chat';
import {
  FlatList,
  ListRenderItem,
  ListRenderItemInfo,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';
import { LoadingStatus } from '../../hooks/use-list';
import ListFooter from '../atoms/ListFooter';
import MessageItem from '../atoms/MessageItem/MessageItem';
import moment from 'moment';
import { getDate } from '../../helper/string-helper';
import TextLib from '../atoms/TextLib';
import { useThemeValue } from 'react-native-redux-theming';
import Loading from 'react-native-spinkit';
import SvgIcon from '../atoms/SvgIcon/SvgIcon';

export function ConversationMessageFlatList(
  props: PropsWithChildren<ConversationMessageFlatListProps>
): ReactElement {
  const {
    globalUser,
    onSwipe,
    style,
    list,
    total,
    loading,
    refreshing,
    onLoadMore,
    typingLoading,
    error,
    listEnd,
  } = props;
  const { atomicStyles } = TruesightChat;
  const messageTextSecondaryColor = useThemeValue<TruesightThemeExtension>(
    'messageTextSecondaryColor'
  );
  const primaryColor = useThemeValue('primaryColor');
  const dangerColor = useThemeValue('dangerColor');

  const renderItem: ListRenderItem<ConversationMessage> = React.useCallback(
    ({ item, index }: ListRenderItemInfo<ConversationMessage>) => {
      return (
        <MessageItem
          globalUser={globalUser ?? {}}
          conversationMessage={item}
          key={index}
          consecutive={
            index !== 0 && list[index - 1]?.globalUserId === item?.globalUserId
          }
          onSwipe={onSwipe}
          header={
            index === total ||
            moment(getDate(item?.createdAt)).diff(
              moment(getDate(list[index + 1]?.createdAt)),
              'days'
            ) !== 0 ? (
              <View
                style={[
                  atomicStyles.pb3,
                  atomicStyles.pt4,
                  atomicStyles.flexRowCenter,
                ]}
              >
                <TextLib
                  style={[
                    atomicStyles.sub3,
                    { color: messageTextSecondaryColor },
                  ]}
                >
                  {moment(item?.createdAt).calendar()}
                </TextLib>
              </View>
            ) : undefined
          }
        />
      );
    },
    [atomicStyles, globalUser, list, messageTextSecondaryColor, onSwipe, total]
  );

  return (
    <>
      <FlatList
        renderItem={renderItem}
        data={list}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item: ConversationMessage, index: number) =>
          item?.id?.toString() + index?.toString()
        }
        inverted={!(loading === LoadingStatus.FAIL)}
        scrollEventThrottle={10}
        refreshing={refreshing}
        onEndReachedThreshold={0.5}
        onEndReached={onLoadMore}
        ListHeaderComponent={
          <>
            {typingLoading && (
              <View style={[styles.loading, { backgroundColor: primaryColor }]}>
                <Loading
                  isVisible={true}
                  size={20}
                  color={'white'}
                  type={'ThreeBounce'}
                />
              </View>
            )}
            {error && !typingLoading && (
              <View style={atomicStyles.flexRowCenter}>
                <SvgIcon
                  component={require('../../../assets/icons/error.svg')}
                />
                <TextLib
                  style={[
                    atomicStyles.my2,
                    atomicStyles.ml2,
                    { color: dangerColor },
                  ]}
                >
                  {error}
                </TextLib>
              </View>
            )}
            <View style={styles.footer} />
          </>
        }
        ListHeaderComponentStyle={[styles.headerListStyle]}
        ListFooterComponent={
          <ListFooter
            isData={true}
            isEnd={false}
            check={total !== list?.length}
            listEnd={listEnd}
          />
        }
        style={style}
      />
    </>
  );
}

export interface ConversationMessageFlatListProps {
  globalUser?: any;

  onSwipe?: (conversationMessage: ConversationMessage) => void;

  list: ConversationMessage[];

  total: number;

  loading?: LoadingStatus;

  refreshing?: boolean;

  onLoadMore?: () => void;

  typingLoading?: boolean;

  error?: string;

  style?: StyleProp<ViewStyle>;

  listEnd?: string;
}

ConversationMessageFlatList.defaultProps = {
  //
};

ConversationMessageFlatList.displayName = nameof(ConversationMessageFlatList);

export default ConversationMessageFlatList;
