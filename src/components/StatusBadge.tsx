import React from 'react';

export type StatusType =
  | 'Active'
  | 'Approved'
  | 'Completed'
  | 'Paid'
  | 'Qualified'
  | 'Success'
  | 'Pending'
  | 'Pending Calculation'
  | 'Pending Close'
  | 'Under Review'
  | 'In Progress'
  | 'Processing'
  | 'Hold'
  | 'Warning'
  | 'Rejected'
  | 'Suspended'
  | 'Inactive'
  | 'Failed'
  | 'Reversed'
  | 'Illustrative / Pending Client Approval'
  | 'Calculation rule pending client approval'
  | 'Pending Configuration'
  | 'Client Approval Required'
  | 'TBD';

interface StatusBadgeProps {
  status: string;
  size?: 'sm' | 'md';
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'sm', className = '' }) => {
  const s = status?.toLowerCase() || '';

  let styles = 'bg-slate-100 text-slate-700 border-slate-200';
  let dotColor = 'bg-slate-400';

  if (s.includes('active') || s.includes('approved') || s.includes('paid') || s.includes('completed') || s.includes('qualified') || s.includes('success')) {
    styles = 'bg-emerald-50 text-emerald-700 border-emerald-200/80';
    dotColor = 'bg-emerald-500';
  } else if (s.includes('pending') || s.includes('progress') || s.includes('review') || s.includes('processing') || s.includes('hold') || s.includes('warning') || s.includes('tbd')) {
    styles = 'bg-amber-50 text-amber-700 border-amber-200/80';
    dotColor = 'bg-amber-500';
  } else if (s.includes('reject') || s.includes('suspend') || s.includes('inactive') || s.includes('failed') || s.includes('reversed')) {
    styles = 'bg-rose-50 text-rose-700 border-rose-200/80';
    dotColor = 'bg-rose-500';
  } else if (s.includes('illustrative') || s.includes('approval required') || s.includes('calculation rule')) {
    styles = 'bg-blue-50 text-blue-700 border-blue-200/80';
    dotColor = 'bg-blue-500';
  }

  const sizeClasses = size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-xs px-2.5 py-1';

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full border ${sizeClasses} ${styles} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
      <span className="truncate">{status}</span>
    </span>
  );
};
