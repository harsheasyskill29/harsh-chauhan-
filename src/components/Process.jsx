export default function Process() {
  const steps = [
    { num: 1, title: 'Discussion', desc: 'Understanding your project vision, target audience segments, and business goals to outline scope deliverables.' },
    { num: 2, title: 'Research', desc: 'Analyzing competitor visual systems, mood boarding, and planning design directions optimized for your niche.' },
    { num: 3, title: 'Design', desc: 'Developing high-fidelity mockups, packaging structures, or grid templates with review milestones.' },
    { num: 4, title: 'Delivery', desc: 'Supplying pixel-perfect vector source files, print-ready package files, and social media posting schedules.' },
  ];

  const delayClasses = ['', 'reveal-delay-100', 'reveal-delay-200', 'reveal-delay-300'];

  return (
    <section id="process" className="py-12 scroll-mt-20 px-6 md:px-12 max-w-7xl mx-auto relative">
      <div className="text-center max-w-3xl mx-auto flex flex-col items-center gap-4 mb-16 reveal">
        <div className="flex items-center gap-2">
          <span className="w-8 h-0.5 bg-brand-accent"></span>
          <span className="text-xs font-bold text-brand-secondary uppercase tracking-widest">Workflow</span>
          <span className="w-8 h-0.5 bg-brand-accent"></span>
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-brand-primary tracking-tight leading-tight">
          My Strategic <span className="accent-gradient">Design Process</span>
        </h2>
        <p className="text-brand-secondary text-sm md:text-base leading-relaxed">
          I follow a structured methodology that bridges business goals with creative assets to deliver consistent, market-ready results.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        <div className="hidden lg:block absolute top-1/2 left-4 right-4 h-0.5 bg-gradient-to-r from-brand-border via-brand-accent/30 to-brand-border -translate-y-8 z-0"></div>
        {steps.map((step, idx) => (
          <div key={step.num} className={`p-6 rounded-3xl glass-panel glass-panel-hover border-brand-border relative z-10 flex flex-col gap-4 reveal ${delayClasses[idx]}`}>
            <div className="w-12 h-12 rounded-2xl bg-brand-white text-brand-accent font-extrabold text-lg flex items-center justify-center border border-brand-border self-start">
              {step.num}
            </div>
            <h3 className="text-base font-bold text-brand-primary mt-2">{step.title}</h3>
            <p className="text-xs text-brand-secondary leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
