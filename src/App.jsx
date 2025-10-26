import React from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Showcase from './components/Showcase';

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white font-[Inter] selection:bg-white/20 selection:text-white">
      <Hero />
      <About />
      <Experience />
      <Showcase />
      <footer className="py-10 text-center text-white/50 text-xs">© {new Date().getFullYear()} Tushar Kumar Shahi • Built with love</footer>
    </div>
  );
}
