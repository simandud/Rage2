import { Footer } from '../components/shared/Footer';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Disc, Play, Pause, SkipBack, SkipForward, Music, Download, Share2, Heart } from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

// Fictional Vinyl/Digital Releases
const LANZAMIENTOS_DJ = [
  {
    id: 1,
    title: "Acid Dreams Vol. 1",
    artist: "NEON PULSE",
    label: "RAGE VENTURE",
    format: "Vinyl + Digital",
    catalog: "RV001",
    releaseDate: "NOV 2024",
    genre: "Acid Techno",
    tracks: [
      { name: "303 Paradise", duration: "6:42" },
      { name: "Bass Sequence", duration: "7:15" },
      { name: "Liquid Acid", duration: "6:28" },
      { name: "Machine Love", duration: "8:03" }
    ],
    cover: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=800&q=80",
    color: "from-red-500 to-orange-500",
    price: "€14.99",
    stock: "Limited to 300 copies"
  },
  {
    id: 2,
    title: "Deep Dive Sessions",
    artist: "VOID WALKER",
    label: "RAGE VENTURE",
    format: "Vinyl + Digital",
    catalog: "RV002",
    releaseDate: "DIC 2024",
    genre: "Deep House",
    tracks: [
      { name: "Underwater", duration: "7:22" },
      { name: "Ocean Floor", duration: "6:55" },
      { name: "Pressure", duration: "7:40" },
      { name: "Abyss Calling", duration: "8:12" }
    ],
    cover: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
    color: "from-blue-500 to-cyan-500",
    price: "€14.99",
    stock: "In Stock"
  },
  {
    id: 3,
    title: "Warehouse Anthems",
    artist: "CYBER DUST",
    label: "RAGE VENTURE",
    format: "Vinyl + Digital",
    catalog: "RV003",
    releaseDate: "DIC 2024",
    genre: "Hard Techno",
    tracks: [
      { name: "Industrial Complex", duration: "6:33" },
      { name: "Steel Heart", duration: "7:08" },
      { name: "Concrete Jungle", duration: "6:47" },
      { name: "Factory Reset", duration: "7:55" }
    ],
    cover: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80",
    color: "from-gray-500 to-gray-700",
    price: "€14.99",
    stock: "Pre-Order"
  },
  {
    id: 4,
    title: "Cosmic Journey EP",
    artist: "ASTRAL ECHO",
    label: "RAGE VENTURE",
    format: "Digital Only",
    catalog: "RVD001",
    releaseDate: "ENE 2025",
    genre: "Melodic Techno",
    tracks: [
      { name: "Stellar Wind", duration: "8:15" },
      { name: "Nebula Dreams", duration: "7:45" },
      { name: "Galaxy Drift", duration: "9:22" }
    ],
    cover: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    color: "from-purple-500 to-pink-500",
    price: "€9.99",
    stock: "Digital"
  },
  {
    id: 5,
    title: "Breakbeat Chronicles",
    artist: "THE DIGGER",
    label: "RAGE VENTURE",
    format: "Vinyl + Digital",
    catalog: "RV004",
    releaseDate: "ENE 2025",
    genre: "Breaks • Jungle",
    tracks: [
      { name: "Amen Scientist", duration: "5:47" },
      { name: "Break The System", duration: "6:12" },
      { name: "Jungle Warfare", duration: "5:55" },
      { name: "Breakbeat Theory", duration: "6:28" }
    ],
    cover: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=80",
    color: "from-green-500 to-emerald-500",
    price: "€14.99",
    stock: "Coming Soon"
  },
  {
    id: 6,
    title: "Detroit Chronicles",
    artist: "VINYL MASTER",
    label: "RAGE VENTURE",
    format: "Vinyl + Digital",
    catalog: "RV005",
    releaseDate: "FEB 2025",
    genre: "Detroit Techno",
    tracks: [
      { name: "Motor City Lights", duration: "7:33" },
      { name: "Analog Soul", duration: "6:58" },
      { name: "Urban Pulse", duration: "7:12" },
      { name: "Midnight Drive", duration: "8:45" }
    ],
    cover: "https://images.unsplash.com/photo-1598387846820-edcfdfac5c8e?w=800&q=80",
    color: "from-yellow-500 to-red-500",
    price: "€14.99",
    stock: "Limited to 500 copies"
  }
];

export const Lanzamientos: React.FC = () => {
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [selectedRelease, setSelectedRelease] = useState<number | null>(null);

  const handlePlay = (id: number) => {
    setPlayingId(playingId === id ? null : id);
  };

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
            initial={{ scale: 0.9, opacity: 0, rotate: 0 }}
            animate={{ scale: 1, opacity: 1, rotate: 360 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <Disc className="w-20 h-20 mx-auto mb-6 text-blue-500" />
          </motion.div>
          <span className="section-meta">CATÁLOGO DISCOGRÁFICO</span>
          <h1 className="text-6xl md:text-8xl font-[Bebas_Neue] text-white mb-6 tracking-wider">
            LANZAMIENTOS
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Descubre nuestra colección de vinilos y lanzamientos digitales.
            Música electrónica de calidad desde acid techno hasta melodic house.
          </p>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 mt-12">
          <div className="text-center">
            <p className="text-5xl font-bold text-blue-500 mb-2">24+</p>
            <p className="text-sm text-gray-400 uppercase tracking-wider">Releases</p>
          </div>
          <div className="text-center">
            <p className="text-5xl font-bold text-purple-500 mb-2">12</p>
            <p className="text-sm text-gray-400 uppercase tracking-wider">Artistas</p>
          </div>
          <div className="text-center">
            <p className="text-5xl font-bold text-green-500 mb-2">8</p>
            <p className="text-sm text-gray-400 uppercase tracking-wider">Géneros</p>
          </div>
        </div>
      </motion.section>

      {/* Releases Grid */}
      <motion.section
        className="panel"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {LANZAMIENTOS_DJ.map((release) => (
            <motion.div
              key={release.id}
              variants={cardVariant}
              className="group relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-300"
              onMouseEnter={() => setSelectedRelease(release.id)}
              onMouseLeave={() => setSelectedRelease(null)}
            >
              <div className="grid md:grid-cols-[280px_1fr] gap-6 p-6">
                {/* Cover Art */}
                <div className="relative aspect-square rounded-xl overflow-hidden shadow-2xl">
                  <img
                    src={release.cover}
                    alt={release.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${release.color} opacity-20 mix-blend-overlay`}></div>

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 backdrop-blur-sm">
                    <button
                      onClick={() => handlePlay(release.id)}
                      className="w-20 h-20 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                    >
                      {playingId === release.id ? (
                        <Pause fill="currentColor" size={32} />
                      ) : (
                        <Play fill="currentColor" size={32} className="ml-1" />
                      )}
                    </button>
                  </div>

                  {/* Vinyl Grooves Effect */}
                  <div className="absolute inset-0 rounded-full border-[40px] border-black/10 scale-[1.3] opacity-30 pointer-events-none"></div>

                  {/* Format Badge */}
                  <div className="absolute bottom-3 left-3 px-3 py-1 bg-black/80 backdrop-blur-md border border-white/20 text-white text-xs font-bold rounded-full uppercase tracking-wider">
                    {release.format}
                  </div>
                </div>

                {/* Release Info */}
                <div className="flex flex-col justify-between">
                  {/* Header */}
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-xs text-blue-400 font-bold uppercase tracking-wider mb-1">
                          {release.catalog} • {release.releaseDate}
                        </p>
                        <h3 className="text-3xl font-[Bebas_Neue] text-white mb-1 tracking-wide group-hover:text-blue-400 transition-colors">
                          {release.title}
                        </h3>
                        <p className="text-lg text-gray-300 font-mono">{release.artist}</p>
                      </div>
                    </div>

                    {/* Genre & Label */}
                    <div className="flex items-center gap-4 mb-4 pb-4 border-b border-white/10">
                      <div>
                        <span className="text-xs text-gray-500 uppercase tracking-wider">Género</span>
                        <p className="text-sm text-white font-mono">{release.genre}</p>
                      </div>
                      <div className="w-px h-8 bg-white/10"></div>
                      <div>
                        <span className="text-xs text-gray-500 uppercase tracking-wider">Label</span>
                        <p className="text-sm text-white font-mono">{release.label}</p>
                      </div>
                    </div>

                    {/* Tracklist */}
                    <div className="mb-4">
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 block">
                        Tracklist
                      </span>
                      <div className="space-y-2">
                        {release.tracks.map((track, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group/track cursor-pointer"
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-xs text-gray-500 font-mono w-6">
                                {String(idx + 1).padStart(2, '0')}
                              </span>
                              <Music size={12} className="text-blue-500 opacity-0 group-hover/track:opacity-100 transition-opacity" />
                              <span className="text-sm text-gray-300 group-hover/track:text-white transition-colors">
                                {track.name}
                              </span>
                            </div>
                            <span className="text-xs text-gray-500 font-mono">{track.duration}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Footer Actions */}
                  <div className="border-t border-white/10 pt-4 mt-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-xs text-gray-500 uppercase tracking-wider">Precio</span>
                        <p className="text-3xl font-bold text-white">{release.price}</p>
                        <span className={`text-xs font-bold uppercase tracking-wider mt-1 inline-block ${
                          release.stock.includes('Limited') ? 'text-orange-500' :
                          release.stock === 'In Stock' ? 'text-green-500' :
                          release.stock === 'Coming Soon' ? 'text-blue-500' :
                          release.stock === 'Pre-Order' ? 'text-yellow-500' :
                          'text-purple-500'
                        }`}>
                          {release.stock}
                        </span>
                      </div>

                      {/* Action Icons */}
                      <div className="flex items-center gap-2">
                        <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-blue-500/50 transition-colors">
                          <Heart size={16} className="text-gray-400 hover:text-red-500" />
                        </button>
                        <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-blue-500/50 transition-colors">
                          <Share2 size={16} className="text-gray-400 hover:text-blue-500" />
                        </button>
                        <button className="px-6 py-3 bg-blue-600 text-white font-bold text-sm tracking-widest rounded-lg hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(0,123,255,0.5)] transition-all flex items-center gap-2">
                          <Download size={16} />
                          COMPRAR
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Gradient Accent */}
              <div className={`absolute left-0 top-0 w-1 h-full bg-gradient-to-b ${release.color} opacity-0 group-hover:opacity-100 transition-opacity`}></div>
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
          <Music className="w-12 h-12 mx-auto mb-4 text-blue-500" />
          <h3 className="text-4xl font-[Bebas_Neue] text-white mb-4 tracking-wide">
            SUSCRÍBETE A NUEVOS LANZAMIENTOS
          </h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Recibe notificaciones de pre-orders, lanzamientos exclusivos y ofertas especiales directamente en tu email.
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
