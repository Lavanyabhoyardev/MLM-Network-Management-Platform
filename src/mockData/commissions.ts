export interface CommissionTransaction {
  id: string;
  reference: string;
  date: string;
  memberId: string;
  memberName: string;
  sourceMemberId: string;
  sourceMemberName: string;
  packagePurchased: 'Basic' | 'Standard' | 'Premium' | 'Pro';
  packageAmount: number;
  level: number;
  commissionType: 'Direct Referral' | 'Level Commission' | 'Active Income' | 'Passive Income';
  percentageRate: string;
  amount: number;
  formattedAmount: string;
  status: 'Credited' | 'Pending Calculation' | 'Hold';
}

export interface CommissionRuleConfig {
  packageId: string;
  packageName: string;
  packagePrice: number;
  earningLevels: number;
  status: 'Illustrative / Pending Client Approval';
  levels: {
    level: number;
    illustrativeRate: string;
    description: string;
    calculatedExample: string;
  }[];
}

export const COMMISSION_RULES: CommissionRuleConfig[] = [
  {
    packageId: 'pkg-basic',
    packageName: 'Basic',
    packagePrice: 3000,
    earningLevels: 2,
    status: 'Illustrative / Pending Client Approval',
    levels: [
      { level: 1, illustrativeRate: '50.00%', description: 'Direct Sponsor Level', calculatedExample: '₹1,500' },
      { level: 2, illustrativeRate: '25.00%', description: '2nd Tier Referral', calculatedExample: '₹750' }
    ]
  },
  {
    packageId: 'pkg-standard',
    packageName: 'Standard',
    packagePrice: 5000,
    earningLevels: 5,
    status: 'Illustrative / Pending Client Approval',
    levels: [
      { level: 1, illustrativeRate: '50.00%', description: 'Direct Sponsor Level', calculatedExample: '₹2,500' },
      { level: 2, illustrativeRate: '25.00%', description: '2nd Tier Referral', calculatedExample: '₹1,250' },
      { level: 3, illustrativeRate: '12.50%', description: '3rd Tier Referral', calculatedExample: '₹625' },
      { level: 4, illustrativeRate: '6.25%', description: '4th Tier Referral', calculatedExample: '₹312.50' },
      { level: 5, illustrativeRate: '3.125%', description: '5th Tier Referral', calculatedExample: '₹156.25' }
    ]
  },
  {
    packageId: 'pkg-premium',
    packageName: 'Premium',
    packagePrice: 11000,
    earningLevels: 5,
    status: 'Illustrative / Pending Client Approval',
    levels: [
      { level: 1, illustrativeRate: '50.00%', description: 'Direct Sponsor Level', calculatedExample: '₹5,500' },
      { level: 2, illustrativeRate: '25.00%', description: '2nd Tier Referral', calculatedExample: '₹2,750' },
      { level: 3, illustrativeRate: '12.50%', description: '3rd Tier Referral', calculatedExample: '₹1,375' },
      { level: 4, illustrativeRate: '6.25%', description: '4th Tier Referral', calculatedExample: '₹687.50' },
      { level: 5, illustrativeRate: '3.125%', description: '5th Tier Referral', calculatedExample: '₹343.75' }
    ]
  },
  {
    packageId: 'pkg-pro',
    packageName: 'Pro',
    packagePrice: 18600,
    earningLevels: 5,
    status: 'Illustrative / Pending Client Approval',
    levels: [
      { level: 1, illustrativeRate: '50.00%', description: 'Direct Sponsor Level', calculatedExample: '₹9,300' },
      { level: 2, illustrativeRate: '25.00%', description: '2nd Tier Referral', calculatedExample: '₹4,650' },
      { level: 3, illustrativeRate: '12.50%', description: '3rd Tier Referral', calculatedExample: '₹2,325' },
      { level: 4, illustrativeRate: '6.25%', description: '4th Tier Referral', calculatedExample: '₹1,162.50' },
      { level: 5, illustrativeRate: '3.125%', description: '5th Tier Referral', calculatedExample: '₹581.25' }
    ]
  }
];

export const COMMISSION_TRANSACTIONS: CommissionTransaction[] = [
  {
    id: 'comm-8921',
    reference: 'COMM-TX-8921',
    date: '2024-06-18 14:32',
    memberId: 'MEM-10482',
    memberName: 'Rahul Sharma',
    sourceMemberId: 'MEM-10512',
    sourceMemberName: 'Priya Patel',
    packagePurchased: 'Standard',
    packageAmount: 5000,
    level: 1,
    commissionType: 'Direct Referral',
    percentageRate: '50.00%',
    amount: 2500,
    formattedAmount: '₹2,500',
    status: 'Credited'
  },
  {
    id: 'comm-8922',
    reference: 'COMM-TX-8922',
    date: '2024-06-17 11:20',
    memberId: 'MEM-10482',
    memberName: 'Rahul Sharma',
    sourceMemberId: 'MEM-10610',
    sourceMemberName: 'Sneha Gupta',
    packagePurchased: 'Standard',
    packageAmount: 5000,
    level: 2,
    commissionType: 'Level Commission',
    percentageRate: '25.00%',
    amount: 1250,
    formattedAmount: '₹1,250',
    status: 'Credited'
  },
  {
    id: 'comm-8923',
    reference: 'COMM-TX-8923',
    date: '2024-06-16 16:45',
    memberId: 'MEM-10482',
    memberName: 'Rahul Sharma',
    sourceMemberId: 'MEM-10788',
    sourceMemberName: 'Karthik Nair',
    packagePurchased: 'Premium',
    packageAmount: 11000,
    level: 3,
    commissionType: 'Level Commission',
    percentageRate: '12.50%',
    amount: 1375,
    formattedAmount: '₹1,375',
    status: 'Credited'
  },
  {
    id: 'comm-8924',
    reference: 'COMM-TX-8924',
    date: '2024-06-15 09:12',
    memberId: 'MEM-10482',
    memberName: 'Rahul Sharma',
    sourceMemberId: 'MEM-10890',
    sourceMemberName: 'Tanvi Shinde',
    packagePurchased: 'Basic',
    packageAmount: 3000,
    level: 4,
    commissionType: 'Level Commission',
    percentageRate: '6.25%',
    amount: 187.50,
    formattedAmount: '₹187.50',
    status: 'Credited'
  },
  {
    id: 'comm-8925',
    reference: 'COMM-TX-8925',
    date: '2024-06-14 18:05',
    memberId: 'MEM-10021',
    memberName: 'Sunil Verma',
    sourceMemberId: 'MEM-10482',
    sourceMemberName: 'Rahul Sharma',
    packagePurchased: 'Premium',
    packageAmount: 11000,
    level: 1,
    commissionType: 'Direct Referral',
    percentageRate: '50.00%',
    amount: 5500,
    formattedAmount: '₹5,500',
    status: 'Credited'
  },
  {
    id: 'comm-8926',
    reference: 'COMM-TX-8926',
    date: '2024-06-13 13:40',
    memberId: 'MEM-10482',
    memberName: 'Rahul Sharma',
    sourceMemberId: 'MEM-10850',
    sourceMemberName: 'Rohan Kapoor',
    packagePurchased: 'Pro',
    packageAmount: 18600,
    level: 1,
    commissionType: 'Direct Referral',
    percentageRate: '50.00%',
    amount: 9300,
    formattedAmount: '₹9,300',
    status: 'Credited'
  },
  {
    id: 'comm-8927',
    reference: 'COMM-TX-8927',
    date: '2024-06-12 10:15',
    memberId: 'MEM-10512',
    memberName: 'Priya Patel',
    sourceMemberId: 'MEM-10642',
    sourceMemberName: 'Amit Roy',
    packagePurchased: 'Basic',
    packageAmount: 3000,
    level: 1,
    commissionType: 'Direct Referral',
    percentageRate: '50.00%',
    amount: 1500,
    formattedAmount: '₹1,500',
    status: 'Credited'
  },
  {
    id: 'comm-8928',
    reference: 'COMM-TX-8928',
    date: '2024-06-11 17:30',
    memberId: 'MEM-10534',
    memberName: 'Ananya Rao',
    sourceMemberId: 'MEM-10675',
    sourceMemberName: 'Neha Joshi',
    packagePurchased: 'Pro',
    packageAmount: 18600,
    level: 1,
    commissionType: 'Direct Referral',
    percentageRate: '50.00%',
    amount: 9300,
    formattedAmount: '₹9,300',
    status: 'Credited'
  }
];
