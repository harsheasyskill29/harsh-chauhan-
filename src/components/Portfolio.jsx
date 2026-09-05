import { useState, useEffect, useRef, useCallback } from 'react';
import { projectsData } from '../data/projects';
import { Expand } from 'lucide-react';

const filters = [
  { key: 'all', label: 'All Works' },
  { key: 'graphic', label: 'Graphic Design' },
  { key: 'video', label: 'Video Editing' },
  { key: '3d', label: '3D Visuals' },
];

export default function Portfolio({ onOpenModal, onOpenVideo }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [animating, setAnimating] = useState(false);
  const gridRef = useRef(null);

  const handleFilter = (key) => {
    if (key === activeFilter) return;
    setAnimating(true);
    setTimeout(() => {
      setActiveFilter(key);
      setAnimating(false);
    }, 300);
  };

  const filteredProjects = activeFilter === 'all'
    ? projectsData
    : projectsData.filter(p => p.filterCategory === activeFilter);

  const handleVideoHover = useCallback((e, playing) => {
    const card = e.currentTarget;
    const video = card.querySelector('.project-video');
    const poster = card.querySelector('.project-poster');
    if (!video) return;

    if (playing) {
      document.querySelectorAll('.project-video').forEach(v => {
        if (v !== video) {
          v.pause();
          v.currentTime = 0;
          if (v.closest('.portfolio-item')?.querySelector('.project-poster')) {
            v.style.opacity = '0';
          }
        }
      });
      video.play().then(() => { video.style.opacity = '1'; }).catch(() => {});
    } else {
      video.pause();
      video.currentTime = 0;
      if (poster) video.style.opacity = '0';
    }
  }, []);

  return (
    <section id="portfolio" className="py-12 scroll-mt-20 px-6 md:px-12 max-w-7xl mx-auto relative">
      <div className="text-center max-w-3xl mx-auto flex flex-col items-center gap-4 mb-12 reveal">
        <div className="flex items-center gap-2">
          <span className="w-8 h-0.5 bg-brand-accent"></span>
          <span className="text-xs font-bold text-brand-secondary uppercase tracking-widest">Showcase</span>
          <span className="w-8 h-0.5 bg-brand-accent"></span>
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-brand-primary tracking-tight leading-tight">
          Selected Creative <span className="accent-gradient">Works Gallery</span>
        </h2>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 mb-12 reveal reveal-delay-100">
        {filters.map(f => (
          <button
            key={f.key}
            onClick={() => handleFilter(f.key)}
            className={`px-5 py-2.5 rounded-xl border text-xs font-bold tracking-wider uppercase transition-all duration-300 ${
              activeFilter === f.key
                ? 'bg-brand-accent text-white border-transparent'
                : 'bg-brand-white border-brand-border text-brand-secondary hover:text-brand-accent hover:border-brand-accent'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch reveal reveal-delay-200"
        style={{ opacity: animating ? 0 : 1, transform: animating ? 'scale(0.9)' : 'scale(1)', transition: 'opacity 0.3s, transform 0.3s' }}
      >
        {filteredProjects.map(project => (
          <div
            key={project.id}
            className="portfolio-item group rounded-3xl overflow-hidden glass-panel border border-brand-border flex flex-col h-full transition-transform duration-500 hover:-translate-y-2"
          >
            <div
              className="relative overflow-hidden aspect-video bg-brand-bg flex-shrink-0"
              onMouseEnter={(e) => handleVideoHover(e, true)}
              onMouseLeave={(e) => handleVideoHover(e, false)}
            >
              {project.image && (
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-poster w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 absolute inset-0 z-10"
                  loading="lazy"
                />
              )}
              {project.video && (
                <video
                  src={project.video}
                  muted
                  playsInline
                  loop
                  className="project-video w-full h-full object-cover absolute inset-0 transition-opacity duration-300"
                  style={{ opacity: project.image ? 0 : 1, zIndex: project.image ? 0 : 10 }}
                />
              )}
              <div
                className="absolute inset-0 bg-[#6D5CFF]/20 opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm z-20 flex items-center justify-center cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  if (project.video && !project.images) {
                    onOpenVideo(project.video);
                  } else {
                    onOpenModal(project);
                  }
                }}
              >
                <Expand className="w-7 h-7 text-white drop-shadow-[0_2px_6px_rgba(255,255,255,0.6)]" />
              </div>
            </div>
            <div className="p-5 flex flex-col justify-between flex-grow">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-secondary">{project.category}</span>
                <h3 className="text-base font-bold text-brand-primary mt-1 group-hover:text-brand-accent transition-colors">{project.title}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
