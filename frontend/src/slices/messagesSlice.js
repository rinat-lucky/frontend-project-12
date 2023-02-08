import { createSlice } from '@reduxjs/toolkit';
import { removeChannel } from './channelsSlice';

const initialState = {
  collection: [],
  currentMessage: {},
  deliveredState: '',
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages: (state, { payload }) => {
      state.collection = payload;
    },
    addMessage: (state, { payload }) => {
      state.collection.push(payload);
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
      const restMessages = state.collection.filter((m) => m.channelId !== payload.id);
      state.collection = restMessages;
    });
  },
});

export const { setMessages, addMessage, setCurrentMessage, setDeliveredState } = messagesSlice.actions;
export default messagesSlice.reducer;
