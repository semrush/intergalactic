import React from 'react';
import rafTrottle from '@semcore/utils/lib/rafTrottle';
import canUseDOM from '@semcore/utils/lib/canUseDOM';

const DEFAULT_MEDIA = ['(min-width: 768px)', '(max-width: 767px)'];

class MediaList {
  mediaQueries = [];
  listeners = [];
  defaultIndex = 0;

  constructor(media, defaultIndex) {
    this.defaultIndex = defaultIndex ?? this.defaultIndex;
    if (canUseDOM()) {
      this.mediaQueries = media.map(window.matchMedia);
    }
    this.mediaQueries.forEach((m) => m.addListener(this.handlerMatchMedia));
  }

  destructor() {
    this.mediaQueries.forEach((m) => m.removeListener(this.handlerMatchMedia));
    this.mediaQueries = [];
    this.listeners = [];
  }

  handlerMatchMedia = rafTrottle((...args) => {
    this.listeners.forEach((cb) => cb(this.matches(), ...args));
  });

  matches() {
    const index = this.mediaQueries.findIndex((m) => m.matches);

    return index > -1 ? index : this.defaultIndex;
  }

  addListener(listener) {
    this.listeners.push(listener);
    return this.removeListener.bind(this, listener);
  }

  removeListener(listener) {
    this.listeners = this.listeners.filter((l) => l !== listener);
  }
}

function createBreakpoints(media) {
  function Breakpoints({ children }) {
    const [index, setIndex] = React.useState(Breakpoints.mediaList.matches());

    React.useEffect(
      () => Breakpoints.mediaList.addListener(() => setIndex(Breakpoints.mediaList.matches())),
      [],
    );

    return <Breakpoints.Context.Provider value={index}>{children}</Breakpoints.Context.Provider>;
  }

  Breakpoints.Context = React.createContext(undefined);
  Breakpoints.mediaList = new MediaList(media);

  return Breakpoints;
}

export { MediaList, DEFAULT_MEDIA, createBreakpoints };
export default createBreakpoints(DEFAULT_MEDIA);
