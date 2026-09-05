import { useEffect, useRef } from 'react';

export default function Hero() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.src = '/videos/profile-video.mp4';
    }
  }, []);

  return (
    <section id="hero" className="pt-36 md:pt-44 pb-12 px-6 md:px-12 max-w-7xl mx-auto relative overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
        <div className="lg:col-span-7 flex flex-col gap-6 text-center lg:text-left reveal">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel border border-brand-border w-fit mx-auto lg:mx-0">
            <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse"></span>
            <span className="text-xs font-semibold text-brand-secondary uppercase tracking-widest">Available for Freelance Projects</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-brand-primary">
            Hi, I'm <span className="accent-gradient">Harsh Chauhan</span>
          </h1>

          <h2 className="text-2xl md:text-3xl font-bold text-brand-primary tracking-wide">
            Graphic Designer <span className="text-brand-border">|</span> Video Editor <span className="text-brand-border">|</span> 3D Artist
          </h2>

          <p className="text-base md:text-lg text-brand-secondary max-w-2xl leading-relaxed">
            I help businesses build powerful brands through creative design, high-end social media management, and high-converting visual content that captivates audiences.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 justify-center lg:justify-start">
            <a href="#portfolio" className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-brand-accent text-white font-bold text-center shadow-lg shadow-brand-accent/5 hover:bg-brand-accent-hover hover:scale-105 active:scale-98 transition-all duration-300 btn-premium">
              View Portfolio
            </a>
            <a href="#contact" className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-transparent border border-brand-accent text-brand-accent hover:text-white font-bold text-center hover:bg-brand-accent hover:border-brand-accent transition-all duration-300">
              Hire Me
            </a>
          </div>

          <div className="flex items-center gap-5 mt-6 justify-center lg:justify-start">
            <span className="text-xs uppercase tracking-widest text-brand-secondary font-semibold">Follow Me:</span>
            <div className="flex items-center gap-3">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl glass-panel flex items-center justify-center text-brand-secondary hover:text-brand-accent hover:border-brand-accent hover:scale-110 hover:-translate-y-1 transition-all duration-300" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl glass-panel flex items-center justify-center text-brand-secondary hover:text-brand-accent hover:border-brand-accent hover:scale-110 hover:-translate-y-1 transition-all duration-300" aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a href="https://behance.net" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl glass-panel flex items-center justify-center text-brand-secondary hover:text-brand-accent hover:border-brand-accent hover:scale-110 hover:-translate-y-1 transition-all duration-300" aria-label="Behance">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M22 14.2h-7.3c.1.9.4 1.5.9 1.9.5.4 1.2.6 2 .6 1.4 0 2.2-.6 2.5-1.9h2c-.3 1.6-1 2.7-2.2 3.4-1.2.7-2.8 1-4.7 1-2.7 0-4.8-.8-6.1-2.4C5 15.2 4.3 12.9 4.3 10c0-2.8.7-5 2.1-6.6 1.4-1.6 3.4-2.4 6-2.4 2.5 0 4.5.8 5.8 2.3 1.3 1.5 1.9 3.7 1.9 6.5v1.4H8.2zm-12-3h7.1c-.1-1-.4-1.7-.8-2.2-.5-.5-1.1-.7-1.9-.7-.8 0-1.4.2-1.9.7-.5.5-.7 1.2-.7 2.2zM2 17.8H0V6.2h5.1c1.5 0 2.7.3 3.4 1 .8.7 1.1 1.6 1.1 2.8 0 .8-.2 1.4-.7 2-.5.5-1.1.8-1.9 1 .9.2 1.6.6 2.1 1.2.5.6.8 1.4.8 2.4 0 1.2-.4 2.2-1.2 2.9-.8.7-2 1.1-3.6 1.1H2zm2-2.1h2.9c.7 0 1.3-.1 1.6-.4.4-.3.5-.7.5-1.3 0-.5-.2-.9-.5-1.1-.4-.2-.9-.3-1.6-.3H4zm0-5.1h2.6c.7 0 1.2-.1 1.5-.4.3-.3.5-.6.5-1.1s-.2-.8-.5-1.1c-.3-.3-.8-.4-1.5-.4H4z"/></svg>
              </a>
              <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl glass-panel flex items-center justify-center text-brand-secondary hover:text-brand-accent hover:border-brand-accent hover:scale-110 hover:-translate-y-1 transition-all duration-300" aria-label="Dribbble">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.12a9.66 9.66 0 00-4.08-1.02c-.75 0-1.48.06-2.19.18 1.55 3.9 2.2 7.82 2.2 7.85a9.7 9.7 0 004.07-7.01zm-5.71 7.79c-.06-.18-.73-3.92-2.3-7.73a15 15 0 00-6.19 5.32 9.67 9.67 0 008.49 2.41zm-10.3-1.05a13 13 0 015.65-4.94A17 17 0 007.45 6.4a9.7 9.7 0 00-5.63 9.22zm-.9-10.68a9.68 9.68 0 004.4 7.6 15 15 0 014.28-9.08A9.7 9.7 0 001.2 9.94zm10.8-7.94c.59 0 1.17.06 1.74.16a13.3 13.3 0 00-3.94 8.5 17 17 0 00-4.48-6.1 9.72 9.72 0 016.68-2.56zm5.82 1.34a15 15 0 014.1 5.92A9.7 9.7 0 0012 2.06c2.09 0 4.07.66 5.82 1.88z"/></svg>
              </a>
              <a href="https://wa.me/9023125130" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl glass-panel flex items-center justify-center text-brand-secondary hover:text-brand-accent hover:border-brand-accent hover:scale-110 hover:-translate-y-1 transition-all duration-300" aria-label="WhatsApp">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.705 1.455h.008c6.56 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 flex justify-center relative reveal reveal-delay-200">
          <div className="absolute -top-10 -left-10 w-24 h-24 rounded-full border border-brand-border animate-float-1 pointer-events-none"></div>
          <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full border border-brand-border animate-float-2 pointer-events-none"></div>
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-3xl overflow-hidden glass-panel p-3 border-brand-border shadow-2xl hover:shadow-[0_0_40px_rgba(109,92,255,0.12)] transition-all duration-500">
            <div className="w-full h-full rounded-2xl overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500 z-10 pointer-events-none"></div>
              <video ref={videoRef} autoPlay muted loop playsInline className="w-full h-full object-cover scale-100 group-hover:scale-[1.03] transition-transform duration-700 ease-out z-0"></video>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
