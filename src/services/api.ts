/**
 * LabSense AI - Frontend API Service Layer
 * Connects directly to the FastAPI backend with structured error handling.
 */

export interface ParsedTestItemPreview {
  name: string;
  category: string;
  measured_value?: number | null;
  unit: string;
  reference_range_min?: number | null;
  reference_range_max?: number | null;
  reference_range_display: string;
  needs_review: boolean;
  raw_extracted_text?: string | null;
}

export interface ExtractionPreviewResponse {
  success: boolean;
  is_scanned: boolean;
  error_message?: string | null;
  lab_name?: string | null;
  report_title: string;
  report_date?: string | null;
  detected_tests: ParsedTestItemPreview[];
  raw_text_preview: string;
}

export interface TestItemCreateRequest {
  name: string;
  category: string;
  measured_value?: number | null;
  unit: string;
  reference_range_min?: number | null;
  reference_range_max?: number | null;
  reference_range_display: string;
  raw_extracted_text?: string | null;
}

export interface ReportCreateRequest {
  title: string;
  lab_name?: string | null;
  report_date?: string | null;
  notes?: string | null;
  test_items: TestItemCreateRequest[];
}

export interface EducationalContentDTO {
  whatItMeasures: string;
  whyRangeMatters: string;
  generalQuestions: string[];
}

export interface BilingualExplanationDTO {
  en: EducationalContentDTO;
  te: EducationalContentDTO;
}

export interface TestItemResponseDTO {
  id: string;
  report_id: string;
  name: string;
  telugu_name?: string | null;
  category: string;
  measured_value?: number | null;
  unit: string;
  reference_range_min?: number | null;
  reference_range_max?: number | null;
  reference_range_display: string;
  status: 'within_range' | 'outside_range_high' | 'outside_range_low' | 'unknown';
  status_label_en: string;
  status_label_te: string;
  raw_extracted_text?: string | null;
  explanation?: BilingualExplanationDTO | null;
}

export interface ReportSummaryDTO {
  id: string;
  title: string;
  lab_name?: string | null;
  report_date?: string | null;
  created_at?: string | null;
  total_tests: number;
  within_range_count: number;
  outside_range_count: number;
}

export interface ReportDetailDTO {
  id: string;
  title: string;
  lab_name?: string | null;
  report_date?: string | null;
  notes?: string | null;
  created_at?: string | null;
  total_tests: number;
  within_range_count: number;
  outside_range_count: number;
  test_items: TestItemResponseDTO[];
}

export interface HealthResponseDTO {
  status: string;
  service: string;
  version: string;
  database: string;
}

/**
 * Base API URL resolution:
 * Uses VITE_API_BASE_URL when provided (e.g. in Render production staging),
 * falling back to relative '/api' for local development via the Vite proxy.
 */
const getApiBase = (): string => {
  const envUrl = (import.meta as any).env?.VITE_API_BASE_URL;
  if (!envUrl || typeof envUrl !== 'string' || !envUrl.trim()) {
    return '/api';
  }
  const trimmed = envUrl.trim().replace(/\/+$/, '');
  // If user provided base domain (e.g. https://service.onrender.com), append /api
  if (!trimmed.endsWith('/api')) {
    return `${trimmed}/api`;
  }
  return trimmed;
};

const API_BASE = getApiBase();

/**
 * Helper to handle fetch errors gracefully
 */
async function fetchJson<T>(url: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      let errorDetail = `Request failed with status ${response.status}`;
      try {
        const errorData = await response.json();
        if (errorData.detail) {
          errorDetail = typeof errorData.detail === 'string' ? errorData.detail : JSON.stringify(errorData.detail);
        } else if (errorData.error_message) {
          errorDetail = errorData.error_message;
        }
      } catch {
        // use default status message
      }
      throw new Error(errorDetail);
    }
    return (await response.json()) as T;
  } catch (err: unknown) {
    if (err instanceof TypeError && err.message.includes('fetch')) {
      throw new Error('Unable to connect to LabSense backend. Please ensure the backend server is running on port 8000.');
    }
    throw err;
  }
}

export const api = {
  /**
   * Health check endpoint
   */
  async checkHealth(): Promise<HealthResponseDTO> {
    return fetchJson<HealthResponseDTO>(`${API_BASE}/health`);
  },

  /**
   * Uploads PDF file and returns extracted clinical preview for user review.
   */
  async extractPdfPreview(file: File): Promise<ExtractionPreviewResponse> {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${API_BASE}/reports/extract-preview`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        let errorDetail = 'Failed to extract text from PDF';
        try {
          const errJson = await response.json();
          if (errJson.error_message) errorDetail = errJson.error_message;
          else if (errJson.detail) errorDetail = errJson.detail;
        } catch {
          // ignore
        }
        return {
          success: false,
          is_scanned: false,
          error_message: errorDetail,
          report_title: file.name.replace(/\.pdf$/i, ''),
          detected_tests: [],
          raw_text_preview: '',
        };
      }

      return (await response.json()) as ExtractionPreviewResponse;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Connection to backend failed.';
      return {
        success: false,
        is_scanned: false,
        error_message: msg.includes('fetch')
          ? 'Cannot reach LabSense backend (port 8000). Please ensure the backend service is running.'
          : msg,
        report_title: file.name.replace(/\.pdf$/i, ''),
        detected_tests: [],
        raw_text_preview: '',
      };
    }
  },

  /**
   * Saves a user-reviewed report and test items into SQLite.
   */
  async createReport(payload: ReportCreateRequest): Promise<ReportDetailDTO> {
    return fetchJson<ReportDetailDTO>(`${API_BASE}/reports`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  },

  /**
   * Lists all reports stored in the SQLite database.
   */
  async listReports(): Promise<ReportSummaryDTO[]> {
    return fetchJson<ReportSummaryDTO[]>(`${API_BASE}/reports`);
  },

  /**
   * Retrieves a single report by ID.
   */
  async getReport(reportId: string): Promise<ReportDetailDTO> {
    return fetchJson<ReportDetailDTO>(`${API_BASE}/reports/${encodeURIComponent(reportId)}`);
  },

  /**
   * Deletes a report from SQLite.
   */
  async deleteReport(reportId: string): Promise<{ message: string; deleted_id: string }> {
    return fetchJson<{ message: string; deleted_id: string }>(`${API_BASE}/reports/${encodeURIComponent(reportId)}`, {
      method: 'DELETE',
    });
  },
};
