import React, { useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { Users } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { AmbientBackground } from './components/AmbientBackground';
import { LiveRailTicker } from './components/LiveRailTicker';
import { HomePage } from './components/HomePage';
import { ApplicationJourney } from './components/ApplicationJourney';
import { HowItWorksPage } from './components/HowItWorksPage';
import { IndiaStackPage } from './components/IndiaStackPage';
import { DashboardPage } from './components/DashboardPage';
import { TeamDrawer } from './components/TeamDrawer';
import { Footer } from './components/Footer';
import { BORROWER_PROFILES, INITIAL_ACTIVE_LOAN } from './data/mockData';
import { BorrowerProfile, ActiveLoan } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedProfile, setSelectedProfile] = useState<BorrowerProfile>(BORROWER_PROFILES.STRONG);
  const [activeLoan, setActiveLoan] = useState<ActiveLoan>(INITIAL_ACTIVE_LOAN);
  const [isTeamDrawerOpen, setIsTeamDrawerOpen] = useState<boolean>(false);
  const [inspectTeamName, setInspectTeamName] = useState<string | null>(null);

  // Top Scroll Progress Bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const handleOpenTeamDrawer = (teamName?: string) => {
    if (teamName) setInspectTeamName(teamName);
    setIsTeamDrawerOpen(true);
  };

  const handleStartApplication = (profile?: BorrowerProfile) => {
    if (profile) setSelectedProfile(profile);
    setActiveTab('journey');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoanDisbursed = (newLoan: ActiveLoan) => {
    setActiveLoan(newLoan);
  };

  const handlePayNextEmi = () => {
    setActiveLoan((prev) => {
      const updatedEmis = [...prev.emis];
      const nextDueIndex = updatedEmis.findIndex((e) => e.status === 'DUE' || e.status === 'UPCOMING');
      
      if (nextDueIndex !== -1) {
        updatedEmis[nextDueIndex] = {
          ...updatedEmis[nextDueIndex],
          status: 'PAID'
        };

        // If there's a subsequent EMI, mark it as DUE
        if (nextDueIndex + 1 < updatedEmis.length) {
          updatedEmis[nextDueIndex + 1] = {
            ...updatedEmis[nextDueIndex + 1],
            status: 'DUE'
          };
        }
      }

      return {
        ...prev,
        emis: updatedEmis
      };
    });
  };

  return (
    <div id="finflow-root" className="min-h-screen bg-slate-50/50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-700 flex flex-col justify-between relative">
      {/* Dynamic Animated Ambient Background Canvas */}
      <AmbientBackground />

      {/* Scroll Progress Bar */}
      <motion.div
        id="scroll-progress-bar"
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 origin-left z-[100]"
        style={{ scaleX }}
      />

      {/* Main Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenTeamDrawer={() => handleOpenTeamDrawer()}
        onStartApplication={() => handleStartApplication()}
      />

      {/* Real-time India Stack Telemetry Ticker */}
      <LiveRailTicker />

      {/* Main Content Area */}
      <main id="main-content-viewport" className="flex-1 relative z-10">
        {activeTab === 'home' && (
          <HomePage
            onStartApplication={handleStartApplication}
            onNavigateTab={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenTeamDrawer={handleOpenTeamDrawer}
          />
        )}

        {activeTab === 'journey' && (
          <ApplicationJourney
            initialProfile={selectedProfile}
            onOpenTeamDrawer={handleOpenTeamDrawer}
            onLoanDisbursed={handleLoanDisbursed}
            onNavigateToDashboard={() => {
              setActiveTab('dashboard');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'how-it-works' && (
          <HowItWorksPage
            onStartApplication={() => handleStartApplication()}
            onOpenTeamDrawer={handleOpenTeamDrawer}
          />
        )}

        {activeTab === 'india-stack' && (
          <IndiaStackPage
            onStartApplication={() => handleStartApplication()}
          />
        )}

        {activeTab === 'dashboard' && (
          <DashboardPage
            activeLoan={activeLoan}
            onPayNextEmi={handlePayNextEmi}
            onStartNewApplication={() => handleStartApplication()}
          />
        )}
      </main>

      {/* Floating Team Context Quick-Access Button */}
      <div className="fixed bottom-6 right-6 z-[60]">
        <button
          id="floating-team-context-btn"
          onClick={() => handleOpenTeamDrawer()}
          className="flex items-center gap-2 px-4 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all font-bold group border border-slate-700"
          title="Open Cross-Functional Org Teams Blueprint"
        >
          <Users className="w-4 h-4 text-blue-400 group-hover:rotate-12 transition-transform" />
          <span className="text-xs uppercase tracking-wider">11 Org Teams</span>
        </button>
      </div>

      {/* Cross-Functional Team Drawer */}
      <TeamDrawer
        isOpen={isTeamDrawerOpen}
        onClose={() => setIsTeamDrawerOpen(false)}
        selectedTeamName={inspectTeamName}
      />

      {/* Global Footer */}
      <Footer
        onOpenTeamDrawer={handleOpenTeamDrawer}
        onNavigateTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
