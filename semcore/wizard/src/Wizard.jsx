import React from 'react';
import { createComponent, Component, Root, sstyled } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import Modal from '@semcore/modal';
import CheckM from '@semcore/icon/Check/m';
import keyboardFocusEnhance from '@semcore/core/lib/utils/enhances/keyboardFocusEnhance';
import i18nEnhance from '@semcore/core/lib/utils/enhances/i18nEnhance';
import { localizedMessages } from './translations/__intergalactic-dynamic-locales';
import { ScreenReaderOnly } from '@semcore/flex-box';
import { setFocus } from '@semcore/core/lib/utils/use/useFocusLock';
import uniqueIDEnhancement from '@semcore/core/lib/utils/uniqueID';
import Button from '@semcore/button';
import ArrowRight from '@semcore/icon/ArrowRight/m';
import ArrowLeft from '@semcore/icon/ArrowLeft/m';

import style from './style/wizard.shadow.css';

class WizardRoot extends Component {
  static displayName = 'Wizard';
  static style = style;
  static enhance = [i18nEnhance(localizedMessages), uniqueIDEnhancement()];
  static defaultProps = {
    step: null,
    i18n: localizedMessages,
    locale: 'en',
  };

  _steps = new Map();
  modalRef = React.createRef();
  contentRef = React.createRef();
  state = { highlighted: null };

  getStepProps(props) {
    return {
      steps: this._steps,
      active: props.step === this.asProps.step,
      id: `${this.asProps.uid}-step-${props.step}`,
    };
  }

  getSidebarProps() {
    return {
      uid: this.asProps.uid,
    };
  }
  getContentProps() {
    return {
      uid: this.asProps.uid,
      step: this.asProps.step,
      ref: this.contentRef,
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

  stepperRefs = [];
  stepperFocusPrev = (i) => () => {
    const prevStep = this._steps.get(i);
    if (!prevStep) return;
    this.setState({ highlighted: prevStep?.step });
    setTimeout(() => {
      this.stepperRefs[i - 1]?.focus();
    }, 0);
  };
  stepperFocusNext = (i) => () => {
    const nextStep = this._steps.get(i + 2);
    if (!nextStep) return;
    this.setState({ highlighted: nextStep?.step });
    setTimeout(() => {
      this.stepperRefs[i + 1]?.focus();
    }, 0);
  };

  getStepperProps(props, i) {
    let number = i + 1;
    if (this._steps.has(props.step)) {
      const step = this._steps.get(props.step);
      number = step.number;
    } else {
      this._steps.set(props.step, { number, ...props });
    }
    const active = props.step === this.asProps.step;
    const highlighted =
      this.state.highlighted === props.step || (this.state.highlighted === null && i === 0);
    return {
      active,
      tabIndex: highlighted ? 0 : -1,
      number,
      getI18nText: this.asProps.getI18nText,
      uid: this.asProps.uid,
      ref: (node) => {
        this.stepperRefs[i] = node;
      },
      focusNext: this.stepperFocusNext(i),
      focusPrev: this.stepperFocusPrev(i),
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.step === this.asProps.step) return;
    this.setState({ highlighted: this.asProps.step || null });
    setTimeout(() => {
      if (prevProps.step === this.asProps.step) return;
      setFocus(this.contentRef.current);
    }, 1);
  }

  render() {
    const SWizard = this.Root;
    const { Children, styles, uid } = this.asProps;

    this._steps.clear();

    return sstyled(styles)(
      <SWizard
        render={Modal}
        aria-label={undefined}
        ref={this.modalRef}
        aria-labelledby={`${uid}-title`}
      >
        <Children />
      </SWizard>,
    );
  }
}

function Sidebar(props) {
  const { Children, styles, title, uid } = props;
  const SSidebar = Root;
  const SSidebarHeader = 'h2';
  const SSidebarMenu = 'div';

  const handleKeyDown = React.useCallback((e) => {}, []);

  return sstyled(styles)(
    <SSidebar render={Box} __excludeProps={['title']}>
      {title && <SSidebarHeader id={`${uid}-title`}>{title}</SSidebarHeader>}
      <SSidebarMenu role='tablist' aria-orientation='vertical'>
        <Children />
      </SSidebarMenu>
    </SSidebar>,
  );
}

function Step(props) {
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

function Stepper(props) {
  const {
    Children,
    styles,
    step,
    active,
    onActive,
    completed,
    disabled,
    number,
    getI18nText,
    uid,
    focusNext,
    focusPrev,
  } = props;
  const SStepper = Root;
  const SStepNumber = 'span';
  const SStepDescription = 'span';
  const SCompleted = CheckM;

  const handlerClick = React.useCallback(
    (e) => {
      if (onActive) onActive(step, e);
    },
    [step, onActive],
  );

  const handlerKeyDown = React.useCallback(
    (e) => {
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
      id={`${uid}-stepper-${step}`}
      aria-controls={active ? `${uid}-content-${step}` : undefined}
      aria-disabled={disabled}
      aria-selected={active}
      onClick={handlerClick}
      onKeyDown={handlerKeyDown}
    >
      {completed && <ScreenReaderOnly>{getI18nText('completedStep')}</ScreenReaderOnly>}
      <SStepNumber aria-hidden='true'>{completed ? <SCompleted /> : number}</SStepNumber>
      <SStepDescription>
        <Children />
      </SStepDescription>
    </SStepper>,
  );
}

Stepper.enhance = [keyboardFocusEnhance()];

function Content(props) {
  const { Children, children: hasChildren, styles, uid, step } = props;
  const SContent = Root;
  return sstyled(styles)(
    <SContent
      render={Box}
      role='tabpanel'
      aria-labelledby={`${uid}-stepper-${step}`}
      id={`${uid}-content-${step}`}
    >
      {hasChildren ? <Children /> : stepName}
    </SContent>,
  );
}

function StepBack(props) {
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
function StepNext(props) {
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

const Wizard = createComponent(WizardRoot, {
  Sidebar,
  Content,
  Step,
  Stepper,
  StepBack,
  StepNext,
});

export const wrapWizardStepper = (wrapper) => wrapper;

export default Wizard;
