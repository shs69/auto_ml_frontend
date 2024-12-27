import "./App.css"
import { useAppDispatch, useAppSelector } from "./app/hooks"
import { chooseClassification, resetClassification } from "./features/models/model_classification/classificationModelSlice"
import { chooseRegression, resetRegression } from "./features/models/model_regression/regressionModelSlice";
import ClassificationModelApp from "./features/models/model_classification/classificationModelApp";
import RegressionModelApp from "./features/models/model_regression/regressionModelApp";
import type { RootState } from "./app/store";

const App = () => {
  const dispatch = useAppDispatch();
  const classification = useAppSelector((state: RootState) => state.ClassificationModel.choosed)
  const regression = useAppSelector((state: RootState) => state.RegressionModel.choosed)
  
  const choosedRegression = () => {
    dispatch(chooseRegression())
    dispatch(resetClassification())
  }
  
  const choosedClassification = () => {
    dispatch(chooseClassification())
    dispatch(resetRegression())
  }

  return (
    <div className="App">
        {(!classification && !regression) && (
          <div>
            <p>
              Auto ML
            </p>
            <div className="buttons-home">
              <button onClick={choosedRegression}>
                Regression
              </button>
              <button onClick={choosedClassification}> 
                Classification
              </button>
            </div>
          </div>
        )}
        <div>
          {classification && <ClassificationModelApp/>}
          {regression && <RegressionModelApp/>}
        </div>
      </div>
  )
}

export default App
