import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, Smartphone, FileCheck, Landmark, 
  ArrowRight, CheckCircle2, AlertCircle, Users, 
  Activity, Sparkles, Clock, Lock, ArrowUpRight, Scale, ChevronRight,
  TrendingUp, Zap, Award
} from 'lucide-react';
import { BORROWER_PROFILES, calculateEMI } from '../data/mockData';
import { BorrowerProfile } from '../types';
import { InteractiveStackVisualizer } from './InteractiveStackVisualizer';

interface HomePageProps {
  onStartApplication: (profile?: BorrowerProfile) => void;
  onNavigateTab: (tab: string) => void;
  onOpenTeamDrawer: (teamName?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onStartApplication,
  onNavigateTab,
  onOpenTeamDrawer
}) => {
  const [selectedPersona, setSelectedPersona] = useState<BorrowerProfile>(BORROWER_PROFILES.STRONG);
  const [calcAmount, setCalcAmount] = useState<number>(75000);
  const [calcTenure, setCalcTenure] = useState<number>(12);
  const [calcRate, setCalcRate] = useState<number>(13.5);

  const calculatedEmi = calculateEMI(calcAmount, calcRate, calcTenure);
  const totalRepayable = calculatedEmi * calcTenure;
  const totalInterest = Math.max(0, totalRepayable - calcAmount);
  const interestPercentage = Math.round((totalInterest / totalRepayable) * 100) || 10;

  return (
    <div id="home-page-container" className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="pt-12 sm:pt-16 text-center max-w-4xl mx-auto px-4 sm:px-6 relative">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-700 text-xs font-bold mb-6 border border-blue-200/80 uppercase tracking-wider backdrop-blur-xs shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
          <span>India Stack FinTech Architecture Prototype</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 leading-[1.15] mb-6 tracking-tight"
        >
          Small Loans. <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 bg-clip-text text-transparent">Fully Digital.</span><br />
          From Identity to Disbursement.
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg sm:text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          An end-to-end simulation of an unsecured retail lending journey in India—harnessing <strong className="text-slate-900 font-bold">Aadhaar e-KYC</strong>, <strong className="text-slate-900 font-bold">DigiLocker / AA</strong>, and <strong className="text-slate-900 font-bold">UPI AutoPay</strong> with cross-functional organizational blueprints.
        </motion.p>

        {/* Hero Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-3.5"
        >
          <button
            id="hero-start-application-btn"
            onClick={() => onStartApplication(selectedPersona)}
            className="px-7 py-3.5 bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 text-white rounded-xl font-bold text-sm shadow-xl shadow-slate-900/15 hover:shadow-slate-900/25 flex items-center gap-2 group transition-all transform hover:-translate-y-0.5"
          >
            <span>Launch Loan Journey</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-blue-400" />
          </button>
          
          <button
            id="hero-how-it-works-btn"
            onClick={() => onNavigateTab('how-it-works')}
            className="px-6 py-3.5 bg-white/90 backdrop-blur-xs text-slate-800 border border-slate-200/80 hover:bg-slate-50 hover:border-slate-300 rounded-xl font-bold text-sm shadow-xs transition-all flex items-center gap-2 transform hover:-translate-y-0.5"
          >
            <span>Explore 7-Step Architecture</span>
            <ArrowUpRight className="w-4 h-4 text-slate-400" />
          </button>
        </motion.div>
      </section>

      {/* Key Metric Highlights */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {[
            { label: 'Loan Ticket Range', val: '₹10k - ₹2L', sub: 'Flexible micro to prime', icon: Landmark, color: 'text-blue-600 bg-blue-50' },
            { label: 'Paperless Journey', val: '100%', sub: 'Zero physical documents', icon: FileCheck, color: 'text-emerald-600 bg-emerald-50' },
            { label: 'Underwriting Time', val: '< 60 Sec', sub: 'Automated credit score', icon: Activity, color: 'text-indigo-600 bg-indigo-50' },
            { label: 'Disbursement Rails', val: 'UPI / IMPS', sub: '24x7 instant settlement', icon: Zap, color: 'text-amber-600 bg-amber-50' },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div 
                key={i} 
                id={`stat-card-${i}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                whileHover={{ y: -3 }}
                className="bg-white/80 backdrop-blur-xs border border-slate-200/80 rounded-2xl p-5 text-center shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col items-center justify-between"
              >
                <div className={`p-2 rounded-xl mb-2 ${stat.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <p className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">{stat.val}</p>
                <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mt-1">{stat.label}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{stat.sub}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Interactive Stack Visualizer Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <InteractiveStackVisualizer />
      </section>

      {/* Interactive Quick Loan Simulator & Persona Selector Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-800 relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left: Persona Picker & Details */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold mb-3 border border-blue-400/30">
                  <Activity className="w-3.5 h-3.5 text-blue-400" />
                  <span>Preset Underwriting Scenarios</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight">Select a Borrower Case Study</h2>
                <p className="text-sm text-slate-400 mt-1">
                  Choose a realistic Indian borrower profile to test how the credit decision engine evaluates risk, bureau history, and DTI.
                </p>
              </div>

              {/* Persona Selector Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {Object.values(BORROWER_PROFILES).map((p) => {
                  const isSelected = selectedPersona.id === p.id;
                  return (
                    <button
                      key={p.id}
                      id={`persona-btn-${p.id}`}
                      onClick={() => {
                        setSelectedPersona(p);
                        setCalcAmount(p.requested);
                        setCalcTenure(p.tenureMonths);
                        setCalcRate(p.interestRate);
                      }}
                      className={`p-3.5 rounded-2xl text-left transition-all border ${
                        isSelected
                          ? 'bg-gradient-to-br from-blue-600 to-blue-700 border-blue-400 text-white shadow-lg shadow-blue-600/30 scale-[1.02]'
                          : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800/80 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-bold truncate">{p.name}</span>
                        <span className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded ${
                          p.risk === 'Low' ? 'bg-teal-500/20 text-teal-300' :
                          p.risk === 'Moderate' ? 'bg-amber-500/20 text-amber-300' :
                          'bg-red-500/20 text-red-300'
                        }`}>
                          {p.risk} Risk
                        </span>
                      </div>
                      <p className="text-[11px] opacity-80">{p.employment}</p>
                      <p className="text-xs font-black mt-2">₹{p.income.toLocaleString()}/mo</p>
                    </button>
                  );
                })}
              </div>

              {/* Active Profile Info Box */}
              <div className="bg-slate-900/90 rounded-2xl p-5 border border-slate-800 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Underwriting Outcome</span>
                    <span className={`text-base font-black ${
                      selectedPersona.outcome === 'APPROVED' ? 'text-teal-400' :
                      selectedPersona.outcome === 'REFER' ? 'text-amber-400' : 'text-red-400'
                    }`}>
                      {selectedPersona.outcome === 'APPROVED' ? 'Instant Sanction (Rule Pass)' :
                       selectedPersona.outcome === 'REFER' ? 'Refer to Credit Officer (Thin File)' : 'Declined (High Risk / Defaults)'}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400 block font-medium">Bureau Risk Score</span>
                    <span className="text-lg font-black text-white">{selectedPersona.score} / 900</span>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-3 text-xs text-slate-300">
                  <div>
                    <span className="text-slate-400 font-semibold block mb-1">Key Positive Factors:</span>
                    <ul className="space-y-1">
                      {selectedPersona.positiveFactors.slice(0, 2).map((item, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 text-[11px]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold block mb-1">Risk Observations:</span>
                    <ul className="space-y-1">
                      {selectedPersona.riskFactors.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 text-[11px]">
                          <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Quick EMI Estimator & Action */}
            <div className="lg:col-span-5 bg-white text-slate-900 rounded-2xl p-6 shadow-xl space-y-5 border border-slate-100">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                  <span>Live Loan Estimator</span>
                </h3>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                  {calcRate}% APR
                </span>
              </div>

              {/* Amount Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-slate-600">
                  <span>Loan Amount</span>
                  <span className="text-slate-900 font-black text-sm">₹{calcAmount.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min={10000}
                  max={200000}
                  step={5000}
                  value={calcAmount}
                  onChange={(e) => setCalcAmount(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>₹10,000</span>
                  <span>₹2,00,000</span>
                </div>
              </div>

              {/* Tenure Selector */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-slate-600">
                  <span>Repayment Tenure</span>
                  <span className="text-slate-900 font-black text-sm">{calcTenure} Months</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[3, 6, 12, 24].map((m) => (
                    <button
                      key={m}
                      onClick={() => setCalcTenure(m)}
                      className={`py-1.5 rounded-lg text-xs font-bold border transition-all ${
                        calcTenure === m
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {m}M
                    </button>
                  ))}
                </div>
              </div>

              {/* Output calculation pill */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50/60 border border-blue-100 rounded-xl p-4 space-y-2 text-center">
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-800">Calculated Monthly EMI</span>
                <p className="text-3xl font-black text-blue-900">₹{calculatedEmi.toLocaleString()}</p>
                <div className="flex justify-between text-[11px] text-slate-600 pt-2 border-t border-blue-200/60 font-medium">
                  <span>Principal: ₹{calcAmount.toLocaleString()}</span>
                  <span>Interest: ₹{totalInterest.toLocaleString()}</span>
                </div>
              </div>

              {/* CTA button */}
              <button
                id="estimator-apply-btn"
                onClick={() => {
                  onStartApplication({
                    ...selectedPersona,
                    requested: calcAmount,
                    tenureMonths: calcTenure,
                    interestRate: calcRate
                  });
                }}
                className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-bold text-sm shadow-md shadow-blue-600/20 hover:shadow-blue-600/30 flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
              >
                <span>Proceed with {selectedPersona.name}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* India Stack Advantage Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Digital Public Infrastructure
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-3 mb-2">
            The India Stack Advantage
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-sm sm:text-base">
            How public rails replace physical branch visits, paperwork friction, and multi-day turnarounds with cryptographic certainty.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Identity */}
          <div className="bg-white/90 backdrop-blur-xs border border-slate-200/80 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between border-t-4 border-t-blue-600">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">Identity Layer</span>
              <h3 className="text-xl font-black text-slate-900 mt-1 mb-2">Aadhaar e-KYC</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Instant demographic verification with UIDAI using OTP/biometrics. Provides cryptographically signed proof of identity in &lt; 2 seconds.
              </p>
            </div>
            <button
              onClick={() => onNavigateTab('india-stack')}
              className="text-xs font-bold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1 mt-2"
            >
              <span>Learn about UIDAI Auth API</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Data */}
          <div className="bg-white/90 backdrop-blur-xs border border-slate-200/80 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between border-t-4 border-t-purple-600">
            <div>
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
                <FileCheck className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600">Data & Consent Layer</span>
              <h3 className="text-xl font-black text-slate-900 mt-1 mb-2">DigiLocker & AA</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Pulls authentic PAN cards, Form 26AS, and bank cashflows directly from origin authorities. 100% immune to PDF alterations.
              </p>
            </div>
            <button
              onClick={() => onNavigateTab('india-stack')}
              className="text-xs font-bold text-purple-600 hover:text-purple-800 inline-flex items-center gap-1 mt-2"
            >
              <span>Learn about Consent Specs</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Payments */}
          <div className="bg-white/90 backdrop-blur-xs border border-slate-200/80 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between border-t-4 border-t-teal-600">
            <div>
              <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-4">
                <Smartphone className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-teal-600">Payments & Mandate Layer</span>
              <h3 className="text-xl font-black text-slate-900 mt-1 mb-2">UPI AutoPay</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Recurring pull mandates configured in seconds on the borrower’s UPI handle, paired with 24/7 IMPS loan disbursement directly into the linked account.
              </p>
            </div>
            <button
              onClick={() => onNavigateTab('india-stack')}
              className="text-xs font-bold text-teal-600 hover:text-teal-800 inline-flex items-center gap-1 mt-2"
            >
              <span>Learn about UPI 2.0 Mandates</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Cross-Functional Blueprint Teaser Banner */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-2 text-center md:text-left relative z-10">
            <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-bold uppercase tracking-wider text-blue-400">
              <Users className="w-4 h-4 text-blue-400" />
              <span>Cross-Functional Organizational Structure</span>
            </div>
            <h3 className="text-2xl font-black text-white">Explore How 11 Internal Departments Collaborate</h3>
            <p className="text-sm text-slate-400 max-w-xl">
              From Product Managers and Risk Underwriters to Legal Counsel and Payments Engineers—inspect real SLAs, KPIs, and toolchains for each stage.
            </p>
          </div>
          <button
            onClick={() => onOpenTeamDrawer()}
            className="shrink-0 px-6 py-3 bg-white text-slate-900 hover:bg-slate-100 rounded-xl font-bold text-xs shadow-md transition-all flex items-center gap-2 relative z-10"
          >
            <span>Open Teams Blueprint</span>
            <ArrowRight className="w-3.5 h-3.5 text-blue-600" />
          </button>
        </div>
      </section>
    </div>
  );
};
