export interface PredictionResult {
  prediction: string;
  confidence: number;
  probabilities: {
    Cataract: number;
    Conjunctivitis: number;
    Normal: number;
    Pterygium: number;
  };
  model_version: string;
}

export interface AnalyzeResponse {
  success: boolean;
  result?: PredictionResult;
  error?: string;
}

export interface CameraConfig {
  facingMode: 'user' | 'environment';
  width: number;
  height: number;
}

export interface ScanResult extends PredictionResult {
  timestamp: Date;
  imageUrl?: string;
}

export type DiseaseClass = 'Cataract' | 'Conjunctivitis' | 'Normal' | 'Pterygium';

export interface DiseaseInfo {
  name: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  recommendation: string;
  urgency: 'routine' | 'soon' | 'urgent';
}
