export type Language = 'en' | 'te';

export type TestStatus = 'within_range' | 'outside_range_high' | 'outside_range_low';

export interface EducationalContent {
  whatItMeasures: string;
  whyRangeMatters: string;
  generalQuestions: string[];
}

export interface LabTest {
  id: string;
  name: string;
  teluguName?: string;
  category: 'Lipid' | 'Hematology' | 'Renal' | 'Metabolic' | 'Liver' | 'Thyroid' | 'Vitamins';
  measuredValue: number;
  unit: string;
  referenceRangeMin: number;
  referenceRangeMax: number;
  referenceRangeDisplay: string;
  status: TestStatus;
  statusLabelEn: string;
  statusLabelTe: string;
  previousValue?: number;
  previousDate?: string;
  explanation: {
    en: EducationalContent;
    te: EducationalContent;
  };
}

export interface LabReport {
  id: string;
  title: string;
  labName: string;
  date: string;
  patientDemo: {
    referenceId: string;
    ageGroup: string;
    gender: string;
  };
  totalTests: number;
  withinRangeCount: number;
  outsideRangeCount: number;
  tests: LabTest[];
  notes?: string;
}

export type ActiveScreen = 'landing' | 'dashboard' | 'analysis' | 'history' | 'privacy';
