export interface LedgerEntry {
  id: string;
  reference: string;
  date: string;
  memberId: string;
  memberName: string;
  transactionType:
    | 'Direct / Level Commission'
    | 'Active Income'
    | 'Passive Income'
    | 'Weekly Bonus'
    | 'Monthly Bonus'
    | 'Manual Bonus'
    | 'Non-working Benefit'
    | 'Withdrawal'
    | 'Refund / Reversal';
  sourceReference: string;
  credit: number;
  debit: number;
  balanceAfter: number;
  status: 'Completed' | 'Pending' | 'Reversed';
  notes?: string;
}

export const INITIAL_LEDGER_ENTRIES: LedgerEntry[] = [
  {
    id: 'tx-901',
    reference: 'TX-2024-061801',
    date: '2024-06-18 14:32',
    memberId: 'MEM-10482',
    memberName: 'Rahul Sharma',
    transactionType: 'Direct / Level Commission',
    sourceReference: 'COMM-TX-8921 (Priya Patel Standard Pkg)',
    credit: 2500,
    debit: 0,
    balanceAfter: 42850,
    status: 'Completed'
  },
  {
    id: 'tx-902',
    reference: 'TX-2024-061702',
    date: '2024-06-17 11:20',
    memberId: 'MEM-10482',
    memberName: 'Rahul Sharma',
    transactionType: 'Passive Income',
    sourceReference: 'COMM-TX-8922 (Sneha Gupta L2 Commission)',
    credit: 1250,
    debit: 0,
    balanceAfter: 40350,
    status: 'Completed'
  },
  {
    id: 'tx-903',
    reference: 'TX-2024-061501',
    date: '2024-06-15 11:30',
    memberId: 'MEM-10482',
    memberName: 'Rahul Sharma',
    transactionType: 'Manual Bonus',
    sourceReference: 'MBONUS-771 (Q2 Executive Performance)',
    credit: 5000,
    debit: 0,
    balanceAfter: 39100,
    status: 'Completed'
  },
  {
    id: 'tx-904',
    reference: 'TX-2024-061500',
    date: '2024-06-15 08:00',
    memberId: 'MEM-10482',
    memberName: 'Rahul Sharma',
    transactionType: 'Weekly Bonus',
    sourceReference: 'WBONUS-W24 (Pool Distribution W24)',
    credit: 1250,
    debit: 0,
    balanceAfter: 34100,
    status: 'Completed'
  },
  {
    id: 'tx-905',
    reference: 'TX-2024-061001',
    date: '2024-06-10 15:00',
    memberId: 'MEM-10482',
    memberName: 'Rahul Sharma',
    transactionType: 'Withdrawal',
    sourceReference: 'WTH-4401 (IMPS HDFC Bank Transfer)',
    credit: 0,
    debit: 15000,
    balanceAfter: 32850,
    status: 'Completed'
  },
  {
    id: 'tx-906',
    reference: 'TX-2024-060801',
    date: '2024-06-08 17:10',
    memberId: 'MEM-10021',
    memberName: 'Sunil Verma',
    transactionType: 'Active Income',
    sourceReference: 'COMM-TX-8925 (Direct Referral Rahul Pkg)',
    credit: 5500,
    debit: 0,
    balanceAfter: 86400,
    status: 'Completed'
  },
  {
    id: 'tx-907',
    reference: 'TX-2024-060501',
    date: '2024-06-05 12:40',
    memberId: 'MEM-10512',
    memberName: 'Priya Patel',
    transactionType: 'Active Income',
    sourceReference: 'COMM-TX-8927 (Amit Roy Basic Pkg)',
    credit: 1500,
    debit: 0,
    balanceAfter: 18200,
    status: 'Completed'
  },
  {
    id: 'tx-908',
    reference: 'TX-2024-060101',
    date: '2024-06-01 10:00',
    memberId: 'MEM-10589',
    memberName: 'Vikram Malhotra',
    transactionType: 'Non-working Benefit',
    sourceReference: 'NWB-903 (Promotional Booth Reimbursement)',
    credit: 1500,
    debit: 0,
    balanceAfter: 6400,
    status: 'Completed'
  },
  {
    id: 'tx-909',
    reference: 'TX-2024-052801',
    date: '2024-05-28 14:15',
    memberId: 'MEM-10701',
    memberName: 'Rajesh Kumar',
    transactionType: 'Refund / Reversal',
    sourceReference: 'REV-109 (Duplicate Payment Adjustment)',
    credit: 0,
    debit: 800,
    balanceAfter: 4800,
    status: 'Completed'
  }
];
