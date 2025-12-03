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
     
    </>
  );
};