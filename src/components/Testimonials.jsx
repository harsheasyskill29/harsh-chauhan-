import { useState, useEffect, useCallback } from 'react';
import { testimonialsData } from '../data/projects';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const showSlide = useCallback((idx) => {
    if (idx >= testimonialsData.length) setCurrent(0);
    else if (idx < 0) setCurrent(testimonialsData.length - 1);
    else setCurrent(idx);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      showSlide(current + 1);
    }, 6000);
    return () => clearInterval(timer);
  }, [current, showSlide]);

  return (
    <section id="testimonials" className="py-12 scroll-mt-20 px-6 md:px-12 max-w-5xl mx-auto relative overflow-hidden">
      <div className="text-center max-w-3xl mx-auto flex flex-col items-center gap-4 mb-16 reveal">
        <div className="flex items-center gap-2">
          <span className="w-8 h-0.5 bg-brand-accent"></span>
          <span className="text-xs font-bold text-brand-secondary uppercase tracking-widest">Testimonials</span>
          <span className="w-8 h-0.5 bg-brand-accent"></span>
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-brand-primary tracking-tight leading-tight">
          What My <span className="accent-gradient">Clients Say</span>
        </h2>
      </div>

      <div className="relative rounded-3xl glass-panel p-8 md:p-12 border-brand-border shadow-2xl reveal reveal-delay-200">
        <div className="absolute top-6 right-8 text-brand-border opacity-20 pointer-events-none">
          <Quote className="w-24 h-24" />
        </div>

        {testimonialsData.map((t, idx) => (
          <div
            key={t.id}
            className={`transition-all duration-500 ${
              idx === current ? 'block opacity-100' : 'hidden opacity-0'
            }`}
          >
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-1 text-brand-border">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <blockquote className="text-base md:text-lg text-brand-primary leading-relaxed italic font-medium">
                "{t.quote}"
              </blockquote>
              <div className="flex items-center gap-4 mt-2">
                <div className="w-12 h-12 rounded-xl bg-brand-white flex items-center justify-center text-brand-accent font-bold border border-brand-border">
                  {t.initials}
                </div>
                <div className="flex flex-col">
                  <cite className="text-sm font-bold text-brand-primary not-italic">{t.name}</cite>
                  <span className="text-xs text-brand-secondary font-medium">{t.role}</span>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="flex items-center justify-between mt-8 border-t border-brand-border pt-6">
          <div className="flex items-center gap-2">
            {testimonialsData.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === current ? 'bg-brand-accent w-6' : 'bg-brand-border w-2'
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => { showSlide(current - 1); }}
              className="w-10 h-10 rounded-xl glass-panel border-brand-border flex items-center justify-center text-brand-secondary hover:text-brand-accent hover:border-brand-accent transition-all duration-200"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => { showSlide(current + 1); }}
              className="w-10 h-10 rounded-xl glass-panel border-brand-border flex items-center justify-center text-brand-secondary hover:text-brand-accent hover:border-brand-accent transition-all duration-200"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
