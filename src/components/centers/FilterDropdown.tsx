import React from 'react';

interface FilterDropdownProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export function FilterDropdown({ label, options, value, onChange }: FilterDropdownProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-sm font-medium text-gray-300 capitalize">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-3 py-3 rounded-xl border border-gray-700 bg-gray-900/50 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow cursor-pointer"
      >
        <option value="">Tất cả các {label}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {label} {option}
          </option>
        ))}
      </select>
    </div>
  );
}