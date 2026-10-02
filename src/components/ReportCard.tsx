import React from 'react';
import { CheckCircle2, AlertTriangle, ArrowUpRight, ArrowDownRight, BookOpen, Clock } from 'lucide-react';
import type { LabTest, Language } from '../types';

interface ReportCardProps {
  test: LabTest;
  language: Language;
  onOpenExplanation: (test: LabTest) => void;
}

export const ReportCard: React.FC<ReportCardProps> = ({
  test,
  language,
  onOpenExplanation,
}) => {
  const isTelugu = language === 'te';

  // Calculate visual position on mini-bar
  const min = test.referenceRangeMin;
  const max = test.referenceRangeMax;
  const spread = max - min || 1;
  const bufferMin = Math.max(0, min - spread * 0.4);
  const bufferMax = max + spread * 0.4;
  const totalSpan = bufferMax - bufferMin;
  const clampedVal = Math.max(bufferMin, Math.min(bufferMax, test.measuredValue));
  const pointerPercent = Math.min(96, Math.max(4, ((clampedVal - bufferMin) / totalSpan) * 100));
  const normalStartPercent = ((min - bufferMin) / totalSpan) * 100;
  const normalWidthPercent = ((max - min) / totalSpan) * 100;

  const isWithin = test.status === 'within_range';

  // Delta calculation if previous value exists
  const hasPrevious = test.previousValue !== undefined;
  const delta = hasPrevious ? (test.measuredValue - (test.previousValue as number)) : 0;
  const deltaFormatted = Math.abs(delta) < 1 ? delta.toFixed(2) : delta.toFixed(1);

  return (
    <div
      className="glass-card glass-card-interactive"
      style={{
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: '16px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top Bar: Category & Status */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
        <div>
          <span
            style={{
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              fontWeight: 600,
              color: 'var(--color-pink-accent)',
            }}
          >
            {test.category}
          </span>
          <h3 style={{ fontSize: '1.15rem', color: '#ffffff', marginTop: '2px', lineHeight: 1.3 }}>
            {test.name}
          </h3>
          {isTelugu && test.teluguName && (
            <p className="font-telugu" style={{ fontSize: '0.85rem', color: 'var(--text-highlight)', margin: '2px 0 0 0' }}>
              {test.teluguName}
            </p>
          )}
        </div>

        {/* Status Badge with shape & text distinction */}
        <div>
          {isWithin ? (
            <span className="badge badge-normal" style={{ whiteSpace: 'nowrap' }}>
              <CheckCircle2 size={13} />
              <span>{isTelugu ? 'సాధారణ పరిధి' : 'Within range'}</span>
            </span>
          ) : (
            <span className="badge badge-elevated" style={{ whiteSpace: 'nowrap' }}>
              <AlertTriangle size={13} />
              <span>{isTelugu ? test.statusLabelTe : test.statusLabelEn}</span>
            </span>
          )}
        </div>
      </div>

      {/* Center Value & Range details */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '12px',
          padding: '12px 14px',
          borderRadius: 'var(--radius-md)',
          backgroundColor: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
        }}
      >
        <div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            {isTelugu ? 'ఫలితం' : 'Measured'}
          </span>
          <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#ffffff', lineHeight: 1.2 }}>
            {test.measuredValue}{' '}
            <span style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-secondary)' }}>
              {test.unit}
            </span>
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            {isTelugu ? 'సూచించిన పరిధి' : 'Stated Range'}
          </span>
          <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-highlight)', lineHeight: 1.2, marginTop: '4px' }}>
            {test.referenceRangeDisplay}
          </div>
        </div>
      </div>

      {/* Mini Visual Distribution Bar */}
      <div>
        <div
          style={{
            position: 'relative',
            height: '6px',
            borderRadius: 'var(--radius-pill)',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            overflow: 'visible',
            margin: '8px 0',
          }}
          aria-hidden="true"
        >
          {/* Normal Zone */}
          <div
            style={{
              position: 'absolute',
              left: `${normalStartPercent}%`,
              width: `${normalWidthPercent}%`,
              height: '100%',
              backgroundColor: 'rgba(16, 185, 129, 0.4)',
              borderRadius: '2px',
            }}
          />
          {/* Pointer */}
          <div
            style={{
              position: 'absolute',
              left: `${pointerPercent}%`,
              top: '-4px',
              transform: 'translateX(-50%)',
              width: '14px',
              height: '14px',
              borderRadius: '50%',
              backgroundColor: isWithin ? '#34d399' : '#fbbf24',
              border: '2px solid #0f0924',
              boxShadow: '0 0 6px rgba(0,0,0,0.5)',
            }}
          />
        </div>
      </div>

      {/* Historical Trend Note if present */}
      {hasPrevious && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.78rem',
            color: 'var(--text-muted)',
            padding: '4px 8px',
            borderRadius: 'var(--radius-sm)',
            background: 'rgba(255, 255, 255, 0.02)',
          }}
        >
          <Clock size={13} color="#A855F7" />
          <span>
            {isTelugu ? 'మునుపటి విలువ: ' : 'Previous value: '}
            <strong style={{ color: 'var(--text-primary)' }}>
              {test.previousValue} {test.unit}
            </strong>
          </span>
          <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '2px' }}>
            {delta > 0 ? (
              <span style={{ color: '#fbbf24', display: 'flex', alignItems: 'center' }}>
                <ArrowUpRight size={12} /> +{deltaFormatted}
              </span>
            ) : delta < 0 ? (
              <span style={{ color: '#34d399', display: 'flex', alignItems: 'center' }}>
                <ArrowDownRight size={12} /> {deltaFormatted}
              </span>
            ) : (
              <span>(No change)</span>
            )}
          </span>
        </div>
      )}

      {/* Action: Understand this result */}
      <button
        type="button"
        className="btn btn-secondary btn-sm"
        onClick={() => onOpenExplanation(test)}
        style={{
          width: '100%',
          justifyContent: 'center',
          borderColor: 'rgba(168, 85, 247, 0.3)',
          backgroundColor: 'rgba(168, 85, 247, 0.08)',
        }}
      >
        <BookOpen size={15} color="#A855F7" />
        <span>{isTelugu ? 'ఈ ఫలితాన్ని అర్థం చేసుకోండి' : 'Understand this result'}</span>
      </button>
    </div>
  );
};
