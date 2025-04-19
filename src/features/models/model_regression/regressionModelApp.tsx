import "../../../App.css"
import { TrainFileUpload } from "../../train/trainFileUpload";
import { PredictFileUpload } from "../../predict/predictFileUpload"
import { useAppSelector, useAppDispatch } from "../../../app/hooks"
import { resetRegression, resetTrained} from "./regressionModelSlice";
import { resetClassification } from "../model_classification/classificationModelSlice";
import { reset } from "../../predict/predictSlice";
import { resetTrain } from "../../train/trainSlice";
import type { RootState } from "../../../app/store"

const RegressionModelApp = () => {
  const trained = useAppSelector((state: RootState) => state.RegressionModel.trained);
  const dispatch = useAppDispatch();
  
  const home = () => {
    dispatch(resetRegression())
    dispatch(resetClassification())
    dispatch(reset())
    dispatch(resetTrain())
  }

  const resetTrainF = () => {
    dispatch(resetTrained())
  }

  return (
    <div className="App">
        <p>
          Auto ML.Regression
        </p>
        {!trained && <TrainFileUpload/>}
        <div className="row">
          <div className="button-home">
            <button onClick={home} className="">
              Home
            </button> 
          </div>
          {trained && <div className="button-home">
            <button onClick={resetTrainF} className="">
              Reset
            </button> 
          </div>}
        </div>
        {trained && <PredictFileUpload/>}
    </div>
  )
}

export default RegressionModelApp
