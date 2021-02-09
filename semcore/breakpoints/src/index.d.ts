import React from 'react';

type listenerType = (index: number) => void;
type mediaType = string[];

interface IMediaList {
  destructor(): void;

  matches(): number;

  addListener(listener: listenerType): () => void;

  removeListener(listener: listenerType): void;
}

interface IBreakpointsProps {
  children: React.ReactNode;
}

type createBreakpointsType = (
  media: mediaType,
) => ((props: IBreakpointsProps) => React.ReactElement) & {
  Context: React.Context<number>;
  mediaList: IMediaList;
};

declare const MediaList: {
  prototype: MediaList;
  new (media: mediaType): IMediaList;
};
declare const DEFAULT_MEDIA: mediaType;
declare const createBreakpoints: createBreakpointsType;
declare const Breakpoints: ReturnType<createBreakpointsType>;

export { MediaList, DEFAULT_MEDIA, createBreakpoints };

export default Breakpoints;
