import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface VolumeKnobProps {
  label?: string;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  defaultValue?: number;
  color?: string;
  images?: string[];
}

export const VolumeKnob: React.FC<VolumeKnobProps> = ({
  label = "VOLUME",
  onChange,
  min = 0,
  max = 100,
  defaultValue = 50,
  color = "blue",
  images = []
}) => {
  const [value, setValue] = useState(defaultValue);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [startValue, setStartValue] = useState(0);
  const knobRef = useRef<HTMLDivElement>(null);

  const colorClasses = {
    blue: "from-blue-600 to-blue-400",
    red: "from-red-600 to-red-400",
    green: "from-green-600 to-green-400",
    purple: "from-purple-600 to-purple-400"
  };

  const glowColors = {
    blue: "shadow-[0_0_40px_rgba(0,123,255,0.6)]",
    red: "shadow-[0_0_40px_rgba(255,0,0,0.6)]",
    green: "shadow-[0_0_40px_rgba(0,255,0,0.6)]",
    purple: "shadow-[0_0_40px_rgba(128,0,128,0.6)]"
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartY(e.clientY);
    setStartValue(value);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      const deltaY = startY - e.clientY;
      const range = max - min;
      const sensitivity = 0.5;
      const newValue = Math.max(min, Math.min(max, startValue + (deltaY * sensitivity)));
      setValue(Math.round(newValue));
      onChange?.(Math.round(newValue));
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, startY, startValue]);

  // Calculate rotation (0-270 degrees)
  const rotation = ((value - min) / (max - min)) * 270 - 135;

  // If images provided, show different images based on value
  const currentImageIndex = images.length > 0
    ? Math.floor(((value - min) / (max - min)) * (images.length - 1))
    : -1;

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl">
      {/* Label */}
      <div className="text-center">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{label}</p>
        <p className="text-4xl font-[Bebas_Neue] text-white tabular-nums">{value}</p>
      </div>

      {/* Image Display (if images provided) */}
      {images.length > 0 && currentImageIndex >= 0 && (
        <div className="w-64 h-64 rounded-lg overflow-hidden border-2 border-white/20 shadow-2xl mb-4">
          <motion.img
            key={currentImageIndex}
            src={images[currentImageIndex]}
            alt={`Volume ${value}`}
            className="w-full h-full object-cover"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          />
        </div>
      )}

      {/* Knob Container */}
      <div className="relative">
        {/* Outer Ring - Scale */}
        <svg className="absolute inset-0 w-40 h-40 -rotate-[135deg]" viewBox="0 0 160 160">
          {/* Background Arc */}
          <circle
            cx="80"
            cy="80"
            r="70"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="4"
            strokeDasharray="308.8"
            strokeLinecap="round"
          />
          {/* Value Arc */}
          <motion.circle
            cx="80"
            cy="80"
            r="70"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="4"
            strokeDasharray="308.8"
            strokeDashoffset={308.8 - (308.8 * ((value - min) / (max - min)))}
            strokeLinecap="round"
            initial={false}
            animate={{
              strokeDashoffset: 308.8 - (308.8 * ((value - min) / (max - min)))
            }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" className={`${color === 'blue' ? 'text-blue-600' : color === 'red' ? 'text-red-600' : color === 'green' ? 'text-green-600' : 'text-purple-600'}`} stopColor="currentColor" />
              <stop offset="100%" className={`${color === 'blue' ? 'text-blue-400' : color === 'red' ? 'text-red-400' : color === 'green' ? 'text-green-400' : 'text-purple-400'}`} stopColor="currentColor" />
            </linearGradient>
          </defs>
        </svg>

        {/* Knob */}
        <motion.div
          ref={knobRef}
          className={`relative w-40 h-40 rounded-full bg-gradient-to-br ${colorClasses[color as keyof typeof colorClasses] || colorClasses.blue} cursor-grab active:cursor-grabbing ${isDragging ? glowColors[color as keyof typeof glowColors] || glowColors.blue : ''} border-4 border-white/30 select-none`}
          onMouseDown={handleMouseDown}
          animate={{
            rotate: rotation,
            scale: isDragging ? 1.05 : 1
          }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          {/* Knob Surface Reflection */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/40 via-transparent to-transparent"></div>

          {/* Center Circle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-black/60 border-2 border-white/40 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-white/20"></div>
          </div>

          {/* Indicator Line */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-1 h-12 bg-white rounded-full shadow-lg"></div>

          {/* Grip Dots */}
          <div className="absolute inset-0">
            {[...Array(12)].map((_, i) => {
              const angle = (i * 30) * (Math.PI / 180);
              const x = 50 + 45 * Math.cos(angle);
              const y = 50 + 45 * Math.sin(angle);
              return (
                <div
                  key={i}
                  className="absolute w-1.5 h-1.5 bg-white/40 rounded-full"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                />
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Scale Labels */}
      <div className="w-full flex justify-between text-xs font-mono text-gray-500 px-4">
        <span>{min}</span>
        <span>{Math.round((max - min) / 2)}</span>
        <span>{max}</span>
      </div>
    </div>
  );
};
