import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
// eslint-disable-next-line import/named
import { IntrinsicTransitionGroupProps } from 'react-transition-group/TransitionGroup';
import Portal, { IPortalProps } from '@semcore/portal';
import manager, { NoticeBubbleManager } from './Manager/NoticeBubbleManager';
import createComponent, { Component, Merge, styled } from '@semcore/core';
import { Box, IBoxProps } from '@semcore/flex-box';
import fire from '@semcore/utils/lib/fire';
import isNode from '@semcore/utils/lib/isNode';
import { callAllEventHandlers } from '@semcore/utils/lib/assignProps';
import CloseXS from '@semcore/icon/lib/Close/xs';
import logger from '@semcore/utils/lib/logger';
import propsForElement from '@semcore/utils/lib/propsForElement';
import { useUID } from '@semcore/utils/lib/uniqueID';
import { Timer } from './utils';

import style from './style/notice-bubble.shadow.css';

export interface INoticeBubbleContainerProps extends IntrinsicTransitionGroupProps, IPortalProps {
  /** Manager copy */
  manager?: NoticeBubbleManager;
  /** Offset from the upper-right corner of the screen */
  offset?: {
    top?: number | string;
    right?: number | string;
    bottom?: number | string;
    left?: number | string;
  };
}

export interface INoticeBubbleContainerState {
  notices: NoticeBubbleView[];
  warnings: NoticeBubbleWarningView[];
}

export interface INoticeBubbleInfoProps extends INoticeBubbleProps {
  readonly type?: 'info';
  /** Notice display duration
   * @default 5000
   */
  duration?: number;
}

export interface INoticeBubbleWarningProps extends INoticeBubbleProps {
  readonly type?: 'warning';
  /**
   * Notice display duration
   * @default 0
   */
  duration?: number;
}

export interface INoticeBubbleProps extends IBoxProps {
  /**
   * Manager instance
   * @default NoticeBubbleManager()
   */
  manager?: NoticeBubbleManager;
  /**
   * Notice visibility
   */
  visible?: boolean;
  /** Adds controls (buttons, etc.) */
  action?: React.ReactNode;

  /** Triggered when the notice is closed */
  onClose?: () => void;

  /** Triggered on mouseEnter */
  onMouseEnter?: (e?: React.SyntheticEvent) => void;

  /** Triggered on mouseLeave */
  onMouseLeave?: (e?: React.SyntheticEvent) => void;
}

const Notices = (props) => {
  const { styles, data = [], tag: SView = ViewInfo } = props;

  return data.map((notice) => {
    const uid = useUID();
    return (
      <CSSTransition
        key={uid}
        appear
        classNames={{
          exitActive: styled.styles['notice-bubble-fade--exit-active'],
          exit: styled.styles['notice-bubble-fade--exit'],
        }}
        timeout={{
          exit: 200,
        }}
      >
        {styled(styles)(<SView {...notice} styles={notice.styles || styles} />)}
      </CSSTransition>
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

class NoticeBubbleContainerRoot extends Component<
  INoticeBubbleContainerProps,
  {},
  INoticeBubbleContainerState
> {
  static displayName = 'NoticeBubbleContainer';
  static style = style;
  static defaultProps = {
    manager,
    offset: {},
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
    const SNoticeBubble = TransitionGroup;
    const { Children, offset, styles, disablePortal, forwardRef, ...other } = this.asProps;
    const { notices, warnings } = this.state;

    return (
      <Portal disablePortal={disablePortal}>
        {styled(styles)`
          SNoticeBubble {
            margin-top: ${offset.top};
            margin-right: ${offset.right};
            margin-bottom: ${offset.bottom};
            margin-left: ${offset.left};
          }
        `(
          <SNoticeBubble ref={forwardRef} {...propsForElement(other)}>
            <Children />
            <Notices styles={styles} data={warnings} tag={ViewWarning} />
            <Notices styles={styles} data={notices} tag={ViewInfo} />
          </SNoticeBubble>,
        )}
      </Portal>
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
class ViewInfo extends Component<INoticeBubbleInfoProps> {
  private timer = null;

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

    return styled(styles)(
      <SInfo
        {...other}
        ref={forwardRef}
        onMouseEnter={callAllEventHandlers(onMouseEnter, this.handlerMouseEnter)}
        onMouseLeave={callAllEventHandlers(onMouseLeave, this.handlerMouseLeave)}
      >
        <SDismiss title="Close" onClick={this.handlerClose}>
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

    return styled(styles)(
      <SWarning ref={forwardRef} {...other}>
        <SMessage>{children}</SMessage>
        {isNode(actionNode) ? <SAction>{actionNode}</SAction> : null}
      </SWarning>,
    );
  }
}

class NoticeBubbleView extends Component<INoticeBubbleInfoProps> {
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

const NoticeBubbleContainer = createComponent<
  Merge<INoticeBubbleContainerProps, React.HTMLAttributes<HTMLDivElement>>,
  {
    Info: Merge<INoticeBubbleInfoProps, React.HTMLAttributes<HTMLDivElement>>;
    Warning: Merge<INoticeBubbleWarningProps, React.HTMLAttributes<HTMLDivElement>>;
  }
>(NoticeBubbleContainerRoot, {
  Info: NoticeBubbleView,
  Warning: NoticeBubbleWarningView,
});

const NoticeBubble = NoticeBubbleContainer.Info;
const NoticeBubbleWarning = NoticeBubbleContainer.Warning;

export { NoticeBubble, NoticeBubbleWarning };

export default NoticeBubbleContainer;

export const NoticeBubbleRepresentation = React.forwardRef(function (props, ref) {
  logger.warn(
    true,
    "The component '<NoticeBubbleRepresentation/>' is deprecated, please use '<NoticeBubble/>'",
    props['data-ui-name'] || NoticeBubble.displayName,
  );
  //@ts-ignore
  if (props.type === 'warning') {
    return <NoticeBubbleWarning ref={ref} {...props} />;
  }
  return <NoticeBubble ref={ref} {...props} />;
});
