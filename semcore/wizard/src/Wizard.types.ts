import type { NSBox } from '@semcore/base-components';
import type { NSButton } from '@semcore/button';
import type { Intergalactic } from '@semcore/core';
import type { useI18n } from '@semcore/core/lib/utils/enhances/WithI18n';
import type { NSModal } from '@semcore/modal';
import type { Text, NSText } from '@semcore/typography';
import type React from 'react';

declare namespace NSWizard {
  /** Ordered step position from 0 */
  type Step = number;
  type Props = NSModal.Props & {
    /**
     * Active step value
     */
    step: NSWizard.Step;
    /** Specifies the locale for i18n support */
    locale?: string;
  };
  type DefaultProps = {
    step: NSWizard.Step;
    i18n: Record<string, any>;
    locale: 'en';
  };
  type State = {
    highlighted: number;
  };

  namespace Sidebar {
    type Props = NSBox.Props & {
      /**
       * Sidebar title
       */
      title?: React.ReactNode;

      /**
       * @internal html id attribute
       */
      id?: string;
    };

    type Component = Intergalactic.Component<'div', Props>;
  }

  namespace Step {
    type Props = NSBox.Props & {
      /**
       * Ordered step position from 0
       */
      step: NSWizard.Step;
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

    type Component = Intergalactic.Component<'div', Props>;
  }

  namespace StepTitle {
    type Props = NSText.Props;

    type Component = NSText.Component;
  }

  namespace Stepper {
    type Props = NSBox.Props & {
      /**
       * Ordered step position from 0
       */
      step: NSWizard.Step;
      /**
       * Is invoked when active the step
       */
      onActive?:
        | ((step: NSWizard.Step, e: React.SyntheticEvent<HTMLElement> | React.KeyboardEvent) => void)
        | React.Dispatch<React.SetStateAction<NSWizard.Step>>;
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

    type Component<PropsExtending = {}> = (<Tag extends Intergalactic.Tag = 'div'>(
      props: Intergalactic.InternalTypings.ComponentProps<Tag, 'div', Props> & PropsExtending,
    ) => Intergalactic.InternalTypings.ComponentRenderingResults) &
    Intergalactic.InternalTypings.ComponentAdditive<'div', 'div', Props>;
  }

  namespace Content {
    type Props = NSBox.Props & {
      /**
       * Renders wizard content container with border-radius on the left side
       */
      noSidebar?: boolean;
    };

    type Component = Intergalactic.Component<'div', Props>;
  }

  namespace StepBack {
    type Props = NSButton.Props & {
      /** Callback invoked when navigating to the previous step */
      onActive?:
        | ((step: NSWizard.Step, e?: React.SyntheticEvent<HTMLElement>) => void)
        | React.Dispatch<React.SetStateAction<NSWizard.Step>>;
      /** Step name being navigated to */
      stepName?: string;

      /**
       * CurrentStep
       * @internal
       */
      step?: NSWizard.Step;
      /**
       * Translation function
       * @internal
       */
      getI18nText?: ReturnType<typeof useI18n>;
    };

    type Component = Intergalactic.Component<'button', Props>;
  }

  namespace StepNext {
    type Props = NSButton.Props & {
      /** Callback invoked when navigating to the next step */
      onActive?:
        | ((step: NSWizard.Step, e?: React.SyntheticEvent<HTMLElement>) => void)
        | React.Dispatch<React.SetStateAction<NSWizard.Step>>;
      /** Step name being navigated to */
      stepName?: string;

      /**
       * CurrentStep
       * @internal
       */
      step?: NSWizard.Step;
      /**
       * Translation function
       * @internal
       */
      getI18nText?: ReturnType<typeof useI18n>;
    };

    type Component = Intergalactic.Component<'button', Props>;
  }

  type Component = Intergalactic.Component<'div', Props> & {
    Sidebar: Sidebar.Component;
    Step: Step.Component;
    StepTitle: StepTitle.Component;
    Stepper: Stepper.Component;
    Content: Content.Component;
    StepBack: StepBack.Component;
    StepNext: StepNext.Component;
  };
}

/** @deprecated It will be removed in v19. */
export type WizardStep = NSWizard.Step;
/** @deprecated It will be removed in v19. */
export type WizardProps = NSWizard.Props;
/** @deprecated It will be removed in v19. */
export type WizardSidebarProps = NSWizard.Sidebar.Props;
/** @deprecated It will be removed in v19. */
export type WizardStepProps = NSWizard.Step.Props;
/** @deprecated It will be removed in v19. */
export type WizardStepperProps = NSWizard.Stepper.Props;
/** @deprecated It will be removed in v19. */
export type WizardContentProps = NSWizard.Content.Props;
/** @deprecated It will be removed in v19. */
export type WizardStepBackProps = NSWizard.StepBack.Props;
/** @deprecated It will be removed in v19. */
export type WizardStepNextProps = NSWizard.StepNext.Props;
/** @deprecated It will be removed in v19. */
export type WizardDefaultProps = NSWizard.DefaultProps;
// Need this for API page in docs
/** @deprecated It will be removed in v19. */
export type WizardStepTitleProps = NSWizard.StepTitle.Props;
/** @deprecated It will be removed in v19. */
export type IntergalacticWizardStepperComponent<PropsExtending = {}> = NSWizard.Stepper.Component<PropsExtending>;
/** @deprecated It will be removed in v19. */
export type WizardType = NSWizard.Component;

export type { NSWizard };
