import { Footer } from '../components/shared/Footer';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Ticket, Clock, Music, Users, Star } from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
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

// Fictional DJ Events
const EVENTOS_DJ = [
  {
    id: 1,
    name: "VINYL REVOLUTION NIGHT",
    date: "DIC 15, 2024",
    time: "22:00 - 06:00",
    location: "Club Nexus, Madrid",
    djs: ["DJ VORTEX", "VINYL MASTER", "BEAT ARCHITECT"],
    genre: "Techno • House • Vinyl Only",
    price: "€25",
    status: "Available",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80",
    capacity: 500,
    description: "Una noche dedicada exclusivamente al vinilo con los mejores DJs de la escena underground."
  },
  {
    id: 2,
    name: "TURNTABLE MASTERS SHOWCASE",
    date: "DIC 22, 2024",
    time: "20:00 - 04:00",
    location: "Warehouse District, Barcelona",
    djs: ["DJ SPINMASTER", "GROOVE SELECTOR", "THE CURATOR"],
    genre: "Deep House • Disco • Funk",
    price: "€30",
    status: "Selling Fast",
    image: "https://images.unsplash.com/photo-1571266028243-d220c9f5b21f?w=800&q=80",
    capacity: 800,
    description: "Los maestros del tornamesa se reúnen para una noche de pura técnica y selección musical."
  },
  {
    id: 3,
    name: "ACID TECHNO EXPERIENCE",
    date: "DIC 31, 2024",
    time: "23:00 - 12:00",
    location: "Industrial Zone, Valencia",
    djs: ["NEON PULSE", "CYBER DUST", "ACID PROPHET"],
    genre: "Acid Techno • Hard Techno",
    price: "€40",
    status: "Sold Out",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80",
    capacity: 1200,
    description: "Despide el año con la energía más potente del acid techno en una rave inolvidable."
  },
  {
    id: 4,
    name: "MELODIC SUNSET SESSION",
    date: "ENE 10, 2025",
    time: "18:00 - 02:00",
    location: "Beach Club, Ibiza",
    djs: ["ASTRAL ECHO", "VOID WALKER", "HORIZON"],
    genre: "Melodic Techno • Progressive",
    price: "€35",
    status: "Available",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=80",
    capacity: 600,
    description: "Una sesión melódica desde el atardecer hasta la madrugada con vistas al Mediterráneo."
  },
  {
    id: 5,
    name: "UNDERGROUND VINYL SESSIONS",
    date: "ENE 18, 2025",
    time: "21:00 - 05:00",
    location: "Secret Location, Sevilla",
    djs: ["THE DIGGER", "SELECTOR SUPREME", "RARE GROOVES"],
    genre: "Breaks • Jungle • DnB",
    price: "€20",
    status: "Available",
    image: "https://images.unsplash.com/photo-1598387846820-edcfdfac5c8e?w=800&q=80",
    capacity: 300,
    description: "Sesión íntima de coleccionistas de vinilo compartiendo sus joyas más preciadas."
  },
  {
    id: 6,
    name: "RAVE RENAISSANCE",
    date: "ENE 25, 2025",
    time: "23:00 - 10:00",
    location: "Abandoned Factory, Bilbao",
    djs: ["RAVE WARRIOR", "HARDCORE HERO", "BASS COMMANDER"],
    genre: "Hardcore • Gabber • Happy Hardcore",
    price: "€28",
    status: "Selling Fast",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80",
    capacity: 1000,
    description: "Regreso a las raíces del rave con sonidos hardcore y energía desenfrenada."
  }
];

export const Eventos: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);

  return (
    <main className="w-full relative z-10 overflow-hidden min-h-screen pt-32 pb-20">
      {/* Hero Section */}
      <motion.section
        className="panel mb-20"
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
            <Calendar className="w-20 h-20 mx-auto mb-6 text-blue-500" />
          </motion.div>
          <span className="section-meta">PRÓXIMOS EVENTOS 2024-2025</span>
          <h1 className="text-6xl md:text-8xl font-[Bebas_Neue] text-white mb-6 tracking-wider">
            EVENTOS DJ
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Experiencias únicas de música electrónica con los mejores DJs del momento.
            Desde sesiones de vinilo hasta raves hardcore.
          </p>
        </div>
      </motion.section>

      {/* Events Grid */}
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
              {/* Event Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>

                {/* Status Badge */}
                <div className={`absolute top-4 right-4 px-4 py-2 text-xs font-bold uppercase tracking-wider border ${
                  event.status === 'Sold Out' ? 'border-red-500 text-red-500 bg-red-500/10' :
                  event.status === 'Selling Fast' ? 'border-orange-500 text-orange-500 bg-orange-500/10' :
                  'border-green-500 text-green-500 bg-green-500/10'
                } backdrop-blur-md`}>
                  {event.status}
                </div>
              </div>

              {/* Event Info */}
              <div className="p-6">
                {/* Date & Time */}
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

                {/* Event Name */}
                <h3 className="text-3xl font-[Bebas_Neue] text-white mb-3 tracking-wide group-hover:text-blue-400 transition-colors">
                  {event.name}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  {event.description}
                </p>

                {/* Location */}
                <div className="flex items-center gap-2 text-gray-300 mb-4">
                  <MapPin size={16} className="text-blue-500" />
                  <span className="text-sm font-mono">{event.location}</span>
                </div>

                {/* DJs */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Music size={14} className="text-blue-500" />
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Line-up</span>
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

                {/* Genre & Capacity */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                  <div>
                    <span className="text-xs text-gray-500 uppercase tracking-wider">Género</span>
                    <p className="text-sm text-white font-mono">{event.genre}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-500 uppercase tracking-wider">Capacidad</span>
                    <p className="text-sm text-white font-mono flex items-center gap-1 justify-end">
                      <Users size={14} /> {event.capacity}
                    </p>
                  </div>
                </div>

                {/* Price & Action */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-gray-500 uppercase tracking-wider">Entrada</span>
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

              {/* Hover Effect Line */}
              <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Newsletter Section */}
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
