import type { PropsWithChildren, ReactElement } from 'react';
import React from 'react';
import styles from './ConversationCreateLayout.scss';
import nameof from 'ts-nameof.macro';
import type { ListRenderItem, ListRenderItemInfo } from 'react-native';
import {
  ActivityIndicator,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import TruesightChat, {
  Conversation,
  GlobalUser,
  TruesightThemeExtension,
} from 'react-native-truesight-chat';
import { conversationService } from '../../services';
import SvgIcon from '../atoms/SvgIcon/SvgIcon';
import TextLib from '../atoms/TextLib';
import { useThemeValue } from 'react-native-redux-theming';

export function ConversationCreateLayout(
  props: PropsWithChildren<ConversationCreateLayoutProps>
): ReactElement {
  const {
    currentGlobalUser,
    onPress,
    multiSelect,
    leftSearchComponent,
    rightSearchComponent,
    listSelect,
    listIdDefault,
    placeholder,
    suggestLabel,
    listGlobalUserEmpty,
    createGroupButtonVisible,
    createGroupButtonLabel,
    onCreateGroupButtonPress,
    children,
  } = props;
  const { atomicStyles } = TruesightChat;
  const messageTextPrimaryColor = useThemeValue<TruesightThemeExtension>(
    // @ts-ignore
    'messageTextPrimaryColor'
  );

  const [list, loading, search, error, handleSearch, handleRefresh] =
    conversationService.useListGlobalUser(currentGlobalUser);

  const handlePressItem = React.useCallback(
    (globalUser: GlobalUser) => () => {
      if (typeof onPress === 'function') {
        onPress(globalUser);
      }
    },
    [onPress]
  );

  const renderItem: ListRenderItem<GlobalUser> = React.useCallback(
    ({ item, index }: ListRenderItemInfo<GlobalUser>) => {
      return (
        <TouchableOpacity
          key={index}
          style={[atomicStyles.flexRowBetween, atomicStyles.my2]}
          onPress={handlePressItem(item)}
        >
          <View style={[atomicStyles.flexRowStart]}>
            <Image
              style={styles.avatarContainer}
              source={
                item?.avatar
                  ? { uri: TruesightChat.serverUrl + item.avatar }
                  : require('../../../assets/images/default-avatar.png')
              }
            />
            <TextLib
              style={[
                atomicStyles.texRegular,
                atomicStyles.bold,
                atomicStyles.ml2,
              ]}
              numberOfLines={1}
            >
              {item?.displayName}
            </TextLib>
          </View>
          <View>
            {multiSelect && listSelect && (
              <>
                {listSelect.map((e: GlobalUser) => e.id).includes(item.id) ? (
                  <SvgIcon
                    component={require('../../../assets/icons/radio.svg')}
                  />
                ) : (
                  <SvgIcon
                    component={require('../../../assets/icons/radio-blank.svg')}
                  />
                )}
              </>
            )}
          </View>
        </TouchableOpacity>
      );
    },
    [atomicStyles, handlePressItem, listSelect, multiSelect]
  );

  return (
    <>
      <View
        style={[atomicStyles.flexRowStart, atomicStyles.p4, styles.bgColor]}
      >
        {typeof leftSearchComponent === 'string' ? (
          <TextLib>{leftSearchComponent}</TextLib>
        ) : (
          leftSearchComponent
        )}
        <TextInput
          style={[
            styles.inputStyle,
            atomicStyles.text,
            { color: messageTextPrimaryColor },
          ]}
          value={search}
          onChangeText={handleSearch}
          placeholder={placeholder}
        />
        {rightSearchComponent}
      </View>
      {search.length === 0 && (
        <>
          {children}
          {createGroupButtonVisible && (
            <TouchableOpacity
              style={[atomicStyles.flexRowBetween, atomicStyles.p4]}
              onPress={onCreateGroupButtonPress}
            >
              <View style={[atomicStyles.flexRowStart]}>
                <SvgIcon
                  component={require('../../../assets/icons/group.svg')}
                />
                <TextLib style={[atomicStyles.semibold, atomicStyles.ml4]}>
                  {createGroupButtonLabel ?? ''}
                </TextLib>
              </View>
              <SvgIcon component={require('../../../assets/icons/right.svg')} />
            </TouchableOpacity>
          )}
          {suggestLabel && (
            <TextLib
              style={[
                atomicStyles.mx4,
                !createGroupButtonVisible ? atomicStyles.my2 : atomicStyles.mb2,
                atomicStyles.light,
              ]}
            >
              {suggestLabel}
            </TextLib>
          )}
        </>
      )}
      <FlatList
        style={[atomicStyles.px4]}
        renderItem={renderItem}
        data={
          listIdDefault
            ? list?.filter((e) => !listIdDefault?.includes(e.id!))
            : list
        }
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item: Conversation) => item.id!.toString()}
        refreshing={false}
        onEndReachedThreshold={0.5}
        onRefresh={handleRefresh}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator color={Colors.Gray} />
          ) : (
            <TextLib
              style={[
                atomicStyles.textCenter,
                atomicStyles.light,
                atomicStyles.mt4,
              ]}
            >
              {error ? error : listGlobalUserEmpty ? listGlobalUserEmpty : ''}
            </TextLib>
          )
        }
      />
    </>
  );
}

export interface ConversationCreateLayoutProps {
  currentGlobalUser: GlobalUser;

  placeholder?: string;

  suggestLabel?: string; //Text showing initial list of suggestions

  createGroupButtonLabel?: string; //Text showing label button create group

  onCreateGroupButtonPress?: () => void; //Text showing label button create group

  listGlobalUserEmpty?: string; // Displays a message that there are no users

  onPress?: (globalUser: GlobalUser) => void;

  multiSelect?: boolean; // Select multi global user to create group conversation

  createGroupButtonVisible?: boolean; // Default group button component

  leftSearchComponent?: ReactElement | ReactElement[] | string; // The element to the left of the search box global user

  rightSearchComponent?: ReactElement | ReactElement[]; // The element to the right of the search box global user

  listSelect?: GlobalUser[]; //List of global users selected to create a group conversation

  listIdDefault?: number[]; //List of global user ids already in the group conversation
}

ConversationCreateLayout.defaultProps = {
  currentGlobalUser: {},
  createGroupButtonVisible: false,
};

ConversationCreateLayout.displayName = nameof(ConversationCreateLayout);

export default ConversationCreateLayout;
