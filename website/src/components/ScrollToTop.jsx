import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const isInitialMount = useRef(true);
  const { pathname } = useLocation();

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}
