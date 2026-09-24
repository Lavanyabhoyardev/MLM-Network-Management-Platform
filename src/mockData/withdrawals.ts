export interface WithdrawalRequest {
  id: string;
  requestId: string;
  memberId: string;
  memberName: string;
  memberEmail: string;
  amount: number;
  formattedAmount: string;
  requestedDate: string;
  status: 'Pending' | 'Approved' | 'Processing' | 'Paid' | 'Rejected';
  paymentMethod: 'Bank Transfer (IMPS)' | 'Bank Transfer (NEFT)' | 'UPI' | 'Crypto (USDT TRC20)';
  accountDetails: {
    bankName?: string;
    accountNumber?: string;
    ifscCode?: string;
    upiId?: string;
    holderName?: string;
  };
  processedDate?: string;
  transactionRef?: string;
  remarks?: string;
}

export const INITIAL_WITHDRAWALS: WithdrawalRequest[] = [
  {
    id: 'wth-501',
    requestId: 'WTH-4481',
    memberId: 'MEM-10482',
    memberName: 'Rahul Sharma',
    memberEmail: 'rahul.sharma@example.com',
    amount: 15000,
    formattedAmount: '₹15,000',
    requestedDate: '2024-06-18 10:14',
    status: 'Pending',
    paymentMethod: 'Bank Transfer (IMPS)',
    accountDetails: {
      bankName: 'HDFC Bank Ltd',
      accountNumber: '••••••••4891',
      ifscCode: 'HDFC0000128',
      holderName: 'Rahul Sharma'
    },
    remarks: 'Routine weekly earnings payout request'
  },
  {
    id: 'wth-502',
    requestId: 'WTH-4480',
    memberId: 'MEM-10534',
    memberName: 'Ananya Rao',
    memberEmail: 'ananya.rao@example.com',
    amount: 8500,
    formattedAmount: '₹8,500',
    requestedDate: '2024-06-18 09:20',
    status: 'Pending',
    paymentMethod: 'UPI',
    accountDetails: {
      upiId: 'ananya.rao@okhdfcbank',
      holderName: 'Ananya Rao'
    },
    remarks: 'Direct referral commission withdrawal'
  },
  {
    id: 'wth-503',
    requestId: 'WTH-4475',
    memberId: 'MEM-10021',
    memberName: 'Sunil Verma',
    memberEmail: 'sunil.v@example.com',
    amount: 35000,
    formattedAmount: '₹35,000',
    requestedDate: '2024-06-17 14:05',
    status: 'Approved',
    paymentMethod: 'Bank Transfer (IMPS)',
    accountDetails: {
      bankName: 'ICICI Bank',
      accountNumber: '••••••••7721',
      ifscCode: 'ICIC0000045',
      holderName: 'Sunil Verma'
    },
    transactionRef: 'APV-BATCH-99',
    remarks: 'Approved by Financial Controller. Ready for batch dispatch.'
  },
  {
    id: 'wth-504',
    requestId: 'WTH-4468',
    memberId: 'MEM-10512',
    memberName: 'Priya Patel',
    memberEmail: 'priya.patel@example.com',
    amount: 10000,
    formattedAmount: '₹10,000',
    requestedDate: '2024-06-16 11:45',
    status: 'Processing',
    paymentMethod: 'Bank Transfer (NEFT)',
    accountDetails: {
      bankName: 'State Bank of India',
      accountNumber: '••••••••3109',
      ifscCode: 'SBIN0001823',
      holderName: 'Priya Patel'
    },
    transactionRef: 'NEFT-2024-7718',
    remarks: 'Gateway initiated payout, waiting for confirmation webhook'
  },
  {
    id: 'wth-505',
    requestId: 'WTH-4440',
    memberId: 'MEM-10675',
    memberName: 'Neha Joshi',
    memberEmail: 'neha.joshi@example.com',
    amount: 22000,
    formattedAmount: '₹22,000',
    requestedDate: '2024-06-15 16:30',
    status: 'Paid',
    paymentMethod: 'Bank Transfer (IMPS)',
    accountDetails: {
      bankName: 'Axis Bank',
      accountNumber: '••••••••6642',
      ifscCode: 'UTIB0000190',
      holderName: 'Neha Joshi'
    },
    processedDate: '2024-06-16 10:15',
    transactionRef: 'IMPS-AXS-991204',
    remarks: 'Settled successfully'
  },
  {
    id: 'wth-506',
    requestId: 'WTH-4422',
    memberId: 'MEM-10701',
    memberName: 'Rajesh Kumar',
    memberEmail: 'rajesh.k@example.com',
    amount: 5000,
    formattedAmount: '₹5,000',
    requestedDate: '2024-06-14 18:22',
    status: 'Rejected',
    paymentMethod: 'Bank Transfer (IMPS)',
    accountDetails: {
      bankName: 'Punjab National Bank',
      accountNumber: '••••••••1129',
      ifscCode: 'PUNB0002100',
      holderName: 'Rajesh Kumar'
    },
    transactionRef: 'REJ-KYC-INVAL',
    remarks: 'KYC documents expired or mismatched bank beneficiary name'
  }
];
