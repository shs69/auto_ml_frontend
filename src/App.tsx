import "./App.css"
import { useAppDispatch, useAppSelector } from "./app/hooks"
import { chooseModel, resetModel } from "./features/models/modelsSlice";
import type { ModelsState, models } from "./utils/interfaces";
import ClassificationModelApp from "./features/models/model_classification/classificationModelApp";
import RegressionModelApp from "./features/models/model_regression/regressionModelApp";
import ImageClassificationModelApp from "./features/models/image_classification/imageClassificationModelApp";
import SegmentationModelApp from "./features/models/image_segmentation/segmentationModelApp";
import type { RootState } from "./app/store";

const App = () => {
  const dispatch = useAppDispatch();
  const models = useAppSelector((state: RootState) => state.models)
  const classification = useAppSelector((state: RootState) => state.models.classification.choosed)
  const regression = useAppSelector((state: RootState) => state.models.regression.choosed)
  const resnext = useAppSelector((state: RootState) => state.models.resnext.choosed)
  const segmentation = useAppSelector((state: RootState) => state.models.segmentation.choosed)
  
  const chooseModels = (modelName: models) => {
    dispatch(chooseModel(modelName))
    const allModels = (Object.keys(models) as Array<Exclude<keyof ModelsState, "choosed">>).slice(1);
    console.log(allModels)
    allModels.forEach((model) => {
      if (model !== modelName) {
        dispatch(resetModel(model));
      }
    })
  }

  return (
    <div className="App">
        {(!classification && !regression && !resnext && !segmentation) && (
          <div>
            <p>
              Auto ML
            </p>
            <div className="buttons-home">
              <button onClick={ () => chooseModels("regression")}>
                Regression
              </button>
              <button onClick={() => chooseModels("classification")}> 
                Classification
              </button>
              <button onClick={() => chooseModels("resnext")}> 
                Image Classification
              </button>
              <button onClick={() => chooseModels("segmentation")}> 
                Image Segmentation
              </button>
            </div>
          </div>
        )}
        <div>
          {classification && <ClassificationModelApp/>}
          {regression && <RegressionModelApp/>}
          {resnext && <ImageClassificationModelApp/>}
          {segmentation && <SegmentationModelApp/>}
        </div>
      </div>
  )
}

export default App
