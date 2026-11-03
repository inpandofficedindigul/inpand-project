import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Button } from '../common/Button';
import { useScrollLock } from '../../hooks/useScrollLock';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useScrollLock(mobileMenuOpen);

  // Close mobile menu whenever route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Projects', path: '/projects' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#F7F7F5]/95 backdrop-blur-md border-b border-border shadow-subtle py-3'
            : 'bg-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left: INPAND Technologies wordmark */}
            <Link
              to="/"
              className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
              aria-label="INPAND Technologies Home"
            >
              <div className="w-8 h-8 rounded-sm bg-primary flex items-center justify-center text-white font-heading font-extrabold text-base tracking-tight group-hover:bg-black transition-colors">
                <span>I</span>
                <span className="text-accent font-black text-lg leading-none">N</span>
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-extrabold text-base sm:text-lg text-primary tracking-tight leading-none">
                  INPAND
                </span>
                <span className="text-[9px] font-semibold text-secondary tracking-[0.2em] uppercase mt-0.5">
                  Technologies
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Main Navigation">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === '/'}
                  className={({ isActive }) =>
                    `px-3.5 py-1.5 text-sm font-medium transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                      isActive
                        ? 'text-primary font-semibold'
                        : 'text-secondary hover:text-primary hover:bg-black/5'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {/* Right Desktop CTA: "Discuss a Project" */}
            <div className="hidden md:flex items-center gap-3">
              <Button
                to="/contact"
                variant="primary"
                size="md"
                icon={<ArrowUpRight size={15} />}
              >
                Discuss a Project
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-primary hover:bg-black/5 rounded-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 md:hidden bg-bg/98 backdrop-blur-xl pt-24 px-6 flex flex-col justify-between pb-8 animate-fadeIn">
          <nav className="flex flex-col gap-3">
            <span className="text-xs font-semibold text-secondary tracking-widest uppercase mb-1">
              Menu Navigation
            </span>
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) =>
                  `text-2xl font-heading font-bold transition-colors py-2.5 border-b border-border ${
                    isActive ? 'text-accent' : 'text-primary'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex flex-col gap-3 pt-6 border-t border-border">
            <Button
              to="/contact"
              variant="primary"
              size="lg"
              className="w-full justify-center"
              icon={<ArrowUpRight size={16} />}
            >
              Discuss a Project
            </Button>
            <p className="text-xs text-center text-secondary">
              INPAND Technologies &bull; Digital Project Showcase
            </p>
          </div>
        </div>
      )}
    </>
  );
};
