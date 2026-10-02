from typing import Dict, Any, Optional

EDUCATIONAL_KNOWLEDGE_BASE: Dict[str, Dict[str, Any]] = {
    "glucose": {
        "canonical_name": "Fasting Blood Glucose",
        "telugu_name": "ఉపవాస రక్త చక్కెర (గ్లూకోజ్)",
        "category": "Metabolic",
        "explanation": {
            "en": {
                "whatItMeasures": "Fasting blood glucose measures the concentration of sugar (glucose) circulating in your bloodstream after fasting for at least 8 hours.",
                "whyRangeMatters": "Maintaining glucose within the reference range reflects how effectively insulin manages fuel delivery to cells.",
                "generalQuestions": [
                    "Were fasting guidelines (8–12 hours without calories) followed before the blood draw?",
                    "Would an HbA1c test provide a clearer 3-month overview?",
                    "What dietary or physical activity patterns should I discuss?"
                ]
            },
            "te": {
                "whatItMeasures": "ఉపవాస రక్త చక్కెర (గ్లూకోజ్) అనేది కనీసం 8 గంటల పాటు ఏమీ తినకుండా ఉన్న తర్వాత రక్తంలో ఉండే చక్కెర స్థాయిని కొలుస్తుంది.",
                "whyRangeMatters": "రక్తంలో గ్లూకోజ్ స్థాయిలను సాధారణ పరిధిలో ఉంచడం వల్ల ఇన్సులిన్ వ్యవస్థ సరిగ్గా పనిచేస్తుందో లేదో తెలుస్తుంది.",
                "generalQuestions": [
                    "రక్త పరీక్షకు ముందు 8-12 గంటల ఉపవాసం సరిగ్గా పాటించారా?",
                    "గత 3 నెలల సగటు తెలుసుకోవడానికి HbA1c పరీక్ష అవసరమా?",
                    "ఆహార నియమాలు లేదా వ్యాయామంలో ఎలాంటి మార్పులు చేసుకోవాలి?"
                ]
            }
        }
    },
    "cholesterol": {
        "canonical_name": "Total Cholesterol",
        "telugu_name": "మొత్తం కొలెస్ట్రాల్",
        "category": "Lipid",
        "explanation": {
            "en": {
                "whatItMeasures": "Total cholesterol estimates the combined amount of all types of cholesterol circulating in your bloodstream, including HDL, LDL, and VLDL.",
                "whyRangeMatters": "Cholesterol is vital for cell membranes and hormone synthesis, but elevated levels over time can interact with vascular walls.",
                "generalQuestions": [
                    "What are my specific LDL ('bad') and HDL ('good') cholesterol levels?",
                    "How can heart-healthy nutrition and regular exercise support balance?",
                    "Are there family history factors relevant to my lipid panel?"
                ]
            },
            "te": {
                "whatItMeasures": "మొత్తం కొలెస్ట్రాల్ అనేది మీ రక్తప్రవాహంలో ఉన్న అన్ని రకాల కొవ్వుల (HDL, LDL, VLDL) సమ్మేళనాన్ని కొలుస్తుంది.",
                "whyRangeMatters": "శరీర కణాల నిర్మాణానికి మరియు హార్మోన్ల తయారీకి కొలెస్ట్రాల్ చాలా అవసరం. అయితే ఇది ఎక్కువైతే రక్తనాళాల ఆరోగ్యంపై ప్రభావం చూపే అవకాశం ఉంటుంది.",
                "generalQuestions": [
                    "నా రక్తంలో LDL మరియు HDL స్థాయిలు విడివిడిగా ఎలా ఉన్నాయి?",
                    "ఆహారంలో నూనెలు తగ్గించడం మరియు వ్యాయామం ఎలా సహాయపడతాయి?",
                    "కుటుంబంలో ఎవరికైనా కొలెస్ట్రాల్ సమస్యలు ఉన్నాయా?"
                ]
            }
        }
    },
    "hdl": {
        "canonical_name": "HDL Cholesterol",
        "telugu_name": "హెచ్.డి.ఎల్ కొలెస్ట్రాల్ (మంచి కొవ్వు)",
        "category": "Lipid",
        "explanation": {
            "en": {
                "whatItMeasures": "High-Density Lipoprotein (HDL) carries excess cholesterol from surrounding tissues back to the liver for clearance.",
                "whyRangeMatters": "Higher HDL values are generally considered supportive of cardiovascular protection.",
                "generalQuestions": [
                    "What physical activities help maintain or elevate HDL levels?",
                    "How does dietary healthy fat influence HDL?"
                ]
            },
            "te": {
                "whatItMeasures": "హై-డెన్సిటీ లిపోప్రొటీన్ (HDL) ను సాధారణంగా 'మంచి కొలెస్ట్రాల్' అంటారు. ఇది శరీర కణజాలాల నుండి అదనపు కొవ్వును కాలేయానికి చేరవేస్తుంది.",
                "whyRangeMatters": "HDL కొలెస్ట్రాల్ స్థాయి ఆరోగ్యకరమైన పరిధిలో ఉండటం గుండె మరియు రక్తనాళాల రక్షణకు తోడ్పడుతుంది.",
                "generalQuestions": [
                    "రోజూ వాకింగ్ లేదా వ్యాయామం చేయడం వల్ల HDL పెరుగుతుందా?",
                    "ఆరోగ్యకరమైన కొవ్వులు కలిగిన ఆహారం ఎలా తీసుకోవాలి?"
                ]
            }
        }
    },
    "creatinine": {
        "canonical_name": "Serum Creatinine",
        "telugu_name": "సీరం క్రియాటినిన్ (కిడ్నీ పరీక్ష)",
        "category": "Renal",
        "explanation": {
            "en": {
                "whatItMeasures": "Creatinine is a natural waste byproduct from routine muscle metabolism filtered out of the blood by healthy kidneys.",
                "whyRangeMatters": "Because it is produced at a steady rate, blood creatinine serves as a reliable marker of kidney filtration efficiency.",
                "generalQuestions": [
                    "Is my estimated Glomerular Filtration Rate (eGFR) also calculated?",
                    "Does my hydration status affect test day readings?"
                ]
            },
            "te": {
                "whatItMeasures": "క్రియాటినిన్ అనేది కండరాల పనితీరు వల్ల సహజంగా ఏర్పడే ఒక వ్యర్థ పదార్థం. ఆరోగ్యకరమైన మూత్రపిండాలు దీనిని రక్తం నుండి వేరుచేస్తాయి.",
                "whyRangeMatters": "రక్తంలో క్రియాటినిన్ సాధారణ పరిధిలో ఉండటం మీ కిడ్నీలు రక్తాన్ని సమర్థవంతంగా శుద్ధి చేస్తున్నాయని సూచిస్తుంది.",
                "generalQuestions": [
                    "నా కిడ్నీ పనితీరు (eGFR) ఎలా ఉంది?",
                    "తగినంత నీరు తాగడం వల్ల ఈ పరీక్ష ఫలితాలపై ప్రభావం ఉంటుందా?"
                ]
            }
        }
    },
    "hemoglobin": {
        "canonical_name": "Hemoglobin (Hb)",
        "telugu_name": "హిమోగ్లోబిన్ (రక్త పరిమాణం)",
        "category": "Hematology",
        "explanation": {
            "en": {
                "whatItMeasures": "Hemoglobin is the iron-rich protein in red blood cells that transports oxygen from your lungs to tissues throughout your body.",
                "whyRangeMatters": "Healthy hemoglobin levels ensure sufficient oxygenation for muscles, brain, and organ function without chronic fatigue.",
                "generalQuestions": [
                    "Are my red cell indices (MCV, MCH) consistent with normal oxygen delivery?",
                    "Is my dietary iron intake sufficient?"
                ]
            },
            "te": {
                "whatItMeasures": "హిమోగ్లోబిన్ అనేది ఎర్ర రక్త కణాలలో ఉండే ప్రోటీన్. ఇది ఊపిరితిత్తుల నుండి ఆక్సిజన్‌ను శరీర భాగాలకు చేరవేస్తుంది.",
                "whyRangeMatters": "శరీరానికి తగినంత ఆక్సిజన్ అంది అలసట లేకుండా ఉండటానికి హిమోగ్లోబిన్ సరైన మోతాదులో ఉండటం ముఖ్యం.",
                "generalQuestions": [
                    "ఆహారంలో ఆకుకూరలు మరియు ఐరన్ సమృద్ధిగా అందుతున్నాయా?",
                    "నా ఎర్ర రక్త కణాల నాణ్యత ఎలా ఉంది?"
                ]
            }
        }
    },
    "vitamin d": {
        "canonical_name": "Serum 25-OH Vitamin D",
        "telugu_name": "విటమిన్ డి3 (రక్త పరీక్ష)",
        "category": "Vitamins",
        "explanation": {
            "en": {
                "whatItMeasures": "Quantifies circulating storage forms of vitamin D synthesized from sunlight exposure, nutrition, and supplementation.",
                "whyRangeMatters": "Vitamin D facilitates calcium absorption, supporting skeletal strength, bone mineral density, and immune balance.",
                "generalQuestions": [
                    "Is dietary supplementation or structured sunlight exposure appropriate for me?",
                    "Should calcium levels be reviewed alongside vitamin D?"
                ]
            },
            "te": {
                "whatItMeasures": "ఈ పరీక్ష రక్తంలో ఉన్న విటమిన్ డి3 నిల్వలను లెక్కిస్తుంది. సూర్యరశ్మి మరియు ఆహారం ద్వారా ఇది శరీరానికి అందుతుంది.",
                "whyRangeMatters": "ఎముకల బలానికి అవసరమైన కాల్షియంను శరీరం గ్రహించడానికి, రోగనిరోధక శక్తిని పెంపొందించడానికి విటమిన్ డి చాలా అవసరం.",
                "generalQuestions": [
                    "నాకు విటమిన్ డి సప్లిమెంట్లు లేదా ఎండలో సమయం గడపడం అవసరమా?",
                    "ఎముకల పటుత్వం కోసం కాల్షియం పరీక్ష కూడా చేయించాలా?"
                ]
            }
        }
    },
    "hba1c": {
        "canonical_name": "Hemoglobin A1c (HbA1c)",
        "telugu_name": "HbA1c (3 నెలల సగటు చక్కెర)",
        "category": "Metabolic",
        "explanation": {
            "en": {
                "whatItMeasures": "HbA1c measures the percentage of hemoglobin coated with glucose, reflecting average blood sugar over the preceding 2–3 months.",
                "whyRangeMatters": "It captures steady-state glycemic exposure to help healthcare professionals assess metabolic balance.",
                "generalQuestions": [
                    "How frequently is routine HbA1c screening recommended for my health profile?",
                    "How do my nutrition habits influence this 90-day index?"
                ]
            },
            "te": {
                "whatItMeasures": "HbA1c అనేది గత 2 నుండి 3 నెలల కాలంలో మీ రక్తంలో చక్కెర సగటున ఎంత మోతాదులో ఉందో తెలియజేసే పరీక్ష.",
                "whyRangeMatters": "రోజువారీ హెచ్చుతగ్గులు కాకుండా దీర్ఘకాలిక చక్కెర నియంత్రణను ఇది ప్రతిబింబిస్తుంది.",
                "generalQuestions": [
                    "ఈ పరీక్షను ఎన్ని నెలలకోసారి చేయించుకోవడం మంచిది?",
                    "నా జీవనశైలి మరియు వ్యాయామం దీనిని ఎలా మెరుగుపరుస్తాయి?"
                ]
            }
        }
    }
}

def get_educational_metadata(test_name: str) -> Optional[Dict[str, Any]]:
    """Retrieve verified educational concepts for a clinical test parameter."""
    norm_name = test_name.lower().strip()
    for key, data in EDUCATIONAL_KNOWLEDGE_BASE.items():
        if key in norm_name:
            return data
    return None
