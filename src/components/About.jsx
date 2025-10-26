import React from 'react';
import { motion } from 'framer-motion';

const techs = [
  { key: 'AWS', color: 'bg-blue-500' },
  { key: 'Azure', color: 'bg-blue-600' },
  { key: 'Docker', color: 'bg-cyan-500' },
  { key: 'Kubernetes', color: 'bg-sky-500' },
  { key: 'Python', color: 'bg-yellow-500' },
  { key: 'JavaScript', color: 'bg-amber-500' },
  { key: 'Terraform', color: 'bg-emerald-500' },
  { key: 'PostgreSQL', color: 'bg-indigo-500' },
  { key: 'MongoDB', color: 'bg-green-600' },
  { key: 'Redis', color: 'bg-red-500' },
  { key: 'OpenAI', color: 'bg-purple-500' },
  { key: 'SageMaker', color: 'bg-fuchsia-500' },
];

const FloatingIcon = ({ label, color, i }) => (
  <motion.div
    initial={{ y: 0, opacity: 0 }}
    whileInView={{ opacity: 1 }}
    animate={{ y: [0, -8, 0] }}
    transition={{ repeat: Infinity, duration: 3 + (i % 5) * 0.3, ease: 'easeInOut' }}
    title={label}
    className={`flex items-center justify-center ${color} text-white text-xs sm:text-sm font-bold rounded-full w-14 h-14 sm:w-16 sm:h-16 shadow-lg/30 shadow-black/30`}
  >
    {label.slice(0, 2)}
  </motion.div>
);

function AnimatedTerminal() {
  const lines = [
    'git push infra main',
    'terraform apply -auto-approve',
    'kubectl rollout restart deploy ai-serving',
    'helm upgrade ml-stack ./charts',
    'sagemaker create-endpoint --prod',
  ];
  const [idx, setIdx] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setIdx((p) => (p + 1) % lines.length), 1600);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="rounded-2xl bg-black/70 border border-white/10 backdrop-blur overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-white/10">
        <span className="w-3 h-3 rounded-full bg-red-500" />
        <span className="w-3 h-3 rounded-full bg-yellow-400" />
        <span className="w-3 h-3 rounded-full bg-green-500" />
        <span className="ml-2 text-xs text-white/60">remote: debales-ai</span>
      </div>
      <div className="p-5 font-mono text-sm text-green-300 min-h-[200px] flex items-center">
        <motion.div key={idx} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <span className="text-white/60">$</span> {lines[idx]}<span className="animate-pulse">_</span>
        </motion.div>
      </div>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="relative w-full bg-gradient-to-b from-black to-neutral-900 text-white py-24">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <AnimatedTerminal />
        </div>
        <div>
          <div className="text-xl sm:text-2xl font-semibold">
            DevOps Engineer @ Debales AI (22 months)
          </div>
          <div className="mt-2 text-white/80">
            Reduced cloud costs 60% • Deployed 100+ AI models • 17K+ LinkedIn followers
          </div>
          <div className="mt-1 text-white/70">Currently: MCA @ MIT World Peace University</div>

          <div className="mt-8 grid grid-cols-4 sm:grid-cols-6 gap-4">
            {techs.map((t, i) => (
              <FloatingIcon key={t.key} label={t.key} color={t.color} i={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
