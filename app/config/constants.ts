export const API_ENDPOINTS = {
  ANALYZE: '/api/analyze',
  HEALTH: '/api/health',
} as const;

export const MODEL_CONFIG = {
  VERSION: '1.0.0',
  ARCHITECTURE: 'MobileNetV2',
  INPUT_SIZE: 224,
  CLASSES: ['Cataract', 'Conjunctivitis', 'Normal', 'Pterygium'] as const,
  ACCURACY: 0.8122,
  AUC: 0.9324,
} as const;

export const IMAGE_CONFIG = {
  MAX_SIZE_MB: 5,
  MAX_WIDTH: 1024,
  COMPRESSION_QUALITY: 0.8,
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/jpg'],
} as const;

export const UI_CONFIG = {
  ANIMATION_DURATION: 300,
  TOAST_DURATION: 3000,
  LOADING_MIN_TIME: 1000,
} as const;

export const PERFORMANCE_METRICS = {
  Cataract: { precision: 0.64, recall: 0.98, f1: 0.78 },
  Conjunctivitis: { precision: 0.94, recall: 0.75, f1: 0.83 },
  Normal: { precision: 0.95, recall: 0.89, f1: 0.92 },
  Pterygium: { precision: 1.0, recall: 0.56, f1: 0.72 },
} as const;

export const CAMERA_CONFIG = {
  REAR: { facingMode: 'environment', width: 1920, height: 1080 },
  FRONT: { facingMode: 'user', width: 1280, height: 720 },
} as const;
