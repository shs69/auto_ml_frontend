import "../../../App.css"
import { TrainFileUpload } from "../../train/trainFileUpload";
import { PredictFileUpload } from "../../predict/predictFileUpload"
import { useAppSelector, useAppDispatch } from "../../../app/hooks"
import { resetModel, resetTrained, resetPredictions } from "../modelsSlice";
import { reset } from "../../predict/predictSlice";
import { resetTrain } from "../../train/trainSlice";
import type { RootState } from "../../../app/store"

const RegressionModelApp = () => {
  const trained = useAppSelector((state: RootState) => state.models.regression.trained);
  const dispatch = useAppDispatch();
  
  const home = () => {
    dispatch(resetModel("regression"))
    dispatch(reset())
    dispatch(resetTrain())
  }

  const resetTrainF = () => {
    dispatch(resetTrained("regression"))
    dispatch(reset())
  }

  const back = () => {
     dispatch(resetPredictions("regression"))
     dispatch(reset())
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
            <button onClick={back} className="">
              Back
            </button> 
          </div>}
        </div>
        {trained && <PredictFileUpload/>}
    </div>
  )
}

export default RegressionModelApp
