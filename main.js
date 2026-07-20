// Harsh Chauhan Portfolio JS Logic

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // --- NAVIGATION EFFECTS ---
  const header = document.getElementById('navbar-header');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');

  // Sticky Header & Back to Top Button visibility
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    // Header effect
    if (window.scrollY > 20) {
      header.classList.add('bg-slate-900/80', 'backdrop-blur-md', 'border-b', 'border-slate-800', 'shadow-lg');
      header.classList.remove('bg-transparent');
    } else {
      header.classList.remove('bg-slate-900/80', 'backdrop-blur-md', 'border-b', 'border-slate-800', 'shadow-lg');
      header.classList.add('bg-transparent');
    }

    // Back to top button
    if (window.scrollY > 400) {
      backToTopBtn.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
      backToTopBtn.classList.add('opacity-100', 'translate-y-0');
    } else {
      backToTopBtn.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
      backToTopBtn.classList.remove('opacity-100', 'translate-y-0');
    }

    // Scrollspy - Update active link
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('text-white', 'after:scale-x-100');
      link.classList.add('text-slate-400');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.remove('text-slate-400');
        link.classList.add('text-white', 'after:scale-x-100');
      }
    });
  });

  // Mobile Menu Toggle
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('translate-x-0');
      if (isOpen) {
        mobileMenu.classList.remove('translate-x-0');
        mobileMenu.classList.add('translate-x-full');
        mobileMenuBtn.innerHTML = '<i data-lucide="menu" class="w-6 h-6"></i>';
      } else {
        mobileMenu.classList.remove('translate-x-full');
        mobileMenu.classList.add('translate-x-0');
        mobileMenuBtn.innerHTML = '<i data-lucide="x" class="w-6 h-6"></i>';
      }
      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }
    });
  }

  // Close Mobile Menu on Link Click
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileMenu) {
        mobileMenu.classList.add('translate-x-full');
        mobileMenu.classList.remove('translate-x-0');
        mobileMenuBtn.innerHTML = '<i data-lucide="menu" class="w-6 h-6"></i>';
        if (typeof lucide !== 'undefined') {
          lucide.createIcons();
        }
      }
    });
  });

  // Back to Top Action
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }


  // --- DYNAMIC COUNTERS ---
  const counterElements = document.querySelectorAll('.counter');
  
  const animateCounters = () => {
    counterElements.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'), 10);
      const suffix = counter.getAttribute('data-suffix') || '';
      let count = 0;
      const speed = 2000 / target; // Max duration of 2 seconds
      
      const updateCount = () => {
        const increment = Math.ceil(target / 50); // Increment speed
        if (count < target) {
          count += increment;
          if (count > target) count = target;
          counter.innerText = count + suffix;
          setTimeout(updateCount, 30);
        } else {
          counter.innerText = target + suffix;
        }
      };
      
      updateCount();
    });
  };

  // Intersection Observer for Counters
  const counterSection = document.getElementById('statistics');
  if (counterSection) {
    let countTriggered = false;
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !countTriggered) {
          animateCounters();
          countTriggered = true;
        }
      });
    }, { threshold: 0.3 });

    counterObserver.observe(counterSection);
  }


  // --- FADE UP ANIMATIONS ON SCROLL ---
  const fadeElements = document.querySelectorAll('.reveal');
  
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Unobserve after showing
        fadeObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  fadeElements.forEach(el => {
    fadeObserver.observe(el);
  });

  // Fallback geometry check for elements already in the viewport on page load
  const forceVisibleInViewport = () => {
    fadeElements.forEach(el => {
      if (!el.classList.contains('active')) {
        const rect = el.getBoundingClientRect();
        // If element is visible or partially overlaps with the viewport layout
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add('active');
          fadeObserver.unobserve(el);
        }
      }
    });
  };

  // Run immediate triggers to prevent any blank or black page initialization issues
  forceVisibleInViewport();
  setTimeout(forceVisibleInViewport, 150);
  setTimeout(forceVisibleInViewport, 500);




  // --- PORTFOLIO FILTERING AND MODAL ---
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle Active Button Styles
      filterButtons.forEach(b => b.classList.remove('bg-white', 'text-black'));
      filterButtons.forEach(b => b.classList.add('bg-slate-800', 'text-slate-300'));
      btn.classList.remove('bg-slate-800', 'text-slate-300');
      btn.classList.add('bg-white', 'text-black');

      const filterValue = btn.getAttribute('data-filter');

      portfolioItems.forEach(item => {
        // Animate out, filter, then animate in
        item.style.transform = 'scale(0.9)';
        item.style.opacity = '0';
        
        setTimeout(() => {
          if (filterValue === 'all' || item.getAttribute('data-category').includes(filterValue)) {
            item.style.display = 'block';
            setTimeout(() => {
              item.style.transform = 'scale(1)';
              item.style.opacity = '1';
            }, 50);
          } else {
            item.style.display = 'none';
          }
        }, 300);
      });
    });
  });

  const projectsData = {
    1: {
      title: "Moponasa Helmet Brand Identity",
      category: "Graphic Design / Brand Identity",
      image: "assets/moponasa_stationery.jpg",
      images: [
        "assets/moponasa_stationery.jpg",
        "assets/moponasa_logo_leather.jpg",
        "assets/moponasa_helmet_close.jpg",
        "assets/moponasa_packaging.jpg",
        "assets/moponasa_bag_packaging.jpg",
        "assets/moponasa_box_details.jpg",
        "assets/moponasa_stickers.jpg",
        "assets/moponasa_tags.jpg",
        "assets/moponasa_guidelines.jpg",
        "assets/moponasa_social.jpg",
        "assets/moponasa_bag_shopping.jpg",
        "assets/moponasa_rider_banner.jpg",
        "assets/moponasa_thank_you.jpg"
      ],
      client: "Moponasa Helmet Ltd.",
      year: "2026",
      desc: "Developed a cohesive corporate brand identity system, custom product packaging boxes, and stationery suite for Moponasa Helmet. Formulated custom minimalist logo typography, notebook layouts, business cards, and tag guidelines reflecting high-end utility aesthetics."
    },
    2: {
      title: "Cinematic Color Grading & Editing",
      category: "Video Editing / Post Production",
      image: "assets/project_video_editing.png",
      images: [
        "assets/project_video_editing.png"
      ],
      client: "Cinematic Studio Niche",
      year: "2026",
      desc: "Professional timeline editing, post-production audio master design, cinematic color grading, and dynamic visual tracking layers. Engineered high-converting cinematic trailers and advertisement video sequences optimized for modern social campaigns."
    },
    3: {
      title: "Luxury Abstract Geometric Renders",
      category: "3D Visuals / Art Direction",
      image: "assets/project_3d_visual.png",
      images: [
        "assets/project_3d_visual.png"
      ],
      client: "Creative Studio Concept",
      year: "2026",
      desc: "Stunning 3D abstract visual rendering and composition featuring geometric glossy glass elements, liquid chrome reflective layers, and clean architectural lighting. Created for high-end digital branding interfaces and luxury art catalogs."
    }
  };

  // Portfolio Modal elements
  const modal = document.getElementById('portfolio-modal');
  const modalCategory = document.getElementById('modal-category');
  const modalTitle = document.getElementById('modal-title');
  const modalClient = document.getElementById('modal-client');
  const modalYear = document.getElementById('modal-year');
  const modalDesc = document.getElementById('modal-description');
  const modalClose = document.getElementById('modal-close');
  const modalImagesShowcase = document.getElementById('modal-images-showcase');

  const openModal = (id) => {
    const project = projectsData[id];
    if (!project || !modal) return;

    modalCategory.innerText = project.category;
    modalTitle.innerText = project.title;
    modalClient.innerText = project.client;
    modalYear.innerText = project.year;
    modalDesc.innerText = project.desc;

    // Load and render images vertically
    const images = project.images || [project.image];
    if (modalImagesShowcase) {
      modalImagesShowcase.innerHTML = '';
      images.forEach((imgSrc) => {
        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = project.title;
        img.className = 'w-full max-w-5xl rounded-2xl md:rounded-3xl border border-slate-900 shadow-2xl object-contain cursor-zoom-in transition-all duration-300 hover:border-slate-800';
        img.loading = 'lazy';
        img.addEventListener('click', () => {
          window.open(imgSrc, '_blank');
        });
        modalImagesShowcase.appendChild(img);
      });
    }

    // Hide custom project hover cursor while viewing project case study
    const customCursor = document.getElementById('custom-project-cursor');
    if (customCursor) {
      customCursor.style.display = 'none';
    }

    // Reset scroll position to top of scroll wrapper
    const scrollWrapper = document.getElementById('modal-scroll-wrapper');
    if (scrollWrapper) scrollWrapper.scrollTop = 0;

    // Show modal with animation
    modal.classList.remove('hidden');
    modal.classList.remove('opacity-0', 'pointer-events-none');
    modal.classList.add('opacity-100');
    document.body.style.overflow = 'hidden'; // Stop page scrolling
  };

  const closeModal = () => {
    if (!modal) return;
    modal.classList.add('opacity-0', 'pointer-events-none');
    document.body.style.overflow = 'auto'; // Re-enable page scrolling
    setTimeout(() => {
      modal.classList.add('hidden');

      // Restore custom project hover cursor display after modal closes
      const customCursor = document.getElementById('custom-project-cursor');
      if (customCursor) {
        customCursor.style.display = 'flex';
      }
    }, 300);
  };

  // Wire up view project buttons
  const viewProjectButtons = document.querySelectorAll('.view-project-btn');
  viewProjectButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-id');
      openModal(projectId);
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  // Keyboard support for modal (ESC to close)
  document.addEventListener('keydown', (e) => {
    if (modal && !modal.classList.contains('hidden')) {
      if (e.key === 'Escape') {
        closeModal();
      }
    }
  });

  // --- TESTIMONIALS SLIDER ---
  const testimonials = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.testimonial-dot');
  const prevBtn = document.getElementById('prev-testimonial');
  const nextBtn = document.getElementById('next-testimonial');
  let currentSlide = 0;
  let slideInterval;

  const showSlide = (index) => {
    if (testimonials.length === 0) return;
    
    // Boundary checks
    if (index >= testimonials.length) currentSlide = 0;
    else if (index < 0) currentSlide = testimonials.length - 1;
    else currentSlide = index;

    testimonials.forEach((slide, idx) => {
      slide.classList.add('hidden', 'opacity-0');
      slide.classList.remove('block', 'opacity-100');
      
      if (dots[idx]) {
        dots[idx].classList.remove('bg-blue-500', 'w-6');
        dots[idx].classList.add('bg-slate-700', 'w-2');
      }
    });

    testimonials[currentSlide].classList.remove('hidden');
    // Micro-delay for transition smooth fade
    setTimeout(() => {
      testimonials[currentSlide].classList.remove('opacity-0');
      testimonials[currentSlide].classList.add('opacity-100');
    }, 50);

    if (dots[currentSlide]) {
      dots[currentSlide].classList.add('bg-blue-500', 'w-6');
      dots[currentSlide].classList.remove('bg-slate-700', 'w-2');
    }
  };

  const startSlideShow = () => {
    slideInterval = setInterval(() => {
      showSlide(currentSlide + 1);
    }, 6000);
  };

  const stopSlideShow = () => {
    clearInterval(slideInterval);
  };

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      stopSlideShow();
      showSlide(currentSlide + 1);
      startSlideShow();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      stopSlideShow();
      showSlide(currentSlide - 1);
      startSlideShow();
    });
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const slideIndex = parseInt(dot.getAttribute('data-slide'), 10);
      stopSlideShow();
      showSlide(slideIndex);
      startSlideShow();
    });
  });

  // Initialize
  if (testimonials.length > 0) {
    showSlide(0);
    startSlideShow();
  }


  // --- CONTACT FORM SUBMISSION ---
  const contactForm = document.getElementById('contact-form');
  const toastContainer = document.getElementById('toast-container');

  const showToast = (message, isSuccess = true) => {
    if (!toastContainer) return;
    
    const toast = document.createElement('div');
    toast.className = `flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl border transition-all duration-500 translate-y-10 opacity-0 ${
      isSuccess 
        ? 'bg-slate-900 border-emerald-500/30 text-emerald-400' 
        : 'bg-slate-900 border-rose-500/30 text-rose-400'
    }`;
    
    const icon = isSuccess ? 'check-circle' : 'alert-circle';
    toast.innerHTML = `
      <i data-lucide="${icon}" class="w-5 h-5 flex-shrink-0"></i>
      <span class="text-sm font-medium text-slate-200">${message}</span>
    `;
    
    toastContainer.appendChild(toast);
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
    
    // Slide in
    setTimeout(() => {
      toast.classList.remove('translate-y-10', 'opacity-0');
      toast.classList.add('translate-y-0', 'opacity-100');
    }, 50);

    // Fade out and remove
    setTimeout(() => {
      toast.classList.remove('translate-y-0', 'opacity-100');
      toast.classList.add('translate-y-10', 'opacity-0');
      setTimeout(() => {
        toast.remove();
      }, 500);
    }, 4500);
  };

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('sender-name').value.trim();
      const email = document.getElementById('sender-email').value.trim();
      const phone = document.getElementById('sender-phone').value.trim();
      const projectType = document.getElementById('project-type').value;
      const message = document.getElementById('sender-message').value.trim();
      
      // Simple validation
      if (!name || !email || !message) {
        showToast("Please fill in all required fields (Name, Email, Message).", false);
        return;
      }
      
      // Email Regex check
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showToast("Please enter a valid email address.", false);
        return;
      }

      // Success Simulation
      console.log('Form Submitted successfully:', { name, email, phone, projectType, message });
      
      // Show success toast
      showToast("Thank you! Your message has been sent successfully. Harsh will contact you shortly.");
      
      // Clear form
      contactForm.reset();
    });
  }

  // --- CUSTOM PROJECT HOVER CURSOR LOGIC ---
  const customCursor = document.getElementById('custom-project-cursor');

  if (customCursor && portfolioItems.length > 0) {
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let firstMove = true;

    // Track mouse coordinates
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (firstMove) {
        cursorX = mouseX;
        cursorY = mouseY;
        firstMove = false;
      }
    });

    // Smooth coordinates updates using vanilla JS requestAnimationFrame loop
    const updateCursor = () => {
      if (!firstMove) {
        // Interpolate coordinates for a premium organic lag feel (lerp)
        cursorX += (mouseX - cursorX) * 0.16;
        cursorY += (mouseY - cursorY) * 0.16;
        
        customCursor.style.left = `${cursorX}px`;
        customCursor.style.top = `${cursorY}px`;
      }
      requestAnimationFrame(updateCursor);
    };

    updateCursor();

    // Toggle visibility and scale states on card hover
    portfolioItems.forEach(item => {
      item.addEventListener('mouseenter', () => {
        customCursor.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
        customCursor.style.opacity = '1';
        customCursor.style.transform = 'translate(-50%, -50%) scale(1)';
      });

      item.addEventListener('mouseleave', () => {
        customCursor.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
        customCursor.style.opacity = '0';
        customCursor.style.transform = 'translate(-50%, -50%) scale(0.3)';
      });

      // Instantly hide custom cursor on details selection click
      item.addEventListener('click', () => {
        customCursor.style.transition = 'opacity 0.1s ease, transform 0.1s ease';
        customCursor.style.opacity = '0';
        customCursor.style.transform = 'translate(-50%, -50%) scale(0.3)';
      });
    });
  }

});

