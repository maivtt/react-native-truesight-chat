# react-native-truesight-chat

Build react native truesight app chat for Truesight team.

## Installation

```sh
npm install react-native-truesight-chat

or

yarn add react-native-truesight-chat
```

```sh
yarn add react-native-permission react-native-spinkit @react-native-community/cameraroll react-native-blob-util react-native-reanimated@2.4.1
```

`react-native-permission`
- Camera
- PhotoLibrary
- PhotoLibraryAddOnly
- MediaLibrary
- Notifications

`react-native.config.ts`
```sh
    'react-native-truesight-chat': {
          platforms: {
            android: null,
            ios: null,
          },
    },
```

## Usage
Define a config TruesightChat with following properies as such:

| Property                    | Type | Description |
|-----------------------------|------|-------------|
| serverUrl                   |      |             |
| atomicStyles                |      |             |
| listConversation            |      |             |
| countConversation           |      |             |
| listConversationMessage     |      |             |
| countConversationMessage    |      |             |
| listConversationAttachment  |      |             |
| countConversationAttachment |      |             |
| multiUploadFile             |      |             |
| create                      |      |             |
| singleListGlobalUser        |      |             |

Example:

```js
TruesightChat.config({
  serverUrl: server.serverUrl,
  atomicStyles: atomicStyles,
  listConversation: conversationRepository.list,
  countConversation: conversationRepository.count,
  listConversationMessage: conversationMessageRepository.list,
  countConversationMessage: conversationMessageRepository.count,
  listConversationAttachment:
    conversationMessageRepository.listConversationAttachment,
  countConversationAttachment:
    conversationMessageRepository.countConversationAttachment,
  multiUploadFile: conversationRepository.multiUploadFile,
  create: conversationMessageRepository.create,
  singleListGlobalUser: conversationRepository.singleListGlobalUser,
});
```

### `ConversationFlatList` extends `FlatListProps`
Define a list conversation style with following properies as such:
```js
<ConversationFlatList
        navigation={navigation}
        target={ConversationChatScreen.displayName}
      />
```

| Property                 | Type                  | Description |
|--------------------------|-----------------------|-------------|
| list                     | array                 |             |
| total                    | number                |             |
| loading                  | boolean               |             |
| refreshing               | boolean               |             |
| onLoadMore               | () => void            |             |
| error                    | string                |             |
| listHeaderComponentStyle | StyleSheet<ViewStyle> |             |
| style                    | StyleSheet<ViewStyle> |             |
| renderItem               | ReactElement          |             |
| itemStyle                | StyleSheet<ViewStyle> |             |

### `ConversationChat` extends `FlatListProps`
Define a conversation chat style with following properies as such:

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
