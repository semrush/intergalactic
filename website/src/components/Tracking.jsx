import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function Tracking(props) {
  const { listen } = useHistory();

  useEffect(() => {
    return listen((location) => {
      const trackingId = props.trackingId ?? window.GA_TRACKING_ID;
      if (!window.gtag || !trackingId) return;
      window.gtag('config', trackingId, {
        page_title: document.title,
        page_location: window.location.href,
        page_path: location.pathname,
      });
    });
  }, [props.trackingId, listen]);

  return null;
}

export default Tracking;
