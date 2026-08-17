import React from 'react';
import { Landmark, ShieldCheck, Scale, ExternalLink, ArrowRight } from 'lucide-react';

interface FooterProps {
  onOpenTeamDrawer: (teamName?: string) => void;
  onNavigateTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenTeamDrawer, onNavigateTab }) => {
  return (
    <footer id="main-footer" className="bg-slate-900 text-white border-t border-slate-800 py-16 px-4 sm:px-6 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10">
        {/* Brand & Project Info */}
        <div className="md:col-span-5 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
              <Landmark className="w-4 h-4" />
            </div>
            <div>
              <span className="font-black text-lg tracking-tight">FinFlow India</span>
              <p className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">DPI Digital Lending Simulation</p>
            </div>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
            An interactive educational model showcasing the operational, technical, and regulatory mechanics of unsecured digital retail lending powered by India Stack public goods.
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-800 border border-slate-700 rounded-lg text-[10px] font-bold text-slate-300 uppercase tracking-wider">
            <span>Academic Architecture Model</span>
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
          </div>
        </div>

        {/* India Stack Rails */}
        <div className="md:col-span-3 space-y-3">
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-200">India Stack Layers</h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li>
              <button onClick={() => onNavigateTab('india-stack')} className="hover:text-white transition-colors text-left">
                Aadhaar (UIDAI e-KYC Auth)
              </button>
            </li>
            <li>
              <button onClick={() => onNavigateTab('india-stack')} className="hover:text-white transition-colors text-left">
                DigiLocker & Account Aggregator
              </button>
            </li>
            <li>
              <button onClick={() => onNavigateTab('india-stack')} className="hover:text-white transition-colors text-left">
                UPI 2.0 AutoPay & e-Mandates
              </button>
            </li>
            <li>
              <button onClick={() => onNavigateTab('india-stack')} className="hover:text-white transition-colors text-left">
                OCEN Protocol & LSPs
              </button>
            </li>
          </ul>
        </div>

        {/* Cross-Functional Blueprint */}
        <div className="md:col-span-4 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-200">11 Org Departments</h4>
            <button
              onClick={() => onOpenTeamDrawer()}
              className="text-[10px] text-blue-400 hover:text-blue-300 font-bold uppercase tracking-wider underline"
            >
              Open Blueprint
            </button>
          </div>
          <div className="grid grid-cols-2 gap-1.5 text-xs text-slate-400">
            {['Product', 'Tech', 'KYC/Ops', 'Risk', 'Legal', 'Credit', 'Data Science', 'Compliance', 'Payments', 'Ops'].map((t) => (
              <button
                key={t}
                onClick={() => onOpenTeamDrawer(t)}
                className="text-left hover:text-white transition-colors py-0.5"
              >
                • {t} Team
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Regulatory & Simulation Notice */}
      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-slate-500 font-medium">
        <p>
          Simulated prototype for educational and analytical study of digital credit delivery in India.
        </p>
        <p>
          Compliant with RBI Digital Lending Guidelines (DLG) 2022 principles.
        </p>
      </div>
    </footer>
  );
};
