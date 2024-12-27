import { trainModel } from "../../train/trainThunk"
import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { RegressionModel } from "../../../utils/interfaces"

const initialState: RegressionModel = {
    trained: false,
    targetColumn: "",
    choosed: false,
}

export const regressionModelSlice = createSlice({
    name: 'RegressionModel',
    initialState,
    reducers: {
        reset: (state) => {state.trained = false;state.choosed = false},
        resetRegression: (state) => {state.trained = false;state.choosed = false},
        changeTargetColumn: (state, action: PayloadAction<string>) => {state.targetColumn = action.payload},
        chooseRegression: (state) => {state.choosed = true}
    },
    extraReducers: (builder) =>
        builder
    .addCase(trainModel.fulfilled, (state) => {
        console.log("trainModel fulfilled");
        state.trained = true
      })
})

export const { resetRegression, changeTargetColumn, chooseRegression } = regressionModelSlice.actions;