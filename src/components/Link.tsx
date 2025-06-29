import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
}

export function Link({ href, children, className, ...props }: LinkProps) {
  const isExternal = href.startsWith('http');
  
  if (isExternal) {
    return (
      <a 
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <RouterLink to={href} className={className} {...props}>
      {children}
    </RouterLink>
  );
}