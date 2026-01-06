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
    if (document.querySelector('video-source-player')) {
      initVideoPlayer();
    }

    initSwiper();
    await initGSAP();
    initModalBasic();
    smoothScrollTo('[data-hero-scroll]', '#hero-section');
    handleAnimations();
    function handleAnimations() {
      const splitLines = document.querySelectorAll('[data-split-text="line"]');
      if (!splitLines.length < 1) {
        splitLines.forEach((splitLine) => {
          const lines = splitLine.querySelectorAll('.line');
          gsap.from(lines, {
            opacity: 0,
            y: 100,
            duration: 1.2,
            ease: 'power3.out',
            stagger: 0.15,
            scrollTrigger: splitLine,
          });
        });
      }
    }
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
