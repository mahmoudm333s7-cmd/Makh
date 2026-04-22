import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Globe, Dna } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
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
    { name: content.skills, href: '#skills' },
    { name: content.projects, href: '#projects' },
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
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8 rtl:space-x-reverse">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-300 hover:text-neon-blue hover:neon-text-blue px-3 py-2 rounded-md text-sm font-medium transition-all"
                >
                  {link.name}
                </a>
              ))}
              <button 
                onClick={toggleLang}
                className="flex items-center gap-2 text-neon-green hover:text-white transition-colors"
              >
                <Globe size={18} />
                <span className="uppercase text-sm font-bold">{lang === 'en' ? 'AR' : 'EN'}</span>
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex md:hidden">
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
        <div className="md:hidden glass-panel absolute w-full left-0 top-full mt-2">
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
            <button 
                onClick={() => { toggleLang(); setIsOpen(false); }}
                className="flex items-center gap-2 text-neon-green px-3 py-2 text-base font-medium"
              >
                <Globe size={18} />
                <span>{lang === 'en' ? 'Switch to Arabic' : 'Switch to English'}</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
