import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function Tracking({ trackingId = window.GA_TRACKING_ID }) {
  const { listen } = useHistory();

  useEffect(() => {
    return listen((location) => {
      if (!window.gtag || !trackingId) return;
      window.gtag('config', trackingId, {
        page_title: document.title,
        page_location: window.location.href,
        page_path: location.pathname,
      });
    });
  }, [trackingId, listen]);

  return null;
}

export default Tracking;
