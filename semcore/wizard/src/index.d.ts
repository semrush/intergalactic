import React, { ComponentProps } from 'react';
import { CProps, ReturnEl } from '@semcore/core';
import { Box, IBoxProps } from '@semcore/flex-box';
import { IModalProps } from '@semcore/modal';

export type WizardStep = string | number | boolean;

export interface IWizardProps extends IModalProps {
  /**
   * Active step value
   */
  step: WizardStep;
  /**
   * Is invoked when changing the step
   */
  onStepChange?: (value: T, e?: React.SyntheticEvent<HTMLElement>) => void;
}

export interface IWizardSidebarProps extends IBoxProps {
  /**
   * Sidebar title
   */
  title?: React.ReactNode;
}

export interface IWizardStepProps extends IBoxProps {
  /**
   * Step value
   */
  step: WizardStep;
  /**
   * Disabled step
   */
  disabled?: boolean;
}

export interface IWizardStepperProps extends IBoxProps {
  /**
   * Step value
   */
  step: WizardStep;
  /**
   * Stepper number
   * @default incremental value
   */
  number?: React.ReactNode;
  /**
   *  Is the step completed
   */
  completed?: boolean;
}

declare const Wizard: (<T>(props: CProps<IWizardProps & T>) => ReturnEl) & {
  Sidebar: <T>(props: IWizardSidebarProps & T) => ReturnEl;
  Step: <T>(props: IWizardStepProps & T) => ReturnEl;
  Stepper: <T>(props: IWizardStepperProps & T) => ReturnEl;
  Content: <T>(props: ComponentProps<typeof Box> & T) => ReturnEl;
};

export default Wizard;
