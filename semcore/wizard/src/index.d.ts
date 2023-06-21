import React from 'react';
import { UnknownProperties, Intergalactic } from '@semcore/core';
import { Box, BoxProps } from '@semcore/flex-box';
import { ModalProps } from '@semcore/modal';

export type WizardStep = string | number | boolean;

/** @deprecated */
export interface IWizardProps extends WizardProps, UnknownProperties {}
export type WizardProps = ModalProps & {
  /**
   * Active step value
   */
  step: WizardStep;
};

/** @deprecated */
export interface IWizardSidebarProps extends WizardSidebarProps, UnknownProperties {}
export type WizardSidebarProps = BoxProps & {
  /**
   * Sidebar title
   */
  title?: React.ReactNode;
};

/** @deprecated */
export interface IWizardStepProps extends WizardStepProps, UnknownProperties {}
export type WizardStepProps = BoxProps & {
  /**
   * Step value
   */
  step: WizardStep;
  /**
   * Disabled step
   */
  disabled?: boolean;
};

/** @deprecated */
export interface IWizardStepperProps extends WizardStepperProps, UnknownProperties {}
export type WizardStepperProps = BoxProps & {
  /**
   * Step value
   */
  step: WizardStep;
  /**
   * Is invoked when active the step
   */
  onActive?: (step: WizardStep, e: React.SyntheticEvent<HTMLElement>) => void;
  /**
   * Stepper number
   * @default incremental value
   */
  number?: React.ReactNode;
  /**
   *  Is the step completed
   */
  completed?: boolean;
};

declare const Wizard: Intergalactic.Component<'div', WizardProps> & {
  Sidebar: Intergalactic.Component<'div', WizardSidebarProps>;
  Step: Intergalactic.Component<'div', WizardStepProps>;
  Stepper: Intergalactic.Component<'div', WizardStepperProps>;
  Content: typeof Box;
};

export default Wizard;
