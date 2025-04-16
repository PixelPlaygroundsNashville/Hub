/**
 * script.js for Pixel Playgrounds Nashville (Multi-Page HTML Version)
 * Handles mobile navigation toggle, scroll animations, and current year in footer.
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Navigation Toggle ---
    const navToggle = document.querySelector('.mobile-nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !isExpanded);
            navLinks.classList.toggle('active'); // Toggles the 'active' class to show/hide

            // Change icon based on state
            const icon = navToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times'); // Change to close icon
                // Optional: Prevent body scroll when menu is open
                // document.body.style.overflow = 'hidden';
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                // Optional: Restore body scroll
                // document.body.style.overflow = '';
            }
        });

        // Close mobile menu if clicking outside of it (optional, but good UX)
        document.addEventListener('click', (event) => {
            const isClickInsideNav = navLinks.contains(event.target);
            const isClickOnToggle = navToggle.contains(event.target);

            if (navLinks.classList.contains('active') && !isClickInsideNav && !isClickOnToggle) {
                navToggle.click(); // Simulate click on toggle to close
            }
        });

        // Add active class to parent dropdown link if a child is active (for mobile styling)
        const activeDropdownLink = navLinks.querySelector('.dropdown-content a.active');
        if (activeDropdownLink) {
            const parentDropdownButton = activeDropdownLink.closest('.dropdown')?.querySelector('.dropbtn');
            if (parentDropdownButton) {
                parentDropdownButton.classList.add('active');
            }
        }
    }

    // --- Intersection Observer for Scroll Animations ---
    const animatedItems = document.querySelectorAll('.animate-on-scroll');

    if ('IntersectionObserver' in window && animatedItems.length > 0) {
        const observerOptions = {
            threshold: 0.15, // Trigger when 15% of the element is visible
            // rootMargin: "0px 0px -50px 0px" // Optional: Adjust trigger margin
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Optional: Stop observing once animated
                    // observer.unobserve(entry.target);
                }
                // Optional: Remove class if you want animation to repeat on scroll out
                // else {
                //     entry.target.classList.remove('visible');
                // }
            });
        }, observerOptions);

        // Observe each item
        animatedItems.forEach(item => {
            observer.observe(item);
            // Note: Staggering delay is now handled by inline style `--item-index` in the HTML/CSS
        });

    } else {
        // Fallback for older browsers or if observer fails
        animatedItems.forEach(item => item.classList.add('visible')); // Make all visible
        console.log("Intersection Observer not supported or no items found.");
    }


    // --- Footer Current Year ---
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- Add data-text attribute dynamically for glitch effect ---
    // Ensures glitch text matches actual headline text content
    document.querySelectorAll('h1[data-text], h2[data-text], h3[data-text]').forEach(header => {
        // Only set if data-text isn't already manually set to something different
        if (!header.getAttribute('data-text') || header.getAttribute('data-text') === header.textContent) {
             header.setAttribute('data-text', header.textContent);
        }
    });


    // --- Optional: Console log for debugging ---
    console.log("Pixel Playgrounds Script Initialized (Multi-Page Version)");

});
