/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { removeChannel, fetchData } from './channelsSlice';

const messagesAdapter = createEntityAdapter();

const messagesSlice = createSlice({
  name: 'messages',
  initialState: messagesAdapter.getInitialState(),
  reducers: { addMessage: messagesAdapter.addOne },
  extraReducers: (builder) => {
    builder
      .addCase(removeChannel, (state, { payload }) => {
        const removingMessagesIds = Object
          .values(state.entities)
          .filter((m) => m.channelId === payload)
          .map((m) => m.id);
        messagesAdapter.removeMany(state, removingMessagesIds);
      })
      .addCase(fetchData.fulfilled, (state, { payload }) => {
        messagesAdapter.addMany(state, payload.messages);
      });
  },
});

export const selectors = messagesAdapter.getSelectors((state) => state.messages);
export const { setMessages, addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
