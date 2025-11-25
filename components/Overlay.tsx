import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Disc, Users, Star, ShoppingBag, Calendar, Music, Headphones, ChevronRight, SkipBack, SkipForward, Pause, MapPin, Ticket, Send, Twitter, Instagram, Youtube, Globe, Check, ShoppingCart } from 'lucide-react';
import { useForm, validateContactForm } from '../utils/form';
import { ARTISTS, RELEASES, EVENTS, PLAYLISTS, GENRES, NEWS, SERVICES, PRODUCTS, TEAM } from '../constants';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export const Overlay: React.FC = () => {
  const { values, errors, isSubmitting, submitStatus, handleChange, handleSubmit } = useForm({
    initialValues: { name: '', email: '', message: '' },
    validate: validateContactForm,
    onSubmit: async () => { return new Promise((resolve) => setTimeout(resolve, 1500)); }
  });

  return (
    <main className="w-full relative z-10 overflow-hidden">
      
      {/* SECTION 1: HERO */}
      <section id="intro" className="panel hero min-h-screen flex flex-col justify-center items-center relative" aria-label="Introducción">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.2 }}
          className="relative z-10 max-w-6xl mx-auto px-4 text-center mt-[-80px]"
        >
          {/* Logo representation */}
          <div className="mb-4">
             <span className="text-blue-400 tracking-[0.5em] text-xs md:text-sm font-bold uppercase animate-pulse">Enter the Simulation</span>
          </div>
          <h1 className="rage-logo-text mb-6">RAGE VENTURE</h1>
          <p className="hero-tagline max-w-2xl mx-auto text-gray-300 text-sm md:text-lg leading-relaxed">
            UN PORTAL INMERSIVO DE MÚSICA ELECTRÓNICA, PRODUCCIÓN Y EXPERIENCIAS VISUALES.
            <br className="hidden md:block" /> CONECTANDO EL MUNDO FÍSICO Y DIGITAL.
          </p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-12 flex flex-col md:flex-row gap-6 justify-center items-center"
          >
            <a href="#music" className="group relative px-8 py-4 bg-white text-black font-bold tracking-widest overflow-hidden skew-x-[-10deg] transition-all hover:bg-blue-500 hover:text-white">
              <div className="absolute inset-0 w-0 bg-black transition-all duration-[250ms] ease-out group-hover:w-full opacity-10"></div>
              <span className="skew-x-[10deg] inline-block relative z-10 flex items-center gap-2">EXPLORAR LABEL <ArrowRight size={16}/></span>
            </a>
            <a href="#events" className="group px-8 py-4 border border-white/30 text-white font-bold tracking-widest hover:bg-white/10 transition-all skew-x-[-10deg]">
               <span className="skew-x-[10deg] inline-block">EVENTOS</span>
            </a>
          </motion.div>
        </motion.div>
        
        {/* Infinite Marquee Footer of Hero */}
        <div className="marquee absolute bottom-10 w-full z-20 border-y border-white/10 bg-black/40 backdrop-blur-sm" aria-hidden="true">
          <div className="marquee-content text-gray-400">
            RAGE VENTURE • 3D IMMERSIVE PORTAL • TECHNO • HOUSE • IDM • WORLDWIDE SHIPPING • ARTIST MANAGEMENT • STUDIO RENTAL • RAGE VENTURE • 3D IMMERSIVE PORTAL • TECHNO • HOUSE • IDM •
          </div>
        </div>
      </section>

      {/* SECTION 2: ABOUT */}
      <motion.section 
        id="about" 
        className="panel py-32 relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        variants={fadeInUp}
      >
        <div className="absolute left-[-20%] top-[20%] w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="about-container grid md:grid-cols-2 gap-16 items-center relative z-10">
          <div className="about-title">
            <span className="section-meta">SOMOS RAGE</span>
            <h2 className="text-white">EL FUTURO DEL SONIDO</h2>
            <div className="h-1 w-20 bg-blue-600 mt-4"></div>
          </div>
          <div className="about-content relative border-l border-white/10 pl-8">
             <p className="text-xl text-gray-200 leading-relaxed font-light mb-6">
              Potenciamos artistas y productores para lograr más creando experiencias inmersivas en cada punto de contacto: en el metaverso, en eventos presenciales y en línea.
            </p>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
                Con una mezcla única de estrategia, creatividad, habilidad técnica y servicio dedicado, RAGE VENTURE se posiciona como el nexo entre la cultura club tradicional y la vanguardia digital.
            </p>
            <button className="text-blue-400 text-sm font-bold tracking-widest flex items-center gap-2 hover:text-white transition-colors group">
                CONOCER EL EQUIPO <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform"/>
            </button>
          </div>
        </div>
      </motion.section>

      {/* SECTION 3: ARTISTS */}
      <motion.section 
        id="artists" 
        className="panel py-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="section-header text-center mb-16">
          <span className="section-meta">TALENTO</span>
          <h2>NUESTROS ARTISTAS</h2>
          <p className="text-gray-400">Visionarios sonoros que definen la nueva era.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ARTISTS.map((artist) => (
            <motion.div key={artist.id} variants={cardVariant} className="artist-card group relative h-[450px] overflow-hidden rounded-sm border border-white/5 bg-gray-900">
              {/* Image */}
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 filter grayscale group-hover:grayscale-0" style={{ backgroundImage: `url(${artist.image})` }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 transition-opacity"></div>
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 w-full p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-blue-500 text-[10px] font-bold tracking-widest uppercase mb-2 block border-l-2 border-blue-500 pl-2">{artist.genre}</span>
                <h3 className="text-4xl font-[Bebas_Neue] text-white mb-2 tracking-wide">{artist.name}</h3>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 flex gap-3 mt-4">
                    <button className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:text-black transition-colors"><Instagram size={14}/></button>
                    <button className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:text-black transition-colors"><Disc size={14}/></button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* SECTION 4: RELEASES */}
      <motion.section 
        id="releases" 
        className="panel py-24 bg-gradient-to-b from-transparent to-blue-900/5"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 border-b border-white/10 pb-6">
          <div>
            <span className="section-meta">DISCOGRAFÍA</span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-2">ÚLTIMOS LANZAMIENTOS</h2>
          </div>
          <a href="#" className="text-xs font-bold tracking-widest border border-white/20 px-6 py-3 hover:bg-white hover:text-black transition-all">CATÁLOGO COMPLETO</a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {RELEASES.map((release) => (
            <div key={release.id} className="release-card group cursor-pointer">
              <div className="relative aspect-square overflow-hidden rounded-lg mb-6 shadow-2xl bg-black">
                <img src={release.cover} alt={release.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100" />
                
                {/* Overlay Play */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30 backdrop-blur-[2px]">
                   <button className="w-20 h-20 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                     <Play fill="currentColor" size={28} className="ml-1" />
                   </button>
                </div>
                
                {/* Vinyl Grooves Effect Overlay */}
                <div className="absolute inset-0 rounded-full border-[50px] border-black/10 scale-[1.5] opacity-20 pointer-events-none"></div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-2xl font-[Bebas_Neue] text-white tracking-wide group-hover:text-blue-400 transition-colors">{release.title}</h3>
                    <p className="text-gray-400 text-sm font-mono">{release.artist}</p>
                </div>
                <span className="text-xs font-bold border border-white/10 px-2 py-1 rounded text-gray-500">{release.year}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* SECTION 5: MUSIC PLAYER & GENRES */}
      <motion.section 
        id="music" 
        className="panel py-24 music-section relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/10 blur-[100px] rounded-full -z-10"></div>

        <div className="section-header">
          <span className="section-meta">CURADURÍA</span>
          <h2>PLAYLISTS & GÉNEROS</h2>
          <p>La banda sonora de tu vida digital.</p>
        </div>

        <div className="music-layout grid md:grid-cols-[2.5fr_1fr] gap-10">
          {/* Playlists Grid */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 md:p-8">
            <div className="playlists-header flex justify-between items-center mb-8">
               <h3 className="text-xl font-bold font-[Orbitron] tracking-widest text-white flex items-center gap-2">
                 <Headphones size={20} className="text-blue-500" /> FEATURED MIXES
               </h3>
            </div>
            <div className="playlists-grid grid grid-cols-2 md:grid-cols-3 gap-4">
              {PLAYLISTS.map((playlist) => (
                <div key={playlist.id} className="playlist-card group cursor-pointer">
                  <div className="playlist-cover relative aspect-square rounded-lg overflow-hidden mb-3 border border-white/5">
                    <img src={playlist.image} alt={playlist.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Music className="text-blue-400 animate-bounce" size={24} />
                    </div>
                  </div>
                  <div className="playlist-name text-sm font-bold tracking-wide text-white group-hover:text-blue-400 transition-colors">{playlist.title}</div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider">Curated by Rage</div>
                </div>
              ))}
            </div>
          </div>

          {/* Genres List */}
          <div className="genres-column flex flex-col h-full gap-4">
             <div className="bg-black/60 border border-white/10 rounded-xl p-6 flex-1">
               <h3 className="text-lg font-bold font-[Orbitron] tracking-widest text-white mb-6 flex items-center gap-2">
                 <Disc size={18} className="text-blue-500" /> STYLES
               </h3>
               <ul className="genres-list space-y-1">
                 {GENRES.map((genre, idx) => (
                   <li key={idx} className="genre-card group flex items-center justify-between p-3 rounded hover:bg-white/5 cursor-pointer transition-colors">
                     <div className="flex items-center">
                        <span className="font-mono text-blue-500/50 text-[10px] mr-3">0{idx + 1}</span>
                        <span className="text-sm font-bold text-gray-300 group-hover:text-white transition-colors">{genre}</span>
                     </div>
                     <span className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-500"><Play size={10} fill="currentColor"/></span>
                   </li>
                 ))}
               </ul>
             </div>
             
             {/* Mini Ad */}
             <div className="bg-gradient-to-br from-blue-900/40 to-black border border-blue-500/20 p-6 rounded-xl text-center">
                <h4 className="text-blue-300 font-bold text-sm mb-2">SUBMIT DEMO</h4>
                <p className="text-[10px] text-gray-400 mb-4">¿Tienes el sonido que buscamos?</p>
                <button className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold tracking-widest rounded">ENVIAR AHORA</button>
             </div>
          </div>
        </div>

        {/* Sticky Mini Player */}
        <motion.div 
            initial={{ y: 100 }}
            whileInView={{ y: 0 }}
            className="music-player-bar mt-6 sticky bottom-6 z-30 mx-auto max-w-4xl bg-[#0a0a12]/90 backdrop-blur-xl border border-white/10 rounded-full p-3 pr-6 shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex items-center gap-4"
        >
          <div className="player-track-info flex items-center gap-4 flex-1">
            <div className="w-12 h-12 rounded-full bg-gray-800 overflow-hidden relative animate-spin-slow">
                <img src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=100" className="w-full h-full object-cover" alt="cover"/>
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/50 to-transparent"></div>
            </div>
            <div className="player-meta hidden sm:block">
              <div className="player-title text-white font-bold text-sm">Neon Pulse</div>
              <div className="player-artist text-xs text-blue-400">Acid Horizon</div>
            </div>
          </div>
          
          <div className="player-controls flex items-center gap-4">
            <button className="text-gray-400 hover:text-white"><SkipBack size={18} fill="currentColor" /></button>
            <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black hover:scale-105 transition-transform"><Pause size={18} fill="currentColor" /></button>
            <button className="text-gray-400 hover:text-white"><SkipForward size={18} fill="currentColor" /></button>
          </div>
          
          <div className="player-progress hidden md:flex items-center gap-3 w-48">
             <span className="text-[10px] font-mono text-gray-400">0:45</span>
             <div className="relative w-full h-1 bg-white/10 rounded-full overflow-hidden cursor-pointer group">
                <div className="absolute left-0 top-0 h-full w-[30%] bg-blue-500 group-hover:bg-blue-400"></div>
             </div>
             <span className="text-[10px] font-mono text-gray-400">3:20</span>
          </div>
        </motion.div>
      </motion.section>

      {/* SECTION 6: EVENTS */}
      <motion.section 
        id="events" 
        className="panel py-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="section-header">
           <span className="section-meta">TOUR 2025</span>
           <h2>PRÓXIMOS EVENTOS</h2>
           <p>Únete a la experiencia en vivo alrededor del mundo.</p>
        </div>

        <div className="flex flex-col gap-4">
          {EVENTS.map((event) => (
            <div key={event.id} className="event-row group relative overflow-hidden bg-white/5 border border-white/10 rounded-none p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-blue-500/50 hover:bg-white/10 transition-all duration-300">
               <div className="absolute left-0 top-0 w-1 h-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
               
               {/* Date */}
               <div className="flex flex-col items-center md:items-start min-w-[100px] border-b md:border-b-0 md:border-r border-white/10 pb-4 md:pb-0 md:pr-8">
                 <span className="text-blue-400 font-bold text-xs tracking-widest uppercase mb-1">{event.date.split(' ')[0]}</span>
                 <span className="text-4xl font-[Bebas_Neue] text-white">{event.date.split(' ')[1].replace(',', '')}</span>
               </div>

               {/* Info */}
               <div className="flex-1 text-center md:text-left">
                 <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors uppercase tracking-wide">{event.name}</h3>
                 <div className="flex items-center justify-center md:justify-start gap-2 text-gray-400 text-sm">
                   <MapPin size={14} className="text-blue-500" />
                   <span className="font-mono">{event.location}</span>
                 </div>
               </div>

               {/* Status & Action */}
               <div className="flex flex-col md:flex-row items-center gap-6">
                  <span className={`px-3 py-1 text-[9px] font-bold uppercase tracking-wider border ${
                    event.status === 'Sold Out' ? 'border-red-500 text-red-500' : 
                    event.status === 'Selling Fast' ? 'border-orange-500 text-orange-500' : 
                    'border-green-500 text-green-500'
                  }`}>
                    {event.status}
                  </span>
                  <button className="px-6 py-3 bg-white text-black font-bold text-xs tracking-widest hover:bg-blue-500 hover:text-white transition-colors">
                    TICKETS
                  </button>
               </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
           <a href="#" className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-gray-500 hover:text-white transition-colors uppercase">
             Ver Calendario Completo <ArrowRight size={14} />
           </a>
        </div>
      </motion.section>

      {/* SECTION 7: NEWS */}
      <section id="news" className="panel py-24 border-t border-white/5" aria-label="Últimas Noticias">
        <div className="section-header flex justify-between items-end">
          <div>
            <span className="section-meta">MAGAZINE</span>
            <h2>LATEST NEWS</h2>
          </div>
          <button className="hidden md:block text-xs font-bold border-b border-white pb-1">VIEW ARCHIVE</button>
        </div>

        <div className="news-container grid lg:grid-cols-[1.5fr_1fr] gap-8">
          {/* Featured News */}
          <article className="featured-news relative h-[400px] lg:h-auto overflow-hidden rounded-xl group cursor-pointer border border-white/10">
            <div className="featured-image absolute inset-0">
              <img src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&h=800&fit=crop" alt="Featured" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
            </div>
            <div className="featured-content relative z-10 p-8 h-full flex flex-col justify-end">
              <span className="featured-badge inline-block bg-blue-600 text-white text-[9px] font-bold px-3 py-1 rounded mb-4 w-fit uppercase tracking-wider">Destacado</span>
              <div className="news-meta text-gray-400 text-[10px] mb-2 font-mono">
                <time>15 ENE 2025</time> • STUDIO
              </div>
              <h3 className="text-2xl md:text-4xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors leading-tight">Hercules & Love Affair detallan nuevo EP de sintetizadores modulares</h3>
              <a href="#" className="news-link text-white font-bold text-xs tracking-widest hover:text-blue-400 transition-colors flex items-center gap-2">
                LEER ARTÍCULO <ArrowRight size={14} />
              </a>
            </div>
          </article>

          {/* Secondary News List */}
          <div className="secondary-news flex flex-col gap-4">
            {NEWS.map((item) => (
              <article key={item.id} className="news-item flex gap-4 p-4 bg-white/5 rounded-xl border border-white/5 hover:border-white/20 hover:bg-white/10 transition-all cursor-pointer group">
                <div className="news-item-image w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 relative">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                </div>
                <div className="news-item-content flex-1 flex flex-col justify-center">
                  <div className="news-meta text-[9px] text-blue-400 mb-2 font-bold uppercase tracking-wider">
                    {item.category} • {item.date}
                  </div>
                  <h4 className="text-white font-bold text-sm leading-snug mb-2 group-hover:text-blue-300 transition-colors line-clamp-2">{item.title}</h4>
                  <p className="text-gray-400 text-[11px] line-clamp-1">{item.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: SERVICES */}
      <motion.section
        id="services"
        className="panel py-32 relative bg-gradient-to-b from-blue-900/5 to-transparent"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="absolute top-[10%] left-[10%] w-[300px] h-[300px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="section-header">
          <span className="section-meta">NUESTROS SERVICIOS</span>
          <h2>POTENCIAMOS TU MÚSICA</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Desde producción hasta distribución global. Todo lo que necesitas para llevar tu carrera al siguiente nivel.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service) => {
            const iconMap: { [key: string]: any } = { Music, Users, Headphones, Globe };
            const IconComponent = iconMap[service.icon] || Music;

            return (
              <motion.div
                key={service.id}
                variants={cardVariant}
                className="service-card group relative p-8 bg-white/5 border border-white/10 rounded-xl hover:border-blue-500/50 hover:bg-white/10 transition-all duration-300 cursor-pointer"
              >
                <div className="absolute top-0 left-0 w-1 h-0 bg-blue-600 group-hover:h-full transition-all duration-500"></div>

                <div className="service-icon w-14 h-14 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-400 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <IconComponent size={24} />
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">{service.title}</h3>
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">{service.description}</p>

                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-gray-500 group-hover:text-gray-400 transition-colors">
                      <Check size={14} className="text-blue-500 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className="mt-6 text-blue-400 text-xs font-bold tracking-widest flex items-center gap-2 group-hover:text-white transition-colors">
                  SABER MÁS <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* SECTION 9: SHOP */}
      <motion.section
        id="shop"
        className="panel py-32 relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="section-header flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="text-left md:text-center flex-1">
            <span className="section-meta">TIENDA</span>
            <h2>MERCHANDISING & VINILOS</h2>
            <p className="text-gray-400">Lleva el sonido RAGE a tu vida. Ediciones limitadas y envíos worldwide.</p>
          </div>
          <a href="#" className="text-xs font-bold tracking-widest border border-white/20 px-6 py-3 hover:bg-white hover:text-black transition-all">
            VER TODO
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map((product) => (
            <motion.div
              key={product.id}
              variants={cardVariant}
              className="product-card group relative cursor-pointer"
            >
              <div className="product-image relative aspect-square overflow-hidden rounded-lg mb-4 bg-black">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />

                {/* Product Type Badge */}
                <div className="absolute top-3 right-3 px-3 py-1 bg-black/80 backdrop-blur-sm text-white text-[9px] font-bold uppercase tracking-wider rounded">
                  {product.type}
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button className="px-6 py-3 bg-white text-black font-bold text-xs tracking-widest hover:bg-blue-500 hover:text-white transition-colors flex items-center gap-2">
                    <ShoppingCart size={14} /> AÑADIR
                  </button>
                </div>
              </div>

              <div className="product-info">
                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-blue-300 transition-colors">{product.name}</h3>
                {product.artist && <p className="text-xs text-gray-500 mb-2">{product.artist}</p>}
                <div className="flex justify-between items-center">
                  <span className="text-blue-400 font-bold text-lg">${product.price}</span>
                  <span className="text-[10px] text-gray-600 font-mono uppercase">Free Shipping</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* SECTION 10: TEAM */}
      <motion.section
        id="team"
        className="panel py-32 relative bg-gradient-to-b from-transparent to-blue-900/5"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="section-header">
          <span className="section-meta">EL EQUIPO</span>
          <h2>MENTES DETRÁS DE RAGE</h2>
          <p className="text-gray-400">Un colectivo de visionarios dedicados a revolucionar la música electrónica.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {TEAM.map((member) => (
            <motion.div
              key={member.id}
              variants={cardVariant}
              className="team-card group relative"
            >
              <div className="team-photo relative aspect-[3/4] overflow-hidden rounded-lg mb-4 bg-black">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>

                <div className="absolute bottom-0 left-0 w-full p-4">
                  <div className="h-1 w-0 bg-blue-500 group-hover:w-full transition-all duration-500 mb-2"></div>
                  <h3 className="text-lg font-bold text-white">{member.name}</h3>
                  <p className="text-xs text-blue-400 uppercase tracking-wider">{member.role}</p>
                </div>
              </div>

              {member.bio && (
                <p className="text-xs text-gray-500 leading-relaxed">{member.bio}</p>
              )}
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* SECTION 11: CONTACT */}
      <section id="contact" className="panel py-32 relative overflow-hidden bg-gradient-to-t from-blue-900/10 to-transparent">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <div className="section-header !text-left !mb-8 md:!ml-0">
              <span className="section-meta">CONECTA</span>
              <h2 className="!text-5xl">HABLEMOS</h2>
              <p className="!mx-0 !text-lg text-gray-300">¿Tienes un proyecto, demo o propuesta? Estamos buscando constantemente nuevas colaboraciones.</p>
            </div>
            
            <div className="mt-12 space-y-8">
              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-blue-400 border border-white/10 group-hover:border-blue-500 group-hover:text-white transition-colors">
                  <MapPin size={20} />
                </div>
                <div>
                   <div className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-1">Oficina Central</div>
                   <div className="text-white text-lg font-light">Calle de la Música 123<br/>28004, Madrid, Spain</div>
                </div>
              </div>
              
              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-blue-400 border border-white/10 group-hover:border-blue-500 group-hover:text-white transition-colors">
                  <Music size={20} />
                </div>
                <div>
                   <div className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-1">Demos Drop</div>
                   <div className="text-white text-lg font-light underline decoration-blue-500/50 hover:decoration-blue-500 transition-all cursor-pointer">demos@rageventure.com</div>
                </div>
              </div>
            </div>
          </div>

          <form className="contact-form bg-black/40 p-8 md:p-10 rounded-3xl border border-white/10 backdrop-blur-md shadow-2xl relative" onSubmit={handleSubmit} noValidate>
            <div className="absolute top-0 right-0 p-4 opacity-20"><Send size={40} /></div>
            
            <div className={`form-group ${errors.name ? 'error' : ''} mb-6`}>
              <label htmlFor="name" className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Nombre</label>
              <input 
                type="text" id="name" name="name" placeholder="Tu Nombre Completo"
                value={values.name} onChange={handleChange} 
                className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white focus:border-blue-500 focus:bg-white/10 focus:outline-none transition-colors placeholder:text-gray-600"
              />
              {errors.name && <span className="text-red-500 text-xs mt-1 block">{errors.name}</span>}
            </div>

            <div className={`form-group ${errors.email ? 'error' : ''} mb-6`}>
              <label htmlFor="email" className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Email</label>
              <input 
                type="email" id="email" name="email" placeholder="tu@email.com"
                value={values.email} onChange={handleChange} 
                className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white focus:border-blue-500 focus:bg-white/10 focus:outline-none transition-colors placeholder:text-gray-600"
              />
              {errors.email && <span className="text-red-500 text-xs mt-1 block">{errors.email}</span>}
            </div>

            <div className={`form-group ${errors.message ? 'error' : ''} mb-8`}>
              <label htmlFor="message" className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Mensaje</label>
              <textarea 
                id="message" name="message" rows={4} placeholder="Cuéntanos sobre tu proyecto..."
                value={values.message} onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white focus:border-blue-500 focus:bg-white/10 focus:outline-none transition-colors placeholder:text-gray-600 resize-none"
              ></textarea>
              {errors.message && <span className="text-red-500 text-xs mt-1 block">{errors.message}</span>}
            </div>

            <button className={`contact-btn w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold tracking-[0.2em] py-5 rounded-lg transition-all shadow-lg shadow-blue-900/20 ${isSubmitting ? 'opacity-70 cursor-wait' : ''}`} type="submit">
              {isSubmitting ? 'ENVIANDO...' : 'ENVIAR MENSAJE'}
            </button>
            
            {submitStatus === 'success' && <div className="mt-4 text-green-400 text-center text-sm font-bold bg-green-900/20 py-3 rounded border border-green-500/20">¡Mensaje enviado con éxito!</div>}
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="site-footer bg-black py-20 border-t border-white/10 relative z-10">
        <div className="footer-container max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
             
             {/* Brand Column */}
             <div className="col-span-1 md:col-span-1">
                <h2 className="text-2xl font-[Orbitron] font-black text-white mb-4">RAGE VENTURE</h2>
                <p className="text-gray-500 text-xs leading-relaxed mb-6">
                  Una plataforma global para la música electrónica y el arte digital. Rompiendo barreras entre lo físico y lo virtual.
                </p>
                <div className="flex gap-4">
                  {[Twitter, Instagram, Youtube].map((Icon, i) => (
                    <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black hover:scale-110 transition-all">
                      <Icon size={16} />
                    </a>
                  ))}
                </div>
             </div>
             
             {/* Links Columns */}
             <div className="col-span-1">
                <h3 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Explorar</h3>
                <nav className="flex flex-col gap-3">
                  <a href="#artists" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">Artistas</a>
                  <a href="#releases" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">Lanzamientos</a>
                  <a href="#events" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">Eventos</a>
                  <a href="#news" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">Magazine</a>
                </nav>
             </div>
             
             <div className="col-span-1">
                <h3 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Comunidad</h3>
                <nav className="flex flex-col gap-3">
                  <a href="#" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">Unirse al Discord</a>
                  <a href="#" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">Enviar Demo</a>
                  <a href="#" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">Trabaja con Nosotros</a>
                  <a href="#" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">Prensa</a>
                </nav>
             </div>

             {/* Newsletter */}
             <div className="col-span-1">
              <h3 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Newsletter</h3>
              <p className="text-gray-400 text-xs mb-4">Suscríbete para acceso anticipado a tickets y lanzamientos exclusivos.</p>
              <form className="flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder="TU EMAIL" className="bg-white/5 border border-white/10 rounded px-4 py-3 text-xs text-white w-full focus:border-blue-500 outline-none" />
                <button type="submit" className="bg-blue-600 text-white px-4 py-3 rounded text-xs font-bold hover:bg-blue-500 uppercase tracking-widest transition-colors">Suscribirse</button>
              </form>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-600 text-[10px] font-mono uppercase tracking-wider">© 2025 RAGE VENTURE. ALL RIGHTS RESERVED.</div>
            <div className="flex gap-6">
                <a href="#" className="text-gray-600 hover:text-gray-400 text-[10px] uppercase font-bold">Privacy Policy</a>
                <a href="#" className="text-gray-600 hover:text-gray-400 text-[10px] uppercase font-bold">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
};