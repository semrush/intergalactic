import type { BoxProps } from '@semcore/base-components';
import type { ButtonProps } from '@semcore/button';
import type { Intergalactic } from '@semcore/core';
import type { useI18n } from '@semcore/core/lib/utils/enhances/WithI18n';
import type { ModalProps } from '@semcore/modal';
import type React from 'react';

export type WizardStep = string | number | boolean;

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
   * Step value
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

export type WizardStepperProps<T extends WizardStep = WizardStep> = BoxProps & {
  /**
   * Step value
   */
  step: T;
  /**
   * Is invoked when active the step
   */
  onActive?:
    | ((step: T, e: React.SyntheticEvent<HTMLElement> | React.KeyboardEvent) => void)
    | React.Dispatch<React.SetStateAction<T>>;
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

export type WizardStepBackProps<T extends WizardStep = WizardStep> = ButtonProps & {
  /** Callback invoked when navigating to the previous step */
  onActive?:
    | ((step: T, e?: React.SyntheticEvent<HTMLElement>) => void)
    | React.Dispatch<React.SetStateAction<T>>;
  /** Step name being navigated to */
  stepName?: string;

  /**
   * CurrentStep
   * @internal
   */
  step?: number;
  /**
   * Translation function
   * @internal
   */
  getI18nText?: ReturnType<typeof useI18n>;
};
export type WizardStepNextProps<T extends WizardStep = WizardStep> = ButtonProps & {
  /** Callback invoked when navigating to the next step */
  onActive?:
    | ((step: T, e?: React.SyntheticEvent<HTMLElement>) => void)
    | React.Dispatch<React.SetStateAction<T>>;
  /** Step name being navigated to */
  stepName?: string;

  /**
   * CurrentStep
   * @internal
   */
  step?: number;
  /**
   * Translation function
   * @internal
   */
  getI18nText?: ReturnType<typeof useI18n>;
};

export type IntergalacticWizardStepperComponent<PropsExtending = {}> = (<
  Value extends WizardStep,
  Tag extends Intergalactic.Tag = 'div',
>(
  props: Intergalactic.InternalTypings.ComponentProps<Tag, 'div', WizardStepperProps<Value>> &
    PropsExtending,
) => Intergalactic.InternalTypings.ComponentRenderingResults) &
Intergalactic.InternalTypings.ComponentAdditive<'div', 'div', WizardStepperProps>;

// export type WizardType = Intergalactic.Component<'div', WizardProps> & {
//   Sidebar: Intergalactic.Component<'div', WizardSidebarProps>;
//   Step: Intergalactic.Component<'div', WizardStepProps>;
//   Stepper: IntergalacticWizardStepperComponent;
//   Content: Intergalactic.Component<'div', WizardContentProps>;
//   StepBack: Intergalactic.Component<'button', WizardStepBackProps>;
//   StepNext: Intergalactic.Component<'button', WizardStepNextProps>;
// };
