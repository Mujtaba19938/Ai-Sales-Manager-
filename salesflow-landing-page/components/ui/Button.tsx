import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'black';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  className = '',
  ...props 
}) => {
  const baseStyles = "rounded-full font-bold transition-all duration-200 inline-flex items-center justify-center cursor-pointer active:scale-95";
  
  const variants = {
    primary: "bg-brand-400 hover:bg-brand-500 text-slate-900 shadow-lg shadow-brand-400/20 hover:shadow-brand-400/40",
    secondary: "bg-brand-100 hover:bg-brand-200 text-brand-900",
    outline: "border-2 border-slate-200 text-slate-900 hover:border-slate-900 bg-transparent",
    black: "bg-slate-900 hover:bg-black text-white shadow-lg shadow-slate-900/20"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  return (
    <button 
      className={`
        ${baseStyles} 
        ${variants[variant]} 
        ${sizes[size]} 
        ${fullWidth ? 'w-full' : ''} 
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;