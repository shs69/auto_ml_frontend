export interface modelParams {
    file: File;
    targetColumn?: string;
    url: URL;
}
  
export interface modelResponse {
    message: string;
    predictions: number[];
}

export interface FileState {
    isLoading: boolean;
    error: string | null;
    message: string | null;
    loaded: boolean;
    prediction?: number[];
}

export interface ClassificationModel{
    trained: boolean;
    targetColumn?: string;
    choosed: boolean;
}

export interface RegressionModel{
    trained: boolean;
    targetColumn?: string;
    choosed: boolean;
}