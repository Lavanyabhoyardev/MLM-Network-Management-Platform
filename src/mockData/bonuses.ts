export interface QualifiedWeeklyMember {
  id: string;
  memberId: string;
  name: string;
  packageName: string;
  panelIncome: number;
  formattedPanelIncome: string;
  target: number;
  formattedTarget: string;
  qualification: 'Qualified' | 'In Progress';
  bonusShare: number;
  formattedBonusShare: string;
  status: 'Ready for Payout' | 'Pending Close' | 'Settled';
}

export interface WeeklyBonusHistory {
  weekNumber: string;
  period: string;
  targetAmount: number;
  panelIncome: number;
  poolAmount: number;
  qualifiedCount: number;
  bonusPerMember: number;
  status: 'Closed' | 'Settled';
}

export interface MonthlyBonusRecord {
  month: string;
  target: string;
  panelIncome: string;
  qualifiedMembersCount: number;
  bonusPoolStatus: 'Pending Client Approval' | 'Under Review';
  status: 'Active Period' | 'Archived';
  notes: string;
}

export interface ManualBonus {
  id: string;
  reference: string;
  memberId: string;
  memberName: string;
  amount: number;
  formattedAmount: string;
  bonusType: 'Performance Leadership' | 'Top Recruiter' | 'Event Incentive' | 'Discretionary Adjustment';
  reason: string;
  remarks: string;
  createdBy: string;
  dateTime: string;
  status: 'Credited';
}

export interface NonWorkingBenefit {
  id: string;
  reference: string;
  memberId: string;
  memberName: string;
  benefitType: 'Cash' | 'Points' | 'Package';
  amountOrPackage: string;
  reason: string;
  remarks: string;
  createdBy: string;
  date: string;
  status: 'Active' | 'Disbursed';
}

export const INITIAL_WEEKLY_BONUS_METRICS = {
  weeklyTarget: 20000,
  formattedWeeklyTarget: '₹20,000+',
  panelWeeklyIncome: 50000,
  formattedPanelIncome: '₹50,000',
  bonusRate: '5%',
  bonusPool: 2500,
  formattedBonusPool: '₹2,500',
  qualifiedCount: 2,
  isWeekClosed: false,
  workingRuleNote: 'Current working interpretation: 5% of panel weekly income split evenly across qualified members exceeding ₹20,000 panel threshold.'
};

export const INITIAL_QUALIFIED_WEEKLY_MEMBERS: QualifiedWeeklyMember[] = [
  {
    id: 'mem-10482',
    memberId: 'MEM-10482',
    name: 'Rahul Sharma',
    packageName: 'Premium',
    panelIncome: 24500,
    formattedPanelIncome: '₹24,500',
    target: 20000,
    formattedTarget: '₹20,000',
    qualification: 'Qualified',
    bonusShare: 1250,
    formattedBonusShare: '₹1,250',
    status: 'Ready for Payout'
  },
  {
    id: 'mem-10021',
    memberId: 'MEM-10021',
    name: 'Sunil Verma',
    packageName: 'Pro',
    panelIncome: 25500,
    formattedPanelIncome: '₹25,500',
    target: 20000,
    formattedTarget: '₹20,000',
    qualification: 'Qualified',
    bonusShare: 1250,
    formattedBonusShare: '₹1,250',
    status: 'Ready for Payout'
  },
  {
    id: 'mem-10534',
    memberId: 'MEM-10534',
    name: 'Ananya Rao',
    packageName: 'Premium',
    panelIncome: 16800,
    formattedPanelIncome: '₹16,800',
    target: 20000,
    formattedTarget: '₹20,000',
    qualification: 'In Progress',
    bonusShare: 0,
    formattedBonusShare: '₹0 (₹3,200 to target)',
    status: 'Pending Close'
  }
];

export const WEEKLY_BONUS_HISTORIES: WeeklyBonusHistory[] = [
  {
    weekNumber: 'Week 24',
    period: '09 Jun 2024 - 15 Jun 2024',
    targetAmount: 20000,
    panelIncome: 48000,
    poolAmount: 2400,
    qualifiedCount: 2,
    bonusPerMember: 1200,
    status: 'Settled'
  },
  {
    weekNumber: 'Week 23',
    period: '02 Jun 2024 - 08 Jun 2024',
    targetAmount: 20000,
    panelIncome: 52000,
    poolAmount: 2600,
    qualifiedCount: 2,
    bonusPerMember: 1300,
    status: 'Settled'
  },
  {
    weekNumber: 'Week 22',
    period: '26 May 2024 - 01 Jun 2024',
    targetAmount: 20000,
    panelIncome: 45000,
    poolAmount: 2250,
    qualifiedCount: 3,
    bonusPerMember: 750,
    status: 'Settled'
  }
];

export const MONTHLY_BONUS_CONFIG = {
  monthlyTarget: '₹30,000',
  currentPanelIncome: '₹1,42,000',
  qualifiedMembersCount: 4,
  progressPercentage: 78,
  calculationStatus: 'Calculation rule pending client approval',
  calculationDisclaimer: 'The monthly pool distribution percentage, minimum team branches, and capping criteria are awaiting client confirmation. No formula has been finalized.',
  records: [
    {
      month: 'June 2024 (Current)',
      target: '₹30,000',
      panelIncome: '₹1,42,000',
      qualifiedMembersCount: 4,
      bonusPoolStatus: 'Pending Client Approval' as const,
      status: 'Active Period' as const,
      notes: 'Threshold met by 4 branch leaders; pool distribution formula TBD'
    },
    {
      month: 'May 2024',
      target: '₹30,000',
      panelIncome: '₹1,85,000',
      qualifiedMembersCount: 5,
      bonusPoolStatus: 'Pending Client Approval' as const,
      status: 'Archived' as const,
      notes: 'Held in reserve pending approved allocation formula'
    }
  ]
};

export const INITIAL_MANUAL_BONUSES: ManualBonus[] = [
  {
    id: 'mb-101',
    reference: 'MBONUS-771',
    memberId: 'MEM-10482',
    memberName: 'Rahul Sharma',
    amount: 5000,
    formattedAmount: '₹5,000',
    bonusType: 'Performance Leadership',
    reason: 'Exceptional branch growth and 15 direct active enrollments in Q2',
    remarks: 'Approved by Management Executive Committee',
    createdBy: 'Corporate Admin (AD-01)',
    dateTime: '2024-06-15 11:30',
    status: 'Credited'
  },
  {
    id: 'mb-102',
    reference: 'MBONUS-772',
    memberId: 'MEM-10021',
    memberName: 'Sunil Verma',
    amount: 10000,
    formattedAmount: '₹10,000',
    bonusType: 'Top Recruiter',
    reason: 'Highest volume leader award during Summer Kickoff',
    remarks: 'One-time incentive payout',
    createdBy: 'Corporate Admin (AD-01)',
    dateTime: '2024-06-10 16:45',
    status: 'Credited'
  },
  {
    id: 'mb-103',
    reference: 'MBONUS-773',
    memberId: 'MEM-10534',
    memberName: 'Ananya Rao',
    amount: 2500,
    formattedAmount: '₹2,500',
    bonusType: 'Event Incentive',
    reason: 'Webinar coordination and community moderation contribution',
    remarks: 'Marketing support incentive',
    createdBy: 'Corporate Admin (AD-02)',
    dateTime: '2024-06-04 14:15',
    status: 'Credited'
  }
];

export const INITIAL_NON_WORKING_BENEFITS: NonWorkingBenefit[] = [
  {
    id: 'nwb-201',
    reference: 'NWB-901',
    memberId: 'MEM-10482',
    memberName: 'Rahul Sharma',
    benefitType: 'Package',
    amountOrPackage: 'Advanced SEO Mastery Module (Complimentary)',
    reason: 'Loyalty anniversary reward and active leader contribution',
    remarks: 'Direct course access granted',
    createdBy: 'Corporate Admin (AD-01)',
    date: '2024-06-01',
    status: 'Active'
  },
  {
    id: 'nwb-202',
    reference: 'NWB-902',
    memberId: 'MEM-10512',
    memberName: 'Priya Patel',
    benefitType: 'Points',
    amountOrPackage: '1,500 Reward Credits',
    reason: 'Early bird registration program incentive',
    remarks: 'Redeemable for merchandise and event passes',
    createdBy: 'Corporate Admin (AD-01)',
    date: '2024-05-20',
    status: 'Active'
  },
  {
    id: 'nwb-203',
    reference: 'NWB-903',
    memberId: 'MEM-10589',
    memberName: 'Vikram Malhotra',
    benefitType: 'Cash',
    amountOrPackage: '₹1,500 Support Stipend',
    reason: 'Regional promotional booth organizer reimbursement',
    remarks: 'Disbursed directly into wallet ledger',
    createdBy: 'Corporate Admin (AD-02)',
    date: '2024-05-15',
    status: 'Disbursed'
  }
];
