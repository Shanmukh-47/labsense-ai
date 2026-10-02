import React, { useState, useRef } from 'react';
import {
  UploadCloud,
  FileText,
  Sparkles,
  AlertCircle,
  AlertTriangle,
  Loader2,
} from 'lucide-react';
import type { Language } from '../types';
import { api, type ExtractionPreviewResponse, type ReportCreateRequest } from '../services/api';
import { ReportReviewModal } from './ReportReviewModal';

interface UploadZoneProps {
  language: Language;
  onReportLoaded: (reportId: string) => void;
}

export const UploadZone: React.FC<UploadZoneProps> = ({
  language,
  onReportLoaded,
}) => {
  const isTelugu = language === 'te';
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [uploadState, setUploadState] = useState<'idle' | 'uploading' | 'extracting'>('idle');
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isScannedPdfError, setIsScannedPdfError] = useState(false);

  // Review Modal State
  const [previewData, setPreviewData] = useState<ExtractionPreviewResponse | null>(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const processRealPdfUpload = async (file: File) => {
    setSelectedFileName(file.name);
    setErrorMessage(null);
    setIsScannedPdfError(false);
    setUploadState('uploading');

    if (!file.name.toLowerCase().endsWith('.pdf')) {
      setErrorMessage(isTelugu ? 'దయచేసి చెల్లుబాటు అయ్యే PDF ఫైల్‌ను మాత్రమే అప్‌లోడ్ చేయండి.' : 'Please upload a valid PDF document (.pdf).');
      setUploadState('idle');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage(isTelugu ? 'ఫైల్ పరిమాణం 10 MB కంటే ఎక్కువగా ఉండకూడదు.' : 'File size exceeds the 10 MB limit.');
      setUploadState('idle');
      return;
    }

    try {
      setUploadState('extracting');
      const response = await api.extractPdfPreview(file);

      if (!response.success) {
        setUploadState('idle');
        if (response.is_scanned) {
          setIsScannedPdfError(true);
          setErrorMessage(
            response.error_message ||
            (isTelugu
              ? 'ఈ PDF లో చదవదగిన వచనం కనుగొనబడలేదు. ఇది స్కాన్ చేసిన చిత్రం లాగా కనిపిస్తోంది. ఈ వెర్షన్‌లో OCR ఇంకా సపోర్ట్ చేయబడలేదు.'
              : 'No readable text detected in this PDF. This appears to be a scanned image or photo. OCR (Optical Character Recognition) is not yet supported in this version.')
          );
        } else {
          setErrorMessage(response.error_message || 'Failed to extract text from PDF document.');
        }
        return;
      }

      // Successful extraction: Open Review & Verification Modal
      setUploadState('idle');
      setPreviewData(response);
      setIsReviewModalOpen(true);
    } catch (err: unknown) {
      setUploadState('idle');
      const msg = err instanceof Error ? err.message : 'Upload failed';
      setErrorMessage(msg);
    }
  };

  const handleConfirmSave = async (payload: ReportCreateRequest) => {
    setIsSaving(true);
    try {
      const savedReport = await api.createReport(payload);
      setIsReviewModalOpen(false);
      setPreviewData(null);
      setIsSaving(false);
      onReportLoaded(savedReport.id);
    } catch (err: unknown) {
      setIsSaving(false);
      throw err;
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      processRealPdfUpload(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processRealPdfUpload(e.target.files[0]);
    }
  };

  const handleQuickDemoLoad = async (sampleType: 'metabolic' | 'cbc') => {
    setSelectedFileName(sampleType === 'metabolic' ? 'Sample_Metabolic_Panel.pdf' : 'Sample_CBC_Hemogram.pdf');
    setUploadState('extracting');
    setErrorMessage(null);
    setIsScannedPdfError(false);

    // Provide pre-parsed synthetic preview so the user can test the real review-save flow directly
    const demoPreview: ExtractionPreviewResponse = {
      success: true,
      is_scanned: false,
      lab_name: 'Metro Diagnostics & Clinical Labs',
      report_title: sampleType === 'metabolic' ? 'Comprehensive Metabolic & Lipid Panel' : 'Complete Blood Count (CBC)',
      report_date: new Date().toISOString().split('T')[0],
      raw_text_preview: 'Synthetic Clinical Benchmark Extraction',
      detected_tests: sampleType === 'metabolic'
        ? [
            {
              name: 'Fasting Blood Glucose',
              category: 'Metabolic',
              measured_value: 128.0,
              unit: 'mg/dL',
              reference_range_min: 70.0,
              reference_range_max: 99.0,
              reference_range_display: '70 - 99 mg/dL',
              needs_review: false,
              raw_extracted_text: 'Fasting Blood Glucose: 128.0 mg/dL (70-99)',
            },
            {
              name: 'Total Cholesterol',
              category: 'Lipid',
              measured_value: 218.0,
              unit: 'mg/dL',
              reference_range_min: null,
              reference_range_max: 200.0,
              reference_range_display: '< 200 mg/dL',
              needs_review: false,
              raw_extracted_text: 'Total Cholesterol: 218.0 mg/dL (< 200)',
            },
            {
              name: 'HDL Cholesterol',
              category: 'Lipid',
              measured_value: 48.0,
              unit: 'mg/dL',
              reference_range_min: 40.0,
              reference_range_max: null,
              reference_range_display: '> 40 mg/dL',
              needs_review: false,
              raw_extracted_text: 'HDL Cholesterol: 48.0 mg/dL (> 40)',
            },
            {
              name: 'Serum Creatinine',
              category: 'Renal',
              measured_value: 0.95,
              unit: 'mg/dL',
              reference_range_min: 0.7,
              reference_range_max: 1.3,
              reference_range_display: '0.7 - 1.3 mg/dL',
              needs_review: false,
              raw_extracted_text: 'Serum Creatinine: 0.95 mg/dL (0.7-1.3)',
            },
            {
              name: 'Serum 25-OH Vitamin D',
              category: 'Vitamins',
              measured_value: 18.5,
              unit: 'ng/mL',
              reference_range_min: 30.0,
              reference_range_max: 100.0,
              reference_range_display: '30 - 100 ng/mL',
              needs_review: false,
              raw_extracted_text: '25-OH Vitamin D: 18.5 ng/mL (30-100)',
            },
          ]
        : [
            {
              name: 'Hemoglobin (Hb)',
              category: 'Hematology',
              measured_value: 13.8,
              unit: 'g/dL',
              reference_range_min: 13.0,
              reference_range_max: 17.0,
              reference_range_display: '13.0 - 17.0 g/dL',
              needs_review: false,
              raw_extracted_text: 'Hemoglobin: 13.8 g/dL (13.0-17.0)',
            },
            {
              name: 'Total Leukocyte Count (WBC)',
              category: 'Hematology',
              measured_value: 7200,
              unit: '/cumm',
              reference_range_min: 4000,
              reference_range_max: 11000,
              reference_range_display: '4000 - 11000 /cumm',
              needs_review: false,
              raw_extracted_text: 'WBC Count: 7200 /cumm (4000-11000)',
            },
            {
              name: 'Platelet Count',
              category: 'Hematology',
              measured_value: 245000,
              unit: '/cumm',
              reference_range_min: 150000,
              reference_range_max: 450000,
              reference_range_display: '150000 - 450000 /cumm',
              needs_review: false,
              raw_extracted_text: 'Platelet Count: 245000 /cumm (150000-45000)',
            },
          ],
    };

    setUploadState('idle');
    setPreviewData(demoPreview);
    setIsReviewModalOpen(true);
  };

  return (
    <>
      <div
        className="glass-card"
        style={{
          padding: '36px 32px',
          position: 'relative',
          overflow: 'hidden',
          border: isDragging ? '2px dashed var(--color-purple-primary)' : '1px dashed rgba(168, 85, 247, 0.35)',
          background: isDragging
            ? 'rgba(109, 40, 217, 0.15)'
            : 'linear-gradient(180deg, rgba(23, 14, 46, 0.7) 0%, rgba(15, 9, 36, 0.9) 100%)',
          transition: 'all var(--transition-normal)',
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".pdf,application/pdf"
          style={{ display: 'none' }}
        />

        {uploadState === 'idle' && (
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                background: 'var(--gradient-brand-subtle)',
                border: '1px solid var(--border-highlight)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 25px rgba(168, 85, 247, 0.3)',
              }}
            >
              <UploadCloud size={36} color="#EC4899" />
            </div>

            <div>
              <h3 style={{ fontSize: '1.35rem', color: '#ffffff', marginBottom: '6px' }}>
                {isTelugu ? 'మీ ల్యాబ్ నివేదిక (PDF) అప్‌లోడ్ చేయండి' : 'Upload your laboratory report PDF'}
              </h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', maxWidth: '480px', margin: '0 auto' }}>
                {isTelugu
                  ? 'స్పష్టమైన ల్యాబ్ రిపోర్ట్ PDF ని ఇక్కడ డ్రాగ్ చేయండి లేదా ఎంచుకోండి. లైవ్ FastAPI మరియు SQLite బ్యాకెండ్‌తో అనుసంధానించబడింది.'
                  : 'Drag and drop your digital lab report PDF here. Parsed deterministically in-memory before saving.'}
              </p>
            </div>

            {/* Error Message Box */}
            {errorMessage && (
              <div
                style={{
                  width: '100%',
                  maxWidth: '560px',
                  padding: '14px 18px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: isScannedPdfError ? 'rgba(245, 158, 11, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                  border: isScannedPdfError ? '1px solid rgba(245, 158, 11, 0.4)' : '1px solid rgba(239, 68, 68, 0.4)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  textAlign: 'left',
                }}
              >
                {isScannedPdfError ? (
                  <AlertTriangle size={20} color="#fbbf24" style={{ flexShrink: 0, marginTop: '2px' }} />
                ) : (
                  <AlertCircle size={20} color="#f87171" style={{ flexShrink: 0, marginTop: '2px' }} />
                )}
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '0.92rem', color: isScannedPdfError ? '#fbbf24' : '#f87171', margin: '0 0 4px 0', fontWeight: 600 }}>
                    {isScannedPdfError
                      ? (isTelugu ? 'స్కాన్ చేసిన లేదా ఫోటో PDF గుర్తించబడింది' : 'Scanned / Image-Only PDF Detected')
                      : (isTelugu ? 'అప్‌లోడ్ లేదా ప్రాసెసింగ్ లోపం' : 'Extraction Error')}
                  </h4>
                  <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>
                    {errorMessage}
                  </p>
                </div>
              </div>
            )}

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '4px' }}>
              <button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={() => fileInputRef.current?.click()}
              >
                <FileText size={18} />
                <span>{isTelugu ? 'PDF ఫైల్ ఎంచుకోండి' : 'Choose Real PDF File'}</span>
              </button>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.82rem',
                color: 'var(--text-muted)',
                marginTop: '2px',
              }}
            >
              <AlertCircle size={14} color="#A855F7" />
              <span>
                {isTelugu
                  ? 'గమనిక: టెక్స్ట్ ఆధారిత డిజిటల్ ల్యాబ్ PDF లకు మాత్రమే మద్దతు ఉంది (OCR ప్రస్తుత వెర్షన్‌లో సపోర్ట్ చేయబడదు).'
                  : 'Supports text-based digital PDF reports up to 10 MB. Scanned/image documents are unsupported.'}
              </span>
            </div>

            {/* Quick Demo Pre-load Action */}
            <div
              style={{
                marginTop: '16px',
                paddingTop: '18px',
                borderTop: '1px solid var(--border-subtle)',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {isTelugu ? 'లేదా పరీక్ష కోసం సింథటిక్ నమూనా ల్యాబ్ డేటాతో సమీక్షించండి:' : 'Or test the review and verification flow with synthetic sample datasets:'}
              </span>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => handleQuickDemoLoad('metabolic')}
                >
                  <Sparkles size={14} color="#A855F7" />
                  <span>{isTelugu ? 'నమూనా: మెటబాలిక్ & లిపిడ్ ప్యానెల్ (డెమో)' : 'Sample 1: Metabolic & Lipid (Demo)'}</span>
                </button>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => handleQuickDemoLoad('cbc')}
                >
                  <Sparkles size={14} color="#EC4899" />
                  <span>{isTelugu ? 'నమూనా: కంప్లీట్ బ్లడ్ కౌంట్ (డెమో)' : 'Sample 2: Hemogram / CBC (Demo)'}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {uploadState !== 'idle' && (
          <div style={{ textAlign: 'center', padding: '32px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'var(--gradient-brand)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 30px rgba(168, 85, 247, 0.6)',
              }}
              className="animate-pulse-glow"
            >
              <Loader2 size={32} color="#ffffff" className="animate-spin" />
            </div>

            <div>
              <h4 style={{ fontSize: '1.2rem', color: '#ffffff', marginBottom: '4px' }}>
                {uploadState === 'uploading' && (isTelugu ? 'PDF అప్‌లోడ్ అవుతోంది...' : 'Uploading PDF to FastAPI Backend...')}
                {uploadState === 'extracting' && (isTelugu ? 'పరీక్షలు మరియు సూచించిన పరిధులను సేకరిస్తోంది...' : 'Extracting test values & reference ranges...')}
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                {selectedFileName || 'Lab_Report.pdf'}
              </p>
            </div>

            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              {isTelugu ? 'టెక్స్ట్ వెలికితీత మరియు నిష్పాక్షిక విశ్లేషణ జరుగుతోంది...' : 'Parsing clinical parameters without AI hallucinations...'}
            </span>
          </div>
        )}
      </div>

      {/* Human-in-the-Loop Review Modal */}
      <ReportReviewModal
        isOpen={isReviewModalOpen}
        language={language}
        previewData={previewData}
        onClose={() => {
          setIsReviewModalOpen(false);
          setPreviewData(null);
        }}
        onConfirmSave={handleConfirmSave}
        isSaving={isSaving}
      />
    </>
  );
};
