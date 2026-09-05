import { useState } from 'react';
import { Layout, Clapperboard, Box, ChevronDown, Check } from 'lucide-react';
import { servicesData } from '../data/projects';

const iconMap = { layout: Layout, clapperboard: Clapperboard, box: Box };

export default function Services() {
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => {
    setOpenId(prev => prev === id ? null : id);
  };

  return (
    <section id="services" className="py-12 scroll-mt-20 px-6 md:px-12 max-w-7xl mx-auto relative">
      <div className="text-center max-w-3xl mx-auto flex flex-col items-center gap-4 mb-16 reveal">
        <div className="flex items-center gap-2">
          <span className="w-8 h-0.5 bg-brand-accent"></span>
          <span className="text-xs font-bold text-brand-secondary uppercase tracking-widest">My Services</span>
          <span className="w-8 h-0.5 bg-brand-accent"></span>
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-brand-primary tracking-tight leading-tight">
          What I Can <span className="accent-gradient">Do For Your Brand</span>
        </h2>
        <p className="text-brand-secondary text-sm md:text-base leading-relaxed">
          From full social channels growth strategy to physical print packaging, I provide multi-disciplinary creative assets that elevate your market positioning.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {servicesData.map((service, idx) => {
          const Icon = iconMap[service.icon];
          const isOpen = openId === service.id;
          const delayClass = idx === 1 ? 'reveal-delay-100' : idx === 2 ? 'reveal-delay-200' : '';

          return (
            <div
              key={service.id}
              onClick={() => toggle(service.id)}
              className={`service-accordion p-8 rounded-3xl glass-panel glass-panel-hover border border-brand-border flex flex-col justify-between reveal ${delayClass} cursor-pointer transition-all duration-300 ${isOpen ? 'is-open' : ''}`}
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-white border border-brand-border text-brand-accent flex items-center justify-center shadow-inner flex-shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-brand-primary">{service.title}</h3>
                  </div>
                  <div className="chevron-icon w-8 h-8 rounded-full bg-brand-white border border-brand-border text-brand-secondary flex items-center justify-center flex-shrink-0 transition-transform duration-300">
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-xs text-brand-secondary leading-relaxed">{service.desc}</p>
              </div>

              <div className={`accordion-content overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100 mt-4 pt-4 border-t border-brand-border' : 'max-h-0 opacity-0'}`}>
                <div className="flex flex-col gap-3">
                  <h4 className="text-xs font-bold text-brand-secondary uppercase tracking-widest mb-1">What I Offer:</h4>
                  {service.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-brand-white border border-brand-border text-brand-accent flex items-center justify-center flex-shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs text-brand-primary font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
