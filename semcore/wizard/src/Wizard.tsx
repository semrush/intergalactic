import { ScreenReaderOnly, Box } from '@semcore/base-components';
import Button from '@semcore/button';
import { createComponent, Component, Root, sstyled } from '@semcore/core';
import type { IRootComponentProps, Intergalactic } from '@semcore/core';
import i18nEnhance from '@semcore/core/lib/utils/enhances/i18nEnhance';
import findComponent from '@semcore/core/lib/utils/findComponent';
import uniqueIDEnhancement from '@semcore/core/lib/utils/uniqueID';
import { setFocus } from '@semcore/core/lib/utils/use/useFocusLock';
import ArrowLeft from '@semcore/icon/ArrowLeft/m';
import ArrowRight from '@semcore/icon/ArrowRight/m';
import CheckM from '@semcore/icon/Check/m';
import Modal from '@semcore/modal';
import { Text } from '@semcore/typography';
import React from 'react';

import style from './style/wizard.shadow.css';
import { localizedMessages } from './translations/__intergalactic-dynamic-locales';
import type {
  WizardStep,
  WizardProps,
  WizardStepProps,
  WizardStepperProps,
  WizardSidebarProps,
  WizardContentProps,
  IntergalacticWizardStepperComponent,
  WizardType,
  WizardStepBackProps,
  WizardStepNextProps,
} from './Wizard.types';

type State = {
  highlighted: number;
};

class WizardRoot extends Component<WizardProps, typeof WizardRoot.enhance, {}, {}, State> {
  static displayName = 'Wizard';
  static style = style;
  static enhance = [i18nEnhance(localizedMessages), uniqueIDEnhancement()] as const;
  static defaultProps = {
    step: null,
    i18n: localizedMessages,
    locale: 'en',
  };

  _steps = new Map();
  modalRef = React.createRef<HTMLElement>();
  contentRef = React.createRef<HTMLElement>();

  stepperRefs: Array<HTMLElement | null> = [];

  state: State = {
    highlighted: this.props.step,
  };

  getStepId(step: WizardStep): string {
    return `${this.asProps.uid}-step-${step}`;
  }

  getId(): string {
    return `${this.asProps.uid}-title`;
  }

  getStepperId(step: WizardStep): string {
    const { uid } = this.asProps;

    return `${uid}-stepper-${step}`;
  }

  getContentId(step: WizardStep): string {
    const { uid } = this.asProps;

    return `${uid}-content-${step}`;
  }

  getStepProps(props: WizardStepProps) {
    return {
      steps: this._steps,
      active: props.step === this.asProps.step,
      id: this.getStepId(props.step),
    };
  }

  getSidebarProps() {
    return {
      id: this.getId(),
    };
  }

  getContentProps() {
    const { Children, step } = this.asProps;

    const Sidebar = findComponent(Children, ['Wizard.Sidebar'], true);

    return {
      ref: this.contentRef,
      noSidebar: !Sidebar,
      ['aria-labelledby']: this.getStepperId(step),
      id: this.getContentId(step),
    };
  }

  getStepBackProps() {
    return {
      getI18nText: this.asProps.getI18nText,
      step: this.asProps.step,
    };
  }

  getStepNextProps() {
    return {
      getI18nText: this.asProps.getI18nText,
      step: this.asProps.step,
    };
  }

  stepperFocusPrev = (i: number) => () => {
    const prevStep = this._steps.get(i);
    if (!prevStep) return;
    if (prevStep.disabled) {
      this.stepperFocusPrev(i - 1)();
      return;
    }
    this.setState({ highlighted: prevStep?.step });
    setTimeout(() => {
      this.stepperRefs[i - 1]?.focus();
    }, 0);
  };

  stepperFocusNext = (i: number) => () => {
    const nextStep = this._steps.get(i + 2);
    if (!nextStep) return;
    if (nextStep.disabled) {
      this.stepperFocusNext(i + 1)();
      return;
    }
    this.setState({ highlighted: nextStep?.step });
    setTimeout(() => {
      this.stepperRefs[i + 1]?.focus();
    }, 0);
  };

  getStepperProps(props: WizardStepperProps, i: number) {
    let number = i + 1;
    if (this._steps.has(props.step)) {
      const step = this._steps.get(props.step);
      number = step.number;
    } else {
      this._steps.set(props.step, { number, ...props });
    }
    const active = props.step === this.asProps.step;
    const highlighted = this.state.highlighted === props.step;

    return {
      active,
      'tabIndex': highlighted ? 0 : -1,
      number,
      'getI18nText': this.asProps.getI18nText,
      'uid': this.asProps.uid,
      'ref': (node: HTMLElement | null) => {
        this.stepperRefs[i] = node;
      },
      'focusNext': this.stepperFocusNext(i),
      'focusPrev': this.stepperFocusPrev(i),

      'id': this.getStepperId(props.step),
      'aria-controls': active ? this.getContentId(props.step) : undefined,
      'aria-disabled': props.disabled,
      'aria-selected': active,
    };
  }

  componentDidUpdate(prevProps: WizardProps) {
    if (prevProps.step === this.asProps.step) return;

    this.setState({ highlighted: this.asProps.step });
    setTimeout(() => {
      if (prevProps.step === this.asProps.step) return;
      if (this.contentRef.current) {
        setFocus(this.contentRef.current);
      }
    }, 1);
  }

  render() {
    const SWizard = this.Root;
    const { Children, styles } = this.asProps;

    this._steps.clear();

    return sstyled(styles)(
      <SWizard
        render={Modal}
        aria-label={undefined}
        ref={this.modalRef}
        aria-labelledby={this.getId()}
      >
        <Children />
      </SWizard>,
    );
  }
}

function Sidebar(props: WizardSidebarProps & IRootComponentProps) {
  const { Children, styles, title, id } = props;
  const SSidebar = Root;
  const SSidebarHeader = 'h2';
  const SSidebarMenu = 'div';

  return sstyled(styles)(
    <SSidebar render={Box} __excludeProps={['title', 'id']}>
      {title && <SSidebarHeader id={id}>{title}</SSidebarHeader>}
      <SSidebarMenu role='tablist' aria-orientation='vertical'>
        <Children />
      </SSidebarMenu>
    </SSidebar>,
  );
}

function Step(props: IRootComponentProps & WizardStepProps) {
  const SStep = Root;
  const { Children, styles, active } = props;
  if (active) {
    return sstyled(styles)(
      <SStep render={Box}>
        <Children />
      </SStep>,
    );
  }
  return null;
}

function Stepper(props: Required<WizardStepperProps> & IRootComponentProps) {
  const {
    Children,
    styles,
    step,
    onActive,
    completed,
    number,
    getI18nText,
    focusNext,
    focusPrev,
    disabled,
  } = props;
  const SStepper = Root;
  const SStepNumber = 'span';
  const SStepDescription = 'span';
  const SCompleted = CheckM;

  const handlerClick = React.useCallback(
    (e: React.SyntheticEvent<HTMLElement>) => {
      if (onActive) onActive(step, e);
    },
    [step, onActive],
  );

  const handlerKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      if (onActive && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        onActive(step, e);
      }
      if (e.key === 'ArrowUp') {
        focusPrev();
        e.stopPropagation();
      }
      if (e.key === 'ArrowDown') {
        focusNext();
        e.stopPropagation();
      }
    },
    [step, onActive, focusPrev, focusNext],
  );

  return sstyled(styles)(
    <SStepper
      render={Box}
      role='tab'
      tabIndex={disabled ? undefined : 0}
      onClick={handlerClick}
      onKeyDown={handlerKeyDown}
    >
      {completed && <ScreenReaderOnly>{getI18nText('completedStep')}</ScreenReaderOnly>}
      <ScreenReaderOnly><Children /></ScreenReaderOnly>
      <SStepNumber aria-hidden='true'>{completed ? <SCompleted /> : number}</SStepNumber>
      <SStepDescription aria-hidden='true'>
        <Children />
      </SStepDescription>
    </SStepper>,
  );
}

function Content(props: WizardContentProps & IRootComponentProps) {
  const { Children, styles } = props;
  const SContent = Root;
  return sstyled(styles)(
    <SContent
      render={Box}
      role='tabpanel'
    >
      <Children />
    </SContent>,
  );
}

function StepBack(props: Required<WizardStepBackProps> & IRootComponentProps) {
  const SStepBack = Root;
  const { Children, children: hasChildren, styles, getI18nText, stepName } = props;
  const handleClick = React.useCallback(() => {
    props.onActive?.(props.step - 1);
  }, [props.step]);
  return sstyled(styles)(
    <SStepBack
      render={Button}
      use='tertiary'
      size='l'
      onClick={handleClick}
      aria-label={getI18nText('backButton', { buttonName: stepName })}
    >
      <Button.Addon>
        <ArrowLeft />
      </Button.Addon>
      <Button.Text>{hasChildren ? <Children /> : stepName}</Button.Text>
    </SStepBack>,
  );
}
function StepNext(props: Required<WizardStepNextProps> & IRootComponentProps) {
  const SStepNext = Root;
  const { Children, children: hasChildren, styles, getI18nText, stepName } = props;
  const handleClick = React.useCallback(() => {
    props.onActive?.(props.step + 1);
  }, [props.step]);
  return sstyled(styles)(
    <SStepNext
      render={Button}
      use='tertiary'
      size='l'
      onClick={handleClick}
      aria-label={getI18nText('nextButton', { buttonName: stepName })}
    >
      <Button.Text>{hasChildren ? <Children /> : stepName}</Button.Text>
      <Button.Addon>
        <ArrowRight />
      </Button.Addon>
    </SStepNext>,
  );
}

function StepTitle(props: Intergalactic.InternalTypings.InferChildComponentProps<WizardType, typeof WizardRoot, 'StepTitle'>) {
  const SWizardStepTitle = Root;
  const { styles } = props;

  return sstyled(styles)(
    <SWizardStepTitle render={Text} tag='h3' size={500} />,
  );
}

const Wizard = createComponent(WizardRoot, {
  Sidebar,
  Content,
  Step,
  StepTitle,
  Stepper,
  StepBack,
  StepNext,
}) as WizardType;

export const wrapWizardStepper = <PropsExtending extends {}>(
  wrapper: (
    props: Intergalactic.InternalTypings.UntypeRefAndTag<
      Intergalactic.InternalTypings.ComponentPropsNesting<IntergalacticWizardStepperComponent>
    > &
    PropsExtending,
  ) => React.ReactNode,
) => wrapper as IntergalacticWizardStepperComponent<PropsExtending>;

export default Wizard;
