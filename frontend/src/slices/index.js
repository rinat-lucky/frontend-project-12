import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channelsSlice';
import messagesReducer from './messagesSlice';
// import usersReducer from './usersSlice';

export default configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
    // users: usersReducer,
  },
});
