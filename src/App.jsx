import { useState, useEffect, useCallback } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Process from './components/Process';
import Statistics from './components/Statistics';
import Testimonials from './components/Testimonials';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { PortfolioModal, VideoModal, EnquiryModal } from './components/Modals';

function App() {
  const [portfolioModal, setPortfolioModal] = useState(null);
  const [videoModal, setVideoModal] = useState(null);
  const [enquiryModal, setEnquiryModal] = useState(false);

  // Scroll reveal animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            entry.target.setAttribute('data-revealed', 'true');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const observeElements = () => {
      document.querySelectorAll('.reveal').forEach(el => {
        if (!el.classList.contains('active') && !el.hasAttribute('data-revealed')) {
          observer.observe(el);
        }
      });
    };

    observeElements();
    const timer1 = setTimeout(observeElements, 150);
    const timer2 = setTimeout(observeElements, 500);

    return () => {
      observer.disconnect();
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  // Re-observe when modals close (new elements may appear)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            entry.target.setAttribute('data-revealed', 'true');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    document.querySelectorAll('.reveal:not(.active):not([data-revealed="true"])').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [portfolioModal, videoModal, enquiryModal]);

  const openModal = useCallback((project) => {
    setPortfolioModal(project);
    document.body.style.overflow = 'hidden';
  }, []);

  const openVideo = useCallback((src) => {
    setVideoModal(src);
    document.body.style.overflow = 'hidden';
  }, []);

  const openEnquiry = useCallback(() => {
    setEnquiryModal(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeModals = useCallback(() => {
    setPortfolioModal(null);
    setVideoModal(null);
    setEnquiryModal(false);
    document.body.style.overflow = 'auto';
  }, []);

  // ESC key support
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') closeModals();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [closeModals]);

  return (
    <ThemeProvider>
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/10 w-96 h-96 rounded-full bg-brand-accent/[0.04] blur-3xl animate-float-1"></div>
        <div className="absolute top-2/3 right-1/10 w-96 h-96 rounded-full bg-brand-accent/[0.04] blur-3xl animate-float-2"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-accent/[0.02] blur-3xl animate-slow-pulse"></div>
      </div>

      <Header />

      <main className="relative z-10">
        <Hero />
        <About />
        <Services />
        <Portfolio onOpenModal={openModal} onOpenVideo={openVideo} />
        <Process />
        <Statistics />
        <Testimonials />
        <Experience />
        <Contact onOpenEnquiry={openEnquiry} />
      </main>

      <Footer />

      {portfolioModal && <PortfolioModal project={portfolioModal} onClose={closeModals} />}
      {videoModal && <VideoModal src={videoModal} onClose={closeModals} />}
      {enquiryModal && <EnquiryModal onClose={closeModals} />}
    </ThemeProvider>
  );
}

export default App;
