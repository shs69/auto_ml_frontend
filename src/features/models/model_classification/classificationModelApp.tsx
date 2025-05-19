import "../../../App.css"
import { TrainFileUpload } from "../../train/trainFileUpload";
import { PredictFileUpload } from "../../predict/predictFileUpload"
import { resetModel, resetTrained, resetPredictions } from "../modelsSlice";
import { reset } from "../../predict/predictSlice";
import { resetTrain } from "../../train/trainSlice";
import { useAppSelector, useAppDispatch } from "../../../app/hooks"
import type { RootState } from "../../../app/store"


const ClassificationModelApp = () => {
  const dispatch = useAppDispatch();
  const trained = useAppSelector((state: RootState) => state.models.classification.trained);
  
  const resetTrainF = () => {
    dispatch(resetTrained("classification"))
    dispatch(reset())
  }

  const home = () => {
    dispatch(resetModel("classification"))
    dispatch(reset())
    dispatch(resetTrain())
  }

  const back = () => {
   dispatch(resetPredictions("classification"))
   dispatch(reset())
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
            <button onClick={back} className="">
              Back
            </button> 
          </div>}
        </div>
        {trained && <PredictFileUpload/>}
    </div>
  )
}

export default ClassificationModelApp
