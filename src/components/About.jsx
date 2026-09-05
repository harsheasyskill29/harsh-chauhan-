import { Briefcase, CheckCircle, Sparkles, TrendingUp } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-12 scroll-mt-20 px-6 md:px-12 max-w-7xl mx-auto relative">
      <div className="text-center max-w-3xl mx-auto mb-12 reveal">
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="w-8 h-0.5 bg-brand-accent"></span>
          <span className="text-xs font-bold text-brand-secondary uppercase tracking-widest">About Me</span>
          <span className="w-8 h-0.5 bg-brand-accent"></span>
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-brand-primary tracking-tight leading-tight">
          Crafting Digital Identities That <br className="hidden sm:inline" />
          <span className="accent-gradient">Drive Real Business Value</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 grid grid-cols-2 gap-4 order-2 lg:order-1 reveal">
          <div className="p-6 rounded-2xl glass-panel glass-panel-hover border-brand-border text-center flex flex-col items-center justify-center gap-2">
            <div className="w-12 h-12 rounded-xl bg-brand-white border border-brand-border text-brand-accent flex items-center justify-center">
              <Briefcase className="w-6 h-6" />
            </div>
            <span className="text-3xl font-extrabold text-brand-primary mt-2">3+</span>
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-secondary">Years Experience</span>
          </div>

          <div className="p-6 rounded-2xl glass-panel glass-panel-hover border-brand-border text-center flex flex-col items-center justify-center gap-2">
            <div className="w-12 h-12 rounded-xl bg-brand-white border border-brand-border text-brand-accent flex items-center justify-center">
              <CheckCircle className="w-6 h-6" />
            </div>
            <span className="text-3xl font-extrabold text-brand-primary mt-2">50+</span>
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-secondary">Completed Projects</span>
          </div>

          <div className="col-span-2 p-6 rounded-2xl glass-panel glass-panel-hover border-brand-border flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-brand-white border border-brand-border text-brand-accent flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-brand-primary">Visual Branding & Logos</span>
              <span className="text-xs text-brand-secondary leading-normal mt-0.5">Creating cohesive, luxury identity architectures that build brand equity.</span>
            </div>
          </div>

          <div className="col-span-2 p-6 rounded-2xl glass-panel glass-panel-hover border-brand-border flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-brand-white border border-brand-border text-brand-accent flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-brand-primary">Social Media Growth Engine</span>
              <span className="text-xs text-brand-secondary leading-normal mt-0.5">Custom content creation, aesthetic grids planning, and campaign optimization.</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 flex flex-col gap-6 order-1 lg:order-2 reveal reveal-delay-200">
          <p className="text-brand-secondary leading-relaxed text-sm md:text-base">
            I am a creative graphic designer and results-driven 3D & visual designer based in India. I specialize in designing visual solutions that capture interest and generate client engagement. With over 3+ years of professional design and creative experience, I focus on premium, minimal aesthetics for brands looking to establish a professional market presence.
          </p>
          <p className="text-brand-secondary leading-relaxed text-sm md:text-base">
            Whether developing a luxury cosmetic packaging layout, formulating an integrated Instagram grid plan, or crafting high-performance advertising creatives, I deliver projects with meticulous detail, consistent delivery cycles, and strategic marketing intent.
          </p>
          <div className="border-t border-brand-border pt-6 mt-2 grid grid-cols-3 gap-4">
            <div className="flex flex-col">
              <span className="text-xs font-bold text-brand-secondary uppercase tracking-widest">Creativity</span>
              <span className="text-sm text-brand-primary font-medium mt-1">Unique Concepts</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-brand-secondary uppercase tracking-widest">Consistency</span>
              <span className="text-sm text-brand-primary font-medium mt-1">On-Time Schedules</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-brand-secondary uppercase tracking-widest">Precision</span>
              <span className="text-sm text-brand-primary font-medium mt-1">Pixel Perfect Details</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
