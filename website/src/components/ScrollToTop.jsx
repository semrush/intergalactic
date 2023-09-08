import React from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const isInitialMount = React.useRef(true);
  const { pathname } = useLocation();

  React.useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}
