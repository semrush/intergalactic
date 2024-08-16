import React from 'react';
import createComponent, { Component, Root, sstyled } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import Modal from '@semcore/modal';
import CheckM from '@semcore/icon/Check/m';
import keyboardFocusEnhance from '@semcore/utils/lib/enhances/keyboardFocusEnhance';
import i18nEnhance from '@semcore/utils/lib/enhances/i18nEnhance';
import { localizedMessages } from './translations/__intergalactic-dynamic-locales';
import { ScreenReaderOnly } from '@semcore/utils/lib/ScreenReaderOnly';
import { setFocus } from '@semcore/utils/lib/use/useFocusLock';
import uniqueIDEnhancement from '@semcore/utils/lib/uniqueID';
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

  getStepProps(props) {
    return {
      steps: this._steps,
      active: props.step === this.asProps.step,
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

  getStepperProps(props, i) {
    let number = i + 1;
    if (this._steps.has(props.step)) {
      const step = this._steps.get(props.step);
      number = step.number;
    } else {
      this._steps.set(props.step, { number, ...props });
    }
    return {
      active: props.step === this.asProps.step,
      number,
      getI18nText: this.asProps.getI18nText,
      uid: this.asProps.uid,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.step === this.asProps.step) return;
    setTimeout(() => {
      if (prevProps.step === this.asProps.step) return;
      setFocus(this.contentRef.current);
    }, 1);
  }

  render() {
    const SWizard = this.Root;
    const { Children, styles } = this.asProps;

    this._steps.clear();

    return sstyled(styles)(
      <SWizard render={Modal} ref={this.modalRef}>
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
  return sstyled(styles)(
    <SSidebar render={Box}>
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
    },
    [step, onActive],
  );

  return sstyled(styles)(
    <SStepper
      render={Box}
      tag='h3'
      role='tab'
      id={`${uid}-step-${step}`}
      aria-controls={`${uid}-content-${step}`}
      aria-disabled={disabled}
      aria-current={active}
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
  const { Children, styles, uid, step } = props;
  const SContent = Root;
  return sstyled(styles)(
    <SContent
      render={Box}
      role='tabpanel'
      aria-labelledby={`${uid}-step-${step}`}
      id={`${uid}-content-${step}`}
    >
      <Children />
    </SContent>,
  );
}

function StepBack(props) {
  const SStepBack = Root;
  const { Children, styles, getI18nText, step } = props;
  const handleClick = React.useCallback(() => {
    props.onActive?.(props.step - 1);
  }, [props.step]);
  return sstyled(styles)(
    <SStepBack
      render={Button}
      use='tertiary'
      onClick={handleClick}
      aria-label={getI18nText('backButton', { buttonName: `#${step + 1}` })}
    >
      <Button.Addon>
        <ArrowLeft />
      </Button.Addon>
      <Button.Text>
        <Children />
      </Button.Text>
    </SStepBack>,
  );
}
function StepNext(props) {
  const SStepNext = Root;
  const { Children, styles, getI18nText, step } = props;
  const handleClick = React.useCallback(() => {
    props.onActive?.(props.step + 1);
  }, [props.step]);
  return sstyled(styles)(
    <SStepNext
      render={Button}
      use='primary'
      onClick={handleClick}
      aria-label={getI18nText('nextButton', { buttonName: `#${step + 1}` })}
    >
      <Button.Text>
        <Children />
      </Button.Text>
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
