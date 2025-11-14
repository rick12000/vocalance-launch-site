/**
 * Vocalance FAQ Page - JavaScript
 * Handles collapsible FAQ items
 */

(function() {
    'use strict';

    // =====================
    // Collapsible FAQ Items
    // =====================
    
    /**
     * Initialize collapsible FAQ items
     */
    function initializeCollapsibleFAQ() {
        const faqHeaders = document.querySelectorAll('.faq-header');
        
        faqHeaders.forEach(header => {
            header.addEventListener('click', function() {
                const faqItem = this.closest('.faq-item');
                const faqBody = faqItem.querySelector('.faq-body');
                
                // Toggle active state
                this.classList.toggle('active');
                faqBody.classList.toggle('active');
            });
        });
    }

    /**
     * Expand all FAQ items
     */
    function expandAllFAQ() {
        const faqHeaders = document.querySelectorAll('.faq-header');
        const faqBodies = document.querySelectorAll('.faq-body');
        
        faqHeaders.forEach(header => header.classList.add('active'));
        faqBodies.forEach(body => body.classList.add('active'));
    }

    /**
     * Collapse all FAQ items
     */
    function collapseAllFAQ() {
        const faqHeaders = document.querySelectorAll('.faq-header');
        const faqBodies = document.querySelectorAll('.faq-body');
        
        faqHeaders.forEach(header => header.classList.remove('active'));
        faqBodies.forEach(body => body.classList.remove('active'));
    }

    /**
     * Handle deep linking to FAQ items
     */
    function handleDeepLinking() {
        const hash = window.location.hash;
        
        if (hash) {
            setTimeout(() => {
                const targetId = hash.substring(1);
                const targetElement = document.querySelector(`[data-faq="${targetId}"]`);
                
                if (targetElement) {
                    const faqItem = targetElement.closest('.faq-item');
                    const faqBody = faqItem.querySelector('.faq-body');
                    
                    // Open the FAQ item
                    targetElement.classList.add('active');
                    faqBody.classList.add('active');
                    
                    // Scroll to the element
                    faqItem.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }, 100);
        }
    }

    /**
     * Keyboard shortcuts for navigation
     */
    function initializeKeyboardShortcuts() {
        document.addEventListener('keydown', function(e) {
            // Escape to collapse all FAQ items
            if (e.key === 'Escape') {
                collapseAllFAQ();
            }
        });
    }

    /**
     * Add smooth scrolling behavior to all anchor links
     */
    function initializeSmoothScrolling() {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        
        anchorLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Skip if it's a dropdown link
                if (this.classList.contains('dropdown-link')) {
                    return;
                }
                
                if (href && href.startsWith('#') && href !== '#') {
                    e.preventDefault();
                    
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);
                    
                    if (targetElement) {
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                        
                        if (history.pushState) {
                            history.pushState(null, null, href);
                        }
                    }
                }
            });
        });
    }

    // =====================
    // Initialize Everything
    // =====================
    
    document.addEventListener('DOMContentLoaded', function() {
        initializeCollapsibleFAQ();
        initializeSmoothScrolling();
        initializeKeyboardShortcuts();
        handleDeepLinking();
        
        console.log('Vocalance FAQ Page initialized successfully');
    });

    // Handle hash changes (browser back/forward)
    window.addEventListener('hashchange', function() {
        handleDeepLinking();
    });

    // Expose utility functions for debugging
    window.VocalanceFAQ = {
        expandAll: expandAllFAQ,
        collapseAll: collapseAllFAQ
    };

})();
