import React from 'react';
import Portal from '@semcore/portal';
import manager from './NoticeBubbleManager';
import createComponent, { Component, sstyled, Root } from '@semcore/core';
import { Animation } from '@semcore/animation';
import { Box } from '@semcore/flex-box';
import fire from '@semcore/utils/lib/fire';
import isNode from '@semcore/utils/lib/isNode';
import { callAllEventHandlers } from '@semcore/utils/lib/assignProps';
import CloseXS from '@semcore/icon/lib/Close/xs';
import { useUID } from '@semcore/utils/lib/uniqueID';
import { Timer } from './utils';

import style from './style/notice-bubble.shadow.css';

const animationNotice = sstyled.css`
  @keyframes enter {
    from {
      transform: translate(100%, 0);
    }
    to {
      transform: translate(0, 0);
    }
  }

  @keyframes exit {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;

const Notices = (props) => {
  const { styles, data = [], tag: SView = ViewInfo, visible } = props;

  return data.map((notice) => {
    const uid = useUID();
    return sstyled(styles)(
      <Animation
        key={uid}
        visible={notice.visible || visible}
        duration={250}
        keyframes={[animationNotice['@enter'], animationNotice['@exit']]}
      >
        <SView {...notice} styles={notice.styles || styles} />
      </Animation>,
    );
  });
};

/**
 * ```js
 * import { NoticeBubble } from "@semcore/notice-bubble"
 * ```
 *
 * Container is a portal (React.Portal) in the body, inserted once into any part of the application
 * and subscribes to manager updates(NoticeBubbleManager)
 * */

class NoticeBubbleContainerRoot extends Component {
  static displayName = 'NoticeBubbleContainer';
  static style = style;
  static defaultProps = {
    manager,
  };

  _unsubscribe = null;

  state = {
    notices: [],
    warnings: [],
  };

  constructor(props) {
    super(props);
    this._unsubscribe = props.manager.addListener(this.handleChange);
  }

  componentWillUnmount = () => {
    if (this._unsubscribe) {
      this._unsubscribe();
    }
  };

  handleChange = (notices) => {
    const info = notices.filter((notice) => notice.type === 'info');
    const { length: iLength } = info;
    const warning = notices.filter((notice) => notice.type === 'warning');
    const { length: wLength } = warning;
    this.setState({
      notices: iLength ? [info[iLength - 1]] : [],
      warnings: wLength ? [warning[wLength - 1]] : [],
    });
  };

  render() {
    const SNoticeBubble = Root;
    const { Children, styles, disablePortal } = this.asProps;
    const { notices, warnings } = this.state;

    return sstyled(styles)(
      <Portal disablePortal={disablePortal}>
        <SNoticeBubble render={Box}>
          <Children />
          <Notices styles={styles} data={warnings} tag={ViewWarning} />
          <Notices styles={styles} data={notices} tag={ViewInfo} />
        </SNoticeBubble>
      </Portal>,
    );
  }
}
/**
 * ```js
 * import { NoticeBubble } from "@semcore/notice-bubble"
 * <NoticeBubble.Info/>
 * ```
 *
 * View component, the appearance of the notice
 * */
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

  handlerClose = () => {
    // because call not only click
    fire(this, 'onClose');
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
    const SInfo = Box;
    const SMessage = 'div';
    const SAction = 'div';
    const SDismiss = 'div';
    const {
      action: actionNode,
      forwardRef,
      styles,
      onMouseEnter,
      onMouseLeave,
      children,
      ...other
    } = this.props;

    return sstyled(styles)(
      <SInfo
        role="alert"
        {...other}
        ref={forwardRef}
        onMouseEnter={callAllEventHandlers(onMouseEnter, this.handlerMouseEnter)}
        onMouseLeave={callAllEventHandlers(onMouseLeave, this.handlerMouseLeave)}
      >
        <SDismiss title="Close" onClick={this.handlerClose} aria-label="Close alert">
          <CloseXS />
        </SDismiss>
        <SMessage>{children}</SMessage>
        {isNode(actionNode) ? <SAction>{actionNode}</SAction> : null}
      </SInfo>,
    );
  }
}

class ViewWarning extends ViewInfo {
  static defaultProps = {
    type: 'warning',
    duration: 0,
  };

  render() {
    const SWarning = Box;
    const SMessage = 'div';
    const SAction = 'div';
    const { action: actionNode, children, styles, forwardRef, ...other } = this.props;

    return sstyled(styles)(
      <SWarning ref={forwardRef} role="alert" {...other}>
        <SMessage>{children}</SMessage>
        {isNode(actionNode) ? <SAction>{actionNode}</SAction> : null}
      </SWarning>,
    );
  }
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
