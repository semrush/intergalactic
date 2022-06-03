import { scroller } from 'react-scroll';

function scrollToHash(hash = undefined, options = {}) {
  if (hash !== undefined && typeof window !== 'undefined') {
    history.pushState(null, null, `#${hash}`);
  }
  const elementID = window.location.hash.replace('#', '');
  scroller.scrollTo(elementID, {
    smooth: 'easeInOutQuint',
    offset: -150,
    delay: 0,
    duration: 200,
    ...options,
  });
}

export default scrollToHash;
