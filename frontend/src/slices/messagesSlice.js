import { createSlice } from '@reduxjs/toolkit';
import { removeChannel } from './channelsSlice';

const initialState = {
  list: [],
  currentMessage: {},
  deliveredState: '',
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages: (state, { payload }) => {
      state.list = payload;
    },
    addMessage: (state, { payload }) => {
      state.list.push(payload);
    },
    setCurrentMessage: (state, { payload }) => {
      state.currentMessage = payload;
    },
    setDeliveredState: (state, { payload }) => {
      state.deliveredState = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(removeChannel, (state, { payload }) => {
      const restMessages = state.list.filter((m) => m.channelId !== payload.id);
      state.list = restMessages;
    });
  },
});

export const { setMessages, addMessage, setCurrentMessage, setDeliveredState } = messagesSlice.actions;
export default messagesSlice.reducer;
