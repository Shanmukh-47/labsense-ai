import React, { useState, useEffect } from 'react';
import {
  X,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  Building,
  Calendar,
  Sparkles,
  Loader2,
  FileCheck2,
} from 'lucide-react';
import type { Language } from '../types';
import type { ExtractionPreviewResponse, ParsedTestItemPreview, ReportCreateRequest, TestItemCreateRequest } from '../services/api';

interface ReportReviewModalProps {
  isOpen: boolean;
  language: Language;
  previewData: ExtractionPreviewResponse | null;
  onClose: () => void;
  onConfirmSave: (payload: ReportCreateRequest) => Promise<void>;
  isSaving: boolean;
}

export const ReportReviewModal: React.FC<ReportReviewModalProps> = ({
  isOpen,
  language,
  previewData,
  onClose,
  onConfirmSave,
  isSaving,
}) => {
  const isTelugu = language === 'te';

  const [title, setTitle] = useState('');
  const [labName, setLabName] = useState('');
  const [reportDate, setReportDate] = useState('');
  const [notes, setNotes] = useState('');
  const [items, setItems] = useState<ParsedTestItemPreview[]>([]);
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    if (previewData) {
      setTitle(previewData.report_title || 'Laboratory Report');
      setLabName(previewData.lab_name || 'Diagnostic Laboratory');
      setReportDate(previewData.report_date || new Date().toISOString().split('T')[0]);
      setNotes('');
      setItems(previewData.detected_tests || []);
      setValidationError(null);
    }
  }, [previewData]);

  if (!isOpen || !previewData) return null;

  const handleItemChange = (index: number, field: keyof ParsedTestItemPreview, value: any) => {
    setItems((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        [field]: value,
      };
      // Auto-clear needs_review if value and display are provided
      if (field === 'measured_value' && value !== null && value !== undefined) {
        updated[index].needs_review = false;
      }
      return updated;
    });
  };

  const handleAddItem = () => {
    setItems((prev) => [
      ...prev,
      {
        name: 'New Test Parameter',
        category: 'General',
        measured_value: 0,
        unit: 'mg/dL',
        reference_range_min: null,
        reference_range_max: null,
        reference_range_display: 'Standard Range',
        needs_review: false,
        raw_extracted_text: '',
      },
    ]);
  };

  const handleRemoveItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    if (!title.trim()) {
      setValidationError(isTelugu ? 'దయచేసి నివేదిక శీర్షికను నమోదు చేయండి.' : 'Please provide a report title.');
      return;
    }

    if (items.length === 0) {
      setValidationError(isTelugu ? 'కనీసం ఒక పరీక్ష పారామీటర్ అవసరం.' : 'At least one test parameter is required.');
      return;
    }

    const testItemsPayload: TestItemCreateRequest[] = items.map((item) => ({
      name: item.name.trim(),
      category: item.category || 'General',
      measured_value: item.measured_value !== null && item.measured_value !== undefined ? Number(item.measured_value) : null,
      unit: item.unit.trim(),
      reference_range_min: item.reference_range_min !== null && item.reference_range_min !== undefined ? Number(item.reference_range_min) : null,
      reference_range_max: item.reference_range_max !== null && item.reference_range_max !== undefined ? Number(item.reference_range_max) : null,
      reference_range_display: item.reference_range_display || '',
      raw_extracted_text: item.raw_extracted_text || null,
    }));

    const payload: ReportCreateRequest = {
      title: title.trim(),
      lab_name: labName.trim() || 'Diagnostic Laboratory',
      report_date: reportDate.trim() || new Date().toISOString().split('T')[0],
      notes: notes.trim() || null,
      test_items: testItemsPayload,
    };

    try {
      await onConfirmSave(payload);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to save report';
      setValidationError(msg);
    }
  };

  const needsReviewCount = items.filter((it) => it.needs_review).length;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1100,
        backgroundColor: 'rgba(5, 2, 14, 0.85)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        overflowY: 'auto',
      }}
    >
      <div
        className="glass-card"
        style={{
          width: '100%',
          maxWidth: '960px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#120a2a',
          border: '1px solid var(--border-glow)',
          boxShadow: '0 0 50px rgba(168, 85, 247, 0.35)',
          overflow: 'hidden',
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '20px 28px',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'linear-gradient(90deg, rgba(109, 40, 217, 0.2) 0%, rgba(236, 72, 153, 0.1) 100%)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: 'var(--gradient-brand)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FileCheck2 size={20} color="#ffffff" />
            </div>
            <div>
              <h2 style={{ fontSize: '1.25rem', color: '#ffffff', margin: 0 }}>
                {isTelugu ? 'ల్యాబ్ డేటా సమీక్ష & నిర్ధారణ' : 'Review & Verify Extracted Report'}
              </h2>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                {isTelugu
                  ? 'సేవ్ చేయడానికి ముందు వెలికితీసిన విలువలను సరిచూసుకోండి'
                  : 'Human-in-the-loop verification before saving to persistent database'}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: '6px',
            }}
          >
            <X size={22} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '24px 28px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Informational Verification Alert */}
          <div
            style={{
              padding: '12px 16px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: needsReviewCount > 0 ? 'rgba(245, 158, 11, 0.12)' : 'rgba(168, 85, 247, 0.1)',
              border: needsReviewCount > 0 ? '1px solid rgba(245, 158, 11, 0.35)' : '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px',
            }}
          >
            <AlertCircle size={18} color={needsReviewCount > 0 ? '#fbbf24' : '#A855F7'} style={{ flexShrink: 0, marginTop: '2px' }} />
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
              {needsReviewCount > 0 ? (
                <span>
                  <strong style={{ color: '#fbbf24' }}>
                    {needsReviewCount} {isTelugu ? 'పరీక్ష విలువలు శ్రద్ధ అవసరం' : 'extracted parameters require verification'}
                  </strong>
                  :{' '}
                  {isTelugu
                    ? 'హైలైట్ చేసిన పసుపు రంగు గుర్తులను సరిచూసి అవసరమైతే మీ అసలు రిపోర్టుతో సరిపోల్చండి.'
                    : 'Values or reference ranges marked in yellow were uncertain in the PDF text. Please verify or correct them below.'}
                </span>
              ) : (
                <span>
                  {isTelugu
                    ? 'PDF నుండి వెలికితీసిన పరీక్షలు క్రింద ప్రదర్శించబడ్డాయి. మీరు ఏదైనా తప్పులను సవరించవచ్చు లేదా కొత్త పారామీటర్‌లను చేర్చవచ్చు.'
                    : 'All extracted parameters are structured below. You may edit numbers, reference ranges, or lab metadata before saving.'}
                </span>
              )}
            </div>
          </div>

          {validationError && (
            <div
              style={{
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'rgba(239, 68, 68, 0.15)',
                border: '1px solid rgba(239, 68, 68, 0.4)',
                color: '#f87171',
                fontSize: '0.85rem',
              }}
            >
              {validationError}
            </div>
          )}

          {/* Metadata Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '14px',
              padding: '16px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px', textTransform: 'uppercase' }}>
                {isTelugu ? 'నివేదిక శీర్షిక' : 'Report Title'}
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Comprehensive Metabolic Panel"
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border-subtle)',
                  color: '#ffffff',
                  fontSize: '0.9rem',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px', textTransform: 'uppercase' }}>
                <Building size={12} />
                <span>{isTelugu ? 'ల్యాబ్ / ఆసుపత్రి పేరు' : 'Laboratory / Facility'}</span>
              </label>
              <input
                type="text"
                value={labName}
                onChange={(e) => setLabName(e.target.value)}
                placeholder="e.g. Apex Diagnostics"
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border-subtle)',
                  color: '#ffffff',
                  fontSize: '0.9rem',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px', textTransform: 'uppercase' }}>
                <Calendar size={12} />
                <span>{isTelugu ? 'నివేదిక తేదీ' : 'Report Date'}</span>
              </label>
              <input
                type="text"
                value={reportDate}
                onChange={(e) => setReportDate(e.target.value)}
                placeholder="YYYY-MM-DD or DD/MM/YYYY"
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border-subtle)',
                  color: '#ffffff',
                  fontSize: '0.9rem',
                }}
              />
            </div>
          </div>

          {/* Test Items Table */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h3 style={{ fontSize: '1rem', color: '#ffffff', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={15} color="#EC4899" />
                <span>
                  {isTelugu ? 'వెలికితీసిన పరీక్షల పట్టిక' : 'Detected Clinical Parameters'} ({items.length})
                </span>
              </h3>

              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={handleAddItem}
                style={{ padding: '4px 10px', fontSize: '0.78rem' }}
              >
                <Plus size={13} />
                <span>{isTelugu ? 'పరీక్షను జోడించండి' : 'Add Parameter'}</span>
              </button>
            </div>

            <div style={{ overflowX: 'auto', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '700px' }}>
                <thead>
                  <tr style={{ backgroundColor: 'rgba(255, 255, 255, 0.04)', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                    <th style={{ padding: '10px 12px' }}>{isTelugu ? 'పరీక్ష పేరు' : 'Test Parameter'}</th>
                    <th style={{ padding: '10px 12px' }}>{isTelugu ? 'వర్గం' : 'Category'}</th>
                    <th style={{ padding: '10px 12px', width: '130px' }}>{isTelugu ? 'కొలిచిన విలువ' : 'Measured Value'}</th>
                    <th style={{ padding: '10px 12px', width: '90px' }}>{isTelugu ? 'యూనిట్' : 'Unit'}</th>
                    <th style={{ padding: '10px 12px' }}>{isTelugu ? 'రిఫరెన్స్ పరిధి (టెక్స్ట్)' : 'Reference Range'}</th>
                    <th style={{ padding: '10px 12px', width: '90px' }}>Min</th>
                    <th style={{ padding: '10px 12px', width: '90px' }}>Max</th>
                    <th style={{ padding: '10px 12px', textAlign: 'center', width: '50px' }}></th>
                  </tr>
                </thead>
                <tbody>
                  {items.length === 0 ? (
                    <tr>
                      <td colSpan={8} style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                        {isTelugu
                          ? 'ఈ డాక్యుమెంట్‌లో పరీక్షలు స్వయంచాలకంగా గుర్తించబడలేదు. మీరు పైన ఉన్న "+ పరీక్షను జోడించండి" బటన్ ద్వారా మాన్యువల్‌గా నమోదు చేయవచ్చు.'
                          : 'No clinical test parameters were detected in this document. You may click "+ Add Parameter" above or cancel.'}
                      </td>
                    </tr>
                  ) : (
                    items.map((item, idx) => (
                      <tr
                        key={idx}
                        style={{
                          borderTop: '1px solid rgba(255, 255, 255, 0.04)',
                          backgroundColor: item.needs_review ? 'rgba(245, 158, 11, 0.05)' : 'transparent',
                        }}
                      >
                      {/* Name */}
                      <td style={{ padding: '8px 10px' }}>
                        <input
                          type="text"
                          value={item.name}
                          onChange={(e) => handleItemChange(idx, 'name', e.target.value)}
                          style={{
                            width: '100%',
                            padding: '6px 8px',
                            borderRadius: '4px',
                            backgroundColor: 'rgba(255, 255, 255, 0.04)',
                            border: '1px solid var(--border-subtle)',
                            color: '#ffffff',
                            fontSize: '0.85rem',
                          }}
                        />
                      </td>

                      {/* Category */}
                      <td style={{ padding: '8px 10px' }}>
                        <input
                          type="text"
                          value={item.category}
                          onChange={(e) => handleItemChange(idx, 'category', e.target.value)}
                          style={{
                            width: '100%',
                            padding: '6px 8px',
                            borderRadius: '4px',
                            backgroundColor: 'rgba(255, 255, 255, 0.04)',
                            border: '1px solid var(--border-subtle)',
                            color: 'var(--text-secondary)',
                            fontSize: '0.82rem',
                          }}
                        />
                      </td>

                      {/* Measured Value */}
                      <td style={{ padding: '8px 10px' }}>
                        <input
                          type="number"
                          step="any"
                          value={item.measured_value ?? ''}
                          onChange={(e) => handleItemChange(idx, 'measured_value', e.target.value === '' ? null : parseFloat(e.target.value))}
                          placeholder="Numeric"
                          style={{
                            width: '100%',
                            padding: '6px 8px',
                            borderRadius: '4px',
                            backgroundColor: item.measured_value === null ? 'rgba(239, 68, 68, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                            border: item.measured_value === null ? '1px solid #ef4444' : '1px solid var(--border-subtle)',
                            color: '#ffffff',
                            fontWeight: 700,
                            fontSize: '0.85rem',
                          }}
                        />
                      </td>

                      {/* Unit */}
                      <td style={{ padding: '8px 10px' }}>
                        <input
                          type="text"
                          value={item.unit}
                          onChange={(e) => handleItemChange(idx, 'unit', e.target.value)}
                          placeholder="e.g. mg/dL"
                          style={{
                            width: '100%',
                            padding: '6px 8px',
                            borderRadius: '4px',
                            backgroundColor: 'rgba(255, 255, 255, 0.04)',
                            border: '1px solid var(--border-subtle)',
                            color: 'var(--text-secondary)',
                            fontSize: '0.82rem',
                          }}
                        />
                      </td>

                      {/* Range Display */}
                      <td style={{ padding: '8px 10px' }}>
                        <input
                          type="text"
                          value={item.reference_range_display}
                          onChange={(e) => handleItemChange(idx, 'reference_range_display', e.target.value)}
                          placeholder="e.g. 70 - 99 mg/dL"
                          style={{
                            width: '100%',
                            padding: '6px 8px',
                            borderRadius: '4px',
                            backgroundColor: 'rgba(255, 255, 255, 0.04)',
                            border: '1px solid var(--border-subtle)',
                            color: 'var(--text-highlight)',
                            fontSize: '0.82rem',
                          }}
                        />
                      </td>

                      {/* Min */}
                      <td style={{ padding: '8px 10px' }}>
                        <input
                          type="number"
                          step="any"
                          value={item.reference_range_min ?? ''}
                          onChange={(e) => handleItemChange(idx, 'reference_range_min', e.target.value === '' ? null : parseFloat(e.target.value))}
                          placeholder="Min"
                          style={{
                            width: '100%',
                            padding: '6px 8px',
                            borderRadius: '4px',
                            backgroundColor: 'rgba(255, 255, 255, 0.04)',
                            border: '1px solid var(--border-subtle)',
                            color: 'var(--text-secondary)',
                            fontSize: '0.82rem',
                          }}
                        />
                      </td>

                      {/* Max */}
                      <td style={{ padding: '8px 10px' }}>
                        <input
                          type="number"
                          step="any"
                          value={item.reference_range_max ?? ''}
                          onChange={(e) => handleItemChange(idx, 'reference_range_max', e.target.value === '' ? null : parseFloat(e.target.value))}
                          placeholder="Max"
                          style={{
                            width: '100%',
                            padding: '6px 8px',
                            borderRadius: '4px',
                            backgroundColor: 'rgba(255, 255, 255, 0.04)',
                            border: '1px solid var(--border-subtle)',
                            color: 'var(--text-secondary)',
                            fontSize: '0.82rem',
                          }}
                        />
                      </td>

                      {/* Delete Row Action */}
                      <td style={{ padding: '8px 10px', textAlign: 'center' }}>
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(idx)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#94a3b8',
                            cursor: 'pointer',
                            padding: '4px',
                          }}
                          title="Remove item"
                        >
                          <Trash2 size={15} />
                        </button>
                      </td>
                    </tr>
                  )))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div
          style={{
            padding: '16px 28px',
            borderTop: '1px solid var(--border-subtle)',
            backgroundColor: 'rgba(15, 9, 36, 0.95)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            {items.length} {isTelugu ? 'పారామీటర్లు సమీక్షించబడ్డాయి' : 'parameters ready to save'}
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              disabled={isSaving}
            >
              {isTelugu ? 'రద్దు చేయండి' : 'Cancel'}
            </button>

            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSave}
              disabled={isSaving}
              style={{ minWidth: '160px' }}
            >
              {isSaving ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>{isTelugu ? 'సేవ్ చేస్తోంది...' : 'Saving to Database...'}</span>
                </>
              ) : (
                <>
                  <CheckCircle2 size={16} />
                  <span>{isTelugu ? 'నిర్ధారించి సేవ్ చేయండి' : 'Confirm & Save Report'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
