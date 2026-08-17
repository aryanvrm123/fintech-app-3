export interface BorrowerProfile {
  id: string;
  name: string;
  age: number;
  phone: string;
  email: string;
  pan: string;
  aadhaarMasked: string;
  income: number;
  employment: string;
  employer: string;
  history: string;
  requested: number;
  tenureMonths: number;
  score: number;
  risk: 'Low' | 'Moderate' | 'High';
  outcome: 'APPROVED' | 'REFER' | 'DECLINED';
  interestRate: number;
  processingFee: number;
  dti: number;
  bureauScore: number;
  notes: string;
  riskFactors: string[];
  positiveFactors: string[];
}

export interface JourneyStep {
  id: number;
  title: string;
  shortDesc: string;
  teams: string[];
  desc: string;
  stackLayer: 'Identity' | 'Data' | 'Intelligence' | 'Decision' | 'Payments' | 'Disbursement';
  estimatedTime: string;
  apiProtocol: string;
}

export interface TeamDetail {
  name: string;
  role: string;
  description: string;
  keyResponsibilities: string[];
  kpis: string[];
  keyTools: string[];
}

export interface StackLayerInfo {
  id: string;
  name: string;
  layer: 'Identity' | 'Data' | 'Payments' | 'Credit Protocol';
  provider: string;
  iconName: string;
  description: string;
  regulatoryBody: string;
  latency: string;
  benefits: string[];
}

export interface EMIScheduleItem {
  installmentNo: number;
  dueDate: string;
  principal: number;
  interest: number;
  totalEmi: number;
  balanceRemaining: number;
  status: 'PAID' | 'DUE' | 'UPCOMING';
}

export interface ActiveLoan {
  loanId: string;
  borrowerName: string;
  sanctionedAmount: number;
  disbursedAmount: number;
  interestRate: number;
  tenureMonths: number;
  monthlyEmi: number;
  disbursementDate: string;
  nextEmiDate: string;
  mandateStatus: 'ACTIVE' | 'PENDING' | 'FAILED';
  vpa: string;
  bankName: string;
  accountNumberMasked: string;
  loanStatus: 'ACTIVE' | 'SETTLED' | 'PENDING_DISBURSEMENT';
  emis: EMIScheduleItem[];
}
