import React from 'react';
import { Languages } from 'lucide-react';
import type { Language } from '../types';

interface LanguageToggleProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  compact?: boolean;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({
  currentLang,
  onLanguageChange,
  compact = false
}) => {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '3px',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 'var(--radius-pill)',
        border: '1px solid var(--border-subtle)',
        backdropFilter: 'blur(10px)',
      }}
      role="group"
      aria-label="Select Language"
    >
      <button
        type="button"
        onClick={() => onLanguageChange('en')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          padding: compact ? '4px 10px' : '6px 14px',
          fontSize: compact ? '0.8rem' : '0.85rem',
          fontWeight: 600,
          borderRadius: 'var(--radius-pill)',
          border: 'none',
          cursor: 'pointer',
          transition: 'all var(--transition-fast)',
          backgroundColor: currentLang === 'en' ? 'rgba(168, 85, 247, 0.3)' : 'transparent',
          color: currentLang === 'en' ? '#ffffff' : 'var(--text-secondary)',
          boxShadow: currentLang === 'en' ? '0 2px 8px rgba(168, 85, 247, 0.3)' : 'none',
        }}
      >
        <Languages size={14} style={{ opacity: currentLang === 'en' ? 1 : 0.6 }} />
        <span>English</span>
      </button>

      <button
        type="button"
        onClick={() => onLanguageChange('te')}
        className="font-telugu"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          padding: compact ? '4px 10px' : '6px 14px',
          fontSize: compact ? '0.8rem' : '0.85rem',
          fontWeight: 600,
          borderRadius: 'var(--radius-pill)',
          border: 'none',
          cursor: 'pointer',
          transition: 'all var(--transition-fast)',
          backgroundColor: currentLang === 'te' ? 'rgba(236, 72, 153, 0.3)' : 'transparent',
          color: currentLang === 'te' ? '#ffffff' : 'var(--text-secondary)',
          boxShadow: currentLang === 'te' ? '0 2px 8px rgba(236, 72, 153, 0.3)' : 'none',
        }}
      >
        <span>తెలుగు</span>
      </button>
    </div>
  );
};
