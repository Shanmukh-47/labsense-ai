import React, { useState, useEffect } from 'react';
import {
  GitCompare,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles,
  ToggleLeft,
  ToggleRight,
  FileQuestion,
  Loader2,
  Database,
} from 'lucide-react';
import type { ActiveScreen, Language, LabReport, LabTest } from '../types';
import { DEMO_REPORTS } from '../data/mockReports';
import { EducationalDisclaimer } from '../components/EducationalDisclaimer';
import { api, type ReportSummaryDTO, type ReportDetailDTO } from '../services/api';

interface ReportHistoryViewProps {
  onNavigate?: (screen: ActiveScreen) => void;
  language: Language;
  onOpenExplanation: (test: LabTest) => void;
  onSelectReport?: (reportId: string) => void;
}

export const ReportHistoryView: React.FC<ReportHistoryViewProps> = ({
  language,
  onOpenExplanation,
}) => {
  const isTelugu = language === 'te';

  const [savedSummaries, setSavedSummaries] = useState<ReportSummaryDTO[]>([]);
  const [selectedReportId, setSelectedReportId] = useState<string>('');
  const [activeReport, setActiveReport] = useState<LabReport | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [useDemoMode, setUseDemoMode] = useState(false);

  useEffect(() => {
    async function loadReports() {
      setIsLoading(true);
      try {
        const summaries = await api.listReports();
        setSavedSummaries(summaries);

        if (summaries.length > 0) {
          const firstId = summaries[0].id;
          setSelectedReportId(firstId);
          await loadReportDetail(firstId);
        } else {
          // No live reports, show demo fallback
          setUseDemoMode(true);
          setSelectedReportId(DEMO_REPORTS[0].id);
          setActiveReport(DEMO_REPORTS[0]);
        }
      } catch {
        setUseDemoMode(true);
        setSelectedReportId(DEMO_REPORTS[0].id);
        setActiveReport(DEMO_REPORTS[0]);
      } finally {
        setIsLoading(false);
      }
    }

    loadReports();
  }, []);

  const loadReportDetail = async (id: string) => {
    if (id.startsWith('rep-')) {
      const found = DEMO_REPORTS.find((r) => r.id === id) || DEMO_REPORTS[0];
      setActiveReport(found);
      return;
    }

    try {
      const detail: ReportDetailDTO = await api.getReport(id);
      const mapped: LabReport = {
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
          referenceRangeDisplay: item.reference_range_display || 'Standard Range',
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
                  whatItMeasures: `${item.name} diagnostic parameter.`,
                  whyRangeMatters: `Evaluates baseline reference range criteria.`,
                  generalQuestions: [`How should this test be monitored over time?`],
                },
                te: {
                  whatItMeasures: `${item.name} పరీక్ష పారామీటర్.`,
                  whyRangeMatters: `సూచించిన పరిధితో పోలిక.`,
                  generalQuestions: [`కాలక్రమంలో ఈ పరీక్షను ఎలా పర్యవేక్షించాలి?`],
                },
              },
        })),
      };
      setActiveReport(mapped);
    } catch {
      setActiveReport(DEMO_REPORTS[0]);
    }
  };

  const handleSelectReport = async (id: string) => {
    setSelectedReportId(id);
    await loadReportDetail(id);
  };

  const displayedList = useDemoMode
    ? DEMO_REPORTS.map((d) => ({
        id: d.id,
        title: d.title,
        lab_name: d.labName,
        report_date: d.date,
        total_tests: d.totalTests,
        within_range_count: d.withinRangeCount,
        outside_range_count: d.outsideRangeCount,
      }))
    : savedSummaries;

  return (
    <div className="container" style={{ paddingTop: '32px', paddingBottom: '60px' }}>
      {/* Top Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '32px',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span className="badge badge-brand">
              <GitCompare size={12} />
              {isTelugu ? 'కాలక్రమ పోలిక' : 'Historical Trends'}
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Database size={12} color="#34d399" />
              {useDemoMode ? (isTelugu ? 'నమూనా పోలిక (Demo)' : 'Demo Dataset') : (isTelugu ? 'SQLite రికార్డులు' : 'SQLite Records')}
            </span>
          </div>

          <h1 style={{ fontSize: '2.1rem', color: '#ffffff', marginBottom: '4px' }}>
            {isTelugu ? 'నివేదికల చరిత్ర & పోలిక' : 'Report History & Trends'}
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0 }}>
            {isTelugu
              ? 'గతంలో నిర్వహించిన ల్యాబ్ పరీక్షలతో ప్రస్తుత విలువల మార్పులను పక్కపక్కనే సరిపోల్చి చూడండి.'
              : 'Track biomarker changes across multiple draws and review reference range alignments over time.'}
          </p>
        </div>

        {/* Demo State Switcher */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '8px 14px',
            borderRadius: 'var(--radius-pill)',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            {isTelugu ? 'డెమో పోలిక డేటా:' : 'Demo Comparison Mode:'}
          </span>
          <button
            type="button"
            onClick={() => {
              const newMode = !useDemoMode;
              setUseDemoMode(newMode);
              if (newMode) {
                setSelectedReportId(DEMO_REPORTS[0].id);
                setActiveReport(DEMO_REPORTS[0]);
              } else if (savedSummaries.length > 0) {
                setSelectedReportId(savedSummaries[0].id);
                loadReportDetail(savedSummaries[0].id);
              }
            }}
            style={{
              background: 'none',
              border: 'none',
              color: useDemoMode ? 'var(--color-pink-accent)' : '#34d399',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontWeight: 600,
              fontSize: '0.85rem',
            }}
          >
            {useDemoMode ? (
              <>
                <ToggleRight size={22} />
                <span>Demo</span>
              </>
            ) : (
              <>
                <ToggleLeft size={22} />
                <span>Live SQLite</span>
              </>
            )}
          </button>
        </div>
      </div>

      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
          <Loader2 size={36} className="animate-spin" color="#A855F7" style={{ margin: '0 auto 16px' }} />
          <p>{isTelugu ? 'చరిత్ర రికార్డులను లోడ్ చేస్తోంది...' : 'Loading history records...'}</p>
        </div>
      ) : displayedList.length === 0 ? (
        <div
          className="glass-card"
          style={{
            padding: '60px 24px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
            margin: '20px 0 40px',
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <FileQuestion size={32} color="#94a3b8" />
          </div>
          <h3 style={{ fontSize: '1.25rem', color: '#ffffff', margin: 0 }}>
            {isTelugu ? 'పోల్చడానికి మునుపటి నివేదికలు లేవు' : 'No previous reports available for comparison'}
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', maxWidth: '440px', margin: 0 }}>
            {isTelugu
              ? 'కాలక్రమ మార్పులను పోల్చడానికి కనీసం రెండు వేర్వేరు తేదీల ల్యాబ్ నివేదికలు అవసరం.'
              : 'Upload multiple laboratory reports over time to explore longitudinal parameter trajectories.'}
          </p>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => setUseDemoMode(true)}
            style={{ marginTop: '8px' }}
          >
            <Sparkles size={14} color="#A855F7" />
            <span>{isTelugu ? 'డెమో పోలిక డేటాను చూడండి' : 'Show Demo Historical Comparison'}</span>
          </button>
        </div>
      ) : (
        <>
          {/* Historical Reports Timeline Selector */}
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '1.1rem', color: '#ffffff', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={16} color="#A855F7" />
              <span>{isTelugu ? 'నివేదికను ఎంచుకోండి' : 'Select Report Timeline'}</span>
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              {displayedList.map((item) => {
                const isSelected = item.id === selectedReportId;
                return (
                  <div
                    key={item.id}
                    className="glass-card"
                    onClick={() => handleSelectReport(item.id)}
                    style={{
                      padding: '18px 20px',
                      cursor: 'pointer',
                      border: isSelected ? '1px solid var(--border-glow)' : '1px solid var(--border-subtle)',
                      background: isSelected ? 'rgba(109, 40, 217, 0.2)' : 'var(--bg-card)',
                      boxShadow: isSelected ? '0 0 25px rgba(168, 85, 247, 0.25)' : 'none',
                      transition: 'all var(--transition-fast)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.id.slice(0, 8)}</span>
                      <span style={{ fontSize: '0.8rem', color: isSelected ? '#ffffff' : 'var(--text-highlight)', fontWeight: 600 }}>
                        {item.report_date || 'Current Draw'}
                      </span>
                    </div>
                    <h4 style={{ fontSize: '1rem', color: '#ffffff', marginBottom: '4px' }}>
                      {item.title}
                    </h4>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      {item.total_tests} tests ({item.outside_range_count} outside range)
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Side-by-Side Comparison Matrix */}
          {activeReport && (
            <div
              className="glass-card"
              style={{
                padding: '28px',
                border: '1px solid var(--border-highlight)',
                marginBottom: '40px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-pink-accent)', fontWeight: 600 }}>
                    {isTelugu ? 'పక్కపక్కనే పోలిక' : 'Clinical Biomarker Overview'}
                  </span>
                  <h3 style={{ fontSize: '1.3rem', color: '#ffffff', margin: 0 }}>
                    {activeReport.title}
                  </h3>
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Report Date: <strong>{activeReport.date}</strong>
                  </span>
                </div>
              </div>

              {/* Comparison Table */}
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase' }}>
                      <th style={{ padding: '12px 16px' }}>{isTelugu ? 'పరీక్ష పేరు' : 'Test Parameter'}</th>
                      <th style={{ padding: '12px 16px' }}>{isTelugu ? 'కొలిచిన విలువ' : 'Measured Value'}</th>
                      <th style={{ padding: '12px 16px' }}>{isTelugu ? 'రిఫరెన్స్ పరిధి' : 'Reference Range'}</th>
                      <th style={{ padding: '12px 16px' }}>{isTelugu ? 'స్థితి' : 'Status'}</th>
                      <th style={{ padding: '12px 16px', textAlign: 'right' }}>{isTelugu ? 'చర్య' : 'Action'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeReport.tests.map((test) => {
                      const hasPrev = test.previousValue !== undefined;
                      const prev = test.previousValue ?? test.measuredValue;
                      const delta = test.measuredValue - prev;
                      const deltaFormatted = Math.abs(delta) < 1 ? delta.toFixed(2) : delta.toFixed(1);

                      return (
                        <tr
                          key={test.id}
                          style={{
                            borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
                            transition: 'background-color var(--transition-fast)',
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.02)')}
                          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                        >
                          {/* Parameter Name */}
                          <td style={{ padding: '14px 16px' }}>
                            <div style={{ fontWeight: 600, color: '#ffffff', fontSize: '0.95rem' }}>
                              {test.name}
                            </div>
                            {isTelugu && test.teluguName && (
                              <div className="font-telugu" style={{ fontSize: '0.8rem', color: 'var(--color-pink-accent)' }}>
                                {test.teluguName}
                              </div>
                            )}
                            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{test.category}</span>
                          </td>

                          {/* Current Value */}
                          <td style={{ padding: '14px 16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <strong style={{ fontSize: '1.05rem', color: '#ffffff' }}>
                                {test.measuredValue}
                              </strong>
                              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{test.unit}</span>
                              {hasPrev && (
                                <span style={{ marginLeft: '8px', fontSize: '0.78rem', color: delta > 0 ? '#fbbf24' : delta < 0 ? '#34d399' : 'var(--text-muted)' }}>
                                  ({delta > 0 ? `+${deltaFormatted}` : deltaFormatted})
                                </span>
                              )}
                            </div>
                          </td>

                          {/* Reference Range */}
                          <td style={{ padding: '14px 16px', color: 'var(--text-highlight)', fontSize: '0.88rem' }}>
                            {test.referenceRangeDisplay}
                          </td>

                          {/* Status */}
                          <td style={{ padding: '14px 16px' }}>
                            {test.status === 'within_range' ? (
                              <span className="badge badge-normal" style={{ fontSize: '0.75rem', padding: '2px 8px' }}>
                                <CheckCircle2 size={11} />
                                {isTelugu ? 'పరిధిలో ఉంది' : 'Within Range'}
                              </span>
                            ) : (
                              <span className="badge badge-elevated" style={{ fontSize: '0.75rem', padding: '2px 8px' }}>
                                <AlertTriangle size={11} />
                                {isTelugu ? 'పరిధి వెలుపల' : 'Outside Range'}
                              </span>
                            )}
                          </td>

                          {/* Action */}
                          <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                            <button
                              type="button"
                              className="btn btn-secondary btn-sm"
                              onClick={() => onOpenExplanation(test)}
                              style={{ padding: '5px 12px', fontSize: '0.8rem' }}
                            >
                              <span>{isTelugu ? 'వివరణ' : 'Understand'}</span>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}

      {/* Educational Notice Banner */}
      <EducationalDisclaimer currentLang={language} />
    </div>
  );
};
