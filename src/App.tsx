import React, { useState, useEffect } from 'react';
import { Shield, FileSearch, CheckCircle, AlertCircle, Download, Loader2, Languages, Book, FileCheck, Zap, Search, Cpu } from 'lucide-react';
import { FileUploader } from './components/FileUploader';
import { performAudit, AuditResult } from './services/auditService';

type AuditStage = 'idle' | 'parsing' | 'glossary' | 'analyzing' | 'finalizing' | 'complete';

export default function App() {
  const [chineseSource, setChineseSource] = useState('');
  const [englishTranslation, setEnglishTranslation] = useState('');
  const [glossary, setGlossary] = useState('');
  const [isAuditing, setIsAuditing] = useState(false);
  const [stage, setStage] = useState<AuditStage>('idle');
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<AuditResult | null>(null);

  // Progress simulation
  useEffect(() => {
    let interval: number;
    if (isAuditing) {
      interval = window.setInterval(() => {
        setProgress(prev => {
          if (prev < 20) return prev + 2; // Parsing
          if (prev < 45) return prev + 1; // Glossary
          if (prev < 90) return prev + 0.5; // Analyzing (slowest)
          return prev;
        });
      }, 200);
    } else {
      setProgress(0);
    }
    return () => clearInterval(interval);
  }, [isAuditing]);

  useEffect(() => {
    if (progress < 20) setStage('parsing');
    else if (progress < 45) setStage('glossary');
    else if (progress < 90) setStage('analyzing');
    else if (progress < 100) setStage('finalizing');
  }, [progress]);

  const handleAudit = async () => {
    if (!chineseSource || !englishTranslation || !glossary) {
      alert('Please provide all three inputs (Source, Translation, and Glossary).');
      return;
    }

    setIsAuditing(true);
    setResult(null);
    setProgress(0);
    
    try {
      const auditResult = await performAudit(chineseSource, englishTranslation, glossary);
      setProgress(100);
      setStage('complete');
      setResult(auditResult);
    } catch (error) {
      console.error('Audit failed:', error);
      alert('Failed to perform audit. Please check your API key and inputs.');
      setStage('idle');
    } finally {
      setIsAuditing(false);
    }
  };

  const downloadResult = () => {
    if (!result) return;
    const content = `Audit Summary:\n${result.summary}\n\nFull Audit Details:\n` + 
      result.auditSegments.map(s => {
        const typeStr = s.type === 'normal' ? '' : ` [${s.type.toUpperCase()}]`;
        return `${s.text}${typeStr}${s.comment ? ` (Note: ${s.comment})` : ''}`;
      }).join('');
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'audit-report.txt';
    a.click();
  };

  const getStageText = () => {
    switch (stage) {
      case 'parsing': return 'Extracting text from documents...';
      case 'glossary': return 'Cross-referencing technical glossary...';
      case 'analyzing': return 'AI Engine performing deep linguistic audit...';
      case 'finalizing': return 'Generating annotated report...';
      case 'complete': return 'Audit Complete';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] font-sans text-slate-900">
      {/* Header */}
      <header className="bg-slate-900 text-white border-b border-slate-800 px-8 py-4 flex justify-between items-center sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-500 p-2 rounded-lg shadow-lg shadow-indigo-500/20">
            <Shield size={24} />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">X-Audit</h1>
            <p className="text-[10px] text-slate-400 font-mono uppercase tracking-widest">Technical Translation Verifier</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={handleAudit}
            disabled={isAuditing || !chineseSource || !englishTranslation || !glossary}
            className="flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-700 disabled:text-slate-500 rounded-lg font-bold text-sm transition-all shadow-lg shadow-indigo-600/20"
          >
            {isAuditing ? <Loader2 className="animate-spin" size={18} /> : <Zap size={18} />}
            {isAuditing ? 'Auditing...' : 'Run Fast Audit'}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Input Section */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <h2 className="text-sm font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Languages size={18} className="text-indigo-500" /> Input Data
            </h2>
            
            <div className="space-y-6">
              <FileUploader 
                label="Chinese Source" 
                value={chineseSource} 
                onChange={setChineseSource} 
                icon={<FileSearch size={14} />}
                placeholder="Chinese text"
              />
              <FileUploader 
                label="English Translation" 
                value={englishTranslation} 
                onChange={setEnglishTranslation} 
                icon={<Languages size={14} />}
                placeholder="English translation"
              />
              <FileUploader 
                label="Technical Glossary" 
                value={glossary} 
                onChange={setGlossary} 
                icon={<Book size={14} />}
                placeholder="Glossary/Corpus"
              />
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 min-h-[600px] flex flex-col overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <FileCheck size={18} className="text-emerald-500" /> Audit Results
              </h2>
              {result && (
                <button 
                  onClick={downloadResult}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                >
                  <Download size={14} /> Export Report
                </button>
              )}
            </div>

            {/* Progress Bar Container */}
            {isAuditing && (
              <div className="bg-slate-50 border-b border-slate-100 p-6 space-y-4 animate-in slide-in-from-top duration-300">
                <div className="flex justify-between items-end mb-1">
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest flex items-center gap-2">
                      <Search size={12} className="animate-pulse" /> {getStageText()}
                    </p>
                    <p className="text-[10px] text-slate-400">Processing large technical documents can take 10-30 seconds.</p>
                  </div>
                  <span className="text-sm font-mono font-bold text-slate-900">{Math.round(progress)}%</span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-indigo-500 transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="grid grid-cols-4 gap-2">
                  <ProgressStep active={progress >= 0} label="Parse" />
                  <ProgressStep active={progress >= 20} label="Glossary" />
                  <ProgressStep active={progress >= 45} label="AI Audit" />
                  <ProgressStep active={progress >= 90} label="Finalize" />
                </div>
              </div>
            )}

            <div className="flex-1 p-8 overflow-y-visible">
              {!result && !isAuditing && (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-4">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center border border-slate-100">
                    <FileSearch size={32} className="text-slate-200" />
                  </div>
                  <p className="text-sm">Upload files and click "Run Fast Audit" to see results</p>
                </div>
              )}

              {result && (
                <div className="space-y-8 animate-in fade-in duration-500 pb-32">
                  {/* Summary Box */}
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                    <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Executive Summary</h3>
                    <p className="text-sm text-slate-700 leading-relaxed italic">"{result.summary}"</p>
                  </div>

                  {/* Highlighted Text */}
                  <div className="space-y-4">
                    <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Annotated Full Translation</h3>
                    <div className="p-8 bg-white rounded-2xl border border-slate-200 text-base leading-relaxed font-sans shadow-inner">
                      <div className="whitespace-pre-wrap relative">
                        {result.auditSegments.map((segment, idx) => (
                          <span 
                            key={idx}
                            className={`relative group cursor-help transition-all inline ${
                              segment.type === 'branding' ? 'bg-indigo-100 text-indigo-900 font-semibold px-0.5 rounded' :
                              segment.type === 'standard' ? 'bg-emerald-100 text-emerald-900 font-semibold px-0.5 rounded' :
                              segment.type === 'error' ? 'bg-rose-100 text-rose-900 font-bold px-0.5 rounded border-b-2 border-rose-500' :
                              ''
                            }`}
                          >
                            {segment.text}
                            {(segment.comment || segment.suggestion) && (
                              <span className="absolute bottom-full left-0 mb-2 w-72 p-4 bg-slate-900 text-white text-xs rounded-xl opacity-0 group-hover:opacity-100 transition-all pointer-events-none z-[100] shadow-2xl font-sans leading-normal border border-slate-700 invisible group-hover:visible translate-y-2 group-hover:translate-y-0">
                                {segment.type !== 'normal' && (
                                  <div className={`flex items-center gap-2 uppercase font-black text-[10px] mb-2 ${
                                    segment.type === 'branding' ? 'text-indigo-400' :
                                    segment.type === 'standard' ? 'text-emerald-400' :
                                    'text-rose-400'
                                  }`}>
                                    {segment.type === 'error' ? <AlertCircle size={12} /> : <CheckCircle size={12} />}
                                    {segment.type}
                                  </div>
                                )}
                                {segment.comment && <p className="mb-2 text-slate-100">{segment.comment}</p>}
                                {segment.suggestion && (
                                  <div className="text-slate-400 italic mt-2 pt-2 border-t border-slate-700">
                                    <span className="text-[10px] font-bold uppercase block mb-1 text-slate-500">Suggestion</span>
                                    {segment.suggestion}
                                  </div>
                                )}
                                <div className="absolute top-full left-4 border-8 border-transparent border-t-slate-900"></div>
                              </span>
                            )}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Legend */}
                  <div className="flex flex-wrap gap-4 pt-8 border-t border-slate-100">
                    <LegendItem color="bg-indigo-500" label="Branding Term" />
                    <LegendItem color="bg-emerald-500" label="Industry Standard" />
                    <LegendItem color="bg-rose-500" label="Correction Required" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function LegendItem({ color, label }: { color: string, label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-3 h-3 rounded-full ${color}`}></div>
      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{label}</span>
    </div>
  );
}

function ProgressStep({ active, label }: { active: boolean, label: string }) {
  return (
    <div className="flex flex-col gap-1">
      <div className={`h-1 rounded-full transition-colors duration-500 ${active ? 'bg-indigo-500' : 'bg-slate-200'}`} />
      <span className={`text-[8px] font-bold uppercase tracking-tighter text-center ${active ? 'text-indigo-600' : 'text-slate-300'}`}>
        {label}
      </span>
    </div>
  );
}
