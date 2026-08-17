import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, Lock, Landmark, Zap, 
  ArrowRight, CheckCircle2, ChevronRight, Sparkles, 
  RefreshCw, Layers, Database, FileCheck, Award
} from 'lucide-react';

interface LayerData {
  id: string;
  name: string;
  category: string;
  icon: React.ElementType;
  badge: string;
  color: string;
  accent: string;
  bgGrad: string;
  specs: { title: string; desc: string }[];
  simulationLog: string;
}

const LAYERS: LayerData[] = [
  {
    id: 'identity',
    name: '1. Identity & Auth Rail',
    category: 'UIDAI & NSDL Presence-less Layer',
    icon: ShieldCheck,
    badge: 'Aadhaar e-KYC 2.1',
    color: 'text-blue-500',
    accent: 'border-blue-500/40 bg-blue-500/10 text-blue-300',
    bgGrad: 'from-blue-900/30 to-slate-900',
    specs: [
      { title: 'Aadhaar OTP / Face Auth', desc: 'Instant biometric match against UIDAI CIDR' },
      { title: 'NSDL PAN Verification', desc: 'Real-time Income Tax PAN active verification & name match' },
      { title: 'Geo-Tagging & Liveness', desc: 'Anti-spoofing camera liveness and client IP checks' }
    ],
    simulationLog: 'UIDAI Auth Token generated in 210ms • Zero physical photocopy required.'
  },
  {
    id: 'data',
    name: '2. Data & Consent Layer',
    category: 'DEPA & Account Aggregator (AA)',
    icon: Lock,
    badge: 'DigiLocker & AA Ecosystem',
    color: 'text-indigo-500',
    accent: 'border-indigo-500/40 bg-indigo-500/10 text-indigo-300',
    bgGrad: 'from-indigo-900/30 to-slate-900',
    specs: [
      { title: 'DigiLocker Documents', desc: 'Tamper-proof digitally signed Form 16, Aadhaar XML, & Driving License' },
      { title: 'Account Aggregator (AA)', desc: 'Consent-driven encrypted bank statement pull without net banking credentials' },
      { title: 'CRIF & CIBIL Bureau Fetch', desc: 'Real-time DPD and bureau history pull via secure API bridge' }
    ],
    simulationLog: '6-Month bank transaction cashflow analyzed: Average monthly inflow verified.'
  },
  {
    id: 'decision',
    name: '3. Automated Decision Engine',
    category: 'Rules + Bureau Underwriting Engine',
    icon: Database,
    badge: 'BRE + ML Scorecard',
    color: 'text-amber-500',
    accent: 'border-amber-500/40 bg-amber-500/10 text-amber-300',
    bgGrad: 'from-amber-900/30 to-slate-900',
    specs: [
      { title: 'Credit Score Matrix', desc: 'Instant risk tiering (Prime >750, Mid 650-749, Thin-file alternative score)' },
      { title: 'FOIR / DTI Thresholding', desc: 'Caps borrower monthly debt obligations strictly under 50% of verified income' },
      { title: 'Digital KFS Generation', desc: 'Automated Key Fact Statement conforming strictly to RBI guidelines' }
    ],
    simulationLog: 'BRE Score: 785/900 • Sanctioned Loan Limit: ₹75,000 at 13.5% APR in 1.2s.'
  },
  {
    id: 'rails',
    name: '4. Cashless Payment & AutoPay',
    category: 'NPCI UPI 2.0 & e-NACH Network',
    icon: Zap,
    badge: 'UPI AutoPay & IMPS Rails',
    color: 'text-emerald-500',
    accent: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300',
    bgGrad: 'from-emerald-900/30 to-slate-900',
    specs: [
      { title: 'UPI AutoPay Mandate', desc: 'Zero-friction recurring auto-debit consent authenticated with UPI PIN' },
      { title: 'e-Sign (NeSL / Aadhaar)', desc: 'Legally binding loan contract execution via UIDAI OTP e-Signature' },
      { title: 'Instant IMPS Disbursement', desc: 'T+0 direct beneficiary account credit within 30 seconds of sanction' }
    ],
    simulationLog: 'Disbursement Success: ₹72,640 credited to HDFC A/c • Mandate active for ₹6,712/mo.'
  }
];

export const InteractiveStackVisualizer: React.FC = () => {
  const [activeLayerId, setActiveLayerId] = useState<string>('identity');
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simStep, setSimStep] = useState<number>(0);

  const activeLayer = LAYERS.find((l) => l.id === activeLayerId) || LAYERS[0];

  const handleRunFullSimulation = () => {
    setIsSimulating(true);
    setSimStep(0);
    setActiveLayerId('identity');

    const t1 = setTimeout(() => {
      setSimStep(1);
      setActiveLayerId('data');
    }, 1500);

    const t2 = setTimeout(() => {
      setSimStep(2);
      setActiveLayerId('decision');
    }, 3000);

    const t3 = setTimeout(() => {
      setSimStep(3);
      setActiveLayerId('rails');
    }, 4500);

    const t4 = setTimeout(() => {
      setIsSimulating(false);
      setSimStep(4);
    }, 6000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  };

  return (
    <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl relative overflow-hidden">
      {/* Background glowing gradients */}
      <div className="absolute -top-32 -right-32 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800/80 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold mb-2 border border-blue-500/20">
            <Layers className="w-3.5 h-3.5 text-blue-400" />
            <span>Interactive Architecture Visualizer</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            India Stack 4-Layer Digital Lending Engine
          </h3>
          <p className="text-sm text-slate-400 mt-1 max-w-xl">
            Click each architectural tier or trigger the live pipeline simulation to observe the end-to-end data flow.
          </p>
        </div>

        <button
          onClick={handleRunFullSimulation}
          disabled={isSimulating}
          className="self-start md:self-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-blue-600/20 flex items-center gap-2 transition-all disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isSimulating ? 'animate-spin' : ''}`} />
          <span>{isSimulating ? 'Simulating Live Grid...' : 'Run Pipeline Simulation'}</span>
        </button>
      </div>

      {/* Grid: 4 Interactive Layer Selector Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-8 relative z-10">
        {LAYERS.map((layer, index) => {
          const isSelected = activeLayerId === layer.id;
          const Icon = layer.icon;
          const isCurrentSim = isSimulating && simStep === index;

          return (
            <button
              key={layer.id}
              onClick={() => setActiveLayerId(layer.id)}
              className={`p-4 rounded-2xl text-left border transition-all relative overflow-hidden ${
                isSelected
                  ? 'bg-slate-800/90 border-blue-500 shadow-lg shadow-blue-500/10 scale-[1.02]'
                  : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/50 hover:border-slate-700 text-slate-400'
              }`}
            >
              {/* Highlight Pulse Bar if Simulating */}
              {isCurrentSim && (
                <motion.div
                  className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-emerald-400 to-indigo-400"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                />
              )}

              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-xl bg-slate-800 border border-slate-700 ${layer.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${layer.accent}`}>
                  {layer.badge}
                </span>
              </div>

              <h4 className={`text-sm font-bold truncate ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                {layer.name}
              </h4>
              <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">{layer.category}</p>

              {/* Step indicator arrow */}
              <div className="mt-3 flex items-center justify-between text-[11px]">
                <span className="text-slate-500 font-mono">Stage 0{index + 1}</span>
                <span className={`font-semibold flex items-center gap-0.5 ${isSelected ? 'text-blue-400' : 'text-slate-500'}`}>
                  {isSelected ? 'Inspecting' : 'View Layer'}
                  <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Layer Detail & Live Telemetry Inspector */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeLayer.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 relative z-10"
        >
          <div className="grid lg:grid-cols-12 gap-6 items-center">
            {/* Left: Spec Breakdown */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Deep Architectural Spec</span>
                <span className="text-slate-600">•</span>
                <span className="text-xs text-slate-400">{activeLayer.category}</span>
              </div>

              <h4 className="text-xl sm:text-2xl font-black text-white">{activeLayer.name}</h4>

              <div className="space-y-3 pt-1">
                {activeLayer.specs.map((spec, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                    <div className="p-1 rounded-md bg-blue-500/10 text-blue-400 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-slate-200">{spec.title}</h5>
                      <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{spec.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Real-time Terminal Log Simulation Card */}
            <div className="lg:col-span-5 bg-slate-950 rounded-2xl p-5 border border-slate-800 font-mono text-xs space-y-3 shadow-inner">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-[11px] text-slate-400">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-slate-300 font-sans font-bold">Rail Terminal Telemetry</span>
                </div>
                <span className="text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> LIVE
                </span>
              </div>

              <div className="space-y-2 text-[11px] leading-relaxed">
                <div className="text-slate-500">// Connected to API Gateway v2.4</div>
                <div className="text-blue-400">&gt; GET /api/v2/stack/{activeLayer.id}/telemetry</div>
                <div className="text-slate-300 bg-slate-900/90 p-2.5 rounded-lg border border-slate-800/80 text-[11px]">
                  {activeLayer.simulationLog}
                </div>
                <div className="flex items-center justify-between text-slate-500 text-[10px] pt-1">
                  <span>TLS 1.3 256-bit Encrypted</span>
                  <span className="text-emerald-400 font-bold">200 OK</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
