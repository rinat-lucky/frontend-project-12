import { configureStore } from '@reduxjs/toolkit';
import channels from './channelsSlice';
import messages from './messagesSlice';
import modal from './modalSlice';

const store = configureStore({
  reducer: {
    channels,
    messages,
    modal,
  },
});

export default store;
