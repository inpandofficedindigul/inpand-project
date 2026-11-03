import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'accent' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  to?: string;
  href?: string;
  target?: string;
  rel?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  to,
  href,
  target,
  rel,
  children,
  icon,
  iconPosition = 'right',
  className,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium tracking-tight transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] select-none';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-1.5 rounded-sm gap-1.5',
    md: 'text-sm px-5 py-2.5 rounded-sm gap-2',
    lg: 'text-base px-6 py-3 rounded-sm gap-2.5',
  };

  const variantStyles = {
    primary:
      'bg-primary text-white hover:bg-black border border-transparent shadow-subtle',
    accent:
      'bg-accent text-white hover:bg-accent-hover border border-transparent shadow-subtle',
    secondary:
      'bg-white text-primary border border-border hover:border-border-strong hover:bg-gray-50 shadow-subtle',
    outline:
      'bg-transparent text-primary border border-border hover:border-primary',
    ghost:
      'bg-transparent text-secondary hover:text-primary hover:bg-black/5',
  };

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </>
  );

  const classes = cn(baseStyles, sizeStyles[size], variantStyles[variant], className);

  if (to) {
    return (
      <Link to={to} className={classes}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : rel}
        className={classes}
      >
        {content}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {content}
    </button>
  );
};

