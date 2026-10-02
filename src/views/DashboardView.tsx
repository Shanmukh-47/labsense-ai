import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Calendar,
  ChevronRight,
  Clock,
  FileQuestion,
  ToggleLeft,
  ToggleRight,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Trash2,
  Database,
  Building,
  Loader2,
} from 'lucide-react';
import type { ActiveScreen, Language } from '../types';
import { UploadZone } from '../components/UploadZone';
import { SupportedCapabilitiesInfo } from '../components/SupportedCapabilitiesInfo';
import { DEMO_REPORTS } from '../data/mockReports';
import { EducationalDisclaimer } from '../components/EducationalDisclaimer';
import { api, type ReportSummaryDTO } from '../services/api';

interface DashboardViewProps {
  onNavigate: (screen: ActiveScreen) => void;
  language: Language;
  onSelectReport: (reportId: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onNavigate,
  language,
  onSelectReport,
}) => {
  const isTelugu = language === 'te';
  const [liveReports, setLiveReports] = useState<ReportSummaryDTO[]>([]);
  const [isLoadingLive, setIsLoadingLive] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [showDemoReports, setShowDemoReports] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchSavedReports = async () => {
    setIsLoadingLive(true);
    setFetchError(null);
    try {
      const data = await api.listReports();
      setLiveReports(data);
      // If no live reports exist, default to showing demo reports toggle option
      if (data.length === 0) {
        setShowDemoReports(true);
      } else {
        setShowDemoReports(false);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Could not fetch saved reports';
      setFetchError(msg);
      setShowDemoReports(true);
    } finally {
      setIsLoadingLive(false);
    }
  };

  useEffect(() => {
    fetchSavedReports();
  }, []);

  const handleDeleteReport = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (!window.confirm(isTelugu ? 'ఈ నివేదికను ఖచ్చితంగా తొలగించాలనుకుంటున్నారా?' : 'Are you sure you want to permanently delete this report?')) {
      return;
    }
    setDeletingId(id);
    try {
      await api.deleteReport(id);
      setLiveReports((prev) => prev.filter((r) => r.id !== id));
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Failed to delete report');
    } finally {
      setDeletingId(null);
    }
  };

  const hasLiveReports = liveReports.length > 0;

  return (
    <div className="container" style={{ paddingTop: '32px', paddingBottom: '60px' }}>
      {/* Top Greeting & State Controls */}
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
              <Sparkles size={12} />
              {isTelugu ? 'క్లినికల్ డాష్‌బోర్డ్' : 'Clinical Dashboard'}
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Database size={12} color="#34d399" />
              {isTelugu ? 'SQLite నిల్వ' : 'SQLite Local Storage'}
            </span>
          </div>

          <h1 style={{ fontSize: '2.2rem', color: '#ffffff', marginBottom: '4px' }}>
            {isTelugu ? 'LabSense AI కి స్వాగతం' : 'Welcome to LabSense AI'}
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0 }}>
            {isTelugu
              ? 'మీ ల్యాబ్ నివేదిక PDF ని అప్‌లోడ్ చేయండి, విలువలను సమీక్షించండి మరియు రికార్డులలో భద్రపరచండి.'
              : 'Upload your lab report PDF to extract clinical parameters, verify values, and persist in your SQLite records.'}
          </p>
        </div>

        {/* Demo Mode Toggle & Refresh Button */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={fetchSavedReports}
            disabled={isLoadingLive}
            title="Refresh saved reports from database"
          >
            <RefreshCw size={14} className={isLoadingLive ? 'animate-spin' : ''} />
            <span>{isTelugu ? 'రిఫ్రెష్' : 'Refresh'}</span>
          </button>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 12px',
              borderRadius: 'var(--radius-pill)',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              {isTelugu ? 'నమూనా డేటా (Demo):' : 'Demo Samples:'}
            </span>
            <button
              type="button"
              onClick={() => setShowDemoReports(!showDemoReports)}
              style={{
                background: 'none',
                border: 'none',
                color: showDemoReports ? 'var(--color-pink-accent)' : '#94a3b8',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontWeight: 600,
                fontSize: '0.8rem',
              }}
            >
              {showDemoReports ? (
                <>
                  <ToggleRight size={20} />
                  <span>Showing</span>
                </>
              ) : (
                <>
                  <ToggleLeft size={20} />
                  <span>Hidden</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Upload Dropzone & Capabilities Info Area */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
        <UploadZone
          language={language}
          onReportLoaded={(reportId) => {
            onSelectReport(reportId);
            onNavigate('analysis');
          }}
        />

        {/* What LabSense AI Supports Information Section */}
        <SupportedCapabilitiesInfo language={language} defaultExpanded={true} />
      </div>

      {/* Saved Reports from SQLite Section */}
      <section style={{ marginBottom: '40px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '18px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Clock size={18} color="#A855F7" />
            <h2 style={{ fontSize: '1.35rem', color: '#ffffff', margin: 0 }}>
              {isTelugu ? 'భద్రపరిచిన నివేదికలు (SQLite)' : 'Saved Laboratory Reports'}
            </h2>
          </div>

          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            {isLoadingLive
              ? (isTelugu ? 'లోడ్ చేస్తోంది...' : 'Loading records...')
              : (isTelugu ? `${liveReports.length} నివేదికలు అందుబాటులో ఉన్నాయి` : `${liveReports.length} saved records`)}
          </span>
        </div>

        {fetchError && !hasLiveReports && (
          <div
            style={{
              padding: '12px 16px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'rgba(239, 68, 68, 0.12)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: '#fca5a5',
              fontSize: '0.85rem',
              marginBottom: '16px',
            }}
          >
            {fetchError}
          </div>
        )}

        {/* Loading Spinner */}
        {isLoadingLive ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
            <Loader2 size={32} className="animate-spin" color="#A855F7" style={{ margin: '0 auto 12px' }} />
            <p>{isTelugu ? 'డేటాబేస్ నుండి రికార్డులను పొందుతోంది...' : 'Fetching records from SQLite database...'}</p>
          </div>
        ) : hasLiveReports ? (
          /* Live SQLite Reports Grid */
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
            {liveReports.map((report) => (
              <div
                key={report.id}
                className="glass-card glass-card-interactive"
                style={{
                  padding: '22px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '16px',
                  cursor: 'pointer',
                  position: 'relative',
                }}
                onClick={() => {
                  onSelectReport(report.id);
                  onNavigate('analysis');
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <span
                      style={{
                        fontSize: '0.72rem',
                        padding: '2px 8px',
                        borderRadius: 'var(--radius-pill)',
                        backgroundColor: 'rgba(52, 211, 153, 0.15)',
                        color: '#34d399',
                        fontWeight: 600,
                        border: '1px solid rgba(52, 211, 153, 0.3)',
                      }}
                    >
                      SQLite Persisted
                    </span>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Calendar size={12} />
                        {report.report_date || 'Recent'}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => handleDeleteReport(e, report.id)}
                        disabled={deletingId === report.id}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#94a3b8',
                          cursor: 'pointer',
                          padding: '3px',
                        }}
                        title="Delete report"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  <h3 style={{ fontSize: '1.15rem', color: '#ffffff', marginBottom: '4px', lineHeight: 1.3 }}>
                    {report.title}
                  </h3>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: 0, display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Building size={13} color="#A855F7" />
                    {report.lab_name || 'Diagnostic Laboratory'}
                  </p>
                </div>

                {/* Metric Summary Badges */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.04)',
                  }}
                >
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    <span>{isTelugu ? 'మొత్తం: ' : 'Total: '}</span>
                    <strong style={{ color: '#ffffff' }}>{report.total_tests}</strong>
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span className="badge badge-normal" style={{ fontSize: '0.75rem', padding: '2px 8px' }}>
                      <CheckCircle2 size={11} />
                      {report.within_range_count} {isTelugu ? 'పరిధిలో' : 'In range'}
                    </span>
                    {report.outside_range_count > 0 && (
                      <span className="badge badge-elevated" style={{ fontSize: '0.75rem', padding: '2px 8px' }}>
                        <AlertTriangle size={11} />
                        {report.outside_range_count} {isTelugu ? 'బయట' : 'Outside'}
                      </span>
                    )}
                  </div>
                </div>

                {/* Action footer */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    color: 'var(--text-highlight)',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    paddingTop: '6px',
                  }}
                >
                  <span>{isTelugu ? 'విశ్లేషణను చూడండి' : 'View Full Report Analysis'}</span>
                  <ChevronRight size={16} color="#A855F7" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div
            className="glass-card"
            style={{
              padding: '48px 24px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '14px',
            }}
          >
            <div
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FileQuestion size={28} color="#94a3b8" />
            </div>
            <h3 style={{ fontSize: '1.15rem', color: '#ffffff', margin: 0 }}>
              {isTelugu ? 'డేటాబేస్‌లో నివేదికలు లేవు' : 'No laboratory reports saved yet'}
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', maxWidth: '440px', margin: 0 }}>
              {isTelugu
                ? 'మీ మొదటి ల్యాబ్ నివేదికను పైన అప్‌లోడ్ చేయండి లేదా నమూనా క్లినికల్ డేటాతో విశ్లేషణను పరిశీలించండి.'
                : 'Upload your first laboratory PDF above, verify the extracted values, and save to build your medical history.'}
            </p>
          </div>
        )}
      </section>

      {/* Synthetic Demo Reports Section (Explicitly labeled) */}
      {showDemoReports && (
        <section style={{ marginBottom: '40px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '16px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="badge badge-brand" style={{ backgroundColor: 'rgba(236, 72, 153, 0.15)', color: 'var(--color-pink-accent)' }}>
                SYNTHETIC SAMPLES
              </span>
              <h3 style={{ fontSize: '1.15rem', color: '#ffffff', margin: 0 }}>
                {isTelugu ? 'నమూనా డెమో నివేదికలు' : 'Demo Reference Datasets'}
              </h3>
            </div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              {isTelugu ? 'పరీక్ష ప్రయోజనాల కోసం మాత్రమే' : 'For reference & UI demonstration only'}
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '18px' }}>
            {DEMO_REPORTS.map((demo) => (
              <div
                key={demo.id}
                className="glass-card glass-card-interactive"
                style={{
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '14px',
                  cursor: 'pointer',
                  border: '1px dashed rgba(236, 72, 153, 0.3)',
                }}
                onClick={() => {
                  onSelectReport(demo.id);
                  onNavigate('analysis');
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontSize: '0.72rem', color: 'var(--color-pink-accent)', fontWeight: 600 }}>
                      DEMO #{demo.id}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{demo.date}</span>
                  </div>
                  <h4 style={{ fontSize: '1.05rem', color: '#ffffff', marginBottom: '4px' }}>
                    {demo.title}
                  </h4>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    {demo.labName}
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>{demo.totalTests} biomarkers</span>
                  <span style={{ color: 'var(--text-highlight)', fontWeight: 600 }}>Explore Sample →</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Educational Notice Banner */}
      <EducationalDisclaimer currentLang={language} />
    </div>
  );
};
