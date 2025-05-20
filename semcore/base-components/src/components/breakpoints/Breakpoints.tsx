import React from 'react';
import rafTrottle from '@semcore/core/lib/utils/rafTrottle';
import canUseDOM from '@semcore/core/lib/utils/canUseDOM';

const DEFAULT_MEDIA = ['(min-width: 768px)', '(max-width: 767px)'];

type Listener = (...args: any[]) => void;

class MediaList {
  mediaQueries: MediaQueryList[] = [];
  listeners: Listener[] = [];

  constructor(media: string[]) {
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

  addListener(listener: any) {
    this.listeners.push(listener);
    return this.removeListener.bind(this, listener);
  }

  removeListener(listener: any) {
    this.listeners = this.listeners.filter((l) => l !== listener);
  }
}

function createBreakpoints(media: string[]) {
  function Breakpoints({ children }: { children: React.ReactNode }) {
    const [index, setIndex] = React.useState(Breakpoints.mediaList.matches());

    React.useEffect(
      () => Breakpoints.mediaList.addListener(() => setIndex(Breakpoints.mediaList.matches())),
      [],
    );

    return <Breakpoints.Context.Provider value={index}>{children}</Breakpoints.Context.Provider>;
  }

  Breakpoints.Context = React.createContext<number | undefined>(undefined);
  Breakpoints.mediaList = new MediaList(media);

  return Breakpoints;
}

export { MediaList, DEFAULT_MEDIA, createBreakpoints };
