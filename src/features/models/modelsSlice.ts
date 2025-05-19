import { createSlice } from "@reduxjs/toolkit";
import type { ModelsState } from "../../utils/interfaces";
import type { PayloadAction } from "@reduxjs/toolkit"
import type { models } from "../../utils/interfaces";
import { trainModel } from "../train/trainThunk";
import { predict } from "../predict/predictThunk";

const initialState: ModelsState = {
    choosed: "classification",
    classification: {
        trained: false,
        targetColumn: "",
        choosed: false,
    },
    regression: {
        trained: false,
        targetColumn: "",
        choosed: false,
    },
    resnext: {
        choosed: false,
    },
    segmentation:{
        choosed: false,
    }
}

export const modelsSlice = createSlice({
    name: "models",
    initialState, 
    reducers: {
        resetTrained: (state, action: PayloadAction<models>) => {
            state[action.payload].trained = false
            state[action.payload].prediction = [];
        },
        resetModel: (state, action: PayloadAction<models>) => {
            state[action.payload].choosed = false
        },
        changeTargetColumn: (state, action: PayloadAction<{model: models, value: string}>) => {
            state[action.payload.model].targetColumn = action.payload.value
        },
        chooseModel: (state, action:  PayloadAction<models>) => {
            state[action.payload].choosed = true
            state.choosed = action.payload
        }, 
        setModelImageResnext: (state, action: PayloadAction<string>) => {
            state.resnext.image = action.payload
        },
        resetPredictions: (state, action: PayloadAction<models>) => {
            state[action.payload].prediction = [];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(trainModel.fulfilled, (state, action) => {
            const modelName = action.meta.arg.modelName as models
            state[modelName].trained = true
        })
        builder.addCase(predict.fulfilled, (state, action) => {
            const modelName = action.meta.arg.modelName as models
            state[modelName].prediction = action.payload.predictions
        })
    }
})

export const { resetTrained, resetModel, changeTargetColumn, chooseModel, setModelImageResnext, resetPredictions } = modelsSlice.actions;