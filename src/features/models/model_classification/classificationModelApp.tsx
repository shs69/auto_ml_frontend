import "../../../App.css"
import { TrainFileUpload } from "../../train/trainFileUpload";
import { PredictFileUpload } from "../../predict/predictFileUpload"
import { resetClassification } from "./classificationModelSlice";
import { reset } from "../../predict/predictSlice";
import { resetTrain } from "../../train/trainSlice";
import { useAppSelector, useAppDispatch } from "../../../app/hooks"
import type { RootState } from "../../../app/store"
import { resetRegression } from "../model_regression/regressionModelSlice";

const ClassificationModelApp = () => {
  const dispatch = useAppDispatch();
  
  const home = () => {
    dispatch(resetRegression())
    dispatch(resetClassification())
    dispatch(reset())
    dispatch(resetTrain())
  }


  const trained = useAppSelector((state: RootState) => state.ClassificationModel.trained);
  return (
    <div className="App">
        <p>
          Auto ML.Classification
        </p>
        {!trained? <TrainFileUpload/> : null}
        <div className="button-home">
          <button onClick={home} className="">
            Home
          </button> 
        </div>
        {trained ? <PredictFileUpload/> : null}
    </div>
  )
}

export default ClassificationModelApp
