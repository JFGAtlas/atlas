import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { performDivination, type DivinationResult } from './utils/divination';
import { BookOpen, Sparkles, User, Calendar, Type, Compass, Star, Moon, Sun } from 'lucide-react';
import './index.css';

const containerVariants: any = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants: any = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

function App() {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: '12:00',
    character: ''
  });
  
  const [isDivining, setIsDivining] = useState(false);
  const [result, setResult] = useState<DivinationResult | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.date || !formData.character) return;

    setIsDivining(true);
    
    setTimeout(() => {
      const dateObj = new Date(`${formData.date}T${formData.time}`);
      const divination = performDivination(
        formData.name,
        dateObj.getFullYear(),
        dateObj.getMonth() + 1,
        dateObj.getDate(),
        dateObj.getHours(),
        formData.character.charAt(0)
      );
      setResult(divination);
      setIsDivining(false);
    }, 2000);
  };

  const resetForm = () => {
    setResult(null);
  };

  return (
    <>
      <div className="bg-orb-1"></div>
      <div className="bg-orb-2"></div>
      
      <div className="app-container">
        <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <motion.div 
            initial={{ scale: 0.8, opacity: 0, y: -20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(251, 191, 36, 0.1)', padding: '0.5rem 1rem', borderRadius: '99px', marginBottom: '1rem', border: '1px solid rgba(251, 191, 36, 0.2)' }}>
              <Compass size={16} style={{ color: '#fbbf24', marginRight: '0.5rem' }} />
              <span style={{ color: '#fbbf24', fontSize: '0.85rem', fontWeight: 500, letterSpacing: '0.1em' }}>道法自然 · 洞察天机</span>
            </div>
            <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', color: '#fff', lineHeight: 1.2 }}>
              天机<span className="text-gradient">测字</span>神算
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto', lineHeight: 1.6 }}>
              结合八字命理与《滴天髓》《渊海子平》等命理四书，为您揭示字中玄机与人生轨迹。
            </p>
          </motion.div>
        </header>

        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div 
              key="form"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30, filter: 'blur(10px)' }}
              transition={{ duration: 0.5 }}
              className="glass-panel"
              style={{ padding: '2.5rem' }}
            >
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#e2e8f0', fontWeight: 500 }}>
                    <User size={18} className="text-gradient-purple" /> 您的姓名
                  </label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="glass-input" 
                    placeholder="请输入真实姓名以承载气运"
                    required
                  />
                </div>

                <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                  <div style={{ flex: '2 1 200px', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#e2e8f0', fontWeight: 500 }}>
                      <Calendar size={18} className="text-gradient-purple" /> 出生日期 (公历)
                    </label>
                    <input 
                      type="date" 
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="glass-input" 
                      required
                    />
                  </div>
                  <div style={{ flex: '1 1 100px', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#e2e8f0', fontWeight: 500 }}>
                      <Sun size={18} className="text-gradient-purple" /> 出生时间
                    </label>
                    <input 
                      type="time" 
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      className="glass-input" 
                      required
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#e2e8f0', fontWeight: 500 }}>
                    <Type size={18} className="text-gradient-purple" /> 所测之字
                  </label>
                  <input 
                    type="text" 
                    name="character"
                    value={formData.character}
                    onChange={handleInputChange}
                    className="glass-input" 
                    placeholder="请输入一个汉字（如：缘、财、福、道）"
                    maxLength={1}
                    required
                    style={{ fontSize: '1.2rem', textAlign: 'center', letterSpacing: '0.5rem' }}
                  />
                </div>

                <button 
                  type="submit" 
                  className="glass-button" 
                  style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', height: '56px' }}
                  disabled={isDivining}
                >
                  {isDivining ? (
                    <motion.div 
                      animate={{ rotate: 360 }} 
                      transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                      style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                      <Sparkles size={20} /> <span style={{letterSpacing: '0.2em'}}>推演中...</span>
                    </motion.div>
                  ) : (
                    <><BookOpen size={20} /> 开启命运推演</>
                  )}
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div 
              key="result"
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="glass-panel"
              style={{ padding: '3rem 2rem' }}
            >
              <motion.div variants={itemVariants} style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <div style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(192, 132, 252, 0.1)', border: '1px solid rgba(192, 132, 252, 0.3)', marginBottom: '1rem' }}>
                  <Moon size={32} style={{ color: '#c084fc' }} />
                </div>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }} className="text-gradient">天机已现</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>{formData.name}，此乃您的专属命理批断</p>
              </motion.div>

              <div style={{ display: 'grid', gap: '1.5rem' }}>
                <motion.div variants={itemVariants} className="result-card">
                  <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', color: '#fff' }}>
                    <Calendar className="text-gradient-purple" size={20} /> 四柱八字排盘
                  </h3>
                  <div className="bazi-grid">
                    {[0, 1, 2, 3].map(i => (
                      <div key={i} className="bazi-pillar">
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{['年柱', '月柱', '日柱', '时柱'][i]}</span>
                        <span className="bazi-char">{result.bazi.split(' ')[i]}</span>
                        <span className="bazi-wx">{result.wuxing.split(' ')[i]}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="result-card" style={{ position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: '-20px', right: '-20px', fontSize: '12rem', color: 'rgba(255,255,255,0.03)', fontFamily: 'Noto Serif SC', lineHeight: 1, pointerEvents: 'none' }}>
                    {formData.character}
                  </div>
                  <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#fff', position: 'relative', zIndex: 1 }}>
                    <Type className="text-gradient-purple" size={20} /> 测字吉凶
                  </h3>
                  <p style={{ lineHeight: 1.8, color: 'var(--text-primary)', fontSize: '1.1rem', position: 'relative', zIndex: 1 }}>
                    {result.characterAnalysis}
                  </p>
                </motion.div>

                <motion.div variants={itemVariants} className="result-card">
                  <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#fff' }}>
                    <BookOpen className="text-gradient-purple" size={20} /> 命理四书批断
                  </h3>
                  <p style={{ lineHeight: 1.8, color: 'var(--text-primary)', fontSize: '1.1rem' }}>
                    {result.fourBooksAnalysis}
                  </p>
                </motion.div>
                
                <motion.div variants={itemVariants} className="result-card" style={{ textAlign: 'center', background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.1), rgba(245, 158, 11, 0.05))', borderColor: 'rgba(251, 191, 36, 0.2)' }}>
                  <h3 style={{ marginBottom: '1rem', color: '#fbbf24', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
                    <Star size={20} /> 总体运势批断
                  </h3>
                  <p style={{ fontSize: '1.5rem', fontWeight: 600, color: '#fff', letterSpacing: '0.05em' }}>{result.overallFortune}</p>
                </motion.div>

                <motion.button 
                  variants={itemVariants}
                  onClick={resetForm}
                  className="glass-button secondary" 
                  style={{ marginTop: '1rem', width: '100%', height: '56px' }}
                >
                  再次测算
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default App;
