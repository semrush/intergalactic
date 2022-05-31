import React, { ComponentProps } from 'react';
import { CProps, ReturnEl } from '@semcore/core';
import { Box, IBoxProps } from '@semcore/flex-box';

export type StepValue = Array<{ value: number; title: string; disabled?: boolean }>;

export interface IWizardProps {
  /**
   * Steps array
   */
  steps: StepOption[];
  /**
   * Active step value
   */
  currentStep: number;
  /**
   * Step value
   */
  value: number;
}

export interface IWizardSidebarProps extends IBoxProps {
  title?: React.ReactNode;
}

export interface IWizardStepProps extends IBoxProps {
  value: number;
}

export interface IWizardStepperProps extends IBoxProps {
  value: number;
}

declare const Wizard: (<T>(props: CProps<IWizardProps & T>) => ReturnEl) & {
  Sidebar: <T>(props: IWizardSidebarProps & T) => ReturnEl;
  Step: <T>(props: IWizardStepProps & T) => ReturnEl;
  Stepper: <T>(props: IWizardStepperProps & T) => ReturnEl;
  Content: <T>(props: ComponentProps<typeof Box> & T) => ReturnEl;
};

export default Wizard;
