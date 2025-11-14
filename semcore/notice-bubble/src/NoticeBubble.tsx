import { Animation, Box } from '@semcore/base-components';
import Button from '@semcore/button';
import { createComponent, Component, sstyled, Root } from '@semcore/core';
import { callAllEventHandlers } from '@semcore/core/lib/utils/assignProps';
import i18nEnhance from '@semcore/core/lib/utils/enhances/i18nEnhance';
import fire from '@semcore/core/lib/utils/fire';
import { getFocusableIn } from '@semcore/core/lib/utils/focus-lock/getFocusableIn';
import isNode from '@semcore/core/lib/utils/isNode';
import { forkRef, useForkRef } from '@semcore/core/lib/utils/ref';
import { contextThemeEnhance } from '@semcore/core/lib/utils/ThemeProvider';
import { useFocusLock, setFocus } from '@semcore/core/lib/utils/use/useFocusLock';
import { cssVariableEnhance } from '@semcore/core/lib/utils/useCssVariable';
import {
  ZIndexStackingContextProvider,
  zIndexStackingEnhance,
} from '@semcore/core/lib/utils/zIndexStacking';
import { Flex } from '@semcore/flex-box';
import CloseIcon from '@semcore/icon/Close/m';
import Portal from '@semcore/portal';
import type { Intergalactic } from '@semcore/ui/core';
import React from 'react';

import type { AddReturnObj, NoticeBubbleContainerProps, NoticeBubbleViewItemProps } from './NoticeBubble.type';
import type { NoticeBubbleManager, NoticeItem } from './NoticeBubbleManager';
import manager from './NoticeBubbleManager';
import style from './style/notice-bubble.shadow.css';
import { localizedMessages } from './translations/__intergalactic-dynamic-locales';
import { Timer } from './utils';

// type NoticesProps = {
//   styles: React.DetailedHTMLProps<React.StyleHTMLAttributes<HTMLStyleElement>, HTMLStyleElement>;
//   data: NoticeItem[];
//   getI18nText: ReturnType<ReturnType<typeof i18nEnhance>>['getI18nText'];
// };

// const Notices = (props: NoticesProps) => {
//   const { styles, data } = props;
//   const ref = React.useRef();
//   const durationStr = useCssVariable('--intergalactic-duration-popper', '200', ref);
//   const duration = React.useMemo(() => Number.parseInt(durationStr, 10), [durationStr]);
//
//   return data.map((notice) => {
//     const SView = notice.type === 'warning' ? ViewWarning : ViewInfo;
//
//     return sstyled(styles)(
//       <Animation
//         key={notice.uid}
//         initialAnimation={notice.initialAnimation}
//         visible={notice.visible ?? true}
//         duration={duration}
//         keyframes={[styles['@enter'], styles['@exit']]}
//         ref={ref}
//       >
//         <SView {...notice} styles={notice.styles || styles} getI18nText={props.getI18nText} />
//       </Animation>,
//     );
//   });
// };

type State = {
  notices: NoticeItem[];
  infos: NoticeItem[];
  warnings: NoticeItem[];
};

class NoticeBubbleContainerRoot extends Component<NoticeBubbleContainerProps, {}, State, typeof NoticeBubbleContainerRoot.enhance, typeof NoticeBubbleContainerRoot.defaultProps> {
  static displayName = 'NoticeBubbleContainer';
  static style = style;
  static enhance = [
    i18nEnhance(localizedMessages),
    contextThemeEnhance(),
    zIndexStackingEnhance('z-index-notice-bubble'),
    cssVariableEnhance<'duration', number, number>({
      variable: '--intergalactic-duration-popper',
      fallback: 200,
      map: (v: string) => Number.parseInt(v, 10),
      prop: 'duration',
    }),
  ] as const;

  static defaultProps = {
    manager,
    i18n: localizedMessages,
    locale: 'en',
  } as const;

  _unsubscribe: (() => void) | null = null;

  state: State = {
    notices: [],
    infos: [],
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

  handleChange = (notices: NoticeItem[]) => {
    this.setState({ notices });
    this.forceUpdate(); // need this, because somehow this component doesn't rerender event if the notices are different
  };

  render() {
    const SNoticeBubble = Root;
    const SNoticeAriaLiveWrapper = 'div';
    const { Children, styles, disablePortal, getI18nText, ref, parentZIndexStacking, duration, containerNode } =
            this.asProps;
    const { notices } = this.state;

    if (containerNode) {
      return notices.map((notice) => {
        const SView = notice.type === 'warning' ? ViewWarning : ViewInfo;

        return sstyled(styles)(
          <SView
            key={notice.uid}
            containerNode={containerNode}
            animationDuration={duration}
            styles={styles}
            getI18nText={getI18nText}
            {...notice}
          />,
        );
      });
    }

    const infos = notices.filter((notice) => notice.type === 'info');
    const warnings = notices.filter((notice) => notice.type === 'warning');

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
            {warnings.map((notice) => {
              const SView = ViewWarning;
              return sstyled(styles)(
                <SView
                  key={notice.uid}
                  animationDuration={duration}
                  styles={styles}
                  getI18nText={getI18nText}
                  {...notice}
                />,
              );
            })}
            <SNoticeAriaLiveWrapper aria-live='polite'>
              {infos.map((notice) => {
                const SView = ViewInfo;
                return sstyled(styles)(
                  <SView
                    key={notice.uid}
                    animationDuration={duration}
                    styles={styles}
                    getI18nText={getI18nText}
                    {...notice}
                  />,
                );
              })}
            </SNoticeAriaLiveWrapper>
          </SNoticeBubble>
        </Portal>
      </ZIndexStackingContextProvider>,
    );
  }
}

const FocusLock = React.forwardRef((props: any, outerRef: React.ForwardedRef<HTMLDivElement>) => {
  const { focusLock, ...other } = props;
  const innerRef = React.useRef<HTMLDivElement | null>(null);
  useFocusLock(innerRef, false, 'auto', !focusLock, true);
  const ref = useForkRef(outerRef, innerRef);

  return <Flex ref={ref} {...other} />;
});

class ViewInfo extends Component<NoticeBubbleViewItemProps> {
  timer: Timer | null = null;
  ref = React.createRef<HTMLDivElement>();
  closeButtonRef = React.createRef<HTMLButtonElement>();

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

  handleClose = (e: React.SyntheticEvent) => {
    // because it might be called not only from the close icon click
    fire(this, 'onClose', e);
    this.clearTimer();
  };

  handleKeydown = (e: React.KeyboardEvent) => {
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

  handleBodyMouseMove = (event: MouseEvent) => {
    if (!this.timer?.paused) return;
    const rect = this.ref.current?.getBoundingClientRect();
    if (!rect) return;
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
      styles,
      getI18nText,
      visible,
      type,
      initialAnimation,
      containerNode,
      animationDuration,
      icon,
      children,
      action,
    } = this.props;

    const Bubble = sstyled(styles)(
      <Animation
        initialAnimation={initialAnimation}
        visible={visible ?? true}
        duration={animationDuration}
        // @ts-ignore
        keyframes={[styles['@enter'], styles['@exit']]}
      >
        <SBubble
          type={type}
          ref={this.ref}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          onKeyDown={this.handleKeydown}
          role={type === 'warning' ? 'alert' : undefined}
        >
          <SDismiss
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
            data-hide-focus-hover-popper='true'
          >
            <Button.Addon tag={CloseIcon} color='icon-primary-invert' />
          </SDismiss>

          {isNode(icon)
            ? (
                <>
                  <SIcon>{icon}</SIcon>
                  <SContent>
                    <SMessage>{children}</SMessage>
                    {isNode(action) ? <SAction>{action}</SAction> : null}
                  </SContent>
                </>
              )
            : (
                <SContent>
                  <SMessage>{children}</SMessage>
                  {isNode(action) ? <SAction>{action}</SAction> : null}
                </SContent>
              )}
        </SBubble>
      </Animation>,
    );

    if (containerNode) {
      return (
        <ZIndexStackingContextProvider designToken='z-index-notice-bubble'>
          <Portal nodeToMount={containerNode}>
            {Bubble}
          </Portal>
        </ZIndexStackingContextProvider>
      );
    }

    return Bubble;
  }
}

class ViewWarning extends ViewInfo {
  static defaultProps = {
    type: 'warning',
    duration: 0,
  };
}

class NoticeBubbleView extends Component<{ manager: NoticeBubbleManager }> {
  static defaultProps = {
    duration: 5000,
    type: 'info',
    manager,
  };

  _notice: null | AddReturnObj = null;

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
}) as Intergalactic.Component<NoticeBubbleContainerProps> & {
  Info: typeof NoticeBubbleView;
  Warning: typeof NoticeBubbleWarningView;
};

const NoticeBubble = NoticeBubbleContainer.Info;
const NoticeBubbleWarning = NoticeBubbleContainer.Warning;

export { NoticeBubble, NoticeBubbleWarning };

export default NoticeBubbleContainer;
