import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface DJFaderProps {
  label?: string;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  defaultValue?: number;
  color?: string;
}

export const DJFader: React.FC<DJFaderProps> = ({
  label = "CROSSFADER",
  onChange,
  min = 0,
  max = 100,
  defaultValue = 50,
  color = "blue"
}) => {
  const [value, setValue] = useState(defaultValue);
  const [isDragging, setIsDragging] = useState(false);
  const faderRef = useRef<HTMLDivElement>(null);

  const colorClasses = {
    blue: "bg-blue-500 shadow-[0_0_20px_rgba(0,123,255,0.5)]",
    red: "bg-red-500 shadow-[0_0_20px_rgba(255,0,0,0.5)]",
    green: "bg-green-500 shadow-[0_0_20px_rgba(0,255,0,0.5)]",
    purple: "bg-purple-500 shadow-[0_0_20px_rgba(128,0,128,0.5)]"
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    updateValue(e.clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      updateValue(e.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const updateValue = (clientX: number) => {
    if (faderRef.current) {
      const rect = faderRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const percentage = (x / rect.width) * 100;
      const newValue = Math.round((percentage / 100) * (max - min) + min);
      setValue(newValue);
      onChange?.(newValue);
    }
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
  }, [isDragging]);

  const position = ((value - min) / (max - min)) * 100;

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl">
      {/* Label */}
      <div className="text-center">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{label}</p>
        <p className="text-3xl font-[Bebas_Neue] text-white tabular-nums">{value}</p>
      </div>

      {/* Fader Track */}
      <div
        ref={faderRef}
        className="relative w-full h-20 bg-black/60 border border-white/20 rounded-lg cursor-pointer"
        onMouseDown={handleMouseDown}
      >
        {/* Center Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/30"></div>

        {/* Scale Marks */}
        <div className="absolute inset-0 flex justify-between px-2 items-center pointer-events-none">
          {[0, 25, 50, 75, 100].map((mark) => (
            <div key={mark} className="w-px h-3 bg-white/20"></div>
          ))}
        </div>

        {/* Fill */}
        <motion.div
          className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-blue-500/20 to-blue-500/40 pointer-events-none"
          style={{ width: `${position}%` }}
        />

        {/* Fader Handle */}
        <motion.div
          className={`absolute top-1/2 -translate-y-1/2 w-8 h-16 ${colorClasses[color as keyof typeof colorClasses] || colorClasses.blue} border-2 border-white/50 rounded cursor-grab active:cursor-grabbing`}
          style={{ left: `calc(${position}% - 16px)` }}
          animate={{
            scale: isDragging ? 1.1 : 1,
          }}
        >
          {/* Handle Grip Lines */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 pointer-events-none">
            {[1, 2, 3].map((line) => (
              <div key={line} className="w-4 h-0.5 bg-white/50 rounded"></div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scale Labels */}
      <div className="w-full flex justify-between text-xs font-mono text-gray-500">
        <span>L</span>
        <span>CENTER</span>
        <span>R</span>
      </div>
    </div>
  );
};
