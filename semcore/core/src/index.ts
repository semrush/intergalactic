/** ============================== core ============================== */
import { Root, Component, Intergalactic, wrapIntergalacticComponent, createTestComponent } from './core-types/Component';
import type {
  PropGetterFn,
  IRootComponentProps,
  IRootNodeProps,
} from './core-types/Component';
import {
  CORE_INSTANCE,
  CREATE_COMPONENT,
  CONTEXT_COMPONENT,
  CHILDREN_COMPONENT,
  INHERITED_NAME,
} from './core-types/symbols';
import type { UnknownProperties } from './core-types/UnknownProperties';
import { createComponent, createBaseComponent, assignProps } from './coreFactory';
import { lastInteraction } from './LastInteractionType';
import register from './register';
import type { IStyledProps } from './styled';
import { sstyled } from './styled';

export {
  sstyled,
  createComponent,
  createBaseComponent,
  Root,
  Component,
  createTestComponent,
  type UnknownProperties,
  Intergalactic,
  type PropGetterFn,
  type IRootComponentProps,
  type IRootNodeProps,
  CORE_INSTANCE,
  CREATE_COMPONENT,
  CONTEXT_COMPONENT,
  CHILDREN_COMPONENT,
  INHERITED_NAME,
  type IStyledProps,
  wrapIntergalacticComponent,
  assignProps,
  register,
  lastInteraction,
};
