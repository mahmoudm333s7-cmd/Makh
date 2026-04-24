import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { Menu, X, Globe, Dna } from 'lucide-react';
import siteData from '../data/siteData.json';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { lang, toggleLang } = useAppContext();
  const content = siteData[lang].nav;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: content.home, href: '#home' },
    { name: content.about, href: '#about' },
    { name: content.experience, href: '#experience' },
    { name: content.skills, href: '#skills' },
    { name: content.projects, href: '#projects' },
    { name: content.reports, href: '#reports' },
    { name: content.publications, href: '#publications' },
    { name: content.certificates, href: '#certificates' },
    { name: content.contact, href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'glass-panel py-3 shadow-neon-blue/20 shadow-lg' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <Dna className="text-neon-green h-8 w-8 animate-pulse-slow" />
            <span className="font-heading font-bold text-xl tracking-wider text-white">
              BIO<span className="text-neon-blue">PORT</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:block">
            <div className="ml-10 flex items-baseline space-x-6 rtl:space-x-reverse">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-300 hover:text-neon-blue hover:neon-text-blue px-2 py-2 rounded-md text-sm font-medium transition-all"
                >
                  {link.name}
                </a>
              ))}
              <button
                onClick={toggleLang}
                className="flex items-center gap-2 text-neon-green hover:text-white transition-colors ml-4"
              >
                <Globe size={18} />
                <span className="uppercase text-sm font-bold">{lang === 'en' ? 'AR' : 'EN'}</span>
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex lg:hidden items-center gap-3">
            <button
              onClick={toggleLang}
              className="flex items-center gap-1 text-neon-green text-sm font-bold"
            >
              <Globe size={16} />
              {lang === 'en' ? 'AR' : 'EN'}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-surface focus:outline-none"
            >
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden glass-panel absolute w-full left-0 top-full mt-2 max-h-[80vh] overflow-y-auto">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-300 hover:text-neon-blue block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
