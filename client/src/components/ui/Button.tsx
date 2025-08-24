import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    fullWidth = false,
    children,
    ...props 
  }, ref) => {
    const baseStyles = [
      // Base styles - consistent across all variants
      "inline-flex items-center justify-center gap-2",
      "rounded-full font-semibold transition-all duration-300",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
      "disabled:pointer-events-none disabled:opacity-50",
      "motion-reduce:transition-none"
    ];

    const variantStyles = {
      primary: [
        "bg-primary hover:bg-primary-dark text-white",
        "shadow-lg hover:shadow-xl",
        "focus-visible:ring-secondary"
      ],
      secondary: [
        "border-2 border-primary text-primary hover:bg-primary hover:text-white",
        "focus-visible:ring-primary"
      ],
      outline: [
        "border-2 border-neutral-300 text-neutral-700 hover:border-primary hover:text-primary",
        "focus-visible:ring-primary"
      ],
      ghost: [
        "text-neutral-700 hover:bg-neutral-100 hover:text-primary",
        "focus-visible:ring-primary"
      ],
      link: [
        "text-primary underline-offset-4 hover:underline",
        "focus-visible:ring-primary rounded-sm px-2 py-1"
      ]
    };

    const sizeStyles = {
      sm: "text-sm px-4 py-2 h-10",
      md: "text-base px-6 py-3 h-12",
      lg: "text-lg px-8 py-4 h-14",
      xl: "text-xl px-10 py-5 h-16"
    };

    const widthStyles = fullWidth ? "w-full" : "w-auto";

    return (
      <button
        className={cn(
          baseStyles,
          variantStyles[variant],
          variant !== 'link' && sizeStyles[size],
          widthStyles,
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };