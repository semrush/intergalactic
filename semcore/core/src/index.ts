/** ============================== core ============================== */
import { createComponent, createBaseComponent } from './coreFactory';
import { sstyled } from './styled';
import { Root, Component, Intergalactic, wrapIntergalacticComponent } from './types/Component';
import type {
  PropGetterFn,
  IRootComponentProps,
  ComponentType,
  IRootComponentHandlers,
  IComponentProps,
  ReturnEl,
} from './types/Component';
import { CORE_INSTANCE, CREATE_COMPONENT } from './types/symbols';
import type { UnknownProperties } from './types/UnknownProperties';

export {
  sstyled,
  createComponent,
  createBaseComponent,
  Root,
  Component,
  UnknownProperties,
  Intergalactic,
  PropGetterFn,
  IRootComponentProps,
  ComponentType,
  IRootComponentHandlers,
  IComponentProps,
  CORE_INSTANCE,
  CREATE_COMPONENT,
  ReturnEl,
  wrapIntergalacticComponent,
};

/** ============================= utils ============================== */

import assignProps from './utils/assignProps';

export { assignProps };

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
