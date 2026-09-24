import React, { createContext, useContext, useState, ReactNode } from 'react';
import { MemberData, MEMBERS, CURRENT_LOGGED_IN_MEMBER } from '../mockData/members';
import { PackageData, PACKAGES } from '../mockData/packages';
import { KYCSubmission, INITIAL_KYC_REQUESTS } from '../mockData/kycRequests';
import { WithdrawalRequest, INITIAL_WITHDRAWALS } from '../mockData/withdrawals';
import { LedgerEntry, INITIAL_LEDGER_ENTRIES } from '../mockData/walletLedger';
import { AuditLogEntry, INITIAL_AUDIT_LOGS } from '../mockData/auditLogs';
import { NotificationItemData, INITIAL_NOTIFICATIONS } from '../mockData/notifications';
import {
  ManualBonus,
  INITIAL_MANUAL_BONUSES,
  NonWorkingBenefit,
  INITIAL_NON_WORKING_BENEFITS,
  QualifiedWeeklyMember,
  INITIAL_QUALIFIED_WEEKLY_MEMBERS,
  INITIAL_WEEKLY_BONUS_METRICS
} from '../mockData/bonuses';

interface AppContextType {
  role: 'admin' | 'member';
  setRole: (role: 'admin' | 'member') => void;
  currentMember: MemberData;
  updateMemberProfile: (updated: Partial<MemberData>) => void;

  // KYC
  kycList: KYCSubmission[];
  approveKYC: (kycId: string) => void;
  rejectKYC: (kycId: string, reason: string) => void;

  // Withdrawals
  withdrawals: WithdrawalRequest[];
  approveWithdrawal: (id: string) => void;
  rejectWithdrawal: (id: string, reason: string) => void;
  markWithdrawalProcessing: (id: string) => void;
  markWithdrawalPaid: (id: string) => void;
  submitMemberWithdrawal: (amount: number, method: WithdrawalRequest['paymentMethod'], accountDetails: any) => boolean;

  // Weekly Bonus
  weeklyMetrics: typeof INITIAL_WEEKLY_BONUS_METRICS;
  qualifiedWeeklyMembers: QualifiedWeeklyMember[];
  closeWeek: () => void;

  // Manual Bonus
  manualBonuses: ManualBonus[];
  addManualBonus: (bonus: Omit<ManualBonus, 'id' | 'reference' | 'formattedAmount' | 'dateTime' | 'status'>) => void;

  // Non-working benefits
  nonWorkingBenefits: NonWorkingBenefit[];
  addNonWorkingBenefit: (benefit: Omit<NonWorkingBenefit, 'id' | 'reference' | 'date' | 'status'>) => void;

  // Packages
  packages: PackageData[];
  updatePackage: (id: string, updated: Partial<PackageData>) => void;

  // Ledger & Audit
  ledgerEntries: LedgerEntry[];
  auditLogs: AuditLogEntry[];

  // Notifications
  notifications: NotificationItemData[];
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<'admin' | 'member'>('admin');
  const [currentMember, setCurrentMember] = useState<MemberData>(CURRENT_LOGGED_IN_MEMBER);
  const [kycList, setKycList] = useState<KYCSubmission[]>(INITIAL_KYC_REQUESTS);
  const [withdrawals, setWithdrawals] = useState<WithdrawalRequest[]>(INITIAL_WITHDRAWALS);
  const [packages, setPackages] = useState<PackageData[]>(PACKAGES);
  const [ledgerEntries, setLedgerEntries] = useState<LedgerEntry[]>(INITIAL_LEDGER_ENTRIES);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(INITIAL_AUDIT_LOGS);
  const [notifications, setNotifications] = useState<NotificationItemData[]>(INITIAL_NOTIFICATIONS);

  // Bonuses
  const [weeklyMetrics, setWeeklyMetrics] = useState(INITIAL_WEEKLY_BONUS_METRICS);
  const [qualifiedWeeklyMembers, setQualifiedWeeklyMembers] = useState<QualifiedWeeklyMember[]>(INITIAL_QUALIFIED_WEEKLY_MEMBERS);
  const [manualBonuses, setManualBonuses] = useState<ManualBonus[]>(INITIAL_MANUAL_BONUSES);
  const [nonWorkingBenefits, setNonWorkingBenefits] = useState<NonWorkingBenefit[]>(INITIAL_NON_WORKING_BENEFITS);

  const addAuditLog = (action: string, module: AuditLogEntry['module'], reference: string, description: string) => {
    const newLog: AuditLogEntry = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      adminName: 'Sanjay Deshmukh (AD-01)',
      adminRole: 'Super Admin',
      action,
      module,
      reference,
      description,
      ipAddress: '103.21.58.112',
      device: 'Demo Browser Client',
      status: 'Success'
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const updateMemberProfile = (updated: Partial<MemberData>) => {
    setCurrentMember(prev => ({ ...prev, ...updated }));
  };

  const approveKYC = (kycId: string) => {
    setKycList(prev =>
      prev.map(k => (k.id === kycId || k.kycId === kycId ? { ...k, status: 'Approved', reviewer: 'Super Admin (AD-01)', reviewedDate: new Date().toISOString().substring(0, 10) } : k))
    );
    addAuditLog('KYC approved', 'KYC', kycId, `KYC request ${kycId} was reviewed and approved.`);
  };

  const rejectKYC = (kycId: string, reason: string) => {
    setKycList(prev =>
      prev.map(k => (k.id === kycId || k.kycId === kycId ? { ...k, status: 'Rejected', rejectionReason: reason, reviewer: 'Super Admin (AD-01)', reviewedDate: new Date().toISOString().substring(0, 10) } : k))
    );
    addAuditLog('KYC rejected', 'KYC', kycId, `KYC request ${kycId} was rejected: ${reason}`);
  };

  const approveWithdrawal = (id: string) => {
    setWithdrawals(prev =>
      prev.map(w => (w.id === id || w.requestId === id ? { ...w, status: 'Approved', transactionRef: `APV-${Math.floor(1000 + Math.random() * 9000)}` } : w))
    );
    addAuditLog('Withdrawal approved', 'Withdrawals', id, `Withdrawal request ${id} approved for batch dispatch.`);
  };

  const rejectWithdrawal = (id: string, reason: string) => {
    setWithdrawals(prev =>
      prev.map(w => (w.id === id || w.requestId === id ? { ...w, status: 'Rejected', remarks: reason } : w))
    );
    addAuditLog('Withdrawal rejected', 'Withdrawals', id, `Withdrawal request ${id} rejected. Reason: ${reason}`);
  };

  const markWithdrawalProcessing = (id: string) => {
    setWithdrawals(prev =>
      prev.map(w => (w.id === id || w.requestId === id ? { ...w, status: 'Processing' } : w))
    );
    addAuditLog('Withdrawal set to processing', 'Withdrawals', id, `Dispatched to payment gateway bank gateway.`);
  };

  const markWithdrawalPaid = (id: string) => {
    setWithdrawals(prev =>
      prev.map(w => (w.id === id || w.requestId === id ? { ...w, status: 'Paid', processedDate: new Date().toISOString().substring(0, 10), transactionRef: `IMPS-SETTLE-${Math.floor(100000 + Math.random() * 900000)}` } : w))
    );
    addAuditLog('Withdrawal settled', 'Withdrawals', id, `Marked as paid and settled in banking ledger.`);
  };

  const submitMemberWithdrawal = (amount: number, method: WithdrawalRequest['paymentMethod'], accountDetails: any) => {
    if (amount > currentMember.walletBalance || amount <= 0) {
      return false;
    }

    const newReqId = `WTH-${Math.floor(4500 + Math.random() * 500)}`;
    const newReq: WithdrawalRequest = {
      id: `wth-${Date.now()}`,
      requestId: newReqId,
      memberId: currentMember.memberId,
      memberName: currentMember.name,
      memberEmail: currentMember.email,
      amount,
      formattedAmount: `₹${amount.toLocaleString('en-IN')}`,
      requestedDate: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'Pending',
      paymentMethod: method,
      accountDetails,
      remarks: 'Submitted via Member Portal'
    };

    setWithdrawals(prev => [newReq, ...prev]);

    // Update member balance
    const updatedBalance = currentMember.walletBalance - amount;
    setCurrentMember(prev => ({
      ...prev,
      walletBalance: updatedBalance,
      formattedWallet: `₹${updatedBalance.toLocaleString('en-IN')}`
    }));

    // Add to ledger
    const newLedger: LedgerEntry = {
      id: `tx-${Date.now()}`,
      reference: `TX-${newReqId}`,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      memberId: currentMember.memberId,
      memberName: currentMember.name,
      transactionType: 'Withdrawal',
      sourceReference: `${newReqId} (${method})`,
      credit: 0,
      debit: amount,
      balanceAfter: updatedBalance,
      status: 'Pending'
    };
    setLedgerEntries(prev => [newLedger, ...prev]);

    // Add notification
    const newNotif: NotificationItemData = {
      id: `notif-${Date.now()}`,
      category: 'Payout',
      title: 'Withdrawal Request Submitted',
      message: `Your withdrawal request of ₹${amount.toLocaleString('en-IN')} has been submitted successfully and is pending approval.`,
      timestamp: 'Just now',
      read: false,
      link: '/member/withdraw'
    };
    setNotifications(prev => [newNotif, ...prev]);

    return true;
  };

  const closeWeek = () => {
    setWeeklyMetrics(prev => ({
      ...prev,
      isWeekClosed: true
    }));

    setQualifiedWeeklyMembers(prev =>
      prev.map(m => (m.qualification === 'Qualified' ? { ...m, status: 'Settled' } : m))
    );

    addAuditLog('Weekly bonus closed', 'Bonus', 'WBONUS-WEEKLY', `Closed current week. 2 qualified members allocated ₹1,250 each from ₹2,500 pool.`);
  };

  const addManualBonus = (bonus: Omit<ManualBonus, 'id' | 'reference' | 'formattedAmount' | 'dateTime' | 'status'>) => {
    const ref = `MBONUS-${Math.floor(800 + Math.random() * 200)}`;
    const newBonus: ManualBonus = {
      ...bonus,
      id: `mb-${Date.now()}`,
      reference: ref,
      formattedAmount: `₹${bonus.amount.toLocaleString('en-IN')}`,
      dateTime: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'Credited'
    };

    setManualBonuses(prev => [newBonus, ...prev]);

    // If for current member, credit wallet
    if (bonus.memberId === currentMember.memberId) {
      const newBal = currentMember.walletBalance + bonus.amount;
      setCurrentMember(prev => ({
        ...prev,
        walletBalance: newBal,
        formattedWallet: `₹${newBal.toLocaleString('en-IN')}`,
        totalEarnings: prev.totalEarnings + bonus.amount,
        formattedEarnings: `₹${(prev.totalEarnings + bonus.amount).toLocaleString('en-IN')}`
      }));
    }

    // Ledger entry
    const newLedger: LedgerEntry = {
      id: `tx-${Date.now()}`,
      reference: `TX-${ref}`,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      memberId: bonus.memberId,
      memberName: bonus.memberName,
      transactionType: 'Manual Bonus',
      sourceReference: `${ref} (${bonus.bonusType})`,
      credit: bonus.amount,
      debit: 0,
      balanceAfter: (bonus.memberId === currentMember.memberId ? currentMember.walletBalance + bonus.amount : 50000),
      status: 'Completed',
      notes: bonus.reason
    };
    setLedgerEntries(prev => [newLedger, ...prev]);

    addAuditLog('Manual bonus created', 'Bonus', ref, `Credited ${newBonus.formattedAmount} (${bonus.bonusType}) to ${bonus.memberName}.`);
  };

  const addNonWorkingBenefit = (benefit: Omit<NonWorkingBenefit, 'id' | 'reference' | 'date' | 'status'>) => {
    const ref = `NWB-${Math.floor(950 + Math.random() * 50)}`;
    const newBenefit: NonWorkingBenefit = {
      ...benefit,
      id: `nwb-${Date.now()}`,
      reference: ref,
      date: new Date().toISOString().substring(0, 10),
      status: 'Active'
    };

    setNonWorkingBenefits(prev => [newBenefit, ...prev]);
    addAuditLog('Non-working benefit created', 'Bonus', ref, `Granted ${benefit.benefitType} benefit to ${benefit.memberName}.`);
  };

  const updatePackage = (id: string, updated: Partial<PackageData>) => {
    setPackages(prev => prev.map(p => (p.id === id ? { ...p, ...updated } : p)));
    addAuditLog('Package updated', 'Packages', id, `Updated configuration for package ${id}.`);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        currentMember,
        updateMemberProfile,
        kycList,
        approveKYC,
        rejectKYC,
        withdrawals,
        approveWithdrawal,
        rejectWithdrawal,
        markWithdrawalProcessing,
        markWithdrawalPaid,
        submitMemberWithdrawal,
        weeklyMetrics,
        qualifiedWeeklyMembers,
        closeWeek,
        manualBonuses,
        addManualBonus,
        nonWorkingBenefits,
        addNonWorkingBenefit,
        packages,
        updatePackage,
        ledgerEntries,
        auditLogs,
        notifications,
        markNotificationAsRead,
        markAllNotificationsAsRead
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
