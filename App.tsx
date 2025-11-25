
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls, Scroll, Loader } from '@react-three/drei';
import { ThreeBackground } from './components/ThreeBackground';
import { Overlay } from './components/Overlay';
import { FixedUI } from './components/FixedUI';

const App: React.FC = () => {
  return (
    <div className="w-full h-screen relative bg-[#030109]">
      <FixedUI />
      
      <Canvas
        shadows
        dpr={[1, 2]} // Optimización DPI para móviles
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance" // Solicitar GPU dedicada si es posible
        }}
      >
        <Suspense fallback={null}>
          <ScrollControls pages={9} damping={0.2} distance={1}>
            <ThreeBackground />
            
            <Scroll html style={{ width: '100%' }}>
              <Overlay />
            </Scroll>
          </ScrollControls>
        </Suspense>
      </Canvas>
      
      <Loader 
        containerStyles={{ background: '#030109', zIndex: 1000 }} 
        barStyles={{ background: '#007BFF', height: '4px' }}
        dataStyles={{ fontFamily: 'Bebas Neue', fontSize: '1.5rem', color: '#007BFF' }}
        initialState={(active) => active}
      />
    </div>
  );
};

export default App;
