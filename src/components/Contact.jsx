import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Mail, 
  User, 
  MessageSquare, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  ArrowUpRight
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from './SocialIcons';
import { socialLinks } from '../data/portfolioData';

// Icon mapping for social links
const socialIconMap = {
  Github: GithubIcon,
  Linkedin: LinkedinIcon,
  Instagram: InstagramIcon,
  Mail: Mail
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Nama wajib diisi';
    if (!formData.email.trim()) {
      errs.email = 'Email wajib diisi';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Format email tidak valid';
    }
    if (!formData.subject.trim()) errs.subject = 'Subjek pesan wajib diisi';
    if (!formData.message.trim()) {
      errs.message = 'Pesan tidak boleh kosong';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Pesan minimal berisi 10 karakter';
    }
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Simulate short processing before redirecting to WhatsApp
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Construct WhatsApp message
      const phoneNumber = '6281818434093'; // 081818434093
      const text = `Halo, saya ${formData.name}.\nEmail: ${formData.email}\nSubjek: ${formData.subject}\n\nPesan:\n${formData.message}`;
      const encodedText = encodeURIComponent(text);
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;
      
      window.open(whatsappUrl, '_blank');
      
      setFormData({ name: '', email: '', subject: '', message: '' });

      // Auto dismiss success toast after 6 seconds
      setTimeout(() => setIsSubmitted(false), 6000);
    }, 800);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  return (
    <section id="contact" className="relative py-24 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2c67ed]/10 border border-[#2c67ed]/30 text-[#38bdf8] text-xs font-mono mb-3"
          >
            <Sparkles size={12} />
            <span>03 // Transmission Uplink</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-heading mb-4"
          >
            Let's build <span className="text-[#38bdf8]">something together.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto font-light"
          >
            Punya ide proyek, tawaran kolaborasi, atau ingin berdiskusi mengenai teknologi? Kirimkan pesan Anda melalui formulir di bawah.
          </motion.p>
        </div>

        {/* Contact Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-panel-glow p-7 sm:p-10 rounded-3xl relative overflow-hidden"
        >
          {/* Success Banner */}
          <AnimatePresence>
            {isSubmitted && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                animate={{ opacity: 1, height: 'auto', marginBottom: 24 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/50 flex items-center gap-3 text-emerald-200 text-sm overflow-hidden"
              >
                <CheckCircle2 size={20} className="text-emerald-400 shrink-0" />
                <div>
                  <p className="font-semibold">Transmisi Terkirim!</p>
                  <p className="text-xs text-emerald-300/80 font-light">
                    Terima kasih telah menghubungi. Pesan Anda telah diterima dan akan segera direspons.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Name Input */}
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-2">
                  Name <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Nama Anda"
                    className={`w-full px-4 py-3 rounded-xl bg-[#03060d]/80 border text-slate-100 text-sm focus:outline-none transition-all placeholder:text-slate-600 ${
                      errors.name
                        ? 'border-red-500/70 focus:border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.3)]'
                        : 'border-white/10 focus:border-[#2c67ed] focus:shadow-[0_0_15px_rgba(44,103,237,0.3)]'
                    }`}
                  />
                  <User size={16} className="absolute right-3.5 top-3.5 text-slate-500 pointer-events-none" />
                </div>
                {errors.name && (
                  <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.name}
                  </p>
                )}
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-2">
                  Email <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="nama@email.com"
                    className={`w-full px-4 py-3 rounded-xl bg-[#03060d]/80 border text-slate-100 text-sm focus:outline-none transition-all placeholder:text-slate-600 ${
                      errors.email
                        ? 'border-red-500/70 focus:border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.3)]'
                        : 'border-white/10 focus:border-[#2c67ed] focus:shadow-[0_0_15px_rgba(44,103,237,0.3)]'
                    }`}
                  />
                  <Mail size={16} className="absolute right-3.5 top-3.5 text-slate-500 pointer-events-none" />
                </div>
                {errors.email && (
                  <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.email}
                  </p>
                )}
              </div>
            </div>

            {/* Subject Input */}
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-2">
                Subject <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Topik diskusi atau kolaborasi proyek"
                className={`w-full px-4 py-3 rounded-xl bg-[#03060d]/80 border text-slate-100 text-sm focus:outline-none transition-all placeholder:text-slate-600 ${
                  errors.subject
                    ? 'border-red-500/70 focus:border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.3)]'
                    : 'border-white/10 focus:border-[#2c67ed] focus:shadow-[0_0_15px_rgba(44,103,237,0.3)]'
                }`}
              />
              {errors.subject && (
                <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                  <AlertCircle size={12} /> {errors.subject}
                </p>
              )}
            </div>

            {/* Message Textarea */}
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-2">
                Message <span className="text-red-400">*</span>
              </label>
              <textarea
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder="Ceritakan detail proyek, timeline, atau pesan Anda..."
                className={`w-full px-4 py-3 rounded-xl bg-[#03060d]/80 border text-slate-100 text-sm focus:outline-none transition-all placeholder:text-slate-600 resize-none ${
                  errors.message
                    ? 'border-red-500/70 focus:border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.3)]'
                    : 'border-white/10 focus:border-[#2c67ed] focus:shadow-[0_0_15px_rgba(44,103,237,0.3)]'
                }`}
              />
              {errors.message && (
                <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                  <AlertCircle size={12} /> {errors.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-primary-blue py-3.5 px-6 rounded-xl font-medium text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
              data-cursor="hover"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Transmitting Message...</span>
                </>
              ) : (
                <>
                  <span>Send Message</span>
                  <Send size={15} />
                </>
              )}
            </button>
          </form>
        </motion.div>

        {/* Social Media Uplinks */}
        <div className="mt-16 text-center">
          <p className="text-xs font-mono text-slate-400 mb-6 uppercase tracking-wider">
            // Direct Satellite Uplinks
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {socialLinks.map((social, index) => {
              const IconComponent = socialIconMap[social.icon] || Mail;

              return (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.05 }}
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#060a15]/80 border border-white/[0.08] hover:border-[#2c67ed]/50 hover:bg-[#0a1226] text-slate-300 hover:text-white transition-all shadow-[0_4px_15px_rgba(0,0,0,0.4)] hover:shadow-[0_0_20px_rgba(44,103,237,0.3)]"
                  data-cursor="hover"
                >
                  <IconComponent size={16} style={{ color: social.color }} />
                  <span className="text-xs font-medium">{social.name}</span>
                  <ArrowUpRight size={12} className="text-slate-500" />
                </motion.a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
