import React from 'react';
import { motion } from 'motion/react';
import { Landmark, Users, Sparkles, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenTeamDrawer: () => void;
  onStartApplication: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenTeamDrawer,
  onStartApplication
}) => {
  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'journey', label: 'Application Flow' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'india-stack', label: 'India Stack' },
    { id: 'dashboard', label: 'Portfolio Dashboard' },
  ];

  return (
    <nav id="main-navigation" className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/70 px-4 sm:px-6 py-3 transition-all shadow-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <button
          id="nav-brand-button"
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-3 text-left group transition-transform focus:outline-none"
        >
          <div className="w-10 h-10 bg-gradient-to-tr from-slate-950 via-slate-900 to-blue-900 group-hover:from-blue-700 group-hover:to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-slate-900/15 transition-all transform group-hover:scale-105 border border-slate-800/40">
            <Landmark className="w-5 h-5 text-blue-400 group-hover:text-white transition-colors" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-xl tracking-tight bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 bg-clip-text text-transparent">FinFlow</span>
              <span className="text-[10px] uppercase font-black tracking-widest px-1.5 py-0.5 rounded-full bg-blue-500/10 text-blue-700 border border-blue-200/80">
                India Stack
              </span>
            </div>
            <p className="text-[10px] font-semibold text-slate-500 tracking-wider">Unsecured Digital Lending Engine</p>
          </div>
        </button>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-1 bg-slate-100/90 p-1.5 rounded-full border border-slate-200/80 shadow-inner">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                id={`nav-link-${link.id}`}
                onClick={() => setActiveTab(link.id)}
                className={`relative px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                  isActive
                    ? 'text-slate-900 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabBadge"
                    className="absolute inset-0 bg-white rounded-full shadow-xs border border-slate-200/60 -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {link.label}
              </button>
            );
          })}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Org Blueprint Trigger */}
          <button
            id="nav-org-blueprint-btn"
            onClick={onOpenTeamDrawer}
            className="flex items-center gap-1.5 px-3 py-2 text-slate-700 bg-slate-100/80 hover:bg-slate-200/80 rounded-xl text-xs font-bold transition-all border border-slate-200 hover:scale-[1.02]"
            title="View Cross-Functional Organizational Teams Blueprint"
          >
            <Users className="w-3.5 h-3.5 text-blue-600" />
            <span className="hidden sm:inline">11 Teams Blueprint</span>
            <span className="sm:hidden">Teams</span>
          </button>

          {/* Primary Action Button */}
          <button
            id="nav-apply-now-btn"
            onClick={onStartApplication}
            className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-600/20 hover:shadow-blue-600/35 active:scale-95 transition-all transform hover:-translate-y-0.5"
          >
            <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
            <span>Launch Flow</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="lg:hidden flex items-center gap-1.5 overflow-x-auto py-2 px-1 mt-2 border-t border-slate-100 no-scrollbar">
        {navLinks.map((link) => {
          const isActive = activeTab === link.id;
          return (
            <button
              key={link.id}
              id={`mobile-nav-link-${link.id}`}
              onClick={() => setActiveTab(link.id)}
              className={`shrink-0 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-slate-900 text-white font-bold shadow-xs'
                  : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              {link.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
