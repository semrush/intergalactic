/** ============================== core ============================== */
import { createComponent, createBaseComponent } from './coreFactory';
import { sstyled } from './styled';
import { Root, Component, UnknownProperties, Intergalactic } from './types';

export {
  sstyled,
  createComponent,
  createBaseComponent,
  Root,
  Component,
  UnknownProperties,
  Intergalactic,
};

/** ============================= utils ============================== */

/** =========================== components =========================== */

export * from './components/animation';
export * from './components/breakpoints';
export * from './components/flex-box';
export * from './components/grid';
export * from './components/neighbor-location';
export * from './components/outside-click';
export * from './components/popper';
export * from './components/portal';
export * from './components/scroll-area';
