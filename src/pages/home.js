import { initSwiper } from '../components/swiper';
import { initGSAP } from '../components/gsap';
import { initVideoPlayer } from '../components/videoPlayer';
import { handleError, smoothScrollTo } from '../utils/helpers';
import { logger } from '../utils/logger';
import { initModalBasic } from '../components/modal-basic';

const cleanupFunctions = [];

export async function initHomePage() {
  logger.log('🏠 Home page initialized');

  try {
    await initGSAP();
  } catch (error) {
    handleError(error, 'Home Page Initialization');
  }
}

export function cleanupHomePage() {
  cleanupFunctions.forEach((cleanup) => {
    try {
      cleanup();
    } catch (error) {
      handleError(error, 'Home Page Cleanup');
    }
  });
  cleanupFunctions.length = 0;
}
