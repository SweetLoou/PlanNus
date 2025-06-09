
import React from 'react';

interface StyledButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

const StyledButton: React.FC<StyledButtonProps> = ({ children, variant = 'primary', size = 'md', className, ...props }) => {
  const baseStyles = "font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-150 ease-in-out inline-flex items-center justify-center";
  
  let variantStyles = "";
  switch (variant) {
    case 'primary':
      variantStyles = "bg-sky-600 text-white hover:bg-sky-700 focus:ring-sky-500";
      if (props.disabled) {
        variantStyles = "bg-slate-300 text-slate-500 cursor-not-allowed";
      }
      break;
    case 'secondary':
      variantStyles = "bg-slate-200 text-slate-700 hover:bg-slate-300 focus:ring-slate-400";
      if (props.disabled) {
        variantStyles = "bg-slate-100 text-slate-400 cursor-not-allowed";
      }
      break;
    case 'outline':
      variantStyles = "border border-sky-600 text-sky-600 hover:bg-sky-50 focus:ring-sky-500";
       if (props.disabled) {
        variantStyles = "border border-slate-300 text-slate-400 cursor-not-allowed";
      }
      break;
  }

  let sizeStyles = "";
  switch (size) {
    case 'sm':
      sizeStyles = "px-3 py-1.5 text-sm";
      break;
    case 'md':
      sizeStyles = "px-4 py-2 text-base";
      break;
    case 'lg':
      sizeStyles = "px-6 py-3 text-lg";
      break;
  }

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default StyledButton;
