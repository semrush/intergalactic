import React from 'react';
import { UnknownProperties } from '@semcore/core';

type listenerType = (index: number) => void;
type mediaType = string[];

/** @deprecated */
export interface IMediaList extends MediaList, UnknownProperties {}
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

/** @deprecated */
export interface IBreakpointsProps extends BreakpointsProps, UnknownProperties {}
export type BreakpointsProps = {
  children: React.ReactNode;
};

type createBreakpointsType = (media: mediaType) => ((
  props: IBreakpointsProps,
) => React.ReactElement) & {
  Context: React.Context<number>;
  mediaList: IMediaList;
};

declare const MediaList: {
  prototype: MediaList;
  new (media: mediaType, defaultIndex?: number): IMediaList;
};
declare const DEFAULT_MEDIA: mediaType;
declare const createBreakpoints: createBreakpointsType;
declare const defaultBreakpoints: ReturnType<createBreakpointsType>;

export { MediaList, DEFAULT_MEDIA, createBreakpoints, defaultBreakpoints };
