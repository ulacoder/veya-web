import type { DiseaseClass, DiseaseInfo } from '../types';

export const diseaseDatabase: Record<DiseaseClass, DiseaseInfo> = {
  Cataract: {
    name: 'Cataract',
    description: 'Clouding of the eye lens that affects vision. Common in older adults.',
    severity: 'medium',
    recommendation: 'Schedule an appointment with an ophthalmologist for evaluation. Surgery may be recommended if vision is significantly affected.',
    urgency: 'soon',
  },
  Conjunctivitis: {
    name: 'Conjunctivitis (Pink Eye)',
    description: 'Inflammation of the conjunctiva, often caused by infection or allergies.',
    severity: 'low',
    recommendation: 'Consult a doctor for proper treatment. Keep eyes clean and avoid touching them. May require antibiotic drops if bacterial.',
    urgency: 'routine',
  },
  Normal: {
    name: 'Normal',
    description: 'No visible eye disease detected. Eyes appear healthy.',
    severity: 'low',
    recommendation: 'Maintain good eye health with regular checkups. Continue protecting your eyes from UV exposure.',
    urgency: 'routine',
  },
  Pterygium: {
    name: 'Pterygium',
    description: 'Growth of fleshy tissue on the conjunctiva, often caused by UV exposure.',
    severity: 'medium',
    recommendation: 'See an ophthalmologist for monitoring. Wear UV-protective sunglasses. Surgery may be needed if it affects vision.',
    urgency: 'soon',
  },
};

export const getDiseaseInfo = (diseaseClass: DiseaseClass): DiseaseInfo => {
  return diseaseDatabase[diseaseClass];
};

export const getConfidenceLevel = (confidence: number): string => {
  if (confidence >= 0.9) return 'Very High';
  if (confidence >= 0.75) return 'High';
  if (confidence >= 0.6) return 'Moderate';
  return 'Low';
};

export const getConfidenceColor = (confidence: number): string => {
  if (confidence >= 0.9) return 'text-green-500';
  if (confidence >= 0.75) return 'text-blue-500';
  if (confidence >= 0.6) return 'text-yellow-500';
  return 'text-red-500';
};
