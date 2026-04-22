import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import siteData from '../data/siteData.json';
import { 
  Download, 
  ExternalLink, 
  TestTube, 
  Microscope, 
  Database, 
  Send, 
  FileText, 
  ChevronDown, 
  BookOpen, 
  Users,
  Award
} from 'lucide-react';

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.2 } }
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const Home = () => {
  const { lang } = useAppContext();
  const data = siteData[lang];
  const [activeCategory, setActiveCategory] = useState('dryLab');

  const getIcon = (id) => {
    switch (id) {
      case 'dryLab': return <Database className="w-6 h-6" />;
      case 'wetLab': return <TestTube className="w-6 h-6" />;
      case 'scientific': return <BookOpen className="w-6 h-6" />;
      case 'soft': return <Users className="w-6 h-6" />;
      default: return <Database className="w-6 h-6" />;
    }
  };

  const getCategoryColor = (id) => {
    switch (id) {
      case 'dryLab': return 'text-neon-blue border-neon-blue/30';
      case 'wetLab': return 'text-neon-green border-neon-green/30';
      case 'scientific': return 'text-purple-400 border-purple-400/30';
      case 'soft': return 'text-orange-400 border-orange-400/30';
      default: return 'text-neon-blue border-neon-blue/30';
    }
  };

  const getProgressColor = (id) => {
    switch (id) {
      case 'dryLab': return 'bg-neon-blue';
      case 'wetLab': return 'bg-neon-green';
      case 'scientific': return 'bg-purple-400';
      case 'soft': return 'bg-orange-400';
      default: return 'bg-neon-blue';
    }
  };

  return (
    <div className="flex flex-col gap-32 pb-32">
      
      {/* Hero Section */}
      <section id="home" className="min-h-[90vh] flex flex-col justify-center items-center text-center px-4 relative overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-blue/10 rounded-full blur-[120px] -z-10"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-green/10 rounded-full blur-[120px] -z-10"></div>
        
        <motion.div 
          initial="hidden" animate="visible" variants={sectionVariants}
          className="max-w-4xl z-10"
        >
          <motion.p variants={childVariants} className="text-neon-green font-mono mb-4 text-lg">
            {data.hero.greeting}
          </motion.p>
          <motion.h1 variants={childVariants} className="text-5xl md:text-7xl font-heading font-bold mb-6 neon-text-blue">
            {data.hero.name}
          </motion.h1>
          <motion.div variants={childVariants} className="flex flex-wrap justify-center gap-4 mb-10">
            {data.hero.roles.map((role, idx) => (
              <span key={idx} className="px-4 py-2 glass-panel text-sm md:text-base border-neon-blue/30 text-gray-300">
                {role}
              </span>
            ))}
          </motion.div>
          <motion.div variants={childVariants} className="flex flex-col sm:flex-row justify-center gap-6">
            <a href="#projects" className="px-8 py-3 bg-neon-blue text-background font-bold rounded-full hover:bg-white transition-colors hover:shadow-neon-blue">
              {data.hero.cta1}
            </a>
            <a href="#cv" className="px-8 py-3 glass-panel text-neon-green font-bold rounded-full hover:bg-neon-green/10 transition-colors flex items-center justify-center gap-2">
              <Download size={18} /> {data.hero.cta2}
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <motion.section 
        id="about" 
        initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={sectionVariants}
        className="max-w-5xl mx-auto px-4 w-full"
      >
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">{data.about.title}</h2>
          <div className="h-px bg-neon-blue flex-grow opacity-50"></div>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div variants={childVariants} className="text-gray-300 leading-relaxed text-lg">
            <p className="mb-6">{data.about.content}</p>
            <div className="flex flex-wrap gap-3 mt-8">
              {data.about.interests.map((interest, idx) => (
                <span key={idx} className="flex items-center gap-2 text-neon-green text-sm font-mono border border-neon-green/30 px-3 py-1 rounded-md bg-neon-green/5">
                  <TestTube size={14} /> {interest}
                </span>
              ))}
            </div>
          </motion.div>
          <motion.div variants={childVariants} className="relative group flex justify-center">
            <div className="absolute inset-0 bg-neon-blue rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 w-64 h-64 md:w-[320px] md:h-[320px] mx-auto"></div>
            <div className="glass-panel w-64 h-64 md:w-[320px] md:h-[320px] rounded-full flex items-center justify-center relative overflow-hidden border-2 border-neon-blue/40 shadow-[0_0_15px_rgba(0,242,255,0.2)]">
              <img 
                src="/src/assets/Mahmoud%20Khalaf-Allah.jpeg" 
                alt={data.hero.name}
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/320x320/0a0a0a/00f2ff?text=Your+Photo+Here";
                }}
              />
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Skills Section */}
      <motion.section 
        id="skills" 
        initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={sectionVariants}
        className="max-w-4xl mx-auto px-4 w-full"
      >
        <div className="flex items-center gap-4 mb-12">
          <div className="h-px bg-neon-green flex-grow opacity-50"></div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">{data.skills.title}</h2>
        </div>
        
        <div className="flex flex-col gap-4">
          {data.skills.categories.map((category) => (
            <div key={category.id} className="glass-panel overflow-hidden border-white/5">
              <button 
                onClick={() => setActiveCategory(activeCategory === category.id ? null : category.id)}
                className={`w-full px-6 py-5 flex items-center justify-between transition-colors ${activeCategory === category.id ? 'bg-white/5' : 'hover:bg-white/5'}`}
              >
                <div className={`flex items-center gap-4 font-bold text-lg ${getCategoryColor(category.id).split(' ')[0]}`}>
                  {getIcon(category.id)}
                  <span>{category.title}</span>
                </div>
                <motion.div
                  animate={{ rotate: activeCategory === category.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="text-gray-500" />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {activeCategory === category.id && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-8 pt-2 grid md:grid-cols-2 gap-x-12 gap-y-6">
                      {category.items.map((skill, i) => (
                        <div key={i}>
                          <div className="flex justify-between mb-2 text-sm text-gray-300">
                            <span>{skill.name}</span>
                            <span className={getCategoryColor(category.id).split(' ')[0]}>{skill.level}%</span>
                          </div>
                          <div className="h-1.5 bg-surface rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }} 
                              animate={{ width: `${skill.level}%` }} 
                              transition={{ duration: 1, delay: 0.1 }}
                              className={`h-full ${getProgressColor(category.id)}`}
                            ></motion.div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Projects Section */}
      <motion.section 
        id="projects" 
        initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariants}
        className="max-w-6xl mx-auto px-4 w-full"
      >
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-16 neon-text-blue">{data.projects.title}</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {data.projects.items.map((project, i) => (
            <motion.div 
              key={i} variants={childVariants} 
              className="glass-panel p-8 hover:-translate-y-2 hover:shadow-neon-blue transition-all duration-300 group border-neon-blue/10 hover:border-neon-blue/40 flex flex-col"
            >
              <div className="flex justify-between items-start mb-6">
                <FileText className="w-10 h-10 text-neon-blue group-hover:text-neon-green transition-colors" />
                {project.fileUrl && (
                  <a href={project.fileUrl} target="_blank" rel="noopener noreferrer" className="cursor-pointer">
                    <ExternalLink className="w-5 h-5 text-gray-500 hover:text-white transition-colors" />
                  </a>
                )}
              </div>
              <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
              <p className="text-gray-400 mb-6 flex-grow">{project.desc}</p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tags.map((tag, j) => (
                  <span key={j} className="text-xs font-mono text-neon-blue bg-neon-blue/10 px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Certificates Section */}
      <motion.section 
        id="certificates" 
        initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariants}
        className="max-w-6xl mx-auto px-4 w-full"
      >
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-16 text-purple-400 drop-shadow-[0_0_10px_rgba(192,132,252,0.5)]">{data.certificates.title}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.certificates.items.map((cert, i) => (
            <motion.div 
              key={i} variants={childVariants} 
              className="glass-panel p-6 border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 group flex flex-col items-center text-center hover:shadow-[0_0_20px_rgba(192,132,252,0.15)]"
            >
              <div className="w-16 h-16 rounded-full bg-purple-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Award className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">{cert.title}</h3>
              <p className="text-gray-400 text-sm mb-1">{cert.issuer}</p>
              <p className="text-purple-400/80 font-mono text-xs mb-6">{cert.date}</p>
              
              {cert.fileUrl ? (
                <a 
                  href={cert.fileUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="mt-auto px-6 py-2 border border-purple-500/30 text-purple-400 rounded-full text-sm hover:bg-purple-500/10 transition-colors"
                >
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

      {/* Contact Section */}
      <motion.section 
        id="contact" 
        initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={sectionVariants}
        className="max-w-3xl mx-auto px-4 w-full"
      >
        <div className="glass-panel p-8 md:p-12 border-neon-green/20 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-neon-green/20 rounded-full blur-3xl"></div>
          
          <h2 className="text-3xl font-heading font-bold mb-8 text-center neon-text-green">{data.contact.title}</h2>
          
          <form className="space-y-6 relative z-10" onSubmit={(e) => e.preventDefault()}>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">{data.contact.nameLabel}</label>
                <input type="text" className="w-full bg-surface/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-green focus:ring-1 focus:ring-neon-green transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">{data.contact.emailLabel}</label>
                <input type="email" className="w-full bg-surface/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-green focus:ring-1 focus:ring-neon-green transition-colors" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">{data.contact.msgLabel}</label>
              <textarea rows="4" className="w-full bg-surface/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-green focus:ring-1 focus:ring-neon-green transition-colors"></textarea>
            </div>
            <button className="w-full bg-neon-green text-background font-bold py-4 rounded-lg hover:bg-white transition-colors flex items-center justify-center gap-2 hover:shadow-neon-green group">
              <Send className="w-5 h-5 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
              {data.contact.submit}
            </button>
          </form>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="text-center text-gray-500 font-mono text-sm">
        <p>© {new Date().getFullYear()} {data.hero.name}. System Online.</p>
      </footer>

    </div>
  );
};

export default Home;
