import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';
import { Footer } from '../components/shared/Footer';

export const NotFound: React.FC = () => {
  return (
    <main className="w-full relative z-10 overflow-hidden min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center px-6"
        >
          {/* 404 Number */}
          <motion.h1
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            className="text-[12rem] md:text-[20rem] font-[Bebas_Neue] text-transparent bg-clip-text bg-gradient-to-b from-blue-500 to-purple-500 leading-none mb-8"
          >
            404
          </motion.h1>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-12"
          >
            <h2 className="text-4xl md:text-6xl font-[Bebas_Neue] text-white mb-4 tracking-wider">
              PÁGINA NO ENCONTRADA
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Lo sentimos, la página que buscas no existe o ha sido movida.
            </p>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              to="/"
              className="px-8 py-4 bg-blue-600 text-white font-bold tracking-widest rounded-lg hover:bg-blue-500 transition-colors shadow-[0_0_20px_rgba(0,123,255,0.3)] flex items-center gap-2"
            >
              <Home size={20} />
              VOLVER AL INICIO
            </Link>

            <button
              onClick={() => window.history.back()}
              className="px-8 py-4 bg-white/10 text-white font-bold tracking-widest rounded-lg hover:bg-white/20 transition-colors border border-white/20 flex items-center gap-2"
            >
              <ArrowLeft size={20} />
              VOLVER ATRÁS
            </button>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-16"
          >
            <p className="text-sm text-gray-500 uppercase tracking-wider mb-4">O explora:</p>
            <div className="flex flex-wrap gap-4 justify-center">
              {[
                { label: 'Eventos', path: '/eventos' },
                { label: 'Alquiler', path: '/alquiler' },
                { label: 'Lanzamientos', path: '/lanzamientos' },
                { label: 'Clases', path: '/clases' },
                { label: 'Tienda', path: '/tienda' }
              ].map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-sm text-gray-400 hover:text-blue-400 transition-colors uppercase tracking-wider font-bold"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
};
