import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Disc, Users, Star, ShoppingBag, Calendar, Music, Headphones, ChevronRight, SkipBack, SkipForward, Pause, MapPin, Ticket, Send, Twitter, Instagram, Youtube } from 'lucide-react';
import { useForm, validateContactForm } from '../utils/form';
import { ARTISTS, RELEASES, EVENTS, PLAYLISTS, GENRES, NEWS } from '../constants';

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
          <div className="mb-4 flex justify-center">
            <img 
              src="/assets/logoragevee.png"
              alt="RAGE VENTURE Logo"
              className="h-48 md:h-60 lg:h-72 drop-shadow-[0_0_20px_rgba(0,85,255,0.5)] hover:drop-shadow-[0_0_40px_rgba(0,85,255,0.8)] transition-all duration-300 hover:scale-110 cursor-pointer"
            />
          </div>

          <span className="text-blue-400 tracking-[0.5em] text-xs md:text-sm font-bold uppercase animate-pulse">Crea sin límites. Tu sonido. Tu mundo.</span>
          
          <p className="hero-tagline max-w-2xl mx-auto text-gray-300 text-sm md:text-lg leading-relaxed">
             <br className="hidden md:block" /> 
          </p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-12 flex flex-col md:flex-row gap-6 justify-center items-center"
          >
           
          </motion.div>
        </motion.div>
        
        {/* Infinite Marquee Footer of Hero */}
        <div className="marquee absolute bottom-10 w-full z-20 border-y border-white/10 bg-black/40 backdrop-blur-sm" aria-hidden="true">
          <div className="marquee-content text-gray-400">
            RAGE VENTURE • TECHNO • HOUSE • IDM • WORLDWIDE SHIPPING • ARTIST MANAGEMENT • STUDIO RENTAL • RAGE VENTURE • 3D IMMERSIVE PORTAL • TECHNO • HOUSE • IDM •
          </div>
        </div>
      </section>

      {/* SECTION 2: ABOUT - ACTUALIZADO CON TEXTOS MÁS GRANDES */}
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
            <span className="section-meta text-sm md:text-base">SOBRE NOSOTROS</span>
             <div className="h-1 w-20 bg-blue-600 mt-4"></div>
          </div>
          <div className="about-content relative border-l border-white/10 pl-8">
             <p className="text-lg md:text-2xl text-gray-200 leading-relaxed font-light mb-6">
              Potenciamos artistas y productores para lograr más creando experiencias inmersivas en cada punto de contacto: en el metaverso, en eventos presenciales y en línea.
            </p>
            <p className="text-sm md:text-base text-gray-400 leading-relaxed mb-8">
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

      {/* SECTION 8: CONTACT */}
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
      {/* FOOTER REDISEÑADO */}
      <footer className="site-footer bg-white py-16 relative z-10">
        {/* Top Section - Logo y Redes */}
        <div className="max-w-7xl mx-auto px-6 text-center mb-16 pb-16 border-b border-gray-200">
          {/* Logo */}
          <div className="mb-8">
            <img src="/assets/logoragevee.png" alt="RAGE VENTURE" className="h-12 mx-auto mb-6" />
          </div>
          
          {/* Brand Name */}
          <h2 className="text-2xl font-[TurnKey] font-black text-black tracking-widest mb-8">
            RAGE VENTURE
          </h2>
          
          {/* Social Icons */}
          <div className="flex justify-center gap-6 items-center">
            <a href="#" className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-600 hover:border-blue-500 hover:text-blue-500 transition-all">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/></svg>
            </a>
            <a href="#" className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-600 hover:border-blue-500 hover:text-blue-500 transition-all">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 9-5 9-5z"/></svg>
            </a>
            <a href="#" className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-600 hover:border-blue-500 hover:text-blue-500 transition-all">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23 0H1v24h22V0zM15.5 8.5l-2 .25-1.5 4v4.25h-2.5V9.25l1.5-3.75 2.5-.5v.75h2v-1z"/></svg>
            </a>
            <a href="#" className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-600 hover:border-blue-500 hover:text-blue-500 transition-all">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/></svg>
            </a>
          </div>
        </div>

        {/* Middle Section - Links en Grid */}
        <div className="max-w-7xl mx-auto px-6 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            
            {/* SERVICIOS */}
            <div>
              <h3 className="text-sm font-[TurnKey] font-bold text-black uppercase tracking-widest mb-6 pb-3 border-b-2 border-blue-500">
                Servicios
              </h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-sm text-gray-700 hover:text-blue-500 transition-colors">Alquiler de Recursos</a></li>
                <li><a href="#" className="text-sm text-gray-700 hover:text-blue-500 transition-colors">Tienda Online</a></li>
                <li><a href="#" className="text-sm text-gray-700 hover:text-blue-500 transition-colors">Próximos Eventos</a></li>
                <li><a href="#" className="text-sm text-gray-700 hover:text-blue-500 transition-colors">Clases & Bootcamps</a></li>
              </ul>
            </div>

            {/* COMPAÑÍA */}
            <div>
              <h3 className="text-sm font-[TurnKey] font-bold text-black uppercase tracking-widest mb-6 pb-3 border-b-2 border-blue-500">
                Conocenos
              </h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-sm text-gray-700 hover:text-blue-500 transition-colors">Sobre Nosotros</a></li>
                <li><a href="#" className="text-sm text-gray-700 hover:text-blue-500 transition-colors">Contacto</a></li>
                <li><a href="#" className="text-sm text-gray-700 hover:text-blue-500 transition-colors">Blog</a></li>
                <li><a href="#" className="text-sm text-gray-700 hover:text-blue-500 transition-colors">Press Kit</a></li>
              </ul>
            </div>

            {/* RECURSOS */}
            <div>
              <h3 className="text-sm font-[TurnKey] font-bold text-black uppercase tracking-widest mb-6 pb-3 border-b-2 border-blue-500">
                Recursos
              </h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-sm text-gray-700 hover:text-blue-500 transition-colors">Documentación</a></li>
                <li><a href="#" className="text-sm text-gray-700 hover:text-blue-500 transition-colors">Preguntas Frecuentes</a></li>
                <li><a href="#" className="text-sm text-gray-700 hover:text-blue-500 transition-colors">Soporte</a></li>
                <li><a href="#" className="text-sm text-gray-700 hover:text-blue-500 transition-colors">Comunidad</a></li>
              </ul>
            </div>

            {/* NEWSLETTER */}
            <div>
              <h3 className="text-sm font-[TurnKey] font-bold text-black uppercase tracking-widest mb-6 pb-3 border-b-2 border-blue-500">
                Newsletter
              </h3>
              <p className="text-sm text-gray-700 mb-4">
                Recibe updates exclusivos sobre eventos, releases y oportunidades.
              </p>
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="tu@email.com"
                  className="flex-1 px-4 py-2 text-sm bg-gray-100 border border-gray-300 rounded text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-500 text-white text-xs font-bold rounded hover:bg-blue-600 transition-colors uppercase tracking-wide"
                >
                  Suscribir
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Section - Copyright y Links Legales */}
        <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-xs text-gray-500 font-mono uppercase tracking-wider">
              © 2025 RAGE VENTURE. Todos los derechos reservados.
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-xs text-gray-500 hover:text-gray-700 uppercase font-bold transition-colors">Términos de Servicio</a>
              <a href="#" className="text-xs text-gray-500 hover:text-gray-700 uppercase font-bold transition-colors">Política de Privacidad</a>
              <a href="#" className="text-xs text-gray-500 hover:text-gray-700 uppercase font-bold transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
};
