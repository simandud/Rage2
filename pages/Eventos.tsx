import { Footer } from '../components/shared/Footer';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Music, Users, Star } from 'lucide-react';
import { DJFader } from '../components/interactive/DJFader';
import { VolumeKnob } from '../components/interactive/VolumeKnob';

/* ANIMACIONES BÁSICAS */
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

/* IMÁGENES PARA EL VOLUME KNOB */
const SAMPLE_IMAGES = [
  'https://images.unsplash.com/photo-1571266028243-d220c9f5b21f?w=800&q=80',
  'https://images.unsplash.com/photo-1598653222000-6b7b7a552625?w=800&q=80',
  'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?w=800&q=80',
  'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80',
  'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80'
];

/* EVENTOS FICTICIOS */
const EVENTOS_DJ = [
  {
    id: 1,
    name: 'VINYL REVOLUTION NIGHT',
    date: 'DIC 15, 2024',
    time: '22:00 - 06:00',
    location: 'Club Nexus, Madrid',
    djs: ['DJ VORTEX', 'VINYL MASTER', 'BEAT ARCHITECT'],
    genre: 'Techno • House • Vinyl Only',
    price: '€25',
    status: 'Available',
    image: './assets/last (1).png', 
    capacity: 500,
    description:
      'Una noche dedicada exclusivamente al vinilo con los mejores DJs de la escena underground.'
  },
  {
    id: 2,
    name: 'TURNTABLE MASTERS SHOWCASE',
    date: 'DIC 22, 2024',
    time: '20:00 - 04:00',
    location: 'Warehouse District, Barcelona',
    djs: ['DJ SPINMASTER', 'GROOVE SELECTOR', 'THE CURATOR'],
    genre: 'Deep House • Disco • Funk',
    price: '€30',
    status: 'Selling Fast',
    image: 'https://images.unsplash.com/photo-1571266028243-d220c9f5b21f?w=800&q=80',
    capacity: 800,
    description:
      'Los maestros del tornamesa se reúnen para una noche de pura técnica y selección musical.'
  },
  {
    id: 3,
    name: 'ACID TECHNO EXPERIENCE',
    date: 'DIC 31, 2024',
    time: '23:00 - 12:00',
    location: 'Industrial Zone, Valencia',
    djs: ['NEON PULSE', 'CYBER DUST', 'ACID PROPHET'],
    genre: 'Acid Techno • Hard Techno',
    price: '€40',
    status: 'Sold Out',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80',
    capacity: 1200,
    description:
      'Despide el año con la energía más potente del acid techno en una rave inolvidable.'
  },
  {
    id: 4,
    name: 'MELODIC SUNSET SESSION',
    date: 'ENE 10, 2025',
    time: '18:00 - 02:00',
    location: 'Beach Club, Ibiza',
    djs: ['ASTRAL ECHO', 'VOID WALKER', 'HORIZON'],
    genre: 'Melodic Techno • Progressive',
    price: '€35',
    status: 'Available',
    image: './assets/2.1meet2go.png',
    capacity: 600,
    description:
      'Una sesión melódica desde el atardecer hasta la madrugada con vistas al Mediterráneo.'
  },
  {
    id: 5,
    name: 'UNDERGROUND VINYL SESSIONS',
    date: 'ENE 18, 2025',
    time: '21:00 - 05:00',
    location: 'Secret Location, Sevilla',
    djs: ['THE DIGGER', 'SELECTOR SUPREME', 'RARE GROOVES'],
    genre: 'Breaks • Jungle • DnB',
    price: '€20',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1598387846820-edcfdfac5c8e?w=800&q=80',
    capacity: 300,
    description:
      'Sesión íntima de coleccionistas de vinilo compartiendo sus joyas más preciadas.'
  },
  {
    id: 6,
    name: 'RAVE RENAISSANCE',
    date: 'ENE 25, 2025',
    time: '23:00 - 10:00',
    location: 'Abandoned Factory, Bilbao',
    djs: ['RAVE WARRIOR', 'HARDCORE HERO', 'BASS COMMANDER'],
    genre: 'Hardcore • Gabber • Happy Hardcore',
    price: '€28',
    status: 'Selling Fast',
    image: './assets/logorageve.png',
    capacity: 1000,
    description:
      'Regreso a las raíces del rave con sonidos hardcore y energía desenfrenada.'
  }
];

export const Eventos: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);

  const [crossfaderValue, setCrossfaderValue] = useState(50);
  const [volumeValue, setVolumeValue] = useState(75);
  const [eqLow, setEqLow] = useState(50);
  const [eqMid, setEqMid] = useState(50);
  const [eqHigh, setEqHigh] = useState(50);

  // 🔊 Mezcla entre múltiples eventos (4 primeros)
  const heroEvents = EVENTOS_DJ.slice(0, 4);
  const position =
    heroEvents.length > 1
      ? (crossfaderValue / 100) * (heroEvents.length - 1)
      : 0; // 0..N-1

  const activeIndex = Math.round(position);
  const activeEvent = heroEvents[activeIndex] ?? heroEvents[0];

  const volume = volumeValue / 100;

  return (
    <main className="w-full relative z-10 overflow-hidden min-h-screen pt-32 pb-20">
            {/* 🔊 HERO INTERACTIVO FULL WIDTH */}
      <section className="relative z-10 py-16 bg-gradient-to-b from-transparent to-black/40">
        <div className="w-screen relative left-1/2 -translate-x-1/2">
          <div className="max-w-6xl mx-auto px-4 lg:px-8">
            <motion.div
              className="mb-10"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
            >
              <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-black/70 h-[30rem] md:h-[34rem]">
                {/* Capas de eventos controladas por el crossfader */}
                {heroEvents.map((event, index) => {
                  const distance = Math.abs(position - index);
                  const opacity = distance >= 1 ? 0 : 1 - distance; // crossfade suave
                  const translateX = (index - position) * 40;

                  return (
                    <img
                      key={event.id}
                      src={event.image}
                      alt={event.name}
                      className="absolute inset-0 w-full h-full object-cover"
                      style={{
                        opacity,
                        transform: `translateX(${translateX}px) scale(${
                          1 + (0.5 - Math.min(distance, 0.5)) * 0.04
                        })`,
                        transition: 'opacity 0.25s linear, transform 0.25s linear',
                      }}
                    />
                  );
                })}

                {/* Luces controladas por el volumen */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'radial-gradient(circle at top, rgba(59,130,246,0.7), transparent 55%), radial-gradient(circle at bottom, rgba(168,85,247,0.8), transparent 55%)',
                    opacity: 0.3 + volume * 0.7,
                    mixBlendMode: 'screen',
                    transition: 'opacity 0.15s linear',
                  }}
                />

{/* Crossfader minimalista en la parte inferior */}
<div className="absolute inset-x-0 bottom-8 flex justify-center z-30 pointer-events-none">
  <div className="flex flex-col items-center gap-1 pointer-events-auto">
    {/* Título centrado */}
    <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.35em] uppercase text-gray-200 text-center">
      2024 - 2025
    </span>

    {/* Fader fino, largo y sutil */}
    <div className="w-[220px] sm:w-[280px] md:w-[340px]">
      <div className="h-7 bg-black/45 backdrop-blur-md border border-white/15 rounded-full px-4 flex items-center shadow-[0_8px_30px_rgba(0,0,0,0.6)]">
        <input
          type="range"
          min={0}
          max={100}
          value={crossfaderValue}
          onChange={(e) => setCrossfaderValue(Number(e.target.value))}
          className="dj-crossfader w-full appearance-none bg-transparent focus:outline-none"
        />
      </div>
    </div>
  </div>
</div>

                {/* Info del evento activo + barras de EQ */}
                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/90 via-black/60 to-transparent z-20">
                  <p className="text-xs font-mono text-blue-400 tracking-[0.25em] mb-2">
                    EVENTO ACTIVO
                  </p>
                  <h3 className="text-2xl md:text-3xl font-[Bebas_Neue] text-white tracking-wider">
                    {activeEvent?.name}
                  </h3>
                  <p className="text-sm text-gray-300 mb-2">
                    {activeEvent?.date} · {activeEvent?.location}
                  </p>

                  <div className="flex items-end gap-2 h-10 mt-2">
                    <div className="flex-1 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="w-full bg-blue-500"
                        style={{
                          height: `${20 + (eqLow / 100) * 80}%`,
                          transition: 'height 0.12s linear',
                        }}
                      />
                    </div>
                    <div className="flex-1 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="w-full bg-purple-500"
                        style={{
                          height: `${20 + (eqMid / 100) * 80}%`,
                          transition: 'height 0.12s linear',
                        }}
                      />
                    </div>
                    <div className="flex-1 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="w-full bg-cyan-400"
                        style={{
                          height: `${20 + (eqHigh / 100) * 80}%`,
                          transition: 'height 0.12s linear',
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* HERO DE TEXTO DESPUÉS DEL PLAYGROUND */}
      <motion.section
        className="panel mt-10 mb-20"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
           </motion.div>
          <span className="section-meta">PRÓXIMOS EVENTOS</span>
          <h1 className="text-6xl md:text-8xl font-[Bebas_Neue] text-white mb-6 tracking-wider">
            2025 - 2026
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Experiencias únicas de música electrónica con los mejores DJs del momento.
            Sesiones de vinilo en vivo.
          </p>
        </div>
      </motion.section>

      {/* GRID DE EVENTOS */}
      <motion.section
        className="panel"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {EVENTOS_DJ.map((event) => (
            <motion.div
              key={event.id}
              variants={cardVariant}
              className="group relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-300"
              onMouseEnter={() => setSelectedEvent(event.id)}
              onMouseLeave={() => setSelectedEvent(null)}
            >
              {/* Imagen */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

                {/* Badge estado */}
                <div
                  className={`absolute top-4 right-4 px-4 py-2 text-xs font-bold uppercase tracking-wider border ${
                    event.status === 'Sold Out'
                      ? 'border-red-500 text-red-500 bg-red-500/10'
                      : event.status === 'Selling Fast'
                      ? 'border-orange-500 text-orange-500 bg-orange-500/10'
                      : 'border-green-500 text-green-500 bg-green-500/10'
                  } backdrop-blur-md`}
                >
                  {event.status}
                </div>
              </div>

              {/* Info */}
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4 text-blue-400">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span className="text-sm font-mono">{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span className="text-sm font-mono">{event.time}</span>
                  </div>
                </div>

                <h3 className="text-3xl font-[Bebas_Neue] text-white mb-3 tracking-wide group-hover:text-blue-400 transition-colors">
                  {event.name}
                </h3>

                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  {event.description}
                </p>

                <div className="flex items-center gap-2 text-gray-300 mb-4">
                  <MapPin size={16} className="text-blue-500" />
                  <span className="text-sm font-mono">{event.location}</span>
                </div>

                {/* DJs */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Music size={14} className="text-blue-500" />
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Line-up
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {event.djs.map((dj, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold rounded-full"
                      >
                        {dj}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Género / capacidad */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                  <div>
                    <span className="text-xs text-gray-500 uppercase tracking-wider">
                      Género
                    </span>
                    <p className="text-sm text-white font-mono">{event.genre}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-500 uppercase tracking-wider">
                      Capacidad
                    </span>
                    <p className="text-sm text-white font-mono flex items-center gap-1 justify-end">
                      <Users size={14} /> {event.capacity}
                    </p>
                  </div>
                </div>

                {/* Precio / botón */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-gray-500 uppercase tracking-wider">
                      Entrada
                    </span>
                    <p className="text-3xl font-bold text-white">{event.price}</p>
                  </div>
                  <button
                    className={`px-6 py-3 rounded-lg font-bold text-sm tracking-widest transition-all ${
                      event.status === 'Sold Out'
                        ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(0,123,255,0.5)]'
                    }`}
                    disabled={event.status === 'Sold Out'}
                  >
                    {event.status === 'Sold Out' ? 'AGOTADO' : 'COMPRAR TICKETS'}
                  </button>
                </div>
              </div>

              <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* NEWSLETTER */}
      <motion.section
        className="panel mt-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 backdrop-blur-md border border-white/10 rounded-2xl p-12 text-center">
          <Star className="w-12 h-12 mx-auto mb-4 text-blue-500" />
          <h3 className="text-4xl font-[Bebas_Neue] text-white mb-4 tracking-wide">
            NO TE PIERDAS NINGÚN EVENTO
          </h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Suscríbete a nuestro newsletter y recibe notificaciones de nuevos eventos,
            preventa de tickets y contenido exclusivo.
          </p>
          <form className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto">
            <input
              type="email"
              placeholder="tu@email.com"
              className="flex-1 px-6 py-4 bg-black/40 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
            <button
              type="submit"
              className="px-8 py-4 bg-blue-600 text-white font-bold tracking-widest rounded-lg hover:bg-blue-500 transition-colors shadow-[0_0_20px_rgba(0,123,255,0.3)]"
            >
              SUSCRIBIRSE
            </button>
          </form>
        </div>
      </motion.section>

      <Footer />
    </main>
  );
};
