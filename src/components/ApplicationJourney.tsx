import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { 
  ShieldCheck, Smartphone, FileCheck, Landmark, 
  ArrowRight, ArrowLeft, CheckCircle2, AlertCircle, Users, 
  Activity, Sparkles, Clock, Lock, RefreshCw, FileText, 
  Check, CreditCard, ChevronRight, Scale, Info, Download, 
  ExternalLink, DollarSign, Calendar, Scan, Fingerprint
} from 'lucide-react';
import { STEPS, BORROWER_PROFILES, TEAM_DETAILS, calculateEMI, generateEMISchedule } from '../data/mockData';
import { BorrowerProfile, JourneyStep, ActiveLoan } from '../types';

interface ApplicationJourneyProps {
  initialProfile?: BorrowerProfile | null;
  onOpenTeamDrawer: (teamName?: string) => void;
  onLoanDisbursed: (loan: ActiveLoan) => void;
  onNavigateToDashboard: () => void;
}

export const ApplicationJourney: React.FC<ApplicationJourneyProps> = ({
  initialProfile,
  onOpenTeamDrawer,
  onLoanDisbursed,
  onNavigateToDashboard
}) => {
  const [journeyStep, setJourneyStep] = useState<number>(1);
  const [selectedProfile, setSelectedProfile] = useState<BorrowerProfile>(initialProfile || BORROWER_PROFILES.STRONG);
  
  // Step 1 Custom Input States
  const [loanAmount, setLoanAmount] = useState<number>(initialProfile?.requested || 75000);
  const [tenure, setTenure] = useState<number>(initialProfile?.tenureMonths || 12);
  const [loanPurpose, setLoanPurpose] = useState<string>('Medical & Health Emergency');

  // Step 2 OTP State
  const [otpDigits, setOtpDigits] = useState<string[]>(['8', '4', '1', '9', '2', '0']);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState<boolean>(false);
  const [isOtpVerified, setIsOtpVerified] = useState<boolean>(false);

  // Step 3 DigiLocker Fetch States
  const [isFetchingDocs, setIsFetchingDocs] = useState<boolean>(false);
  const [docsFetched, setDocsFetched] = useState<{ pan: boolean; tax: boolean; bank: boolean }>({
    pan: false,
    tax: false,
    bank: false
  });

  // Step 5 KFS Agree State
  const [kfsAgreed, setKfsAgreed] = useState<boolean>(false);

  // Step 6 UPI AutoPay State
  const [vpaHandle, setVpaHandle] = useState<string>('aditya@okaxis');
  const [isMandateAuthorized, setIsMandateAuthorized] = useState<boolean>(false);

  // Step 7 Disbursement State
  const [disbursementTxnId, setDisbursementTxnId] = useState<string>('');

  const currentStepData: JourneyStep = STEPS[journeyStep - 1];

  // Confetti trigger when Step 7 is active
  useEffect(() => {
    if (journeyStep === 7) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
      const timeout = setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 }
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 }
        });
      }, 400);
      return () => clearTimeout(timeout);
    }
  }, [journeyStep]);

  // Sync profile if initialProfile changes
  useEffect(() => {
    if (initialProfile) {
      setSelectedProfile(initialProfile);
      setLoanAmount(initialProfile.requested);
      setTenure(initialProfile.tenureMonths);
      if (initialProfile.id === 'strong') setVpaHandle('aditya@okaxis');
      else if (initialProfile.id === 'thin') setVpaHandle('ishani@okhdfcbank');
      else setVpaHandle('rajesh@paytm');
    }
  }, [initialProfile]);

  const currentEmi = calculateEMI(loanAmount, selectedProfile.interestRate, tenure);

  const handleNext = () => {
    if (journeyStep === 1) {
      setJourneyStep(2);
    } else if (journeyStep === 2) {
      if (!isOtpVerified) {
        setIsOtpVerified(true);
      }
      setJourneyStep(3);
    } else if (journeyStep === 3) {
      setJourneyStep(4);
    } else if (journeyStep === 4) {
      setJourneyStep(5);
    } else if (journeyStep === 5) {
      setJourneyStep(6);
    } else if (journeyStep === 6) {
      // Create transaction ID and trigger disbursement
      const newTxn = `TXN-IN-${Math.floor(10000000 + Math.random() * 90000000)}`;
      setDisbursementTxnId(newTxn);
      
      const newLoan: ActiveLoan = {
        loanId: `FL-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`,
        borrowerName: selectedProfile.name,
        sanctionedAmount: loanAmount,
        disbursedAmount: loanAmount - selectedProfile.processingFee,
        interestRate: selectedProfile.interestRate,
        tenureMonths: tenure,
        monthlyEmi: currentEmi,
        disbursementDate: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        nextEmiDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        mandateStatus: 'ACTIVE',
        vpa: vpaHandle,
        bankName: selectedProfile.id === 'strong' ? 'HDFC Bank Ltd.' : selectedProfile.id === 'thin' ? 'ICICI Bank Ltd.' : 'State Bank of India',
        accountNumberMasked: '•••• •••• ' + selectedProfile.aadhaarMasked.slice(-4),
        loanStatus: 'ACTIVE',
        emis: generateEMISchedule(loanAmount, selectedProfile.interestRate, tenure)
      };

      onLoanDisbursed(newLoan);
      setJourneyStep(7);
    }
  };

  const handlePrev = () => {
    setJourneyStep(prev => Math.max(prev - 1, 1));
  };

  const triggerDigiLockerFetch = () => {
    setIsFetchingDocs(true);
    setTimeout(() => setDocsFetched(prev => ({ ...prev, pan: true })), 500);
    setTimeout(() => setDocsFetched(prev => ({ ...prev, tax: true })), 1100);
    setTimeout(() => {
      setDocsFetched(prev => ({ ...prev, bank: true }));
      setIsFetchingDocs(false);
    }, 1700);
  };

  const renderStepContent = () => {
    switch (journeyStep) {
      case 1: // Application Form & Borrower Selection
        return (
          <div className="space-y-6">
            {/* Scenario Quick Selector */}
            <div className="bg-blue-50/80 border border-blue-200/70 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black uppercase tracking-wider text-blue-900 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-blue-600" />
                  <span>Select Test Persona Scenario</span>
                </span>
                <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
                  Underwriting Simulation
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {Object.values(BORROWER_PROFILES).map((p) => {
                  const isSelected = selectedProfile.id === p.id;
                  return (
                    <button
                      key={p.id}
                      id={`step1-profile-btn-${p.id}`}
                      onClick={() => {
                        setSelectedProfile(p);
                        setLoanAmount(p.requested);
                        setTenure(p.tenureMonths);
                        if (p.id === 'strong') setVpaHandle('aditya@okaxis');
                        else if (p.id === 'thin') setVpaHandle('ishani@okhdfcbank');
                        else setVpaHandle('rajesh@paytm');
                      }}
                      className={`p-3 rounded-xl text-left border transition-all text-xs ${
                        isSelected
                          ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/20 font-bold'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-0.5">
                        <span className="font-bold truncate">{p.name}</span>
                        <span className={`text-[8px] font-black uppercase px-1 py-0.2 rounded ${
                          isSelected ? 'bg-white/20 text-white' :
                          p.risk === 'Low' ? 'bg-teal-100 text-teal-800' :
                          p.risk === 'Moderate' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {p.risk}
                        </span>
                      </div>
                      <p className="text-[10px] opacity-80">{p.employment}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Borrower Details Display */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase text-slate-500 tracking-wider">Applicant Full Name</label>
                <input
                  type="text"
                  readOnly
                  value={selectedProfile.name}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase text-slate-500 tracking-wider">Mobile Number (Linked to Aadhaar)</label>
                <input
                  type="text"
                  readOnly
                  value={selectedProfile.phone}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase text-slate-500 tracking-wider">Monthly Stated Income</label>
                <input
                  type="text"
                  readOnly
                  value={`₹${selectedProfile.income.toLocaleString()} (${selectedProfile.employment})`}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase text-slate-500 tracking-wider">Loan Purpose</label>
                <select
                  value={loanPurpose}
                  onChange={(e) => setLoanPurpose(e.target.value)}
                  className="w-full p-3 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 outline-none focus:border-blue-500"
                >
                  <option>Medical & Health Emergency</option>
                  <option>Home Renovation & Repairs</option>
                  <option>Education & Skill Certification</option>
                  <option>Business Working Capital</option>
                  <option>Debt Consolidation</option>
                </select>
              </div>
            </div>

            {/* Amount & Tenure Adjusters */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold uppercase text-slate-600">Requested Capital</span>
                <span className="text-lg font-black text-slate-900">₹{loanAmount.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min={10000}
                max={200000}
                step={5000}
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />

              <div className="flex justify-between items-center pt-2">
                <span className="text-xs font-bold uppercase text-slate-600">Tenure</span>
                <div className="flex gap-2">
                  {[3, 6, 12, 24].map((m) => (
                    <button
                      key={m}
                      onClick={() => setTenure(m)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold border transition-all ${
                        tenure === m
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-white text-slate-700 border-slate-200'
                      }`}
                    >
                      {m} Months
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white p-3 rounded-xl border border-slate-200/70 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Estimated EMI @ {selectedProfile.interestRate}%:</span>
                <span className="font-black text-blue-600 text-sm">₹{currentEmi.toLocaleString()} / mo</span>
              </div>
            </div>
          </div>
        );

      case 2: // Identity & UIDAI Aadhaar Verification
        return (
          <div className="space-y-6">
            <div className="text-center py-4 max-w-md mx-auto">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-blue-200/80 shadow-xs">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-1">UIDAI Aadhaar Authentication</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                A 6-digit OTP has been dispatched to the mobile number linked with Aadhaar ID{' '}
                <strong className="text-slate-900 font-bold">{selectedProfile.aadhaarMasked}</strong>.
              </p>
            </div>

            {/* OTP Box */}
            <div className="max-w-xs mx-auto space-y-4">
              <div className="flex justify-center gap-2">
                {otpDigits.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`otp-input-${idx}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => {
                      const val = e.target.value;
                      const nextDigits = [...otpDigits];
                      nextDigits[idx] = val;
                      setOtpDigits(nextDigits);
                    }}
                    className="w-11 h-12 text-center text-lg font-black bg-white border-2 border-slate-200 focus:border-blue-600 rounded-xl outline-none shadow-xs transition-colors"
                  />
                ))}
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Resend OTP in 24s</span>
                <button
                  onClick={() => setOtpDigits(['8', '4', '1', '9', '2', '0'])}
                  className="text-blue-600 font-bold hover:underline"
                >
                  Auto-Fill Demo OTP
                </button>
              </div>

              <button
                id="verify-otp-btn"
                onClick={() => {
                  setIsVerifyingOtp(true);
                  setTimeout(() => {
                    setIsVerifyingOtp(false);
                    setIsOtpVerified(true);
                  }, 800);
                }}
                disabled={isVerifyingOtp || isOtpVerified}
                className={`w-full py-3.5 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 ${
                  isOtpVerified
                    ? 'bg-teal-600 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/20'
                }`}
              >
                {isVerifyingOtp ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Communicating with UIDAI...</span>
                  </>
                ) : isOtpVerified ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Identity Verified (e-KYC Passed)</span>
                  </>
                ) : (
                  <span>Verify Identity OTP</span>
                )}
              </button>
            </div>

            {/* e-KYC Verified Record Card */}
            {isOtpVerified && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-teal-50 border border-teal-200/80 rounded-2xl p-4 flex items-center justify-between gap-4 max-w-lg mx-auto"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-sm">
                    {selectedProfile.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-teal-950">{selectedProfile.name}</h4>
                    <p className="text-[11px] text-teal-700">DOB: 14/05/1995 • Gender: Male • UIDAI Signed</p>
                  </div>
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider bg-teal-200/60 text-teal-900 px-2 py-1 rounded-md">
                  KYC Validated
                </span>
              </motion.div>
            )}
          </div>
        );

      case 3: // Documents & DigiLocker Fetch
        return (
          <div className="space-y-6">
            {/* DigiLocker Consent Header */}
            <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-2xl border border-purple-200/80">
              <div className="w-12 h-12 bg-purple-700 rounded-xl flex items-center justify-center text-white font-black text-sm shadow-md shadow-purple-700/20">
                DL
              </div>
              <div>
                <h4 className="font-bold text-purple-950 text-sm">DigiLocker & Account Aggregator Consent</h4>
                <p className="text-xs text-purple-700">
                  Direct authority-to-lender encrypted data channel under ReBIT & MeitY specifications.
                </p>
              </div>
            </div>

            {/* Document checklist */}
            <div className="space-y-3">
              {[
                { 
                  id: 'pan',
                  name: 'Permanent Account Number (PAN Card)', 
                  issuer: 'Income Tax Department (ITD / NSDL)',
                  docNo: selectedProfile.pan,
                  verified: docsFetched.pan || isOtpVerified
                },
                { 
                  id: 'tax',
                  name: 'Form 26AS & Income Tax Return Assessment', 
                  issuer: 'Central Board of Direct Taxes (CBDT)',
                  docNo: 'AY 2024-25 Filed',
                  verified: docsFetched.tax || isOtpVerified
                },
                { 
                  id: 'bank',
                  name: '6-Month Bank Statement (Account Aggregator)', 
                  issuer: selectedProfile.id === 'strong' ? 'HDFC Bank Core' : 'ICICI Bank Core',
                  docNo: 'AA Consent Approved',
                  verified: docsFetched.bank || isOtpVerified
                }
              ].map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-4 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 transition-colors"
                >
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-slate-800">{doc.name}</p>
                    <p className="text-[11px] text-slate-400">Issuer: {doc.issuer} • <span className="font-mono text-slate-600">{doc.docNo}</span></p>
                  </div>
                  <div className="flex items-center gap-2">
                    {doc.verified ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-teal-700 bg-teal-50 px-2 py-1 rounded-md border border-teal-200">
                        <Check className="w-3.5 h-3.5 text-teal-600" />
                        <span>Fetched & Signed</span>
                      </span>
                    ) : (
                      <span className="text-[11px] text-slate-400 font-medium">Pending Fetch</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Action to trigger fetch */}
            <div className="text-center pt-2">
              <button
                id="fetch-digilocker-btn"
                onClick={triggerDigiLockerFetch}
                disabled={isFetchingDocs}
                className="px-5 py-2.5 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-bold shadow-md shadow-purple-700/20 transition-all flex items-center justify-center gap-2 mx-auto"
              >
                {isFetchingDocs ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Querying DigiLocker & AA Gateways...</span>
                  </>
                ) : (
                  <>
                    <FileCheck className="w-3.5 h-3.5" />
                    <span>Re-fetch Verified Authority Records</span>
                  </>
                )}
              </button>
            </div>
          </div>
        );

      case 4: // AI Underwriting & Risk Assessment
        return (
          <div className="space-y-6">
            {/* Top Score Banner */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-900 text-white rounded-2xl shadow-lg">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400">
                  Credit Intelligence Model 4.2
                </span>
                <h3 className="text-xl font-black">{selectedProfile.name}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{selectedProfile.employment}</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Risk Category</span>
                  <span className={`text-xs font-black uppercase px-2 py-0.5 rounded ${
                    selectedProfile.risk === 'Low' ? 'bg-teal-500/20 text-teal-300' :
                    selectedProfile.risk === 'Moderate' ? 'bg-amber-500/20 text-amber-300' : 'bg-red-500/20 text-red-300'
                  }`}>
                    {selectedProfile.risk} Risk Tier
                  </span>
                </div>
                <div className="w-14 h-14 rounded-xl bg-blue-600 text-white flex flex-col items-center justify-center font-black">
                  <span className="text-lg leading-none">{selectedProfile.score}</span>
                  <span className="text-[8px] uppercase tracking-wider text-blue-200">Score</span>
                </div>
              </div>
            </div>

            {/* Key Ratios Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 text-center">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Debt-To-Income</span>
                <p className="text-lg font-black text-slate-900 mt-1">{selectedProfile.dti}%</p>
                <span className="text-[9px] text-slate-500 font-medium">{selectedProfile.dti < 40 ? 'Healthy Cap' : 'Stretched'}</span>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 text-center">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Bureau History</span>
                <p className="text-sm font-black text-slate-900 mt-1 truncate">{selectedProfile.history.split(' ')[0]}</p>
                <span className="text-[9px] text-slate-500 font-medium">CIBIL Verified</span>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 text-center">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Max Eligible Limit</span>
                <p className="text-lg font-black text-blue-600 mt-1">₹{(selectedProfile.income * 2.5).toLocaleString()}</p>
                <span className="text-[9px] text-slate-500 font-medium">Based on Cashflow</span>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 text-center">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Risk Spread</span>
                <p className="text-lg font-black text-slate-900 mt-1">{selectedProfile.interestRate}%</p>
                <span className="text-[9px] text-slate-500 font-medium">Annualized Rate</span>
              </div>
            </div>

            {/* Positive vs Risk Factors */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-teal-50/70 border border-teal-200/70 rounded-xl p-4 space-y-2">
                <span className="text-xs font-bold text-teal-900 uppercase tracking-wider block">Positive Underwriting Signals</span>
                <ul className="space-y-1.5 text-xs text-teal-800">
                  {selectedProfile.positiveFactors.map((f, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-amber-50/70 border border-amber-200/70 rounded-xl p-4 space-y-2">
                <span className="text-xs font-bold text-amber-900 uppercase tracking-wider block">Identified Risk Factors</span>
                <ul className="space-y-1.5 text-xs text-amber-800">
                  {selectedProfile.riskFactors.map((f, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );

      case 5: // Loan Decision & Key Fact Statement (KFS)
        return (
          <div className="space-y-6">
            {/* Sanction Status Pill */}
            <div className={`p-5 rounded-2xl text-center border ${
              selectedProfile.outcome === 'APPROVED' ? 'bg-teal-50 border-teal-200 text-teal-900' :
              selectedProfile.outcome === 'REFER' ? 'bg-amber-50 border-amber-200 text-amber-900' :
              'bg-red-50 border-red-200 text-red-900'
            }`}>
              <div className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3 ${
                selectedProfile.outcome === 'APPROVED' ? 'bg-teal-600 text-white' :
                selectedProfile.outcome === 'REFER' ? 'bg-amber-600 text-white' : 'bg-red-600 text-white'
              }`}>
                {selectedProfile.outcome === 'APPROVED' ? <CheckCircle2 className="w-8 h-8" /> :
                 selectedProfile.outcome === 'REFER' ? <Info className="w-8 h-8" /> : <AlertCircle className="w-8 h-8" />}
              </div>
              <h3 className="text-xl font-black">
                {selectedProfile.outcome === 'APPROVED' ? 'Sanction Approved via STP Rails' :
                 selectedProfile.outcome === 'REFER' ? 'Application Referred to Senior Underwriter' :
                 'Application Not Eligible at Current Risk Score'}
              </h3>
              <p className="text-xs opacity-90 mt-1 max-w-md mx-auto">
                {selectedProfile.outcome === 'APPROVED'
                  ? 'Straight-Through Processing (STP) enabled. Your digital loan sanction letter and Key Fact Statement (KFS) are generated below.'
                  : selectedProfile.notes}
              </p>
            </div>

            {/* Key Fact Statement Table (RBI DLG Compliance) */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex justify-between items-center">
                <span className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-blue-600" />
                  <span>Key Fact Statement (KFS) - RBI DLG Format</span>
                </span>
                <span className="text-[10px] font-bold text-slate-500">Document Ref: KFS-2024-884</span>
              </div>

              <div className="divide-y divide-slate-100 text-xs">
                <div className="grid grid-cols-2 p-3">
                  <span className="text-slate-500 font-medium">Sanctioned Principal Amount</span>
                  <span className="text-right font-black text-slate-900">₹{loanAmount.toLocaleString()}</span>
                </div>
                <div className="grid grid-cols-2 p-3">
                  <span className="text-slate-500 font-medium">Annual Percentage Rate (APR)</span>
                  <span className="text-right font-black text-blue-600">{selectedProfile.interestRate}% p.a. (Reducing)</span>
                </div>
                <div className="grid grid-cols-2 p-3">
                  <span className="text-slate-500 font-medium">Monthly Installment (EMI)</span>
                  <span className="text-right font-black text-slate-900">₹{currentEmi.toLocaleString()} / mo ({tenure} months)</span>
                </div>
                <div className="grid grid-cols-2 p-3">
                  <span className="text-slate-500 font-medium">Upfront Processing Fee (incl. 18% GST)</span>
                  <span className="text-right font-black text-slate-900">₹{selectedProfile.processingFee} (Deducted from disbursement)</span>
                </div>
                <div className="grid grid-cols-2 p-3">
                  <span className="text-slate-500 font-medium">Net Disbursable Capital</span>
                  <span className="text-right font-black text-teal-700">₹{(loanAmount - selectedProfile.processingFee).toLocaleString()}</span>
                </div>
                <div className="grid grid-cols-2 p-3">
                  <span className="text-slate-500 font-medium">Mandatory Cooling-off / Look-up Period</span>
                  <span className="text-right font-bold text-slate-700">3 Days (Zero Penalty Exit)</span>
                </div>
              </div>
            </div>

            {/* Borrower Agreement Checkbox */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-3">
              <input
                id="kfs-agree-checkbox"
                type="checkbox"
                checked={kfsAgreed}
                onChange={(e) => setKfsAgreed(e.target.checked)}
                className="w-4 h-4 mt-0.5 text-blue-600 rounded cursor-pointer accent-blue-600"
              />
              <label htmlFor="kfs-agree-checkbox" className="text-xs text-slate-600 cursor-pointer leading-relaxed">
                I have reviewed the Key Fact Statement (KFS), repayment amortization schedule, and terms of the unsecured credit agreement. I give consent to set up an electronic repayment mandate.
              </label>
            </div>
          </div>
        );

      case 6: // Repayment Mandate & UPI AutoPay Setup
        return (
          <div className="space-y-6">
            {/* AutoPay Digital Card */}
            <div className="p-6 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl text-white shadow-xl space-y-6">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-6 h-6 text-blue-200" />
                  <span className="text-xs font-black uppercase tracking-wider text-blue-100">NPCI UPI AutoPay 2.0</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase tracking-widest text-blue-200 block">Bank Handle</span>
                  <span className="text-xs font-mono font-bold">{vpaHandle}</span>
                </div>
              </div>

              <div>
                <span className="text-xs uppercase tracking-widest text-blue-200 block mb-1">Recurring Monthly Pull Amount</span>
                <p className="text-3xl font-black">₹{currentEmi.toLocaleString()}</p>
                <span className="text-[11px] text-blue-100 mt-1 block">Due on 15th of every month for {tenure} installments</span>
              </div>

              <div className="pt-4 border-t border-blue-400/30 flex justify-between items-center text-xs text-blue-100">
                <span>Maximum Mandate Cap: ₹15,000</span>
                <span className="flex items-center gap-1 font-bold"><Lock className="w-3.5 h-3.5" /> 256-Bit e-Mandate</span>
              </div>
            </div>

            {/* UPI Handle input & validation */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-slate-500 tracking-wider">Borrower Virtual Payment Address (VPA)</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={vpaHandle}
                  onChange={(e) => setVpaHandle(e.target.value)}
                  className="flex-1 p-3 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 outline-none focus:border-blue-500"
                  placeholder="e.g. yourname@okhdfcbank"
                />
                <button
                  onClick={() => setIsMandateAuthorized(true)}
                  className="px-4 py-3 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-all"
                >
                  Verify VPA
                </button>
              </div>
              <p className="text-[11px] text-slate-400">
                A ₹1 verification authorization token will be initiated to confirm account binding on NPCI rails.
              </p>
            </div>

            {/* Confirmation status banner */}
            {isMandateAuthorized && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-teal-50 border border-teal-200 rounded-xl p-4 flex items-center justify-between text-xs text-teal-800"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600" />
                  <span>UPI AutoPay Mandate Pre-Authorized with NPCI Bharat e-Mandate</span>
                </div>
                <span className="font-bold text-teal-900 font-mono">UMN: 90218419</span>
              </motion.div>
            )}
          </div>
        );

      case 7: // Real-time Disbursement & Settlement
        return (
          <div className="text-center py-6 space-y-6">
            <div className="relative w-28 h-28 mx-auto">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border-4 border-teal-500 border-t-transparent"
              />
              <div className="absolute inset-2 bg-teal-50 rounded-full flex items-center justify-center text-teal-600 shadow-inner">
                <Landmark className="w-12 h-12" />
              </div>
            </div>

            <div>
              <span className="text-xs font-black uppercase tracking-widest text-teal-600 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
                Disbursement Success
              </span>
              <h3 className="text-3xl font-black text-slate-900 mt-3">
                ₹{(loanAmount - selectedProfile.processingFee).toLocaleString()} Disbursed
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
                Net loan proceeds have been instantly credited to{' '}
                <strong className="text-slate-800 font-bold">{selectedProfile.name}</strong>'s bank account linked to VPA{' '}
                <strong className="text-slate-800 font-bold">{vpaHandle}</strong>.
              </p>
            </div>

            {/* Receipt info card */}
            <div className="max-w-md mx-auto bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-left grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase">UTR / Reference ID</span>
                <p className="font-mono font-bold text-slate-900 text-xs mt-0.5">{disbursementTxnId || 'TXN-IN-8841920'}</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase">Payment Rail</span>
                <p className="font-bold text-slate-900 text-xs mt-0.5">IMPS Host-to-Host (24x7)</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase">First EMI Date</span>
                <p className="font-bold text-slate-900 text-xs mt-0.5">15th Oct 2024</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase">AutoPay Mandate</span>
                <p className="font-bold text-teal-700 text-xs mt-0.5">Active on {vpaHandle}</p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <button
                id="view-active-portfolio-btn"
                onClick={onNavigateToDashboard}
                className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center gap-2"
              >
                <span>View in Portfolio Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5 text-blue-400" />
              </button>
              <button
                onClick={() => {
                  setJourneyStep(1);
                  setIsOtpVerified(false);
                  setDocsFetched({ pan: false, tax: false, bank: false });
                  setKfsAgreed(false);
                  setIsMandateAuthorized(false);
                }}
                className="px-5 py-3.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 font-bold text-xs rounded-xl transition-all flex items-center gap-2"
              >
                <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
                <span>Test Another Profile</span>
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div id="application-journey-container" className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      {/* Step Header & Indicator */}
      <div className="mb-8 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between overflow-x-auto gap-2 no-scrollbar py-1">
          {STEPS.map((s) => {
            const isCompleted = journeyStep > s.id;
            const isCurrent = journeyStep === s.id;
            return (
              <div
                key={s.id}
                id={`stepper-node-${s.id}`}
                onClick={() => {
                  if (s.id <= journeyStep) setJourneyStep(s.id);
                }}
                className={`flex items-center gap-2 cursor-pointer transition-all shrink-0 ${
                  isCurrent ? 'opacity-100 font-bold' : isCompleted ? 'opacity-90' : 'opacity-40'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                    isCompleted
                      ? 'bg-teal-600 text-white'
                      : isCurrent
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 ring-4 ring-blue-100'
                      : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  {isCompleted ? <Check className="w-3.5 h-3.5" /> : s.id}
                </div>
                <div className="hidden md:block text-left">
                  <span className={`text-[11px] font-bold block leading-none ${isCurrent ? 'text-blue-600' : 'text-slate-700'}`}>
                    {s.title}
                  </span>
                  <span className="text-[9px] text-slate-400 font-medium">{s.stackLayer}</span>
                </div>
                {s.id < 7 && <div className="hidden lg:block w-4 h-0.5 bg-slate-200 mx-1" />}
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Split Grid: Left = Application Flow, Right = Org & Team Context */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left Interactive Container */}
        <div className="lg:col-span-8">
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between min-h-[500px]">
            <div>
              {/* Step Header */}
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                      Step {currentStepData.id} of 7 • {currentStepData.stackLayer} Layer
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {currentStepData.estimatedTime}
                    </span>
                  </div>
                  <h2 className="text-2xl font-black text-slate-900">{currentStepData.title}: {currentStepData.shortDesc}</h2>
                </div>
                <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-blue-600">
                  <Activity className="w-4 h-4" />
                </div>
              </div>

              {/* Step Dynamic Content */}
              {renderStepContent()}
            </div>

            {/* Stepper Navigation Footer */}
            {journeyStep < 7 && (
              <div className="flex items-center justify-between pt-6 mt-8 border-t border-slate-100">
                <button
                  id="stepper-back-btn"
                  onClick={handlePrev}
                  disabled={journeyStep === 1}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-900 disabled:opacity-0 transition-all flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>

                <button
                  id="stepper-continue-btn"
                  onClick={handleNext}
                  disabled={
                    (journeyStep === 5 && !kfsAgreed && selectedProfile.outcome === 'APPROVED')
                  }
                  className="px-7 py-3 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white rounded-xl font-bold text-xs shadow-lg shadow-slate-900/10 hover:shadow-slate-900/20 transition-all flex items-center gap-2"
                >
                  <span>
                    {journeyStep === 5
                      ? 'Accept Sanction & Proceed'
                      : journeyStep === 6
                      ? 'Confirm & Disburse Capital'
                      : 'Continue Step'}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-blue-400" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar: Real-time Team Context & Compliance Radar */}
        <div className="lg:col-span-4 space-y-4">
          {/* Teams Responsible Card */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-black uppercase tracking-wider text-blue-400 flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>Teams in This Stage</span>
              </span>
              <button
                onClick={() => onOpenTeamDrawer(currentStepData.teams[0])}
                className="text-[10px] font-bold text-slate-400 hover:text-white uppercase tracking-wider underline"
              >
                Inspect
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {currentStepData.desc}
            </p>

            {/* Team Badges */}
            <div className="space-y-2.5 pt-1">
              {currentStepData.teams.map((team) => {
                const detail = TEAM_DETAILS[team];
                return (
                  <div
                    key={team}
                    id={`sidebar-team-${team.replace(/\//g, '-')}`}
                    onClick={() => onOpenTeamDrawer(team)}
                    className="p-3 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 rounded-xl cursor-pointer transition-all group"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-blue-300 group-hover:text-white transition-colors">
                        {team} Team
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-colors" />
                    </div>
                    <p className="text-[11px] text-slate-400 leading-normal line-clamp-2">
                      {detail?.description || 'Collaborates on operational and regulatory delivery.'}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Architecture Protocol Card */}
          <div className="bg-blue-50 border border-blue-200/80 rounded-2xl p-5 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-900">
              <Lock className="w-3.5 h-3.5 text-blue-700" />
              <span>Protocol Specs</span>
            </div>
            <p className="text-xs font-mono text-blue-900 bg-white p-2.5 rounded-lg border border-blue-200/60 font-semibold">
              {currentStepData.apiProtocol}
            </p>
            <p className="text-[11px] text-blue-800 leading-relaxed pt-1">
              Complies with RBI Digital Lending Guidelines (DLG) and CERT-In financial data residency mandates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
