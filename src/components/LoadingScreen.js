'use client';

import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const minLoadingTime = 2000;
    const maxLoadingTime = 3000;
    const startTime = Date.now();

    // Disable scroll on body during loading
    document.body.classList.add('loading');

    const handleLoad = () => {
      const elapsed = Date.now() - startTime;
      const delay = Math.max(0, minLoadingTime - elapsed);
      setTimeout(() => {
        setFade(true);
        setTimeout(() => {
          setVisible(false);
          document.body.classList.remove('loading');
        }, 500);
      }, delay);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    const forceTimer = setTimeout(() => {
      setFade(true);
      setTimeout(() => {
        setVisible(false);
        document.body.classList.remove('loading');
      }, 500);
    }, maxLoadingTime);

    return () => {
      window.removeEventListener('load', handleLoad);
      clearTimeout(forceTimer);
      document.body.classList.remove('loading');
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      id="loading-screen"
      style={{
        opacity: fade ? 0 : 1,
        transition: 'opacity 0.5s ease',
        pointerEvents: fade ? 'none' : 'all',
      }}
    >
      <div className="loader">
        <div className="spinner"></div>
        <h3>Loading HMW WebWorks</h3>
      </div>
    </div>
  );
}
