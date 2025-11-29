import React from 'react';
import { FixedUI } from '../FixedUI';
import { ScrollToTop } from './ScrollToTop';

interface LayoutProps {
  children: React.ReactNode;
}

/**
 * Layout component
 * Wraps all pages with consistent header and navigation
 */
export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <ScrollToTop />
      <FixedUI />
      {children}
    </>
  );
};
