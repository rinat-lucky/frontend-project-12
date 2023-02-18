/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const DEFAULT_CHANNEL_ID = 1;

const initialState = {
  channelsList: [],
  currentChannelId: null,
  activeModal: null,
  isLoading: false,
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
    setActiveModal: (state, { payload }) => {
      state.activeModal = payload;
    },
    addChannel: (state, { payload }) => {
      state.channelsList.push(payload);
      state.currentChannelId = payload.id;
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
    setLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
  },
});

export const {
  setChannelsList,
  setCurrentChannel,
  setActiveModal,
  setLoading,
  addChannel,
  renameChannel,
  removeChannel,
} = channelsSlice.actions;
export default channelsSlice.reducer;
