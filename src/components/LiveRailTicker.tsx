import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Zap, Lock, Activity, CheckCircle2, ArrowRight } from 'lucide-react';

interface TickerItem {
  id: string;
  type: 'aadhaar' | 'digilocker' | 'aa' | 'bureau' | 'autopay' | 'disbursement';
  city: string;
  title: string;
  metric: string;
  status: string;
}

const TELEMETRY_FEED: TickerItem[] = [
  {
    id: 't-1',
    type: 'aadhaar',
    city: 'Bengaluru',
    title: 'UIDAI CIDR OTP Auth',
    metric: 'Latency: 184ms',
    status: 'Verified 200 OK'
  },
  {
    id: 't-2',
    type: 'autopay',
    city: 'Mumbai',
    title: 'UPI AutoPay Mandate',
    metric: '₹4,890/mo • HDFC Bank',
    status: 'Active'
  },
  {
    id: 't-3',
    type: 'digilocker',
    city: 'Delhi NCR',
    title: 'DigiLocker Income Tax Pull',
    metric: 'Form 16 • 3.2MB Encrypted',
    status: 'SHA-256 Validated'
  },
  {
    id: 't-4',
    type: 'bureau',
    city: 'Hyderabad',
    title: 'CIBIL / Experian Credit Scoring',
    metric: 'Score: 785 • 0 DPD',
    status: 'Prime Tier'
  },
  {
    id: 't-5',
    type: 'disbursement',
    city: 'Pune',
    title: 'NPCI IMPS Fast Rail Settlement',
    metric: '₹1,50,000 Disbursed',
    status: 'Settled in 1.4s'
  },
  {
    id: 't-6',
    type: 'aa',
    city: 'Chennai',
    title: 'Account Aggregator Consent',
    metric: 'DEPA Financial Statement (6M)',
    status: 'Consent Token Valid'
  }
];

export const LiveRailTicker: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isLive] = useState<boolean>(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TELEMETRY_FEED.length);
    }, 4200);

    return () => clearInterval(timer);
  }, []);

  const current = TELEMETRY_FEED[currentIndex];

  const getIcon = (type: TickerItem['type']) => {
    switch (type) {
      case 'aadhaar':
        return <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />;
      case 'autopay':
        return <Zap className="w-3.5 h-3.5 text-emerald-500" />;
      case 'digilocker':
        return <Lock className="w-3.5 h-3.5 text-indigo-500" />;
      case 'bureau':
        return <Activity className="w-3.5 h-3.5 text-amber-500" />;
      case 'disbursement':
        return <CheckCircle2 className="w-3.5 h-3.5 text-sky-500" />;
      case 'aa':
        return <Activity className="w-3.5 h-3.5 text-teal-500" />;
    }
  };

  return (
    <div className="bg-slate-900/90 backdrop-blur-md border-y border-slate-800 text-xs py-2 px-4 text-slate-300 relative z-20">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: System Status indicator */}
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-bold text-slate-200 tracking-wider text-[11px] uppercase flex items-center gap-1.5">
            India Stack Live Rail Pulse
          </span>
          <span className="hidden sm:inline-block text-slate-600">|</span>
          <span className="hidden sm:inline-block text-[11px] text-slate-400">UIDAI • DigiLocker • NPCI UPI • CRIF</span>
        </div>

        {/* Center: Live AnimatePresence Feed Item */}
        <div className="flex-1 min-w-[280px] max-w-lg overflow-hidden h-6 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-2 text-xs truncate"
            >
              <div className="p-1 rounded bg-slate-800 border border-slate-700">
                {getIcon(current.type)}
              </div>
              <span className="font-semibold text-white">{current.title}</span>
              <span className="text-slate-400 text-[11px]">({current.city})</span>
              <span className="text-blue-400 font-mono text-[11px]">{current.metric}</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-800/60">
                {current.status}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right: Quick Telemetry Stat */}
        <div className="hidden lg:flex items-center gap-4 text-[11px] text-slate-400">
          <div>
            <span className="text-slate-500">Avg Decision:</span> <strong className="text-slate-200 font-mono">42s</strong>
          </div>
          <div>
            <span className="text-slate-500">AutoPay Success:</span> <strong className="text-emerald-400 font-mono">99.8%</strong>
          </div>
        </div>
      </div>
    </div>
  );
};
