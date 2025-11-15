/**
 * Vocalance Launch Site - Main JavaScript
 * Handles smooth scrolling, navigation effects, and animations
 */

(function() {
    'use strict';

    // =====================
    // Navbar Scroll Effect & Mobile Menu
    // =====================
    
    const navbar = document.getElementById('navbar');
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navLinks = document.getElementById('nav-links');
    let lastScrollTop = 0;
    
    function handleNavbarScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }
    
    // Throttle scroll event for better performance
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(function() {
                handleNavbarScroll();
                scrollTimeout = null;
            }, 10);
        }
    });

    // =====================
    // Mobile Hamburger Menu
    // =====================
    
    if (hamburgerMenu) {
        hamburgerMenu.addEventListener('click', function() {
            hamburgerMenu.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Handle dropdown menus in mobile
    const navDropdowns = document.querySelectorAll('.nav-dropdown');
    navDropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('.nav-link');
        if (link) {
            link.addEventListener('click', function(e) {
                // On mobile, prevent default and toggle dropdown
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    e.stopPropagation();
                    dropdown.classList.toggle('active');
                }
            });
        }
    });

    // Close mobile menu when a non-dropdown link is clicked
    if (navLinks) {
        const navItems = navLinks.querySelectorAll('.nav-link');
        navItems.forEach(item => {
            // Only close menu if it's not a dropdown parent
            if (!item.parentElement.classList.contains('nav-dropdown')) {
                item.addEventListener('click', function() {
                    hamburgerMenu.classList.remove('active');
                    navLinks.classList.remove('active');
                });
            }
        });
        
        // Close menu when clicking dropdown children
        const dropdownLinks = navLinks.querySelectorAll('.dropdown-link');
        dropdownLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburgerMenu.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // =====================
    // Smooth Scroll for Navigation Links
    // =====================
    
    const navLinkElements = document.querySelectorAll('.nav-link');
    
    navLinkElements.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle internal anchor links
            if (href && href.startsWith('#')) {
                e.preventDefault();
                
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Update URL without triggering scroll
                    if (history.pushState) {
                        history.pushState(null, null, href);
                    }
                }
            }
        });
    });

    // =====================
    // Active Navigation Link Highlighting
    // =====================
    
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavigation() {
        const scrollPosition = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    let highlightTimeout;
    window.addEventListener('scroll', function() {
        if (!highlightTimeout) {
            highlightTimeout = setTimeout(function() {
                highlightNavigation();
                highlightTimeout = null;
            }, 50);
        }
    });

    // =====================
    // Intersection Observer for Animations
    // =====================
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Add animation class styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // =====================
    // Carousel Functionality
    // =====================
    
    const slides = document.querySelectorAll('.carousel-slide');
    const prevButton = document.querySelector('.carousel-btn-prev');
    const nextButton = document.querySelector('.carousel-btn-next');
    const indicators = document.querySelectorAll('.carousel-indicator');
    const carouselWrapper = document.querySelector('.carousel-wrapper');
    const carouselTexts = document.querySelectorAll('.carousel-text');
    
    let currentIndex = 0;
    const totalSlides = slides.length;
    let isAnimating = false;
    
    /**
     * Update carousel to show current slide
     */
    function updateCarousel() {
        slides.forEach((slide, index) => {
            slide.classList.remove('active', 'prev', 'next');
            
            if (index === currentIndex) {
                slide.classList.add('active');
            } else if (index === (currentIndex - 1 + totalSlides) % totalSlides) {
                slide.classList.add('prev');
            } else if (index === (currentIndex + 1) % totalSlides) {
                slide.classList.add('next');
            }
        });
        
        // Update indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.remove('active');
            if (index === currentIndex) {
                indicator.classList.add('active');
            }
        });
        
        // Update carousel text with fade animation
        carouselTexts.forEach((text, index) => {
            text.classList.remove('active');
            if (index === currentIndex) {
                text.classList.add('active');
            }
        });
    }
    
    /**
     * Go to next slide
     */
    function nextSlide() {
        if (isAnimating) return;
        isAnimating = true;
        
        currentIndex = (currentIndex + 1) % totalSlides;
        updateCarousel();
        
        setTimeout(() => {
            isAnimating = false;
        }, 600);
    }
    
    /**
     * Go to previous slide
     */
    function prevSlide() {
        if (isAnimating) return;
        isAnimating = true;
        
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateCarousel();
        
        setTimeout(() => {
            isAnimating = false;
        }, 600);
    }
    
    /**
     * Go to specific slide
     * @param {number} index - Target slide index
     */
    function goToSlide(index) {
        if (isAnimating || index === currentIndex) return;
        isAnimating = true;
        
        currentIndex = index;
        updateCarousel();
        
        setTimeout(() => {
            isAnimating = false;
        }, 600);
    }
    
    // Initialize carousel on DOM ready
    if (slides.length > 0) {
        updateCarousel();
        
        // Event listeners
        if (prevButton) {
            prevButton.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                prevSlide();
            });
        }
        
        if (nextButton) {
            nextButton.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                nextSlide();
            });
        }
        
        indicators.forEach((indicator) => {
            indicator.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                const index = parseInt(this.getAttribute('data-index'));
                goToSlide(index);
            });
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });
    
    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    if (carouselWrapper) {
        carouselWrapper.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        carouselWrapper.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
    }
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }

    // =====================
    // CTA Button Analytics (Placeholder)
    // =====================
    
    const ctaButton = document.querySelector('.btn-cta');
    
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            // Placeholder for analytics tracking
            console.log('CTA button clicked');
            
            // If you want to prevent default behavior (for now it's just a link)
            // e.preventDefault();
            
            // Here you would typically:
            // 1. Track the event with analytics
            // 2. Navigate to download section
            // 3. Show a modal or notification
        });
    }

    // =====================
    // Utility Functions
    // =====================
    
    /**
     * Debounce function to limit rate of function calls
     * @param {Function} func - Function to debounce
     * @param {number} wait - Wait time in milliseconds
     * @returns {Function} - Debounced function
     */
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    /**
     * Handle window resize events
     */
    const handleResize = debounce(function() {
        // Recalculate any dimension-dependent features
        highlightNavigation();
    }, 250);
    
    window.addEventListener('resize', handleResize);

    // =====================
    // Initialize on DOM Content Loaded
    // =====================
    
    // Check if page loaded with hash in URL
    if (window.location.hash) {
        setTimeout(function() {
            const target = document.querySelector(window.location.hash);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }, 100);
    }
    
    // Initial calls
    handleNavbarScroll();
    highlightNavigation();
    
    console.log('Vocalance Launch Site initialized successfully');

})();

