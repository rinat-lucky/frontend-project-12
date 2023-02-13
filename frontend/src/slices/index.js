import { configureStore } from '@reduxjs/toolkit';
import channels from './channelsSlice';
import messages from './messagesSlice';
import users from './usersSlice';

const store = configureStore({
  reducer: {
    channels,
    messages,
    users,
  },
});

export default store;
