import React from 'react';
import { Activity, ShieldCheck, Heart } from 'lucide-react';
import type { ActiveScreen, Language } from '../types';

interface FooterProps {
  onNavigate: (screen: ActiveScreen) => void;
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, language }) => {
  const isTelugu = language === 'te';

  return (
    <footer
      style={{
        backgroundColor: 'var(--bg-primary)',
        borderTop: '1px solid var(--border-subtle)',
        marginTop: '80px',
        padding: '60px 0 40px',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '40px',
            marginBottom: '48px',
          }}
        >
          {/* Brand & Mission Column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '10px',
                  background: 'var(--gradient-brand)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Activity size={18} color="#ffffff" />
              </div>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff' }}>
                LabSense <span className="gradient-text">AI</span>
              </span>
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '16px' }}>
              {isTelugu
                ? 'క్లినికల్ ల్యాబ్ నివేదికలలోని సంక్లిష్టమైన వైద్య పదజాలాన్ని మరియు రిఫరెన్స్ పరిధులను సులభంగా అర్థం చేసుకునేందుకు ఉద్దేశించిన విద్యా సాంకేతిక వేదిక.'
                : 'A patient-friendly educational intelligence tool translating clinical laboratory parameters and reference ranges into plain English and Telugu.'}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--text-highlight)' }}>
              <ShieldCheck size={16} color="#A855F7" />
              <span>{isTelugu ? 'విద్యా అవగాహన ప్రాజెక్ట్ (హ్యాకథాన్)' : 'Educational Prototype (Hackathon Project)'}</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 style={{ fontSize: '0.95rem', color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px' }}>
              {isTelugu ? 'త్వరిత లింకులు' : 'Navigation'}
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>
                <button
                  type="button"
                  onClick={() => { onNavigate('landing'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.9rem' }}
                >
                  {isTelugu ? 'హోమ్ పేజీ' : 'Home / Overview'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => { onNavigate('dashboard'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.9rem' }}
                >
                  {isTelugu ? 'డాష్‌బోర్డ్ & PDF అప్‌లోడ్' : 'Dashboard & Report Upload'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => { onNavigate('analysis'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.9rem' }}
                >
                  {isTelugu ? 'నివేదిక విశ్లేషణ' : 'Report Analysis Screen'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => { onNavigate('history'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.9rem' }}
                >
                  {isTelugu ? 'చరిత్ర & రిపోర్ట్ పోలిక' : 'Report History & Comparison'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => { onNavigate('privacy'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.9rem' }}
                >
                  {isTelugu ? 'గోప్యతా విధానం' : 'Privacy Policy'}
                </button>
              </li>
            </ul>
          </div>

          {/* Educational Guidelines */}
          <div>
            <h4 style={{ fontSize: '0.95rem', color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px' }}>
              {isTelugu ? 'విద్యా మార్గదర్శకాలు' : 'Clinical Guidelines'}
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              {isTelugu
                ? 'ఈ వెబ్‌సైట్ ఎటువంటి మందులను సిఫార్సు చేయదు లేదా వ్యాధి నిర్ధారణ చేయదు. పరీక్షల రిఫరెన్స్ పరిధులు ప్రతి ల్యాబ్‌కు భిన్నంగా ఉండవచ్చు.'
                : 'LabSense AI does not diagnose conditions, prescribe medications, or replace direct consultation with a qualified medical professional.'}
            </p>
          </div>
        </div>

        {/* Bottom Disclaimer Banner */}
        <div
          style={{
            padding: '20px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            marginBottom: '32px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-highlight)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              {isTelugu ? 'చట్టబద్ధ విద్యా ప్రకటన' : 'Mandatory Educational Disclaimer'}
            </span>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>
            {isTelugu
              ? 'ఈ వెబ్ అప్లికేషన్ కేవలం అవగాహన మరియు విద్యా ప్రయోజనాల కోసమే నిర్మించబడింది. ప్రదర్శించబడిన అన్ని విలువలు మరియు రోగి వివరాలు కేవలం నమూనా (Demo) డేటా మాత్రమే. ఏదైనా వైద్య అత్యవసర పరిస్థితి లేదా ప్రశ్నల కోసం మీ వైద్యుడిని సంప్రదించండి.'
              : 'LabSense AI is strictly an educational tool designed to foster health literacy. All sample figures, patient identifiers, and metrics shown within the demo interface are purely synthetic and fictional. Never disregard professional medical counsel based on information obtained from this application.'}
          </p>
        </div>

        {/* Copyright & Signoff */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            fontSize: '0.82rem',
            color: 'var(--text-muted)',
            paddingTop: '20px',
            borderTop: '1px solid var(--border-subtle)',
          }}
        >
          <span>© {new Date().getFullYear()} LabSense AI — Multilingual Clinical Report Intelligence</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            Designed with <Heart size={14} color="#EC4899" fill="#EC4899" /> for clear health literacy
          </span>
        </div>
      </div>
    </footer>
  );
};
