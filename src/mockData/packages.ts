export interface PackageData {
  id: string;
  name: string;
  price: number;
  formattedPrice: string;
  earningDepth: number;
  membersCount: number;
  totalSales: string;
  status: 'Active' | 'Under Review';
  features: string[];
  description: string;
}

export const PACKAGES: PackageData[] = [
  {
    id: 'pkg-basic',
    name: 'Basic',
    price: 3000,
    formattedPrice: '₹3,000',
    earningDepth: 2,
    membersCount: 4120,
    totalSales: '₹12.36L',
    status: 'Active',
    features: [
      'Digital Marketing Foundations Course',
      'Social Media Starter Toolkit',
      '2 Earning Levels Network Commission',
      'Basic Performance Analytics',
      'Community Access'
    ],
    description: 'Entry-level course bundle providing core digital marketing competencies with direct and secondary referral qualification.'
  },
  {
    id: 'pkg-standard',
    name: 'Standard',
    price: 5000,
    formattedPrice: '₹5,000',
    earningDepth: 5,
    membersCount: 5430,
    totalSales: '₹27.15L',
    status: 'Active',
    features: [
      'Full Digital Ad Strategy Course',
      'Search Engine Optimization Mastery',
      '5 Earning Levels Network Commission',
      'Weekly Bonus Pool Eligibility',
      'Dedicated Partner Support'
    ],
    description: 'Comprehensive acquisition and funnel optimization training qualifying for 5 levels of network depth.'
  },
  {
    id: 'pkg-premium',
    name: 'Premium',
    price: 11000,
    formattedPrice: '₹11,000',
    earningDepth: 5,
    membersCount: 2410,
    totalSales: '₹26.51L',
    status: 'Active',
    features: [
      'Enterprise Performance Marketing',
      'Conversion Rate Optimization System',
      '5 Earning Levels Network Commission',
      'Weekly & Monthly Bonus Eligibility',
      'Priority Payout Processing',
      'VIP Mastermind Access'
    ],
    description: 'Advanced growth engineering curriculum and high-tier earning depth with executive performance pool rights.'
  },
  {
    id: 'pkg-pro',
    name: 'Pro',
    price: 18600,
    formattedPrice: '₹18,600',
    earningDepth: 5,
    membersCount: 882,
    totalSales: '₹16.40L',
    status: 'Active',
    features: [
      'Agency Scale & Enterprise Funnels',
      'Full Stack Marketing Certification',
      '5 Earning Levels Network Commission',
      'Highest Priority Bonus Calculations',
      'Personal Mentor Sessions',
      'Direct Leadership Access'
    ],
    description: 'The definitive agency-level digital mastery suite unlocked for maximum compensation tiering.'
  }
];
