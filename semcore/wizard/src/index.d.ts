import React, { ComponentProps } from 'react';
import { CProps, ReturnEl } from '@semcore/core';
import { Box, IBoxProps } from '@semcore/flex-box';

export interface IWizardProps {
  /**
   * Steps array
   */
  steps: Array<{ value: number; title?: string; disabled?: boolean }>;
  /**
   * Active step value
   */
  currentStep: number;
}

export interface IWizardSidebarProps extends IBoxProps {
  /**
   * Sidebar title
   */
  title?: React.ReactNode;
}

export interface IWizardStepProps extends IBoxProps {
  /**
   * Step number
   */
  value: number;
}

export interface IWizardStepperProps extends IBoxProps {
  /**
   * Stepper number
   */
  value: number;
}

declare const Wizard: (<T>(props: CProps<IWizardProps & T>) => ReturnEl) & {
  Sidebar: <T>(props: IWizardSidebarProps & T) => ReturnEl;
  Step: <T>(props: IWizardStepProps & T) => ReturnEl;
  Stepper: <T>(props: IWizardStepperProps & T) => ReturnEl;
  Content: <T>(props: ComponentProps<typeof Box> & T) => ReturnEl;
};

export default Wizard;
