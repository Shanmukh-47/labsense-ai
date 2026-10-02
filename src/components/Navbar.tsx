import React, { useState } from 'react';
import { Activity, Menu, X, Sparkles, ArrowRight } from 'lucide-react';
import type { ActiveScreen, Language } from '../types';
import { LanguageToggle } from './LanguageToggle';

interface NavbarProps {
  activeScreen: ActiveScreen;
  onNavigate: (screen: ActiveScreen) => void;
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeScreen,
  onNavigate,
  currentLanguage,
  onLanguageChange,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isTelugu = currentLanguage === 'te';

  const navItems: { id: ActiveScreen; labelEn: string; labelTe: string }[] = [
    { id: 'landing', labelEn: 'Home', labelTe: 'హోమ్' },
    { id: 'dashboard', labelEn: 'Dashboard & Upload', labelTe: 'డాష్‌బోర్డ్' },
    { id: 'analysis', labelEn: 'Report Analysis', labelTe: 'నివేదిక విశ్లేషణ' },
    { id: 'history', labelEn: 'History & Compare', labelTe: 'చరిత్ర & పోలిక' },
    { id: 'privacy', labelEn: 'Privacy Policy', labelTe: 'గోప్యత' },
  ];

  const handleNavClick = (screen: ActiveScreen) => {
    onNavigate(screen);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: 'rgba(8, 4, 20, 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--border-subtle)',
      }}
    >
      <div
        className="container"
        style={{
          height: '74px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Brand Logo */}
        <div
          onClick={() => handleNavClick('landing')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
            userSelect: 'none',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'var(--gradient-brand)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(168, 85, 247, 0.5)',
            }}
          >
            <Activity size={22} color="#ffffff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
                LabSense <span className="gradient-text">AI</span>
              </span>
              <span
                style={{
                  fontSize: '0.68rem',
                  padding: '2px 6px',
                  borderRadius: 'var(--radius-pill)',
                  background: 'rgba(168, 85, 247, 0.2)',
                  color: 'var(--text-highlight)',
                  border: '1px solid rgba(168, 85, 247, 0.3)',
                  fontWeight: 600,
                }}
              >
                Beta
              </span>
            </div>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', lineHeight: 1 }}>
              {isTelugu ? 'బహుభాషా క్లినికల్ ఇంటెలిజెన్స్' : 'Multilingual Clinical Intelligence'}
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '8px',
          }}
          className="desktop-nav"
        >
          {navItems.map((item) => {
            const isActive = activeScreen === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                style={{
                  background: isActive ? 'rgba(168, 85, 247, 0.12)' : 'transparent',
                  border: isActive ? '1px solid rgba(168, 85, 247, 0.3)' : '1px solid transparent',
                  color: isActive ? '#ffffff' : 'var(--text-secondary)',
                  padding: '8px 14px',
                  borderRadius: 'var(--radius-pill)',
                  fontSize: '0.9rem',
                  fontWeight: isActive ? 600 : 500,
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = 'var(--text-secondary)';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                {isTelugu ? item.labelTe : item.labelEn}
              </button>
            );
          })}
        </nav>

        {/* Right CTA & Language Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <LanguageToggle
            currentLang={currentLanguage}
            onLanguageChange={onLanguageChange}
          />

          <button
            type="button"
            className="btn btn-primary btn-sm desktop-only-btn"
            onClick={() => handleNavClick('dashboard')}
          >
            <Sparkles size={15} />
            <span>{isTelugu ? 'రిపోర్ట్ చూడండి' : 'Explore report'}</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            style={{
              display: 'none',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-sm)',
              color: '#ffffff',
              padding: '8px',
              cursor: 'pointer',
            }}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          style={{
            backgroundColor: 'var(--bg-secondary)',
            borderBottom: '1px solid var(--border-subtle)',
            padding: '16px 20px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
          className="animate-fade-up"
        >
          {navItems.map((item) => {
            const isActive = activeScreen === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                style={{
                  textAlign: 'left',
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-md)',
                  background: isActive ? 'rgba(168, 85, 247, 0.15)' : 'transparent',
                  border: isActive ? '1px solid rgba(168, 85, 247, 0.3)' : 'none',
                  color: isActive ? '#ffffff' : 'var(--text-secondary)',
                  fontSize: '1rem',
                  fontWeight: isActive ? 600 : 500,
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span>{isTelugu ? item.labelTe : item.labelEn}</span>
                {isActive && <ArrowRight size={16} color="#A855F7" />}
              </button>
            );
          })}

          <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)' }}>
            <button
              type="button"
              className="btn btn-primary"
              style={{ width: '100%' }}
              onClick={() => handleNavClick('dashboard')}
            >
              <Sparkles size={16} />
              <span>{isTelugu ? 'రిపోర్ట్ పరిశీలించండి' : 'Explore report'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Responsive media helper CSS */}
      <style>{`
        @media (min-width: 900px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
          .desktop-only-btn {
            display: inline-flex !important;
          }
        }
        @media (max-width: 899px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: flex !important;
          }
          .desktop-only-btn {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
};
