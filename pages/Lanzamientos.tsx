import { Footer } from '../components/shared/Footer';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Disc,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Music,
  Download,
  Share2,
  Heart,
  Search,
  HelpCircle,
  ChevronRight,
  ChevronDown
} from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
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

// =======================
// LANZAMIENTOS
// =======================

const LANZAMIENTOS_DJ = [
  {
    id: 1,
    title: 'Acid Dreams Vol. 1',
    artist: 'NEON PULSE',
    label: 'RAGE VENTURE',
    format: 'Vinyl + Digital',
    catalog: 'RV001',
    releaseDate: 'NOV 2024',
    genre: 'Acid Techno',
    tracks: [
      { name: '303 Paradise', duration: '6:42' },
      { name: 'Bass Sequence', duration: '7:15' },
      { name: 'Liquid Acid', duration: '6:28' },
      { name: 'Machine Love', duration: '8:03' }
    ],
    cover: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=800&q=80',
    color: 'from-red-500 to-orange-500',
    price: '€14.99',
    stock: 'Limited to 300 copies'
  },
  {
    id: 2,
    title: 'Deep Dive Sessions',
    artist: 'VOID WALKER',
    label: 'RAGE VENTURE',
    format: 'Vinyl + Digital',
    catalog: 'RV002',
    releaseDate: 'DIC 2024',
    genre: 'Deep House',
    tracks: [
      { name: 'Underwater', duration: '7:22' },
      { name: 'Ocean Floor', duration: '6:55' },
      { name: 'Pressure', duration: '7:40' },
      { name: 'Abyss Calling', duration: '8:12' }
    ],
    cover: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80',
    color: 'from-blue-500 to-cyan-500',
    price: '€14.99',
    stock: 'In Stock'
  },
  {
    id: 3,
    title: 'Warehouse Anthems',
    artist: 'CYBER DUST',
    label: 'RAGE VENTURE',
    format: 'Vinyl + Digital',
    catalog: 'RV003',
    releaseDate: 'DIC 2024',
    genre: 'Hard Techno',
    tracks: [
      { name: 'Industrial Complex', duration: '6:33' },
      { name: 'Steel Heart', duration: '7:08' },
      { name: 'Concrete Jungle', duration: '6:47' },
      { name: 'Factory Reset', duration: '7:55' }
    ],
    cover: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80',
    color: 'from-gray-500 to-gray-700',
    price: '€14.99',
    stock: 'Pre-Order'
  },
  {
    id: 4,
    title: 'Cosmic Journey EP',
    artist: 'ASTRAL ECHO',
    label: 'RAGE VENTURE',
    format: 'Digital Only',
    catalog: 'RVD001',
    releaseDate: 'ENE 2025',
    genre: 'Melodic Techno',
    tracks: [
      { name: 'Stellar Wind', duration: '8:15' },
      { name: 'Nebula Dreams', duration: '7:45' },
      { name: 'Galaxy Drift', duration: '9:22' }
    ],
    cover: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
    color: 'from-purple-500 to-pink-500',
    price: '€9.99',
    stock: 'Digital'
  },
  {
    id: 5,
    title: 'Breakbeat Chronicles',
    artist: 'THE DIGGER',
    label: 'RAGE VENTURE',
    format: 'Vinyl + Digital',
    catalog: 'RV004',
    releaseDate: 'ENE 2025',
    genre: 'Breaks • Jungle',
    tracks: [
      { name: 'Amen Scientist', duration: '5:47' },
      { name: 'Break The System', duration: '6:12' },
      { name: 'Jungle Warfare', duration: '5:55' },
      { name: 'Breakbeat Theory', duration: '6:28' }
    ],
    cover: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=80',
    color: 'from-green-500 to-emerald-500',
    price: '€14.99',
    stock: 'Coming Soon'
  },
  {
    id: 6,
    title: 'Detroit Chronicles',
    artist: 'VINYL MASTER',
    label: 'RAGE VENTURE',
    format: 'Vinyl + Digital',
    catalog: 'RV005',
    releaseDate: 'FEB 2025',
    genre: 'Detroit Techno',
    tracks: [
      { name: 'Motor City Lights', duration: '7:33' },
      { name: 'Analog Soul', duration: '6:58' },
      { name: 'Urban Pulse', duration: '7:12' },
      { name: 'Midnight Drive', duration: '8:45' }
    ],
    cover: 'https://images.unsplash.com/photo-1598387846820-edcfdfac5c8e?w=800&q=80',
    color: 'from-yellow-500 to-red-500',
    price: '€14.99',
    stock: 'Limited to 500 copies'
  }
];

// =======================
// FAQ DATA
// =======================

const FAQ_ARTICLES = [
  {
    id: 'formatos',
    category: 'Formatos & compras',
    question: '¿En qué formatos se publican los lanzamientos de RAGE VENTURE?',
    answer:
      'La mayoría de releases salen en vinilo de 12", con código de descarga digital incluido. Algunos EPs son solo digitales y se especifica como “Digital Only” en la ficha.',
    updated: '10 Ene 2025',
    likes: 7
  },
  {
    id: 'preorder',
    category: 'Formatos & compras',
    question: '¿Cómo funciona un pre-order?',
    answer:
      'Cuando marcas un lanzamiento como pre-order se te reserva una copia. El cobro se realiza al momento de la compra y el envío se hace en cuanto llegue el stock a nuestro almacén.',
    updated: '12 Ene 2025',
    likes: 5
  },
  {
    id: 'envios',
    category: 'Envíos & entregas',
    question: '¿A qué países realizan envíos de vinilos?',
    answer:
      'Enviamos a toda Europa, Latinoamérica y Norteamérica a través de correo certificado. Las tarifas se calculan automáticamente según peso y destino en el checkout.',
    updated: '15 Ene 2025',
    likes: 9
  },
  {
    id: 'tiempos-envio',
    category: 'Envíos & entregas',
    question: '¿Cuánto tarda en llegar mi pedido?',
    answer:
      'Dentro de España peninsular suele tardar entre 2 y 4 días laborables. Europa: 5-8 días. Resto del mundo: 10-20 días según el operador local.',
    updated: '18 Ene 2025',
    likes: 4
  },
  {
    id: 'digital',
    category: 'Descargas digitales',
    question: 'He comprado vinilo + digital, ¿dónde descargo los archivos?',
    answer:
      'Al completar tu compra recibirás un email con un enlace único a tu carpeta de descargas en WAV/MP3. También podrás acceder desde tu área de usuario.',
    updated: '20 Ene 2025',
    likes: 11
  },
  {
    id: 'formatos-audio',
    category: 'Descargas digitales',
    question: '¿Qué formatos de audio ofrecéis?',
    answer:
      'Por defecto ofrecemos WAV 16-bit y MP3 320 kbps. En algunos releases especiales añadimos FLAC sin coste extra.',
    updated: '22 Ene 2025',
    likes: 6
  },
  {
    id: 'stock',
    category: 'Stock & re-press',
    question: 'El vinilo que quiero está agotado, ¿haréis re-press?',
    answer:
      'Cuando un release se agota, estudiamos un posible re-press según la demanda. Puedes activar la opción “Avisarme si vuelve” en la página del lanzamiento.',
    updated: '25 Ene 2025',
    likes: 3
  },
  {
    id: 'devoluciones',
    category: 'Stock & re-press',
    question: '¿Qué ocurre si mi vinilo llega dañado?',
    answer:
      'Si tu copia llega con daños de fábrica o en el transporte, escríbenos en un plazo máximo de 7 días con fotos del problema y tramitamos reemplazo o reembolso.',
    updated: '27 Ene 2025',
    likes: 8
  }
];

const FAQ_CATEGORY_CARDS = [
  {
    id: 'general',
    category: 'Formatos & compras',
    title: 'GENERAL & FORMATO',
    subtitle: 'Formatos, pre-orders y pagos',
    image: 'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?w=900&q=80'
  },
  {
    id: 'tickets',
    category: 'Envíos & entregas',
    title: 'ENVÍOS',
    subtitle: 'Tarifas, países y tiempos',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=900&q=80'
  },
  {
    id: 'packages',
    category: 'Descargas digitales',
    title: 'DESCARGAS',
    subtitle: 'Códigos y formatos de audio',
    image: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=900&q=80'
  },
  {
    id: 'stock',
    category: 'Stock & re-press',
    title: 'STOCK & RE-PRESS',
    subtitle: 'Agotados, re-ediciones y daños',
    image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=900&q=80'
  }
];

export const Lanzamientos: React.FC = () => {
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [selectedRelease, setSelectedRelease] = useState<number>(LANZAMIENTOS_DJ[0].id);

  // FAQ state
  const [faqMode, setFaqMode] = useState<'overview' | 'search'>('overview');
  const [faqQuery, setFaqQuery] = useState('');
  const [faqActiveCategory, setFaqActiveCategory] = useState<string>('Todas las categorías');

  const handlePlay = (id: number) => {
    setPlayingId(playingId === id ? null : id);
  };

  // ---- FAQ helpers ----
  const allCategories = Array.from(new Set(FAQ_ARTICLES.map((a) => a.category)));
  const categoryCounts: Record<string, number> = {};
  FAQ_ARTICLES.forEach((a) => {
    categoryCounts[a.category] = (categoryCounts[a.category] || 0) + 1;
  });

  const normalizedQuery = faqQuery.trim().toLowerCase();

  const filteredFaqArticles = FAQ_ARTICLES.filter((article) => {
    const matchesCategory =
      faqActiveCategory === 'Todas las categorías' || article.category === faqActiveCategory;

    const matchesQuery =
      !normalizedQuery ||
      article.question.toLowerCase().includes(normalizedQuery) ||
      article.answer.toLowerCase().includes(normalizedQuery);

    return matchesCategory && matchesQuery;
  });

  const handleFaqSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFaqMode('search');
    setFaqActiveCategory('Todas las categorías');
  };

  const featuredRelease =
    LANZAMIENTOS_DJ.find((r) => r.id === selectedRelease) ?? LANZAMIENTOS_DJ[0];

  // Solo 2 filas (4 cards). Cambia 4 por el número que quieras mostrar.
  const VISIBLE_RELEASES = LANZAMIENTOS_DJ.slice(0, 4);

  return (
    <main className="w-full relative z-10 overflow-hidden min-h-screen pt-32 pb-20">
      {/* =========================
          HERO CON VIDEO DE FONDO
          Ahora dentro de .panel y sin w-screen ni transforms
          ========================= */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="panel relative h-[70vh] md:h-[80vh] max-h-[820px] mb-16 overflow-hidden border-b border-white/10"
      >
        {/* Video de fondo (cambia la ruta al tuyo) */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="./assets/generated2.mp4" type="video/mp4" />
        </video>

        {/* Capa para legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/60 to-black/90" />

        {/* Contenido */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0, rotate: 0 }}
            animate={{ scale: 1, opacity: 1, rotate: 360 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="mb-6"
          >
            <div className="w-20 h-20 rounded-full border border-white/30 flex items-center justify-center bg-black/30 backdrop-blur-md">
              <Disc className="w-10 h-10 text-blue-400" />
            </div>
          </motion.div>

          <span className="uppercase tracking-[0.35em] text-[11px] text-blue-300 mb-3">
            CATÁLOGO DISCOGRÁFICO
          </span>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-[Bebas_Neue] tracking-[0.25em] text-white mb-4">
            LANZAMIENTOS
          </h1>

          <p className="text-sm md:text-lg text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Descubre nuestra colección de vinilos y lanzamientos digitales. Música electrónica de
            calidad desde acid techno hasta melodic house.
          </p>

          <div className="mt-10 md:mt-16 flex flex-wrap justify-center gap-8 md:gap-12">
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-blue-400 mb-1">24+</p>
              <p className="text-[11px] md:text-xs text-gray-200 uppercase tracking-[0.25em]">
                Releases
              </p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-purple-400 mb-1">12</p>
              <p className="text-[11px] md:text-xs text-gray-200 uppercase tracking-[0.25em]">
                Artistas
              </p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-emerald-400 mb-1">8</p>
              <p className="text-[11px] md:text-xs text-gray-200 uppercase tracking-[0.25em]">
                Géneros
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* =========================
          FEATURED RELEASE
          ========================= */}
      <motion.section
        className="panel mb-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="bg-black/40 border border-white/10 rounded-3xl backdrop-blur-xl p-6 md:p-8 lg:p-10 max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-stretch">
            {/* Portada grande */}
            <div className="relative w-full md:w-72 lg:w-80 aspect-square rounded-2xl overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.6)]">
              <img
                src={featuredRelease.cover}
                alt={featuredRelease.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-black/20 to-transparent" />
              <button
                onClick={() => handlePlay(featuredRelease.id)}
                className="absolute bottom-4 left-4 px-4 py-2 rounded-full bg-white text-black text-xs font-semibold tracking-[0.18em] flex items-center gap-2 hover:scale-105 transition-transform"
              >
                {playingId === featuredRelease.id ? (
                  <>
                    <Pause size={14} />
                    <span>PAUSAR PREVIEW</span>
                  </>
                ) : (
                  <>
                    <Play size={14} className="ml-[2px]" />
                    <span>ESCUCHAR PREVIEW</span>
                  </>
                )}
              </button>
              <span className="absolute top-4 left-4 text-[10px] uppercase tracking-[0.22em] bg-black/70 border border-white/20 rounded-full px-3 py-1 text-gray-100">
                Álbum destacado
              </span>
            </div>

            {/* Info + mini player */}
            <div className="flex-1 flex flex-col justify-between gap-6">
              <div>
                <p className="text-xs text-blue-300 uppercase tracking-[0.25em] mb-2">
                  {featuredRelease.catalog} • {featuredRelease.releaseDate}
                </p>
                <h2 className="text-3xl md:text-4xl font-[Bebas_Neue] tracking-[0.2em] text-white mb-1">
                  {featuredRelease.title}
                </h2>
                <p className="text-lg text-gray-200 font-mono mb-4">{featuredRelease.artist}</p>

                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <span className="text-xs text-gray-400 uppercase tracking-[0.22em]">
                    {featuredRelease.genre}
                  </span>
                  <span className="w-px h-5 bg-white/20" />
                  <span className="text-xs text-gray-400 uppercase tracking-[0.22em]">
                    {featuredRelease.label}
                  </span>
                  <span className="w-px h-5 bg-white/20" />
                  <span className="text-xs text-emerald-400 font-semibold uppercase tracking-[0.22em]">
                    {featuredRelease.format}
                  </span>
                </div>

                <div>
                  <p className="text-[11px] text-gray-400 uppercase tracking-[0.22em] mb-2">
                    PRIMEROS TRACKS
                  </p>
                  <div className="space-y-1.5">
                    {featuredRelease.tracks.slice(0, 3).map((track, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-[11px] text-gray-400 font-mono w-6">
                            {String(idx + 1).padStart(2, '0')}
                          </span>
                          <span className="text-sm text-gray-100">{track.name}</span>
                        </div>
                        <span className="text-[11px] text-gray-400 font-mono">{track.duration}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10 pt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center gap-3">
                  <button className="w-9 h-9 rounded-full border border-white/20 bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                    <SkipBack size={16} className="text-gray-200" />
                  </button>
                  <button
                    onClick={() => handlePlay(featuredRelease.id)}
                    className="w-11 h-11 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform shadow-[0_0_25px_rgba(255,255,255,0.4)]"
                  >
                    {playingId === featuredRelease.id ? (
                      <Pause size={18} fill="currentColor" />
                    ) : (
                      <Play size={18} fill="currentColor" className="ml-[2px]" />
                    )}
                  </button>
                  <button className="w-9 h-9 rounded-full border border-white/20 bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                    <SkipForward size={16} className="text-gray-200" />
                  </button>

                  <div className="ml-3 h-[3px] w-40 md:w-56 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full w-1/3 bg-blue-500" />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button className="w-9 h-9 rounded-full bg-white/5 border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors">
                    <Heart size={15} className="text-gray-300" />
                  </button>
                  <button className="w-9 h-9 rounded-full bg-white/5 border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors">
                    <Share2 size={15} className="text-gray-300" />
                  </button>
                  <button className="px-6 py-2.5 rounded-full bg-blue-600 text-white text-xs font-bold tracking-[0.22em] hover:bg-blue-500 transition-colors flex items-center gap-2">
                    <Download size={14} />
                    COMPRAR VINILO / DIGITAL
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* =========================
          GRID DE LANZAMIENTOS (solo 2 filas = 4 cards)
          ========================= */}
      <motion.section
        className="panel"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {VISIBLE_RELEASES.map((release) => {
            const isSelected = selectedRelease === release.id;
            return (
              <motion.div
                key={release.id}
                variants={cardVariant}
                onClick={() => setSelectedRelease(release.id)}
                className={`group relative bg-black/40 backdrop-blur-md border rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer
                  ${
                    isSelected
                      ? 'border-blue-500/70 shadow-[0_0_40px_rgba(56,189,248,0.45)] scale-[1.01]'
                      : 'border-white/10 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(37,99,235,0.4)]'
                  }`}
              >
                <div className="grid md:grid-cols-[280px_1fr] gap-6 p-6">
                  <div className="relative aspect-square rounded-xl overflow-hidden shadow-2xl">
                    <img
                      src={release.cover}
                      alt={release.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${release.color} opacity-20 mix-blend-overlay`}
                    ></div>

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 backdrop-blur-sm">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePlay(release.id);
                        }}
                        className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.35)]"
                      >
                        {playingId === release.id ? (
                          <Pause fill="currentColor" size={26} />
                        ) : (
                          <Play fill="currentColor" size={26} className="ml-[2px]" />
                        )}
                      </button>
                    </div>

                    <div className="absolute inset-0 rounded-full border-[40px] border-black/10 scale-[1.3] opacity-30 pointer-events-none" />

                    <div className="absolute bottom-3 left-3 px-3 py-1 bg-black/80 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold rounded-full uppercase tracking-[0.18em]">
                      {release.format}
                    </div>
                  </div>

                  <div className="flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <p className="text-[11px] text-blue-300 font-bold uppercase tracking-[0.25em] mb-1">
                            {release.catalog} • {release.releaseDate}
                          </p>
                          <h3 className="text-3xl font-[Bebas_Neue] text-white mb-1 tracking-[0.2em] group-hover:text-blue-400 transition-colors">
                            {release.title}
                          </h3>
                          <p className="text-base text-gray-200 font-mono">{release.artist}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 mb-4 pb-4 border-b border-white/10">
                        <div>
                          <span className="text-[11px] text-gray-500 uppercase tracking-[0.2em]">
                            Género
                          </span>
                          <p className="text-sm text-white font-mono">{release.genre}</p>
                        </div>
                        <div className="w-px h-8 bg-white/10" />
                        <div>
                          <span className="text-[11px] text-gray-500 uppercase tracking-[0.2em]">
                            Label
                          </span>
                          <p className="text-sm text-white font-mono">{release.label}</p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <span className="text-[11px] font-bold text-gray-500 uppercase tracking-[0.22em] mb-3 block">
                          Tracklist
                        </span>
                        <div className="space-y-2">
                          {release.tracks.map((track, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group/track"
                            >
                              <div className="flex items-center gap-3">
                                <span className="text-[11px] text-gray-500 font-mono w-6">
                                  {String(idx + 1).padStart(2, '0')}
                                </span>
                                <Music
                                  size={12}
                                  className="text-blue-500 opacity-0 group-hover/track:opacity-100 transition-opacity"
                                />
                                <span className="text-sm text-gray-300 group-hover/track:text-white transition-colors">
                                  {track.name}
                                </span>
                              </div>
                              <span className="text-[11px] text-gray-500 font-mono">
                                {track.duration}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-white/10 pt-4 mt-2 flex items-center justify-between">
                      <div>
                        <span className="text-[11px] text-gray-500 uppercase tracking-[0.22em]">
                          Precio
                        </span>
                        <p className="text-3xl font-bold text-white">{release.price}</p>
                        <span
                          className={`text-[11px] font-bold uppercase tracking-[0.22em] mt-1 inline-block ${
                            release.stock.includes('Limited')
                              ? 'text-orange-400'
                              : release.stock === 'In Stock'
                              ? 'text-emerald-400'
                              : release.stock === 'Coming Soon'
                              ? 'text-blue-400'
                              : release.stock === 'Pre-Order'
                              ? 'text-yellow-400'
                              : 'text-purple-400'
                          }`}
                        >
                          {release.stock}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-blue-500/50 transition-colors">
                          <Heart size={15} className="text-gray-400 hover:text-red-500" />
                        </button>
                        <button className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-blue-500/50 transition-colors">
                          <Share2 size={15} className="text-gray-400 hover:text-blue-500" />
                        </button>
                        <button className="px-6 py-3 bg-blue-600 text-white font-bold text-xs tracking-[0.22em] rounded-lg hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(0,123,255,0.5)] transition-all flex items-center gap-2">
                          <Download size={15} />
                          COMPRAR
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className={`absolute left-0 top-0 w-1 h-full bg-gradient-to-b ${release.color} opacity-0 group-hover:opacity-100 transition-opacity`}
                ></div>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* Newsletter */}
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
            Recibe notificaciones de pre-orders, lanzamientos exclusivos y ofertas especiales
            directamente en tu email.
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

      {/* STORYTELLING RAGE VENTURE */}
      <motion.section
        className="mt-24 w-full"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="uppercase tracking-[0.3em] text-[11px] text-blue-300">
              RAGE VENTURE RECORDS
            </span>
            <h2 className="mt-3 text-4xl md:text-5xl font-[Bebas_Neue] tracking-[0.18em] text-white">
              DONDE NACE EL SONIDO
            </h2>
            <p className="mt-3 text-sm md:text-base text-gray-300 max-w-2xl mx-auto">
              Un sello construido alrededor del estudio, los clubs y las historias nocturnas. Cada
              lanzamiento es un fragmento de la ciudad, prensado en vinilo.
            </p>
          </div>

          <div className="space-y-10">
            <div className="grid md:grid-cols-2 gap-0 rounded-3xl overflow-hidden bg-black/40 border border-white/10 backdrop-blur-xl">
              <div className="p-8 lg:p-10 flex flex-col justify-center">
                <p className="text-[11px] uppercase tracking-[0.25em] text-blue-300 mb-2">
                  EL ESTUDIO
                </p>
                <h3 className="text-2xl md:text-3xl font-[Bebas_Neue] tracking-[0.18em] text-white mb-3">
                  DONDE LA MAGIA PASA
                </h3>
                <p className="text-sm md:text-base text-gray-300 mb-4">
                  El estudio de RAGE VENTURE está pensado como un laboratorio de club music: mesas
                  analógicas, cajas de ritmos, sintetizadores modulares y una pared de vinilos que
                  se convierten en referencia constante.
                </p>
                <p className="text-sm text-gray-400 mb-6">
                  Aquí se graban sesiones en directo, se masterizan releases y se preparan los lives
                  que luego se llevan a los escenarios de Europa y Latinoamérica.
                </p>
                <button className="inline-flex items-center justify-center px-6 py-2 rounded-full border border-white/40 text-[11px] font-semibold tracking-[0.22em] text-white hover:bg-white/10 transition-colors">
                  CONOCER EL ESTUDIO
                </button>
              </div>
              <div className="relative h-64 md:h-full">
                <img
                  src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&q=80"
                  alt="Estudio Rage Venture"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-0 rounded-3xl overflow-hidden bg-black/70 border border-white/10 backdrop-blur-xl">
              <div className="relative h-64 md:h-full order-1 md:order-none">
                <img
                  src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=1200&q=80"
                  alt="Vinilos y público"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 lg:p-10 flex flex-col justify-center order-2 md:order-none">
                <p className="text-[11px] uppercase tracking-[0.25em] text-emerald-300 mb-2">
                  CLUBS & VINILO
                </p>
                <h3 className="text-2xl md:text-3xl font-[Bebas_Neue] tracking-[0.18em] text-white mb-3">
                  DEL ESTUDIO A LA PISTA
                </h3>
                <p className="text-sm md:text-base text-gray-300 mb-4">
                  Los releases de RAGE VENTURE están pensados para sonar fuerte en sistemas de club:
                  bajos pesados, estructura DJ-friendly y masters listos para quemar altavoces.
                </p>
                <p className="text-sm text-gray-400 mb-6">
                  Trabajamos con tiradas limitadas en vinilo que se agotan rápido. Cada copia es un
                  objeto de colección, numerado y preparado para DJs que quieren algo diferente en
                  su maleta.
                </p>
                <button className="inline-flex items-center justify-center px-6 py-2 rounded-full border border-white/40 text-[11px] font-semibold tracking-[0.22em] text-white hover:bg-white/10 transition-colors">
                  VER FILOSOFÍA DEL SELLO
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* FAQ */}
      <motion.section
        className="mt-24 w-full"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-3">
              <HelpCircle className="w-7 h-7 text-blue-400" />
              <span className="uppercase tracking-[0.3em] text-xs text-blue-300">
                Centro de ayuda
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-[Bebas_Neue] text-white tracking-[0.18em] mb-3">
              PREGUNTAS FRECUENTES
            </h2>
            <p className="text-sm md:text-base text-gray-300 max-w-2xl mx-auto">
              Encuentra información rápida sobre formatos, envíos, descargas digitales y stock de
              nuestros lanzamientos.
            </p>
          </div>

          <form onSubmit={handleFaqSubmit} className="max-w-3xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                value={faqQuery}
                onChange={(e) => setFaqQuery(e.target.value)}
                placeholder="Busca palabras como “vinilo”, “envío”, “descarga”..."
                className="w-full pl-11 pr-32 py-3 md:py-4 rounded-full bg-black/40 border border-white/20 text-sm md:text-base text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 transition-all"
              />
              <button
                type="submit"
                className="absolute right-1 top-1/2 -translate-y-1/2 px-4 md:px-6 py-1.5 md:py-2 rounded-full bg-blue-600 text-xs md:text-sm font-bold tracking-widest text-white hover:bg-blue-500 transition-colors"
              >
                BUSCAR
              </button>
            </div>
            {faqMode === 'search' && (
              <div className="flex items-center justify-between mt-3 text-xs md:text-[13px] text-gray-400">
                <span>
                  {filteredFaqArticles.length} resultado
                  {filteredFaqArticles.length !== 1 && 's'} para “{faqQuery || 'todas las preguntas'}
                  ”
                </span>
                <button
                  type="button"
                  className="underline hover:text-blue-300"
                  onClick={() => {
                    setFaqMode('overview');
                    setFaqQuery('');
                    setFaqActiveCategory('Todas las categorías');
                  }}
                >
                  Volver a la vista general
                </button>
              </div>
            )}
          </form>

          {faqMode === 'overview' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
              {FAQ_CATEGORY_CARDS.map((card) => (
                <button
                  key={card.id}
                  type="button"
                  onClick={() => {
                    setFaqMode('search');
                    setFaqActiveCategory(card.category);
                    setFaqQuery('');
                  }}
                  className="group relative rounded-xl overflow-hidden border border-white/10 bg-black/40 hover:border-blue-500/60 transition-all shadow-lg"
                >
                  <div className="relative h-40">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4 text-left">
                      <p className="text-[11px] uppercase tracking-[0.25em] text-blue-300 mb-1">
                        {card.category}
                      </p>
                      <h3 className="text-lg font-[Bebas_Neue] tracking-[0.18em] text-white">
                        {card.title}
                      </h3>
                      <p className="text-[11px] text-gray-300">{card.subtitle}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between px-4 py-3 bg-black/60 border-t border-white/10 text-xs text-gray-300">
                    <span>Ver artículos</span>
                    <ChevronRight className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              ))}
            </div>
          )}

          {faqMode === 'search' && (
            <div className="mt-10 grid lg:grid-cols-[260px,1fr] gap-8">
              <div className="bg-black/40 border border-white/15 rounded-2xl overflow-hidden">
                <div className="px-4 py-3 border-b border-white/10 flex items-center gap-2">
                  <ChevronDown className="w-4 h-4 text-blue-300" />
                  <span className="text-xs font-semibold uppercase tracking-widest text-gray-300">
                    POR CATEGORÍA
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setFaqActiveCategory('Todas las categorías')}
                  className={`w-full flex items-center justify-between px-4 py-3 text-xs border-b border-white/10 text-left ${
                    faqActiveCategory === 'Todas las categorías'
                      ? 'bg-blue-600/80 text-white'
                      : 'bg-transparent text-gray-300 hover:bg-white/5'
                  }`}
                >
                  <span>Todas las categorías</span>
                  <span className="text-[11px] opacity-80">{FAQ_ARTICLES.length}</span>
                </button>
                {allCategories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setFaqActiveCategory(cat)}
                    className={`w-full flex items-center justify-between px-4 py-3 text-xs border-b border-white/5 text-left ${
                      faqActiveCategory === cat
                        ? 'bg-blue-600/80 text-white'
                        : 'bg-transparent text-gray-300 hover:bg-white/5'
                    }`}
                  >
                    <span>{cat}</span>
                    <span className="text-[11px] opacity-80">{categoryCounts[cat] || 0}</span>
                  </button>
                ))}
              </div>

              <div className="bg-black/40 border border-white/15 rounded-2xl p-5 md:p-6">
                <p className="text-xs md:text-[13px] text-gray-400 mb-4">
                  {filteredFaqArticles.length} artículo
                  {filteredFaqArticles.length !== 1 && 's'} encontrados en{' '}
                  {faqActiveCategory === 'Todas las categorías'
                    ? 'todas las categorías'
                    : faqActiveCategory}
                  .
                </p>

                <div className="space-y-5">
                  {filteredFaqArticles.map((article) => (
                    <div
                      key={article.id}
                      className="border-b border-white/10 pb-4 last:border-b-0 last:pb-0"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-sm md:text-base font-semibold text-white mb-1">
                            {article.question}
                          </h3>
                          <p className="text-xs md:text-[13px] text-gray-300 mb-2">
                            {article.answer}
                          </p>
                          <div className="flex flex-wrap items-center gap-3 text-[11px] text-gray-400">
                            <span className="uppercase tracking-widest text-blue-300">
                              {article.category}
                            </span>
                            <span>•</span>
                            <span>Actualizado: {article.updated}</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <button className="flex items-center gap-1 text-[11px] text-gray-400 hover:text-pink-400 transition-colors">
                            <Heart size={12} className="fill-pink-500/50 text-pink-400" />
                            <span>{article.likes}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {filteredFaqArticles.length === 0 && (
                    <p className="text-xs md:text-sm text-gray-400">
                      No encontramos resultados para esa búsqueda. Prueba con otras palabras o
                      vuelve a la vista general.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.section>

      <Footer />
    </main>
  );
};
