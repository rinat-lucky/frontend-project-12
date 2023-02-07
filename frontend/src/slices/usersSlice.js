import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addNewUser: (state, action) => {
      state.list.push(action.payload);
    },
  },
});

export const { addNewUser } = usersSlice.actions;
export default usersSlice.reducer;
