export interface NotificationItemData {
  id: string;
  category: 'KYC' | 'Package' | 'Commission' | 'Bonus' | 'Payout';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  link?: string;
}

export const INITIAL_NOTIFICATIONS: NotificationItemData[] = [
  {
    id: 'notif-1',
    category: 'Commission',
    title: 'Direct Referral Commission Credited',
    message: '₹2,500 has been credited to your wallet for Priya Patel enrollment in Standard Package.',
    timestamp: '10 mins ago',
    read: false,
    link: '/member/active-income'
  },
  {
    id: 'notif-2',
    category: 'Bonus',
    title: 'Weekly Bonus Qualification',
    message: 'Congratulations! You have reached ₹24,500 panel income this week and qualified for the 5% bonus pool.',
    timestamp: '2 hours ago',
    read: false,
    link: '/member/weekly-bonus'
  },
  {
    id: 'notif-3',
    category: 'Payout',
    title: 'Withdrawal Request Submitted',
    message: 'Your withdrawal request of ₹15,000 (Ref: WTH-4481) is under compliance review.',
    timestamp: '4 hours ago',
    read: false,
    link: '/member/withdraw'
  },
  {
    id: 'notif-4',
    category: 'KYC',
    title: 'KYC Documents Verified',
    message: 'Your government identity documents and bank account details have been successfully verified.',
    timestamp: '2 days ago',
    read: true,
    link: '/member/kyc'
  },
  {
    id: 'notif-5',
    category: 'Package',
    title: 'Package Active',
    message: 'Your Premium package (₹11,000) is active with full 5-level earning depth enabled.',
    timestamp: '1 week ago',
    read: true,
    link: '/member/package'
  }
];
