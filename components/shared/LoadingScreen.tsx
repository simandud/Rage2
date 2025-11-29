import React from 'react';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
  message?: string;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  message = 'Cargando...'
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#030109]"
    >
      <div className="text-center">
        {/* Animated Logo */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="mb-8"
        >
          <div className="w-20 h-20 mx-auto border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </motion.div>

        {/* Message */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-white font-[Bebas_Neue] tracking-wider"
        >
          {message}
        </motion.p>

        {/* Sub-message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-sm text-gray-400 mt-2 font-mono"
        >
          RAGE VENTURE
        </motion.p>
      </div>
    </motion.div>
  );
};
