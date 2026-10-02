import React from 'react';
import { AlertCircle, ShieldCheck } from 'lucide-react';
import type { Language } from '../types';

interface EducationalDisclaimerProps {
  currentLang: Language;
  compact?: boolean;
}

export const EducationalDisclaimer: React.FC<EducationalDisclaimerProps> = ({
  currentLang,
  compact = false
}) => {
  const isTelugu = currentLang === 'te';

  if (compact) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 16px',
          borderRadius: 'var(--radius-pill)',
          background: 'rgba(168, 85, 247, 0.08)',
          border: '1px solid rgba(168, 85, 247, 0.25)',
          color: 'var(--text-highlight)',
          fontSize: '0.8rem',
        }}
      >
        <ShieldCheck size={16} color="#A855F7" style={{ flexShrink: 0 }} />
        <span>
          {isTelugu
            ? 'విద్యా ప్రయోజనాల కోసం మాత్రమే. ఇది వైద్య నిర్ధారణ లేదా డాక్టర్ సలహాకు ప్రత్యామ్నాయం కాదు.'
            : 'For educational purposes only. Not a medical diagnosis or substitute for physician consultation.'}
        </span>
      </div>
    );
  }

  return (
    <div
      className="glass-card"
      style={{
        padding: '16px 20px',
        borderLeft: '4px solid var(--color-purple-primary)',
        background: 'linear-gradient(90deg, rgba(109, 40, 217, 0.12) 0%, rgba(23, 14, 46, 0.6) 100%)',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        margin: '20px 0',
      }}
    >
      <AlertCircle size={20} color="#A855F7" style={{ flexShrink: 0, marginTop: '2px' }} />
      <div>
        <h4 style={{ fontSize: '0.9rem', color: '#FFFFFF', marginBottom: '2px' }}>
          {isTelugu ? 'ముఖ్యమైన విద్యా ప్రకటన' : 'Important Educational Notice'}
        </h4>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
          {isTelugu
            ? 'LabSense AI ఒక విద్యా అవగాహన సాధనం మాత్రమే. ప్రయోగశాల రిఫరెన్స్ పరిధులు ల్యాబ్ మరియు యంత్ర పరికరాల ఆధారంగా మారవచ్చు. మీ ఆరోగ్య విషయాలపై ఖచ్చితమైన నిర్ధారణ మరియు చికిత్స కోసం ఎల్లప్పుడూ అర్హత కలిగిన వైద్యుడిని సంప్రదించండి.'
            : 'LabSense AI is an educational tool designed to help you understand lab test terminology. Reference ranges naturally vary by laboratory equipment and individual physiology. This platform does not provide medical diagnoses or treatment recommendations.'}
        </p>
      </div>
    </div>
  );
};
