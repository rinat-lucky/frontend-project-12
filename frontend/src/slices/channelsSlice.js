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
    setChannelsList: (state, action) => {
      state.list = action.payload;
    },
    setCurrentChannel: (state, action) => {
      state.currentChannelId = action.payload;
    },
    setActiveModal: (state, action) => {
      state.activeModal = action.payload;
    },
    addChannel: (state, action) => {
      state.list.push(action.payload);
      state.currentChannelId = action.payload.id;
    },
  },
});

export const { setChannelsList, setCurrentChannel, setActiveModal, addChannel } = channelsSlice.actions;
export default channelsSlice.reducer;
