import { initAccordionCSS } from '../components/accordion';
import { handleError } from '../utils/helpers';
import { logger } from '../utils/logger';

// Store cleanup functions
const cleanupFunctions = [];

export function initFaqPage() {
  logger.log('❓ FAQ page initialized');

  try {
    initAccordionCSS();
  } catch (error) {
    handleError(error, 'FAQ Page Initialization');
  }
}

/**
 * Cleanup function for FAQ page
 * Called when navigating away or before re-initialization
 */
export function cleanupFaqPage() {
  cleanupFunctions.forEach((cleanup) => {
    try {
      cleanup();
    } catch (error) {
      handleError(error, 'FAQ Page Cleanup');
    }
  });
  cleanupFunctions.length = 0;
}
