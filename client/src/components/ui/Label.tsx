import React from 'react';
import { cn } from '@/lib/utils';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  children: React.ReactNode;
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, required = false, children, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(
        "block text-sm font-medium text-neutral-700 leading-6",
        required && "after:content-['*'] after:ml-1 after:text-red-500",
        className
      )}
      {...props}
    >
      {children}
    </label>
  )
);

Label.displayName = "Label";

export { Label };