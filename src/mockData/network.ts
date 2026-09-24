export interface NetworkNode {
  id: string;
  memberId: string;
  name: string;
  packageName: 'Basic' | 'Standard' | 'Premium' | 'Pro';
  packagePrice: number;
  level: number;
  directReferralsCount: number;
  totalNetworkCount: number;
  status: 'Active' | 'Inactive';
  walletBalance: string;
  totalEarnings: string;
  joinedDate: string;
  sponsorName: string;
  children?: NetworkNode[];
}

export const NETWORK_TREE_DATA: NetworkNode = {
  id: 'mem-10482',
  memberId: 'MEM-10482',
  name: 'Rahul Sharma (You)',
  packageName: 'Premium',
  packagePrice: 11000,
  level: 0,
  directReferralsCount: 18,
  totalNetworkCount: 126,
  status: 'Active',
  walletBalance: '₹42,850',
  totalEarnings: '₹1,28,450',
  joinedDate: '12 Jan 2024',
  sponsorName: 'Sunil Verma (MEM-10021)',
  children: [
    {
      id: 'mem-10512',
      memberId: 'MEM-10512',
      name: 'Priya Patel',
      packageName: 'Standard',
      packagePrice: 5000,
      level: 1,
      directReferralsCount: 8,
      totalNetworkCount: 42,
      status: 'Active',
      walletBalance: '₹18,200',
      totalEarnings: '₹46,500',
      joinedDate: '18 Feb 2024',
      sponsorName: 'Rahul Sharma',
      children: [
        {
          id: 'mem-10610',
          memberId: 'MEM-10610',
          name: 'Sneha Gupta',
          packageName: 'Standard',
          packagePrice: 5000,
          level: 2,
          directReferralsCount: 4,
          totalNetworkCount: 19,
          status: 'Active',
          walletBalance: '₹12,500',
          totalEarnings: '₹29,800',
          joinedDate: '28 Mar 2024',
          sponsorName: 'Priya Patel',
          children: [
            {
              id: 'mem-10788',
              memberId: 'MEM-10788',
              name: 'Karthik Nair',
              packageName: 'Premium',
              packagePrice: 11000,
              level: 3,
              directReferralsCount: 2,
              totalNetworkCount: 8,
              status: 'Active',
              walletBalance: '₹14,200',
              totalEarnings: '₹31,000',
              joinedDate: '10 May 2024',
              sponsorName: 'Sneha Gupta',
              children: [
                {
                  id: 'mem-10890',
                  memberId: 'MEM-10890',
                  name: 'Tanvi Shinde',
                  packageName: 'Basic',
                  packagePrice: 3000,
                  level: 4,
                  directReferralsCount: 1,
                  totalNetworkCount: 3,
                  status: 'Active',
                  walletBalance: '₹2,800',
                  totalEarnings: '₹5,600',
                  joinedDate: '02 Jun 2024',
                  sponsorName: 'Karthik Nair',
                  children: [
                    {
                      id: 'mem-10920',
                      memberId: 'MEM-10920',
                      name: 'Mohit Rawat',
                      packageName: 'Basic',
                      packagePrice: 3000,
                      level: 5,
                      directReferralsCount: 0,
                      totalNetworkCount: 0,
                      status: 'Active',
                      walletBalance: '₹800',
                      totalEarnings: '₹1,500',
                      joinedDate: '15 Jun 2024',
                      sponsorName: 'Tanvi Shinde'
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 'mem-10642',
          memberId: 'MEM-10642',
          name: 'Amit Roy',
          packageName: 'Basic',
          packagePrice: 3000,
          level: 2,
          directReferralsCount: 2,
          totalNetworkCount: 7,
          status: 'Active',
          walletBalance: '₹3,200',
          totalEarnings: '₹7,400',
          joinedDate: '05 Apr 2024',
          sponsorName: 'Priya Patel',
          children: [
            {
              id: 'mem-10811',
              memberId: 'MEM-10811',
              name: 'Suresh Menon',
              packageName: 'Standard',
              packagePrice: 5000,
              level: 3,
              directReferralsCount: 1,
              totalNetworkCount: 2,
              status: 'Active',
              walletBalance: '₹4,100',
              totalEarnings: '₹9,200',
              joinedDate: '22 May 2024',
              sponsorName: 'Amit Roy'
            }
          ]
        }
      ]
    },
    {
      id: 'mem-10534',
      memberId: 'MEM-10534',
      name: 'Ananya Rao',
      packageName: 'Premium',
      packagePrice: 11000,
      level: 1,
      directReferralsCount: 5,
      totalNetworkCount: 31,
      status: 'Active',
      walletBalance: '₹24,600',
      totalEarnings: '₹58,900',
      joinedDate: '02 Mar 2024',
      sponsorName: 'Rahul Sharma',
      children: [
        {
          id: 'mem-10675',
          memberId: 'MEM-10675',
          name: 'Neha Joshi',
          packageName: 'Pro',
          packagePrice: 18600,
          level: 2,
          directReferralsCount: 6,
          totalNetworkCount: 22,
          status: 'Active',
          walletBalance: '₹31,000',
          totalEarnings: '₹78,500',
          joinedDate: '12 Apr 2024',
          sponsorName: 'Ananya Rao',
          children: [
            {
              id: 'mem-10815',
              memberId: 'MEM-10815',
              name: 'Kavita Deshmukh',
              packageName: 'Standard',
              packagePrice: 5000,
              level: 3,
              directReferralsCount: 2,
              totalNetworkCount: 6,
              status: 'Active',
              walletBalance: '₹7,600',
              totalEarnings: '₹15,800',
              joinedDate: '18 May 2024',
              sponsorName: 'Neha Joshi'
            }
          ]
        }
      ]
    },
    {
      id: 'mem-10589',
      memberId: 'MEM-10589',
      name: 'Vikram Malhotra',
      packageName: 'Basic',
      packagePrice: 3000,
      level: 1,
      directReferralsCount: 3,
      totalNetworkCount: 14,
      status: 'Active',
      walletBalance: '₹6,400',
      totalEarnings: '₹14,200',
      joinedDate: '15 Mar 2024',
      sponsorName: 'Rahul Sharma',
      children: [
        {
          id: 'mem-10733',
          memberId: 'MEM-10733',
          name: 'Deepak Joshi',
          packageName: 'Basic',
          packagePrice: 3000,
          level: 2,
          directReferralsCount: 1,
          totalNetworkCount: 4,
          status: 'Active',
          walletBalance: '₹1,500',
          totalEarnings: '₹3,200',
          joinedDate: '01 May 2024',
          sponsorName: 'Vikram Malhotra'
        }
      ]
    },
    {
      id: 'mem-10701',
      memberId: 'MEM-10701',
      name: 'Rajesh Kumar',
      packageName: 'Standard',
      packagePrice: 5000,
      level: 1,
      directReferralsCount: 2,
      totalNetworkCount: 9,
      status: 'Active',
      walletBalance: '₹4,800',
      totalEarnings: '₹11,200',
      joinedDate: '20 Apr 2024',
      sponsorName: 'Rahul Sharma'
    },
    {
      id: 'mem-10850',
      memberId: 'MEM-10850',
      name: 'Rohan Kapoor',
      packageName: 'Pro',
      packagePrice: 18600,
      level: 1,
      directReferralsCount: 3,
      totalNetworkCount: 12,
      status: 'Active',
      walletBalance: '₹22,400',
      totalEarnings: '₹52,000',
      joinedDate: '25 May 2024',
      sponsorName: 'Rahul Sharma'
    }
  ]
};

// Corporate view root
export const ADMIN_NETWORK_ROOT: NetworkNode = {
  id: 'mem-10001',
  memberId: 'MEM-10001',
  name: 'Corporate Root (Genesis)',
  packageName: 'Pro',
  packagePrice: 18600,
  level: 0,
  directReferralsCount: 48,
  totalNetworkCount: 12842,
  status: 'Active',
  walletBalance: '₹8,45,000',
  totalEarnings: '₹48,60,000',
  joinedDate: '01 Jan 2023',
  sponsorName: 'System Core',
  children: [
    {
      id: 'mem-10021',
      memberId: 'MEM-10021',
      name: 'Sunil Verma',
      packageName: 'Pro',
      packagePrice: 18600,
      level: 1,
      directReferralsCount: 34,
      totalNetworkCount: 482,
      status: 'Active',
      walletBalance: '₹86,400',
      totalEarnings: '₹3,42,100',
      joinedDate: '04 Oct 2023',
      sponsorName: 'Corporate Root',
      children: [
        NETWORK_TREE_DATA
      ]
    },
    {
      id: 'mem-10034',
      memberId: 'MEM-10034',
      name: 'Aditi Deshpande',
      packageName: 'Pro',
      packagePrice: 18600,
      level: 1,
      directReferralsCount: 29,
      totalNetworkCount: 3840,
      status: 'Active',
      walletBalance: '₹1,45,200',
      totalEarnings: '₹6,12,000',
      joinedDate: '15 Oct 2023',
      sponsorName: 'Corporate Root'
    },
    {
      id: 'mem-10088',
      memberId: 'MEM-10088',
      name: 'Harish Mehta',
      packageName: 'Premium',
      packagePrice: 11000,
      level: 1,
      directReferralsCount: 22,
      totalNetworkCount: 2190,
      status: 'Active',
      walletBalance: '₹92,800',
      totalEarnings: '₹4,30,000',
      joinedDate: '01 Nov 2023',
      sponsorName: 'Corporate Root'
    }
  ]
};
