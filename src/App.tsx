import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { performDivination, type DivinationResult } from './utils/divination';
import { BookOpen, Sparkles, User, Calendar, Type } from 'lucide-react';
import './index.css';

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
    
    // Simulate calculation time for dramatic effect
    setTimeout(() => {
      const dateObj = new Date(`${formData.date}T${formData.time}`);
      const divination = performDivination(
        formData.name,
        dateObj.getFullYear(),
        dateObj.getMonth() + 1,
        dateObj.getDate(),
        dateObj.getHours(),
        formData.character.charAt(0) // take only the first char
      );
      setResult(divination);
      setIsDivining(false);
    }, 1500);
  };

  const resetForm = () => {
    setResult(null);
    setFormData(prev => ({ ...prev, character: '' })); // reset just the character or everything
  };

  return (
    <div className="app-container">
      <header style={{ textAlign: 'center', marginBottom: '3rem' }} className="fade-in">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: '#fff' }}>
            天机<span className="text-gradient">测字</span>神算
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', fontFamily: 'Inter' }}>
            结合八字命理与《命理四书》，洞悉你的过去与未来。
          </p>
        </motion.div>
      </header>

      <AnimatePresence mode="wait">
        {!result ? (
          <motion.div 
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass-panel"
            style={{ padding: '2rem' }}
          >
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                  <User size={18} /> 您的姓名
                </label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="glass-input" 
                  placeholder="请输入真实姓名"
                  required
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                    <Calendar size={18} /> 出生日期 (公历)
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
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                    时间
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

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                  <Type size={18} /> 所测之字
                </label>
                <input 
                  type="text" 
                  name="character"
                  value={formData.character}
                  onChange={handleInputChange}
                  className="glass-input" 
                  placeholder="请输入一个汉字（如：缘、财、福）"
                  maxLength={1}
                  required
                />
              </div>

              <button 
                type="submit" 
                className="glass-button" 
                style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}
                disabled={isDivining}
              >
                {isDivining ? (
                  <motion.div 
                    animate={{ rotate: 360 }} 
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  >
                    <Sparkles size={20} />
                  </motion.div>
                ) : (
                  <><BookOpen size={20} /> 开始推演</>
                )}
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div 
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-panel"
            style={{ padding: '2rem' }}
          >
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '2rem', color: 'var(--accent-color)', marginBottom: '0.5rem' }}>推演完成</h2>
              <p style={{ color: 'var(--text-secondary)' }}>{formData.name}，这是为您批算的命理报告</p>
            </div>

            <div style={{ display: 'grid', gap: '1.5rem' }}>
              <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '12px' }}>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#fff' }}>
                  <Calendar className="text-gradient" size={20} /> 四柱八字
                </h3>
                <div style={{ display: 'flex', justifyContent: 'space-around', fontSize: '1.2rem', fontWeight: 500, letterSpacing: '0.2em' }}>
                  <span>{result.bazi.split(' ')[0]}</span>
                  <span>{result.bazi.split(' ')[1]}</span>
                  <span>{result.bazi.split(' ')[2]}</span>
                  <span>{result.bazi.split(' ')[3]}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-around', fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                  <span>{result.wuxing.split(' ')[0]}</span>
                  <span>{result.wuxing.split(' ')[1]}</span>
                  <span>{result.wuxing.split(' ')[2]}</span>
                  <span>{result.wuxing.split(' ')[3]}</span>
                </div>
              </div>

              <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '12px' }}>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#fff' }}>
                  <Type className="text-gradient" size={20} /> 测字吉凶 ({formData.character})
                </h3>
                <p style={{ lineHeight: 1.6, color: 'var(--text-primary)' }}>
                  {result.characterAnalysis}
                </p>
              </div>

              <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '12px' }}>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#fff' }}>
                  <BookOpen className="text-gradient" size={20} /> 四书批断
                </h3>
                <p style={{ lineHeight: 1.6, color: 'var(--text-primary)' }}>
                  {result.fourBooksAnalysis}
                </p>
              </div>
              
              <div style={{ textAlign: 'center', marginTop: '1rem', padding: '1rem', border: '1px solid var(--accent-color)', borderRadius: '8px', background: 'rgba(56, 189, 248, 0.05)' }}>
                <h3 style={{ marginBottom: '0.5rem', color: 'var(--accent-color)' }}>总体批断</h3>
                <p style={{ fontSize: '1.2rem', fontWeight: 600 }}>{result.overallFortune}</p>
              </div>

              <button 
                onClick={resetForm}
                className="glass-button" 
                style={{ marginTop: '1rem', width: '100%' }}
              >
                重新测算
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
