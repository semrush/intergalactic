import React from 'react';
import Portal from '@semcore/portal';
import manager from './NoticeBubbleManager';
import createComponent, { Component, sstyled, Root } from '@semcore/core';
import { Animation } from '@semcore/animation';
import { Flex, Box } from '@semcore/flex-box';
import fire from '@semcore/utils/lib/fire';
import isNode from '@semcore/utils/lib/isNode';
import { callAllEventHandlers } from '@semcore/utils/lib/assignProps';
import CloseIcon from '@semcore/icon/Close/m';
import { Timer } from './utils';
import { localizedMessages } from './translations/__intergalactic-dynamic-locales';
import i18nEnhance from '@semcore/utils/lib/enhances/i18nEnhance';
import { useCssVariable } from '@semcore/utils/lib/useCssVariable';
import { contextThemeEnhance } from '@semcore/utils/lib/ThemeProvider';

import style from './style/notice-bubble.shadow.css';

const Notices = (props) => {
  const { styles, data = [], tag: SView = ViewInfo } = props;
  const ref = React.useRef();
  const durationStr = useCssVariable('--intergalactic-duration-popper', '200', ref);
  const duration = React.useMemo(() => parseInt(durationStr, 10), [durationStr]);

  return data.map((notice) => {
    return sstyled(styles)(
      <Animation
        key={notice.uid}
        initialAnimation={notice.initialAnimation}
        visible={notice.visible ?? true}
        duration={duration}
        keyframes={[styles['@enter'], styles['@exit']]}
        ref={ref}
      >
        <SView {...notice} styles={notice.styles || styles} getI18nText={props.getI18nText} />
      </Animation>,
    );
  });
};

class NoticeBubbleContainerRoot extends Component {
  static displayName = 'NoticeBubbleContainer';
  static style = style;
  static enhance = [i18nEnhance(localizedMessages), contextThemeEnhance()];
  static defaultProps = {
    manager,
    i18n: localizedMessages,
    locale: 'en',
  };

  _unsubscribe = null;

  state = {
    notices: [],
    warnings: [],
  };

  constructor(props) {
    super(props);
    props.manager.counter = 0;
    this._unsubscribe = props.manager.addListener(this.handleChange);
  }

  componentWillUnmount = () => {
    if (this._unsubscribe) {
      this._unsubscribe();
    }
  };

  handleChange = (notices) => {
    const info = notices.filter((notice) => notice.type === 'info');
    const warning = notices.filter((notice) => notice.type === 'warning');

    this.setState({ notices: info, warnings: warning });
  };

  render() {
    const SNoticeBubble = Root;
    const { Children, styles, disablePortal, getI18nText, ref } = this.asProps;
    const { notices, warnings } = this.state;

    return sstyled(styles)(
      <Portal disablePortal={disablePortal}>
        <SNoticeBubble render={Box} role="alert" aria-live="assertive" ref={ref}>
          <Children />
          <Notices styles={styles} data={warnings} tag={ViewWarning} getI18nText={getI18nText} />
          <Notices styles={styles} data={notices} tag={ViewInfo} getI18nText={getI18nText} />
        </SNoticeBubble>
      </Portal>,
    );
  }
}

class ViewInfo extends Component {
  timer = null;

  componentDidMount() {
    const { duration } = this.props;
    if (duration) {
      this.timer = new Timer(this.handlerClose, duration);
    }
  }

  componentWillUnmount() {
    this.clearTimer();
  }

  clearTimer() {
    if (this.timer) {
      this.timer.clear();
      this.timer = null;
    }
  }

  handlerClose = (e) => {
    // because call not only click
    fire(this, 'onClose', e);
    this.clearTimer();
  };

  handlerMouseEnter = () => {
    if (this.timer) {
      this.timer.pause();
    }
  };

  handlerMouseLeave = () => {
    if (this.timer) {
      this.timer.resume();
    }
  };

  render() {
    const SBubble = Flex;
    const SDismiss = 'div';
    const SContent = Flex;
    const SMessage = 'div';
    const SAction = 'div';
    const {
      forwardRef,
      styles,
      onMouseEnter,
      onMouseLeave,
      getI18nText,
      icon,
      children,
      action: actionNode,
      ...other
    } = this.props;

    return sstyled(styles)(
      <SBubble
        role="alert"
        {...other}
        ref={forwardRef}
        onMouseEnter={callAllEventHandlers(onMouseEnter, this.handlerMouseEnter)}
        onMouseLeave={callAllEventHandlers(onMouseLeave, this.handlerMouseLeave)}
      >
        <SDismiss
          title={getI18nText('close')}
          onClick={this.handlerClose}
          aria-label={getI18nText('close')}
        >
          <CloseIcon />
        </SDismiss>
        {isNode(icon) ? (
          <>
            {icon}
            <SContent>
              <SMessage>{children}</SMessage>
              {isNode(actionNode) ? <SAction>{actionNode}</SAction> : null}
            </SContent>
          </>
        ) : (
          <SContent>
            <SMessage>{children}</SMessage>
            {isNode(actionNode) ? <SAction>{actionNode}</SAction> : null}
          </SContent>
        )}
      </SBubble>,
    );
  }
}

class ViewWarning extends ViewInfo {
  static defaultProps = {
    type: 'warning',
    duration: 0,
  };
}

class NoticeBubbleView extends Component {
  static defaultProps = {
    duration: 5000,
    type: 'info',
    manager,
  };

  _notice = null;

  componentDidMount() {
    this._notice = this.asProps.manager.add(this.asProps);
  }

  componentWillUnmount() {
    if (this._notice) {
      this._notice.remove();
    }
  }

  componentDidUpdate() {
    if (this._notice) {
      this._notice.update(this.asProps);
    }
  }

  render() {
    return null;
  }
}

class NoticeBubbleWarningView extends NoticeBubbleView {
  static defaultProps = {
    duration: 5000,
    type: 'warning',
    manager,
  };
}

const NoticeBubbleContainer = createComponent(NoticeBubbleContainerRoot, {
  Info: NoticeBubbleView,
  Warning: NoticeBubbleWarningView,
});

const NoticeBubble = NoticeBubbleContainer.Info;
const NoticeBubbleWarning = NoticeBubbleContainer.Warning;

export { NoticeBubble, NoticeBubbleWarning };

export default NoticeBubbleContainer;
