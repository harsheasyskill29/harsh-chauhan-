import { useState, useEffect, useCallback } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Menu, X } from 'lucide-react';

const navLinks = [
  { href: '#hero', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#process', label: 'Process' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
];

export default function Header() {
  const { dark, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      let current = 'hero';
      document.querySelectorAll('section').forEach(section => {
        const top = section.offsetTop - 100;
        if (window.scrollY >= top) {
          current = section.getAttribute('id');
        }
      });
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = useCallback((e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6 md:px-12 ${
          scrolled
            ? 'glass-nav border-b border-brand-border shadow-md'
            : 'bg-transparent'
        }`}
      >
        <div className="w-full flex items-center justify-between relative">
          <a href="#hero" onClick={(e) => handleNavClick(e, '#hero')} className="flex items-center group pr-4">
            <img src="/assets/logo.png" alt="Harsh design.co Logo" className="h-11 md:h-14 w-auto object-contain group-hover:scale-105 transition-transform duration-300" />
          </a>

          <nav className="hidden md:flex items-center gap-8 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`nav-link text-sm font-medium transition-colors duration-200 ${
                  activeSection === link.href.slice(1)
                    ? 'text-brand-accent after:scale-x-100'
                    : 'text-brand-secondary hover:text-brand-accent'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl border border-brand-border bg-brand-white text-brand-secondary hover:text-brand-accent hover:border-brand-accent transition-all duration-200 flex items-center justify-center cursor-pointer"
              aria-label="Toggle Theme"
            >
              {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="header-cta-btn relative inline-flex items-center justify-center rounded-xl bg-brand-accent text-white text-sm font-semibold shadow-lg shadow-brand-accent/5 overflow-hidden active:scale-95 hover:scale-[1.03] hover:bg-brand-accent-hover"
            >
              <span className="cta-text-default whitespace-nowrap">Hire Me</span>
              <span className="cta-text-hover whitespace-nowrap">Let's Work Together</span>
            </a>
          </div>

          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-brand-border bg-brand-white/80 text-brand-secondary hover:text-brand-accent flex items-center justify-center cursor-pointer"
              aria-label="Toggle Theme"
            >
              {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-brand-primary hover:text-brand-accent focus:outline-none p-2 rounded-lg bg-brand-white/80 border border-brand-border"
              aria-label="Toggle Menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-80 z-[45] bg-brand-white/98 border-l border-brand-border p-8 flex flex-col justify-between transform transition-transform duration-300 ease-in-out md:hidden shadow-2xl backdrop-blur-lg ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col gap-6 mt-16">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="mobile-link text-xl font-medium text-brand-secondary hover:text-brand-accent hover:translate-x-2 transition-all"
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="flex flex-col gap-4 border-t border-brand-border pt-6">
          <a href="https://wa.me/9023125130" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 py-3 rounded-xl bg-brand-accent text-white font-semibold hover:bg-brand-accent-hover transition-all">
            Chat on WhatsApp
          </a>
          <p className="text-center text-xs text-brand-secondary font-medium">&copy; 2026 Harsh Chauhan. All rights reserved.</p>
        </div>
      </div>
    </>
  );
}
