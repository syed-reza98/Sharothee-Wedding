import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined' | 'filled';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ 
    className, 
    variant = 'default', 
    padding = 'md',
    children,
    ...props 
  }, ref) => {
    const baseStyles = [
      "rounded-xl bg-white border transition-all duration-300",
      "motion-reduce:transition-none"
    ];

    const variantStyles = {
      default: [
        "border-cream-200 shadow-sm hover:shadow-md"
      ],
      elevated: [
        "border-cream-200 shadow-lg hover:shadow-xl"
      ],
      outlined: [
        "border-2 border-primary shadow-none hover:shadow-sm"
      ],
      filled: [
        "bg-cream-50 border-cream-200 shadow-none"
      ]
    };

    const paddingStyles = {
      none: "",
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
      xl: "p-12"
    };

    return (
      <div
        className={cn(
          baseStyles,
          variantStyles[variant],
          paddingStyles[padding],
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

// Card Header Component
interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-2 pb-4", className)}
      {...props}
    >
      {children}
    </div>
  )
);

CardHeader.displayName = "CardHeader";

// Card Title Component
interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
}

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, level = 3, children, ...props }, ref) => {
    const levelStyles = {
      2: "text-2xl font-semibold",
      3: "text-xl font-semibold", 
      4: "text-lg font-semibold",
      5: "text-base font-semibold",
      6: "text-sm font-semibold"
    };

    const baseClasses = cn(
      levelStyles[level],
      "text-secondary leading-tight tracking-tight",
      className
    );

    switch (level) {
      case 2:
        return <h2 ref={ref as React.Ref<HTMLHeadingElement>} className={baseClasses} {...props}>{children}</h2>;
      case 3:
        return <h3 ref={ref as React.Ref<HTMLHeadingElement>} className={baseClasses} {...props}>{children}</h3>;
      case 4:
        return <h4 ref={ref as React.Ref<HTMLHeadingElement>} className={baseClasses} {...props}>{children}</h4>;
      case 5:
        return <h5 ref={ref as React.Ref<HTMLHeadingElement>} className={baseClasses} {...props}>{children}</h5>;
      case 6:
        return <h6 ref={ref as React.Ref<HTMLHeadingElement>} className={baseClasses} {...props}>{children}</h6>;
      default:
        return <h3 ref={ref as React.Ref<HTMLHeadingElement>} className={baseClasses} {...props}>{children}</h3>;
    }
  }
);

CardTitle.displayName = "CardTitle";

// Card Description Component
interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, children, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-neutral-600 leading-relaxed", className)}
      {...props}
    >
      {children}
    </p>
  )
);

CardDescription.displayName = "CardDescription";

// Card Content Component
interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("", className)}
      {...props}
    >
      {children}
    </div>
  )
);

CardContent.displayName = "CardContent";

// Card Footer Component
interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center pt-4", className)}
      {...props}
    >
      {children}
    </div>
  )
);

CardFooter.displayName = "CardFooter";

export { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
};