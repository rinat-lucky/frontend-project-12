import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setMessages } = messagesSlice.actions;
export default messagesSlice.reducer;
