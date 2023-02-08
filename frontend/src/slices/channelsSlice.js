import { createSlice } from '@reduxjs/toolkit';

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
      state.list.push(payload);
      state.currentChannelId = payload.id;
    },
    renameChannel: (state, { payload }) => {
      const targetChannel = state.list.find((channel) => channel.id === payload.id);
      targetChannel.name = payload.name;
    },
    removeChannel: (state, { payload }) => {
      state.list = state.list.filter((channel) => channel.id !== payload.id);
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
