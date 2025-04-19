export interface modelParams {
    modelName: models,
    file: File;
    targetColumn?: string;
    url: URL;
    image?: string,
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
    prediction?: number[];
}

export interface RegressionModel{
    trained: boolean;
    targetColumn?: string;
    choosed: boolean;
    prediction?: number[];
}

export interface ResnextModel{
    choosed: boolean;
    prediction?: number[],
    trained?: false,
    targetColumn?: null,
    image?: string,
}

export interface SegmentationModel{
    choosed: boolean,
    prediction?: number[],
    trained?: false,
    targetColumn?: null,
    image?: string,
}

export interface ModelsState{
    choosed: models,
    classification: ClassificationModel,
    regression: RegressionModel,
    resnext: ResnextModel
    segmentation: SegmentationModel
}

export type models = "classification" | "regression" | "resnext" | "segmentation"