import { initAccordionCSS } from '../components/accordion';
import { handleError } from '../utils/helpers';
import { logger } from '../utils/logger';

// Store cleanup functions
const cleanupFunctions = [];

export function initNewsPage() {
  logger.log('🔍 News page initialized');

  try {
    initAccordionCSS();
  } catch (error) {
    handleError(error, 'News Page Initialization');
  }
}

/**
 * Cleanup function for News page
 * Called when navigating away or before re-initialization
 */
export function cleanupNewsPage() {
  cleanupFunctions.forEach((cleanup) => {
    try {
      cleanup();
    } catch (error) {
      handleError(error, 'News Page Cleanup');
    }
  });
  cleanupFunctions.length = 0;
}
