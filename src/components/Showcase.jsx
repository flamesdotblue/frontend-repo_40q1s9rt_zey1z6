import React from 'react';
import { motion } from 'framer-motion';
import { Github, Globe, BookOpen, Linkedin, Mail, Phone, MapPin, Star, Users, Cog, Bot, Rocket } from 'lucide-react';

// Small counter used for achievements
const Counter = ({ end, suffix = '' }) => {
  const [val, setVal] = React.useState(0);
  const ref = React.useRef(null);
  const started = React.useRef(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const target = Number(String(end).replace(/[^0-9.]/g, ''));
          const start = performance.now();
          const duration = 1000;
          const step = (now) => {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            setVal(Math.floor(target * eased));
            if (t < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      });
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, [end]);
  return <span ref={ref}>{val}{suffix}</span>;
};

function ProjectCard({ title, tagline, details, badges, actions }) {
  return (
    <motion.div whileHover={{ y: -6 }} className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10">
      <div className="p-6 min-h-[160px]">
        <div className="text-xl font-bold">{title}</div>
        <div className="text-white/70">{tagline}</div>
        <div className="mt-4 flex flex-wrap gap-2">
          {badges.map((b) => (
            <span key={b} className="text-xs px-2 py-1 rounded-full bg-white/10 border border-white/10">{b}</span>
          ))}
        </div>
      </div>
      <div className="absolute inset-0 bg-black/80 translate-y-full group-hover:translate-y-0 transition-transform duration-300 p-6 flex flex-col justify-between">
        <ul className="space-y-2 text-sm text-white/90">
          {details.map((d, i) => (<li key={i}>• {d}</li>))}
        </ul>
        <div className="pt-4 flex gap-3">
          {actions}
        </div>
      </div>
    </motion.div>
  );
}

function SkillsCloud() {
  const skills = [
    { n: 'AWS', c: 'bg-blue-600' }, { n: 'Azure', c: 'bg-sky-600' }, { n: 'Kubernetes', c: 'bg-sky-500' },
    { n: 'Docker', c: 'bg-cyan-500' }, { n: 'Terraform', c: 'bg-emerald-600' }, { n: 'Python', c: 'bg-yellow-500' },
    { n: 'OpenAI', c: 'bg-purple-600' }, { n: 'Redis', c: 'bg-red-500' }, { n: 'PostgreSQL', c: 'bg-indigo-600' },
  ];
  return (
    <div className="relative h-[320px] rounded-2xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 overflow-hidden">
      {skills.map((s, i) => (
        <motion.button
          key={s.n}
          title={s.n}
          className={`absolute px-3 py-2 rounded-full text-xs text-white ${s.c} shadow-lg/30`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
          transition={{ delay: i * 0.08, duration: 3 + (i % 5) * 0.2, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            top: `${15 + (i * 10) % 70}%`,
            left: `${10 + (i * 17) % 80}%`,
          }}
        >
          {s.n}
          <span className="absolute left-0 bottom-0 h-1 rounded-full bg-white/60 w-full opacity-0 group-hover:opacity-100" />
        </motion.button>
      ))}
    </div>
  );
}

function Achievements() {
  const items = [
    { icon: <Star size={18} />, label: '60% Cost Cut', end: 60, suffix: '%' },
    { icon: <Cog size={18} />, label: '1000+ Pipelines', end: 1000, suffix: '+' },
    { icon: <Rocket size={18} />, label: '50+ Apps', end: 50, suffix: '+' },
    { icon: <Users size={18} />, label: '50K Users', end: 50000, suffix: '' },
    { icon: <Bot size={18} />, label: '100+ ML Models', end: 100, suffix: '+' },
    { icon: <Star size={18} />, label: '$150K Credits', end: 150, suffix: 'K' },
    { icon: <Star size={18} />, label: '97.5% Faster', end: 98, suffix: '%' },
    { icon: <Shield size={18} />, label: 'Zero Downtime', end: 0, suffix: '' },
    { icon: <BookOpen size={18} />, label: '3 Certs', end: 3, suffix: '' },
  ];
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {items.map((it, i) => (
        <motion.div key={i} whileHover={{ scale: 1.03 }} className="rounded-xl p-4 bg-white/5 border border-white/10">
          <div className="flex items-center gap-2 text-white/70 mb-2">{it.icon}<span className="text-xs">{it.label.split(' ').slice(-2).join(' ')}</span></div>
          <div className="text-2xl font-extrabold"><Counter end={it.end} suffix={it.suffix} /></div>
          <div className="text-xs text-white/60 mt-1">{it.label}</div>
        </motion.div>
      ))}
    </div>
  );
}

function Contact() {
  return (
    <div id="contact" className="relative">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_60%)]" />
      <div className="relative grid lg:grid-cols-2 gap-8">
        <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur p-6">
          <div className="text-xl font-semibold mb-4">Let's Connect</div>
          <form onSubmit={(e) => { e.preventDefault(); alert('Thanks! I will get back to you.'); }} className="space-y-4">
            <input className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-white/30" placeholder="Name" required />
            <input type="email" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-white/30" placeholder="Email" required />
            <textarea rows={4} className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-white/30" placeholder="Message" required />
            <button className="rounded-full bg-white text-black px-6 py-3 font-semibold">Send</button>
          </form>
        </div>
        <div className="rounded-2xl border border-white/10 p-6 bg-gradient-to-br from-white/5 to-white/10">
          <div className="space-y-3 text-white/80">
            <div className="flex items-center gap-2"><Mail size={16}/> tusharkshahi@gmail.com</div>
            <div className="flex items-center gap-2"><Phone size={16}/> +91 7667438270</div>
            <div className="flex items-center gap-2"><MapPin size={16}/> Pune, India</div>
          </div>
          <div className="mt-6 flex gap-3">
            <a className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20" href="https://linkedin.com" target="_blank" rel="noreferrer"><Linkedin size={16}/> LinkedIn</a>
            <a className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20" href="https://github.com" target="_blank" rel="noreferrer"><Github size={16}/> GitHub</a>
            <a className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20" href="https://medium.com" target="_blank" rel="noreferrer"><BookOpen size={16}/> Medium</a>
            <a className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20" href="https://hashnode.com" target="_blank" rel="noreferrer"><Globe size={16}/> Hashnode</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Showcase() {
  return (
    <section id="projects" className="w-full bg-neutral-950 text-white py-24">
      <div className="max-w-7xl mx-auto px-6 space-y-20">
        {/* Projects */}
        <div>
          <div className="text-xl font-semibold mb-6">Projects</div>
          <div className="grid lg:grid-cols-2 gap-6">
            <ProjectCard
              title="PeopleNexus"
              tagline="AI-Powered HR Management System"
              details={[
                '95% resume ranking accuracy',
                'AI interview question generator',
                'Real-time analytics dashboard',
                'Complete HR suite',
              ]}
              badges={["React", "FastAPI", "OpenAI", "Pinecone", "Docker"]}
              actions={(
                <>
                  <a className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black" href="#" target="_blank" rel="noreferrer"><Github size={16}/> GitHub</a>
                  <a className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10" href="#" target="_blank" rel="noreferrer"><Globe size={16}/> Live Demo</a>
                </>
              )}
            />
            <ProjectCard
              title="CloudGuard"
              tagline="Security Vulnerability Scanner"
              details={[
                'Multi-cloud scanning (AWS/Azure)',
                'OWASP ZAP + SonarQube integration',
                'Compliance tracking (CIS, OWASP Top 10)',
                'Automated remediation',
              ]}
              badges={["Python", "boto3", "PostgreSQL", "Docker"]}
              actions={(
                <>
                  <a className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black" href="#" target="_blank" rel="noreferrer"><Github size={16}/> GitHub</a>
                  <a className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10" href="#" target="_blank" rel="noreferrer"><BookOpen size={16}/> Docs</a>
                </>
              )}
            />
          </div>
        </div>

        {/* Skills Cloud */}
        <div id="skills" className="space-y-4">
          <div className="text-xl font-semibold">Skills</div>
          <SkillsCloud />
        </div>

        {/* Achievements */}
        <div id="achievements" className="space-y-4">
          <div className="text-xl font-semibold">Achievements</div>
          <Achievements />
        </div>

        {/* Contact */}
        <Contact />
      </div>
    </section>
  );
}
