import { createSlice } from '@reduxjs/toolkit';
import nameof from 'ts-nameof.macro';
import type { ConversationMessage } from 'src/models/ConversationMessage';
import type { GlobalState } from '../selectors';

export const conversationSlice = createSlice({
  name: nameof('conversation'),
  initialState: {
    conversations: [],
  },
  reducers: {
    setMessage(
      state: GlobalState['conversation'],
      action: {
        type: string;
        payload: ConversationMessage;
      }
    ) {
      state.message = action.payload;
    },

    setConversation(
      state: GlobalState['conversation'],
      action: {
        type: string;
        payload: ConversationMessage[];
      }
    ) {
      state.conversations = action.payload;
    },

    removeMessage(state: GlobalState['conversation']) {
      state.message = undefined;
    },
  },
});
