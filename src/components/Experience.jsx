import { useEffect, useRef } from 'react';
import { experienceData } from '../data/projects';

export default function Experience() {
  const timelineRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const updateGlow = () => {
      if (!timelineRef.current || !glowRef.current) return;
      const rect = timelineRef.current.getBoundingClientRect();
      const wh = window.innerHeight;
      const start = wh * 0.75;
      const end = wh * 0.25;
      const scrolled = start - rect.top;
      const total = rect.height + (start - end);
      let progress = Math.max(0, Math.min(1, scrolled / total));
      glowRef.current.style.height = `${(progress * 100).toFixed(1)}%`;

      const items = timelineRef.current.querySelectorAll('.timeline-item');
      items.forEach(item => {
        const dot = item.querySelector('.timeline-dot');
        if (!dot) return;
        const ir = item.getBoundingClientRect();
        if (ir.top < wh * 0.7 && ir.bottom > wh * 0.2) {
          dot.classList.add('active-dot');
        } else {
          dot.classList.remove('active-dot');
        }
      });
    };

    window.addEventListener('scroll', updateGlow);
    updateGlow();
    return () => window.removeEventListener('scroll', updateGlow);
  }, []);

  const delayClasses = ['', 'reveal-delay-100', 'reveal-delay-200', 'reveal-delay-300'];

  return (
    <section id="experience" className="py-12 scroll-mt-20 px-6 md:px-12 max-w-7xl mx-auto relative">
      <div className="text-center max-w-3xl mx-auto flex flex-col items-center gap-4 mb-16 reveal">
        <div className="flex items-center gap-2">
          <span className="w-8 h-0.5 bg-brand-accent"></span>
          <span className="text-xs font-bold text-brand-secondary uppercase tracking-widest">History</span>
          <span className="w-8 h-0.5 bg-brand-accent"></span>
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-brand-primary tracking-tight leading-tight">
          Professional <span className="accent-gradient">Journey & Milestones</span>
        </h2>
      </div>

      <div ref={timelineRef} id="experience-timeline" className="max-w-4xl mx-auto relative pl-8 ml-4 md:ml-auto md:pl-0 md:grid md:grid-cols-2 md:gap-x-12 md:gap-y-12">
        <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-brand-border md:-translate-x-0.5 z-0"></div>
        <div ref={glowRef} id="timeline-glow-line" className="absolute left-0 md:left-1/2 top-0 w-0.5 md:-translate-x-0.5 z-[2] bg-gradient-to-b from-brand-accent via-brand-accent to-brand-accent-hover shadow-[0_0_12px_rgba(109,92,255,0.6)] rounded-full transition-all duration-75 ease-out" style={{ height: '0%' }}></div>

        {experienceData.map((exp, idx) => {
          const isLeft = idx % 2 === 0;
          return (
            <div
              key={exp.id}
              className={`timeline-item relative mb-12 md:mb-0 ${isLeft ? 'md:text-right md:pr-12 md:col-start-1' : 'md:pl-12 md:col-start-2'} ${idx % 2 !== 0 ? 'md:mt-12' : ''} ${idx === 3 ? 'md:mt-24' : ''} reveal ${delayClasses[idx]}`}
            >
              <div className={`timeline-dot absolute -left-1.5 top-2 w-3 h-3 rounded-full bg-brand-border shadow-[0_0_6px_rgba(109,92,255,0.2)] ${isLeft ? 'md:-left-auto md:-right-1.5' : 'md:-left-1.5'} z-10 transition-all duration-300`}></div>
              <span className="inline-block px-3 py-1 rounded-lg bg-brand-white border border-brand-border text-brand-accent text-xs font-semibold uppercase tracking-wider mb-2">{exp.period}</span>
              <h3 className="text-lg font-bold text-brand-primary">{exp.title}</h3>
              <span className="text-sm font-semibold text-brand-primary block mt-1">{exp.company}</span>
              <p className={`text-xs text-brand-secondary leading-relaxed mt-2 max-w-lg ${isLeft ? 'md:ml-auto' : ''}`}>{exp.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
