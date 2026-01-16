import { computePosition, flip, offset, shift, type Placement } from '@floating-ui/dom';
import { createComponent, Root, sstyled, Component, lastInteraction } from '@semcore/core';
import { cssVariableEnhance } from '@semcore/core/lib/utils/useCssVariable';
import { zIndexStackingEnhance } from '@semcore/core/lib/utils/zIndexStacking';
import type { DataType } from 'csstype';
import React from 'react';

import { Middleware } from './Middleware';
import keyframes from '../animation/style/keyframes.shadow.css';
import { Box } from '../flex-box';
import { Portal } from '../portal';
import styles from './style/hint.shadow.css';

type Handlers = {
  visible: null;
};

export type SimpleHintPopperProps = {
  /** Ref to the trigger element */
  triggerRef: React.RefObject<HTMLElement | null>;
  /**
   * The position of the popper relative to the trigger that called it.
   * @default top
   */
  placement?: Placement;
  /**
   * Timer to show and hide the popper
   * @default [500, 500]
   */
  timeout?: DefaultProps['timeout'];
  /**
   * Hint content.
   * Better to use here some short text.
   * */
  children: React.ReactNode;

  /** Popper visibility value */
  visible?: boolean;
  /** Default popper visibility
   * @default false */
  defaultVisible?: boolean;
  /** Function called when visibility changes */
  onVisibleChange?: (visible: boolean, e?: Event) => boolean | void;
};

type DefaultProps = {
  defaultVisible?: boolean;
  timeout: number | [number, number];
  timingFunction: DataType.EasingFunction;
  placement?: Placement;
};

type State = {
  innerVisible: boolean;
  calculatedPlacement?: Placement;
};

const enhances = [
  zIndexStackingEnhance('z-index-tooltip'),
  cssVariableEnhance({
    variable: '--intergalactic-duration-popper',
    fallback: '200',
    map: (v: string) => Number.parseInt(v, 10).toString(),
    prop: 'duration',
  }),
  cssVariableEnhance({
    variable: '--intergalactic-spacing-1x',
    fallback: '4',
    map: (v: string) => Number.parseInt(v, 10).toString(),
    prop: 'offset',
  }),
  cssVariableEnhance({
    variable: '--intergalactic-spacing-1x',
    fallback: '4',
    map: (v: string) => Number.parseInt(v, 10).toString(),
    prop: 'padding',
  }),
] as const;

function propToArray(prop: number | [number, number]): [number, number] {
  return Array.isArray(prop) ? prop : [prop, prop];
}

const keyframesMap = new Map<Placement, string>();

class HintPopperRoot extends Component<SimpleHintPopperProps, typeof enhances, Handlers, DefaultProps, State> {
  public readonly hintRef = React.createRef<HTMLElement>();

  static style = Object.assign(keyframes, styles);

  private showTimer?: number;
  private hideTimer?: number;

  static enhance = enhances;

  static defaultProps: DefaultProps = {
    defaultVisible: false,
    timeout: [500, 500],
    timingFunction: 'ease-out',
    placement: 'top',
  };

  constructor(props: SimpleHintPopperProps) {
    super(props);

    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);

    this.state = {
      innerVisible: props.visible ?? false,
      calculatedPlacement: undefined,
    };
  }

  uncontrolledProps() {
    return {
      visible: null,
    };
  }

  componentDidMount() {
    const trigger = this.asProps.triggerRef.current;

    trigger?.addEventListener('focus', this.handleFocus);
    trigger?.addEventListener('blur', this.handleBlur);
    trigger?.addEventListener('mouseenter', this.handleMouseEnter);
    trigger?.addEventListener('mouseleave', this.handleMouseLeave);
    trigger?.addEventListener('keydown', this.handleKeyDown);

    if (this.asProps.visible && trigger) {
      this.showHint(trigger);
    }
  }

  componentWillUnmount() {
    const trigger = this.asProps.triggerRef.current;

    trigger?.removeEventListener('focus', this.handleFocus);
    trigger?.removeEventListener('blur', this.handleBlur);
    trigger?.removeEventListener('mouseenter', this.handleMouseEnter);
    trigger?.removeEventListener('mouseleave', this.handleMouseLeave);
    trigger?.removeEventListener('keydown', this.handleKeyDown);

    this.hideHint();
  }

  componentDidUpdate(prevProps: SimpleHintPopperProps) {
    if (prevProps.visible !== this.props.visible || prevProps.triggerRef.current !== this.props.triggerRef.current) {
      const trigger = this.asProps.triggerRef.current;

      if (this.props.visible && trigger) {
        this.showHint(trigger);
      } else {
        this.hideHint();
      }
    }
  }

  private showHint(node: HTMLElement, mouseEvent?: MouseEvent): void {
    const { placement, timeout } = this.asProps;

    const showTimeout = Array.isArray(timeout) ? timeout[0] : timeout;

    if (this.hideTimer) {
      clearTimeout(this.hideTimer);
    }

    this.showTimer = window.setTimeout(() => {
      this.handlers.visible(true);

      window.setTimeout(() => {
        const popperElement = this.hintRef.current;
        if (popperElement) {
          const middleware = [
            offset(Number(this.asProps.offset)),
            flip(),
            shift({ padding: Number(this.asProps.padding) }),
          ];
          if (mouseEvent !== undefined) {
            middleware.push(
              Middleware.cursorAnchoring({ x: mouseEvent.clientX, y: mouseEvent.clientY }),
              shift({ padding: Number(this.asProps.padding) }),
            );
          }

          computePosition(node, popperElement, {
            placement: placement,
            middleware,
          }).then(({ x, y, placement }) => {
            Object.assign(popperElement.style, {
              left: `${x}px`,
              top: `${y}px`,
            });
            popperElement.style.visibility = 'visible';

            this.setState({ innerVisible: true, calculatedPlacement: placement });
          });
        }
      }, 10);
    }, showTimeout);
  }

  private hideHint(): void {
    const { timeout } = this.asProps;

    const hideTimeout = Array.isArray(timeout) ? timeout[1] : timeout;

    if (this.showTimer) {
      clearTimeout(this.showTimer);
    }

    this.setState({ innerVisible: false });

    this.hideTimer = window.setTimeout(() => {
      this.hintRef.current?.style.setProperty('visibility', 'hidden');
      this.handlers.visible(false);
    }, hideTimeout);
  }

  private handleFocus(e: FocusEvent): void {
    if (e.target instanceof HTMLElement && this.asProps.triggerRef.current === e.target && lastInteraction.isKeyboard()) {
      this.showHint(e.target);
    }
  }

  private handleBlur(e: FocusEvent): void {
    if (e.target instanceof HTMLElement && this.asProps.triggerRef.current === e.target) {
      this.hideHint();
    }
  }

  private handleKeyDown(e: KeyboardEvent): void {
    if (e.key === 'Escape' && e.target instanceof HTMLElement && this.asProps.triggerRef.current === e.target && this.state.innerVisible) {
      e.stopPropagation();
      this.hideHint();
    }
  }

  private handleMouseEnter(e: MouseEvent): void {
    if (e.target instanceof HTMLElement && this.asProps.triggerRef.current === e.target) {
      this.showHint(e.target, e);
    }
  }

  private handleMouseLeave(e: MouseEvent): void {
    if (e.target instanceof HTMLElement && this.asProps.triggerRef.current === e.target) {
      this.hideHint();
    }
  }

  private keyframesKey(placement?: Placement) {
    if (!placement) {
      return 'opacity';
    }

    if (keyframesMap.has(placement)) {
      return keyframesMap.get(placement)!;
    }

    let keyframe: string = 'opacity';

    if (placement.startsWith('left')) keyframe = 'scale-left';
    if (placement.startsWith('right')) keyframe = 'scale-right';
    if (placement.startsWith('bottom')) keyframe = 'scale-bottom';
    if (placement.startsWith('top')) keyframe = 'scale-top';

    keyframesMap.set(placement, keyframe);

    return keyframe;
  }

  render() {
    const SHintPopper = Root;
    const { visible, Children, triggerRef, parentZIndexStacking, styles, timingFunction } = this.asProps;
    const { innerVisible, calculatedPlacement } = this.state;

    if (!visible) {
      return null;
    }

    requestAnimationFrame(() => {
      if (!triggerRef.current?.textContent && visible) {
        triggerRef.current?.setAttribute('aria-label', this.hintRef.current?.textContent ?? '');
      }
    });

    const duration = propToArray(Number(this.asProps.duration));

    return sstyled(styles)(
      <Portal>
        <SHintPopper
          render={Box}
          ref={this.hintRef}
          aria-hidden={true}
          role={undefined}
          zIndex={parentZIndexStacking}
          use:visible={innerVisible}
          durationInitialize={`${duration[0]}ms`}
          durationFinalize={`${duration[1]}ms`}
          timingFunction={timingFunction}
          keyframesInitialize={keyframes[`@${this.keyframesKey(calculatedPlacement)}-in`]}
          keyframesFinalize={keyframes[`@${this.keyframesKey(calculatedPlacement)}-out`]}
          use:data-ui-name='Hint'
        >
          <Children />
        </SHintPopper>
      </Portal>,
    );
  }
}

export const Hint = createComponent<'div', SimpleHintPopperProps>(HintPopperRoot);
