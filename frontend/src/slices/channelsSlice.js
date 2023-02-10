import { createSlice } from '@reduxjs/toolkit';
import uniqueId from 'lodash.uniqueid';

const initialState = {
  list: [],
  currentChannelId: null,
  activeModal: null,
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannelsList: (state, { payload }) => {
      state.list = payload;
    },
    setCurrentChannel: (state, { payload }) => {
      state.currentChannelId = payload;
    },
    setActiveModal: (state, { payload }) => {
      state.activeModal = payload;
    },
    addChannel: (state, { payload }) => {
      const newChannel = {
        id: (Number(uniqueId()) + 2),
        name: payload,
        removable: true,
      };
      state.list.push(newChannel);
      state.currentChannelId = newChannel.id;
    },
    renameChannel: (state, { payload }) => {
      const targetChannel = state.list.find((channel) => channel.id === payload.targetChannelID);
      targetChannel.name = payload.newName;
    },
    removeChannel: (state, { payload }) => {
      state.list = state.list.filter((channel) => channel.id !== payload);
    },
  },
});

export const {
  setChannelsList,
  setCurrentChannel,
  setActiveModal,
  addChannel,
  renameChannel,
  removeChannel,
} = channelsSlice.actions;
export default channelsSlice.reducer;
