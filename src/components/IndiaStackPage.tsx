import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, Smartphone, FileCheck, Landmark, 
  CheckCircle2, ArrowRight, Activity, Sparkles, 
  Layers, Lock, Database, Zap, ExternalLink, Globe, KeyRound
} from 'lucide-react';
import { STACK_LAYERS } from '../data/mockData';
import { StackLayerInfo } from '../types';

interface IndiaStackPageProps {
  onStartApplication: () => void;
}

export const IndiaStackPage: React.FC<IndiaStackPageProps> = ({ onStartApplication }) => {
  const [selectedLayerId, setSelectedLayerId] = useState<string>('aadhaar');

  const activeLayer = STACK_LAYERS.find((l) => l.id === selectedLayerId) || STACK_LAYERS[0];

  const layerComparisonData = [
    {
      metric: 'Traditional Paper Lending',
      identity: 'Physical Xerox of PAN & Aadhaar (Risk of forgery)',
      data: 'Scanned 3-month salary slips & bank PDF stamps',
      payments: 'Physical NACH paper mandate forms (takes 10-15 days)',
      tat: '5 to 7 business days'
    },
    {
      metric: 'India Stack Powered (FinFlow)',
      identity: 'Instant UIDAI XML Auth with 256-bit PKI (< 2s)',
      data: 'Direct Account Aggregator signed JSON data (< 3s)',
      payments: 'UPI AutoPay 2.0 instant e-mandate (< 20s)',
      tat: 'Under 3 minutes end-to-end'
    }
  ];

  return (
    <div id="india-stack-page" className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
          Digital Public Infrastructure (DPI)
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
          The India Stack Architecture
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          How India's open API ecosystem unbundles identity, consent-based financial data exchange, and real-time payment rails to achieve friction-free credit inclusion.
        </p>
      </div>

      {/* Stack Layer Interactive Selector Grid */}
      <div className="grid md:grid-cols-4 gap-4">
        {STACK_LAYERS.map((layer) => {
          const isSelected = layer.id === selectedLayerId;
          return (
            <button
              key={layer.id}
              id={`stack-card-${layer.id}`}
              onClick={() => setSelectedLayerId(layer.id)}
              className={`p-5 rounded-2xl text-left border transition-all flex flex-col justify-between h-48 ${
                isSelected
                  ? 'bg-slate-900 text-white border-slate-900 shadow-xl shadow-slate-900/10 scale-[1.02]'
                  : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${
                  isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
                }`}>
                  {layer.layer === 'Identity' && <ShieldCheck className="w-5 h-5" />}
                  {layer.layer === 'Data' && <FileCheck className="w-5 h-5" />}
                  {layer.layer === 'Payments' && <Smartphone className="w-5 h-5" />}
                  {layer.layer === 'Credit Protocol' && <Zap className="w-5 h-5" />}
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-wider block ${
                  isSelected ? 'text-blue-400' : 'text-blue-600'
                }`}>
                  {layer.layer} Layer
                </span>
                <h3 className="text-base font-black mt-1 leading-snug">{layer.name}</h3>
              </div>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100/20">
                <span className={isSelected ? 'text-slate-400' : 'text-slate-500'}>Latency: {layer.latency}</span>
                <ArrowRight className={`w-3.5 h-3.5 ${isSelected ? 'text-blue-400' : 'text-slate-400'}`} />
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Layer Deep Dive Box */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-8">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                {activeLayer.layer} Pillar
              </span>
              <span className="text-xs text-slate-400 font-semibold">• Governed by {activeLayer.regulatoryBody}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">{activeLayer.name}</h2>
            <p className="text-xs text-slate-500 mt-0.5 font-medium">Provider: {activeLayer.provider}</p>
          </div>

          <div className="bg-slate-50 px-4 py-2 rounded-xl border border-slate-200 text-center">
            <span className="text-[10px] font-bold uppercase text-slate-400 block">Avg Response Latency</span>
            <span className="text-base font-black text-slate-900 font-mono">{activeLayer.latency}</span>
          </div>
        </div>

        {/* Description & Core Impact */}
        <div className="grid md:grid-cols-12 gap-8">
          <div className="md:col-span-6 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Architectural Role</h4>
            <p className="text-sm text-slate-700 leading-relaxed">
              {activeLayer.description}
            </p>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
              <span className="text-xs font-bold text-slate-900 block flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-blue-600" />
                <span>Security & Cryptographic Guarantees</span>
              </span>
              <p className="text-xs text-slate-600 leading-relaxed">
                All communications adhere to end-to-end asymmetric encryption (RSA/ECC with 256-bit keys) with Hardware Security Module (HSM) signing at the gateway layer.
              </p>
            </div>
          </div>

          <div className="md:col-span-6 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">FinTech Value Multipliers</h4>
            <div className="space-y-2.5">
              {activeLayer.benefits.map((b, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
          <span className="text-xs text-slate-500 font-medium">
            FinFlow integrates all 4 layers in a continuous zero-touch borrower flow.
          </span>
          <button
            onClick={onStartApplication}
            className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-2"
          >
            <span>Test {activeLayer.name} in Live Flow</span>
            <ArrowRight className="w-3.5 h-3.5 text-blue-400" />
          </button>
        </div>
      </div>

      {/* Old Physical vs New India Stack Matrix */}
      <div className="space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600">Transformation Analysis</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            Physical Legacy Lending vs. India Stack
          </h2>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                  <th className="p-4">Dimension</th>
                  <th className="p-4 text-red-700">Legacy Physical Loan Flow</th>
                  <th className="p-4 text-teal-700">India Stack (FinFlow)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr>
                  <td className="p-4 font-bold text-slate-900">Identity & KYC</td>
                  <td className="p-4 text-slate-500">Physical photocopies; risk of identity theft & manual data entry error</td>
                  <td className="p-4 font-semibold text-slate-900 bg-teal-50/40">Instant UIDAI XML authentication with OTP verification (&lt; 2s)</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-slate-900">Income Proof</td>
                  <td className="p-4 text-slate-500">Paper bank statements stamped by branch; easy to manipulate</td>
                  <td className="p-4 font-semibold text-slate-900 bg-teal-50/40">Direct DigiLocker & Account Aggregator certified data fetch</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-slate-900">Repayment Mandate</td>
                  <td className="p-4 text-slate-500">Physical NACH forms signed by hand; takes 10–14 days to clear with bank</td>
                  <td className="p-4 font-semibold text-slate-900 bg-teal-50/40">UPI AutoPay 2.0 standing pull mandate configured in 20 seconds</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-slate-900">Turnaround Time (TAT)</td>
                  <td className="p-4 text-slate-500 font-bold text-red-600">5 to 10 business days</td>
                  <td className="p-4 font-black text-teal-700 bg-teal-50/40">&lt; 3 minutes from start to disbursement</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
