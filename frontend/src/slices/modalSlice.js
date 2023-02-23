/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeModal: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setActiveModal: (state, { payload }) => {
      state.activeModal = payload;
    },
  },
});

export const { setActiveModal } = modalSlice.actions;
export default modalSlice.reducer;
