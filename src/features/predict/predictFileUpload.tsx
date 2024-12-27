import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import type { RootState } from '../../app/store';
import { predict } from "./predictThunk";


export const PredictFileUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const dispatch = useAppDispatch();
  const { isLoading, error, message, prediction, loaded } = useAppSelector((state: RootState) => state.PredictFile);
  const targetColumn = useAppSelector((state: RootState) => state.ClassificationModel.targetColumn);
  const classification = useAppSelector((state: RootState) => state.ClassificationModel.choosed);

  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleTrainClick = () => {
    if (!file) {
      alert('Выберите файл для предсказания');
      return;
    }
    var url = (classification) ? new URL('http://localhost:8000/predict_classification/') : new URL('http://localhost:8000/predict_regression/')
    console.log(classification)
    dispatch(predict({url, file}));
  };

  return (
    <div className="cont">
      {(!loaded) && (<div className="file-upload-container">
        <label htmlFor="fileUpload" className="file-label">Select file:</label>
        <input type="file" id="fileUpload" className="file-input" onChange={handleFileChange}/>
        <button onClick={handleTrainClick} disabled={isLoading}>
          {isLoading ? 'Predicting' : 'Predict'}
        </button>
      </div>)}
      {error && <h2>{error}</h2>}
      {loaded && (
        <div>
          <h1>Predictions</h1>
          <h2> Targer Column: {targetColumn} </h2>
          <ul>
            {Array.isArray(prediction) &&
              prediction.map((value: number, index: number) => (
                <li key={index}> String № {index} - {value}</li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};
