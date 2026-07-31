import { computePosition, flip, offset, shift, type Placement } from '@floating-ui/dom';
import type { Intergalactic } from '@semcore/core';
import { createComponent, Root, sstyled, Component, lastInteraction } from '@semcore/core';
import canUseDOM from '@semcore/core/lib/utils/canUseDOM';
import { getAccessibleName } from '@semcore/core/lib/utils/getAccessibleName';
import { cssVariableEnhance } from '@semcore/core/lib/utils/useCssVariable';
import { zIndexStackingEnhance } from '@semcore/core/lib/utils/zIndexStacking';
import React from 'react';

import { Middleware } from './Middleware';
import keyframes from '../animation/style/keyframes.shadow.css';
import { Box } from '../flex-box';
import { Portal } from '../portal';
import type { NSHint } from './Hint.type';
import styles from './style/hint.shadow.css';

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

class HintPopperRoot extends Component<
  Intergalactic.InternalTypings.InferComponentProps<NSHint.Component>,
  typeof enhances,
  NSHint.Handlers,
  NSHint.InnerProps,
  NSHint.State,
  NSHint.DefaultProps
> {
  public readonly hintRef = React.createRef<HTMLElement>();

  static style = Object.assign(keyframes, styles);

  private showTimer?: number;
  private hideTimer?: number;

  static enhance = enhances;

  static defaultProps: NSHint.DefaultProps = {
    defaultVisible: false,
    timeout: [500, 500],
    timingFunction: 'ease-out',
    placement: 'top',
    ignorePortalsStacking: true,
  };

  constructor(props: NSHint.Props) {
    super(props);

    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);

    this.state = {
      innerVisible: null,
      calculatedPlacement: props.placement,
    };
  }

  uncontrolledProps() {
    return {
      visible: null,
    };
  }

  componentDidMount() {
    const { triggerRef, children } = this.asProps;
    const trigger = triggerRef.current;

    if (trigger && children) {
      this.subscribe(trigger);
    }
  }

  componentWillUnmount() {
    const trigger = this.asProps.triggerRef.current;

    if (trigger) {
      this.unsubscribe(trigger);
    }
  }

  componentDidUpdate(prevProps: typeof this.asProps) {
    if (prevProps.visible !== this.props.visible) {
      requestAnimationFrame(() => {
        const trigger = this.props.triggerRef.current;

        if (this.props.visible && trigger) {
          this.showHint(trigger);
        } else {
          this.hideHint();
        }
      });
    }
  }

  private subscribe(trigger: HTMLElement) {
    trigger.addEventListener('focus', this.handleFocus);
    trigger.addEventListener('blur', this.handleBlur);
    trigger.addEventListener('mouseenter', this.handleMouseEnter);
    trigger.addEventListener('mouseleave', this.handleMouseLeave);
    trigger.addEventListener('keydown', this.handleKeyDown);

    if (this.asProps.visible) {
      this.showHint(trigger);
    }
  }

  private unsubscribe(trigger: HTMLElement) {
    trigger.removeEventListener('focus', this.handleFocus);
    trigger.removeEventListener('blur', this.handleBlur);
    trigger.removeEventListener('mouseenter', this.handleMouseEnter);
    trigger.removeEventListener('mouseleave', this.handleMouseLeave);
    trigger.removeEventListener('keydown', this.handleKeyDown);

    this.hideHint();
  }

  private showHint(node: Element, mouseEvent?: MouseEvent): void {
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
          const verticalPlacement = !placement || placement.startsWith('top') || placement.startsWith('bottom');
          if (mouseEvent !== undefined && verticalPlacement) {
            middleware.push(
              Middleware.verticalCursorAnchoring({ x: mouseEvent.clientX }),
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

    if (this.state.innerVisible) {
      this.setState({ innerVisible: false });

      this.hideTimer = window.setTimeout(() => {
        this.handlers.visible(false);
        this.setState({ innerVisible: null });
      }, hideTimeout);
    }
  }

  private handleFocus(e: FocusEvent): void {
    if (this.isCompatibleElement(e.target) && this.sameAsTrigger(e) && lastInteraction.isKeyboard()) {
      this.showHint(e.target);
    }
  }

  private handleBlur(e: FocusEvent): void {
    if (this.isCompatibleElement(e.target) && this.sameAsTrigger(e)) {
      this.hideHint();
    }
  }

  private handleKeyDown(e: KeyboardEvent): void {
    if (e.key === 'Escape' && this.isCompatibleElement(e.target) && this.sameAsTrigger(e) && this.state.innerVisible) {
      e.stopPropagation();
      this.hideHint();
    }
  }

  private handleMouseEnter(e: MouseEvent): void {
    if (this.isCompatibleElement(e.target) && this.sameAsTrigger(e)) {
      this.showHint(e.target, e);
    }
  }

  private handleMouseLeave(e: MouseEvent): void {
    if (this.isCompatibleElement(e.target) && this.sameAsTrigger(e)) {
      this.hideHint();
    }
  }

  private isCompatibleElement(target: unknown): target is HTMLElement | SVGElement {
    return target instanceof HTMLElement || target instanceof SVGElement;
  }

  private sameAsTrigger(e: MouseEvent | KeyboardEvent | FocusEvent): boolean {
    return this.asProps.triggerRef.current === e.target;
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

  private setTriggerAriaLabel() {
    const { triggerRef, children } = this.asProps;

    requestAnimationFrame(() => {
      const trigger = triggerRef.current;

      if (trigger) {
        const textContent = trigger.textContent;
        const ariaLabel = getAccessibleName(trigger);

        if (!textContent && !ariaLabel) {
          const label = (typeof children === 'string' || typeof children === 'number')
            ? children.toString()
            : (this.hintRef.current?.textContent ?? '');
          triggerRef.current?.setAttribute('aria-label', label);
        }
      }
    });
  }

  render() {
    const SHintPopper = Root;
    const { visible, Children, parentZIndexStacking, styles, timingFunction, ignorePortalsStacking } = this.asProps;
    const { innerVisible, calculatedPlacement } = this.state;

    if (canUseDOM()) {
      this.setTriggerAriaLabel();
    }

    if (!visible && innerVisible === null) {
      return null;
    }

    const duration = propToArray(Number(this.asProps.duration));

    /* `visible && innerVisible === null` - is a condition to start showing right after hover/focus  */
    const showHint = (visible && innerVisible === null) || innerVisible === true;

    return sstyled(styles)(
      <Portal ignorePortalsStacking={ignorePortalsStacking}>
        <SHintPopper
          render={Box}
          ref={this.hintRef}
          aria-hidden={true}
          role={undefined}
          zIndex={parentZIndexStacking}
          use:visible={showHint}
          durationInitialize={`${duration[0]}ms`}
          durationFinalize={`${duration[1]}ms`}
          timingFunction={timingFunction}
          keyframesInitialize={innerVisible === true ? keyframes[`@${this.keyframesKey(calculatedPlacement)}-in`] : undefined}
          keyframesFinalize={innerVisible === false ? keyframes[`@${this.keyframesKey(calculatedPlacement)}-out`] : undefined}
          use:data-ui-name='Hint'
        >
          <Children />
        </SHintPopper>
      </Portal>,
    );
  }
}

/**
 * Hint
 *
 * {@link https://developer.semrush.com/intergalactic/utils/hint/hint-api|API} | {@link https://developer.semrush.com/intergalactic/utils/hint/hint-code|Examples}
 */
export const Hint = createComponent<
  NSHint.Component,
  typeof HintPopperRoot
>(HintPopperRoot);
