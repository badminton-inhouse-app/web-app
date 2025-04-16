import React from 'react';
import { Activity } from 'lucide-react';

const SpinnerLoading = ({ size = 40 }: { size?: number }) => {
  return (
    <div className="flex bg-gradient-to-br from-gray-900 to-blue-900  items-center justify-center w-full h-full absolute top-0 left-0">
      <div className="relative">
        <div className="animate-spin">
          <Activity
            size={size}
            className="text-white/80"
            strokeWidth={1.5}
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-white/20 rounded-full animate-pulse" />
        </div>
      </div>
      <span className="ml-3 text-white/70 animate-pulse">Tải dữ liệu...</span>
    </div>
  );
};

export default SpinnerLoading;