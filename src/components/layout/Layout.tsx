import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ScrollToTop } from '../common/ScrollToTop';

export const Layout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-bg text-primary">
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow pt-24">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

