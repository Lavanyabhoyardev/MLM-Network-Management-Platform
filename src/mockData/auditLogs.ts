export interface AuditLogEntry {
  id: string;
  timestamp: string;
  adminName: string;
  adminRole: string;
  action: string;
  module: 'KYC' | 'Members' | 'Packages' | 'Commissions' | 'Bonus' | 'Withdrawals' | 'Settings';
  reference: string;
  description: string;
  ipAddress: string;
  device: string;
  status: 'Success' | 'Warning' | 'Failed';
}

export const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'log-101',
    timestamp: '2024-06-18 14:45:10',
    adminName: 'Sanjay Deshmukh (AD-01)',
    adminRole: 'Super Admin',
    action: 'Withdrawal approved',
    module: 'Withdrawals',
    reference: 'WTH-4475',
    description: 'Approved IMPS withdrawal of ₹35,000 for member Sunil Verma (MEM-10021).',
    ipAddress: '103.21.58.112',
    device: 'Chrome 125.0 / macOS Sonoma',
    status: 'Success'
  },
  {
    id: 'log-102',
    timestamp: '2024-06-18 11:30:22',
    adminName: 'Meera Iyer (AD-03)',
    adminRole: 'Compliance Officer',
    action: 'KYC approved',
    module: 'KYC',
    reference: 'KYC-9390',
    description: 'Verified Aadhaar and PAN documents for Rahul Sharma (MEM-10482). Status marked Approved.',
    ipAddress: '103.21.58.114',
    device: 'Firefox 126.0 / Windows 11',
    status: 'Success'
  },
  {
    id: 'log-103',
    timestamp: '2024-06-17 17:15:40',
    adminName: 'Sanjay Deshmukh (AD-01)',
    adminRole: 'Super Admin',
    action: 'Manual bonus created',
    module: 'Bonus',
    reference: 'MBONUS-771',
    description: 'Credited ₹5,000 Executive Performance Leadership bonus to Rahul Sharma (MEM-10482).',
    ipAddress: '103.21.58.112',
    device: 'Chrome 125.0 / macOS Sonoma',
    status: 'Success'
  },
  {
    id: 'log-104',
    timestamp: '2024-06-16 10:20:05',
    adminName: 'Ramesh Kothari (AD-02)',
    adminRole: 'Operations Admin',
    action: 'Package updated',
    module: 'Packages',
    reference: 'pkg-standard',
    description: 'Updated package learning syllabus description and course tags for Standard package (₹5,000).',
    ipAddress: '49.36.12.89',
    device: 'Chrome 125.0 / Windows 10',
    status: 'Success'
  },
  {
    id: 'log-105',
    timestamp: '2024-06-15 18:30:00',
    adminName: 'Sanjay Deshmukh (AD-01)',
    adminRole: 'Super Admin',
    action: 'Weekly bonus closed',
    module: 'Bonus',
    reference: 'WBONUS-W24',
    description: 'Executed Week 24 bonus pool calculation. Disbursed ₹1,250 each to 2 qualified members.',
    ipAddress: '103.21.58.112',
    device: 'Chrome 125.0 / macOS Sonoma',
    status: 'Success'
  },
  {
    id: 'log-106',
    timestamp: '2024-06-14 16:12:18',
    adminName: 'Sanjay Deshmukh (AD-01)',
    adminRole: 'Super Admin',
    action: 'Commission rule modified',
    module: 'Commissions',
    reference: 'COMM-RULE-CFG',
    description: 'Updated draft illustrative rate distribution notes pending client approval meeting.',
    ipAddress: '103.21.58.112',
    device: 'Chrome 125.0 / macOS Sonoma',
    status: 'Warning'
  },
  {
    id: 'log-107',
    timestamp: '2024-06-13 10:25:33',
    adminName: 'Meera Iyer (AD-03)',
    adminRole: 'Compliance Officer',
    action: 'KYC rejected',
    module: 'KYC',
    reference: 'KYC-9388',
    description: 'Rejected KYC submission for Rajesh Kumar due to blurred PAN card upload.',
    ipAddress: '103.21.58.114',
    device: 'Firefox 126.0 / Windows 11',
    status: 'Success'
  }
];
