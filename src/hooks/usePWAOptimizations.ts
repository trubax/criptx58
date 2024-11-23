import { useEffect } from 'react';

export const usePWAOptimizations = () => {
  useEffect(() => {
    // Rimuovi il preventDefault dal touchend
    let lastTouchEnd = 0;
    document.addEventListener('touchend', (e) => {
      const now = Date.now();
      if (now - lastTouchEnd <= 300) {
        e.stopPropagation();
      }
      lastTouchEnd = now;
    }, { passive: true });

    // Gestisci la dimensione viewport su iOS
    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    window.addEventListener('resize', setViewportHeight);
    window.addEventListener('orientationchange', setViewportHeight);
    setViewportHeight();

    return () => {
      window.removeEventListener('resize', setViewportHeight);
      window.removeEventListener('orientationchange', setViewportHeight);
    };
  }, []);
}; 