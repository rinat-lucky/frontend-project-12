import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
  currentUser: {},
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addNewUser: (state, action) => {
      state.list.push(action.payload);
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export const { addNewUser, setCurrentUser } = usersSlice.actions;
export default usersSlice.reducer;
