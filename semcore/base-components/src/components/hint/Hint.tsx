import { computePosition, flip, offset, shift, arrow, type Placement } from '@floating-ui/dom';
import { createComponent, Root, sstyled, Component, type Intergalactic } from '@semcore/core';
import { cssVariableEnhance } from '@semcore/core/lib/utils/useCssVariable';
import { zIndexStackingEnhance } from '@semcore/core/lib/utils/zIndexStacking';
import type { DataType } from 'csstype';
import React from 'react';

import { Box } from '../flex-box';
import { Portal } from '../portal';
import styles from './style/hint.shadow.css';
import style from '../animation/style/keyframes.shadow.css';
import keyframes from '../animation/style/keyframes.shadow.css';

type Handlers = {
  visible: null;
};

export type SimpleHintPopperProps = {
  /** Ref to the trigger element */
  triggerRef: React.RefObject<HTMLElement>;
  /**
   * The position of the popper relative to the trigger that called it.
   * @default auto
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

type HintComponent = Intergalactic.Component<'div', SimpleHintPopperProps>;

type DefaultProps = {
  defaultVisible?: boolean;
  timeout: number | [number, number];
  timingFunction: DataType.EasingFunction;
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
] as const;

function propToArray(prop: number | [number, number]): [number, number] {
  return Array.isArray(prop) ? prop : [prop, prop];
}

const keyframesMap = new Map<Placement, string>();

class HintPopperRoot extends Component<SimpleHintPopperProps, typeof enhances, Handlers, DefaultProps, State> {
  public readonly hintRef = React.createRef<HTMLElement>();
  private readonly arrowRef = React.createRef<HTMLDivElement>();

  static style = Object.assign(keyframes, styles);

  private showTimer?: number;
  private hideTimer?: number;

  static enhance = enhances;

  static defaultProps: DefaultProps = {
    defaultVisible: false,
    timeout: [500, 500],
    timingFunction: 'ease-out',
  };

  constructor(props: SimpleHintPopperProps) {
    super(props);

    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);

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

  private showHint(node: HTMLElement): void {
    const { placement, timeout } = this.asProps;

    const showTimeout = Array.isArray(timeout) ? timeout[0] : timeout;

    if (this.hideTimer) {
      clearTimeout(this.hideTimer);
    }

    this.showTimer = window.setTimeout(() => {
      this.handlers.visible(true);

      window.setTimeout(() => {
        const popperElement = this.hintRef.current;
        const arrowElement = this.arrowRef.current;
        if (popperElement && arrowElement) {
          computePosition(node, popperElement, {
            placement: placement,
            middleware: [offset(10), flip(), shift({ padding: 4 }), arrow({ element: arrowElement })],
          }).then(({ x, y, placement, middlewareData }) => {
            Object.assign(popperElement.style, {
              left: `${x}px`,
              top: `${y}px`,
            });
            popperElement.style.visibility = 'visible';

            this.setState({ innerVisible: true, calculatedPlacement: placement });

            const arrow = middlewareData.arrow;

            if (arrow) {
              const staticSide = {
                top: 'bottom',
                right: 'left',
                bottom: 'top',
                left: 'right',
              }[placement.split('-')[0]]!;

              Object.assign(arrowElement.style, {
                left: arrow.x !== undefined ? `${arrow.x}px` : '',
                top: arrow.y !== undefined ? `${arrow.y}px` : '',
                right: '',
                bottom: '',
              });
              arrowElement.dataset.side = staticSide;
            }
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
    if (e.target instanceof HTMLElement && this.asProps.triggerRef.current === e.target) {
      this.showHint(e.target);
    }
  }

  private handleBlur(e: FocusEvent): void {
    if (e.target instanceof HTMLElement && this.asProps.triggerRef.current === e.target) {
      this.hideHint();
    }
  }

  private handleMouseEnter(e: MouseEvent): void {
    if (e.target instanceof HTMLElement && this.asProps.triggerRef.current === e.target) {
      this.showHint(e.target);
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
    const SHintArrow = Box;
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
          keyframesInitialize={style[`@${this.keyframesKey(calculatedPlacement)}-in`]}
          keyframesFinalize={style[`@${this.keyframesKey(calculatedPlacement)}-out`]}
        >
          <Children />
          <SHintArrow ref={this.arrowRef} />
        </SHintPopper>
      </Portal>,
    );
  }
}

export const Hint = createComponent(HintPopperRoot) as HintComponent;
