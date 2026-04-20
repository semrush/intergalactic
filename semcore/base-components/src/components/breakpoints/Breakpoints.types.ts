import type React from 'react';

type listenerType = (index: number) => void;
type mediaType = string[];

export type Media = {
  /** Destroy the subscription to the window.matchMedia */
  destructor(): void;

  /** Get the index from the media list. */
  matches(): number;

  /** Subscribe to index changes in the media list. */
  addListener(listener: listenerType): () => void;

  /** Unsubscribe from changing the index in the media list. */
  removeListener(listener: listenerType): void;
};

export type BreakpointsProps = {
  children: React.ReactNode;
};

type createBreakpointsType = (media: mediaType) => ((
  props: BreakpointsProps,
) => React.ReactElement) & {
  Context: React.Context<number>;
  mediaList: MediaList;
};

declare const MediaList: {
  prototype: MediaList;
  new (media: mediaType, defaultIndex?: number): MediaList;
};
declare const DEFAULT_MEDIA: mediaType;
declare const createBreakpoints: createBreakpointsType;
declare const defaultBreakpoints: ReturnType<createBreakpointsType>;

export { MediaList, DEFAULT_MEDIA, createBreakpoints, defaultBreakpoints };
