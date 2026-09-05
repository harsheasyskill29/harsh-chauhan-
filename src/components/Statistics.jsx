import { useEffect, useRef, useState } from 'react';

const stats = [
  { target: 50, suffix: '+', label: 'Projects Completed' },
  { target: 35, suffix: '+', label: 'Happy Clients' },
  { target: 3, suffix: '+', label: 'Years Experience' },
  { target: 20, suffix: '+', label: 'Brands Worked With' },
];

function Counter({ target, suffix }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let current = 0;
    const increment = Math.ceil(target / 50);
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      setCount(current);
    }, 30);
    return () => clearInterval(timer);
  }, [started, target]);

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-black accent-gradient tracking-tight">
      {count}{suffix}
    </span>
  );
}

export default function Statistics() {
  return (
    <section id="statistics" className="py-20 px-6 md:px-12 bg-brand-dark border-y border-brand-border/10 relative">
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
        {stats.map((stat, idx) => (
          <div key={idx} className="flex flex-col items-center text-center gap-1">
            <Counter target={stat.target} suffix={stat.suffix} />
            <span className="text-xs uppercase tracking-widest text-brand-secondary font-semibold mt-1">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
