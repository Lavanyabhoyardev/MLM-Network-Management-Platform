import React from 'react';
import { AlertCircle, HelpCircle, Info } from 'lucide-react';

interface BannerNoticeProps {
  type?: 'warning' | 'info' | 'amber';
  title?: string;
  message: string;
  className?: string;
}

export const BannerNotice: React.FC<BannerNoticeProps> = ({
  type = 'warning',
  title = 'Pending Client Approval',
  message,
  className = ''
}) => {
  const isWarning = type === 'warning' || type === 'amber';

  return (
    <div
      className={`flex items-start gap-3 p-3.5 rounded-lg border text-sm ${
        isWarning
          ? 'bg-amber-50/70 border-amber-200/80 text-amber-900'
          : 'bg-blue-50/70 border-blue-200/80 text-blue-900'
      } ${className}`}
    >
      {isWarning ? (
        <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
      ) : (
        <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
      )}
      <div className="flex-1">
        {title && <span className="font-semibold mr-1.5">{title}:</span>}
        <span className="text-slate-700 leading-relaxed">{message}</span>
      </div>
    </div>
  );
};
