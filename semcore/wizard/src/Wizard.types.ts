import type { BoxProps } from '@semcore/base-components';
import type { ButtonProps } from '@semcore/button';
import type { Intergalactic } from '@semcore/core';
import type { useI18n } from '@semcore/core/lib/utils/enhances/WithI18n';
import type { ModalProps } from '@semcore/modal';
import type React from 'react';

/** Ordered step position from 0 */
export type WizardStep = number;

export type WizardProps = ModalProps & {
  /**
   * Active step value
   */
  step: WizardStep;
  /** Specifies the locale for i18n support */
  locale?: string;
};

export type WizardSidebarProps = BoxProps & {
  /**
   * Sidebar title
   */
  title?: React.ReactNode;

  /**
   * @internal html id attribute
   */
  id?: string;
};

export type WizardStepProps = BoxProps & {
  /**
   * Ordered step position from 0
   */
  step: WizardStep;
  /**
   * Disabled step
   */
  disabled?: boolean;
  /**
   * Active flag
   * @internal
   */
  active?: boolean;
};

export type WizardStepperProps = BoxProps & {
  /**
   * Ordered step position from 0
   */
  step: WizardStep;
  /**
   * Is invoked when active the step
   */
  onActive?:
    | ((step: WizardStep, e: React.SyntheticEvent<HTMLElement> | React.KeyboardEvent) => void)
    | React.Dispatch<React.SetStateAction<WizardStep>>;
  /**
   * Stepper number
   * @default incremental value
   */
  number?: React.ReactNode;
  /**
   *  Is the step completed
   */
  completed?: boolean;
  /** Disables interaction with the stepper */
  disabled?: boolean;

  /**
   * Translation function
   * @internal
   */
  getI18nText?: ReturnType<typeof useI18n>;

  /**
   * Go to next step
   * @internal
   */
  focusNext?: () => void;
  /**
   * Go to prev step
   * @internal
   */
  focusPrev?: () => void;
};

export type WizardContentProps = BoxProps & {
  /**
   * Renders wizard content container with border-radius on the left side
   */
  noSidebar?: boolean;
};

export type WizardStepBackProps = ButtonProps & {
  /** Callback invoked when navigating to the previous step */
  onActive?:
    | ((step: WizardStep, e?: React.SyntheticEvent<HTMLElement>) => void)
    | React.Dispatch<React.SetStateAction<WizardStep>>;
  /** Step name being navigated to */
  stepName?: string;

  /**
   * CurrentStep
   * @internal
   */
  step?: WizardStep;
  /**
   * Translation function
   * @internal
   */
  getI18nText?: ReturnType<typeof useI18n>;
};
export type WizardStepNextProps = ButtonProps & {
  /** Callback invoked when navigating to the next step */
  onActive?:
    | ((step: WizardStep, e?: React.SyntheticEvent<HTMLElement>) => void)
    | React.Dispatch<React.SetStateAction<WizardStep>>;
  /** Step name being navigated to */
  stepName?: string;

  /**
   * CurrentStep
   * @internal
   */
  step?: WizardStep;
  /**
   * Translation function
   * @internal
   */
  getI18nText?: ReturnType<typeof useI18n>;
};

export type IntergalacticWizardStepperComponent<PropsExtending = {}> = (<
  Tag extends Intergalactic.Tag = 'div',
>(
  props: Intergalactic.InternalTypings.ComponentProps<Tag, 'div', WizardStepperProps> &
    PropsExtending,
) => Intergalactic.InternalTypings.ComponentRenderingResults) &
Intergalactic.InternalTypings.ComponentAdditive<'div', 'div', WizardStepperProps>;

export type WizardType = Intergalactic.Component<'div', WizardProps> & {
  Sidebar: Intergalactic.Component<'div', WizardSidebarProps>;
  Step: Intergalactic.Component<'div', WizardStepProps>;
  Stepper: IntergalacticWizardStepperComponent;
  Content: Intergalactic.Component<'div', WizardContentProps>;
  StepBack: Intergalactic.Component<'button', WizardStepBackProps>;
  StepNext: Intergalactic.Component<'button', WizardStepNextProps>;
};
