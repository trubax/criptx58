import { useEffect } from 'react';

export const useFullscreenApp = () => {
  useEffect(() => {
    const enableFullscreen = () => {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      }
    };

    const preventBrowserBehaviors = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    // Abilita fullscreen su tap
    document.addEventListener('touchend', enableFullscreen, { once: true });
    
    // Previeni zoom e altri comportamenti del browser
    document.addEventListener('touchstart', preventBrowserBehaviors, { passive: false });
    document.addEventListener('touchmove', preventBrowserBehaviors, { passive: false });

    return () => {
      document.removeEventListener('touchstart', preventBrowserBehaviors);
      document.removeEventListener('touchmove', preventBrowserBehaviors);
    };
  }, []);
};

const useIOSFullscreen = () => {
  useEffect(() => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    if (isIOS && window.navigator.standalone) {
      // Forza la modalità fullscreen
      document.documentElement.style.setProperty('--safe-area-top', 'env(safe-area-inset-top)');
      document.documentElement.style.setProperty('--safe-area-bottom', 'env(safe-area-inset-bottom)');
      
      // Previeni il bounce effect
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.height = '100%';
    }
  }, []);
}; 