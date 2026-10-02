import React, { useEffect } from 'react';
import { X, HelpCircle, Activity, Stethoscope, AlertTriangle, CheckCircle2, ChevronRight } from 'lucide-react';
import type { LabTest, Language } from '../types';
import { LanguageToggle } from './LanguageToggle';

interface TestExplanationModalProps {
  test: LabTest | null;
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export const TestExplanationModal: React.FC<TestExplanationModalProps> = ({
  test,
  isOpen,
  onClose,
  language,
  onLanguageChange,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !test) return null;

  const isTelugu = language === 'te';
  const explanation = test.explanation[language];

  // Calculate position percentage for normal range visualization
  const min = test.referenceRangeMin;
  const max = test.referenceRangeMax;
  const spread = max - min || 1;
  const bufferMin = Math.max(0, min - spread * 0.5);
  const bufferMax = max + spread * 0.5;
  const totalSpan = bufferMax - bufferMin;
  const clampedVal = Math.max(bufferMin, Math.min(bufferMax, test.measuredValue));
  const pointerPercent = ((clampedVal - bufferMin) / totalSpan) * 100;
  const normalStartPercent = ((min - bufferMin) / totalSpan) * 100;
  const normalWidthPercent = ((max - min) / totalSpan) * 100;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="explanation-title"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        backgroundColor: 'rgba(5, 2, 12, 0.82)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="glass-card animate-fade-up"
        style={{
          width: '100%',
          maxWidth: '680px',
          maxHeight: '90vh',
          overflowY: 'auto',
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border-highlight)',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 40px rgba(168, 85, 247, 0.25)',
          padding: '0',
          position: 'relative',
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '24px 28px 20px',
            borderBottom: '1px solid var(--border-subtle)',
            background: 'linear-gradient(180deg, rgba(109, 40, 217, 0.15) 0%, transparent 100%)',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: '16px',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span className="badge badge-brand">{test.category}</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                ID: {test.id}
              </span>
            </div>
            <h3
              id="explanation-title"
              style={{
                fontSize: '1.4rem',
                color: '#ffffff',
                lineHeight: 1.3,
                marginBottom: isTelugu && test.teluguName ? '2px' : '0',
              }}
            >
              {test.name}
            </h3>
            {test.teluguName && (
              <p
                className="font-telugu"
                style={{
                  fontSize: '0.95rem',
                  color: 'var(--color-pink-accent)',
                  fontWeight: 500,
                  margin: 0,
                }}
              >
                {test.teluguName}
              </p>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <LanguageToggle
              currentLang={language}
              onLanguageChange={onLanguageChange}
              compact
            />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close dialog"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--text-secondary)';
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
              }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: '22px' }}>
          
          {/* Measured Value & Reference Range Bar Card */}
          <div
            style={{
              padding: '16px 20px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(255, 255, 255, 0.025)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '14px' }}>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {isTelugu ? 'పరీక్షించిన విలువ' : 'Measured Result'}
                </span>
                <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#ffffff', display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                  <span>{test.measuredValue}</span>
                  <span style={{ fontSize: '0.95rem', color: 'var(--text-muted)', fontWeight: 500 }}>{test.unit}</span>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  {isTelugu ? 'రిఫరెన్స్ పరిధి' : 'Reference Range'}
                </span>
                <div style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-highlight)' }}>
                  {test.referenceRangeDisplay}
                </div>
              </div>
            </div>

            {/* Visual Range Distribution Bar */}
            <div style={{ margin: '14px 0 6px' }}>
              <div
                style={{
                  position: 'relative',
                  height: '10px',
                  borderRadius: 'var(--radius-pill)',
                  backgroundColor: 'rgba(255, 255, 255, 0.06)',
                  overflow: 'visible',
                }}
              >
                {/* Normal Range Zone */}
                <div
                  style={{
                    position: 'absolute',
                    left: `${normalStartPercent}%`,
                    width: `${normalWidthPercent}%`,
                    height: '100%',
                    background: 'rgba(16, 185, 129, 0.35)',
                    borderLeft: '2px solid #34d399',
                    borderRight: '2px solid #34d399',
                    borderRadius: '2px',
                  }}
                  title="Stated Reference Range"
                />

                {/* Measured Value Pointer */}
                <div
                  style={{
                    position: 'absolute',
                    left: `${pointerPercent}%`,
                    top: '-6px',
                    transform: 'translateX(-50%)',
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    background: 'var(--gradient-brand)',
                    border: '2px solid #ffffff',
                    boxShadow: '0 0 10px rgba(168, 85, 247, 0.8)',
                    zIndex: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#ffffff' }} />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                <span>{isTelugu ? 'తక్కువ' : 'Below Range'}</span>
                <span style={{ color: '#34d399', fontWeight: 600 }}>{isTelugu ? 'సాధారణ పరిధి' : 'Standard Range'}</span>
                <span>{isTelugu ? 'ఎక్కువ' : 'Above Range'}</span>
              </div>
            </div>

            {/* Status Pill */}
            <div style={{ marginTop: '12px' }}>
              {test.status === 'within_range' ? (
                <div className="badge badge-normal" style={{ fontSize: '0.85rem', padding: '6px 14px' }}>
                  <CheckCircle2 size={16} />
                  <span>{isTelugu ? test.statusLabelTe : test.statusLabelEn}</span>
                </div>
              ) : (
                <div className="badge badge-elevated" style={{ fontSize: '0.85rem', padding: '6px 14px' }}>
                  <AlertTriangle size={16} />
                  <span>{isTelugu ? test.statusLabelTe : test.statusLabelEn}</span>
                </div>
              )}
            </div>
          </div>

          {/* Section 1: What this test measures */}
          <div className="glass-card" style={{ padding: '18px 20px', backgroundColor: 'rgba(255, 255, 255, 0.02)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <Activity size={18} color="#A855F7" />
              <h4 style={{ fontSize: '1rem', color: '#ffffff' }}>
                {isTelugu ? '1. ఈ పరీక్ష ఏమి కొలుస్తుంది?' : '1. What this test measures'}
              </h4>
            </div>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-primary)', lineHeight: 1.6, margin: 0 }}>
              {explanation.whatItMeasures}
            </p>
          </div>

          {/* Section 2: Why the range matters */}
          <div className="glass-card" style={{ padding: '18px 20px', backgroundColor: 'rgba(255, 255, 255, 0.02)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <HelpCircle size={18} color="#EC4899" />
              <h4 style={{ fontSize: '1rem', color: '#ffffff' }}>
                {isTelugu ? '2. రిఫరెన్స్ పరిధి ఎందుకు ముఖ్యం?' : '2. Why the reference range matters'}
              </h4>
            </div>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-primary)', lineHeight: 1.6, margin: 0 }}>
              {explanation.whyRangeMatters}
            </p>
          </div>

          {/* Section 3: Questions to ask your doctor */}
          <div className="glass-card" style={{ padding: '18px 20px', backgroundColor: 'rgba(255, 255, 255, 0.02)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <Stethoscope size={18} color="#34D399" />
              <h4 style={{ fontSize: '1rem', color: '#ffffff' }}>
                {isTelugu ? '3. మీ వైద్యుడిని అడగవలసిన సాధారణ ప్రశ్నలు' : '3. Thoughtful questions for your doctor'}
              </h4>
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', padding: 0, margin: 0 }}>
              {explanation.generalQuestions.map((q, idx) => (
                <li
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '8px',
                    fontSize: '0.88rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.45,
                  }}
                >
                  <ChevronRight size={16} color="#A855F7" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>{q}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Strict Educational Disclaimer Box */}
          <div
            style={{
              padding: '14px 18px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(168, 85, 247, 0.08)',
              border: '1px solid rgba(168, 85, 247, 0.2)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px',
            }}
          >
            <AlertTriangle size={18} color="#EC4899" style={{ flexShrink: 0, marginTop: '2px' }} />
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.45 }}>
              <strong style={{ color: '#ffffff' }}>
                {isTelugu ? 'వైద్య సలహా కాదు: ' : 'Educational Disclaimer: '}
              </strong>
              {isTelugu
                ? 'ఈ సమాచారం కేవలం మీ అవగాహన కోసం మాత్రమే. ఇది వైద్య నిర్ధారణ (Diagnosis) లేదా చికిత్స కాదు. ఎల్లప్పుడూ మీ వైద్యుడి సలహా పాటించండి.'
                : 'This information is strictly educational and is not a medical diagnosis or clinical interpretation. Laboratory results must always be evaluated by a certified physician in the context of your personal health history.'}
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div
          style={{
            padding: '16px 28px',
            borderTop: '1px solid var(--border-subtle)',
            background: 'rgba(15, 9, 36, 0.8)',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={onClose}
          >
            {isTelugu ? 'ముగించు' : 'Close Explanation'}
          </button>
        </div>
      </div>
    </div>
  );
};
