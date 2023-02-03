import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  collection: [],
  currentMessage: {},
  deliveredState: '',
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.collection = action.payload;
    },
    addMessage: (state, action) => {
      state.collection.push(action.payload);
    },
    setCurrentMessage: (state, action) => {
      state.currentMessage = action.payload;
    },
    setDeliveredState: (state, action) => {
      state.deliveredState = action.payload;
    },
  },
});

export const { setMessages, addMessage, setCurrentMessage, setDeliveredState } = messagesSlice.actions;
export default messagesSlice.reducer;
