/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { routesAPI } from '../routes';
import getAuthHeader from '../utils';

export const fetchData = createAsyncThunk(
  'fetchData',
  async () => {
    const { data } = await axios.get(
      routesAPI.dataPath(),
      { headers: getAuthHeader() },
    );
    return data;
  },
);

const DEFAULT_CHANNEL_ID = 1;
const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState({
  currentChannelId: null,
  error: null,
});

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: channelsAdapter.addOne,
    renameChannel: channelsAdapter.upsertOne,
    removeChannel: (state, { payload }) => {
      if (state.currentChannelId === payload) {
        state.currentChannelId = DEFAULT_CHANNEL_ID;
      }
      channelsAdapter.removeOne(state, payload);
    },
    setCurrentChannel: (state, { payload }) => {
      state.currentChannelId = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, { payload }) => {
        channelsAdapter.addMany(state, payload.channels);
        state.currentChannelId = payload.currentChannelId;
      })
      .addCase(fetchData.rejected, (state, { error }) => {
        state.error = error;
      });
  },
});

export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export const {
  setChannelsList,
  setCurrentChannel,
  addChannel,
  renameChannel,
  removeChannel,
} = channelsSlice.actions;
export default channelsSlice.reducer;
