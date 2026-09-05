// Harsh Chauhan Portfolio JS Logic

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // --- THEME SWITCHER LOGIC ---
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeToggleMobileBtn = document.getElementById('theme-toggle-mobile');

  // Check user preference in localStorage
  const currentTheme = localStorage.getItem('theme') || 'dark';
  if (currentTheme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  const toggleTheme = () => {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  };

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
  }
  if (themeToggleMobileBtn) {
    themeToggleMobileBtn.addEventListener('click', toggleTheme);
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
      header.classList.add('glass-nav', 'border-b', 'border-brand-border', 'shadow-md');
      header.classList.remove('bg-transparent');
    } else {
      header.classList.remove('glass-nav', 'border-b', 'border-brand-border', 'shadow-md');
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
      link.classList.remove('text-brand-accent', 'after:scale-x-100');
      link.classList.add('text-brand-secondary');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.remove('text-brand-secondary');
        link.classList.add('text-brand-accent', 'after:scale-x-100');
      }
    });

    // Update glowing timeline progress line on scroll
    updateTimelineGlow();
  });

  // Timeline Scroll-based Glowing Progress Line & Active Milestone Dots Logic
  const timelineContainer = document.getElementById('experience-timeline');
  const timelineGlowLine = document.getElementById('timeline-glow-line');

  const updateTimelineGlow = () => {
    if (!timelineContainer || !timelineGlowLine) return;

    const rect = timelineContainer.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Start progress when top of timeline enters screen (75% viewport)
    // Reach 100% full height when bottom of timeline reaches upper screen (25% viewport)
    const startPoint = windowHeight * 0.75;
    const endPoint = windowHeight * 0.25;

    const scrolledDistance = startPoint - rect.top;
    const totalDistance = rect.height + (startPoint - endPoint);

    let progress = scrolledDistance / totalDistance;
    progress = Math.max(0, Math.min(1, progress));

    // Cover height dynamically from top-0 downward (0% to 100%)
    timelineGlowLine.style.height = `${(progress * 100).toFixed(1)}%`;

    // Activate dot glow & pulse when corresponding milestone enters viewport focus area
    const timelineItems = timelineContainer.querySelectorAll('.relative.reveal');
    timelineItems.forEach(item => {
      const dot = item.querySelector('.timeline-dot');
      if (!dot) return;

      const itemRect = item.getBoundingClientRect();
      if (itemRect.top < windowHeight * 0.7 && itemRect.bottom > windowHeight * 0.2) {
        dot.classList.add('active-dot');
      } else {
        dot.classList.remove('active-dot');
      }
    });
  };

  // Run on page load
  updateTimelineGlow();

  // --- SERVICE ACCORDION DROPDOWN ---
  const serviceAccordions = document.querySelectorAll('.service-accordion');
  serviceAccordions.forEach(card => {
    card.addEventListener('click', () => {
      const isOpen = card.classList.contains('is-open');

      // Close all other service cards first (only 1 open at a time)
      serviceAccordions.forEach(c => c.classList.remove('is-open'));

      // If this card wasn't already open, open it
      if (!isOpen) {
        card.classList.add('is-open');
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




  // Helper to get correct video path depending on window location protocol
  const getCorrectPath = (path) => {
    if (!path) return '';
    if (window.location.protocol === 'file:') {
      // For local folder direct run, resolve relative to public directory
      const cleanPath = path.startsWith('/') ? path.substring(1) : path;
      return 'public/' + cleanPath;
    }
    return path;
  };

  // Set up Hero Profile Video source
  const heroVideo = document.getElementById('hero-profile-video');
  if (heroVideo) {
    const rawPath = '/videos/profile video.mp4';
    const resolvedPath = getCorrectPath(rawPath);
    heroVideo.src = encodeURI(resolvedPath);
  }

  // --- PORTFOLIO DATA STRUCTURE ---
  const projectsData = {
    1: {
      title: "Moponasa Helmet Brand Identity",
      category: "Graphic Design / Brand Identity",
      filterCategory: "graphic",
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
      title: "Claude SaaS Product Animation",
      category: "Video Editing / SaaS Animation",
      filterCategory: "video",
      image: "assets/claude_saas_thumbnail.png",
      video: "/videos/claude saas animation.mp4",
      client: "Claude SaaS",
      year: "2026",
      desc: "An engaging SaaS product walkthrough and conceptual feature animation sequence for Claude. Built using high-fidelity vector UI mockups, smooth viewport pan transitions, and keyframe-animated component highlights."
    },
    3: {
      title: "3D Rubik's Cube Animation",
      category: "3D Visuals / Animation",
      filterCategory: "3d",
      image: "assets/rubik_thumbnail.jpg", // High quality 3D preview thumbnail poster
      video: "/videos/Rubik Cube video.mp4", // Path to your uploaded video file
      client: "Personal Project",
      year: "2026",
      desc: "An interactive and detailed 3D rendering and motion simulation of a Rubik's Cube, utilizing realistic textures, glossy reflections, and smooth animation cycles."
    },
    4: {
      title: "Voguel Streetwear Brand logo design",
      category: "Graphic Design / Streetwear Branding",
      filterCategory: "graphic",
      image: "assets/voguel_logo_black.png",
      images: [
        "assets/voguel_logo_black.png",
        "assets/voguel_brand_palette.png",
        "assets/voguel_hoodie_mockup.png",
        "assets/voguel_tshirt_back.png",
        "assets/voguel_cap_mockup.png",
        "assets/voguel_collar_detail.jpg",
        "assets/voguel_patch_detail.jpg",
        "assets/voguel_embroidery_detail.jpg"
      ],
      client: "Voguel Streetwear",
      year: "2026",
      desc: "Created a complete visual identity and brand package for Voguel Streetwear. Crafted custom vector typography with integrated hanger motifs, defined a minimalist monochrome brand palette, and designed high-end garment embroidery mockups and brand collateral."
    },
    5: {
      title: "How Algorithms Work",
      category: "Video Editing / Educational Animation",
      filterCategory: "video",
      video: "/videos/final.mp4",
      client: "Educational Platform",
      year: "2026",
      desc: "A conceptual motion graphic sequence and visual breakdown detailing how modern computer algorithms search, filter, and process complex data parameters."
    }
  };

  const portfolioGrid = document.getElementById('portfolio-grid');

  // Render portfolio grid dynamically
  const renderPortfolio = () => {
    if (!portfolioGrid) return;
    portfolioGrid.innerHTML = '';

    Object.keys(projectsData).forEach(id => {
      const project = projectsData[id];
      const card = document.createElement('div');
      card.className = 'portfolio-item group rounded-3xl overflow-hidden glass-panel border border-brand-border flex flex-col h-full transition-transform duration-500 hover:-translate-y-2';
      card.setAttribute('data-category', project.filterCategory);

      let mediaSection = '';
      if (project.video) {
        // Resolve path based on file protocol
        const resolvedPath = getCorrectPath(project.video);
        const encodedSrc = encodeURI(resolvedPath);
        mediaSection = `
          <div class="relative overflow-hidden aspect-video bg-brand-bg flex-shrink-0">
            ${project.image ? `<img src="${project.image}" alt="${project.title}" class="project-poster w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 absolute inset-0 z-10" loading="lazy">` : ''}
            <video src="${encodedSrc}" ${project.image ? `poster="${project.image}"` : ''} muted playsinline loop class="project-video w-full h-full object-cover absolute inset-0 ${project.image ? 'opacity-0 z-0' : 'opacity-100 z-10'} transition-opacity duration-300"></video>
            <div class="absolute inset-0 bg-[#6D5CFF]/20 opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm cursor-none view-project-btn z-20" data-id="${id}" data-type="video"></div>
          </div>
        `;
      } else {
        mediaSection = `
          <div class="relative overflow-hidden aspect-video bg-brand-bg flex-shrink-0">
            <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 absolute inset-0 z-10" loading="lazy">
            <div class="absolute inset-0 bg-[#6D5CFF]/20 opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm cursor-none view-project-btn z-20" data-id="${id}" data-type="image"></div>
          </div>
        `;
      }

      card.innerHTML = `
        ${mediaSection}
        <div class="p-5 flex flex-col justify-between flex-grow">
          <div>
            <span class="text-xs font-bold uppercase tracking-wider text-brand-secondary">${project.category}</span>
            <h3 class="text-base font-bold text-brand-primary mt-1 group-hover:text-brand-accent transition-colors">${project.title}</h3>
          </div>
        </div>
      `;

      portfolioGrid.appendChild(card);
    });

    setupPortfolioEvents();
  };

  // Case Study Modal elements
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

    // Load and render media
    if (modalImagesShowcase) {
      modalImagesShowcase.innerHTML = '';
      if (project.video) {
        // If it's a video project, render a video player inside the details modal
        const resolvedPath = getCorrectPath(project.video);
        const encodedSrc = encodeURI(resolvedPath);
        const videoEl = document.createElement('video');
        videoEl.src = encodedSrc;
        videoEl.controls = true;
        videoEl.className = 'w-full max-w-5xl rounded-2xl md:rounded-3xl border border-slate-900 shadow-2xl object-contain bg-black aspect-video';
        videoEl.autoplay = true;
        modalImagesShowcase.appendChild(videoEl);
      } else {
        // Load and render images vertically
        const images = project.images || [project.image];
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
    
    // Pause and clear any video inside the details modal to stop sound
    if (modalImagesShowcase) {
      const modalVideo = modalImagesShowcase.querySelector('video');
      if (modalVideo) {
        modalVideo.pause();
        modalVideo.src = '';
      }
    }

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

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  // Video Lightbox Modal elements
  const videoModal = document.getElementById('video-modal');
  const videoClose = document.getElementById('video-modal-close');
  const lightboxVideo = document.getElementById('lightbox-video');

  const openVideoModal = (src) => {
    if (!videoModal || !lightboxVideo) return;
    
    const resolvedPath = getCorrectPath(src);
    lightboxVideo.src = encodeURI(resolvedPath);
    
    // Hide custom project hover cursor while viewing video
    const customCursor = document.getElementById('custom-project-cursor');
    if (customCursor) {
      customCursor.style.display = 'none';
    }

    videoModal.classList.remove('hidden');
    // Force reflow
    videoModal.offsetWidth;
    videoModal.classList.remove('opacity-0', 'pointer-events-none');
    videoModal.classList.add('opacity-100');
    document.body.style.overflow = 'hidden';

    // Play video
    lightboxVideo.play().catch(err => console.log('Modal video play failed:', err));
  };

  const closeVideoModal = () => {
    if (!videoModal || !lightboxVideo) return;
    
    lightboxVideo.pause();
    lightboxVideo.src = ''; // Clear source to stop buffering

    videoModal.classList.add('opacity-0', 'pointer-events-none');
    document.body.style.overflow = 'auto';

    setTimeout(() => {
      videoModal.classList.add('hidden');
      // Restore custom project hover cursor display after modal closes
      const customCursor = document.getElementById('custom-project-cursor');
      if (customCursor) {
        customCursor.style.display = 'flex';
      }
    }, 300);
  };

  if (videoClose) {
    videoClose.addEventListener('click', closeVideoModal);
  }

  // Enquiry Modal triggers
  const enquiryModal = document.getElementById('enquiry-modal');
  const openEnquiryBtn = document.getElementById('open-enquiry-btn');
  const closeEnquiryBtn = document.getElementById('enquiry-modal-close');

  const openEnquiryModal = () => {
    if (!enquiryModal) return;
    
    // Hide custom project hover cursor while viewing enquiry form
    const customCursor = document.getElementById('custom-project-cursor');
    if (customCursor) {
      customCursor.style.display = 'none';
    }

    enquiryModal.classList.remove('hidden');
    // Force reflow
    enquiryModal.offsetWidth;
    enquiryModal.classList.remove('opacity-0', 'pointer-events-none');
    enquiryModal.classList.add('opacity-100');
    document.body.style.overflow = 'hidden';
  };

  const closeEnquiryModal = () => {
    if (!enquiryModal) return;
    
    enquiryModal.classList.add('opacity-0', 'pointer-events-none');
    document.body.style.overflow = 'auto';

    setTimeout(() => {
      enquiryModal.classList.add('hidden');
      // Restore custom project hover cursor display after modal closes
      const customCursor = document.getElementById('custom-project-cursor');
      if (customCursor) {
        customCursor.style.display = 'flex';
      }
    }, 300);
  };

  if (openEnquiryBtn) {
    openEnquiryBtn.addEventListener('click', openEnquiryModal);
  }
  if (closeEnquiryBtn) {
    closeEnquiryBtn.addEventListener('click', closeEnquiryModal);
  }
  if (enquiryModal) {
    enquiryModal.addEventListener('click', (e) => {
      if (e.target === enquiryModal) {
        closeEnquiryModal();
      }
    });
  }

  // Keyboard support for modals (ESC to close)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (modal && !modal.classList.contains('hidden')) {
        closeModal();
      }
      if (videoModal && !videoModal.classList.contains('hidden')) {
        closeVideoModal();
      }
      if (enquiryModal && !enquiryModal.classList.contains('hidden')) {
        closeEnquiryModal();
      }
    }
  });

  // Setup hover playback and click events
  const setupPortfolioEvents = () => {
    // Hover previews
    const cards = document.querySelectorAll('.portfolio-item');
    cards.forEach(card => {
      const video = card.querySelector('.project-video');
      if (!video) return;

      card.addEventListener('mouseenter', () => {
        // Pause all other video previews
        document.querySelectorAll('.project-video').forEach(v => {
          if (v !== video) {
            v.pause();
            v.currentTime = 0;
            // Only hide video opacity if there's a poster image to show instead
            if (v.closest('.portfolio-item').querySelector('.project-poster')) {
              v.style.opacity = '0';
            }
          }
        });

        // Play this one
        video.play().then(() => {
          video.style.opacity = '1';
        }).catch(err => console.log('Auto-play blocked:', err));
      });

      card.addEventListener('mouseleave', () => {
        video.pause();
        video.currentTime = 0;
        // Only hide video opacity if there's a poster image to show instead
        if (card.querySelector('.project-poster')) {
          video.style.opacity = '0';
        }
      });
    });

    // Wire up view project buttons
    const viewProjectButtons = document.querySelectorAll('.view-project-btn');
    viewProjectButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const projectId = btn.getAttribute('data-id');
        openModal(projectId);
      });
    });

    // Custom Project Hover Cursor toggle logic
    const customCursor = document.getElementById('custom-project-cursor');
    if (customCursor) {
      cards.forEach(item => {
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

        item.addEventListener('click', () => {
          customCursor.style.transition = 'opacity 0.1s ease, transform 0.1s ease';
          customCursor.style.opacity = '0';
          customCursor.style.transform = 'translate(-50%, -50%) scale(0.3)';
        });
      });
    }
  };

  // Wire up filter buttons
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => {
        b.classList.remove('bg-brand-accent', 'text-white', 'border-transparent');
        b.classList.add('bg-brand-white', 'border-brand-border', 'text-brand-secondary');
      });
      btn.classList.remove('bg-brand-white', 'border-brand-border', 'text-brand-secondary');
      btn.classList.add('bg-brand-accent', 'text-white', 'border-transparent');

      const filterValue = btn.getAttribute('data-filter');
      const cards = document.querySelectorAll('.portfolio-item');

      cards.forEach(item => {
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

  // Render portfolio on startup
  renderPortfolio();

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
        dots[idx].classList.remove('bg-brand-accent', 'w-6');
        dots[idx].classList.add('bg-brand-border', 'w-2');
      }
    });

    testimonials[currentSlide].classList.remove('hidden');
    // Micro-delay for transition smooth fade
    setTimeout(() => {
      testimonials[currentSlide].classList.remove('opacity-0');
      testimonials[currentSlide].classList.add('opacity-100');
    }, 50);

    if (dots[currentSlide]) {
      dots[currentSlide].classList.add('bg-brand-accent', 'w-6');
      dots[currentSlide].classList.remove('bg-brand-border', 'w-2');
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

      // Close modal
      closeEnquiryModal();
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
        // Interpolate coordinates for an extra smooth organic lag feel (lerp)
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        
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

