/** ============================== core ============================== */
import { Root, AbstractComponent, Intergalactic, wrapIntergalacticComponent } from './core-types/Component';
import type {
  PropGetterFn,
  IRootComponentProps,
  PropsExtractor,
  FunctionComponent,
  IntergalacticComponent,
  RootResult,
} from './core-types/Component';
import {
  CORE_INSTANCE,
  CREATE_COMPONENT,
  CONTEXT_COMPONENT,
  CHILDREN_COMPONENT,
  INHERITED_NAME,
  CORE_COMPONENT,
  PARENT_COMPONENTS,
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
  AbstractComponent,
  type UnknownProperties,
  Intergalactic,
  type PropGetterFn,
  type IRootComponentProps,
  CORE_INSTANCE,
  CREATE_COMPONENT,
  CONTEXT_COMPONENT,
  CHILDREN_COMPONENT,
  INHERITED_NAME,
  CORE_COMPONENT,
  PARENT_COMPONENTS,
  type IStyledProps,
  type PropsExtractor,
  type FunctionComponent,
  type IntergalacticComponent,
  type RootResult,
  wrapIntergalacticComponent,
  assignProps,
  register,
  lastInteraction,
};
