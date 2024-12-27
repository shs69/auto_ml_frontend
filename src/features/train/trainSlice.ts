import { trainModel } from './trainThunk';
import { createSlice } from '@reduxjs/toolkit';
import type { FileState } from '../../utils/interfaces';

const initialState: FileState = {
  isLoading: false,
  error: null,
  message: null,
  loaded: false,
};

const trainFileSlice = createSlice({
  name: 'TrainFile',
  initialState,
  reducers: {
    resetTrain: (state) => {
      state.loaded = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(trainModel.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(trainModel.fulfilled, (state) => {
        state.isLoading = false;
        state.loaded = true;
      })
      .addCase(trainModel.rejected, (state, action) => {
        state.isLoading = false;
        state.error = 'Failed to upload file';
      });
  },
});

export default trainFileSlice;
export const {resetTrain} = trainFileSlice.actions;