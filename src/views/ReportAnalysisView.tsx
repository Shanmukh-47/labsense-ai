import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Building,
  CheckCircle2,
  AlertTriangle,
  Search,
  ArrowLeft,
  Info,
  GitCompare,
  Trash2,
  Loader2,
  Database,
} from 'lucide-react';
import type { ActiveScreen, Language, LabReport, LabTest } from '../types';
import { ReportCard } from '../components/ReportCard';
import { DEMO_REPORTS } from '../data/mockReports';
import { EducationalDisclaimer } from '../components/EducationalDisclaimer';
import { api, type ReportDetailDTO, type ReportSummaryDTO } from '../services/api';

interface ReportAnalysisViewProps {
  reportId: string;
  onNavigate: (screen: ActiveScreen) => void;
  language: Language;
  onOpenExplanation: (test: LabTest) => void;
  onSelectReport: (reportId: string) => void;
}

export const ReportAnalysisView: React.FC<ReportAnalysisViewProps> = ({
  reportId,
  onNavigate,
  language,
  onOpenExplanation,
  onSelectReport,
}) => {
  const isTelugu = language === 'te';

  const [report, setReport] = useState<LabReport | null>(null);
  const [savedReportsList, setSavedReportsList] = useState<ReportSummaryDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'in_range' | 'outside_range'>('all');

  // Load report data (first checks backend SQLite API, falls back to demo reports if demo ID)
  useEffect(() => {
    let isMounted = true;

    async function loadReport() {
      setIsLoading(true);

      // Check if it's one of the demo reports
      const demoMatch = DEMO_REPORTS.find((r) => r.id === reportId);

      try {
        // Fetch list of saved reports for switcher dropdown
        const allSaved = await api.listReports();
        if (isMounted) setSavedReportsList(allSaved);

        // Fetch detailed report from API
        const detail: ReportDetailDTO = await api.getReport(reportId);

        if (isMounted) {
          const mappedReport: LabReport = {
            id: detail.id,
            title: detail.title,
            labName: detail.lab_name || 'Diagnostic Laboratory',
            date: detail.report_date || 'Current Draw',
            notes: detail.notes || undefined,
            patientDemo: {
              referenceId: detail.id.slice(0, 8).toUpperCase(),
              ageGroup: 'Adult',
              gender: 'Standard',
            },
            totalTests: detail.total_tests,
            withinRangeCount: detail.within_range_count,
            outsideRangeCount: detail.outside_range_count,
            tests: detail.test_items.map((item) => ({
              id: item.id,
              name: item.name,
              teluguName: item.telugu_name || undefined,
              category: (item.category as any) || 'General',
              measuredValue: item.measured_value ?? 0,
              unit: item.unit || '',
              referenceRangeMin: item.reference_range_min ?? 0,
              referenceRangeMax: item.reference_range_max ?? 0,
              referenceRangeDisplay: item.reference_range_display || 'Standard Reference Range',
              status: (item.status === 'within_range' ? 'within_range' : item.status === 'outside_range_high' ? 'outside_range_high' : 'outside_range_low') as any,
              statusLabelEn: item.status_label_en,
              statusLabelTe: item.status_label_te,
              explanation: item.explanation
                ? {
                    en: item.explanation.en,
                    te: item.explanation.te,
                  }
                : {
                    en: {
                      whatItMeasures: `${item.name} is a standard diagnostic parameter reported by your laboratory.`,
                      whyRangeMatters: `Maintaining ${item.name} within stated laboratory limits reflects routine physiological balance.`,
                      generalQuestions: [
                        `What factors might influence my ${item.name} reading?`,
                        `Should this parameter be monitored at my next routine consultation?`
                      ],
                    },
                    te: {
                      whatItMeasures: `${item.name} అనేది మీ ల్యాబ్ నివేదికలో నమోదు చేయబడిన ఒక సాధారణ పరీక్ష.`,
                      whyRangeMatters: `ఈ పారామీటర్ సాధారణ పరిధిలో ఉండటం శరీర సమతుల్యతను సూచిస్తుంది.`,
                      generalQuestions: [
                        `ఈ పరీక్ష ఫలితంపై ఎలాంటి అంశాలు ప్రభావం చూపుతాయి?`,
                        `తదుపరి సంప్రదింపుల్లో దీనిని మళ్లీ పరీక్షించాలా?`
                      ],
                    },
                  },
            })),
          };
          setReport(mappedReport);
        }
      } catch (err: unknown) {
        // Fallback to demo report if API fetch failed or if it was a demo ID
        if (isMounted) {
          if (demoMatch) {
            setReport(demoMatch);
          } else if (DEMO_REPORTS.length > 0) {
            setReport(DEMO_REPORTS[0]);
          }
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadReport();
    return () => {
      isMounted = false;
    };
  }, [reportId]);

  const handleDeleteCurrentReport = async () => {
    if (!report) return;
    if (report.id.startsWith('rep-')) {
      alert(isTelugu ? 'నమూనా డెమో నివేదికలను తొలగించలేరు.' : 'Sample demo datasets cannot be deleted.');
      return;
    }

    if (!window.confirm(isTelugu ? 'ఈ నివేదికను ఖచ్చితంగా తొలగించాలనుకుంటున్నారా?' : 'Are you sure you want to permanently delete this report?')) {
      return;
    }

    setIsDeleting(true);
    try {
      await api.deleteReport(report.id);
      onNavigate('dashboard');
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Failed to delete report');
      setIsDeleting(false);
    }
  };

  const isLivePersisted = report && !report.id.startsWith('rep-');

  const filteredTests = report
    ? report.tests.filter((test) => {
        const matchesSearch =
          test.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (test.teluguName && test.teluguName.toLowerCase().includes(searchQuery.toLowerCase())) ||
          test.category.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCategory = selectedCategory === 'all' || test.category === selectedCategory;

        const matchesStatus =
          statusFilter === 'all' ||
          (statusFilter === 'in_range' && test.status === 'within_range') ||
          (statusFilter === 'outside_range' && test.status !== 'within_range');

        return matchesSearch && matchesCategory && matchesStatus;
      })
    : [];

  return (
    <div className="container" style={{ paddingTop: '32px', paddingBottom: '60px' }}>
      {/* Top Breadcrumb & Switcher Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '24px',
        }}
      >
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={() => onNavigate('dashboard')}
        >
          <ArrowLeft size={16} />
          <span>{isTelugu ? 'డాష్‌బోర్డ్‌కు వెనుకకు' : 'Back to Dashboard'}</span>
        </button>

        {/* Quick Report Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            {isTelugu ? 'నివేదికను ఎంచుకోండి:' : 'Switch Report:'}
          </span>
          <select
            value={report?.id || reportId}
            onChange={(e) => onSelectReport(e.target.value)}
            style={{
              padding: '6px 12px',
              borderRadius: 'var(--radius-pill)',
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid var(--border-subtle)',
              color: '#ffffff',
              fontSize: '0.85rem',
              cursor: 'pointer',
              outline: 'none',
              maxWidth: '260px',
            }}
          >
            {/* Live SQLite Reports */}
            {savedReportsList.length > 0 && (
              <optgroup label="Saved SQLite Reports">
                {savedReportsList.map((r) => (
                  <option key={r.id} value={r.id} style={{ backgroundColor: '#0f0924', color: '#ffffff' }}>
                    {r.title} ({r.report_date || 'Recent'})
                  </option>
                ))}
              </optgroup>
            )}

            {/* Demo Reports */}
            <optgroup label="Demo Reference Datasets">
              {DEMO_REPORTS.map((r) => (
                <option key={r.id} value={r.id} style={{ backgroundColor: '#0f0924', color: '#ffffff' }}>
                  [Demo] {r.title} ({r.date})
                </option>
              ))}
            </optgroup>
          </select>

          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => onNavigate('history')}
          >
            <GitCompare size={14} color="#34d399" />
            <span>{isTelugu ? 'పోలిక చూడండి' : 'Compare'}</span>
          </button>
        </div>
      </div>

      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
          <Loader2 size={36} className="animate-spin" color="#EC4899" style={{ margin: '0 auto 16px' }} />
          <p>{isTelugu ? 'క్లినికల్ విశ్లేషణను లోడ్ చేస్తోంది...' : 'Loading verified clinical analysis from database...'}</p>
        </div>
      ) : !report ? (
        <div className="glass-card" style={{ padding: '40px', textAlign: 'center' }}>
          <h3>{isTelugu ? 'నివేదిక కనుగొనబడలేదు' : 'Report Not Found'}</h3>
          <button type="button" className="btn btn-primary" onClick={() => onNavigate('dashboard')} style={{ marginTop: '16px' }}>
            {isTelugu ? 'డాష్‌బోర్డ్‌కు వెళ్లండి' : 'Go to Dashboard'}
          </button>
        </div>
      ) : (
        <>
          {/* Report Header Card */}
          <div
            className="glass-card"
            style={{
              padding: '28px',
              background: 'linear-gradient(180deg, rgba(23, 14, 46, 0.9) 0%, rgba(15, 9, 36, 0.95) 100%)',
              border: '1px solid var(--border-highlight)',
              marginBottom: '32px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  {isLivePersisted ? (
                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        letterSpacing: '0.05em',
                        padding: '3px 10px',
                        borderRadius: 'var(--radius-pill)',
                        backgroundColor: 'rgba(52, 211, 153, 0.15)',
                        border: '1px solid rgba(52, 211, 153, 0.4)',
                        color: '#34d399',
                        textTransform: 'uppercase',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      <Database size={11} />
                      {isTelugu ? 'డేటాబేస్‌లో భద్రపరచబడింది' : 'SQLITE PERSISTED'}
                    </span>
                  ) : (
                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        letterSpacing: '0.05em',
                        padding: '3px 10px',
                        borderRadius: 'var(--radius-pill)',
                        backgroundColor: 'rgba(236, 72, 153, 0.2)',
                        border: '1px solid rgba(236, 72, 153, 0.4)',
                        color: 'var(--color-pink-accent)',
                        textTransform: 'uppercase',
                      }}
                    >
                      {isTelugu ? 'డెమో క్లినికల్ డేటా' : 'DEMO CLINICAL REPORT'}
                    </span>
                  )}
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    ID: {report.patientDemo.referenceId}
                  </span>
                </div>

                <h1 style={{ fontSize: '1.9rem', color: '#ffffff', marginBottom: '6px' }}>
                  {report.title}
                </h1>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Building size={14} color="#A855F7" />
                    {report.labName}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Calendar size={14} color="#EC4899" />
                    {isTelugu ? `నివేదిక తేదీ: ${report.date}` : `Report Date: ${report.date}`}
                  </span>
                </div>
              </div>

              {/* Metric Summary Badges & Delete Button */}
              <div
                style={{
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                }}
              >
                <div
                  style={{
                    padding: '12px 18px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid var(--border-subtle)',
                    textAlign: 'center',
                    minWidth: '90px',
                  }}
                >
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff' }}>
                    {report.totalTests}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    {isTelugu ? 'మొత్తం పరీక్షలు' : 'Extracted'}
                  </div>
                </div>

                <div
                  style={{
                    padding: '12px 18px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'rgba(16, 185, 129, 0.08)',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    textAlign: 'center',
                    minWidth: '90px',
                  }}
                >
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#34d399' }}>
                    {report.withinRangeCount}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#34d399', textTransform: 'uppercase', fontWeight: 600 }}>
                    {isTelugu ? 'పరిధిలో' : 'In Range'}
                  </div>
                </div>

                <div
                  style={{
                    padding: '12px 18px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'rgba(245, 158, 11, 0.08)',
                    border: '1px solid rgba(245, 158, 11, 0.35)',
                    textAlign: 'center',
                    minWidth: '90px',
                  }}
                >
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fbbf24' }}>
                    {report.outsideRangeCount}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#fbbf24', textTransform: 'uppercase', fontWeight: 600 }}>
                    {isTelugu ? 'పరిధి వెలుపల' : 'Outside Range'}
                  </div>
                </div>

                {isLivePersisted && (
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={handleDeleteCurrentReport}
                    disabled={isDeleting}
                    style={{ padding: '10px 14px', borderColor: 'rgba(239, 68, 68, 0.4)', color: '#f87171' }}
                    title="Delete report from database"
                  >
                    <Trash2 size={16} />
                    <span>{isDeleting ? (isTelugu ? 'తొలగిస్తోంది...' : 'Deleting...') : (isTelugu ? 'తొలగించు' : 'Delete')}</span>
                  </button>
                )}
              </div>
            </div>

            {/* Laboratory Reference Variance Notice */}
            <div
              style={{
                marginTop: '20px',
                paddingTop: '16px',
                borderTop: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.82rem',
                color: 'var(--text-muted)',
              }}
            >
              <Info size={15} color="#A855F7" style={{ flexShrink: 0 }} />
              <span>
                {isTelugu
                  ? 'ముఖ్యమైన గమనిక: రిఫరెన్స్ పరిధులు మీ అసలు నివేదికలో సూచించిన ప్రమాణాల ఆధారంగా మాత్రమే గణించబడతాయి.'
                  : 'Important note: Evaluated deterministically against the laboratory-specific reference ranges extracted directly from this document.'}
              </span>
            </div>
          </div>

          {/* Filter and Search Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px',
              marginBottom: '24px',
            }}
          >
            {/* Search input */}
            <div
              style={{
                position: 'relative',
                flex: '1 1 260px',
                maxWidth: '380px',
              }}
            >
              <Search
                size={16}
                color="var(--text-muted)"
                style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}
              />
              <input
                type="text"
                placeholder={isTelugu ? 'పరీక్ష పేరుతో శోధించండి...' : 'Search test name or category...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px 10px 38px',
                  borderRadius: 'var(--radius-pill)',
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid var(--border-subtle)',
                  color: '#ffffff',
                  fontSize: '0.9rem',
                  outline: 'none',
                  transition: 'border-color var(--transition-fast)',
                }}
              />
            </div>

            {/* Filter Buttons */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {isTelugu ? 'ఫిల్టర్:' : 'Filter:'}
              </span>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => setStatusFilter(statusFilter === 'outside_range' ? 'all' : 'outside_range')}
                style={{
                  backgroundColor: statusFilter === 'outside_range' ? 'rgba(245, 158, 11, 0.2)' : 'transparent',
                  borderColor: statusFilter === 'outside_range' ? '#fbbf24' : 'var(--border-subtle)',
                  color: statusFilter === 'outside_range' ? '#fbbf24' : 'var(--text-secondary)',
                }}
              >
                <AlertTriangle size={13} />
                <span>{isTelugu ? 'పరిధి వెలుపల మాత్రమే' : 'Outside Range Only'}</span>
              </button>

              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => setStatusFilter(statusFilter === 'in_range' ? 'all' : 'in_range')}
                style={{
                  backgroundColor: statusFilter === 'in_range' ? 'rgba(16, 185, 129, 0.2)' : 'transparent',
                  borderColor: statusFilter === 'in_range' ? '#34d399' : 'var(--border-subtle)',
                  color: statusFilter === 'in_range' ? '#34d399' : 'var(--text-secondary)',
                }}
              >
                <CheckCircle2 size={13} />
                <span>{isTelugu ? 'పరిధిలో ఉన్నవి' : 'Within Range'}</span>
              </button>
            </div>
          </div>

          {/* Tests Grid */}
          {filteredTests.length === 0 ? (
            <div
              className="glass-card"
              style={{ padding: '48px', textAlign: 'center', color: 'var(--text-secondary)' }}
            >
              <p>{isTelugu ? 'మీ శోధనకు సరిపోలే పరీక్షలు కనుగొనబడలేదు.' : 'No tests found matching your search criteria.'}</p>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setStatusFilter('all');
                }}
                style={{ marginTop: '12px' }}
              >
                {isTelugu ? 'ఫిల్టర్లను తొలగించండి' : 'Reset Filters'}
              </button>
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '20px',
                marginBottom: '40px',
              }}
            >
              {filteredTests.map((test) => (
                <ReportCard
                  key={test.id}
                  test={test}
                  language={language}
                  onOpenExplanation={onOpenExplanation}
                />
              ))}
            </div>
          )}
        </>
      )}

      {/* Educational Notice Banner */}
      <EducationalDisclaimer currentLang={language} />
    </div>
  );
};
