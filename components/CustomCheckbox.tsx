
import React from 'react';
import CheckIcon from './icons/CheckIcon';
import SquareIcon from './icons/SquareIcon';

interface CustomCheckboxProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  labelClassName?: string;
  checkboxClassName?: string;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ id, label, checked, onChange, labelClassName, checkboxClassName }) => {
  return (
    <label htmlFor={id} className={`flex items-center space-x-3 cursor-pointer group ${labelClassName}`}>
      <div className={`relative flex items-center justify-center w-6 h-6 border-2 rounded transition-colors duration-150 ease-in-out ${checked ? 'bg-sky-500 border-sky-500' : 'bg-white border-slate-400 group-hover:border-sky-500'} ${checkboxClassName}`}>
        {checked ? <CheckIcon className="w-5 h-5 text-white" /> : <SquareIcon className="w-5 h-5 text-transparent" />} 
      </div>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only" // Hide default checkbox
      />
      <span className={`text-slate-700 group-hover:text-sky-600 select-none ${checked ? 'line-through text-slate-500' : ''}`}>{label}</span>
    </label>
  );
};

export default CustomCheckbox;
