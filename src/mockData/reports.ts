export interface ReportCategory {
  id: string;
  name: string;
  description: string;
  totalRecords: number;
  lastGenerated: string;
  summaryStat: string;
}

export const REPORT_CATEGORIES: ReportCategory[] = [
  { id: 'rep-reg', name: 'Member Registration', description: 'New onboarding velocity, geographic distribution, sponsor attribution', totalRecords: 12842, lastGenerated: 'Today, 14:00', summaryStat: '+384 this week' },
  { id: 'rep-kyc', name: 'KYC Compliance', description: 'Pending, verified, and rejected document submissions with officer logs', totalRecords: 12480, lastGenerated: 'Today, 13:30', summaryStat: '97.2% verified' },
  { id: 'rep-pkg-sales', name: 'Package Sales', description: 'Revenue by package tier: Basic, Standard, Premium, and Pro', totalRecords: 12842, lastGenerated: 'Today, 12:00', summaryStat: '₹82.42L Total' },
  { id: 'rep-mem-sales', name: 'Member Sales', description: 'Direct sales performance per sponsor and conversion rates', totalRecords: 4890, lastGenerated: 'Yesterday', summaryStat: '₹18.40L Volume' },
  { id: 'rep-net-depth', name: 'Network Depth', description: 'Member breakdown across earning levels 1 to 5', totalRecords: 12842, lastGenerated: 'Yesterday', summaryStat: 'Avg 3.4 Levels' },
  { id: 'rep-team-size', name: 'Team Size', description: 'Branch tree volume, branch balancing, and active distributor ratio', totalRecords: 1420, lastGenerated: '2 days ago', summaryStat: '85.3% Active' },
  { id: 'rep-act-income', name: 'Active Income', description: 'Direct referral commissions generated from sponsor conversions', totalRecords: 7840, lastGenerated: 'Today, 11:00', summaryStat: '₹24.80L Disbursed' },
  { id: 'rep-pas-income', name: 'Passive Income', description: 'Multi-tier secondary level commissions across qualified depth', totalRecords: 15420, lastGenerated: 'Today, 11:00', summaryStat: '₹14.20L Disbursed' },
  { id: 'rep-lvl-comm', name: 'Level Commissions', description: 'Granular level-by-level (L1 - L5) payout distributions', totalRecords: 23260, lastGenerated: 'Yesterday', summaryStat: '5 Levels active' },
  { id: 'rep-wk-bonus', name: 'Weekly Bonus', description: '5% panel income pool performance and qualified recipient history', totalRecords: 24, lastGenerated: '15 Jun 2024', summaryStat: '₹58,400 Total Pool' },
  { id: 'rep-mo-bonus', name: 'Monthly Bonus', description: 'Monthly target qualification status (pending client formula confirmation)', totalRecords: 6, lastGenerated: '01 Jun 2024', summaryStat: 'Rule Pending' },
  { id: 'rep-man-bonus', name: 'Manual Bonus', description: 'Discretionary, performance, and leadership adjustments', totalRecords: 86, lastGenerated: '15 Jun 2024', summaryStat: '₹3.40L Allocated' },
  { id: 'rep-nwb', name: 'Non-working Benefits', description: 'Admin provided course modules, points, and promotional stipends', totalRecords: 142, lastGenerated: '01 Jun 2024', summaryStat: '142 Grants' },
  { id: 'rep-wallet-ledger', name: 'Wallet Ledger', description: 'Full double-entry credits and debits audit trail', totalRecords: 48920, lastGenerated: 'Today, 14:45', summaryStat: '₹48.90L Balance' },
  { id: 'rep-withdrawals', name: 'Withdrawals', description: 'Requested, processing, and disbursed member payouts', totalRecords: 3120, lastGenerated: 'Today, 14:00', summaryStat: '₹34.80L Total' },
  { id: 'rep-payouts', name: 'Payouts', description: 'Banking batch dispatches, IMPS references, and settlement speed', totalRecords: 2980, lastGenerated: 'Yesterday', summaryStat: '99.1% Success' },
  { id: 'rep-audit-logs', name: 'Audit Logs', description: 'Full system activity, administrator actions, and compliance events', totalRecords: 8410, lastGenerated: 'Live', summaryStat: 'All Events Logged' }
];
