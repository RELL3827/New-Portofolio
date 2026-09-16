import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Download, 
  Printer, 
  ExternalLink, 
  FileText, 
  Eye, 
  Phone, 
  Mail, 
  MapPin, 
  GraduationCap, 
  Briefcase, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight,
  ZoomIn,
  ZoomOut,
  RotateCcw
} from 'lucide-react';
import { personalData, educationData, experienceData } from '../data/portfolioData';

export default function CvModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('digital'); // 'digital' | 'original'
  const [zoomLevel, setZoomLevel] = useState(1);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#020408]/85 backdrop-blur-xl transition-opacity"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-4xl max-h-[92vh] bg-[#070b14] border border-[#2c67ed]/40 rounded-2xl sm:rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_35px_rgba(44,103,237,0.25)] flex flex-col overflow-hidden z-10"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cv-modal-title"
          >
            {/* Top Bar Header */}
            <div className="px-5 sm:px-8 py-4 border-b border-white/10 flex flex-wrap items-center justify-between gap-3 bg-[#0a1124]/90 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#2c67ed] to-[#38bdf8] flex items-center justify-center text-white shadow-[0_0_15px_rgba(44,103,237,0.5)]">
                  <FileText size={18} />
                </div>
                <div>
                  <h3 id="cv-modal-title" className="text-base sm:text-lg font-bold text-white font-heading flex items-center gap-2">
                    <span>Curriculum Vitae</span>
                    <span className="text-[11px] font-mono font-normal text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                      Verified
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400 font-mono">
                    {personalData.displayName} • Cilegon, Indonesia
                  </p>
                </div>
              </div>

              {/* Action Buttons: Tab switcher, Download PDF, Print, Close */}
              <div className="flex items-center gap-2">
                <a
                  href="/CV_Farel_Rizky_Pratama.pdf"
                  download="CV_Farel_Rizky_Pratama.pdf"
                  className="px-3.5 py-1.5 rounded-xl bg-[#2c67ed] hover:bg-[#38bdf8] text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(44,103,237,0.4)]"
                  title="Unduh file PDF Asli"
                >
                  <Download size={13} />
                  <span>Download PDF</span>
                </a>

                <button
                  onClick={handlePrint}
                  className="hidden sm:flex px-3 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-slate-300 hover:text-white text-xs font-medium items-center gap-1.5 transition-colors"
                  title="Cetak CV"
                >
                  <Printer size={13} />
                  <span>Cetak</span>
                </button>

                <button
                  onClick={onClose}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Tutup modal"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Sub-Header Tabs */}
            <div className="px-5 sm:px-8 py-2.5 bg-[#050811] border-b border-white/[0.06] flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('digital')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                    activeTab === 'digital'
                      ? 'bg-[#2c67ed]/20 text-[#38bdf8] border border-[#2c67ed]/40'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Sparkles size={12} />
                  <span>Format Digital Interaktif</span>
                </button>

                <button
                  onClick={() => setActiveTab('original')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                    activeTab === 'original'
                      ? 'bg-[#2c67ed]/20 text-[#38bdf8] border border-[#2c67ed]/40'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Eye size={12} />
                  <span>Dokumen Asli (Scan / PDF)</span>
                </button>
              </div>

              {activeTab === 'original' && (
                <div className="flex items-center gap-1 text-slate-400 text-xs">
                  <button
                    onClick={() => setZoomLevel((prev) => Math.max(0.7, prev - 0.15))}
                    className="p-1 rounded hover:bg-white/10 text-slate-300"
                    title="Zoom out"
                  >
                    <ZoomOut size={14} />
                  </button>
                  <span className="font-mono text-[11px] w-12 text-center">{Math.round(zoomLevel * 100)}%</span>
                  <button
                    onClick={() => setZoomLevel((prev) => Math.min(1.8, prev + 0.15))}
                    className="p-1 rounded hover:bg-white/10 text-slate-300"
                    title="Zoom in"
                  >
                    <ZoomIn size={14} />
                  </button>
                  <button
                    onClick={() => setZoomLevel(1)}
                    className="p-1 rounded hover:bg-white/10 text-slate-300 ml-1"
                    title="Reset zoom"
                  >
                    <RotateCcw size={13} />
                  </button>
                </div>
              )}
            </div>

            {/* Scrollable Modal Body */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-8 custom-scrollbar">
              {activeTab === 'digital' ? (
                <div className="space-y-8 max-w-3xl mx-auto printable-cv">
                  {/* Header Profile Section */}
                  <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] flex flex-col sm:flex-row items-center sm:items-start gap-6">
                    <div className="relative">
                      <div className="w-24 h-32 rounded-xl overflow-hidden border-2 border-[#2c67ed]/50 shadow-[0_0_20px_rgba(44,103,237,0.3)] bg-[#0c1630]">
                        <img
                          src="/cv-photo.jpg"
                          alt={personalData.displayName}
                          className="w-full h-full object-cover object-center"
                          onError={(e) => {
                            e.currentTarget.src = "/profile.png";
                          }}
                        />
                      </div>
                      <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-[#10b981] text-[10px] font-mono font-bold text-white uppercase whitespace-nowrap shadow-sm">
                        Ready to Work
                      </span>
                    </div>

                    <div className="flex-1 text-center sm:text-left">
                      <h2 className="text-2xl sm:text-3xl font-bold text-white font-heading tracking-tight mb-1">
                        {personalData.displayName}
                      </h2>
                      <p className="text-sm font-medium text-[#38bdf8] mb-4">
                        Teknik Komputer &amp; Jaringan • Mahasiswa S1 Teknik Informatika
                      </p>

                      {/* Contact Badges */}
                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-slate-300">
                        <a
                          href="https://wa.me/081818434093"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20 transition-colors"
                        >
                          <Phone size={13} />
                          <span>+6281818434093</span>
                        </a>

                        <a
                          href="mailto:farelrizky801@gmail.com"
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2c67ed]/10 border border-[#2c67ed]/30 text-[#38bdf8] hover:bg-[#2c67ed]/20 transition-colors"
                        >
                          <Mail size={13} />
                          <span>farelrizky801@gmail.com</span>
                        </a>

                        <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-slate-300">
                          <MapPin size={13} className="text-slate-400" />
                          <span>Cilegon, Banten, ID</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Tentang Saya */}
                  <div className="p-6 rounded-2xl bg-[#080d1a] border border-white/[0.06]">
                    <h3 className="text-base font-bold text-white font-heading uppercase tracking-wider mb-3 flex items-center gap-2 border-b border-white/[0.08] pb-2">
                      <Sparkles size={15} className="text-[#38bdf8]" />
                      <span>Tentang Saya</span>
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed font-light">
                      Saya, <strong className="text-white font-medium">Farel Rizky Pratama</strong>, adalah lulusan baru yang penuh semangat dan siap untuk membawa energi positif ke dunia profesional. Dengan latar belakang pendidikan dalam komputer dan jaringan, saya telah mendapatkan pemahaman yang kuat tentang ilmu komputer dan keterampilan praktis yang diperlukan untuk berkembang di dunia kerja.
                    </p>
                  </div>

                  {/* Pendidikan */}
                  <div className="p-6 rounded-2xl bg-[#080d1a] border border-white/[0.06]">
                    <h3 className="text-base font-bold text-white font-heading uppercase tracking-wider mb-4 flex items-center gap-2 border-b border-white/[0.08] pb-2">
                      <GraduationCap size={16} className="text-[#38bdf8]" />
                      <span>Pendidikan</span>
                    </h3>

                    <div className="space-y-5">
                      {educationData.map((edu, idx) => (
                        <div key={idx} className="relative pl-5 border-l-2 border-[#2c67ed]/50">
                          <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-[#38bdf8]" />
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                            <span className="text-xs font-mono font-semibold text-[#38bdf8]">
                              {edu.period}
                            </span>
                            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/[0.05] border border-white/10 text-slate-300">
                              {edu.badge}
                            </span>
                          </div>
                          <h4 className="text-base font-bold text-white">
                            {edu.institution}
                          </h4>
                          <p className="text-xs font-medium text-slate-400 mb-2">
                            {edu.degree}
                          </p>
                          <p className="text-xs text-slate-300 leading-relaxed font-light">
                            {edu.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pengalaman Kerja */}
                  <div className="p-6 rounded-2xl bg-[#080d1a] border border-white/[0.06]">
                    <h3 className="text-base font-bold text-white font-heading uppercase tracking-wider mb-4 flex items-center gap-2 border-b border-white/[0.08] pb-2">
                      <Briefcase size={16} className="text-[#38bdf8]" />
                      <span>Pengalaman Kerja (Sesuai CV Asli)</span>
                    </h3>

                    <div className="space-y-6">
                      {experienceData.map((exp, idx) => (
                        <div key={idx} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-[#2c67ed]/30 transition-colors">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                            <h4 className="text-sm sm:text-base font-bold text-white">
                              {exp.position}
                            </h4>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-mono text-[#38bdf8] bg-[#2c67ed]/15 px-2 py-0.5 rounded border border-[#2c67ed]/30">
                                {exp.period}
                              </span>
                              {exp.duration && (
                                <span className="text-[11px] font-mono text-slate-400">
                                  ({exp.duration})
                                </span>
                              )}
                            </div>
                          </div>

                          <p className="text-xs font-semibold text-slate-400 mb-2">
                            {exp.company}
                          </p>

                          <p className="text-xs text-slate-300 leading-relaxed mb-3 font-light">
                            {exp.description}
                          </p>

                          {exp.technologies && (
                            <div className="flex flex-wrap gap-1.5">
                              {exp.technologies.map((t, tIdx) => (
                                <span
                                  key={tIdx}
                                  className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#2c67ed]/10 text-slate-300 border border-white/[0.07]"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Kemampuan */}
                  <div className="p-6 rounded-2xl bg-[#080d1a] border border-white/[0.06]">
                    <h3 className="text-base font-bold text-white font-heading uppercase tracking-wider mb-4 flex items-center gap-2 border-b border-white/[0.08] pb-2">
                      <ShieldCheck size={16} className="text-[#38bdf8]" />
                      <span>Kemampuan Utama</span>
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="p-3.5 rounded-xl bg-[#0c1630]/60 border border-[#2c67ed]/30 text-center">
                        <CheckCircle2 size={18} className="text-[#38bdf8] mx-auto mb-1.5" />
                        <h5 className="text-xs font-bold text-white mb-0.5">Installasi Jaringan</h5>
                        <p className="text-[11px] text-slate-400">Hardware, Routing &amp; Cabling TKJ</p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-[#0c1630]/60 border border-[#2c67ed]/30 text-center">
                        <CheckCircle2 size={18} className="text-emerald-400 mx-auto mb-1.5" />
                        <h5 className="text-xs font-bold text-white mb-0.5">Kemampuan Leadership</h5>
                        <p className="text-[11px] text-slate-400">Koordinasi Tim &amp; Tanggung Jawab</p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-[#0c1630]/60 border border-[#2c67ed]/30 text-center">
                        <CheckCircle2 size={18} className="text-yellow-400 mx-auto mb-1.5" />
                        <h5 className="text-xs font-bold text-white mb-0.5">Bertanggung Jawab</h5>
                        <p className="text-[11px] text-slate-400">Disiplin Tinggi &amp; Etos Kerja Kuat</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Original Document Scan / PDF View */
                <div className="flex flex-col items-center justify-center space-y-4">
                  <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                    <span>Dokumen Asli CV • Farel Rizky Pratama</span>
                    <span>•</span>
                    <a
                      href="/CV_Farel_Rizky_Pratama.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#38bdf8] hover:underline flex items-center gap-1"
                    >
                      <span>Buka File Asli di Tab Baru</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>

                  <div className="relative w-full flex justify-center overflow-auto p-2 bg-slate-950/60 rounded-2xl border border-white/10 shadow-inner">
                    <div
                      style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top center' }}
                      className="transition-transform duration-200"
                    >
                      <img
                        src="/cv-preview.jpg"
                        alt="Scan CV Asli Farel Rizky Pratama"
                        className="rounded-lg shadow-[0_10px_40px_rgba(0,0,0,0.9)] max-w-[560px] w-full h-auto border border-white/20"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Modal Action Bar */}
            <div className="px-6 py-4 border-t border-white/10 bg-[#070b14] flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs text-slate-400 font-mono flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Format resmi siap untuk rekrutmen &amp; magang</span>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="/CV_Farel_Rizky_Pratama.pdf"
                  download="CV_Farel_Rizky_Pratama.pdf"
                  className="px-4 py-2 rounded-xl bg-[#2c67ed] hover:bg-[#38bdf8] text-white text-xs font-semibold flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(44,103,237,0.4)]"
                >
                  <Download size={14} />
                  <span>Download CV Asli (.PDF)</span>
                </a>
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/10 text-slate-300 text-xs font-medium transition-colors"
                >
                  Tutup
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
