import "../../../App.css"
import { TrainFileUpload } from "../../train/trainFileUpload";
import { PredictFileUpload } from "../../predict/predictFileUpload"
import { resetClassification, resetTrained } from "./classificationModelSlice";
import { reset } from "../../predict/predictSlice";
import { resetTrain } from "../../train/trainSlice";
import { useAppSelector, useAppDispatch } from "../../../app/hooks"
import type { RootState } from "../../../app/store"
import { resetRegression } from "../model_regression/regressionModelSlice";

const ClassificationModelApp = () => {
  const dispatch = useAppDispatch();
  const trained = useAppSelector((state: RootState) => state.ClassificationModel.trained);
  
  const resetTrainF = () => {
    dispatch(resetTrained())
  }

  const home = () => {
    dispatch(resetRegression())
    dispatch(resetClassification())
    dispatch(reset())
    dispatch(resetTrain())
  }


  return (
    <div className="App">
        <p>
          Auto ML.Classification
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

export default ClassificationModelApp
