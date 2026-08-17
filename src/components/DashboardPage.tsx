import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Landmark, Smartphone, FileText, CheckCircle2, 
  AlertCircle, Calendar, ArrowRight, ShieldCheck, 
  CreditCard, RefreshCw, Download, ArrowUpRight, Check, X
} from 'lucide-react';
import { ActiveLoan, EMIScheduleItem } from '../types';

interface DashboardPageProps {
  activeLoan: ActiveLoan;
  onPayNextEmi: () => void;
  onStartNewApplication: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  activeLoan,
  onPayNextEmi,
  onStartNewApplication
}) => {
  const [showKfsModal, setShowKfsModal] = useState<boolean>(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState<boolean>(false);
  const [paymentSuccessMessage, setPaymentSuccessMessage] = useState<string | null>(null);

  const paidCount = activeLoan.emis.filter((e) => e.status === 'PAID').length;
  const progressPercent = Math.round((paidCount / activeLoan.emis.length) * 100);

  const handleManualEmiPay = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      onPayNextEmi();
      setIsProcessingPayment(false);
      setPaymentSuccessMessage(`EMI #${paidCount + 1} of ₹${activeLoan.monthlyEmi.toLocaleString()} successfully paid via UPI AutoPay!`);
      setTimeout(() => setPaymentSuccessMessage(null), 4000);
    }, 800);
  };

  return (
    <div id="portfolio-dashboard-page" className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
              Active Facility
            </span>
            <span className="text-xs text-slate-400 font-mono">Loan #{activeLoan.loanId}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            {activeLoan.borrowerName}’s Loan Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowKfsModal(true)}
            className="px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 rounded-xl text-xs font-bold shadow-xs transition-all flex items-center gap-2"
          >
            <FileText className="w-3.5 h-3.5 text-blue-600" />
            <span>View KFS Statement</span>
          </button>
          
          <button
            onClick={onStartNewApplication}
            className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-2"
          >
            <span>Apply for New Loan</span>
            <ArrowRight className="w-3.5 h-3.5 text-blue-400" />
          </button>
        </div>
      </div>

      {/* Payment Success Alert */}
      <AnimatePresence>
        {paymentSuccessMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 bg-teal-50 border border-teal-200 rounded-2xl flex items-center justify-between text-xs text-teal-900 font-bold"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-600" />
              <span>{paymentSuccessMessage}</span>
            </div>
            <button onClick={() => setPaymentSuccessMessage(null)}>
              <X className="w-4 h-4 text-teal-700" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overview Cards Grid */}
      <div className="grid md:grid-cols-12 gap-6">
        {/* Left Main Loan Card */}
        <div className="md:col-span-8 bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-blue-400 font-bold block">Sanctioned Principal</span>
                <p className="text-3xl sm:text-4xl font-black mt-1">₹{activeLoan.sanctionedAmount.toLocaleString()}</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block">Interest Rate</span>
                <p className="text-xl font-black text-teal-400 mt-1">{activeLoan.interestRate}% p.a.</p>
              </div>
            </div>

            {/* Repayment Progress bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Repayment Progress</span>
                <span className="text-white font-bold">{paidCount} of {activeLoan.tenureMonths} EMIs Cleared ({progressPercent}%)</span>
              </div>
              <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.8 }}
                  className="h-full bg-teal-500 rounded-full"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-800 text-xs">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Monthly EMI</span>
              <p className="font-bold text-white mt-0.5">₹{activeLoan.monthlyEmi.toLocaleString()}</p>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Next Due Date</span>
              <p className="font-bold text-teal-400 mt-0.5">{activeLoan.nextEmiDate}</p>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Disbursed On</span>
              <p className="font-bold text-white mt-0.5">{activeLoan.disbursementDate}</p>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Mandate Rail</span>
              <p className="font-bold text-blue-400 mt-0.5">UPI AutoPay</p>
            </div>
          </div>
        </div>

        {/* Right Action & Mandate Card */}
        <div className="md:col-span-4 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Smartphone className="w-5 h-5 text-blue-600" />
              <h3 className="font-black text-slate-900 text-sm">UPI AutoPay Mandate</h3>
            </div>
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Virtual Address:</span>
                <span className="font-mono font-bold text-slate-800">{activeLoan.vpa}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Linked Bank:</span>
                <span className="font-bold text-slate-800">{activeLoan.bankName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Account:</span>
                <span className="font-bold text-slate-800">{activeLoan.accountNumberMasked}</span>
              </div>
              <div className="flex justify-between items-center pt-1 border-t border-slate-200">
                <span className="text-slate-500 font-medium">Status:</span>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                  <Check className="w-3 h-3 text-teal-600" />
                  <span>Mandate Active</span>
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <button
              id="pay-emi-now-btn"
              onClick={handleManualEmiPay}
              disabled={isProcessingPayment || paidCount >= activeLoan.tenureMonths}
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl font-bold text-xs shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-2"
            >
              {isProcessingPayment ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Executing AutoPay Pull...</span>
                </>
              ) : paidCount >= activeLoan.tenureMonths ? (
                <span>All Installments Settled!</span>
              ) : (
                <>
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Simulate Next EMI Payment (₹{activeLoan.monthlyEmi.toLocaleString()})</span>
                </>
              )}
            </button>
            <p className="text-[10px] text-slate-400 text-center">
              Pulls directly via NPCI UPI AutoPay without OTP.
            </p>
          </div>
        </div>
      </div>

      {/* Amortization Schedule Table */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs space-y-4 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-black text-slate-900">Repayment Amortization Schedule</h3>
            <p className="text-xs text-slate-500">Monthly breakdown of principal, reducing interest, and outstanding balances.</p>
          </div>
          <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
            {activeLoan.tenureMonths} Monthly Installments
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-y border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                <th className="p-3">#</th>
                <th className="p-3">Due Date</th>
                <th className="p-3">Principal</th>
                <th className="p-3">Interest</th>
                <th className="p-3">Total Installment</th>
                <th className="p-3">Balance Remaining</th>
                <th className="p-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {activeLoan.emis.map((emi) => (
                <tr key={emi.installmentNo} className={emi.status === 'PAID' ? 'bg-teal-50/30' : ''}>
                  <td className="p-3 font-bold text-slate-900">{emi.installmentNo}</td>
                  <td className="p-3 font-medium text-slate-700">{emi.dueDate}</td>
                  <td className="p-3">₹{emi.principal.toLocaleString()}</td>
                  <td className="p-3 text-slate-500">₹{emi.interest.toLocaleString()}</td>
                  <td className="p-3 font-bold text-slate-900">₹{emi.totalEmi.toLocaleString()}</td>
                  <td className="p-3 font-mono text-slate-600">₹{emi.balanceRemaining.toLocaleString()}</td>
                  <td className="p-3 text-right">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      emi.status === 'PAID' ? 'bg-teal-100 text-teal-800' :
                      emi.status === 'DUE' ? 'bg-amber-100 text-amber-800' :
                      'bg-slate-100 text-slate-600'
                    }`}>
                      {emi.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* KFS Modal */}
      <AnimatePresence>
        {showKfsModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowKfsModal(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[90]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:max-w-2xl sm:w-full bg-white rounded-3xl shadow-2xl z-[100] p-6 sm:p-8 max-h-[90vh] overflow-y-auto border border-slate-200"
            >
              <div className="flex justify-between items-center pb-4 border-b border-slate-200 mb-6">
                <div>
                  <h3 className="text-xl font-black text-slate-900">Key Fact Statement (KFS)</h3>
                  <p className="text-xs text-slate-500 font-medium">As mandated under RBI Digital Lending Guidelines</p>
                </div>
                <button
                  onClick={() => setShowKfsModal(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-2 p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-500">Borrower Name</span>
                  <span className="text-right font-bold text-slate-900">{activeLoan.borrowerName}</span>
                </div>
                <div className="grid grid-cols-2 p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-500">Sanctioned Amount</span>
                  <span className="text-right font-bold text-slate-900">₹{activeLoan.sanctionedAmount.toLocaleString()}</span>
                </div>
                <div className="grid grid-cols-2 p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-500">Disbursed Amount (Post Fee)</span>
                  <span className="text-right font-bold text-teal-700">₹{activeLoan.disbursedAmount.toLocaleString()}</span>
                </div>
                <div className="grid grid-cols-2 p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-500">Annual Percentage Rate (APR)</span>
                  <span className="text-right font-bold text-blue-600">{activeLoan.interestRate}% Reducing</span>
                </div>
                <div className="grid grid-cols-2 p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-500">Tenure</span>
                  <span className="text-right font-bold text-slate-900">{activeLoan.tenureMonths} Months</span>
                </div>
                <div className="grid grid-cols-2 p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-500">Grievance Redressal Officer</span>
                  <span className="text-right font-bold text-slate-900">nodal.officer@finflow.org</span>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-200 flex justify-end">
                <button
                  onClick={() => setShowKfsModal(false)}
                  className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold"
                >
                  Close Document
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
