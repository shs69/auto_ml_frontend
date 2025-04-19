import { trainModel } from "../../train/trainThunk"
import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { ClassificationModel } from "../../../utils/interfaces"

const initialState: ClassificationModel = {
    trained: false,
    targetColumn: "",
    choosed: false,
}

export const classificationModelSlice = createSlice({
    name: 'ClassificationModel',
    initialState,
    reducers: {
        resetTrained: (state) => {state.trained = false},
        resetClassification: (state) => {state.choosed = false},
        changeTargetColumn: (state, action: PayloadAction<string>) => {state.targetColumn = action.payload},
        chooseClassification: (state) => {state.choosed = true}
    },
    extraReducers: (builder) =>
        builder
    .addCase(trainModel.fulfilled, (state) => {
        console.log("trainModel fulfilled");
        state.trained = true
      })
})

export const { resetTrained, resetClassification, changeTargetColumn, chooseClassification } = classificationModelSlice.actions;