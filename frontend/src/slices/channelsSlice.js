/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channelsList: [],
  currentChannelId: null,
  activeModal: null,
  updateLoading: false,
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
      state.channelsList = state.channelsList.filter((channel) => channel.id !== payload);
    },
    setUpdateLoading: (state, { payload }) => {
      state.updateLoading = payload;
    },
  },
});

export const {
  setChannelsList,
  setCurrentChannel,
  setActiveModal,
  setUpdateLoading,
  addChannel,
  renameChannel,
  removeChannel,
} = channelsSlice.actions;
export default channelsSlice.reducer;
