import { createSlice } from "@reduxjs/toolkit";
import { predict } from "./predictThunk";
import type { FileState } from "../../utils/interfaces";

const initialState: FileState = {
    isLoading: false,
    error: null,
    message: null,
    loaded: false,
    prediction: [],
}

const predictFileSlice = createSlice({
    name: "PredictFile",
    initialState,
    reducers: {
        reset: (state) => {
            state.prediction = []
            state.loaded = false
        },
    },
    extraReducers: (builer) => {
        builer
        .addCase(predict.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        })
        .addCase(predict.fulfilled, (state, action) => {
        state.isLoading = false;
        state.prediction = action.payload.predictions;
        state.loaded = true;
        })
        .addCase(predict.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'Failed to upload file';
    });
    },
})

export default predictFileSlice;
export const {reset} = predictFileSlice.actions;