import { Phone, Send, Mail, MapPin, Globe } from 'lucide-react';

export default function Contact({ onOpenEnquiry }) {
  return (
    <section id="contact" className="py-24 md:py-36 relative overflow-hidden flex flex-col items-center justify-center text-center bg-brand-dark">
      <div className="relative z-20 px-6 max-w-4xl mx-auto flex flex-col items-center gap-4 reveal">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-8 h-0.5 bg-brand-accent"></span>
          <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">GET IN TOUCH</span>
          <span className="w-8 h-0.5 bg-brand-accent"></span>
        </div>
        <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight select-none">
          Let's <span className="accent-gradient">Talk?</span>
        </h2>
        <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-lg mt-2 mb-6">
          Ready to scale your branding and social engagement? Let's build something extraordinary together.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center w-full sm:w-auto">
          <a href="tel:9023125130" className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-brand-accent text-white font-bold text-sm hover:bg-brand-accent-hover transition-all duration-300 hover:scale-105 shadow-lg shadow-brand-accent/5 active:scale-98">
            <Phone className="w-4 h-4" /> +91 90231 25130
          </a>
          <button
            onClick={onOpenEnquiry}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-transparent border border-brand-accent text-brand-accent font-bold text-sm hover:bg-brand-accent hover:text-white transition-all duration-300 hover:scale-105 shadow-lg active:scale-98"
          >
            <Send className="w-4 h-4" /> Send an Enquiry
          </button>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-12 text-xs text-slate-400 font-semibold border-t border-white/10 pt-6">
          <a href="mailto:harsheasyskill501@gmail.com" className="flex items-center gap-1.5 hover:text-brand-accent transition-colors">
            <Mail className="w-3.5 h-3.5" /> harsheasyskill501@gmail.com
          </a>
          <span className="hidden sm:inline text-slate-700">|</span>
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" /> Surat, Gujarat, India
          </span>
          <span className="hidden sm:inline text-slate-700">|</span>
          <span className="flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5" /> Remote Consulting Globally
          </span>
        </div>
      </div>
    </section>
  );
}
