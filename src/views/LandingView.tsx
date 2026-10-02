import React, { useState } from 'react';
import {
  FileText,
  Sparkles,
  ArrowRight,
  BookOpen,
  Languages,
  GitCompare,
} from 'lucide-react';
import type { ActiveScreen, Language } from '../types';
import { EducationalDisclaimer } from '../components/EducationalDisclaimer';

interface LandingViewProps {
  onNavigate: (screen: ActiveScreen) => void;
  language: Language;
  onOpenReport: (reportId: string) => void;
}

export const LandingView: React.FC<LandingViewProps> = ({
  onNavigate,
  language,
  onOpenReport,
}) => {
  const isTelugu = language === 'te';
  const [activeTab, setActiveTab] = useState<'raw' | 'clarity'>('clarity');

  const scrollToHowItWorks = () => {
    const el = document.getElementById('how-it-works-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{ paddingTop: '40px', paddingBottom: '60px' }}>
      {/* Hero Section */}
      <section className="container" style={{ textAlign: 'center', marginBottom: '80px' }}>
        <div style={{ display: 'inline-flex', marginBottom: '20px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              borderRadius: 'var(--radius-pill)',
              background: 'linear-gradient(135deg, rgba(109, 40, 217, 0.2) 0%, rgba(236, 72, 153, 0.15) 100%)',
              border: '1px solid rgba(168, 85, 247, 0.4)',
              boxShadow: '0 0 20px rgba(168, 85, 247, 0.2)',
            }}
          >
            <Sparkles size={16} color="#EC4899" />
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-highlight)' }}>
              {isTelugu ? 'బహుభాషా క్లినికల్ నివేదిక అవగాహన సాధనం' : 'Multilingual Clinical Intelligence'}
            </span>
          </div>
        </div>

        <h1
          style={{
            maxWidth: '900px',
            margin: '0 auto 20px',
            letterSpacing: '-0.03em',
          }}
        >
          {isTelugu ? (
            <>
              మీ ల్యాబ్ నివేదికలను అర్థం చేసుకోండి.{' '}
              <span className="gradient-text">స్పష్టతతో & సరళంగా.</span>
            </>
          ) : (
            <>
              Understand Your Lab Reports.{' '}
              <span className="gradient-text">With Clarity.</span>
            </>
          )}
        </h1>

        <p
          style={{
            maxWidth: '680px',
            margin: '0 auto 36px',
            fontSize: '1.15rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
          }}
        >
          {isTelugu
            ? 'రక్త పరీక్షలు మరియు ప్రయోగశాల నివేదికలలోని సంక్లిష్టమైన విలువల వెనుక ఉన్న అర్థాన్ని ఇంగ్లీష్ మరియు తెలుగులో సరళమైన విద్యా వివరణలతో తెలుసుకోండి.'
            : 'Transform complex laboratory parameters, measured values, and reference ranges into clear, educational insights available in English and Telugu.'}
        </p>

        {/* Hero CTAs */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            flexWrap: 'wrap',
            marginBottom: '50px',
          }}
        >
          <button
            type="button"
            className="btn btn-primary btn-lg"
            onClick={() => onNavigate('dashboard')}
          >
            <Sparkles size={18} />
            <span>{isTelugu ? 'మీ రిపోర్ట్ పరిశీలించండి' : 'Explore your report'}</span>
            <ArrowRight size={18} />
          </button>

          <button
            type="button"
            className="btn btn-secondary btn-lg"
            onClick={scrollToHowItWorks}
          >
            <BookOpen size={18} color="#A855F7" />
            <span>{isTelugu ? 'ఇది ఎలా పనిచేస్తుంది?' : 'How it works'}</span>
          </button>
        </div>

        {/* Polished Visual Transformation Illustration */}
        <div
          className="glass-card animate-fade-up"
          style={{
            maxWidth: '1020px',
            margin: '0 auto',
            padding: '28px',
            background: 'linear-gradient(180deg, rgba(23, 14, 46, 0.8) 0%, rgba(12, 7, 28, 0.95) 100%)',
            border: '1px solid var(--border-highlight)',
            boxShadow: '0 20px 50px -10px rgba(0, 0, 0, 0.8), 0 0 50px rgba(168, 85, 247, 0.25)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ textAlign: 'left' }}>
              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-pink-accent)', fontWeight: 600 }}>
                {isTelugu ? 'ఇంటరాక్టివ్ డెమో పోలిక' : 'Interactive Transformation Preview'}
              </span>
              <h3 style={{ fontSize: '1.2rem', color: '#ffffff', margin: 0 }}>
                {isTelugu ? 'సంక్లిష్ట ల్యాబ్ పత్రం → సరళమైన విద్యా అంతర్దృష్టులు' : 'Raw Clinical Data → Patient-Friendly Insight'}
              </h3>
            </div>

            {/* Switch Toggle */}
            <div
              style={{
                display: 'flex',
                background: 'rgba(255, 255, 255, 0.05)',
                padding: '4px',
                borderRadius: 'var(--radius-pill)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <button
                type="button"
                onClick={() => setActiveTab('raw')}
                style={{
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-pill)',
                  border: 'none',
                  background: activeTab === 'raw' ? 'rgba(255, 255, 255, 0.12)' : 'transparent',
                  color: activeTab === 'raw' ? '#ffffff' : 'var(--text-secondary)',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                {isTelugu ? 'సాంప్రదాయ ల్యాబ్ డేటా' : 'Raw Lab Report'}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('clarity')}
                style={{
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-pill)',
                  border: 'none',
                  background: activeTab === 'clarity' ? 'var(--gradient-brand)' : 'transparent',
                  color: '#ffffff',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                {isTelugu ? 'ల్యాబ్‌సెన్స్ స్పష్టత' : 'LabSense AI Clarity'}
              </button>
            </div>
          </div>

          {/* Transformation Visual Canvas */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px',
              textAlign: 'left',
            }}
          >
            {/* Box 1: Fasting Blood Sugar preview */}
            <div
              style={{
                padding: '18px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Metabolic Panel</span>
                <span className="badge badge-elevated" style={{ fontSize: '0.75rem' }}>
                  {isTelugu ? 'పరిధి కంటే ఎక్కువ' : 'Outside Range'}
                </span>
              </div>
              <h4 style={{ fontSize: '1.05rem', color: '#ffffff', marginBottom: '4px' }}>
                {isTelugu ? 'ఉపవాస రక్త చక్కెర (Glucose)' : 'Fasting Blood Glucose'}
              </h4>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', margin: '8px 0' }}>
                <span style={{ fontSize: '1.6rem', fontWeight: 700, color: '#ffffff' }}>118</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>mg/dL</span>
                <span style={{ marginLeft: 'auto', fontSize: '0.8rem', color: 'var(--text-highlight)' }}>Range: 70 - 99</span>
              </div>
              
              {/* Range bar */}
              <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '999px', position: 'relative', margin: '10px 0' }}>
                <div style={{ position: 'absolute', left: '20%', width: '50%', height: '100%', background: 'rgba(16, 185, 129, 0.4)', borderRadius: '999px' }} />
                <div style={{ position: 'absolute', left: '78%', top: '-3px', width: '12px', height: '12px', borderRadius: '50%', background: '#fbbf24', border: '2px solid #000' }} />
              </div>

              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: '10px 0 0 0', lineHeight: 1.45 }}>
                {isTelugu
                  ? 'కనీసం 8 గంటల ఉపవాసం తర్వాత రక్తంలోని గ్లూకోజ్ స్థాయిని కొలుస్తుంది.'
                  : 'Measures fuel circulating in blood after fasting. Higher values can guide nutrition conversations.'}
              </p>
            </div>

            {/* Box 2: Total Cholesterol preview */}
            <div
              style={{
                padding: '18px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Lipid Panel</span>
                <span className="badge badge-elevated" style={{ fontSize: '0.75rem' }}>
                  {isTelugu ? 'పరిధి కంటే ఎక్కువ' : 'Outside Range'}
                </span>
              </div>
              <h4 style={{ fontSize: '1.05rem', color: '#ffffff', marginBottom: '4px' }}>
                {isTelugu ? 'మొత్తం కొలెస్ట్రాల్ (Total)' : 'Total Cholesterol'}
              </h4>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', margin: '8px 0' }}>
                <span style={{ fontSize: '1.6rem', fontWeight: 700, color: '#ffffff' }}>218</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>mg/dL</span>
                <span style={{ marginLeft: 'auto', fontSize: '0.8rem', color: 'var(--text-highlight)' }}>Range: &lt; 200</span>
              </div>

              {/* Range bar */}
              <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '999px', position: 'relative', margin: '10px 0' }}>
                <div style={{ position: 'absolute', left: '10%', width: '60%', height: '100%', background: 'rgba(16, 185, 129, 0.4)', borderRadius: '999px' }} />
                <div style={{ position: 'absolute', left: '76%', top: '-3px', width: '12px', height: '12px', borderRadius: '50%', background: '#fbbf24', border: '2px solid #000' }} />
              </div>

              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: '10px 0 0 0', lineHeight: 1.45 }}>
                {isTelugu
                  ? 'రక్తంలో ఉన్న అన్ని రకాల కొవ్వుల సమ్మేళనాన్ని సులభంగా వివరిస్తుంది.'
                  : 'Total circulating blood fats. Evaluated alongside HDL and LDL by your clinician.'}
              </p>
            </div>

            {/* Box 3: Vitamin D3 preview */}
            <div
              style={{
                padding: '18px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Vitamins</span>
                <span className="badge badge-low" style={{ fontSize: '0.75rem' }}>
                  {isTelugu ? 'పరిధి కంటే తక్కువ' : 'Outside Range (Low)'}
                </span>
              </div>
              <h4 style={{ fontSize: '1.05rem', color: '#ffffff', marginBottom: '4px' }}>
                {isTelugu ? 'విటమిన్ డి3 (Vitamin D)' : 'Serum 25-OH Vitamin D'}
              </h4>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', margin: '8px 0' }}>
                <span style={{ fontSize: '1.6rem', fontWeight: 700, color: '#ffffff' }}>18.4</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>ng/mL</span>
                <span style={{ marginLeft: 'auto', fontSize: '0.8rem', color: 'var(--text-highlight)' }}>Range: 30 - 100</span>
              </div>

              {/* Range bar */}
              <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '999px', position: 'relative', margin: '10px 0' }}>
                <div style={{ position: 'absolute', left: '35%', width: '55%', height: '100%', background: 'rgba(16, 185, 129, 0.4)', borderRadius: '999px' }} />
                <div style={{ position: 'absolute', left: '20%', top: '-3px', width: '12px', height: '12px', borderRadius: '50%', background: '#818cf8', border: '2px solid #000' }} />
              </div>

              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: '10px 0 0 0', lineHeight: 1.45 }}>
                {isTelugu
                  ? 'ఎముకల దృఢత్వం మరియు కాల్షియం శోషణకు తోడ్పడే విటమిన్ డి నిల్వలు.'
                  : 'Crucial for calcium regulation and bone mineral density.'}
              </p>
            </div>
          </div>

          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => onOpenReport('rep-001')}
            >
              <Sparkles size={14} color="#A855F7" />
              <span>{isTelugu ? 'పూర్తి డెమో విశ్లేషణను తెరవండి' : 'Open Full Interactive Demo Report'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="container" style={{ marginBottom: '90px' }}>
        <div style={{ textAlign: 'center', marginBottom: '44px' }}>
          <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-pink-accent)', fontWeight: 700 }}>
            {isTelugu ? 'ప్రధాన ఫీచర్లు' : 'Core Capabilities'}
          </span>
          <h2 style={{ fontSize: '2rem', color: '#ffffff', marginTop: '6px' }}>
            {isTelugu ? 'ల్యాబ్‌సెన్స్ AI అందించే సౌలభ్యాలు' : 'Intelligent Health Literacy Features'}
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '24px',
          }}
        >
          {/* Card 1: Report Upload */}
          <div className="glass-card" style={{ padding: '28px 24px' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '14px',
                background: 'rgba(109, 40, 217, 0.2)',
                border: '1px solid rgba(168, 85, 247, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '18px',
              }}
            >
              <FileText size={24} color="#A855F7" />
            </div>
            <h3 style={{ fontSize: '1.15rem', color: '#ffffff', marginBottom: '8px' }}>
              {isTelugu ? 'సులభమైన రిపోర్ట్ అప్‌లోడ్' : 'Smart Report Upload'}
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
              {isTelugu
                ? 'మీ ల్యాబ్ PDF ని అప్‌లోడ్ చేయండి. పరీక్షల పేర్లు, కొలిచిన విలువలు మరియు సూచించిన రిఫరెన్స్ పరిధులను విడదీసి చూపిస్తుంది.'
                : 'Upload your lab report PDF to automatically view extracted test names, measured values, units, and laboratory-stated ranges.'}
            </p>
          </div>

          {/* Card 2: Clear Explanations */}
          <div className="glass-card" style={{ padding: '28px 24px' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '14px',
                background: 'rgba(236, 72, 153, 0.18)',
                border: '1px solid rgba(236, 72, 153, 0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '18px',
              }}
            >
              <BookOpen size={24} color="#EC4899" />
            </div>
            <h3 style={{ fontSize: '1.15rem', color: '#ffffff', marginBottom: '8px' }}>
              {isTelugu ? 'స్పష్టమైన విద్యా వివరణలు' : 'Clear Explanations'}
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
              {isTelugu
                ? 'ప్రతి పరీక్ష శరీరంలో ఏమి కొలుస్తుందో మరియు రిఫరెన్స్ పరిధి ఎందుకు ప్రాముఖ్యమో అర్థమయ్యేలా తెలుసుకోండి.'
                : 'Educational breakdowns explain "What this test measures" and "Why the range matters" without medical jargon.'}
            </p>
          </div>

          {/* Card 3: English & Telugu */}
          <div className="glass-card" style={{ padding: '28px 24px' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '14px',
                background: 'rgba(168, 85, 247, 0.2)',
                border: '1px solid rgba(168, 85, 247, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '18px',
              }}
            >
              <Languages size={24} color="#A855F7" />
            </div>
            <h3 style={{ fontSize: '1.15rem', color: '#ffffff', marginBottom: '8px' }}>
              {isTelugu ? 'ఇంగ్లీష్ & తెలుగు ద్విభాషా సదుపాయం' : 'English & Telugu'}
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
              {isTelugu
                ? 'తెలుగు మరియు ఇంగ్లీష్ మధ్య ఒకే క్లిక్‌తో భాషను మార్చుకుని వైద్య సమాచారాన్ని మీ మాతృభాషలో సులభంగా చదువుకోండి.'
                : 'Instantly toggle between English and Telugu to read healthcare concepts in the language you are most comfortable with.'}
            </p>
          </div>

          {/* Card 4: Report Comparison */}
          <div className="glass-card" style={{ padding: '28px 24px' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '14px',
                background: 'rgba(16, 185, 129, 0.16)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '18px',
              }}
            >
              <GitCompare size={24} color="#34D399" />
            </div>
            <h3 style={{ fontSize: '1.15rem', color: '#ffffff', marginBottom: '8px' }}>
              {isTelugu ? 'కాలక్రమ నివేదికల పోలిక' : 'Report Comparison'}
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
              {isTelugu
                ? 'గత మరియు ప్రస్తుత పరీక్షల ఫలితాలను పక్కపక్కనే సరిపోల్చి మార్పులను గమనించండి.'
                : 'Compare previous and current lab reports side by side to see how your test parameters have changed over time.'}
            </p>
          </div>
        </div>
      </section>

      {/* 3-Step How It Works Section */}
      <section id="how-it-works-section" className="container" style={{ marginBottom: '80px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-pink-accent)', fontWeight: 700 }}>
            {isTelugu ? 'సులువైన 3 దశలు' : 'Simple Workflow'}
          </span>
          <h2 style={{ fontSize: '2rem', color: '#ffffff', marginTop: '6px' }}>
            {isTelugu ? 'ల్యాబ్‌సెన్స్ ఎలా పనిచేస్తుంది?' : 'How LabSense AI Works'}
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '550px', margin: '8px auto 0' }}>
            {isTelugu
              ? 'మూడు సాధారణ దశల్లో మీ క్లినికల్ రిపోర్ట్ పై స్పష్టమైన అవగాహన పొందండి'
              : 'Three transparent steps to turn complex laboratory data into clear knowledge.'}
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            position: 'relative',
          }}
        >
          {/* Step 1 */}
          <div
            className="glass-card"
            style={{
              padding: '32px 24px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: 'var(--gradient-brand)',
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '1.2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px',
                boxShadow: '0 0 16px rgba(168, 85, 247, 0.4)',
              }}
            >
              1
            </div>
            <h3 style={{ fontSize: '1.15rem', color: '#ffffff', marginBottom: '8px' }}>
              {isTelugu ? '1. రిపోర్ట్ PDF ని ఎంచుకోండి' : '1. Upload your lab report PDF'}
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
              {isTelugu
                ? 'మీ డయాగ్నస్టిక్ ల్యాబ్ నుండి అందిన PDF ని సురక్షితంగా అప్‌లోడ్ చేయండి లేదా డెమో రిపోర్ట్‌ను ఎంచుకోండి.'
                : 'Select your clear laboratory report document or explore with pre-loaded clinical demo data.'}
            </p>
          </div>

          {/* Step 2 */}
          <div
            className="glass-card"
            style={{
              padding: '32px 24px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: 'var(--gradient-brand)',
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '1.2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px',
                boxShadow: '0 0 16px rgba(168, 85, 247, 0.4)',
              }}
            >
              2
            </div>
            <h3 style={{ fontSize: '1.15rem', color: '#ffffff', marginBottom: '8px' }}>
              {isTelugu ? '2. పరీక్షలు & పరిధుల గుర్తింపు' : '2. Extract parameters & ranges'}
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
              {isTelugu
                ? 'వ్యవస్థ పరీక్షల పేర్లు, కొలిచిన విలువలు మరియు సూచించిన ల్యాబ్ పరిధులను క్రమబద్ధీకరిస్తుంది.'
                : 'The system structures tests, measured values, units, and stated reference boundaries.'}
            </p>
          </div>

          {/* Step 3 */}
          <div
            className="glass-card"
            style={{
              padding: '32px 24px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: 'var(--gradient-brand)',
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '1.2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px',
                boxShadow: '0 0 16px rgba(168, 85, 247, 0.4)',
              }}
            >
              3
            </div>
            <h3 style={{ fontSize: '1.15rem', color: '#ffffff', marginBottom: '8px' }}>
              {isTelugu ? '3. విద్యా వివరణలు & పోలిక' : '3. Read educational insights'}
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
              {isTelugu
                ? 'ఇంగ్లీష్ మరియు తెలుగులో సరళమైన సమాచారాన్ని చదివి మీ వైద్యుడితో మాట్లాడటానికి సన్నద్ధం అవ్వండి.'
                : 'Access plain-language breakdowns in English and Telugu to prepare meaningful questions for your physician.'}
            </p>
          </div>
        </div>

        {/* CTA banner under how it works */}
        <div
          className="glass-card"
          style={{
            marginTop: '48px',
            padding: '32px',
            textAlign: 'center',
            background: 'linear-gradient(135deg, rgba(109, 40, 217, 0.25) 0%, rgba(236, 72, 153, 0.2) 100%)',
            border: '1px solid rgba(168, 85, 247, 0.35)',
          }}
        >
          <h3 style={{ fontSize: '1.4rem', color: '#ffffff', marginBottom: '8px' }}>
            {isTelugu ? 'మీ ల్యాబ్ నివేదికను ఇప్పుడు పరిశీలించండి' : 'Ready to explore clinical report intelligence?'}
          </h3>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '520px', margin: '0 auto 20px', fontSize: '0.95rem' }}>
            {isTelugu
              ? 'స్పష్టమైన ఆరోగ్య అవగాహన కోసం ల్యాబ్‌సెన్స్ AI డాష్‌బోర్డ్‌ను ప్రారంభించండి.'
              : 'Launch the dashboard to review sample reports and experience bilingual health education.'}
          </p>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => onNavigate('dashboard')}
          >
            <Sparkles size={16} />
            <span>{isTelugu ? 'డాష్‌బోర్డ్ తెరవండి' : 'Launch Dashboard'}</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* Educational Notice Banner */}
      <section className="container">
        <EducationalDisclaimer currentLang={language} />
      </section>
    </div>
  );
};
