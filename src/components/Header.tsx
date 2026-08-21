"use client";

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import gsap from 'gsap';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Início', href: '/' },
    { name: 'Sobre o Doutor', href: '/sobre' },
    { name: 'Procedimentos', href: '/procedimentos' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contato', href: '/contato' },
  ];

  const handleMobileLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-bg-main/80 backdrop-blur-md shadow-sm py-4' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 relative flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex flex-col relative z-50 group">
          <img 
            src="/logo com escrita.png" 
            alt="Dr. Omar Algazal Logo" 
            className="h-12 md:h-14 lg:h-15 w-auto object-contain transition-all"
          />
        </Link>

        {/* Desktop Nav - Centered */}
        <nav className="hidden lg:flex items-center absolute left-1/2 -translate-x-1/2">
          <ul className="flex space-x-8 xl:space-x-10">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className={`font-body text-sm font-medium transition-colors relative group py-1 ${
                      isActive ? 'text-accent' : 'text-secondary-dark hover:text-accent'
                    }`}
                  >
                    {link.name}
                    <span className={`absolute -bottom-1 left-0 h-[2px] bg-accent transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right Action Button */}
        <div className="hidden lg:flex items-center">
          <Link 
            href="/contato"
            className="group relative px-6 py-2.5 overflow-hidden bg-accent text-white font-body font-medium text-sm rounded-full transition-all shadow-sm hover:shadow-md"
          >
            <span className="relative z-10">Agendar Consulta</span>
            <div className="absolute inset-0 bg-primary-dark translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden relative z-50 text-primary-dark bg-white/50 backdrop-blur-sm p-2 rounded-full border border-primary-dark/10"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu Overlay */}
        <div 
          className={`fixed inset-0 z-40 flex flex-col justify-center items-center transition-all duration-500 lg:hidden ${
            isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
        >
          <div className="absolute inset-0 bg-bg-main/95 backdrop-blur-xl"></div>
          
          <ul className="flex flex-col items-center space-y-8 mb-16 relative z-10">
            {navLinks.map((link) => (
              <li key={link.name} className="overflow-hidden">
                <Link 
                  href={link.href}
                  onClick={handleMobileLinkClick}
                  className={`font-heading font-medium text-2xl tracking-wide block transition-colors ${
                    pathname === link.href ? 'text-accent' : 'text-primary-dark hover:text-accent'
                  }`}
                  style={{
                    transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(100%)',
                    transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.2s'
                  }}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          
          <Link 
            href="/contato"
            onClick={handleMobileLinkClick}
            className="relative z-10 px-10 py-4 bg-primary-dark text-white rounded-full font-body font-medium text-[13px] tracking-widest uppercase text-center shadow-lg transition-transform active:scale-95"
            style={{
              opacity: isMobileMenuOpen ? 1 : 0,
              transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.5s ease 0.4s, transform 0.5s ease 0.4s'
            }}
          >
            Agendar Consulta
          </Link>
        </div>
      </div>
    </header>
  );
}
