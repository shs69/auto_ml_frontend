import { createAsyncThunk } from '@reduxjs/toolkit';
import type { modelParams, modelResponse } from '../../utils/interfaces';

export const trainModel = createAsyncThunk<
  modelResponse,
  modelParams,
  { rejectValue: string }
>(
  'trainModel',
  async ({url, file, targetColumn} , { rejectWithValue }) => {
    const formData = new FormData();
    formData.append('file', file);
    
    if (targetColumn && url) {
      url.searchParams.append("target_column", targetColumn)
    }
    
    try {
      const response = await fetch(url!.toString(), {
        method: 'POST',
        body: formData, 
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      const data: modelResponse = await response.json();
      return data;
    } catch (err: unknown) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
      return rejectWithValue('Unknown error occurred during training.');
    }
  }
);
