import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Calendar, DollarSign, Cloud, Cog, Bot, Shield } from 'lucide-react';

const Metric = ({ icon: Icon, label, value, color }) => (
  <motion.div
    whileHover={{ scale: 1.03 }}
    className="rounded-2xl p-5 bg-white/5 border border-white/10 backdrop-blur flex flex-col items-start"
  >
    <div className={`p-2 rounded-lg ${color} text-white mb-3`}>
      <Icon size={18} />
    </div>
    <div className="text-3xl font-extrabold leading-none">{value}</div>
    <div className="text-white/70 text-sm mt-1">{label}</div>
  </motion.div>
);

export default function Experience() {
  const [open, setOpen] = React.useState(false);
  return (
    <section id="experience" className="relative w-full bg-black text-white py-24">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-center gap-3 text-xl font-semibold">
          <Briefcase size={20} className="text-white/80" /> Experience
        </div>

        <div className="mt-6 border-l-2 border-white/10 pl-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="text-lg font-bold tracking-wide">DEBALES AI | DevOps Engineer</div>
            <div className="flex items-center gap-2 text-white/60"><Calendar size={16}/> Jan 2024 - Oct 2025</div>
          </div>

          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            <Metric icon={DollarSign} label="Cost Reduction" value="60%" color="bg-emerald-600" />
            <Metric icon={Cloud} label="$ Azure Credits" value="$150K" color="bg-sky-600" />
            <Metric icon={Cog} label="Pipelines" value="1000+" color="bg-indigo-600" />
            <Metric icon={Bot} label="ML Models" value="100+" color="bg-purple-600" />
            <Metric icon={Shield} label="Downtime" value="Zero" color="bg-rose-600" />
          </div>

          <button onClick={() => setOpen((v) => !v)} className="mt-6 text-sm inline-flex items-center gap-2 text-white/80 hover:text-white">
            {open ? 'Hide Details' : 'View Details'}
          </button>

          <AnimatePresence>
            {open && (
              <motion.ul
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="mt-3 grid sm:grid-cols-2 gap-2 text-white/80 text-sm list-disc pl-5"
              >
                <li>Built scalable CI/CD across multi-cloud with IaC</li>
                <li>Optimized GPU workloads and auto-scaling for AI services</li>
                <li>Hardened security with policies, secrets, and zero downtime</li>
                <li>Centralized observability with tracing and proactive alerts</li>
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
