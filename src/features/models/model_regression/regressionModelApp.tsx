import "../../../App.css"
import { TrainFileUpload } from "../../train/trainFileUpload";
import { PredictFileUpload } from "../../predict/predictFileUpload"
import { useAppSelector, useAppDispatch } from "../../../app/hooks"
import { resetRegression } from "./regressionModelSlice";
import { resetClassification } from "../model_classification/classificationModelSlice";
import { reset } from "../../predict/predictSlice";
import { resetTrain } from "../../train/trainSlice";
import type { RootState } from "../../../app/store"

const RegressionModelApp = () => {
  const model = useAppSelector((state: RootState) => state.RegressionModel);
  const dispatch = useAppDispatch();
  
  const home = () => {
    dispatch(resetRegression())
    dispatch(resetClassification())
    dispatch(reset())
    dispatch(resetTrain())
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Auto ML.Regression
        </p>
        {!model.trained? <TrainFileUpload/> : null}
        <div className="button-home">
          <button onClick={home} className="home">
              Home
          </button>
        </div>
        {model.trained ? <PredictFileUpload/> : null}
      </header>
    </div>
  )
}

export default RegressionModelApp
