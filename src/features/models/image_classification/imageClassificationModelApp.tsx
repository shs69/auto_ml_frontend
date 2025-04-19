import "../../../App.css"
import { PredictFileUpload } from "../../predict/predictFileUpload"
import { resetModel, resetTrained } from "../modelsSlice";
import { reset } from "../../predict/predictSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import type { RootState } from '../../../app/store';


const ImageClassificationModelApp = () => {
  const dispatch = useAppDispatch();  
  const prediction = useAppSelector((state: RootState) => state.models.resnext.prediction)
  const image = useAppSelector((state: RootState) => state.models.resnext.image)

  const home = () => {
    dispatch(resetModel("resnext"))
    dispatch(reset())
  }

  const resetPrediction = () => {
    dispatch(reset())
    dispatch(resetTrained("resnext"))
  }


  return (
    <div className="App">
        <p>
          Auto ML.Image Classification
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
          <img src={image} alt="Preview" />
          <h1>
            Prediction: {prediction[0].toString().charAt(0).toUpperCase() + prediction[0].toString().slice(1)}
          </h1>
        </div>)}
    </div>
  )
}

export default ImageClassificationModelApp
