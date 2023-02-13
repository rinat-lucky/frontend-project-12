import { createSlice } from '@reduxjs/toolkit';
import { removeChannel } from './channelsSlice';

const initialState = {
  list: [],
  deliveryState: '',
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
    setDeliveryState: (state, { payload }) => {
      state.deliveryState = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(removeChannel, (state, { payload }) => {
      const restMessages = state.list.filter((m) => m.channelId !== payload.id);
      state.list = restMessages;
    });
  },
});

export const { setMessages, addMessage, setDeliveryState } = messagesSlice.actions;
export default messagesSlice.reducer;
