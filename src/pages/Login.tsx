import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, UserCheck, ArrowRight, Layers, Sparkles, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Login: React.FC = () => {
  const { setRole } = useApp();
  const navigate = useNavigate();

  const handleSelectRole = (selectedRole: 'admin' | 'member') => {
    setRole(selectedRole);
    if (selectedRole === 'admin') {
      navigate('/admin');
    } else {
      navigate('/member');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background subtle grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center">
        {/* Logo badge */}
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-600 text-white font-bold text-xl shadow-lg shadow-blue-500/20 mb-4">
          A
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          ApexMLM Management
        </h2>
        <p className="mt-2 text-sm text-slate-400">
          Enterprise Network Marketing & Commission Management Suite
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl relative z-10">
        <div className="bg-slate-800/80 backdrop-blur-md py-8 px-6 sm:px-10 border border-slate-700/80 rounded-2xl shadow-2xl">
          <div className="mb-6 text-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              Client Presentation Interactive Demo
            </span>
            <p className="text-xs text-slate-400 mt-2">
              Select an access portal to evaluate the dashboard and workflows:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Admin Selection Card */}
            <button
              onClick={() => handleSelectRole('admin')}
              className="group text-left p-5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700/60 hover:border-blue-500 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-white group-hover:text-blue-400 transition-colors">
                  Continue as Admin
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Full control center: 12,842 members, multi-branch network, KYC approval, ledger, weekly/monthly bonuses & payouts.
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs font-medium text-blue-400">
                <span>Launch Admin Console</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            {/* Member Selection Card */}
            <button
              onClick={() => handleSelectRole('member')}
              className="group text-left p-5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700/60 hover:border-emerald-500 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <UserCheck className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-white group-hover:text-emerald-400 transition-colors">
                  Continue as Member
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Member experience: Rahul Sharma (Premium tier), ₹42,850 wallet, 126 downlines, bonus targets & withdrawal request.
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs font-medium text-emerald-400">
                <span>Launch Member Portal</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </div>

          {/* Quick Notice */}
          <div className="mt-6 pt-5 border-t border-slate-700/60 text-center">
            <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Pre-populated with consistent Indian currency mock data (₹), 4 packages & multi-level tree hierarchy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
