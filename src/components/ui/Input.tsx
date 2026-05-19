import React, { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className = "", ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label className="block text-xs font-medium text-surface-700 uppercase tracking-wider">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-surface-600">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={`w-full bg-surface-200 border border-surface-400 rounded-xl px-4 py-3 text-surface-900 placeholder:text-surface-600 focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20 transition-all duration-200 ${
              icon ? "pl-11" : ""
            } ${error ? "border-danger focus:border-danger focus:ring-danger/20" : ""} ${className}`}
            {...props}
          />
        </div>
        {error && <p className="text-xs text-danger mt-1">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
