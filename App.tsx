import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { ScrollControls, Scroll, Loader } from "@react-three/drei";
import { ThreeBackground } from "./components/ThreeBackground";
import { FixedUI } from "./components/FixedUI";
import { GLBBackground } from "./components/GLBBackground";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Eventos } from "./pages/Eventos";
import { Alquiler } from "./pages/Alquiler";
import { Lanzamientos } from "./pages/Lanzamientos";
import { Clases } from "./pages/Clases";
import { Tienda } from "./pages/Tienda";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div
        className="relative w-full bg-[#030109]"
        style={
          {
            "--container-padding": "clamp(0.75rem, 4vw, 2rem)",
            "--font-base": "clamp(0.875rem, 2.5vw, 1rem)",
            "--font-lg": "clamp(1rem, 3vw, 1.25rem)",
            "--font-xl": "clamp(1.25rem, 3.5vw, 1.5rem)",
            "--font-2xl": "clamp(1.5rem, 4vw, 2rem)",
            "--font-3xl": "clamp(2rem, 5vw, 2.5rem)",
            "--font-4xl": "clamp(2.5rem, 6vw, 3rem)",
            "--font-5xl": "clamp(3rem, 8vw, 4rem)",
            "--gap-sm": "clamp(0.5rem, 2vw, 1rem)",
            "--gap-md": "clamp(1rem, 3vw, 1.5rem)",
            "--gap-lg": "clamp(1.5rem, 4vw, 2.5rem)",
          } as React.CSSProperties
        }
      >
        <FixedUI />

        <div
          className="fixed inset-0 w-full h-screen z-0 pointer-events-none"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            zIndex: 0,
            pointerEvents: "none",
          }}
        >
          <Canvas
            shadows
            dpr={[1, 2]}
            camera={{ position: [0, 0, 5], fov: 45 }}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: "high-performance",
            }}
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <Suspense fallback={null}>
              <ScrollControls pages={8} damping={0.2} distance={1}>
                <ThreeBackground />
                <GLBBackground />

                <Scroll html style={{ width: "100%" }}>
                  <div style={{ width: "100%" }} />
                </Scroll>
              </ScrollControls>
            </Suspense>
          </Canvas>
        </div>

        <div
          className="relative z-10 w-full pointer-events-auto"
          style={{
            position: "relative",
            zIndex: 10,
            width: "100%",
            pointerEvents: "auto",
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/eventos" element={<Eventos />} />
            <Route path="/alquiler" element={<Alquiler />} />
            <Route path="/lanzamientos" element={<Lanzamientos />} />
            <Route path="/clases" element={<Clases />} />
            <Route path="/tienda" element={<Tienda />} />
          </Routes>
        </div>

        <Loader
          containerStyles={{ background: "#030109", zIndex: 1000 }}
          barStyles={{ background: "#007BFF", height: "4px" }}
          dataStyles={{
            fontFamily: "Bebas Neue",
            fontSize: "1.5rem",
            color: "#007BFF",
          }}
          initialState={(active) => active}
        />
      </div>
    </BrowserRouter>
  );
};

export default App;
