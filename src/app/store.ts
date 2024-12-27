import type { Action, ThunkAction } from "@reduxjs/toolkit"
import { combineSlices, configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import trainFileSlice from "../features/train/trainSlice"
import { classificationModelSlice } from "../features/models/model_classification/classificationModelSlice"
import predictFileSlice from "../features/predict/predictSlice"
import { regressionModelSlice } from "../features/models/model_regression/regressionModelSlice"

const rootReducer = combineSlices(trainFileSlice, classificationModelSlice, predictFileSlice, regressionModelSlice)

export type RootState = ReturnType<typeof rootReducer>
export const makeStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
  })
  setupListeners(store.dispatch)
  return store
}

export const store = makeStore()

export type AppStore = typeof store
export type AppDispatch = AppStore["dispatch"]
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>
