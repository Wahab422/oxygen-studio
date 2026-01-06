/**
 * Webflow Page Router
 * This script automatically loads page-specific code based on the data-page attribute
 * Performance optimized: Uses dynamic imports for code splitting
 */

// Import global code (runs on every page)
import { initGlobal } from './global';
import { logger } from './utils/logger';

// Page registry - map page names to their dynamic import functions
// This enables code splitting - only the current page's code is loaded
const pageRegistry = {
  home: () => import('./pages/home').then((m) => m.initHomePage),
  about: () => import('./pages/about').then((m) => m.initAboutPage),
  contact: () => import('./pages/contact').then((m) => m.initContactPage),
  faq: () => import('./pages/faq').then((m) => m.initFaqPage),
  news: () => import('./pages/news').then((m) => m.initNewsPage),
};

/**
 * Get the current page name from the data-page attribute
 * Checks both <body> and <html> tags
 * Performance: Cache the result to avoid repeated queries
 */
let cachedPageName = null;
function getCurrentPage() {
  if (cachedPageName !== null) return cachedPageName;
  const bodyPage = document.body.getAttribute('data-page');
  const htmlPage = document.documentElement.getAttribute('data-page');
  cachedPageName = bodyPage || htmlPage || null;
  return cachedPageName;
}

/**
 * Initialize the current page
 * Performance optimized: Uses async/await for dynamic imports
 */
async function initPage() {
  // Always initialize global components first
  try {
    await initGlobal();
  } catch (error) {
    logger.error('[Webflow Router] Error initializing global components:', error);
  }

  // Then initialize page-specific code
  const pageName = getCurrentPage();

  if (!pageName) {
    logger.warn('[Webflow Router] No data-page attribute found on <html> or <body> tag');
    logger.log('[Webflow Router] Global components loaded, but no page-specific code will run');
    return;
  }

  const pageInit = pageRegistry[pageName];

  if (pageInit && typeof pageInit === 'function') {
    try {
      // Dynamically import and initialize the page module
      const initFn = await pageInit();
      if (initFn && typeof initFn === 'function') {
        initFn();
      }
    } catch (error) {
      logger.error(`[Webflow Router] Error initializing page "${pageName}":`, error);
    }
  } else {
    logger.warn(`[Webflow Router] No initialization function found for page: ${pageName}`);
  }
}

// Wait for DOM to be ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPage);
} else {
  initPage();
}
