import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { DashboardLayout } from './components/DashboardLayout';
import { Login } from './pages/Login';

// Admin Pages
import { AdminOverview } from './pages/admin/AdminOverview';
import { AdminMembers } from './pages/admin/AdminMembers';
import { AdminKYC } from './pages/admin/AdminKYC';
import { AdminPackages } from './pages/admin/AdminPackages';
import { AdminNetwork } from './pages/admin/AdminNetwork';
import { AdminCommissions } from './pages/admin/AdminCommissions';
import { AdminWeeklyBonus } from './pages/admin/AdminWeeklyBonus';
import { AdminMonthlyBonus } from './pages/admin/AdminMonthlyBonus';
import { AdminManualBonus } from './pages/admin/AdminManualBonus';
import { AdminNonWorkingBenefits } from './pages/admin/AdminNonWorkingBenefits';
import { AdminWallet } from './pages/admin/AdminWallet';
import { AdminWithdrawals } from './pages/admin/AdminWithdrawals';
import { AdminReports } from './pages/admin/AdminReports';
import { AdminSettings } from './pages/admin/AdminSettings';
import { AdminAuditLogs } from './pages/admin/AdminAuditLogs';

// Member Pages
import { MemberHome } from './pages/member/MemberHome';
import { MemberProfile } from './pages/member/MemberProfile';
import { MemberKYC } from './pages/member/MemberKYC';
import { MemberPackage } from './pages/member/MemberPackage';
import { MemberNetwork } from './pages/member/MemberNetwork';
import { MemberActiveIncome } from './pages/member/MemberActiveIncome';
import { MemberPassiveIncome } from './pages/member/MemberPassiveIncome';
import { MemberWeeklyBonus } from './pages/member/MemberWeeklyBonus';
import { MemberMonthlyBonus } from './pages/member/MemberMonthlyBonus';
import { MemberBenefits } from './pages/member/MemberBenefits';
import { MemberWallet } from './pages/member/MemberWallet';
import { MemberWithdraw } from './pages/member/MemberWithdraw';
import { MemberNotifications } from './pages/member/MemberNotifications';

export const App: React.FC = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Landing / Role Switcher Screen */}
          <Route path="/" element={<Login />} />

          {/* Admin Dashboard Experience */}
          <Route path="/admin" element={<DashboardLayout />}>
            <Route index element={<AdminOverview />} />
            <Route path="members" element={<AdminMembers />} />
            <Route path="kyc" element={<AdminKYC />} />
            <Route path="packages" element={<AdminPackages />} />
            <Route path="network" element={<AdminNetwork />} />
            <Route path="commissions" element={<AdminCommissions />} />
            <Route path="weekly-bonus" element={<AdminWeeklyBonus />} />
            <Route path="monthly-bonus" element={<AdminMonthlyBonus />} />
            <Route path="manual-bonus" element={<AdminManualBonus />} />
            <Route path="non-working-benefits" element={<AdminNonWorkingBenefits />} />
            <Route path="wallet" element={<AdminWallet />} />
            <Route path="withdrawals" element={<AdminWithdrawals />} />
            <Route path="reports" element={<AdminReports />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="audit-logs" element={<AdminAuditLogs />} />
          </Route>

          {/* Member Dashboard Experience */}
          <Route path="/member" element={<DashboardLayout />}>
            <Route index element={<MemberHome />} />
            <Route path="profile" element={<MemberProfile />} />
            <Route path="kyc" element={<MemberKYC />} />
            <Route path="package" element={<MemberPackage />} />
            <Route path="network" element={<MemberNetwork />} />
            <Route path="active-income" element={<MemberActiveIncome />} />
            <Route path="passive-income" element={<MemberPassiveIncome />} />
            <Route path="weekly-bonus" element={<MemberWeeklyBonus />} />
            <Route path="monthly-bonus" element={<MemberMonthlyBonus />} />
            <Route path="benefits" element={<MemberBenefits />} />
            <Route path="wallet" element={<MemberWallet />} />
            <Route path="withdraw" element={<MemberWithdraw />} />
            <Route path="notifications" element={<MemberNotifications />} />
          </Route>

          {/* Catch-All */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
