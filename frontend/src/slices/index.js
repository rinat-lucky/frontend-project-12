import { configureStore } from '@reduxjs/toolkit';
import channels from './channelsSlice';
import messages from './messagesSlice';
import users from './usersSlice';

export default configureStore({
  reducer: {
    channels,
    messages,
    users,
  },
});
