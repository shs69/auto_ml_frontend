import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { trainModel } from './trainThunk';
import { changeTargetColumn } from "../models/modelsSlice";
import type { RootState } from '../../app/store';

export const TrainFileUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [targetColumn, setTargetColumn] = useState<string>('');
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state: RootState) => state.TrainFile);
  const choosedModelName = useAppSelector((state: RootState) => state.models.choosed);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleTrainClick = () => {
    if (!file || !targetColumn) {
      alert('Выберите файл и укажите целевую колонку')
      return;
    }
    var url = (choosedModelName === "classification") ? new URL('http://localhost:8000/train_classification/') : new URL('http://localhost:8000/train_regression/')
    dispatch(trainModel({modelName: choosedModelName, url, file, targetColumn}))
    dispatch(changeTargetColumn({model: choosedModelName, value: targetColumn}))
  };

  return (
    <div className="cont">
      {/* <div>
        <label htmlFor="file"> Choose file: </label>
        <input id="file" type="file" onChange={handleFileChange} />
      </div> */}
      <div className="file-upload-container">
        <label htmlFor="fileUpload" className="file-label">Select file:</label>
        <input type="file" id="fileUpload" className="file-input" onChange={handleFileChange}/>
      </div>
      <div>
        <label htmlFor="targetColumn">
            Enter target column:
        </label>
        <input
          id="targetColumn"
          type="text"
          placeholder="Target Column"
          value={targetColumn}
          onChange={(e) => setTargetColumn(e.target.value)}
        />
      </div>
      <div>
        <button onClick={handleTrainClick} disabled={isLoading}>
          {isLoading ? 'Training...' : 'Train Model'}
        </button>
      </div>
      {error && <h2>{error}</h2>}
    </div>
  );
};
