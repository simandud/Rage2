import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Disc, Headphones, Music, Radio, Speaker, Check, Star } from 'lucide-react';
import { Footer } from '../components/shared/Footer';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 }
  }
};

const cardVariant = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
};

/* 🔥 CARRUSEL HERO (FONDO + FRASE FIJA) */
const HERO_SLIDES = [
  {
    id: 1,
    image: './assets/2.1meet2go.png'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1600&q=80'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1518976024611-28bf4b48222e?w=1600&q=80'
  },
  {
    id: 4,
    image: './assets/logoragevee.png'
  }
];

// Fictional DJ Equipment for Rental
const EQUIPMENT_RENTAL = [
  {
    id: 1,
    name: "Technics SL-1200MK7",
    category: "Tornamesas",
    icon: Disc,
    description: "El clásico definitivo para DJs profesionales. Motor directo, pitch ajustable ±8/±16%, construcción robusta.",
    specs: ["Motor Directo", "Pitch ±8/±16%", "Reverse Mode", "Target Light"],
    price: "€45/día",
    weekPrice: "€250/semana",
    image: "./assets/IMG_2241.DNG",
    rating: 5,
    available: true
  },
  {
    id: 2,
    name: "Pioneer DJ DJM-900NXS2",
    category: "Mezcladores",
    icon: Radio,
    description: "Mezclador profesional de 4 canales con filtros de sonido avanzados y efectos incorporados.",
    specs: ["4 Canales", "32-bit/96kHz", "Beat FX", "Sound Color FX"],
    price: "€60/día",
    weekPrice: "€350/semana",
    image: "./assets/IMG_2235.DNG",
    rating: 5,
    available: true
  },
  {
    id: 3,
    name: "Allen & Heath XONE:96",
    category: "Mezcladores",
    icon: Radio,
    description: "Mezclador analógico premium con 6 canales y filtros legendarios VCF.",
    specs: ["6 Canales", "Dual VCF Filters", "Scene Memory", "XLR Outputs"],
    price: "€70/día",
    weekPrice: "€400/semana",
    image: "./assets/IMG_2237.DNG",
    rating: 5,
    available: true
  },
  {
    id: 4,
    name: "Sennheiser HD 25",
    category: "Auriculares",
    icon: Headphones,
    description: "Auriculares de monitoreo profesional, cerrados, diseño dividido para DJ.",
    specs: ["Impedancia 70Ω", "Aislamiento Superior", "Cable Espiral", "Ultraligeros"],
    price: "€10/día",
    weekPrice: "€50/semana",
    image: "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=800&q=80",
    rating: 5,
    available: true
  },
  {
    id: 5,
    name: "Rane Seventy-Two MKII",
    category: "Mezcladores",
    icon: Radio,
    description: "Mezclador battle de 2 canales con pantalla táctil y MAG FOUR faders sin contacto.",
    specs: ["2 Canales", "Touchscreen", "MAG FOUR Faders", "Serato DVS"],
    price: "€65/día",
    weekPrice: "€380/semana",
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&q=80",
    rating: 5,
    available: false
  },
  {
    id: 6,
    name: "KRK Rokit RP8 G4 (Par)",
    category: "Monitores",
    icon: Speaker,
    description: "Monitores de estudio activos de 8 pulgadas con DSP integrado y respuesta plana.",
    specs: ["Woofer 8\"", "Bi-Amplificado", "DSP Gráfico", "Room Correction"],
    price: "€35/día",
    weekPrice: "€200/semana",
    image: "https://images.unsplash.com/photo-1545486332-9e0999c535b2?w=800&q=80",
    rating: 4,
    available: true
  },
  {
    id: 7,
    name: "Native Instruments Traktor Kontrol S4",
    category: "Controladores",
    icon: Music,
    description: "Controlador DJ de 4 canales all-in-one con jog wheels de alta resolución.",
    specs: ["4 Canales", "Jog Wheels HD", "Mixer Haptic", "Traktor Pro 3"],
    price: "€50/día",
    weekPrice: "€280/semana",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80",
    rating: 4,
    available: true
  },
  {
    id: 8,
    name: "Ortofon Concorde DJ S (Par)",
    category: "Cápsulas",
    icon: Disc,
    description: "Agujas profesionales para scratch y mezcla, salida alta y tracking excelente.",
    specs: ["Salida 6mV", "Tracking Force 4g", "Scratch Ready", "Stylus Esférico"],
    price: "€15/día",
    weekPrice: "€80/semana",
    image: "https://images.unsplash.com/photo-1619432168937-a4c6f36f5b60?w=800&q=80",
    rating: 5,
    available: true
  },
  {
    id: 9,
    name: "Roland TR-8S Rhythm Performer",
    category: "Drum Machines",
    icon: Radio,
    description: "Caja de ritmos con samples de las clásicas TR de Roland y capacidad de importar samples.",
    specs: ["16 Tracks", "Sample Import", "TR Sound Engine", "Step Sequencer"],
    price: "€40/día",
    weekPrice: "€230/semana",
    image: "https://images.unsplash.com/photo-1563330232-57114bb0823c?w=800&q=80",
    rating: 5,
    available: true
  }
];

export const Alquiler: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [currentSlide, setCurrentSlide] = useState(0);

  const categories = ["Todos", "Tornamesas", "Mezcladores", "Auriculares", "Monitores", "Controladores", "Cápsulas", "Drum Machines"];

  const filteredEquipment =
    selectedCategory === "Todos"
      ? EQUIPMENT_RENTAL
      : EQUIPMENT_RENTAL.filter(item => item.category === selectedCategory);

  /* ⏱️ AUTO-SLIDE DEL HERO */
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % HERO_SLIDES.length);
    }, 6000); // cada 6 segundos

    return () => clearInterval(timer);
  }, []);

  return (
    <main className="w-full relative z-10 overflow-hidden min-h-screen pt-32 pb-20">

      {/* 🔥 HERO CARRUSEL FULL WIDTH */}
      <section className="relative w-screen left-1/2 -translate-x-1/2 h-[60vh] md:h-[70vh] overflow-hidden mb-16">
        {/* Imágenes del carrusel */}
        <div className="absolute inset-0">
          {HERO_SLIDES.map((slide, index) => (
            <motion.img
              key={slide.id}
              src={slide.image}
              alt={`Rave ${index + 1}`}
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{
                opacity: index === currentSlide ? 1 : 0,
                scale: index === currentSlide ? 1.02 : 1.05
              }}
              transition={{ duration: 0.8 }}
            />
          ))}
          {/* Oscurecer para que se lea el texto */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" />
        </div>

        {/* Texto encima del carrusel */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <span className="text-xs md:text-sm font-mono tracking-[0.35em] text-blue-300 mb-4 uppercase">
            ALQUILER PROFESIONAL DE EQUIPO DJ
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-[Bebas_Neue] text-white tracking-[0.08em] leading-tight mb-4">
            A DRUM &amp; BASS, TECHNO &amp; HOUSE RAVE,
            <br className="hidden md:block" />
            EQUIPAMIENTO CURADO PARA TU EVENTO
          </h1>
          <p className="max-w-2xl text-sm md:text-lg text-gray-200">
            Alquila el mismo gear que usan los clubes: tornamesas Technics, mixers Pioneer,
            monitores de estudio y más, listo para que solo llegues y rompas la pista.
          </p>

          {/* Dots del carrusel */}
          <div className="flex gap-2 mt-6">
            {HERO_SLIDES.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => setCurrentSlide(index)}
                className={`h-2.5 w-2.5 rounded-full border border-white/70 transition-all ${
                  currentSlide === index ? 'bg-white w-7' : 'bg-white/30'
                }`}
                aria-label={`Ir al slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Hero Section (texto + filtros) */}
      <motion.section
        className="panel mb-20"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0.9, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 0.6 }}
          >
           </motion.div>
          <span className="section-meta">EQUIPAMIENTO PROFESIONAL</span>
          <h2 className="text-6xl md:text-8xl font-[Bebas_Neue] text-white mb-6 tracking-wider">
            ALQUILER 
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Accede al mejor equipo profesional para tus sesiones, eventos y producciones.
            Desde tornamesas Technics hasta mezcladores de alta gama.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mt-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-bold text-sm tracking-wider transition-all ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white shadow-[0_0_20px_rgba(0,123,255,0.5)]'
                  : 'bg-white/5 text-gray-400 border border-white/10 hover:border-blue-500/50 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </motion.section>

      {/* Equipment Grid */}
      <motion.section
        className="panel"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEquipment.map((item) => (
            <motion.div
              key={item.id}
              variants={cardVariant}
              className="group relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-300"
            >
              {/* Equipment Image */}
              <div className="relative h-56 overflow-hidden bg-gradient-to-br from-blue-900/20 to-purple-900/20">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

                {/* Availability Badge */}
                <div
                  className={`absolute top-4 right-4 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full ${
                    item.available
                      ? 'bg-green-500/20 border border-green-500 text-green-400'
                      : 'bg-red-500/20 border border-red-500 text-red-400'
                  }`}
                >
                  {item.available ? 'Disponible' : 'Alquilado'}
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4 px-3 py-1 bg-blue-500/20 border border-blue-500/50 text-blue-400 text-xs font-bold uppercase tracking-wider rounded-full backdrop-blur-md">
                  {item.category}
                </div>
              </div>

              {/* Equipment Info */}
              <div className="p-6">
                {/* Icon & Name */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
                      {item.name}
                    </h3>
                    {/* Rating */}
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, idx) => (
                        <Star
                          key={idx}
                          size={14}
                          className={idx < item.rating ? 'fill-yellow-500 text-yellow-500' : 'text-gray-600'}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  {item.description}
                </p>

                {/* Specs */}
                <div className="mb-6">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">
                    Especificaciones
                  </span>
                  <div className="space-y-2">
                    {item.specs.map((spec, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Check size={14} className="text-blue-500" />
                        <span className="text-xs text-gray-300">{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing */}
                <div className="border-t border-white/10 pt-4 mb-4">
                  <div className="flex items-end justify-between mb-2">
                    <div>
                      <span className="text-xs text-gray-500 uppercase tracking-wider">Día</span>
                      <p className="text-2xl font-bold text-white">{item.price}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-gray-500 uppercase tracking-wider">Semana</span>
                      <p className="text-lg font-bold text-blue-400">{item.weekPrice}</p>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  className={`w-full py-3 rounded-lg font-bold text-sm tracking-widest transition-all ${
                    item.available
                      ? 'bg-blue-600 text-white hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(0,123,255,0.5)]'
                      : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  }`}
                  disabled={!item.available}
                >
                  {item.available ? 'SOLICITAR ALQUILER' : 'NO DISPONIBLE'}
                </button>
              </div>

              {/* Hover Accent */}
              <div className="absolute left-0 bottom-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Info Section */}
      <motion.section
        className="panel mt-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-900/20 to-blue-800/10 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-2xl font-[Bebas_Neue] text-white mb-3 tracking-wide">
              ENTREGA RÁPIDA
            </h3>
            <p className="text-gray-300 text-sm">
              Recibe tu equipo en 24-48h. Servicio de mensajería asegurado en toda España.
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-900/20 to-purple-800/10 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-purple-500/20 border border-purple-500/50 flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-purple-400" />
            </div>
            <h3 className="text-2xl font-[Bebas_Neue] text-white mb-3 tracking-wide">
              EQUIPO PREMIUM
            </h3>
            <p className="text-gray-300 text-sm">
              Todo nuestro equipamiento es de marcas líderes y se mantiene en perfecto estado.
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-900/20 to-green-800/10 backdrop-blur-sm border border-green-500/20 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/50 flex items-center justify-center mx-auto mb-4">
              <Headphones className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-2xl font-[Bebas_Neue] text-white mb-3 tracking-wide">
              SOPORTE TÉCNICO
            </h3>
            <p className="text-gray-300 text-sm">
              Asistencia técnica 24/7 durante todo el período de alquiler. Siempre estamos aquí.
            </p>
          </div>
        </div>
      </motion.section>

      <Footer />
    </main>
  );
};
