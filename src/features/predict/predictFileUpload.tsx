import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import type { RootState } from '../../app/store';
import { predict } from "./predictThunk";
import { setModelImageResnext } from "../models/modelsSlice";


export const PredictFileUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const dispatch = useAppDispatch();
  const { isLoading, error, loaded } = useAppSelector((state: RootState) => state.PredictFile);
  const choosedModelName = useAppSelector((state: RootState) => state.models.choosed);
  const targetColumn = useAppSelector((state: RootState) => state.models[choosedModelName].targetColumn);
  const prediction = useAppSelector((state: RootState) => state.models[choosedModelName].prediction)

  
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
    const localUrl = URL.createObjectURL(file);
    var url = new URL(`http://localhost:8000/predict_${choosedModelName}/`)
    dispatch(predict({modelName: choosedModelName, url, file}));
    if (choosedModelName === 'resnext'){
      dispatch(setModelImageResnext(localUrl))
    }
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
      {prediction !== undefined && prediction.length > 0 && (
        <div>
          <h1>Predictions</h1>
          <h2> Target Column: {targetColumn} </h2>
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
