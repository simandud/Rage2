import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, User, LogIn } from 'lucide-react';

export const FixedUI: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detectar scroll para cambiar estilo del header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Bloquear scroll cuando el menú móvil está abierto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  return (
    <>
      <header 
        id="main-header" 
        role="banner"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${
          scrolled 
            ? 'bg-black/80 backdrop-blur-xl border-white/10 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)]' 
            : 'bg-transparent border-transparent py-6'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 flex justify-between items-center h-full">
          
          {/* Logo Brand */}
          <div className="brand flex items-center gap-2 z-50">
            <a href="#" className="flex flex-col group" aria-label="Rage Venture Inicio">
              <span className="font-[Orbitron] font-black text-xl md:text-2xl tracking-tighter text-white group-hover:text-blue-500 transition-colors drop-shadow-[0_0_10px_rgba(0,123,255,0.5)]">
                RAGE VENTURE
              </span>
              <span className="text-[9px] tracking-[0.4em] text-blue-400 font-mono hidden md:block uppercase">
                Immersive Music Portal
              </span>
            </a>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8 header-nav" role="navigation">
            {['NOSOTROS', 'ARTISTAS', 'LANZAMIENTOS', 'LABEL', 'EVENTOS', 'NEWS'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase() === 'label' ? 'music' : item.toLowerCase() === 'nosotros' ? 'about' : item.toLowerCase()}`} 
                className="nav-link text-[11px] font-bold tracking-[0.2em] text-gray-300 hover:text-white relative group py-2"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-6 z-50">
            <div className="flex gap-4 border-r border-white/20 pr-6">
                <button className="text-gray-400 hover:text-white transition-colors" aria-label="Language">
                <Globe size={18} />
                </button>
                <button className="text-gray-400 hover:text-white transition-colors" aria-label="Employee Login">
                <User size={18} />
                </button>
            </div>
            <a 
              href="#contact" 
              className="px-6 py-2 border border-blue-500/30 bg-blue-600/10 backdrop-blur-sm rounded-none skew-x-[-10deg] text-[10px] font-bold tracking-[0.2em] text-blue-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all flex items-center gap-2 group"
            >
              <span className="skew-x-[10deg] inline-block group-hover:translate-x-1 transition-transform">CONTACTO</span>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden text-white p-2 hover:bg-white/10 rounded-full transition-colors z-50 relative" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Menú Móvil Fullscreen */}
      <nav 
        id="mobile-menu"
        className={`mobile-menu fixed inset-0 bg-[#030109]/95 backdrop-blur-xl z-40 flex flex-col justify-center items-center gap-8 transition-transform duration-500 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600 rounded-full blur-[100px]"></div>
        </div>

        {['NOSOTROS', 'ARTISTAS', 'LANZAMIENTOS', 'LABEL', 'EVENTOS', 'NOTICIAS'].map((item, idx) => (
             <a 
                key={item}
                href={`#${item.toLowerCase() === 'label' ? 'music' : item.toLowerCase() === 'nosotros' ? 'about' : item.toLowerCase() === 'noticias' ? 'news' : item.toLowerCase()}`} 
                onClick={() => setIsMenuOpen(false)} 
                className="text-4xl font-[Bebas_Neue] tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 hover:to-blue-500 transition-all transform hover:scale-105"
                style={{ transitionDelay: `${idx * 50}ms` }}
            >
                {item}
            </a>
        ))}
        
        <a href="#contact" onClick={() => setIsMenuOpen(false)} className="mt-8 px-10 py-4 bg-blue-600 rounded-full font-bold tracking-widest text-white shadow-[0_0_20px_rgba(0,123,255,0.5)]">
            CONTACTO
        </a>
      </nav>
    </>
  );
};