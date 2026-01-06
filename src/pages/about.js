/**
 * About Page
 * Add your about page specific code here
 */

import { handleError, safeParseInt } from '../utils/helpers';
import { logger } from '../utils/logger';

// Store cleanup functions
const cleanupFunctions = [];
const eventHandlers = new WeakMap();

export function initAboutPage() {
  logger.log('ℹ️ About page initialized');

  try {
    // Example: Team member cards interaction
    const teamCards = document.querySelectorAll('[data-team-card]');
    teamCards.forEach((card) => {
      const handleMouseEnter = () => {
        card.classList.add('is-hovered');
      };
      const handleMouseLeave = () => {
        card.classList.remove('is-hovered');
      };

      card.addEventListener('mouseenter', handleMouseEnter, { passive: true });
      card.addEventListener('mouseleave', handleMouseLeave, { passive: true });

      // Store handlers for cleanup
      eventHandlers.set(card, { handleMouseEnter, handleMouseLeave });

      // Store cleanup function
      cleanupFunctions.push(() => {
        const handlers = eventHandlers.get(card);
        if (handlers) {
          card.removeEventListener('mouseenter', handlers.handleMouseEnter);
          card.removeEventListener('mouseleave', handlers.handleMouseLeave);
        }
      });
    });

    // Example: Stats counter animation
    // Performance optimized: Uses requestAnimationFrame instead of setInterval
    const animateCounter = (element, target, duration = 2000) => {
      const startTime = performance.now();
      const startValue = 0;
      let animationFrameId = null;
      let isCancelled = false;

      const animate = (currentTime) => {
        if (isCancelled) return;

        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Use easing function for smoother animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(startValue + (target - startValue) * easeOutQuart);

        element.textContent = current;

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(animate);
        } else {
          element.textContent = target;
        }
      };

      animationFrameId = requestAnimationFrame(animate);

      // Return cleanup function
      return () => {
        isCancelled = true;
        if (animationFrameId !== null) {
          cancelAnimationFrame(animationFrameId);
        }
      };
    };

    const statsElements = document.querySelectorAll('[data-stat]');
    const observers = [];
    const cancelFunctions = [];

    statsElements.forEach((stat) => {
      const target = safeParseInt(stat.getAttribute('data-stat'), 0);
      if (target > 0) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                const cancelFn = animateCounter(stat, target);
                cancelFunctions.push(cancelFn);
                observer.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.5 }
        );
        observer.observe(stat);
        observers.push(observer);
      }
    });

    // Store cleanup function for observers and animations
    cleanupFunctions.push(() => {
      observers.forEach((observer) => observer.disconnect());
      cancelFunctions.forEach((cancelFn) => {
        try {
          cancelFn();
        } catch (error) {
          // Ignore cleanup errors
        }
      });
    });
  } catch (error) {
    handleError(error, 'About Page Initialization');
  }
}

/**
 * Cleanup function for about page
 * Called when navigating away or before re-initialization
 */
export function cleanupAboutPage() {
  cleanupFunctions.forEach((cleanup) => {
    try {
      cleanup();
    } catch (error) {
      handleError(error, 'About Page Cleanup');
    }
  });
  cleanupFunctions.length = 0;
}
