/** ============================== core ============================== */
import { createComponent, createBaseComponent, assignProps } from './coreFactory';
import { sstyled } from './styled';
import type { StyledProps } from './styled';
import { Root, Component, Intergalactic, wrapIntergalacticComponent } from './core-types/Component';
import type {
  PropGetterFn,
  IRootComponentProps,
  ComponentType,
  IRootComponentHandlers,
  IComponentProps,
  ReturnEl,
  IFunctionProps,
} from './core-types/Component';
import {
  CORE_INSTANCE,
  CREATE_COMPONENT,
  CONTEXT_COMPONENT,
  CHILDREN_COMPONENT,
  INHERITED_NAME,
} from './core-types/symbols';
import type { UnknownProperties } from './core-types/UnknownProperties';
import register from './register';
import { lastInteraction } from './LastInteractionType';

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
  IFunctionProps,
  CORE_INSTANCE,
  CREATE_COMPONENT,
  CONTEXT_COMPONENT,
  CHILDREN_COMPONENT,
  INHERITED_NAME,
  ReturnEl,
  StyledProps,
  wrapIntergalacticComponent,
  assignProps,
  register,
  lastInteraction,
};
