import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'error' | 'success';
  inputSize?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  label?: string;
  error?: string;
  helpText?: string;
  required?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className,
    variant = 'default',
    inputSize = 'md',
    fullWidth = false,
    label,
    error,
    helpText,
    required = false,
    id,
    ...props 
  }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const errorId = error ? `${inputId}-error` : undefined;
    const helpId = helpText ? `${inputId}-help` : undefined;

    const baseStyles = [
      "block rounded-lg border transition-all duration-200",
      "focus:ring-2 focus:ring-offset-1 focus:outline-none",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "placeholder:text-neutral-400",
      "motion-reduce:transition-none"
    ];

    const variantStyles = {
      default: [
        "border-neutral-300 bg-white text-neutral-900",
        "focus:border-primary focus:ring-primary/20",
        "hover:border-neutral-400"
      ],
      error: [
        "border-red-500 bg-white text-neutral-900",
        "focus:border-red-500 focus:ring-red-500/20"
      ],
      success: [
        "border-green-500 bg-white text-neutral-900", 
        "focus:border-green-500 focus:ring-green-500/20"
      ]
    };

    const sizeStyles = {
      sm: "text-sm px-3 py-2 h-10",
      md: "text-base px-4 py-3 h-12",
      lg: "text-lg px-5 py-4 h-14"
    };

    const widthStyles = fullWidth ? "w-full" : "w-auto";

    const actualVariant = error ? 'error' : variant;

    return (
      <div className={cn("space-y-2", fullWidth && "w-full")}>
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "block text-sm font-medium text-neutral-700",
              required && "after:content-['*'] after:ml-1 after:text-red-500"
            )}
          >
            {label}
          </label>
        )}
        
        <input
          ref={ref}
          id={inputId}
          className={cn(
            baseStyles,
            variantStyles[actualVariant],
            sizeStyles[inputSize],
            widthStyles,
            className
          )}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={cn(
            error && errorId,
            helpText && helpId
          )}
          {...props}
        />

        {helpText && !error && (
          <p id={helpId} className="text-sm text-neutral-600">
            {helpText}
          </p>
        )}

        {error && (
          <p 
            id={errorId} 
            className="text-sm text-red-600 font-medium"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };