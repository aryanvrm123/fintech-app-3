import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Users, CheckCircle2, ShieldCheck, Briefcase, BarChart3, Wrench, ArrowRight, Layers } from 'lucide-react';
import { TEAM_DETAILS } from '../data/mockData';

interface TeamDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTeamName?: string | null;
}

export const TeamDrawer: React.FC<TeamDrawerProps> = ({
  isOpen,
  onClose,
  selectedTeamName
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('ALL');
  const [selectedTeam, setSelectedTeam] = useState<string | null>(selectedTeamName || 'Product');

  const teamList = Object.keys(TEAM_DETAILS);

  const categories: Record<string, string[]> = {
    'ALL': teamList,
    'Core Business': ['Product', 'CX', 'Credit', 'Data Science'],
    'Risk & Compliance': ['KYC/Ops', 'Legal', 'Risk', 'Compliance'],
    'Engineering & Rails': ['Tech', 'Payments', 'Ops']
  };

  const filteredTeams = categories[activeFilter] || teamList;
  const currentDetail = selectedTeam ? TEAM_DETAILS[selectedTeam] : null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            id="team-drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[80] transition-opacity"
          />

          {/* Drawer Container */}
          <motion.div
            id="team-drawer-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-2xl bg-white z-[90] shadow-2xl flex flex-col overflow-hidden border-l border-slate-200"
          >
            {/* Header */}
            <div className="p-6 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-600/20">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-black text-slate-900 tracking-tight">Cross-Functional Blueprint</h2>
                  <p className="text-xs text-slate-500 font-medium">11 Core Departments Powering 100% Digital Lending</p>
                </div>
              </div>
              <button
                id="team-drawer-close-btn"
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-white hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-colors border border-slate-200"
                aria-label="Close drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filter Tabs */}
            <div className="px-6 py-3 bg-white border-b border-slate-100 flex items-center gap-2 overflow-x-auto no-scrollbar">
              {Object.keys(categories).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                    activeFilter === cat
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Main Content Area: Split List & Deep View */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Team Pill Badges */}
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2.5">
                  Select Department to Inspect
                </label>
                <div className="flex flex-wrap gap-2">
                  {filteredTeams.map((teamName) => {
                    const isSelected = selectedTeam === teamName;
                    return (
                      <button
                        key={teamName}
                        id={`team-pill-${teamName.replace(/\//g, '-')}`}
                        onClick={() => setSelectedTeam(teamName)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                          isSelected
                            ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/20 scale-105'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {teamName}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Selected Team Deep Dive Card */}
              {currentDetail ? (
                <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-6 space-y-6 shadow-sm">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-blue-100 text-blue-800 text-[10px] font-black uppercase tracking-wider mb-2">
                        {currentDetail.role}
                      </div>
                      <h3 className="text-2xl font-black text-slate-900">{currentDetail.name}</h3>
                    </div>
                  </div>

                  <p className="text-sm text-slate-700 leading-relaxed bg-white p-4 rounded-xl border border-slate-200/60 shadow-xs">
                    {currentDetail.description}
                  </p>

                  {/* Key Responsibilities */}
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800">
                      <Briefcase className="w-3.5 h-3.5 text-blue-600" />
                      <span>Key Responsibilities</span>
                    </div>
                    <div className="space-y-2">
                      {currentDetail.keyResponsibilities.map((resp, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 bg-white p-3 rounded-lg border border-slate-100 text-xs text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                          <span>{resp}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* KPIs & Target Metrics */}
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800">
                      <BarChart3 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Target Performance Metrics (KPIs)</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {currentDetail.kpis.map((kpi, idx) => (
                        <div key={idx} className="bg-white p-3 rounded-xl border border-slate-200/70 text-center">
                          <p className="text-xs font-bold text-slate-900">{kpi}</p>
                          <span className="text-[10px] uppercase font-semibold text-slate-400">Benchmark SLA</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech Stack & Tooling */}
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800">
                      <Wrench className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Standard Tools & Integrations</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {currentDetail.keyTools.map((tool, idx) => (
                        <span key={idx} className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-800 shadow-xs">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ) : null}

              {/* Cross-Team Handoff Matrix Summary */}
              <div className="bg-slate-900 text-white rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400">
                  <Layers className="w-4 h-4" />
                  <span>The Real-Time Digital Lending Relay</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  In FinFlow’s zero-touch model, borrower identity (KYC/Ops + Legal) links to open banking cashflow (Tech + Data Science), feeds directly into instant credit underwriting (Credit + Compliance), and triggers direct-to-bank instant settlement (Payments + Risk) in under 3 minutes.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-white border-t border-slate-200 flex justify-between items-center text-xs text-slate-500">
              <span>Academic Reference Model: Digital Lending Master Directions</span>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-colors"
              >
                Close View
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
