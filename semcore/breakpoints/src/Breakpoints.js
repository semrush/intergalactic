import React, { useEffect, useState } from 'react';
import rafTrottle from '@semcore/utils/lib/rafTrottle';
import canUseDOM from '@semcore/utils/lib/canUseDOM';

class MediaList {
  mediaQueries = [];
  listeners = [];

  constructor(media) {
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
    return this.mediaQueries.findIndex((m) => m.matches);
  }

  addListener(listener) {
    this.listeners.push(listener);
    return this.removeListener.bind(this, listener);
  }

  removeListener(listener) {
    this.listeners = this.listeners.filter((l) => l !== listener);
  }
}

function createBreakpoints(media = DEFAULT_MEDIA) {
  function Breakpoints({ children }) {
    const [index, updateIndex] = useState(Breakpoints.mediaList.matches());

    useEffect(
      () => Breakpoints.mediaList.addListener(() => updateIndex(Breakpoints.mediaList.matches())),
      [],
    );

    return <Breakpoints.Context.Provider value={index}>{children}</Breakpoints.Context.Provider>;
  }

  Breakpoints.Context = React.createContext(undefined);
  Breakpoints.mediaList = new MediaList(media);

  return Breakpoints;
}

const DEFAULT_MEDIA = ['(min-width: 768px)', '(max-width: 769px)'];

export { MediaList, DEFAULT_MEDIA, createBreakpoints };
export default createBreakpoints();
