/**
 * Vocalance Instructions Page - JavaScript
 * Handles collapsible sections and subsections
 */

(function() {
    'use strict';

    // =====================
    // Collapsible Sections
    // =====================
    
    /**
     * Initialize collapsible sections
     */
    function initializeCollapsibleSections() {
        const sectionHeaders = document.querySelectorAll('.section-header');
        
        sectionHeaders.forEach(header => {
            header.addEventListener('click', function() {
                const section = this.closest('.instruction-section');
                const content = section.querySelector('.section-content');
                
                // Toggle active state
                this.classList.toggle('active');
                content.classList.toggle('active');
                
                // Close all subsections when parent section is collapsed
                if (!content.classList.contains('active')) {
                    const subsections = content.querySelectorAll('.subsection-header');
                    const subsectionContents = content.querySelectorAll('.subsection-content');
                    
                    subsections.forEach(sub => sub.classList.remove('active'));
                    subsectionContents.forEach(subContent => subContent.classList.remove('active'));
                }
            });
        });
    }

    /**
     * Initialize collapsible subsections
     */
    function initializeCollapsibleSubsections() {
        const subsectionHeaders = document.querySelectorAll('.subsection-header');
        
        subsectionHeaders.forEach(header => {
            header.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent triggering parent section
                
                const subsection = this.closest('.subsection');
                const content = subsection.querySelector('.subsection-content');
                
                // Toggle active state
                this.classList.toggle('active');
                content.classList.toggle('active');
            });
        });
    }

    /**
     * Handle deep linking to sections
     */
    function handleDeepLinking() {
        const hash = window.location.hash;
        
        if (hash) {
            setTimeout(() => {
                const target = document.querySelector(hash);
                
                if (target) {
                    // Open the section if it's a main section
                    if (target.classList.contains('instruction-section')) {
                        const header = target.querySelector('.section-header');
                        const content = target.querySelector('.section-content');
                        
                        if (header && content) {
                            header.classList.add('active');
                            content.classList.add('active');
                        }
                    }
                    
                    // Scroll to the element
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }, 100);
        }
    }

    /**
     * Handle dropdown menu clicks
     */
    function initializeDropdownLinks() {
        const dropdownLinks = document.querySelectorAll('.dropdown-link');
        
        dropdownLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);
                    
                    if (targetElement && targetElement.classList.contains('instruction-section')) {
                        const header = targetElement.querySelector('.section-header');
                        const content = targetElement.querySelector('.section-content');
                        
                        // Open the section
                        if (header && content) {
                            header.classList.add('active');
                            content.classList.add('active');
                        }
                        
                        // Scroll to the section
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                        
                        // Update URL
                        if (history.pushState) {
                            history.pushState(null, null, href);
                        }
                    }
                }
            });
        });
    }

    /**
     * Expand all sections (for debugging or user preference)
     */
    function expandAllSections() {
        const sectionHeaders = document.querySelectorAll('.section-header');
        const sectionContents = document.querySelectorAll('.section-content');
        
        sectionHeaders.forEach(header => header.classList.add('active'));
        sectionContents.forEach(content => content.classList.add('active'));
    }

    /**
     * Collapse all sections
     */
    function collapseAllSections() {
        const sectionHeaders = document.querySelectorAll('.section-header');
        const sectionContents = document.querySelectorAll('.section-content');
        const subsectionHeaders = document.querySelectorAll('.subsection-header');
        const subsectionContents = document.querySelectorAll('.subsection-content');
        
        sectionHeaders.forEach(header => header.classList.remove('active'));
        sectionContents.forEach(content => content.classList.remove('active'));
        subsectionHeaders.forEach(header => header.classList.remove('active'));
        subsectionContents.forEach(content => content.classList.remove('active'));
    }

    /**
     * Search functionality (future enhancement)
     */
    function initializeSearch() {
        // Placeholder for future search functionality
        // Could filter commands based on user input
    }

    /**
     * Keyboard shortcuts for navigation
     */
    function initializeKeyboardShortcuts() {
        document.addEventListener('keydown', function(e) {
            // Ctrl/Cmd + K to focus search (future feature)
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                // Focus search input when implemented
            }
            
            // Escape to collapse all sections
            if (e.key === 'Escape') {
                collapseAllSections();
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
                
                // Skip if already handled by dropdown links
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
        initializeCollapsibleSections();
        initializeCollapsibleSubsections();
        initializeDropdownLinks();
        initializeSmoothScrolling();
        initializeKeyboardShortcuts();
        handleDeepLinking();
        
        console.log('Vocalance Instructions Page initialized successfully');
    });

    // Handle hash changes (browser back/forward)
    window.addEventListener('hashchange', function() {
        handleDeepLinking();
    });

    // Expose utility functions for debugging
    window.VocalanceInstructions = {
        expandAll: expandAllSections,
        collapseAll: collapseAllSections
    };

})();

