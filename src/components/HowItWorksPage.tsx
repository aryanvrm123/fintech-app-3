import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, Smartphone, FileCheck, Landmark, 
  CheckCircle2, Users, Activity, Sparkles, Clock, 
  Lock, ArrowRight, FileText, Layers, Scale, Database, Zap
} from 'lucide-react';
import { STEPS, TEAM_DETAILS } from '../data/mockData';

interface HowItWorksPageProps {
  onStartApplication: () => void;
  onOpenTeamDrawer: (teamName?: string) => void;
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({
  onStartApplication,
  onOpenTeamDrawer
}) => {
  const [selectedStepId, setSelectedStepId] = useState<number>(1);
  const activeStep = STEPS.find((s) => s.id === selectedStepId) || STEPS[0];

  const architecturalStages = [
    {
      step: 1,
      title: 'Borrower Onboarding & Application Form',
      rail: 'Client Web/Mobile App -> LSP API Gateway',
      objective: 'Capture applicant metadata, desired loan quantum, tenure, and explicit consent for data lookup.',
      protocols: 'HTTPS TLS 1.3, Rate-limiting via Redis, AES-256 at rest',
      rbiRule: 'Direct consent requirement; no unauthorized background harvesting of contacts or location.',
      teams: ['Product', 'Tech', 'CX']
    },
    {
      step: 2,
      title: 'Identity Verification (Aadhaar e-KYC)',
      rail: 'AUA/KUA Gateway -> UIDAI Core Servers',
      objective: 'Verify borrower identity against the national biometric identity registry in real time.',
      protocols: 'UIDAI Auth API 2.5, HSM Signed XML Payload, OTP via SMS/m-Aadhaar',
      rbiRule: 'Aadhaar masking mandatory; store only last 4 digits in non-AUA environments.',
      teams: ['KYC/Ops', 'Legal', 'Risk']
    },
    {
      step: 3,
      title: 'Document & Financial Data Fetch (DigiLocker / AA)',
      rail: 'DigiLocker OAuth 2.0 & ReBIT Account Aggregator',
      objective: 'Obtain certified authentic PAN details, Form 26AS income filings, and 6-month bank statements.',
      protocols: 'ReBIT Consent Artefact, RESTful API JSON, Digital Signatures (PKI)',
      rbiRule: 'Data minimization principle: only capture information strictly required for underwriting.',
      teams: ['Ops', 'Credit', 'Tech']
    },
    {
      step: 4,
      title: 'Credit Assessment & AI Underwriting Engine',
      rail: 'Credit Bureau APIs (CIBIL/Experian) + Python Scoring Model',
      objective: 'Compute borrower probability of default (PD), debt-to-income (DTI/FOIR), and risk-adjusted pricing.',
      protocols: 'LightGBM / XGBoost Model, Microservice gRPC, Bureau XML/JSON',
      rbiRule: 'Algorithmic accountability: clear audit trail for any credit rejection.',
      teams: ['Data Science', 'Risk', 'Credit']
    },
    {
      step: 5,
      title: 'Sanction Decision & Key Fact Statement (KFS)',
      rail: 'Core Lending Engine -> Borrower Screen + e-Sign',
      objective: 'Issue transparent sanction terms including APR, breakdown of fees, and 3-day cooling-off window.',
      protocols: 'RBI Standardized KFS Template, IT Act 2000 Section 10A e-Sign',
      rbiRule: 'Mandatory standard Key Fact Statement before contract signing; no hidden fees.',
      teams: ['Credit', 'Compliance']
    },
    {
      step: 6,
      title: 'Repayment Mandate Registration (UPI AutoPay)',
      rail: 'NPCI UPI AutoPay 2.0 Rails / Sponsor Bank e-Mandate',
      objective: 'Bind a recurring electronic pull mandate against borrower’s UPI handle for automated monthly debits.',
      protocols: 'NPCI UPI Bharat e-Mandate, ₹1 Pre-authorization Ping, UMN Generation',
      rbiRule: 'Mandate limit cannot exceed approved EMI without explicit user re-authorization.',
      teams: ['Payments', 'Ops']
    },
    {
      step: 7,
      title: 'Real-Time Capital Disbursement',
      rail: 'Direct NBFC/Bank Treasury Host-to-Host -> IMPS / UPI Rails',
      objective: 'Disburse sanctioned funds directly to borrower’s verified bank account in under 3 seconds.',
      protocols: 'Host-to-Host Direct Bank Banking API, IMPS/NEFT, Webhook Confirmation',
      rbiRule: 'Zero pass-through: Funds MUST flow directly from Regulated Entity account to borrower bank account.',
      teams: ['Payments', 'Risk']
    }
  ];

  const currentStageInfo = architecturalStages.find((s) => s.step === selectedStepId) || architecturalStages[0];

  return (
    <div id="how-it-works-page" className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
          Process Blueprint & Architecture
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
          How Digital Unsecured Lending Works in India
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          A step-by-step breakdown of how public digital infrastructure, automated risk engines, and cross-functional teams deliver instant credit under RBI regulations.
        </p>
      </div>

      {/* Interactive Step Explorer */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left Step List */}
        <div className="lg:col-span-5 space-y-2">
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
            Select Lifecycle Stage
          </label>
          {STEPS.map((s) => {
            const isSelected = s.id === selectedStepId;
            return (
              <button
                key={s.id}
                id={`howitworks-step-btn-${s.id}`}
                onClick={() => setSelectedStepId(s.id)}
                className={`w-full p-4 rounded-2xl text-left transition-all border flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-900/10 font-bold'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black ${
                      isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {s.id}
                  </span>
                  <div>
                    <p className="text-xs font-bold">{s.title}</p>
                    <span className={`text-[10px] ${isSelected ? 'text-slate-300' : 'text-slate-400'}`}>
                      {s.stackLayer} Layer • {s.estimatedTime}
                    </span>
                  </div>
                </div>
                <ArrowRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-blue-400 translate-x-1' : 'text-slate-300'}`} />
              </button>
            );
          })}
        </div>

        {/* Right Deep Stage Inspector */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                Stage {currentStageInfo.step} Architecture
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">{currentStageInfo.title}</h2>
            </div>
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center font-bold">
              #{currentStageInfo.step}
            </div>
          </div>

          {/* Rail & Objective */}
          <div className="space-y-3">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Payment / Data Rail</span>
              <p className="text-xs font-mono font-bold text-blue-900">{currentStageInfo.rail}</p>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-800">Primary Objective</span>
              <p className="text-xs text-slate-600 leading-relaxed">{currentStageInfo.objective}</p>
            </div>
          </div>

          {/* Protocols & Tech Specs */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-blue-600" />
              <span>Technology & Security Protocol</span>
            </span>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs font-mono text-slate-700">
              {currentStageInfo.protocols}
            </div>
          </div>

          {/* Regulatory Mandate */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5 text-indigo-600" />
              <span>RBI Regulatory Guideline (DLG Mandate)</span>
            </span>
            <div className="bg-indigo-50/70 p-3.5 rounded-xl border border-indigo-200/70 text-xs text-indigo-950 leading-relaxed font-medium">
              {currentStageInfo.rbiRule}
            </div>
          </div>

          {/* Teams involved */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-emerald-600" />
              <span>Internal Cross-Functional Teams Responsible</span>
            </span>
            <div className="flex flex-wrap gap-2">
              {currentStageInfo.teams.map((t) => (
                <button
                  key={t}
                  onClick={() => onOpenTeamDrawer(t)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg text-xs font-bold text-slate-800 transition-colors flex items-center gap-1"
                >
                  <span>{t}</span>
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                </button>
              ))}
            </div>
          </div>

          {/* Launch interactive button */}
          <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
            <span className="text-xs text-slate-500">Ready to experience this stage in action?</span>
            <button
              onClick={onStartApplication}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-2"
            >
              <span>Test in Prototype</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* End-to-End API Sequence Diagram Summary */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 space-y-6">
        <div className="max-w-2xl">
          <span className="text-xs font-black uppercase tracking-wider text-blue-400">System Integration Architecture</span>
          <h3 className="text-2xl font-black mt-1">The 4-Entity Lending Relay</h3>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            Direct host-to-host interactions ensuring zero intermediary fund pooling as mandated by the Reserve Bank of India.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          <div className="bg-slate-800/90 p-4 rounded-2xl border border-slate-700 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs">
              01
            </div>
            <h4 className="text-sm font-bold">Borrower App (LSP)</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Presents interface, collects explicit consent, and renders Key Fact Statements.
            </p>
          </div>

          <div className="bg-slate-800/90 p-4 rounded-2xl border border-slate-700 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-xs">
              02
            </div>
            <h4 className="text-sm font-bold">India Stack DPI</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              UIDAI (KYC), DigiLocker/AA (Financial Data), and NPCI (UPI AutoPay Mandates).
            </p>
          </div>

          <div className="bg-slate-800/90 p-4 rounded-2xl border border-slate-700 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold text-xs">
              03
            </div>
            <h4 className="text-sm font-bold">Credit & Risk Engine</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Bureau parsing, fraud graph checks, DTI calculations, and automated sanctioning.
            </p>
          </div>

          <div className="bg-slate-800/90 p-4 rounded-2xl border border-slate-700 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
              04
            </div>
            <h4 className="text-sm font-bold">Regulated Entity (RE)</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Licensed Bank/NBFC executes direct IMPS disbursement into borrower’s bank account.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
