import { ArrowUp, ArrowRight } from 'lucide-react';

const quickLinks = [
  { href: '#hero', label: 'Home' },
  { href: '#about', label: 'About Me' },
  { href: '#portfolio', label: 'Selected Works' },
  { href: '#process', label: 'My Workflow' },
  { href: '#experience', label: 'Work Experience' },
];

const services = [
  'Graphic Design', 'Video Editing', '2D/3D Animation',
  'Branding & Visual Identity', 'Motion Graphics', 'Social Media Design',
];

const socialIcons = [
  { label: 'Instagram', href: 'https://instagram.com', path: 'M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z' },
  { label: 'LinkedIn', href: 'https://linkedin.com', path: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z' },
];

export default function Footer() {
  const scrollTo = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-brand-dark border-t border-brand-border/10 pt-16 pb-8 px-6 md:px-12 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="md:col-span-6 lg:col-span-4 flex flex-col gap-4">
            <a href="#hero" onClick={(e) => scrollTo(e, '#hero')} className="flex items-center group w-fit">
              <img src="/assets/logo.png" alt="Harsh design.co Logo" className="h-11 md:h-14 w-auto object-contain group-hover:scale-105 transition-transform duration-300" />
            </a>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed mt-2">
              A premium creative studio specializing in bespoke brand identities, cinematic video editing, 3D visuals, and strategic social media management.
            </p>
            <div className="flex items-center gap-3 mt-2">
              {socialIcons.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-brand-accent hover:scale-110 hover:-translate-y-0.5 transition-all duration-300" aria-label={s.label}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d={s.path}/>{s.label === 'Instagram' && <><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></>}</svg>
                </a>
              ))}
              <a href="https://behance.net" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-brand-accent hover:scale-110 hover:-translate-y-0.5 transition-all duration-300" aria-label="Behance">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M22 14.2h-7.3c.1.9.4 1.5.9 1.9.5.4 1.2.6 2 .6 1.4 0 2.2-.6 2.5-1.9h2c-.3 1.6-1 2.7-2.2 3.4-1.2.7-2.8 1-4.7 1-2.7 0-4.8-.8-6.1-2.4C5 15.2 4.3 12.9 4.3 10c0-2.8.7-5 2.1-6.6 1.4-1.6 3.4-2.4 6-2.4 2.5 0 4.5.8 5.8 2.3 1.3 1.5 1.9 3.7 1.9 6.5v1.4H8.2zm-12-3h7.1c-.1-1-.4-1.7-.8-2.2-.5-.5-1.1-.7-1.9-.7-.8 0-1.4.2-1.9.7-.5.5-.7 1.2-.7 2.2zM2 17.8H0V6.2h5.1c1.5 0 2.7.3 3.4 1 .8.7 1.1 1.6 1.1 2.8 0 .8-.2 1.4-.7 2-.5.5-1.1.8-1.9 1 .9.2 1.6.6 2.1 1.2.5.6.8 1.4.8 2.4 0 1.2-.4 2.2-1.2 2.9-.8.7-2 1.1-3.6 1.1H2zm2-2.1h2.9c.7 0 1.3-.1 1.6-.4.4-.3.5-.7.5-1.3 0-.5-.2-.9-.5-1.1-.4-.2-.9-.3-1.6-.3H4zm0-5.1h2.6c.7 0 1.2-.1 1.5-.4.3-.3.5-.6.5-1.1s-.2-.8-.5-1.1c-.3-.3-.8-.4-1.5-.4H4z"/></svg>
              </a>
              <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-brand-accent hover:scale-110 hover:-translate-y-0.5 transition-all duration-300" aria-label="Dribbble">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.12a9.66 9.66 0 00-4.08-1.02c-.75 0-1.48.06-2.19.18 1.55 3.9 2.2 7.82 2.2 7.85a9.7 9.7 0 004.07-7.01zm-5.71 7.79c-.06-.18-.73-3.92-2.3-7.73a15 15 0 00-6.19 5.32 9.67 9.67 0 008.49 2.41zm-10.3-1.05a13 13 0 015.65-4.94A17 17 0 007.45 6.4a9.7 9.7 0 00-5.63 9.22zm-.9-10.68a9.68 9.68 0 004.4 7.6 15 15 0 014.28-9.08A9.7 9.7 0 001.2 9.94zm10.8-7.94c.59 0 1.17.06 1.74.16a13.3 13.3 0 00-3.94 8.5 17 17 0 00-4.48-6.1 9.72 9.72 0 016.68-2.56zm5.82 1.34a15 15 0 014.1 5.92A9.7 9.7 0 0012 2.06c2.09 0 4.07.66 5.82 1.88z"/></svg>
              </a>
              <a href="https://wa.me/9023125130" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-brand-accent hover:scale-110 hover:-translate-y-0.5 transition-all duration-300" aria-label="WhatsApp">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.705 1.455h.008c6.56 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
            </div>
          </div>

          <div className="md:col-span-6 lg:col-span-2 flex flex-col gap-4">
            <span className="text-xs font-bold text-white uppercase tracking-widest">Quick Links</span>
            <div className="flex flex-col gap-2">
              {quickLinks.map(l => (
                <a key={l.href} href={l.href} onClick={(e) => scrollTo(e, l.href)} className="text-xs text-slate-400 hover:text-white transition-colors w-fit">{l.label}</a>
              ))}
            </div>
          </div>

          <div className="md:col-span-6 lg:col-span-3 flex flex-col gap-4">
            <span className="text-xs font-bold text-white uppercase tracking-widest">Core Services</span>
            <div className="flex flex-col gap-2">
              {services.map(s => (
                <span key={s} className="text-xs text-slate-400">{s}</span>
              ))}
            </div>
          </div>

          <div className="md:col-span-6 lg:col-span-3 flex flex-col gap-4">
            <span className="text-xs font-bold text-white uppercase tracking-widest">Let's Connect</span>
            <div className="flex flex-col gap-2 text-xs">
              <a href="mailto:harsheasyskill501@gmail.com" className="text-slate-400 hover:text-white transition-colors w-fit block py-0.5">harsheasyskill501@gmail.com</a>
              <a href="tel:9023125130" className="text-slate-400 hover:text-white transition-colors w-fit block py-0.5">+91 90231 25130</a>
              <a href="#contact" onClick={(e) => scrollTo(e, '#contact')} className="inline-flex items-center gap-2 text-xs font-bold text-white mt-2 hover:translate-x-1 transition-transform w-fit group">
                Get In Touch <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-900/80 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-slate-400 font-medium">&copy; 2026 Harsh Chauhan. All rights reserved.</span>
        </div>
      </div>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 w-12 h-12 rounded-xl bg-brand-accent text-white hover:bg-brand-accent-hover shadow-lg shadow-brand-accent/20 hover:shadow-brand-accent/30 flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-300 z-40"
        aria-label="Back to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </footer>
  );
}
