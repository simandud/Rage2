import { Footer } from '../components/shared/Footer';
import React, { useState } from 'react';
import { Overlay } from '../components/Overlay';
import { DJFader } from '../components/interactive/DJFader';
import { VolumeKnob } from '../components/interactive/VolumeKnob';
import { motion } from 'framer-motion';

// Sample images for the volume knob image switcher
const SAMPLE_IMAGES = [
  "https://images.unsplash.com/photo-1571266028243-d220c9f5b21f?w=800&q=80",
  "https://images.unsplash.com/photo-1598653222000-6b7b7a552625?w=800&q=80",
  "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?w=800&q=80",
  "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80",
  "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80"
];

export const Home: React.FC = () => {
  const [crossfaderValue, setCrossfaderValue] = useState(50);
  const [volumeValue, setVolumeValue] = useState(75);
  const [eqLow, setEqLow] = useState(50);
  const [eqMid, setEqMid] = useState(50);
  const [eqHigh, setEqHigh] = useState(50);

  return (
    <>
      <Overlay />

      {/* Interactive DJ Section */}
      <section className="w-full relative z-10 py-20 bg-gradient-to-b from-transparent to-black/40">
        <div className="panel">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="section-meta">ZONA INTERACTIVA</span>
            <h2 className="text-5xl md:text-7xl font-[Bebas_Neue] text-white mb-4 tracking-wider">
              DJ PLAYGROUND
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Experimenta con nuestros controles DJ interactivos. Mueve el crossfader y ajusta el volumen para cambiar las imágenes.
            </p>
          </motion.div>

          {/* DJ Controls Grid */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Crossfader */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <DJFader
                label="CROSSFADER"
                onChange={setCrossfaderValue}
                defaultValue={50}
                color="blue"
              />
            </motion.div>

            {/* Volume Knob with Image Switcher */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <VolumeKnob
                label="MASTER VOLUME"
                onChange={setVolumeValue}
                defaultValue={75}
                color="red"
                images={SAMPLE_IMAGES}
              />
            </motion.div>
          </div>

          {/* EQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-black/60 backdrop-blur-sm border border-white/10 rounded-2xl p-8"
          >
            <h3 className="text-3xl font-[Bebas_Neue] text-white mb-6 text-center tracking-wider">
              EQ DE 3 BANDAS
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <VolumeKnob
                label="LOW"
                onChange={setEqLow}
                defaultValue={50}
                color="green"
              />
              <VolumeKnob
                label="MID"
                onChange={setEqMid}
                defaultValue={50}
                color="purple"
              />
              <VolumeKnob
                label="HIGH"
                onChange={setEqHigh}
                defaultValue={50}
                color="blue"
              />
            </div>
          </motion.div>

          {/* Visual Feedback */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 bg-gradient-to-r from-blue-900/20 to-purple-900/20 backdrop-blur-md border border-white/10 rounded-2xl p-8"
          >
            <h4 className="text-2xl font-[Bebas_Neue] text-white mb-4 text-center tracking-wide">
              VALORES ACTUALES
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Crossfader</p>
                <p className="text-3xl font-bold text-blue-400 tabular-nums">{crossfaderValue}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Volume</p>
                <p className="text-3xl font-bold text-red-400 tabular-nums">{volumeValue}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">EQ Low</p>
                <p className="text-3xl font-bold text-green-400 tabular-nums">{eqLow}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">EQ Mid</p>
                <p className="text-3xl font-bold text-purple-400 tabular-nums">{eqMid}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">EQ High</p>
                <p className="text-3xl font-bold text-blue-400 tabular-nums">{eqHigh}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};
