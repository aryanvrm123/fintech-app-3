import { BorrowerProfile, JourneyStep, TeamDetail, StackLayerInfo, EMIScheduleItem, ActiveLoan } from '../types';

export const BORROWER_PROFILES: Record<string, BorrowerProfile> = {
  STRONG: {
    id: 'strong',
    name: 'Aditya Sharma',
    age: 29,
    phone: '+91 98765 43210',
    email: 'aditya.sharma@example.com',
    pan: 'ABCPS1234F',
    aadhaarMasked: 'XXXX-XXXX-9021',
    income: 85000,
    employment: 'Salaried - MNC',
    employer: 'Deloitte India Tech',
    history: 'Excellent (7+ yrs spotless bureau)',
    requested: 75000,
    tenureMonths: 12,
    score: 782,
    risk: 'Low',
    outcome: 'APPROVED',
    interestRate: 13.5,
    processingFee: 999,
    dti: 22,
    bureauScore: 782,
    notes: 'Zero default history, strong employer profile, steady monthly salary credits.',
    positiveFactors: [
      'Credit bureau score 782 (CIBIL/Experian)',
      'Consistent salaried credits for > 36 months',
      'Debt-to-Income (DTI) ratio is only 22%',
      'Active UPI transaction depth indicates strong cash cushion'
    ],
    riskFactors: [
      'Minor increase in credit card utilization last month (18%)'
    ]
  },
  THIN: {
    id: 'thin',
    name: 'Ishani Gupta',
    age: 24,
    phone: '+91 94567 89012',
    email: 'ishani.gupta@startupfin.io',
    pan: 'BKHPG5678Q',
    aadhaarMasked: 'XXXX-XXXX-4512',
    income: 38000,
    employment: 'Salaried - Startup',
    employer: 'FinTech Labs Bengaluru',
    history: 'New to Credit (NTC / Thin File)',
    requested: 25000,
    tenureMonths: 6,
    score: 658,
    risk: 'Moderate',
    outcome: 'REFER',
    interestRate: 16.0,
    processingFee: 500,
    dti: 34,
    bureauScore: 658,
    notes: 'First-time borrower with stable 10-month salary history. Recommended for assisted approval with structured mandate.',
    positiveFactors: [
      'DigiLocker verified employment certificate & Form 16',
      'Positive Account Aggregator bank balance trend',
      'Low initial request amount relative to income'
    ],
    riskFactors: [
      'No formal bureau repayment history (Thin File)',
      'Early stage startup employer (< 2 yrs operational)'
    ]
  },
  HIGH_RISK: {
    id: 'high',
    name: 'Rajesh Kumar',
    age: 38,
    phone: '+91 91234 56789',
    email: 'rajesh.traders@gmail.com',
    pan: 'CGZPK9012L',
    aadhaarMasked: 'XXXX-XXXX-6789',
    income: 24000,
    employment: 'Self-Employed Retailer',
    employer: 'Kumar General Store',
    history: 'Delayed Payments (60+ DPD in past year)',
    requested: 100000,
    tenureMonths: 18,
    score: 512,
    risk: 'High',
    outcome: 'DECLINED',
    interestRate: 24.0,
    processingFee: 1500,
    dti: 68,
    bureauScore: 512,
    notes: 'Exceeds maximum permissible DTI ratio (>50%). Active overdue flags on two unsecured loan accounts.',
    positiveFactors: [
      'Verified PAN and Aadhaar identity',
      'Continuous UPI merchant collections'
    ],
    riskFactors: [
      'High DTI of 68% (Income insufficient for EMI)',
      'Multiple 60+ Days Past Due (DPD) events in past 12 months',
      'Recent loan application velocity indicates credit hunger'
    ]
  }
};

export const STEPS: JourneyStep[] = [
  { 
    id: 1, 
    title: 'Application', 
    shortDesc: 'Demographics & Loan Need',
    teams: ['Product', 'Tech', 'CX'], 
    desc: 'Borrower submits loan request parameters, purpose, and demographic details through a lightweight mobile-responsive form.',
    stackLayer: 'Data',
    estimatedTime: '45 seconds',
    apiProtocol: 'REST JSON / SSL TLS 1.3'
  },
  { 
    id: 2, 
    title: 'Identity', 
    shortDesc: 'UIDAI Aadhaar e-KYC',
    teams: ['KYC/Ops', 'Legal', 'Risk'], 
    desc: 'Instant paperless identity verification with UIDAI via licensed Authentication User Agency (AUA/KUA) and OTP authorization.',
    stackLayer: 'Identity',
    estimatedTime: '15 seconds',
    apiProtocol: 'UIDAI Auth API 2.5 / XML encrypted'
  },
  { 
    id: 3, 
    title: 'Documents', 
    shortDesc: 'DigiLocker & Account Aggregator',
    teams: ['Ops', 'Credit', 'Tech'], 
    desc: 'Automated retrieval of digitally signed PAN, Form 26AS, and bank cashflow statements with explicit consent.',
    stackLayer: 'Data',
    estimatedTime: '20 seconds',
    apiProtocol: 'DigiLocker OAuth 2.0 / ReBIT AA Spec'
  },
  { 
    id: 4, 
    title: 'Assessment', 
    shortDesc: 'AI Underwriting & Scoring',
    teams: ['Data Science', 'Risk', 'Credit'], 
    desc: 'Multivariate underwriting engine evaluates credit bureau files, debt-to-income, and cashflow signals to compute risk tier.',
    stackLayer: 'Intelligence',
    estimatedTime: '5 seconds',
    apiProtocol: 'Internal Python Microservice / gRPC'
  },
  { 
    id: 5, 
    title: 'Decision', 
    shortDesc: 'Offer & Key Fact Statement (KFS)',
    teams: ['Credit', 'Compliance'], 
    desc: 'Automated sanction generation providing transparent APR, all-inclusive fees, cooling-off window, and instant e-sign.',
    stackLayer: 'Decision',
    estimatedTime: '10 seconds',
    apiProtocol: 'RBI Compliant KFS Engine / JSON'
  },
  { 
    id: 6, 
    title: 'Repayment', 
    shortDesc: 'UPI AutoPay Mandate',
    teams: ['Payments', 'Ops'], 
    desc: 'Recurring standing mandate created on NPCI UPI AutoPay rails linked to the borrower’s primary bank account for seamless EMI pulls.',
    stackLayer: 'Payments',
    estimatedTime: '20 seconds',
    apiProtocol: 'NPCI UPI AutoPay 2.0 / e-Mandate API'
  },
  { 
    id: 7, 
    title: 'Disbursement', 
    shortDesc: 'Instant Bank Transfer',
    teams: ['Payments', 'Risk'], 
    desc: 'Automated treasury trigger transfers approved loan capital straight to the borrower’s bank account via IMPS/UPI instant rails.',
    stackLayer: 'Disbursement',
    estimatedTime: '3 seconds',
    apiProtocol: 'Direct Bank Core Banking Host-to-Host'
  }
];

export const TEAM_DETAILS: Record<string, TeamDetail> = {
  'Product': {
    name: 'Product Management',
    role: 'Journey Optimization & Value Delivery',
    description: 'Defines end-to-end customer journey, conversion funnels, UI/UX interaction flows, and eligibility parameter criteria.',
    keyResponsibilities: [
      'User journey design and funnel drop-off analytics',
      'A/B testing on borrower input forms and disclosures',
      'Integration prioritization for digital public goods'
    ],
    kpis: ['Funnel Completion Rate (>68%)', 'Time to Disburse (<10 mins)', 'App Store Rating (>4.6)'],
    keyTools: ['Mixpanel', 'Figma', 'Postman', 'Jira']
  },
  'Tech': {
    name: 'Technology & Platform Engineering',
    role: 'API Orchestration & High Availability',
    description: 'Maintains API integrations (UIDAI, DigiLocker, NPCI, Bank Gateways), microservice resilience, and platform 99.99% uptime.',
    keyResponsibilities: [
      'AUA/KUA HSM encryption security and key management',
      'Fault-tolerant event-driven microservices architecture',
      'Database clustering, caching, and rate limiting'
    ],
    kpis: ['API Latency (<250ms p95)', 'Uptime (99.99%)', 'Zero P1 Security Incidents'],
    keyTools: ['Go / Node.js', 'PostgreSQL', 'Redis', 'Kubernetes', 'Datadog']
  },
  'CX': {
    name: 'Customer Experience & Care',
    role: 'Borrower Support & Assistance',
    description: 'Handles borrower queries, live drop-off assistance, WhatsApp status alerts, and multi-lingual helpdesks.',
    keyResponsibilities: [
      'Real-time chat and call assistance for failed OTP / KYC steps',
      'Proactive WhatsApp notifications and status tracking',
      'Grievance redressal officer compliance escalation'
    ],
    kpis: ['First Response Time (<60s)', 'Customer Satisfaction Score (>92%)', 'Grievance Resolution (<48h)'],
    keyTools: ['Zendesk', 'Gupshup WhatsApp API', 'Freshdesk']
  },
  'KYC/Ops': {
    name: 'KYC & Verification Operations',
    role: 'Identity Integrity & Fraud Prevention',
    description: 'Ensures identity verification strictly meets PMLA and RBI Master Directions on Know Your Customer without friction.',
    keyResponsibilities: [
      'Aadhaar XML validation and liveness face-match audit',
      'PEP (Politically Exposed Persons) and Sanction List screening',
      'Manual video KYC fallback queue management'
    ],
    kpis: ['KYC Pass Rate (>94%)', 'Manual Review SLA (<5 mins)', 'Identity Fraud Rate (0.00%)'],
    keyTools: ['UIDAI Portal', 'Karza / HyperVerge KYC Engine', 'LexisNexis WorldCompliance']
  },
  'Legal': {
    name: 'Legal & Regulatory Counsel',
    role: 'Enforceability & Regulatory Safeguards',
    description: 'Ensures the digital journey, electronic signatures (IT Act 2000 Section 10A), and loan contracts are legally binding in court.',
    keyResponsibilities: [
      'Digital Loan Agreement templates drafting and version control',
      'Arbitration and digital dispute resolution frameworks',
      'Data sovereignty and consumer protection policy alignment'
    ],
    kpis: ['Contract Enforceability (100%)', 'Zero Regulatory Notices', 'Contract Turnaround (<24h)'],
    keyTools: ['Leegality e-Sign', 'Ironclad', 'Legitquest']
  },
  'Risk': {
    name: 'Risk Management & Fraud Control',
    role: 'Portfolio Health & Fraud Detection',
    description: 'Monitors overall portfolio quality, credit concentration limits, synthetic identity fraud, and macroeconomic exposure.',
    keyResponsibilities: [
      'Device fingerprinting and IP velocity anomaly checks',
      'Portfolio-level Non-Performing Asset (NPA) forecasting',
      'Early Warning Signal (EWS) triggers on default trends'
    ],
    kpis: ['Gross NPA (<1.4%)', 'First Payment Default (<0.5%)', 'Fraud Loss Rate (<0.02%)'],
    keyTools: ['Bureau Watchdog', 'SEON Fraud Detection', 'Tableau Risk Hub']
  },
  'Ops': {
    name: 'Loan Operations & Settlement',
    role: 'Transaction Reconciliation & Exceptions',
    description: 'Manages exception queues, DigiLocker fetch re-tries, daily bank reconciliation, and mandate failure resolutions.',
    keyResponsibilities: [
      'Daily bank statement and clearing reconciliation',
      'DigiLocker session timeout recovery handling',
      'Repayment re-presentment schedule execution'
    ],
    kpis: ['Reconciliation Error Rate (0.00%)', 'Exception Clearing (<2h)', 'Escalation Resolution SLA (99.8%)'],
    keyTools: ['ReconFlow', 'Internal Backoffice Admin', 'Razorpay Ops Dashboard']
  },
  'Credit': {
    name: 'Credit Policy & Underwriting',
    role: 'Risk Pricing & Policy Formulation',
    description: 'Develops credit underwriting rulebooks, debt-to-income caps, cut-off thresholds, and risk-based loan pricing matrices.',
    keyResponsibilities: [
      'Credit rule engine configuration (FOIR, DTI, Min Bureau Score)',
      'Dynamic interest rate pricing based on borrower risk bucket',
      'Credit exception approvals and policy iteration'
    ],
    kpis: ['Approval Rate on Clean Files (>75%)', 'Net Credit Spread (>8.2%)', 'Policy Adherence (100%)'],
    keyTools: ['Experian PowerCurve', 'Drools Rule Engine', 'FICO Blaze Advisor']
  },
  'Data Science': {
    name: 'Data Science & Machine Learning',
    role: 'Predictive Modeling & Alternate Data',
    description: 'Builds predictive credit default models (PD/LGD) using permissible alternative cashflow data and Account Aggregator signals.',
    keyResponsibilities: [
      'Probability of Default (PD) gradient-boosting models (LightGBM/XGBoost)',
      'Account Aggregator transaction categorization and income surrogate parsing',
      'Model fairness and bias auditing across demographic clusters'
    ],
    kpis: ['Model Gini / AUC (>0.74)', 'Feature Processing Latency (<1200ms)', 'Quarterly Model Drift (<5%)'],
    keyTools: ['Python', 'XGBoost', 'MLflow', 'Snowflake', 'Jupyter']
  },
  'Compliance': {
    name: 'Compliance & RBI Guidelines',
    role: 'Regulatory Governance & Reporting',
    description: 'Ensures absolute adherence to Reserve Bank of India (RBI) Digital Lending Guidelines (DLG), Key Fact Statements, and APR limits.',
    keyResponsibilities: [
      'Key Fact Statement (KFS) standardization and annual percentage rate calculations',
      'Lending Service Provider (LSP) and RE direct bank disbursement auditing',
      'Monthly CIBIL / Experian regulatory data submission'
    ],
    kpis: ['RBI Audit Rating (Grade A)', 'KFS Compliance (100%)', 'Zero Consumer Penalty Breaches'],
    keyTools: ['RBI DLG Audit Matrix', 'OneTrust', 'Vanta']
  },
  'Payments': {
    name: 'Payments & Treasury Integration',
    role: 'Payment Rails & Mandate Lifecycle',
    description: 'Manages banking partner APIs, NPCI UPI AutoPay mandates, instant IMPS/NEFT disbursements, and automated debit retries.',
    keyResponsibilities: [
      'NPCI UPI AutoPay 2.0 mandate registration & execution',
      'Host-to-host bank API integrations for real-time disbursement',
      'Smart retry logic for failed recurring debit settlements'
    ],
    kpis: ['Mandate Registration Success (>88%)', 'AutoPay Debit Success on Due Date (>91%)', 'Disbursement SLA (<15s)'],
    keyTools: ['NPCI Bharat e-Mandate', 'Yes Bank API Banking', 'RazorpayX', 'Cashfree']
  }
};

export const STACK_LAYERS: StackLayerInfo[] = [
  {
    id: 'aadhaar',
    name: 'Aadhaar (UIDAI)',
    layer: 'Identity',
    provider: 'Unique Identification Authority of India',
    iconName: 'ShieldCheck',
    description: 'Biometric and OTP-based digital identity verification covering >1.3 billion Indian residents with instant XML e-KYC response.',
    regulatoryBody: 'UIDAI / Ministry of Electronics & IT',
    latency: '< 1.5 seconds',
    benefits: [
      'Eliminates physical paperwork and in-person verification',
      'Cryptographically signed demographic record prevents tampering',
      'Cost per verification reduced by over 95% compared to paper KYC'
    ]
  },
  {
    id: 'digilocker',
    name: 'DigiLocker & Account Aggregator (AA)',
    layer: 'Data',
    provider: 'MeitY & Sahamati (ReBIT Framework)',
    iconName: 'FileCheck',
    description: 'Consent-driven data exchange protocol allowing citizens to share verified PAN cards, ITR forms, and bank cashflow data directly from authentic issuers.',
    regulatoryBody: 'Reserve Bank of India & MeitY',
    latency: '< 3.0 seconds',
    benefits: [
      'Zero risk of PDF tampering or forged salary slips',
      'Granular borrower consent with revocation capability',
      'Enables true cashflow-based lending for thin-file borrowers'
    ]
  },
  {
    id: 'upi',
    name: 'Unified Payments Interface (UPI) & AutoPay',
    layer: 'Payments',
    provider: 'National Payments Corporation of India (NPCI)',
    iconName: 'Smartphone',
    description: 'Real-time 24/7/365 payment rail supporting instant disbursement and recurring e-mandates up to ₹1,00,000 without requiring debit card OTPs every month.',
    regulatoryBody: 'Reserve Bank of India (RBI)',
    latency: '< 800 milliseconds',
    benefits: [
      'Instant disbursement straight to borrower bank account',
      'Automated recurring EMI collections via UPI AutoPay',
      'Massive reduction in bounce fees and operational collection costs'
    ]
  },
  {
    id: 'ocen',
    name: 'OCEN (Open Credit Enablement Network)',
    layer: 'Credit Protocol',
    provider: 'iSPIRT / Open Standards Protocol',
    iconName: 'Zap',
    description: 'Standardized API framework connecting Loan Service Providers (LSPs, marketplaces, platforms) directly with Regulated Entities (Banks & NBFCs).',
    regulatoryBody: 'Open Industry Standard backed by RBI Framework',
    latency: '< 2.0 seconds',
    benefits: [
      'Democratizes credit access for micro-enterprises and gig workers',
      'Plugs digital credit into existing daily workflow apps',
      'Modular underwriting, servicing, and collections ecosystem'
    ]
  }
];

export function calculateEMI(principal: number, annualRate: number, tenureMonths: number): number {
  if (!principal || !annualRate || !tenureMonths) return 0;
  const monthlyRate = annualRate / 12 / 100;
  const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) / (Math.pow(1 + monthlyRate, tenureMonths) - 1);
  return Math.round(emi);
}

export function generateEMISchedule(principal: number, annualRate: number, tenureMonths: number, startDateStr: string = '2024-10-15'): EMIScheduleItem[] {
  const emi = calculateEMI(principal, annualRate, tenureMonths);
  const monthlyRate = annualRate / 12 / 100;
  let currentBalance = principal;
  const schedule: EMIScheduleItem[] = [];

  const baseDate = new Date(startDateStr);

  for (let i = 1; i <= tenureMonths; i++) {
    const interest = Math.round(currentBalance * monthlyRate);
    const principalPart = i === tenureMonths ? currentBalance : emi - interest;
    currentBalance = Math.max(0, currentBalance - principalPart);

    const dueDate = new Date(baseDate);
    dueDate.setMonth(dueDate.getMonth() + (i - 1));
    const formattedDate = dueDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

    schedule.push({
      installmentNo: i,
      dueDate: formattedDate,
      principal: principalPart,
      interest: interest,
      totalEmi: emi,
      balanceRemaining: currentBalance,
      status: i === 1 ? 'DUE' : 'UPCOMING'
    });
  }

  return schedule;
}

export const INITIAL_ACTIVE_LOAN: ActiveLoan = {
  loanId: 'FL-2024-88419',
  borrowerName: 'Aditya Sharma',
  sanctionedAmount: 75000,
  disbursedAmount: 74001, // after processing fee (999)
  interestRate: 13.5,
  tenureMonths: 12,
  monthlyEmi: 6718,
  disbursementDate: '15 Sep 2024',
  nextEmiDate: '15 Oct 2024',
  mandateStatus: 'ACTIVE',
  vpa: 'aditya@okaxis',
  bankName: 'HDFC Bank Ltd.',
  accountNumberMasked: '•••• •••• 4091',
  loanStatus: 'ACTIVE',
  emis: generateEMISchedule(75000, 13.5, 12, '2024-10-15')
};
