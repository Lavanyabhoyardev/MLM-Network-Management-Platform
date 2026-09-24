export interface KYCDocument {
  type: 'Aadhaar Card' | 'PAN Card' | 'Passport' | 'Bank Statement' | 'Cancelled Cheque';
  documentNumber: string;
  frontUrl: string;
  backUrl?: string;
  verified: boolean;
}

export interface KYCSubmission {
  id: string;
  kycId: string;
  memberId: string;
  memberName: string;
  memberEmail: string;
  memberPhone: string;
  packagePurchased: string;
  submittedDate: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  reviewer: string;
  reviewedDate?: string;
  documents: KYCDocument[];
  rejectionReason?: string;
  notes?: string;
}

export const INITIAL_KYC_REQUESTS: KYCSubmission[] = [
  {
    id: 'kyc-101',
    kycId: 'KYC-9410',
    memberId: 'MEM-10534',
    memberName: 'Ananya Rao',
    memberEmail: 'ananya.rao@example.com',
    memberPhone: '+91 98450 12389',
    packagePurchased: 'Premium',
    submittedDate: '2024-06-18 11:24',
    status: 'Pending',
    reviewer: 'Unassigned',
    documents: [
      {
        type: 'Aadhaar Card',
        documentNumber: 'XXXX-XXXX-9481',
        frontUrl: 'aadhaar_front_sample.jpg',
        backUrl: 'aadhaar_back_sample.jpg',
        verified: false
      },
      {
        type: 'PAN Card',
        documentNumber: 'ABCDE9841K',
        frontUrl: 'pancard_sample.jpg',
        verified: false
      },
      {
        type: 'Cancelled Cheque',
        documentNumber: 'CHQ-882109',
        frontUrl: 'cheque_sample.jpg',
        verified: false
      }
    ],
    notes: 'Member registered yesterday under Rahul Sharma. Ready for compliance review.'
  },
  {
    id: 'kyc-102',
    kycId: 'KYC-9408',
    memberId: 'MEM-10642',
    memberName: 'Amit Roy',
    memberEmail: 'amit.roy@example.com',
    memberPhone: '+91 94350 99812',
    packagePurchased: 'Basic',
    submittedDate: '2024-06-17 16:50',
    status: 'Pending',
    reviewer: 'Unassigned',
    documents: [
      {
        type: 'Aadhaar Card',
        documentNumber: 'XXXX-XXXX-3312',
        frontUrl: 'aadhaar_front_sample.jpg',
        backUrl: 'aadhaar_back_sample.jpg',
        verified: false
      },
      {
        type: 'PAN Card',
        documentNumber: 'BNMPR4421M',
        frontUrl: 'pancard_sample.jpg',
        verified: false
      }
    ],
    notes: 'Submitted via mobile portal.'
  },
  {
    id: 'kyc-103',
    kycId: 'KYC-9405',
    memberId: 'MEM-10788',
    memberName: 'Karthik Nair',
    memberEmail: 'karthik.nair@example.com',
    memberPhone: '+91 98470 66219',
    packagePurchased: 'Premium',
    submittedDate: '2024-06-16 14:10',
    status: 'Pending',
    reviewer: 'Compliance Officer 2',
    documents: [
      {
        type: 'Passport',
        documentNumber: 'Z8941029',
        frontUrl: 'passport_front_sample.jpg',
        verified: false
      },
      {
        type: 'PAN Card',
        documentNumber: 'KLMPO8812J',
        frontUrl: 'pancard_sample.jpg',
        verified: false
      }
    ],
    notes: 'NRI KYC verification in progress.'
  },
  {
    id: 'kyc-104',
    kycId: 'KYC-9390',
    memberId: 'MEM-10482',
    memberName: 'Rahul Sharma',
    memberEmail: 'rahul.sharma@example.com',
    memberPhone: '+91 98201 44821',
    packagePurchased: 'Premium',
    submittedDate: '2024-01-14 09:30',
    status: 'Approved',
    reviewer: 'Senior Officer Rajesh V.',
    reviewedDate: '2024-01-14 15:40',
    documents: [
      {
        type: 'Aadhaar Card',
        documentNumber: 'XXXX-XXXX-4421',
        frontUrl: 'aadhaar_front_sample.jpg',
        backUrl: 'aadhaar_back_sample.jpg',
        verified: true
      },
      {
        type: 'PAN Card',
        documentNumber: 'APQRS5541L',
        frontUrl: 'pancard_sample.jpg',
        verified: true
      },
      {
        type: 'Bank Statement',
        documentNumber: 'HDFC-STMT-0128',
        frontUrl: 'bank_statement_sample.jpg',
        verified: true
      }
    ],
    notes: 'All biometric details and name matches government repository.'
  },
  {
    id: 'kyc-105',
    kycId: 'KYC-9388',
    memberId: 'MEM-10701',
    memberName: 'Rajesh Kumar',
    memberEmail: 'rajesh.k@example.com',
    memberPhone: '+91 97110 33871',
    packagePurchased: 'Standard',
    submittedDate: '2024-06-12 11:00',
    status: 'Rejected',
    reviewer: 'Compliance Officer 1',
    reviewedDate: '2024-06-13 10:20',
    rejectionReason: 'Blurred PAN card image and address mismatch between Aadhaar and bank account proof.',
    documents: [
      {
        type: 'Aadhaar Card',
        documentNumber: 'XXXX-XXXX-1102',
        frontUrl: 'aadhaar_front_sample.jpg',
        verified: false
      },
      {
        type: 'PAN Card',
        documentNumber: 'BLURRED-IMAGE',
        frontUrl: 'pancard_sample.jpg',
        verified: false
      }
    ],
    notes: 'Notified member to re-upload clear government ID photo.'
  }
];
