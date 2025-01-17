/** ============================== core ============================== */
import { createComponent, createBaseComponent, assignProps } from './coreFactory';
import { sstyled } from './styled';
import type { StyledProps } from './styled';
import { Root, Component, Intergalactic, wrapIntergalacticComponent } from './types/Component';
import type {
  PropGetterFn,
  IRootComponentProps,
  ComponentType,
  IRootComponentHandlers,
  IComponentProps,
  ReturnEl,
  IFunctionProps,
} from './types/Component';
import { CORE_INSTANCE, CREATE_COMPONENT } from './types/symbols';
import type { UnknownProperties } from './types/UnknownProperties';
import register from './register';

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
  ReturnEl,
  StyledProps,
  wrapIntergalacticComponent,
  assignProps,
  register,
};
