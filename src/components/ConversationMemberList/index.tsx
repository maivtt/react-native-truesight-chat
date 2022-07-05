import type { PropsWithChildren, ReactElement } from 'react';
import React from 'react';
import nameof from 'ts-nameof.macro';
import {
  FlatList,
  ListRenderItem,
  ListRenderItemInfo,
  StyleProp,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import TruesightChat, {
  Conversation,
  ConversationParticipant,
} from 'react-native-truesight-chat';
import Avatar from '../atoms/Avatar';
import { conversationService } from '../../services';
import TextLib from '../atoms/TextLib';
import SvgIcon from '../atoms/SvgIcon/SvgIcon';
import { useThemeValue } from 'react-native-redux-theming';
import Tab from '../atoms/Tab';

export function ConversationMemberList(
  props: PropsWithChildren<ConversationMemberListProps>
): ReactElement {
  const {
    navigation,
    conversation,
    tabLabel,
    onConversationParticipant,
    listStyle,
    tabStyle,
    labelStyle,
    labelContainerStyle,
    selectedStyle,
    selectedContainerStyle,
  } = props;
  const { atomicStyles } = TruesightChat;
  const dangerColor = useThemeValue('dangerColor');

  const [
    conversationDetail,
    conversationParticipants,
    ,
    error,
    tab,
    handleChangeTab,
  ] = conversationService.useMember(conversation, navigation);

  const renderItem: ListRenderItem<ConversationParticipant> = React.useCallback(
    ({ item, index }: ListRenderItemInfo<ConversationParticipant>) => {
      return (
        <TouchableOpacity
          key={index}
          style={[
            atomicStyles.flexRowStart,
            atomicStyles.mx4,
            atomicStyles.my2,
          ]}
          onPress={() => {
            if (onConversationParticipant) {
              onConversationParticipant(item.globalUser!);
            }
          }}
        >
          <Avatar radius={40} source={item?.globalUser?.avatar} />
          <TextLib
            style={[atomicStyles.ml4, atomicStyles.medium]}
            numberOfLines={1}
          >
            {item?.globalUser?.displayName}
          </TextLib>
        </TouchableOpacity>
      );
    },
    [atomicStyles, onConversationParticipant]
  );

  return (
    <>
      <Tab
        tab={tab}
        onTab={handleChangeTab}
        label={tabLabel}
        tabStyle={tabStyle}
        labelStyle={labelStyle}
        labelContainerStyle={labelContainerStyle}
        selectedStyle={selectedStyle}
        selectedContainerStyle={selectedContainerStyle}
      />
      {tab === 0 && (
        <FlatList
          style={listStyle}
          renderItem={renderItem}
          data={conversationParticipants}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index: number) =>
            item?.id?.toString() + index?.toString()
          }
          scrollEventThrottle={10}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            error ? (
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
            ) : (
              <View />
            )
          }
        />
      )}
      {tab === 1 && conversationDetail?.creator && (
        <View
          style={[
            atomicStyles.flexRowStart,
            atomicStyles.mx4,
            atomicStyles.my2,
            listStyle,
          ]}
        >
          <Avatar radius={40} source={conversationDetail.creator?.avatar} />
          <TextLib
            style={[atomicStyles.ml4, atomicStyles.medium]}
            numberOfLines={1}
          >
            {conversationDetail.creator?.displayName}
          </TextLib>
        </View>
      )}
    </>
  );
}

export interface ConversationMemberListProps {
  navigation: any;

  conversation: Conversation;

  tabLabel: string[];

  onConversationParticipant?: (
    conversationParticipant: ConversationParticipant
  ) => void;

  listStyle?: StyleProp<ViewStyle>;

  tabStyle?: StyleProp<ViewStyle>;

  labelContainerStyle?: StyleProp<ViewStyle>;

  selectedContainerStyle?: StyleProp<ViewStyle>;

  selectedStyle?: StyleProp<TextStyle>;

  labelStyle?: StyleProp<TextStyle>;
}

ConversationMemberList.defaultProps = {
  tabLabel: ['Member, Creator'],
};

ConversationMemberList.displayName = nameof(ConversationMemberList);

export default ConversationMemberList;
