import { Footer } from '../components/shared/Footer';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Users, Clock, Award, Star, CheckCircle, BookOpen, Headphones } from 'lucide-react';

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

// Fictional DJ and Vinyl Classes
const CLASES_DJ = [
  {
    id: 1,
    name: "DJ Fundamentals: Mezcla Básica",
    level: "Principiante",
    instructor: "DJ SPINMASTER",
    duration: "8 semanas",
    sessions: "16 sesiones",
    schedule: "Martes y Jueves 18:00-20:00",
    students: "Max 8 estudiantes",
    price: "€450",
    image: "https://images.unsplash.com/photo-1571266028243-d220c9f5b21f?w=800&q=80",
    description: "Aprende los fundamentos del DJing desde cero. Beatmatching, EQing, y técnicas de mezcla.",
    topics: [
      "Introducción al equipo DJ (CDJs, mezcladores, tornamesas)",
      "Teoría musical básica y estructura de canciones",
      "Beatmatching manual y sincronización",
      "Uso de EQ y filtros",
      "Técnicas de transición y mezcla armónica",
      "Construcción de sets y lectura de la pista"
    ],
    includes: [
      "Acceso 24/7 al estudio de práctica",
      "Material didáctico digital",
      "Sesiones de práctica guiadas",
      "Certificado de finalización"
    ],
    color: "from-blue-500 to-cyan-500",
    available: true
  },
  {
    id: 2,
    name: "Vinyl Mastery: El Arte del Vinilo",
    level: "Intermedio",
    instructor: "VINYL MASTER",
    duration: "6 semanas",
    sessions: "12 sesiones",
    schedule: "Lunes y Miércoles 19:00-21:00",
    students: "Max 6 estudiantes",
    price: "€550",
    image: "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?w=800&q=80",
    description: "Domina el arte de mezclar con vinilo. Desde la selección de discos hasta técnicas avanzadas de scratch.",
    topics: [
      "Historia y cultura del vinilo en DJ",
      "Cuidado y mantenimiento de vinilos y agujas",
      "Técnicas de beatmatching con vinilo",
      "Scratch básico: baby scratch, forward scratch",
      "Scratch intermedio: transform, crab, flare",
      "Digging y construcción de colección de vinilos"
    ],
    includes: [
      "Acceso a biblioteca de vinilos del estudio",
      "Kit de mantenimiento de vinilos",
      "Sesiones de digging guiadas",
      "Grabación profesional de tu set final"
    ],
    color: "from-purple-500 to-pink-500",
    available: true
  },
  {
    id: 3,
    name: "Producción Electrónica & DJing",
    level: "Avanzado",
    instructor: "NEON PULSE",
    duration: "12 semanas",
    sessions: "24 sesiones",
    schedule: "Lunes a Jueves 20:00-22:00",
    students: "Max 6 estudiantes",
    price: "€1200",
    image: "https://images.unsplash.com/photo-1598653222000-6b7b7a552625?w=800&q=80",
    description: "Curso completo que combina producción musical y DJing. Crea tus propios tracks y aprende a tocarlos.",
    topics: [
      "Fundamentos de producción en Ableton Live",
      "Síntesis de sonido y diseño de patches",
      "Creación de tracks para DJ sets",
      "Técnicas avanzadas de mezcla",
      "Uso de efectos y procesamiento en vivo",
      "Preparación de sets híbridos (producción + DJing)"
    ],
    includes: [
      "Licencia Ableton Live 11 Suite (1 año)",
      "Biblioteca de samples y presets exclusivos",
      "Mentoring individual mensual",
      "Oportunidad de tocar en eventos RAGE VENTURE"
    ],
    color: "from-red-500 to-orange-500",
    available: true
  },
  {
    id: 4,
    name: "Techno Bootcamp Intensivo",
    level: "Intermedio",
    instructor: "CYBER DUST",
    duration: "4 semanas",
    sessions: "20 sesiones intensivas",
    schedule: "Lun-Vie 18:00-22:00",
    students: "Max 10 estudiantes",
    price: "€850",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80",
    description: "Bootcamp intensivo enfocado en techno. Mezcla, producción y cultura techno en un mes completo.",
    topics: [
      "Historia del techno: Detroit, Berlin, UK",
      "Selección musical y crate digging techno",
      "Técnicas de mezcla específicas de techno",
      "Producción de techno: drums, bass, atmospheres",
      "Uso de hardware: drum machines y sintetizadores",
      "Live performance y improvisación"
    ],
    includes: [
      "Acceso completo al estudio 24/7 durante el curso",
      "Sesiones con DJs invitados de la escena techno",
      "Networking event con promotores y clubs",
      "Grabación profesional de set final"
    ],
    color: "from-gray-600 to-gray-800",
    available: false
  },
  {
    id: 5,
    name: "Scratch & Turntablism",
    level: "Avanzado",
    instructor: "THE DIGGER",
    duration: "10 semanas",
    sessions: "20 sesiones",
    schedule: "Martes y Jueves 19:00-21:00",
    students: "Max 4 estudiantes",
    price: "€750",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=80",
    description: "Conviértete en un turntablist profesional. Técnicas avanzadas de scratch, juggling y beat juggling.",
    topics: [
      "Fundamentos del turntablism",
      "Scratch avanzado: chirp, orbit, boomerang",
      "Beat juggling y routines",
      "Body tricks y performance",
      "Competiciones de scratch",
      "Creación de scratch routines originales"
    ],
    includes: [
      "Battle records y scratch tools",
      "Grabación de video de tus rutinas",
      "Feedback de turntablists profesionales",
      "Inscripción a competición local"
    ],
    color: "from-green-500 to-emerald-500",
    available: true
  },
  {
    id: 6,
    name: "Business del DJ: Marketing & Bookings",
    level: "Todos los niveles",
    instructor: "MUSIC BUSINESS PRO",
    duration: "4 semanas",
    sessions: "8 sesiones",
    schedule: "Sábados 10:00-14:00",
    students: "Max 12 estudiantes",
    price: "€350",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80",
    description: "Aprende a convertir tu pasión en un negocio. Marketing, branding, bookings y monetización.",
    topics: [
      "Branding personal y creación de imagen",
      "Social media y marketing digital para DJs",
      "Cómo conseguir bookings y gigs",
      "Negociación de contratos y cachet",
      "Monetización: streaming, edits, remixes",
      "Networking y construcción de carrera"
    ],
    includes: [
      "Plantillas de EPK y rider técnico",
      "Sesión de fotografía profesional",
      "Consultoría individual de 1 hora",
      "Acceso a red de promotores y clubs"
    ],
    color: "from-yellow-500 to-orange-500",
    available: true
  }
];

export const Clases: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<string>("Todos");

  const levels = ["Todos", "Principiante", "Intermedio", "Avanzado", "Todos los niveles"];

  const filteredClases = selectedLevel === "Todos"
    ? CLASES_DJ
    : CLASES_DJ.filter(clase => clase.level === selectedLevel);

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
            initial={{ scale: 0.9, opacity: 0, y: -20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.6, type: "spring" }}
          >
            <GraduationCap className="w-20 h-20 mx-auto mb-6 text-blue-500" />
          </motion.div>
          <span className="section-meta">EDUCACIÓN MUSICAL PROFESIONAL</span>
          <h1 className="text-6xl md:text-8xl font-[Bebas_Neue] text-white mb-6 tracking-wider">
            CLASES DJ
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Aprende de los profesionales. Desde fundamentos de mezcla hasta producción avanzada,
            técnicas de vinilo y turntablism.
          </p>
        </div>

        {/* Level Filter */}
        <div className="flex flex-wrap justify-center gap-3 mt-12">
          {levels.map((level) => (
            <button
              key={level}
              onClick={() => setSelectedLevel(level)}
              className={`px-6 py-3 rounded-full font-bold text-sm tracking-wider transition-all ${
                selectedLevel === level
                  ? 'bg-blue-600 text-white shadow-[0_0_20px_rgba(0,123,255,0.5)]'
                  : 'bg-white/5 text-gray-400 border border-white/10 hover:border-blue-500/50 hover:text-white'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </motion.section>

      {/* Classes Grid */}
      <motion.section
        className="panel"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="space-y-8">
          {filteredClases.map((clase) => (
            <motion.div
              key={clase.id}
              variants={cardVariant}
              className="group relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-300"
            >
              <div className="grid lg:grid-cols-[350px_1fr] gap-6 p-6">
                {/* Class Image */}
                <div className="relative h-full min-h-[300px] rounded-xl overflow-hidden shadow-2xl">
                  <img
                    src={clase.image}
                    alt={clase.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${clase.color} opacity-30 mix-blend-overlay`}></div>

                  {/* Level Badge */}
                  <div className={`absolute top-4 left-4 px-4 py-2 backdrop-blur-md border text-xs font-bold uppercase tracking-wider rounded-full ${
                    clase.level === 'Principiante' ? 'bg-green-500/20 border-green-500 text-green-400' :
                    clase.level === 'Intermedio' ? 'bg-yellow-500/20 border-yellow-500 text-yellow-400' :
                    clase.level === 'Avanzado' ? 'bg-red-500/20 border-red-500 text-red-400' :
                    'bg-blue-500/20 border-blue-500 text-blue-400'
                  }`}>
                    {clase.level}
                  </div>

                  {/* Availability */}
                  <div className={`absolute top-4 right-4 px-3 py-1 backdrop-blur-md border text-xs font-bold uppercase tracking-wider rounded-full ${
                    clase.available
                      ? 'bg-green-500/20 border-green-500 text-green-400'
                      : 'bg-red-500/20 border-red-500 text-red-400'
                  }`}>
                    {clase.available ? 'Plazas Disponibles' : 'Completo'}
                  </div>

                  {/* Instructor */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-black/80 backdrop-blur-md border border-white/20 rounded-lg p-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center">
                          <Headphones size={18} className="text-blue-400" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 uppercase tracking-wider">Instructor</p>
                          <p className="text-sm text-white font-bold">{clase.instructor}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Class Info */}
                <div className="flex flex-col justify-between">
                  {/* Header */}
                  <div>
                    <h3 className="text-4xl font-[Bebas_Neue] text-white mb-3 tracking-wide group-hover:text-blue-400 transition-colors">
                      {clase.name}
                    </h3>

                    <p className="text-gray-300 mb-6 leading-relaxed">
                      {clase.description}
                    </p>

                    {/* Course Details Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-white/10">
                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-blue-500 mt-1" />
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wider">Duración</p>
                          <p className="text-sm text-white font-mono">{clase.duration}</p>
                          <p className="text-xs text-gray-400">{clase.sessions}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Users className="w-5 h-5 text-purple-500 mt-1" />
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wider">Grupo</p>
                          <p className="text-sm text-white font-mono">{clase.students}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 col-span-2">
                        <BookOpen className="w-5 h-5 text-green-500 mt-1" />
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wider">Horario</p>
                          <p className="text-sm text-white font-mono">{clase.schedule}</p>
                        </div>
                      </div>
                    </div>

                    {/* Topics */}
                    <div className="mb-6">
                      <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                        <Award className="w-4 h-4 text-blue-500" />
                        Contenido del Curso
                      </h4>
                      <div className="grid md:grid-cols-2 gap-2">
                        {clase.topics.map((topic, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <CheckCircle size={14} className="text-blue-500 mt-1 flex-shrink-0" />
                            <span className="text-xs text-gray-300">{topic}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Includes */}
                    <div className="mb-6">
                      <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-500" />
                        Incluye
                      </h4>
                      <div className="grid md:grid-cols-2 gap-2">
                        {clase.includes.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <CheckCircle size={14} className="text-green-500 mt-1 flex-shrink-0" />
                            <span className="text-xs text-gray-300">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="border-t border-white/10 pt-4 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-gray-500 uppercase tracking-wider">Precio Total</span>
                      <p className="text-4xl font-bold text-white">{clase.price}</p>
                      <span className="text-xs text-gray-400">Opciones de pago disponibles</span>
                    </div>

                    <button
                      className={`px-8 py-4 rounded-lg font-bold text-sm tracking-widest transition-all ${
                        clase.available
                          ? 'bg-blue-600 text-white hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(0,123,255,0.5)]'
                          : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                      }`}
                      disabled={!clase.available}
                    >
                      {clase.available ? 'INSCRIBIRSE AHORA' : 'LISTA DE ESPERA'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Gradient Accent */}
              <div className={`absolute left-0 top-0 w-1 h-full bg-gradient-to-b ${clase.color} opacity-0 group-hover:opacity-100 transition-opacity`}></div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        className="panel mt-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 backdrop-blur-md border border-white/10 rounded-2xl p-12 text-center">
          <Award className="w-12 h-12 mx-auto mb-4 text-blue-500" />
          <h3 className="text-4xl font-[Bebas_Neue] text-white mb-4 tracking-wide">
            ¿NO SABES QUÉ CLASE ELEGIR?
          </h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Agenda una consulta gratuita con nuestros instructores y te ayudaremos
            a encontrar el curso perfecto para tu nivel y objetivos.
          </p>
          <button className="px-10 py-4 bg-blue-600 text-white font-bold tracking-widest rounded-lg hover:bg-blue-500 transition-colors shadow-[0_0_20px_rgba(0,123,255,0.3)]">
            AGENDAR CONSULTA GRATUITA
          </button>
        </div>
      </motion.section>
    
      <Footer />
    </main>
  );
};
