import React from 'react';
import { motion } from 'framer-motion';
import Spline from '@splinetool/react-spline';
import { Rocket, Download, Mail } from 'lucide-react';

const Stat = ({ value, label }) => {
  const [display, setDisplay] = React.useState(0);
  const ref = React.useRef(null);
  const started = React.useRef(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const target = parseInt(String(value).replace(/[^0-9]/g, ''), 10) || 0;
            const start = performance.now();
            const duration = 1200;
            const step = (now) => {
              const t = Math.min(1, (now - start) / duration);
              const eased = 1 - Math.pow(1 - t, 3);
              setDisplay(Math.floor(target * eased));
              if (t < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="flex flex-col items-center justify-center px-4">
      <div className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
        {display}
        {String(value).match(/\+/) ? '+' : ''}
        {String(value).match(/%/) ? '%' : ''}
      </div>
      <div className="text-xs sm:text-sm text-white/70 mt-1 uppercase tracking-widest">{label}</div>
    </div>
  );
};

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/VJLoxp84lCdVfdZu/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/80" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-20 flex flex-col items-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold leading-tight"
        >
          TUSHAR KUMAR SHAHI
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-3 text-base sm:text-lg md:text-xl text-white/80"
        >
          DevOps Engineer | MLOps | Cloud Architect
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="mt-4 text-lg sm:text-xl md:text-2xl text-white/90"
        >
          Building scalable infrastructure for the AI revolution
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <a href="#projects" className="inline-flex items-center gap-2 rounded-full bg-white text-black px-6 py-3 text-sm font-semibold hover:scale-105 transition">
            <Rocket size={18} /> View Work
          </a>
          <a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur px-6 py-3 text-sm font-semibold hover:bg-white/20 transition">
            <Mail size={18} /> Contact
          </a>
          <a href="/resume.pdf" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold hover:bg-white/10 transition">
            <Download size={18} /> Download Resume
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-8"
        >
          <Stat value="50+" label="Apps" />
          <Stat value="1000+" label="Pipelines" />
          <Stat value="50000+" label="Users" />
          <Stat value="99%" label="Uptime" />
        </motion.div>
      </div>
    </section>
  );
}
