import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
  currentChannelId: null,
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
  },
});

export const { setChannelsList, setCurrentChannel } = channelsSlice.actions;
export default channelsSlice.reducer;
