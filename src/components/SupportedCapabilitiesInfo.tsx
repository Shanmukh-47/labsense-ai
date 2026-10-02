import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  Sparkles,
  FileCheck2,
  AlertTriangle,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Activity,
  Heart,
  Droplets,
  Microscope,
  Sun,
  Layers,
  HelpCircle,
} from 'lucide-react';
import type { Language } from '../types';

interface SupportedCapabilitiesInfoProps {
  language: Language;
  defaultExpanded?: boolean;
}

export const SupportedCapabilitiesInfo: React.FC<SupportedCapabilitiesInfoProps> = ({
  language,
  defaultExpanded = true,
}) => {
  const isTelugu = language === 'te';
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [activeTab, setActiveTab] = useState<'all' | 'supported' | 'unsupported' | 'workflow'>('all');

  const panels = [
    {
      category: isTelugu ? 'జీవక్రియ & మధుమేహం (Metabolic & Diabetes)' : 'Metabolic & Diabetes Panel',
      icon: <Activity size={15} color="#A855F7" />,
      tests: [
        { name: 'Fasting Blood Glucose', teName: 'ఫాస్టింగ్ బ్లడ్ గ్లూకోజ్', unit: 'mg/dL' },
        { name: 'Hemoglobin A1c (HbA1c)', teName: 'హెచ్‌బిఎ1సి (HbA1c)', unit: '%' },
      ],
    },
    {
      category: isTelugu ? 'లిపిడ్ ప్రొఫైల్ (Lipid Profile)' : 'Lipid Profile',
      icon: <Heart size={15} color="#EC4899" />,
      tests: [
        { name: 'Total Cholesterol', teName: 'టోటల్ కొలెస్ట్రాల్', unit: 'mg/dL' },
        { name: 'HDL Cholesterol', teName: 'హెచ్‌డిఎల్ కొలెస్ట్రాల్', unit: 'mg/dL' },
        { name: 'LDL Cholesterol', teName: 'ఎల్‌డిఎల్ కొలెస్ట్రాల్', unit: 'mg/dL' },
      ],
    },
    {
      category: isTelugu ? 'రక్త పరీక్ష (CBC / Hemogram)' : 'Complete Blood Count (CBC / Hemogram)',
      icon: <Droplets size={15} color="#F43F5E" />,
      tests: [
        { name: 'Hemoglobin (Hb)', teName: 'హిమోగ్లోబిన్ (Hb)', unit: 'g/dL' },
        { name: 'Total Leukocyte Count (WBC)', teName: 'తెల్ల రక్త కణాలు (WBC)', unit: '/cumm or /uL' },
        { name: 'Platelet Count', teName: 'ప్లేట్‌లెట్స్', unit: '/cumm or /uL' },
      ],
    },
    {
      category: isTelugu ? 'మూత్రపిండాల పనితీరు (Kidney Function)' : 'Kidney Function',
      icon: <Microscope size={15} color="#06B6D4" />,
      tests: [
        { name: 'Serum Creatinine', teName: 'సీరమ్ క్రియాటినిన్', unit: 'mg/dL' },
        { name: 'Blood Urea Nitrogen (BUN)', teName: 'బ్లడ్ యూరియా నైట్రోజన్ (BUN)', unit: 'mg/dL' },
      ],
    },
    {
      category: isTelugu ? 'కాలేయ పనితీరు (Liver Function)' : 'Liver Function',
      icon: <Layers size={15} color="#10B981" />,
      tests: [
        { name: 'Serum ALT (SGPT)', teName: 'సీరమ్ ALT (SGPT)', unit: 'U/L' },
      ],
    },
    {
      category: isTelugu ? 'విటమిన్లు & సూక్ష్మపోషకాలు (Vitamins & Micronutrients)' : 'Vitamins & Micronutrients',
      icon: <Sun size={15} color="#F59E0B" />,
      tests: [
        { name: 'Serum 25-OH Vitamin D', teName: 'సీరమ్ 25-OH విటమిన్ D', unit: 'ng/mL' },
      ],
    },
  ];

  return (
    <div
      className="glass-card"
      style={{
        borderRadius: 'var(--radius-lg)',
        border: '1px solid rgba(168, 85, 247, 0.25)',
        background: 'linear-gradient(180deg, rgba(23, 14, 46, 0.75) 0%, rgba(13, 8, 30, 0.85) 100%)',
        overflow: 'hidden',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.35)',
        transition: 'all var(--transition-normal)',
      }}
    >
      {/* Header Banner with Expand/Collapse */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          padding: '16px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          background: 'rgba(109, 40, 217, 0.12)',
          borderBottom: isExpanded ? '1px solid rgba(168, 85, 247, 0.15)' : 'none',
          userSelect: 'none',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-sm)',
              background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.3) 0%, rgba(236, 72, 153, 0.2) 100%)',
              border: '1px solid rgba(168, 85, 247, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <HelpCircle size={20} color="#A855F7" />
          </div>
          <div>
            <h3
              style={{
                fontSize: '1.05rem',
                fontWeight: 700,
                color: '#ffffff',
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span>{isTelugu ? 'ల్యాబ్‌సెన్స్ AI దేనికి మద్దతు ఇస్తుంది?' : 'What LabSense AI Supports'}</span>
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  padding: '2px 8px',
                  borderRadius: 'var(--radius-pill)',
                  background: 'rgba(16, 185, 129, 0.15)',
                  border: '1px solid rgba(16, 185, 129, 0.35)',
                  color: '#34d399',
                }}
              >
                {isTelugu ? 'అప్‌లోడ్ గైడ్' : 'Upload Guide'}
              </span>
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>
              {isTelugu
                ? 'మీరు PDF అప్‌లోడ్ చేసే ముందు మద్దతు ఉన్న ఫైళ్లు, పరీక్షలు మరియు ప్రాసెస్ తెలుసుకోండి'
                : 'Supported file formats, recognizable laboratory tests, and what to expect'}
            </p>
          </div>
        </div>

        <button
          type="button"
          aria-label={isExpanded ? 'Collapse section' : 'Expand section'}
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-pill)',
            padding: '6px 12px',
            color: 'var(--text-primary)',
            fontSize: '0.8rem',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            cursor: 'pointer',
          }}
        >
          <span>{isExpanded ? (isTelugu ? 'దాచు' : 'Hide details') : (isTelugu ? 'వివరాలు చూడండి' : 'View details')}</span>
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      {/* Expandable Content Body */}
      {isExpanded && (
        <div style={{ padding: '24px' }}>
          {/* Filter Pills for Mobile / Quick Navigation */}
          <div
            style={{
              display: 'flex',
              gap: '8px',
              marginBottom: '20px',
              flexWrap: 'wrap',
              borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
              paddingBottom: '14px',
            }}
          >
            {[
              { id: 'all', label: isTelugu ? 'అన్నీ' : 'All Information' },
              { id: 'supported', label: isTelugu ? '1. మద్దతు ఉన్నవి' : '1. Supported Files & Tests' },
              { id: 'unsupported', label: isTelugu ? '2. ఇంకా మద్దతు లేనివి' : '2. Not Supported Yet' },
              { id: 'workflow', label: isTelugu ? '3. అప్‌లోడ్ తర్వాత జరిగేది' : '3. What Happens After Upload' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-pill)',
                  border: activeTab === tab.id ? '1px solid var(--color-purple-primary)' : '1px solid var(--border-subtle)',
                  background: activeTab === tab.id ? 'rgba(168, 85, 247, 0.2)' : 'rgba(255, 255, 255, 0.03)',
                  color: activeTab === tab.id ? '#ffffff' : 'var(--text-secondary)',
                  fontSize: '0.82rem',
                  fontWeight: activeTab === tab.id ? 600 : 400,
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* 3-Column Card Layout (or active single view) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: activeTab === 'all' ? 'repeat(auto-fit, minmax(310px, 1fr))' : '1fr',
              gap: '20px',
            }}
          >
            {/* CARD 1: SUPPORTED FILES & TESTS */}
            {(activeTab === 'all' || activeTab === 'supported') && (
              <div
                style={{
                  background: 'rgba(16, 185, 129, 0.04)',
                  border: '1px solid rgba(16, 185, 129, 0.25)',
                  borderRadius: 'var(--radius-md)',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      background: 'rgba(16, 185, 129, 0.15)',
                      border: '1px solid rgba(16, 185, 129, 0.35)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <CheckCircle2 size={18} color="#34d399" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#34d399', margin: 0 }}>
                      {isTelugu ? '1. మద్దతు ఉన్న ఫైళ్లు & పరీక్షలు' : '1. Supported Files & Tests'}
                    </h4>
                    <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                      {isTelugu ? 'ఫార్మాట్ అవసరం: డిజిటల్ టెక్స్ట్ నివేదికలు మాత్రమే' : 'Format requirement: Digital text-based reports only'}
                    </span>
                  </div>
                </div>

                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    fontSize: '0.86rem',
                    color: 'var(--text-primary)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                  }}
                >
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <FileCheck2 size={16} color="#34d399" style={{ flexShrink: 0, marginTop: '3px' }} />
                    <span>
                      <strong>{isTelugu ? 'డిజిటల్ క్లినికల్ PDF నివేదికలు:' : 'Digital Clinical PDF Reports:'}</strong>{' '}
                      {isTelugu
                        ? 'డయాగ్నస్టిక్ ల్యాబ్‌లు నేరుగా రూపొందించిన సెలెక్టబుల్-టెక్స్ట్ PDFలు.'
                        : 'Selectable-text PDFs generated directly by diagnostic laboratories.'}
                    </span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        padding: '1px 6px',
                        borderRadius: '4px',
                        background: 'rgba(16, 185, 129, 0.2)',
                        color: '#34d399',
                        marginTop: '2px',
                      }}
                    >
                      MAX
                    </span>
                    <span>
                      <strong>{isTelugu ? 'గరిష్ట ఫైల్ పరిమాణం:' : 'Maximum file size:'}</strong>{' '}
                      {isTelugu ? 'ఒక్కో PDFకి 10 MB వరకు.' : 'Up to 10 MB per PDF.'}
                    </span>
                  </li>
                </ul>

                {/* Recognized Clinical Panels Breakdown */}
                <div style={{ marginTop: '6px' }}>
                  <div
                    style={{
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: 'var(--text-secondary)',
                      marginBottom: '8px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}
                  >
                    {isTelugu ? 'గుర్తించబడే క్లినికల్ పరీక్షలు (ప్రస్తుతం 12 మద్దతు ఉంది):' : 'Recognized Clinical Tests (12 currently supported):'}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {panels.map((panel, idx) => (
                      <div
                        key={idx}
                        style={{
                          background: 'rgba(255, 255, 255, 0.03)',
                          borderRadius: '8px',
                          padding: '8px 10px',
                          border: '1px solid rgba(255, 255, 255, 0.05)',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            fontSize: '0.82rem',
                            fontWeight: 600,
                            color: 'var(--text-highlight)',
                            marginBottom: '4px',
                          }}
                        >
                          {panel.icon}
                          <span>{panel.category}</span>
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                          {panel.tests.map((t, tIdx) => (
                            <span
                              key={tIdx}
                              style={{
                                fontSize: '0.74rem',
                                padding: '2px 7px',
                                borderRadius: '4px',
                                background: 'rgba(168, 85, 247, 0.12)',
                                border: '1px solid rgba(168, 85, 247, 0.25)',
                                color: '#e9d5ff',
                              }}
                            >
                              {isTelugu ? t.teName : t.name} <span style={{ opacity: 0.6 }}>({t.unit})</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* CARD 2: NOT SUPPORTED YET */}
            {(activeTab === 'all' || activeTab === 'unsupported') && (
              <div
                style={{
                  background: 'rgba(245, 158, 11, 0.04)',
                  border: '1px solid rgba(245, 158, 11, 0.25)',
                  borderRadius: 'var(--radius-md)',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      background: 'rgba(245, 158, 11, 0.15)',
                      border: '1px solid rgba(245, 158, 11, 0.35)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <XCircle size={18} color="#fbbf24" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#fbbf24', margin: 0 }}>
                      {isTelugu ? '2. ఇంకా మద్దతు లేనివి' : '2. Not Supported Yet'}
                    </h4>
                    <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                      {isTelugu ? 'తప్పు రీడింగ్‌లను నివారించడానికి' : 'To ensure 100% accuracy and prevent hallucinations'}
                    </span>
                  </div>
                </div>

                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    fontSize: '0.86rem',
                    color: 'var(--text-primary)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                  }}
                >
                  <li
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '8px',
                      background: 'rgba(245, 158, 11, 0.08)',
                      padding: '8px 10px',
                      borderRadius: '8px',
                      border: '1px solid rgba(245, 158, 11, 0.15)',
                    }}
                  >
                    <AlertTriangle size={16} color="#fbbf24" style={{ flexShrink: 0, marginTop: '3px' }} />
                    <span>
                      <strong>{isTelugu ? 'స్కాన్ చేసిన చిత్రాలు / ఫోటోలు:' : 'Scanned or Photo PDFs:'}</strong>{' '}
                      {isTelugu
                        ? 'చిత్రాలు లేదా ఫోన్ ఫోటోల నుండి టెక్స్ట్ రీడ్ చేసే OCR ఈ వెర్షన్‌లో ఇంకా అందుబాటులో లేదు.'
                        : 'Scanned image-only PDFs and camera photos (OCR is not supported yet).'}
                    </span>
                  </li>

                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <span style={{ color: '#fbbf24', fontWeight: 700 }}>✕</span>
                    <span>
                      <strong>{isTelugu ? 'క్లినికల్ కాని పత్రాలు:' : 'Non-Clinical Documents:'}</strong>{' '}
                      {isTelugu
                        ? 'ఇన్‌వాయిస్‌లు, రశీదులు, టిక్కెట్లు, రెజ్యూమ్‌లు వంటి వైద్య సంబంధం లేని ఫైళ్లు మద్దతు పొందవు.'
                        : 'Invoices, payment receipts, tickets, resumes, or non-medical PDF files.'}
                    </span>
                  </li>

                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <span style={{ color: '#fbbf24', fontWeight: 700 }}>✕</span>
                    <span>
                      <strong>{isTelugu ? 'గుర్తించబడని పరీక్షలు & అసాధారణ లేఅవుట్‌లు:' : 'Unrecognized Tests / Layouts:'}</strong>{' '}
                      {isTelugu
                        ? 'పై 12 పారామితులలో లేని లేదా అనుకూలించని ల్యాబ్ లేఅవుట్‌లను పార్సర్ విస్మరిస్తుంది.'
                        : 'Tests not in the recognized dictionary or highly non-standard report tables.'}
                    </span>
                  </li>

                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <span style={{ color: '#fbbf24', fontWeight: 700 }}>ℹ</span>
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                      {isTelugu
                        ? 'గమనిక: ప్రతి డయాగ్నస్టిక్ ల్యాబ్ యొక్క నిర్దిష్ట ఫార్మాట్ పనిచేస్తుందని హామీ ఇవ్వబడదు.'
                        : 'Note: We do not imply that every single lab’s proprietary PDF layout is guaranteed to match.'}
                    </span>
                  </li>
                </ul>
              </div>
            )}

            {/* CARD 3: WHAT HAPPENS AFTER UPLOAD */}
            {(activeTab === 'all' || activeTab === 'workflow') && (
              <div
                style={{
                  background: 'rgba(168, 85, 247, 0.04)',
                  border: '1px solid rgba(168, 85, 247, 0.25)',
                  borderRadius: 'var(--radius-md)',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      background: 'rgba(168, 85, 247, 0.15)',
                      border: '1px solid rgba(168, 85, 247, 0.35)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Sparkles size={18} color="#EC4899" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--text-highlight)', margin: 0 }}>
                      {isTelugu ? '3. అప్‌లోడ్ తర్వాత ఏమి జరుగుతుంది?' : '3. What Happens After Upload'}
                    </h4>
                    <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                      {isTelugu ? 'ధృవీకరణ మరియు విద్యా విశ్లేషణ' : 'Deterministic parsing & educational clarity'}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {/* Step 1 */}
                  <div
                    style={{
                      display: 'flex',
                      gap: '10px',
                      alignItems: 'flex-start',
                      background: 'rgba(255, 255, 255, 0.025)',
                      padding: '8px 10px',
                      borderRadius: '8px',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        background: 'var(--gradient-brand)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        flexShrink: 0,
                      }}
                    >
                      1
                    </div>
                    <div style={{ fontSize: '0.84rem' }}>
                      <strong style={{ color: '#fff' }}>{isTelugu ? 'పరీక్ష విలువలు & పరిధుల వెలికితీత:' : 'Deterministic Extraction:'}</strong>{' '}
                      <span style={{ color: 'var(--text-secondary)' }}>
                        {isTelugu
                          ? 'గుర్తించబడిన పరీక్ష పేర్లు, కొలిచిన విలువలు, యూనిట్లు మరియు రిపోర్ట్‌లోని సూచిక పరిధులను వేరుచేస్తుంది.'
                          : 'Extracts recognized test names, measured values, units, and report-provided reference ranges.'}
                      </span>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div
                    style={{
                      display: 'flex',
                      gap: '10px',
                      alignItems: 'flex-start',
                      background: 'rgba(255, 255, 255, 0.025)',
                      padding: '8px 10px',
                      borderRadius: '8px',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        background: 'var(--gradient-brand)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        flexShrink: 0,
                      }}
                    >
                      2
                    </div>
                    <div style={{ fontSize: '0.84rem' }}>
                      <strong style={{ color: '#fff' }}>{isTelugu ? 'యూజర్ రివ్యూ & సరిదిద్దడం:' : 'Interactive Review Screen:'}</strong>{' '}
                      <span style={{ color: 'var(--text-secondary)' }}>
                        {isTelugu
                          ? 'సేవ్ చేసే ముందు ఏదైనా తప్పు ఉంటే మీరు సరిచూసుకునేలా పూర్తి ప్రివ్యూ స్క్రీన్ చూపిస్తుంది.'
                          : 'Shows extracted information for your review, verification, and manual correction before saving.'}
                      </span>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div
                    style={{
                      display: 'flex',
                      gap: '10px',
                      alignItems: 'flex-start',
                      background: 'rgba(255, 255, 255, 0.025)',
                      padding: '8px 10px',
                      borderRadius: '8px',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        background: 'var(--gradient-brand)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        flexShrink: 0,
                      }}
                    >
                      3
                    </div>
                    <div style={{ fontSize: '0.84rem' }}>
                      <strong style={{ color: '#fff' }}>{isTelugu ? 'రిపోర్ట్ పరిధులతో మాత్రమే పోలిక:' : 'Report-Only Range Matching:'}</strong>{' '}
                      <span style={{ color: 'var(--text-secondary)' }}>
                        {isTelugu
                          ? 'విలువలను ఆ రిపోర్ట్‌లో ల్యాబ్ అందించిన సూచిక పరిధులతో మాత్రమే పోలుస్తుంది.'
                          : 'Compares values strictly against reference ranges provided in that specific laboratory report.'}
                      </span>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div
                    style={{
                      display: 'flex',
                      gap: '10px',
                      alignItems: 'flex-start',
                      background: 'rgba(255, 255, 255, 0.025)',
                      padding: '8px 10px',
                      borderRadius: '8px',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        background: 'var(--gradient-brand)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        flexShrink: 0,
                      }}
                    >
                      4
                    </div>
                    <div style={{ fontSize: '0.84rem' }}>
                      <strong style={{ color: '#fff' }}>{isTelugu ? 'ఇంగ్లీష్ & తెలుగు విద్యా వివరణలు:' : 'Bilingual Educational Insights:'}</strong>{' '}
                      <span style={{ color: 'var(--text-secondary)' }}>
                        {isTelugu
                          ? 'పరీక్ష దేనికి సంబంధించింది, వైద్యుడితో ఏమి చర్చించవచ్చో సాధారణ తెలుగు & ఇంగ్లీష్‌లో వివరిస్తుంది.'
                          : 'Provides plain-language educational explanations in English and Telugu.'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Educational Safety Banner */}
                <div
                  style={{
                    marginTop: 'auto',
                    padding: '8px 10px',
                    borderRadius: '6px',
                    background: 'rgba(236, 72, 153, 0.08)',
                    border: '1px solid rgba(236, 72, 153, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '0.78rem',
                    color: '#f472b6',
                  }}
                >
                  <ShieldCheck size={16} color="#EC4899" style={{ flexShrink: 0 }} />
                  <span>
                    {isTelugu
                      ? 'ఇది కేవలం విద్యా సమాచారం కొరకు మాత్రమే. ఇది రోగ నిర్ధారణ లేదా చికిత్సను అందించదు.'
                      : 'Educational tool only — does not provide medical diagnosis, prescriptions, or clinical treatments.'}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
