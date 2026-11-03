import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, MessageSquare } from 'lucide-react';
import { Button } from '../common/Button';
import { generateGeneralWhatsAppLink } from '../../lib/config';
import { useScrollLock } from '../../hooks/useScrollLock';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useScrollLock(mobileMenuOpen);

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
            ? 'bg-[#F7F7F5]/90 backdrop-blur-md border-b border-border shadow-subtle py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left: Official INPAND Technologies logo */}
            <Link
              to="/"
              className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
              aria-label="INPAND Technologies Home"
            >
              <div className="w-9 h-9 rounded-sm bg-primary flex items-center justify-center text-white font-heading font-extrabold text-lg tracking-tight group-hover:bg-black transition-colors">
                <span className="text-white">I</span>
                <span className="text-accent font-black text-xl leading-none">N</span>
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
                    `px-4 py-2 text-sm font-medium transition-colors rounded-sm ${
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

            {/* Right Desktop CTA: "Let's Talk" */}
            <div className="hidden md:flex items-center gap-3">
              <Button
                href={generateGeneralWhatsAppLink()}
                target="_blank"
                variant="primary"
                size="md"
                icon={<ArrowUpRight size={16} />}
              >
                Let&apos;s Talk
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-primary hover:bg-black/5 rounded-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 md:hidden bg-bg/98 backdrop-blur-xl pt-24 px-6 flex flex-col justify-between pb-10 animate-fadeIn">
          <nav className="flex flex-col gap-4">
            <span className="text-xs font-semibold text-secondary tracking-widest uppercase mb-2">
              Menu Navigation
            </span>
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) =>
                  `text-2xl font-heading font-bold transition-colors py-2 border-b border-border ${
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
              href={generateGeneralWhatsAppLink()}
              target="_blank"
              variant="primary"
              size="lg"
              className="w-full justify-center"
              icon={<MessageSquare size={18} />}
            >
              Let&apos;s Talk on WhatsApp
            </Button>
            <p className="text-xs text-center text-secondary">
              Official INPAND Digital Showcase &bull; Direct Client Enquiries
            </p>
          </div>
        </div>
      )}
    </>
  );
};
