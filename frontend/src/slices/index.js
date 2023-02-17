import { configureStore } from '@reduxjs/toolkit';
import channels from './channelsSlice';
import messages from './messagesSlice';

const store = configureStore({
  reducer: {
    channels,
    messages,
  },
});

export default store;
