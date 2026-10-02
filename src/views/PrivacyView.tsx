import React from 'react';
import {
  Shield,
  Lock,
  Database,
  CloudOff,
  Mail,
  FileCheck,
  AlertCircle,
} from 'lucide-react';
import type { Language } from '../types';
import { EducationalDisclaimer } from '../components/EducationalDisclaimer';

interface PrivacyViewProps {
  language: Language;
}

export const PrivacyView: React.FC<PrivacyViewProps> = ({ language }) => {
  const isTelugu = language === 'te';

  return (
    <div className="container" style={{ paddingTop: '32px', paddingBottom: '60px' }}>
      {/* Header */}
      <div style={{ maxWidth: '800px', margin: '0 auto 40px', textAlign: 'center' }}>
        <div
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '16px',
            background: 'var(--gradient-brand-subtle)',
            border: '1px solid var(--border-highlight)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px',
          }}
        >
          <Shield size={28} color="#A855F7" />
        </div>

        <h1 style={{ fontSize: '2.2rem', color: '#ffffff', marginBottom: '8px' }}>
          {isTelugu ? 'గోప్యతా సమాచారం & డేటా విధానం' : 'Privacy Information & Data Handling'}
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6 }}>
          {isTelugu
            ? 'LabSense AI మీ సమాచారాన్ని ఎలా నిర్వహిస్తుందో పారదర్శకంగా మరియు స్పష్టంగా వివరిస్తున్నాము.'
            : 'Transparent disclosure regarding how laboratory report data is processed within this educational prototype.'}
        </p>
      </div>

      <div style={{ maxWidth: '840px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Transparent Prototype Notice */}
        <div
          className="glass-card"
          style={{
            padding: '20px 24px',
            borderLeft: '4px solid #EC4899',
            background: 'rgba(236, 72, 153, 0.06)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <AlertCircle size={18} color="#EC4899" />
            <h3 style={{ fontSize: '1rem', color: '#ffffff', margin: 0 }}>
              {isTelugu ? 'ప్రోటోటైప్ స్థాయి పారదర్శకత' : 'Prototype Transparency Notice'}
            </h3>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.55 }}>
            {isTelugu
              ? 'ఈ వెబ్ అప్లికేషన్ ప్రస్తుతానికి హ్యాకథాన్ ప్రాజెక్ట్ గా రూపొందించబడింది. ఇందులో వాస్తవమైన క్లౌడ్ డేటాబేస్ లేదా ఎన్‌క్రిప్షన్ సర్వర్లు ఇంకా అనుసంధానించబడలేదు. అందువల్ల సున్నితమైన వ్యక్తిగత పత్రాలను అప్‌లోడ్ చేయవద్దని మనవి.'
              : 'This interface is an educational frontend prototype. It currently operates with simulated in-browser datasets and does not connect to a remote backend server, clinical database, or external AI API. Production security and zero-knowledge encryption protocols will be established in future architectural releases.'}
          </p>
        </div>

        {/* Section 1: Information Handled */}
        <div className="glass-card" style={{ padding: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                backgroundColor: 'rgba(168, 85, 247, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FileCheck size={20} color="#A855F7" />
            </div>
            <h2 style={{ fontSize: '1.25rem', color: '#ffffff', margin: 0 }}>
              {isTelugu ? '1. అప్లికేషన్ నిర్వహించే సమాచారం' : '1. Information Handled by the App'}
            </h2>
          </div>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '12px' }}>
            {isTelugu
              ? 'ప్రస్తుత ఇంటర్‌ఫేస్ కేవలం ల్యాబ్ నివేదికలలోని క్లినికల్ పారామితులు (పరీక్ష పేరు, కొలిచిన విలువ, కొలత యూనిట్లు, ల్యాబ్ రిఫరెన్స్ పరిధి) ఆధారంగా విద్యా వివరణలను ప్రదర్శించడానికి రూపొందించబడింది.'
              : 'The application is structured to process laboratory parameter names, measured numbers, measurement units, and reference range bounds to provide educational explanations.'}
          </p>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
            {isTelugu
              ? 'డెమో స్క్రీన్‌లలో చూపించే రోగి వివరాలు (DEMO-PT-8842 వంటివి) పూర్తిగా కల్పితమైనవి.'
              : 'All patient identifiers and specimen values presented in demo screens are synthetic and purely illustrative.'}
          </p>
        </div>

        {/* Section 2: Uploaded Report Handling */}
        <div className="glass-card" style={{ padding: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                backgroundColor: 'rgba(236, 72, 153, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <CloudOff size={20} color="#EC4899" />
            </div>
            <h2 style={{ fontSize: '1.25rem', color: '#ffffff', margin: 0 }}>
              {isTelugu ? '2. అప్‌లోడ్ చేసిన రిపోర్టుల ప్రాసెసింగ్' : '2. Uploaded Report Handling'}
            </h2>
          </div>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
            {isTelugu
              ? 'ప్రస్తుత దశలో, మీరు అప్‌లోడ్ చేసే PDF ఫైల్‌లు కేవలం మీ బ్రౌజర్ యొక్క మెమరీలోనే లోకల్‌గా సిమ్యులేట్ చేయబడతాయి. ఎటువంటి ఫైల్ ఏ రిమోట్ సర్వర్‌కు లేదా బయటి క్లౌడ్‌కు పంపబడదు.'
              : 'In this frontend implementation, uploaded PDF files are processed transiently in local browser memory. Files are not uploaded to remote servers or stored permanently on any cloud infrastructure.'}
          </p>
        </div>

        {/* Section 3: Data Storage & Retention */}
        <div className="glass-card" style={{ padding: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                backgroundColor: 'rgba(168, 85, 247, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Database size={20} color="#34D399" />
            </div>
            <h2 style={{ fontSize: '1.25rem', color: '#ffffff', margin: 0 }}>
              {isTelugu ? '3. డేటా నిల్వ (Data Storage)' : '3. Data Storage Policy'}
            </h2>
          </div>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
            {isTelugu
              ? 'ఈ వెబ్ యాప్ ఎలాంటి రిజిస్ట్రేషన్ లేదా పాస్‌వర్డ్ సమాచారాన్ని సేకరించదు. బ్రౌజర్ పేజీని రీఫ్రెష్ చేసినప్పుడు తాత్కాలిక డెమో సెషన్ సాధారణ స్థితికి చేరుకుంటుంది.'
              : 'No permanent user accounts or persistent database records are maintained in this prototype version. Refreshing the browser resets the session state.'}
          </p>
        </div>

        {/* Section 4: Third-party Services */}
        <div className="glass-card" style={{ padding: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                backgroundColor: 'rgba(168, 85, 247, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Lock size={20} color="#A855F7" />
            </div>
            <h2 style={{ fontSize: '1.25rem', color: '#ffffff', margin: 0 }}>
              {isTelugu ? '4. మూడవ పక్ష సేవలు (Third-Party Services)' : '4. Third-Party Services'}
            </h2>
          </div>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
            {isTelugu
              ? 'ఈ ప్రోటోటైప్ ఎలాంటి వాణిజ్య ప్రకటనల నెట్‌వర్క్‌లు, ట్రాకింగ్ కుకీలు లేదా థర్డ్-పార్టీ మార్కెటింగ్ ఏజెన్సీలతో డేటాను పంచుకోదు.'
              : 'This interface contains no advertising trackers, commercial cookies, or data-sharing integrations with commercial marketing networks.'}
          </p>
        </div>

        {/* Section 5: Contact Information Placeholder */}
        <div className="glass-card" style={{ padding: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                backgroundColor: 'rgba(236, 72, 153, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Mail size={20} color="#EC4899" />
            </div>
            <h2 style={{ fontSize: '1.25rem', color: '#ffffff', margin: 0 }}>
              {isTelugu ? '5. సంప్రదింపుల వివరాలు (Project Contact Placeholder)' : '5. Contact & Project Inquiries'}
            </h2>
          </div>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '14px' }}>
            {isTelugu
              ? 'LabSense AI ప్రాజెక్ట్ పరిశోధన మరియు విద్యా సంబంధిత ప్రశ్నల కోసం మమ్మల్ని సంప్రదించవచ్చు:'
              : 'For educational inquiries, hackathon feedback, or architecture discussions, reach out to the project maintainers:'}
          </p>
          <div
            style={{
              padding: '12px 18px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid var(--border-subtle)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: 'var(--text-highlight)',
              fontSize: '0.9rem',
            }}
          >
            <Mail size={16} color="#A855F7" />
            <span>project-labsense-contact@placeholder.domain (Educational Prototype)</span>
          </div>
        </div>

        {/* Mandatory Educational Disclaimer */}
        <EducationalDisclaimer currentLang={language} />
      </div>
    </div>
  );
};
