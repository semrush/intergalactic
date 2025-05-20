import React from 'react';
import Portal from '@semcore/portal';
import manager from './NoticeBubbleManager';
import { createComponent, Component, sstyled, Root } from '@semcore/core';
import { Animation } from '@semcore/animation';
import { Flex, Box } from '@semcore/flex-box';
import fire from '@semcore/core/lib/utils/fire';
import isNode from '@semcore/core/lib/utils/isNode';
import { callAllEventHandlers } from '@semcore/core/lib/utils/assignProps';
import CloseIcon from '@semcore/icon/Close/m';
import { Timer } from './utils';
import { localizedMessages } from './translations/__intergalactic-dynamic-locales';
import i18nEnhance from '@semcore/core/lib/utils/enhances/i18nEnhance';
import { useCssVariable } from '@semcore/core/lib/utils/useCssVariable';
import { contextThemeEnhance } from '@semcore/core/lib/utils/ThemeProvider';
import Button from '@semcore/button';
import { useFocusLock } from '@semcore/core/lib/utils/use/useFocusLock';
import {
  ZIndexStackingContextProvider,
  zIndexStackingEnhance,
} from '@semcore/core/lib/utils/zIndexStacking';

import style from './style/notice-bubble.shadow.css';
import { forkRef, useForkRef } from '@semcore/core/lib/utils/ref';
import { getFocusableIn } from '@semcore/core/lib/utils/focus-lock/getFocusableIn';
import { setFocus } from '@semcore/core/lib/utils/use/useFocusLock';

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
  static enhance = [
    i18nEnhance(localizedMessages),
    contextThemeEnhance(),
    zIndexStackingEnhance('z-index-notice-bubble'),
  ];
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

  componentDidMount() {
    this._unsubscribe = this.asProps.manager.addListener(this.handleChange);
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
    const SNoticeAriaLiveWrapper = 'div';
    const { Children, styles, disablePortal, getI18nText, ref, parentZIndexStacking } =
      this.asProps;
    const { notices, warnings } = this.state;

    return sstyled(styles)(
      <ZIndexStackingContextProvider designToken='z-index-notice-bubble'>
        <Portal disablePortal={disablePortal}>
          <SNoticeBubble
            render={Box}
            ref={ref}
            tag='section'
            role='region'
            aria-label={getI18nText('notification')}
            zIndex={parentZIndexStacking}
          >
            <Children />
            <Notices styles={styles} data={warnings} tag={ViewWarning} getI18nText={getI18nText} />
            <SNoticeAriaLiveWrapper aria-live='polite'>
              <Notices styles={styles} data={notices} tag={ViewInfo} getI18nText={getI18nText} />
            </SNoticeAriaLiveWrapper>
          </SNoticeBubble>
        </Portal>
      </ZIndexStackingContextProvider>,
    );
  }
}

const FocusLock = React.forwardRef((props, outerRef) => {
  const { focusLock, ...other } = props;
  const innerRef = React.useRef();
  useFocusLock(innerRef, false, 'auto', !focusLock, true);
  const ref = useForkRef(outerRef, innerRef);

  return <Flex ref={ref} {...other} />;
});

class ViewInfo extends Component {
  timer = null;
  ref = React.createRef();
  closeButtonRef = React.createRef();

  componentDidMount() {
    const { duration } = this.props;
    if (duration) {
      this.timer = new Timer(this.handleClose, duration);
      document.body.addEventListener('mousemove', this.handleBodyMouseMove);
    }

    const noticeElement = this.ref.current;

    if (noticeElement) {
      const focusableNodes = getFocusableIn(noticeElement).filter(
        (node) => node !== this.closeButtonRef.current,
      );

      if (focusableNodes.length > 0) {
        setTimeout(() => setFocus(noticeElement), 0);
      }
    }
  }

  componentWillUnmount() {
    this.clearTimer();
    document.body.removeEventListener('mousemove', this.handleBodyMouseMove);
  }

  clearTimer() {
    if (this.timer) {
      this.timer.clear();
      this.timer = null;
    }
  }

  handleClose = (e) => {
    // because it might be called not only from the close icon click
    fire(this, 'onClose', e);
    this.clearTimer();
  };

  handleKeydown = (e) => {
    if (e.key === 'Escape') {
      this.handleClose(e);
    }
  };

  handleMouseEnter = () => {
    if (!this.timer) return;
    this.timer.pause();
  };

  handleMouseLeave = () => {
    if (!this.timer) return;
    this.timer.resume();
  };

  handleBodyMouseMove = (event) => {
    if (!this.timer?.paused) return;
    const rect = this.ref.current.getBoundingClientRect();
    const mouseInRect =
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom;
    if (mouseInRect) return;
    this.timer.resume();
  };

  render() {
    const SBubble = FocusLock;
    const SDismiss = Button;
    const SContent = Flex;
    const SMessage = 'div';
    const SAction = 'div';
    const SIcon = Flex;
    const {
      forwardRef,
      styles,
      onMouseEnter,
      onMouseLeave,
      getI18nText,
      icon,
      children,
      action: actionNode,
      type,
      ...other
    } = this.props;

    return sstyled(styles)(
      <SBubble
        {...other}
        ref={forkRef(forwardRef, this.ref)}
        onMouseEnter={callAllEventHandlers(onMouseEnter, this.handleMouseEnter)}
        onMouseLeave={callAllEventHandlers(onMouseLeave, this.handleMouseLeave)}
        onKeyDown={this.handleKeydown}
        role={type === 'warning' ? 'alert' : this.props.role}
      >
        <SDismiss
          // biome-ignore lint/a11y/useValidAriaValues:
          aria-haspopup={undefined}
          type='button'
          use='tertiary'
          size='m'
          theme='invert'
          onClick={this.handleClose}
          aria-label={getI18nText('close')}
          active={false}
          title={getI18nText('close')}
          ref={this.closeButtonRef}
        >
          <Button.Addon tag={CloseIcon} color='icon-primary-invert' />
        </SDismiss>

        {isNode(icon) ? (
          <>
            <SIcon>{icon}</SIcon>
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
