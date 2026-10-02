import type { LabReport } from '../types';

export const DEMO_REPORTS: LabReport[] = [
  {
    id: 'rep-001',
    title: 'Comprehensive Metabolic & Lipid Panel',
    labName: 'Apex Diagnostics & Clinical Lab (Demo Lab)',
    date: '14 Jan 2025',
    patientDemo: {
      referenceId: 'DEMO-PT-8842',
      ageGroup: '35-45 Years',
      gender: 'Adult'
    },
    totalTests: 8,
    withinRangeCount: 5,
    outsideRangeCount: 3,
    notes: 'Demo sample data for educational visualization. Reference ranges follow standard clinical chemistry benchmarks.',
    tests: [
      {
        id: 'test-1',
        name: 'Fasting Blood Glucose',
        teluguName: 'ఉపవాస రక్త చక్కెర (గ్లూకోజ్)',
        category: 'Metabolic',
        measuredValue: 118,
        unit: 'mg/dL',
        referenceRangeMin: 70,
        referenceRangeMax: 99,
        referenceRangeDisplay: '70 - 99 mg/dL',
        status: 'outside_range_high',
        statusLabelEn: 'Outside stated range (Higher)',
        statusLabelTe: 'సూచించిన పరిధి కంటే ఎక్కువ',
        previousValue: 126,
        previousDate: '10 Aug 2024',
        explanation: {
          en: {
            whatItMeasures: 'Fasting blood glucose measures the concentration of sugar (glucose) in your bloodstream after fasting for at least 8 hours. Glucose is the primary energy source for your body cells.',
            whyRangeMatters: 'Maintaining glucose within the reference range reflects how effectively insulin is managing fuel delivery to cells. Values above the standard fasting range may prompt lifestyle or dietary discussions with your physician.',
            generalQuestions: [
              'Were fasting guidelines (8–12 hours without calories) strictly followed before the draw?',
              'Would an HbA1c test provide a clearer 3-month overview?',
              'What dietary or physical activity patterns should I consider discussing?'
            ]
          },
          te: {
            whatItMeasures: 'ఉపవాస రక్త చక్కెర (గ్లూకోజ్) అనేది కనీసం 8 గంటల పాటు ఏమీ తినకుండా ఉన్న తర్వాత రక్తంలో ఉండే చక్కెర స్థాయిని కొలుస్తుంది. గ్లూకోజ్ శరీర కణాలకు ప్రధాన శక్తి వనరు.',
            whyRangeMatters: 'రక్తంలో గ్లూకోజ్ స్థాయిలను సాధారణ పరిధిలో ఉంచడం వల్ల ఇన్సులిన్ వ్యవస్థ సరిగ్గా పనిచేస్తుందో లేదో తెలుస్తుంది. పరిధి కంటే ఎక్కువ ఉన్నప్పుడు ఆహారపు అలవాట్లు మరియు జీవనశైలి మార్పులపై వైద్యునితో మాట్లాడటం మంచిది.',
            generalQuestions: [
              'రక్త పరీక్షకు ముందు 8-12 గంటల ఉపవాసం సరిగ్గా పాటించారా?',
              'గత 3 నెలల సగటు తెలుసుకోవడానికి HbA1c పరీక్ష అవసరమా?',
              'ఆహార నియమాలు లేదా వ్యాయామంలో ఎలాంటి మార్పులు చేసుకోవాలి?'
            ]
          }
        }
      },
      {
        id: 'test-2',
        name: 'Total Cholesterol',
        teluguName: 'మొత్తం కొలెస్ట్రాల్',
        category: 'Lipid',
        measuredValue: 218,
        unit: 'mg/dL',
        referenceRangeMin: 125,
        referenceRangeMax: 200,
        referenceRangeDisplay: '< 200 mg/dL',
        status: 'outside_range_high',
        statusLabelEn: 'Outside stated range (Higher)',
        statusLabelTe: 'సూచించిన పరిధి కంటే ఎక్కువ',
        previousValue: 235,
        previousDate: '10 Aug 2024',
        explanation: {
          en: {
            whatItMeasures: 'Total cholesterol estimates the combined amount of all types of cholesterol circulating in your bloodstream, including HDL, LDL, and VLDL particles.',
            whyRangeMatters: 'Cholesterol is vital for cell membranes and hormone production, but elevated levels over time can interact with vascular walls. Doctors evaluate this alongside HDL, LDL, and overall cardiovascular history.',
            generalQuestions: [
              'What are my specific LDL ("bad") and HDL ("good") cholesterol levels?',
              'How can heart-healthy nutrition and regular exercise support balance?',
              'Are there family history factors relevant to my lipid panel?'
            ]
          },
          te: {
            whatItMeasures: 'మొత్తం కొలెస్ట్రాల్ అనేది మీ రక్తప్రవాహంలో ఉన్న అన్ని రకాల కొవ్వుల (HDL, LDL, VLDL) సమ్మేళనాన్ని కొలుస్తుంది.',
            whyRangeMatters: 'శరీర కణాల నిర్మాణానికి మరియు హార్మోన్ల తయారీకి కొలెస్ట్రాల్ చాలా అవసరం. అయితే ఇది ఉండవలసిన స్థాయి కంటే ఎక్కువైతే రక్తనాళాల ఆరోగ్యంపై ప్రభావం చూపే అవకాశం ఉంటుంది.',
            generalQuestions: [
              'నా రక్తంలో LDL మరియు HDL స్థాయిలు విడివిడిగా ఎలా ఉన్నాయి?',
              'ఆహారంలో నూనెలు తగ్గించడం మరియు వ్యాయామం ఎలా సహాయపడతాయి?',
              'కుటుంబంలో ఎవరికైనా కొలెస్ట్రాల్ సమస్యలు ఉన్నాయా?'
            ]
          }
        }
      },
      {
        id: 'test-3',
        name: 'HDL Cholesterol (Good)',
        teluguName: 'హెచ్.డి.ఎల్ కొలెస్ట్రాల్ (మంచి కొవ్వు)',
        category: 'Lipid',
        measuredValue: 48,
        unit: 'mg/dL',
        referenceRangeMin: 40,
        referenceRangeMax: 60,
        referenceRangeDisplay: '> 40 mg/dL',
        status: 'within_range',
        statusLabelEn: 'Within range',
        statusLabelTe: 'సాధారణ పరిధిలో ఉంది',
        previousValue: 44,
        previousDate: '10 Aug 2024',
        explanation: {
          en: {
            whatItMeasures: 'High-Density Lipoprotein (HDL) is often termed "good cholesterol" because it carries cholesterol from surrounding tissues back to the liver for recycling or excretion.',
            whyRangeMatters: 'Higher HDL values are generally considered supportive of cardiovascular protection, aiding arterial clearance.',
            generalQuestions: [
              'What physical activities help maintain or elevate HDL levels?',
              'How does dietary healthy fat (like nuts or seeds) influence HDL?'
            ]
          },
          te: {
            whatItMeasures: 'హై-డెన్సిటీ లిపోప్రొటీన్ (HDL) ను సాధారణంగా "మంచి కొలెస్ట్రాల్" అంటారు. ఇది శరీర కణజాలాల నుండి అదనపు కొవ్వును కాలేయానికి చేరవేసి శుభ్రపరచడంలో తోడ్పడుతుంది.',
            whyRangeMatters: 'HDL కొలెస్ట్రాల్ స్థాయి ఆరోగ్యకరమైన పరిధిలో ఉండటం గుండె మరియు రక్తనాళాల రక్షణకు ఎంతో మేలు చేస్తుంది.',
            generalQuestions: [
              'రోజూ వాకింగ్ లేదా వ్యాయామం చేయడం వల్ల HDL పెరుగుతుందా?',
              'ఆరోగ్యకరమైన కొవ్వులు కలిగిన ఆహారం ఎలా తీసుకోవాలి?'
            ]
          }
        }
      },
      {
        id: 'test-4',
        name: 'Serum Creatinine',
        teluguName: 'సీరం క్రియాటినిన్ (కిడ్నీ పరీక్ష)',
        category: 'Renal',
        measuredValue: 0.92,
        unit: 'mg/dL',
        referenceRangeMin: 0.70,
        referenceRangeMax: 1.30,
        referenceRangeDisplay: '0.70 - 1.30 mg/dL',
        status: 'within_range',
        statusLabelEn: 'Within range',
        statusLabelTe: 'సాధారణ పరిధిలో ఉంది',
        previousValue: 0.95,
        previousDate: '10 Aug 2024',
        explanation: {
          en: {
            whatItMeasures: 'Creatinine is a natural waste byproduct generated by routine muscle metabolism. Healthy kidneys filter it out of blood and eliminate it through urine.',
            whyRangeMatters: 'Because it is produced at a steady rate, creatinine in the bloodstream serves as a reliable marker of renal filtration efficiency.',
            generalQuestions: [
              'Is my estimated Glomerular Filtration Rate (eGFR) also calculated?',
              'Does hydration status affect creatinine test day readings?'
            ]
          },
          te: {
            whatItMeasures: 'క్రియాటినిన్ అనేది కండరాల పనితీరు వల్ల సహజంగా ఏర్పడే ఒక వ్యర్థ పదార్థం. ఆరోగ్యకరమైన మూత్రపిండాలు (కిడ్నీలు) దీనిని రక్తం నుండి వేరుచేసి మూత్రం ద్వారా బయటకు పంపుతాయి.',
            whyRangeMatters: 'రక్తంలో క్రియాటినిన్ సాధారణ పరిధిలో ఉండటం మీ కిడ్నీలు రక్తాన్ని సమర్థవంతంగా శుద్ధి చేస్తున్నాయని సూచిస్తుంది.',
            generalQuestions: [
              'నా కిడ్నీ పనితీరు (eGFR) ఎలా ఉంది?',
              'తగినంత నీరు తాగడం వల్ల ఈ పరీక్ష ఫలితాలపై ప్రభావం ఉంటుందా?'
            ]
          }
        }
      },
      {
        id: 'test-5',
        name: 'Blood Urea Nitrogen (BUN)',
        teluguName: 'బ్లడ్ యూరియా నైట్రోజన్',
        category: 'Renal',
        measuredValue: 14.5,
        unit: 'mg/dL',
        referenceRangeMin: 7.0,
        referenceRangeMax: 20.0,
        referenceRangeDisplay: '7.0 - 20.0 mg/dL',
        status: 'within_range',
        statusLabelEn: 'Within range',
        statusLabelTe: 'సాధారణ పరిధిలో ఉంది',
        previousValue: 16.0,
        previousDate: '10 Aug 2024',
        explanation: {
          en: {
            whatItMeasures: 'BUN quantifies the amount of nitrogen in your blood derived from urea, a breakdown product of dietary and systemic protein.',
            whyRangeMatters: 'Assessing BUN alongside creatinine gives healthcare providers clear insight into both kidney filtration and overall hydration levels.',
            generalQuestions: [
              'How does my BUN-to-creatinine ratio look?',
              'Could daily protein intake influence this reading?'
            ]
          },
          te: {
            whatItMeasures: 'ప్రోటీన్ జీర్ణక్రియ ద్వారా శరీరంలో ఉత్పత్తి అయ్యే యూరియాలోని నైట్రోజన్ పరిమాణాన్ని ఈ పరీక్ష కొలుస్తుంది.',
            whyRangeMatters: 'BUN మరియు క్రియాటినిన్ రెండూ కలసి కిడ్నీ పనితీరుతో పాటు శరీరంలో నీటి నిల్వల స్థితిని తెలియజేస్తాయి.',
            generalQuestions: [
              'నా ఆహారంలో ప్రోటీన్ మోతాదు ఈ ఫలితంపై ప్రభావం చూపుతుందా?',
              'శరీరంలో తగినంత ద్రవాలు ఉన్నాయా?'
            ]
          }
        }
      },
      {
        id: 'test-6',
        name: 'Serum Alanine Aminotransferase (ALT)',
        teluguName: 'ALT ఎంజైమ్ (కాలేయ పరీక్ష)',
        category: 'Liver',
        measuredValue: 24,
        unit: 'U/L',
        referenceRangeMin: 7,
        referenceRangeMax: 56,
        referenceRangeDisplay: '7 - 56 U/L',
        status: 'within_range',
        statusLabelEn: 'Within range',
        statusLabelTe: 'సాధారణ పరిధిలో ఉంది',
        previousValue: 28,
        previousDate: '10 Aug 2024',
        explanation: {
          en: {
            whatItMeasures: 'ALT is an enzyme predominantly found in liver cells that assists in converting proteins into cellular energy.',
            whyRangeMatters: 'When liver cells undergo stress or injury, ALT can leak into circulation. Normal levels usually suggest liver cell integrity.',
            generalQuestions: [
              'Are other liver panel enzymes (like AST, ALP) concordant?',
              'Do any medications or supplements place demands on liver metabolism?'
            ]
          },
          te: {
            whatItMeasures: 'ALT అనేది ప్రధానంగా కాలేయ (లివర్) కణాలలో ఉండే ముఖ్యమైన ఎంజైమ్. ఇది ఆహార ప్రోటీన్లను శక్తిగా మార్చడానికి సహాయపడుతుంది.',
            whyRangeMatters: 'కాలేయం ఆరోగ్యంగా ఉన్నప్పుడు ఈ ఎంజైమ్ రక్తంలో తక్కువ మోతాదులోనే ఉంటుంది. ఇది సాధారణ పరిధిలో ఉండటం శుభపరిణామం.',
            generalQuestions: [
              'ఇతర కాలేయ ఎంజైములు (AST, ALP) కూడా సాధారణంగా ఉన్నాయా?',
              'నేను వాడుతున్న మందులు కాలేయంపై భారం మోపుతున్నాయా?'
            ]
          }
        }
      },
      {
        id: 'test-7',
        name: 'Serum 25-Hydroxy Vitamin D',
        teluguName: 'విటమిన్ డి3 (రక్త పరీక్ష)',
        category: 'Vitamins',
        measuredValue: 18.4,
        unit: 'ng/mL',
        referenceRangeMin: 30.0,
        referenceRangeMax: 100.0,
        referenceRangeDisplay: '30.0 - 100.0 ng/mL',
        status: 'outside_range_low',
        statusLabelEn: 'Outside stated range (Lower)',
        statusLabelTe: 'సూచించిన పరిధి కంటే తక్కువ',
        previousValue: 16.0,
        previousDate: '10 Aug 2024',
        explanation: {
          en: {
            whatItMeasures: 'This test measures 25-hydroxyvitamin D, the circulating storage form of vitamin D converted by sunlight exposure, dietary sources, and supplementation.',
            whyRangeMatters: 'Vitamin D facilitates calcium absorption, supporting skeletal strength, bone density, muscle function, and immune balance.',
            generalQuestions: [
              'Is dietary supplementation or structured sunlight exposure appropriate for me?',
              'Should calcium or bone density parameters be reviewed as well?'
            ]
          },
          te: {
            whatItMeasures: 'ఈ పరీక్ష రక్తంలో ఉన్న విటమిన్ డి3 నిల్వలను లెక్కిస్తుంది. సూర్యరశ్మి మరియు పోషక ఆహారం ద్వారా శరీరానికి విటమిన్ డి అందుతుంది.',
            whyRangeMatters: 'ఎముకల బలానికి అవసరమైన కాల్షియంను శరీరం గ్రహించడానికి, రోగనిరోధక శక్తిని పెంపొందించడానికి విటమిన్ డి చాలా అవసరం.',
            generalQuestions: [
              'నాకు విటమిన్ డి సప్లిమెంట్లు లేదా ఎండలో సమయం గడపడం అవసరమా?',
              'ఎముకల పటుత్వం కోసం కాల్షియం పరీక్ష కూడా చేయించాలా?'
            ]
          }
        }
      },
      {
        id: 'test-8',
        name: 'Hemoglobin A1c (HbA1c)',
        teluguName: 'HbA1c (3 నెలల సగటు చక్కెర)',
        category: 'Metabolic',
        measuredValue: 5.6,
        unit: '%',
        referenceRangeMin: 4.0,
        referenceRangeMax: 5.6,
        referenceRangeDisplay: '< 5.7 %',
        status: 'within_range',
        statusLabelEn: 'Within range',
        statusLabelTe: 'సాధారణ పరిధిలో ఉంది',
        previousValue: 5.8,
        previousDate: '10 Aug 2024',
        explanation: {
          en: {
            whatItMeasures: 'HbA1c reflects the percentage of hemoglobin in red blood cells that is bound with glucose, offering a window into average blood sugar over the preceding 2–3 months.',
            whyRangeMatters: 'Unlike single-day fingerstick tests, HbA1c captures steady-state glycemic exposure, helping clinicians evaluate metabolic homeostasis.',
            generalQuestions: [
              'How frequently is routine HbA1c screening recommended for my age group?',
              'How do my daily nutrition habits influence this 90-day index?'
            ]
          },
          te: {
            whatItMeasures: 'HbA1c అనేది గత 2 నుండి 3 నెలల కాలంలో మీ రక్తంలో చక్కెర సగటున ఎంత మోతాదులో ఉందో తెలియజేసే కీలక పరీక్ష.',
            whyRangeMatters: 'రోజువారీ హెచ్చుతగ్గులు కాకుండా దీర్ఘకాలిక చక్కెర నియంత్రణను ఇది కచ్చితంగా ప్రతిబింబిస్తుంది.',
            generalQuestions: [
              'ఈ పరీక్షను ఎన్ని నెలలకోసారి చేయించుకోవడం మంచిది?',
              'నా జీవనశైలి మరియు వ్యాయామం దీనిని ఎలా మెరుగుపరుస్తాయి?'
            ]
          }
        }
      }
    ]
  },
  {
    id: 'rep-002',
    title: 'Complete Blood Count (CBC) & Iron Profile',
    labName: 'Metro Health Diagnostics (Demo Lab)',
    date: '02 Feb 2025',
    patientDemo: {
      referenceId: 'DEMO-PT-5519',
      ageGroup: '25-35 Years',
      gender: 'Adult'
    },
    totalTests: 6,
    withinRangeCount: 5,
    outsideRangeCount: 1,
    notes: 'Demo data. Routine hematology review highlighting cell counts and hemoglobin concentrations.',
    tests: [
      {
        id: 'test-c1',
        name: 'Hemoglobin (Hb)',
        teluguName: 'హిమోగ్లోబిన్ (రక్త పరిమాణం)',
        category: 'Hematology',
        measuredValue: 14.2,
        unit: 'g/dL',
        referenceRangeMin: 13.0,
        referenceRangeMax: 17.0,
        referenceRangeDisplay: '13.0 - 17.0 g/dL',
        status: 'within_range',
        statusLabelEn: 'Within range',
        statusLabelTe: 'సాధారణ పరిధిలో ఉంది',
        previousValue: 13.8,
        previousDate: '15 Sep 2024',
        explanation: {
          en: {
            whatItMeasures: 'Hemoglobin is the iron-rich protein in red blood cells responsible for transporting oxygen from your lungs to tissues throughout the body.',
            whyRangeMatters: 'Healthy hemoglobin levels ensure sufficient oxygenation for muscles, brain, and vital organ function without causing chronic fatigue.',
            generalQuestions: [
              'Are my red cell indices (MCV, MCH) consistent with normal oxygen delivery?',
              'Is my dietary iron intake sufficient?'
            ]
          },
          te: {
            whatItMeasures: 'హిమోగ్లోబిన్ అనేది ఎర్ర రక్త కణాలలో ఉండే ప్రోటీన్. ఇది ఊపిరితిత్తుల నుండి ఆక్సిజన్‌ను శరీరంలోని అన్ని భాగాలకు చేరవేస్తుంది.',
            whyRangeMatters: 'శరీరానికి తగినంత ఆక్సిజన్ అంది అలసట లేకుండా ఉల్లాసంగా ఉండటానికి హిమోగ్లోబిన్ సరైన మోతాదులో ఉండటం ఎంతో ముఖ్యం.',
            generalQuestions: [
              'ఆహారంలో ఆకుకూరలు మరియు ఐరన్ సమృద్ధిగా అందుతున్నాయా?',
              'నా ఎర్ర రక్త కణాల నాణ్యత ఎలా ఉంది?'
            ]
          }
        }
      },
      {
        id: 'test-c2',
        name: 'Total Leukocyte Count (WBC)',
        teluguName: 'తెల్ల రక్త కణాలు (WBC కౌంట్)',
        category: 'Hematology',
        measuredValue: 6800,
        unit: '/cumm',
        referenceRangeMin: 4000,
        referenceRangeMax: 11000,
        referenceRangeDisplay: '4,000 - 11,000 /cumm',
        status: 'within_range',
        statusLabelEn: 'Within range',
        statusLabelTe: 'సాధారణ పరిధిలో ఉంది',
        previousValue: 7200,
        previousDate: '15 Sep 2024',
        explanation: {
          en: {
            whatItMeasures: 'White blood cells (leukocytes) are cellular components of your immune defense system that respond to infectious organisms or tissue recovery processes.',
            whyRangeMatters: 'Values in the standard range reflect an active, balanced immune system without acute inflammatory spikes.',
            generalQuestions: [
              'Is the differential breakdown (neutrophils, lymphocytes) also well-balanced?'
            ]
          },
          te: {
            whatItMeasures: 'తెల్ల రక్త కణాలు శరీర రోగనిరోధక రక్షణ సైన్యంలో భాగం. ఇవి బ్యాక్టీరియా మరియు వైరస్ ఇన్ఫెక్షన్ల నుండి శరీరాన్ని రక్షిస్తాయి.',
            whyRangeMatters: 'సాధారణ పరిధిలో తెల్ల రక్త కణాలు ఉండటం శరీరం రోగాలతో పోరాడే సంసిద్ధతను సూచిస్తుంది.',
            generalQuestions: [
              'రోగనిరోధక శక్తిని పెంచడానికి ఎలాంటి పోషకాహారం తీసుకోవాలి?'
            ]
          }
        }
      },
      {
        id: 'test-c3',
        name: 'Platelet Count',
        teluguName: 'ప్లేట్‌లెట్ కౌంట్ (రక్తం గడ్డకట్టే కణాలు)',
        category: 'Hematology',
        measuredValue: 240000,
        unit: '/cumm',
        referenceRangeMin: 150000,
        referenceRangeMax: 450000,
        referenceRangeDisplay: '150,000 - 450,000 /cumm',
        status: 'within_range',
        statusLabelEn: 'Within range',
        statusLabelTe: 'సాధారణ పరిధిలో ఉంది',
        previousValue: 220000,
        previousDate: '15 Sep 2024',
        explanation: {
          en: {
            whatItMeasures: 'Platelets (thrombocytes) are tiny cell fragments essential for forming blood clots to prevent excessive bleeding when vascular injury occurs.',
            whyRangeMatters: 'Standard platelet counts ensure balanced hemostasis — facilitating prompt wound closure without unnecessary spontaneous clotting.',
            generalQuestions: [
              'Are there any seasonal fever considerations affecting platelets?'
            ]
          },
          te: {
            whatItMeasures: 'ప్లేట్‌లెట్లు రక్తం గడ్డకట్టడానికి సహాయపడే చిన్న కణ శకలాలు. గాయాలు అయినప్పుడు రక్తస్రావాన్ని ఆపడంలో ఇవి కీలక పాత్ర పోషిస్తాయి.',
            whyRangeMatters: 'ప్లేట్‌లెట్లు సాధారణ పరిధిలో ఉండటం వల్ల శరీరం సహజంగా గాయాలను మాన్పగలదు.',
            generalQuestions: [
              'ప్లేట్‌లెట్స్ తగ్గకుండా చూసుకోవడానికి ఎలాంటి జాగ్రత్తలు తీసుకోవాలి?'
            ]
          }
        }
      },
      {
        id: 'test-c4',
        name: 'Serum Ferritin (Iron Storage)',
        teluguName: 'సీరం ఫెర్రిటిన్ (ఐరన్ నిల్వలు)',
        category: 'Hematology',
        measuredValue: 19,
        unit: 'ng/mL',
        referenceRangeMin: 24,
        referenceRangeMax: 336,
        referenceRangeDisplay: '24 - 336 ng/mL',
        status: 'outside_range_low',
        statusLabelEn: 'Outside stated range (Lower)',
        statusLabelTe: 'సూచించిన పరిధి కంటే తక్కువ',
        previousValue: 22,
        previousDate: '15 Sep 2024',
        explanation: {
          en: {
            whatItMeasures: 'Ferritin is an intracellular protein that stores iron and releases it in a controlled fashion as your body manufactures red blood cells.',
            whyRangeMatters: 'Low ferritin is an early indicator of depleting iron reserves, even if baseline hemoglobin is still technically within normal limits.',
            generalQuestions: [
              'Would dietary iron enhancement or an iron supplement help rebuild reserves?',
              'Should Vitamin C intake be paired with iron-rich foods to boost absorption?'
            ]
          },
          te: {
            whatItMeasures: 'ఫెర్రిటిన్ అనేది శరీరంలో ఐరన్ (ఇనుము) నిల్వలను నిల్వ చేసే ప్రోటీన్. ఎర్ర రక్త కణాల తయారీకి ఇది అవసరమైనప్పుడు ఐరన్‌ను అందిస్తుంది.',
            whyRangeMatters: 'ఫెర్రిటిన్ తక్కువగా ఉండటం శరీరం లోపల ఐరన్ నిల్వలు తగ్గుతున్నాయని సూచిస్తుంది. అలసట రాకుండా ముందే జాగ్రత్త పడవచ్చు.',
            generalQuestions: [
              'ఐరన్ నిల్వలను పెంచడానికి ఆహారంలో ఏమి చేర్చాలి?',
              'విటమిన్ సి కలిగిన పండ్లు ఐరన్ శోషణకు ఎలా తోడ్పడతాయి?'
            ]
          }
        }
      },
      {
        id: 'test-c5',
        name: 'Packed Cell Volume (PCV / Hematocrit)',
        teluguName: 'హెమటోక్రిట్ (PCV శాతం)',
        category: 'Hematology',
        measuredValue: 42.5,
        unit: '%',
        referenceRangeMin: 38.0,
        referenceRangeMax: 50.0,
        referenceRangeDisplay: '38.0 - 50.0 %',
        status: 'within_range',
        statusLabelEn: 'Within range',
        statusLabelTe: 'సాధారణ పరిధిలో ఉంది',
        previousValue: 41.2,
        previousDate: '15 Sep 2024',
        explanation: {
          en: {
            whatItMeasures: 'Hematocrit measures the proportion of red blood cells in your total blood volume.',
            whyRangeMatters: 'It confirms proportional blood volume density alongside hydration balance and red cell production.',
            generalQuestions: [
              'Is my hydration level optimal for this test ratio?'
            ]
          },
          te: {
            whatItMeasures: 'మొత్తం రక్త పరిమాణంలో ఎర్ర రక్త కణాలు ఆక్రమించే శాతాన్ని ఇది కొలుస్తుంది.',
            whyRangeMatters: 'రక్త సాంద్రత మరియు శరీరంలో ద్రవాల సమతుల్యతను అర్థం చేసుకోవడానికి ఇది తోడ్పడుతుంది.',
            generalQuestions: [
              'నీరు ఎక్కువగా తాగడం వల్ల ఇది సమతుల్యంగా ఉంటుందా?'
            ]
          }
        }
      },
      {
        id: 'test-c6',
        name: 'Erythrocyte Sedimentation Rate (ESR)',
        teluguName: 'ESR (శరీరంలో వాపు/ఇన్‌ఫ్లమేషన్ సూచిక)',
        category: 'Hematology',
        measuredValue: 12,
        unit: 'mm/hr',
        referenceRangeMin: 0,
        referenceRangeMax: 20,
        referenceRangeDisplay: '0 - 20 mm/hr',
        status: 'within_range',
        statusLabelEn: 'Within range',
        statusLabelTe: 'సాధారణ పరిధిలో ఉంది',
        previousValue: 14,
        previousDate: '15 Sep 2024',
        explanation: {
          en: {
            whatItMeasures: 'ESR measures how quickly red blood cells settle to the bottom of a test tube in one hour, serving as a non-specific indicator of systemic inflammation.',
            whyRangeMatters: 'A normal ESR suggests the absence of acute systemic inflammatory reactions or persistent immune activation.',
            generalQuestions: [
              'Does ESR correlate with other inflammation markers such as hs-CRP?'
            ]
          },
          te: {
            whatItMeasures: 'ఎర్ర రక్త కణాలు ఒక గంటలో ఎంత వేగంగా క్రిందకు చేరుతాయో ఈ పరీక్ష ద్వారా తెలుస్తుంది. ఇది శరీరంలో ఎక్కడైనా వాపు ఉందేమో గుర్తిస్తుంది.',
            whyRangeMatters: 'సాధారణ పరిధిలో ESR ఉండటం వల్ల శరీరంలో తీవ్రమైన అంతర్గత వాపు లేదా ఇన్ఫెక్షన్ లేదని భావించవచ్చు.',
            generalQuestions: [
              'ఈ పరీక్ష సాధారణంగా ఉంటే ఆరోగ్యం బాగానే ఉన్నట్లా?'
            ]
          }
        }
      }
    ]
  }
];
