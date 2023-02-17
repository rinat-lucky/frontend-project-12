/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { removeChannel } from './channelsSlice';

const initialState = {
  totalMessagesList: [],
  deliveryState: '',
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages: (state, { payload }) => {
      state.totalMessagesList = payload;
    },
    addMessage: (state, { payload }) => {
      state.totalMessagesList.push(payload);
    },
    setDeliveryState: (state, { payload }) => {
      state.deliveryState = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(removeChannel, (state, { payload }) => {
      const restMessages = state.totalMessagesList.filter((m) => m.channelId !== payload.id);
      state.totalMessagesList = restMessages;
    });
  },
});

export const { setMessages, addMessage, setDeliveryState } = messagesSlice.actions;
export default messagesSlice.reducer;
