import "../../../App.css"
import { PredictFileUpload } from "../../predict/predictFileUpload"
import { resetModel, resetTrained } from "../modelsSlice";
import { reset } from "../../predict/predictSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import type { RootState } from '../../../app/store';


const SegmentationModelApp = () => {
  const dispatch = useAppDispatch();  
  const prediction = useAppSelector((state: RootState) => state.models.segmentation.prediction)

  const home = () => {
    dispatch(resetModel("segmentation"))
    dispatch(reset())
  }

  const resetPrediction = () => {
    dispatch(reset())
    dispatch(resetTrained("segmentation"))
  }


  return (
    <div className="App">
        <p>
          Auto ML.Image Segmentation
        </p>
        <div className="row">
          <div className="button-home">
            <button onClick={home} className="">
              Home
            </button> 
            {prediction && prediction.length > 0 && <button onClick={resetPrediction} className="">
              Reset
            </button> }
          </div>
        </div>
        {(!prediction || prediction.length === 0) && <PredictFileUpload/>}
        {prediction && prediction.length > 0 && (<div>
            <img src={`data:image/png;base64,${prediction}`} alt="Preview" />
        </div>)}
    </div>
  )
}

export default SegmentationModelApp
