import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, User, LogIn } from 'lucide-react';

/**
 * ════════════════════════════════════════════════════════════════════════
 * CONFIGURACIÓN DE FUENTES Y COLORES
 * ════════════════════════════════════════════════════════════════════════
 * Cambia estos valores según tus necesidades
 */
const BRANDING_CONFIG = {
  // LOGO Y MARCA
  logo: {
    text: 'RAGE VENTURE',
    fontFamily: 'TurnKey', // Cambiar: "Poppins", "Inter", "Roboto", "Bebas Neue"
    fontSize: 'text-lg sm:text-xl md:text-2xl', // text-sm, text-base, text-lg, text-xl, text-2xl
    fontWeight: 'font-black', // font-light, font-normal, font-semibold, font-bold, font-black
    color: 'text-white',
    letterSpacing: 'tracking-[0.15em]',     // 0.15em
    hoverColor: 'hover:text-blue-500',
    glowEffect: 'drop-shadow-[0_0_10px_rgba(0,123,255,0.5)]',
  },

  // SUBTÍTULO
  subtitle: {
    text: '', // Puedes agregar un subtítulo aquí
    fontFamily: 'mono', // mono, sans-serif
    fontSize: 'text-[11px]',
    color: 'text-blue-400',
    letterSpacing: 'tracking-[0.25em]',
  },

  // MENÚ DESKTOP
  navDesktop: {
    fontFamily: 'font-bold', // font-light, font-normal, font-semibold, font-bold
    fontSize: 'text-[12px] xl:text-[13px]',
    color: 'text-gray-300',
    hoverColor: 'hover:text-white',
    letterSpacing: 'tracking-[0.15em]',
    underlineColor: 'bg-blue-500',
  },

  // MENÚ MOBILE
  navMobile: {
    fontFamily: 'font-[turnKey]', // Cambiar a tu fuente
    fontSize: 'text-2xl sm:text-3xl md:text-4xl',
    letterSpacing: 'tracking-wider',
    gradient: 'from-white to-gray-500', // Colores del gradiente
  },

  // BOTÓN CONTACTO
  buttonContacto: {
    text: 'CONTACTO',
    fontWeight: 'font-bold',
    fontSize: 'text-[11px] xl:text-[12px] sm:text-base',
    letterSpacing: 'tracking-[0.15em]',
    bgColor: 'bg-blue-600/10',
    borderColor: 'border-blue-500/30',
    textColor: 'text-blue-400',
    hoverBg: 'hover:bg-blue-600',
    hoverText: 'hover:text-white',
    glowEffect: 'shadow-[0_0_20px_rgba(0,123,255,0.5)]',
  },

  // COLORES GENERALES
  colors: {
    headerBg: 'bg-black/80', // Color fondo header al scroll
    headerBorder: 'border-white/10',
    headerShadow: 'shadow-[0_4px_30px_rgba(0,0,0,0.5)]',
    mobileMenuBg: 'bg-[#030109]/95',
    overlayBg: 'bg-black/50',
  },
};

/**
 * ════════════════════════════════════════════════════════════════════════
 */

export const FixedUI: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <header
        id="main-header"
        role="banner"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${
          scrolled
            ? `${BRANDING_CONFIG.colors.headerBg} backdrop-blur-xl ${BRANDING_CONFIG.colors.headerBorder} py-3 ${BRANDING_CONFIG.colors.headerShadow}`
            : 'bg-transparent border-transparent py-4 sm:py-6'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 flex justify-between items-center h-full">
          {/* Logo Brand - Responsive */}
          <div className="brand flex items-center gap-2 z-50 flex-shrink-0">
            <a href="#" className="flex flex-col group" aria-label="Rage Venture Inicio">
              {/* Logo text - Responsive */}
              <span
                className={`font-[${BRANDING_CONFIG.logo.fontFamily}] ${BRANDING_CONFIG.logo.fontWeight} ${BRANDING_CONFIG.logo.fontSize} tracking-tighter ${BRANDING_CONFIG.logo.color} ${BRANDING_CONFIG.logo.hoverColor} transition-colors ${BRANDING_CONFIG.logo.glowEffect}`}
              >
                {BRANDING_CONFIG.logo.text}
              </span>
              {/* Subtitle - Hidden on very small screens */}
              {BRANDING_CONFIG.subtitle.text && (
                <span className={`${BRANDING_CONFIG.subtitle.fontSize} ${BRANDING_CONFIG.subtitle.letterSpacing} ${BRANDING_CONFIG.subtitle.color} font-${BRANDING_CONFIG.subtitle.fontFamily} hidden sm:block uppercase`}>
                  {BRANDING_CONFIG.subtitle.text}
                </span>
              )}
            </a>
          </div>

          {/* Desktop Navigation - Hidden on mobile */}
          <nav
            className="hidden lg:flex items-center gap-4 xl:gap-8 header-nav"
            role="navigation"
          >
            {['EVENTOS', 'ALQUILER', 'LANZAMIENTOS', 'EVENTOS', 'TIENDA'].map(
              (item) => (
                <a
                  key={item}
                  href={`#${
                    item.toLowerCase() === 'label'
                      ? 'music'
                      : item.toLowerCase() === 'nosotros'
                      ? 'about'
                      : item.toLowerCase()
                  }`}
                  className={`nav-link ${BRANDING_CONFIG.navDesktop.fontSize} ${BRANDING_CONFIG.navDesktop.fontFamily} ${BRANDING_CONFIG.navDesktop.letterSpacing} ${BRANDING_CONFIG.navDesktop.color} ${BRANDING_CONFIG.navDesktop.hoverColor} relative group py-2 whitespace-nowrap transition-colors`}
                >
                  {item}
                  <span className={`absolute bottom-0 left-0 w-0 h-[2px] ${BRANDING_CONFIG.navDesktop.underlineColor} transition-all duration-300 group-hover:w-full`}></span>
                </a>
              )
            )}
          </nav>

          {/* Right Actions - Hidden on mobile */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-6 z-50">
            <div className="flex gap-2 xl:gap-4 border-r border-white/20 pr-3 xl:pr-6">
              <button
                className="text-gray-400 hover:text-white transition-colors p-1.5 hover:bg-white/5 rounded-full"
                aria-label="Language"
              >
                <Globe size={16} className="sm:w-[18px] sm:h-[18px]" />
              </button>
              <button
                className="text-gray-400 hover:text-white transition-colors p-1.5 hover:bg-white/5 rounded-full"
                aria-label="Employee Login"
              >
                <User size={16} className="sm:w-[18px] sm:h-[18px]" />
              </button>
            </div>
            <a
              href="#contact"
              className={`px-4 xl:px-6 py-2 border rounded-none skew-x-[-10deg] ${BRANDING_CONFIG.buttonContacto.fontSize} ${BRANDING_CONFIG.buttonContacto.fontWeight} ${BRANDING_CONFIG.buttonContacto.letterSpacing} ${BRANDING_CONFIG.buttonContacto.textColor} ${BRANDING_CONFIG.buttonContacto.bgColor} backdrop-blur-sm ${BRANDING_CONFIG.buttonContacto.borderColor} ${BRANDING_CONFIG.buttonContacto.hoverBg} ${BRANDING_CONFIG.buttonContacto.hoverText} ${BRANDING_CONFIG.buttonContacto.glowEffect} transition-all flex items-center gap-2 group whitespace-nowrap`}
            >
              <span className="skew-x-[10deg] inline-block group-hover:translate-x-1 transition-transform">
                {BRANDING_CONFIG.buttonContacto.text}
              </span>
            </a>
          </div>

          {/* Mobile Menu Toggle - Visible only on mobile */}
          <button
            className="lg:hidden text-white p-2 hover:bg-white/10 rounded-full transition-colors z-50 relative flex-shrink-0"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu - Fullscreen */}
      <nav
        id="mobile-menu"
        className={`mobile-menu fixed inset-0 ${BRANDING_CONFIG.colors.mobileMenuBg} backdrop-blur-xl z-40 flex flex-col justify-center items-center gap-6 sm:gap-8 transition-transform duration-500 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="navigation"
        aria-hidden={!isMenuOpen}
      >
        {/* Background effects */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600 rounded-full blur-[100px]"></div>
        </div>

        {/* Menu Items */}
        <div className="relative z-10 flex flex-col items-center gap-4 sm:gap-6">
          {['NOSOTROS', 'ARTISTAS', 'LANZAMIENTOS', 'LABEL', 'EVENTOS', 'NOTICIAS'].map(
            (item, idx) => (
              <a
                key={item}
                href={`#${
                  item.toLowerCase() === 'label'
                    ? 'music'
                    : item.toLowerCase() === 'nosotros'
                    ? 'about'
                    : item.toLowerCase() === 'noticias'
                    ? 'news'
                    : item.toLowerCase()
                }`}
                onClick={() => setIsMenuOpen(false)}
                className={`${BRANDING_CONFIG.navMobile.fontSize} ${BRANDING_CONFIG.navMobile.fontFamily} ${BRANDING_CONFIG.navMobile.letterSpacing} text-transparent bg-clip-text bg-gradient-to-b ${BRANDING_CONFIG.navMobile.gradient} hover:to-blue-500 transition-all transform hover:scale-105 cursor-pointer`}
                style={{
                  transitionDelay: `${idx * 50}ms`,
                  animation: isMenuOpen ? `fadeInUp 0.5s ease-out ${idx * 50}ms backwards` : 'none',
                }}
              >
                {item}
              </a>
            )
          )}

          {/* Contact Button in Mobile Menu */}
          <a
            href="#contact"
            onClick={() => setIsMenuOpen(false)}
            className="mt-4 sm:mt-8 px-8 sm:px-10 py-3 sm:py-4 bg-blue-600 rounded-full font-bold tracking-widest text-white text-sm sm:text-base shadow-[0_0_20px_rgba(0,123,255,0.5)] hover:bg-blue-500 transition-colors active:scale-95"
          >
            CONTACTO
          </a>
        </div>
      </nav>

      {/* Overlay para cerrar menú */}
      {isMenuOpen && (
        <div
          className={`fixed inset-0 z-30 ${BRANDING_CONFIG.colors.overlayBg} lg:hidden`}
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Keyframe animation para el menú móvil */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
};
