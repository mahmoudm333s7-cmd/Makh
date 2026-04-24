import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import siteData from '../data/siteData.json';
import {
  Download, ExternalLink, TestTube, Microscope,
  Database, Send, FileText, ChevronDown, BookOpen,
  Users, Award, GraduationCap, Target,
  Linkedin, Github, Globe, Mail, BookMarked,
  Brain, Lightbulb, Compass, Zap, ClipboardList
} from 'lucide-react';

const sec = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut', staggerChildren: 0.15 } },
};
const child = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const levelColor = (l) => {
  const map = {
    'Learning': 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30',
    'طور التعلم': 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30',
    'Practical Experience': 'text-blue-400 bg-blue-400/10 border-blue-400/30',
    'خبرة عملية': 'text-blue-400 bg-blue-400/10 border-blue-400/30',
    'Applied in Projects': 'text-neon-green bg-neon-green/10 border-neon-green/30',
    'مُطبَّقة في مشاريع': 'text-neon-green bg-neon-green/10 border-neon-green/30',
  };
  return map[l] || 'text-gray-400 bg-gray-400/10 border-gray-400/30';
};

const getIcon = (id) => {
  switch (id) {
    case 'tools': return <Database className="w-5 h-5" />;
    case 'wetLab': return <TestTube className="w-5 h-5" />;
    case 'soft': return <Users className="w-5 h-5" />;
    default: return <Brain className="w-5 h-5" />;
  }
};

const getCatColor = (id) => {
  switch (id) {
    case 'tools': return 'text-neon-blue';
    case 'wetLab': return 'text-neon-green';
    case 'soft': return 'text-purple-400';
    default: return 'text-neon-blue';
  }
};

const Home = () => {
  const { lang } = useAppContext();
  const data = siteData[lang];
  const [activeCategory, setActiveCategory] = useState('tools');
  const [formStatus, setFormStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('submitting');
    const formData = new FormData(e.target);
    
    try {
      // REPLACE 'YOUR_FORMSPREE_ID' WITH YOUR ACTUAL ID FROM FORMSPREE.IO
      const response = await fetch("https://formspree.io/f/xojyrkvd", {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });
      
      if (response.ok) {
        setFormStatus('success');
        e.target.reset();
        setTimeout(() => setFormStatus('idle'), 5000);
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      setFormStatus('error');
    }
  };

  return (
    <div className="flex flex-col gap-28 pb-32">

      {/* ── Hero ── */}
      <section id="home" className="min-h-[90vh] flex flex-col justify-center items-center text-center px-4 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-blue/10 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-green/10 rounded-full blur-[120px] -z-10" />
        <motion.div initial="hidden" animate="visible" variants={sec} className="max-w-4xl z-10">
          <motion.p variants={child} className="text-neon-green font-mono mb-4 text-lg">{data.hero.greeting}</motion.p>
          <motion.h1 variants={child} className="text-5xl md:text-7xl font-heading font-bold mb-6 neon-text-blue">{data.hero.name}</motion.h1>
          <motion.div variants={child} className="flex flex-wrap justify-center gap-4 mb-10">
            {data.hero.roles.map((r, i) => (
              <span key={i} className="px-4 py-2 glass-panel text-sm md:text-base border-neon-blue/30 text-gray-300">{r}</span>
            ))}
          </motion.div>
          <motion.div variants={child} className="flex flex-col sm:flex-row justify-center gap-6">
            <a href="#projects" className="px-8 py-3 bg-neon-blue text-background font-bold rounded-full hover:bg-white transition-colors hover:shadow-neon-blue">
              {data.hero.cta1}
            </a>
            <a href={data.hero.cvUrl} target="_blank" rel="noopener noreferrer" className="px-8 py-3 glass-panel text-neon-green font-bold rounded-full hover:bg-neon-green/10 transition-colors flex items-center justify-center gap-2">
              <Download size={18} /> {data.hero.cta2}
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* ── About & Interests ── */}
      <motion.section id="about" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sec} className="max-w-5xl mx-auto px-4 w-full">
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">{data.about.title}</h2>
          <div className="h-px bg-neon-blue flex-grow opacity-50" />
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div variants={child} className="text-gray-300 leading-relaxed text-lg flex flex-col gap-6">
            <p>{data.about.content}</p>
            <div className="glass-panel p-6 border-l-4 border-l-neon-green bg-neon-green/5 italic text-gray-200">
              "{data.about.researchGoal}"
            </div>
            <p className="text-gray-400">{data.about.differentiation}</p>
            
            <div className="mt-4">
              <h3 className="text-neon-blue font-bold mb-3">{data.interests.title}:</h3>
              <div className="flex flex-wrap gap-3">
                {data.interests.items.map((it, i) => (
                  <span key={i} className="flex items-center gap-2 text-neon-green text-sm font-mono border border-neon-green/30 px-3 py-1 rounded-md bg-neon-green/5">
                    <Microscope size={14} /> {it}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
          <motion.div variants={child} className="relative group flex justify-center">
            <div className="absolute inset-0 bg-neon-blue rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 w-64 h-64 md:w-[320px] md:h-[320px] mx-auto" />
            <div className="glass-panel w-64 h-64 md:w-[320px] md:h-[320px] rounded-full flex items-center justify-center relative overflow-hidden border-2 border-neon-blue/40 shadow-[0_0_15px_rgba(0,242,255,0.2)]">
              <img
                src="/src/assets/Mahmoud Khalaf-Allah.jpeg"
                alt={data.hero.name}
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                onError={(e) => { e.target.src = 'https://via.placeholder.com/320x320/0a0a0a/00f2ff?text=M.K'; }}
              />
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ── Education & Experience ── */}
      <motion.section id="experience" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sec} className="max-w-5xl mx-auto px-4 w-full">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Education */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-white">{data.education.title}</h2>
              <div className="h-px bg-neon-green flex-grow opacity-50" />
            </div>
            <div className="flex flex-col gap-6">
              {data.education.items.map((ed, i) => (
                <div key={i} className="glass-panel p-6 border-neon-green/20 hover:border-neon-green/50 transition-all duration-300">
                  <GraduationCap className="w-8 h-8 text-neon-green mb-4" />
                  <h3 className="text-xl font-bold text-white mb-1">{ed.degree}</h3>
                  <p className="text-neon-green font-medium mb-2">{ed.institution}</p>
                  <p className="text-gray-400 text-sm mb-4">{ed.location}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs font-mono text-neon-blue bg-neon-blue/10 px-2 py-1 rounded">{ed.date}</span>
                    <span className="text-xs font-mono text-purple-400 bg-purple-400/10 px-2 py-1 rounded">{ed.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Experience */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-white">{data.experience.title}</h2>
              <div className="h-px bg-neon-blue flex-grow opacity-50" />
            </div>
            <div className="flex flex-col gap-6">
              {data.experience.items.map((ex, i) => (
                <div key={i} className="glass-panel p-6 border-neon-blue/20 hover:border-neon-blue/50 transition-all duration-300">
                  <TestTube className="w-8 h-8 text-neon-blue mb-4" />
                  <h3 className="text-xl font-bold text-white mb-1">{ex.title}</h3>
                  <p className="text-neon-blue font-medium mb-2">{ex.location}</p>
                  <p className="text-gray-400 text-sm mb-4">{ex.date}</p>
                  <p className="text-gray-300 text-sm leading-relaxed">{ex.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* ── Skills & Learning ── */}
      <motion.section id="skills" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sec} className="max-w-5xl mx-auto px-4 w-full">
        <div className="flex items-center gap-4 mb-12">
          <div className="h-px bg-purple-400 flex-grow opacity-50" />
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">{data.skills.title}</h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 flex flex-col gap-4">
            {data.skills.categories.map((cat) => (
              <div key={cat.id} className="glass-panel overflow-hidden border-white/5">
                <button
                  onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
                  className={`w-full px-6 py-5 flex items-center justify-between transition-colors ${activeCategory === cat.id ? 'bg-white/5' : 'hover:bg-white/5'}`}
                >
                  <div className={`flex items-center gap-4 font-bold text-lg ${getCatColor(cat.id)}`}>
                    {getIcon(cat.id)}
                    <span>{cat.title}</span>
                  </div>
                  <motion.div animate={{ rotate: activeCategory === cat.id ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ChevronDown className="text-gray-500" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {activeCategory === cat.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 pt-2 grid sm:grid-cols-2 gap-4">
                        {cat.items.map((skill, i) => (
                          <div key={i} className="flex flex-col gap-2 glass-panel p-3 border-white/5 bg-black/20">
                            <span className="text-gray-200 text-sm font-bold">{skill.name}</span>
                            <span className={`text-xs font-mono px-2 py-1 rounded w-fit border ${levelColor(skill.level)}`}>
                              {skill.level}
                            </span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
          
          <div className="flex flex-col gap-6">
            <div className="glass-panel p-6 border-yellow-400/20 bg-yellow-400/5">
              <h3 className="text-xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
                <Brain className="w-5 h-5" /> {data.learning.title}
              </h3>
              <ul className="space-y-3">
                {data.learning.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                    <Zap className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass-panel p-6 border-neon-blue/20 bg-neon-blue/5">
              <h3 className="text-xl font-bold text-neon-blue mb-4 flex items-center gap-2">
                <Compass className="w-5 h-5" /> {data.capabilities.title}
              </h3>
              <ul className="space-y-3">
                {data.capabilities.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-300 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-neon-blue shrink-0 mt-1.5" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ── Goals ── */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={sec} className="max-w-4xl mx-auto px-4 w-full">
        <motion.div variants={child} className="glass-panel p-8 md:p-10 border-purple-500/30 relative overflow-hidden flex flex-col md:flex-row gap-8 items-center">
          <div className="absolute -top-16 -right-16 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl" />
          <div className="w-20 h-20 rounded-full bg-purple-500/10 flex items-center justify-center shrink-0 border border-purple-500/30">
            <Target className="w-10 h-10 text-purple-400" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-purple-400 mb-4">{data.goals.title}</h2>
            <ul className="space-y-3">
              {data.goals.items.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-300">
                  <div className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0 text-xs font-bold border border-purple-500/30">
                    {i + 1}
                  </div>
                  <span className="mt-0.5">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </motion.section>

      {/* ── Projects ── */}
      <motion.section id="projects" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sec} className="max-w-6xl mx-auto px-4 w-full">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-16 neon-text-blue">{data.projects.title}</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {data.projects.items.map((proj, i) => (
            <motion.div key={i} variants={child} className="glass-panel p-8 hover:-translate-y-1 transition-all duration-300 group border-neon-blue/20 hover:border-neon-blue/50 flex flex-col h-full bg-surface/60">
              <div className="flex justify-between items-start mb-6">
                <FileText className="w-8 h-8 text-neon-blue group-hover:text-neon-green transition-colors" />
                {proj.fileUrl && (
                  <a href={proj.fileUrl} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded-full bg-neon-blue/10 text-neon-blue text-xs font-bold border border-neon-blue/30 hover:bg-neon-blue hover:text-black transition-colors flex items-center gap-1">
                    <ExternalLink size={14} /> {lang === 'en' ? 'View File' : 'عرض الملف'}
                  </a>
                )}
              </div>
              <h3 className="text-2xl font-bold mb-6 text-white">{proj.title}</h3>
              
              <div className="flex flex-col gap-4 mb-8 flex-grow text-sm">
                <div>
                  <h4 className="text-neon-blue font-bold mb-1 opacity-80">{lang === 'en' ? 'Problem:' : 'المشكلة:'}</h4>
                  <p className="text-gray-300">{proj.problem}</p>
                </div>
                <div>
                  <h4 className="text-purple-400 font-bold mb-1 opacity-80">{lang === 'en' ? 'Method:' : 'الطريقة:'}</h4>
                  <p className="text-gray-300">{proj.method}</p>
                </div>
                <div>
                  <h4 className="text-neon-green font-bold mb-1 opacity-80">{lang === 'en' ? 'Result:' : 'النتيجة:'}</h4>
                  <p className="text-gray-300">{proj.result}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 mt-auto">
                <h4 className="text-xs text-gray-500 font-mono mb-2 uppercase tracking-wider">{lang === 'en' ? 'Tools & Technologies' : 'الأدوات والتقنيات'}</h4>
                <div className="flex flex-wrap gap-2">
                  {proj.tools.map((tag, j) => (
                    <span key={j} className="text-xs font-mono text-gray-300 bg-white/5 border border-white/10 px-2 py-1 rounded">{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ── Reports ── */}
      <motion.section id="reports" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sec} className="max-w-5xl mx-auto px-4 w-full">
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">{data.reports.title}</h2>
          <div className="h-px bg-neon-green flex-grow opacity-50" />
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {data.reports.items.map((report, i) => (
            <motion.div key={i} variants={child} className="glass-panel p-6 border-neon-green/20 hover:border-neon-green/50 transition-all duration-300 group flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-neon-green/10 flex items-center justify-center shrink-0">
                <ClipboardList className="w-6 h-6 text-neon-green" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-2">{report.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{report.desc}</p>
                <a href={report.fileUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-neon-green hover:text-white transition-colors text-sm font-bold">
                  <Download size={14} /> {lang === 'en' ? 'Download Report' : 'تحميل التقرير'}
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ── Publications ── */}
      <motion.section id="publications" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sec} className="max-w-4xl mx-auto px-4 w-full">
        <div className="flex items-center gap-4 mb-12">
          <div className="h-px bg-purple-400 flex-grow opacity-50" />
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">{data.publications.title}</h2>
        </div>
        <div className="flex flex-col gap-6">
          {data.publications.items.map((pub, i) => (
            <motion.div key={i} variants={child} className="glass-panel p-6 border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 group">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <BookMarked className="w-6 h-6 text-purple-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-2">{pub.title}</h3>
                  <div className="flex flex-wrap gap-3 items-center">
                    <span className="text-xs font-mono text-purple-400 bg-purple-400/10 border border-purple-400/30 px-3 py-1 rounded-full">{pub.type}</span>
                    <span className="text-xs text-gray-400 font-mono">{pub.date}</span>
                    {pub.link && (
                      <a href={pub.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-neon-blue bg-neon-blue/10 px-3 py-1 rounded-full border border-neon-blue/30 hover:bg-neon-blue hover:text-black transition-colors ml-auto">
                        <Download size={12} /> {lang === 'en' ? 'Download PDF' : 'تحميل PDF'}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ── Certificates ── */}
      <motion.section id="certificates" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sec} className="max-w-6xl mx-auto px-4 w-full">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-16 text-purple-400 drop-shadow-[0_0_10px_rgba(192,132,252,0.5)]">{data.certificates.title}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.certificates.items.map((cert, i) => (
            <motion.div key={i} variants={child} className="glass-panel p-6 border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 group flex flex-col items-center text-center hover:shadow-[0_0_20px_rgba(192,132,252,0.15)]">
              <div className="w-16 h-16 rounded-full bg-purple-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Award className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">{cert.title}</h3>
              <p className="text-gray-400 text-sm mb-1">{cert.issuer}</p>
              <p className="text-purple-400/80 font-mono text-xs mb-6">{cert.date}</p>
              {cert.fileUrl ? (
                <a href={cert.fileUrl} target="_blank" rel="noopener noreferrer"
                  className="mt-auto px-6 py-2 border border-purple-500/30 text-purple-400 rounded-full text-sm hover:bg-purple-500/10 transition-colors">
                  {lang === 'en' ? 'View Certificate' : 'عرض الشهادة'}
                </a>
              ) : (
                <span className="mt-auto px-6 py-2 border border-gray-600/30 text-gray-500 rounded-full text-sm cursor-not-allowed">
                  {lang === 'en' ? 'File Not Available' : 'الملف غير متوفر'}
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ── Contact ── */}
      <motion.section id="contact" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sec} className="max-w-3xl mx-auto px-4 w-full">
        <div className="glass-panel p-8 md:p-12 border-neon-green/20 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-neon-green/20 rounded-full blur-3xl" />
          <h2 className="text-3xl font-heading font-bold mb-4 text-center neon-text-green">{data.contact.title}</h2>

          <div className="flex justify-center mb-6">
            <a href={`mailto:${data.contact.academicEmail}`} className="flex items-center gap-2 text-gray-300 hover:text-neon-green transition-colors font-mono text-sm">
              <Mail size={16} className="text-neon-green" /> {data.contact.academicEmail}
            </a>
          </div>

          <div className="flex justify-center flex-wrap gap-4 mb-8 relative z-10">
            {data.contact.social.map((s, i) => {
              const icons = { LinkedIn: <Linkedin size={18} />, GitHub: <Github size={18} />, ResearchGate: <Globe size={18} /> };
              return (
                <a key={i} href={s.url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-400 hover:text-neon-green border border-white/10 hover:border-neon-green/40 px-4 py-2 rounded-full text-sm transition-all bg-black/20">
                  {icons[s.platform]} {s.platform}
                </a>
              );
            })}
          </div>

          <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
            {formStatus === 'success' && (
              <div className="bg-neon-green/20 border border-neon-green text-neon-green px-4 py-3 rounded text-center font-bold">
                {data.contact.form.successMsg}
              </div>
            )}
            {formStatus === 'error' && (
              <div className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-3 rounded text-center font-bold">
                {data.contact.form.errorMsg}
                <div className="text-xs mt-1 opacity-80">(يجب إضافة كود Formspree الخاص بك في الكود لتعمل)</div>
              </div>
            )}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">{data.contact.form.nameLabel}</label>
                <input type="text" name="name" required className="w-full bg-surface/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-green focus:ring-1 focus:ring-neon-green transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">{data.contact.form.emailLabel}</label>
                <input type="email" name="email" required className="w-full bg-surface/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-green focus:ring-1 focus:ring-neon-green transition-colors" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">{data.contact.form.msgLabel}</label>
              <textarea name="message" required rows="4" className="w-full bg-surface/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-green focus:ring-1 focus:ring-neon-green transition-colors" />
            </div>
            <button disabled={formStatus === 'submitting'} className="w-full bg-neon-green text-background font-bold py-4 rounded-lg hover:bg-white transition-colors flex items-center justify-center gap-2 hover:shadow-neon-green group disabled:opacity-50">
              <Send className="w-5 h-5 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
              {formStatus === 'submitting' ? '...' : data.contact.form.submit}
            </button>
          </form>
        </div>
      </motion.section>

      {/* ── Footer ── */}
      <footer className="text-center text-gray-500 font-mono text-sm">
        <p>© {new Date().getFullYear()} {data.hero.name}. System Online.</p>
      </footer>

    </div>
  );
};

export default Home;
