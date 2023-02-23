/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const DEFAULT_CHANNEL_ID = 1;

const initialState = {
  channelsList: [],
  currentChannelId: null,
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannelsList: (state, { payload }) => {
      state.channelsList = payload;
    },
    setCurrentChannel: (state, { payload }) => {
      state.currentChannelId = payload;
    },
    addChannel: (state, { payload }) => {
      state.channelsList.push(payload);
    },
    renameChannel: (state, { payload }) => {
      const targetChannel = state.channelsList.find((channel) => channel.id === payload.id);
      targetChannel.name = payload.name;
    },
    removeChannel: (state, { payload }) => {
      if (state.currentChannelId === payload) {
        state.currentChannelId = DEFAULT_CHANNEL_ID;
      }
      state.channelsList = state.channelsList.filter((channel) => channel.id !== payload);
    },
  },
});

export const {
  setChannelsList,
  setCurrentChannel,
  addChannel,
  renameChannel,
  removeChannel,
} = channelsSlice.actions;
export default channelsSlice.reducer;
