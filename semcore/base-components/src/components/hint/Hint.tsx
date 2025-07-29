import { computePosition, flip, offset, shift, arrow, type Placement } from '@floating-ui/dom';
import { createComponent, Root, sstyled, Component, type Intergalactic } from '@semcore/core';
import React from 'react';

import { Box } from '../flex-box';
import { Portal } from '../portal';
import styles from './style/hint.shadow.css';

type Handlers = {
  visible: (visible: boolean) => void;
};

export type HintPopperProps = {
  visible?: boolean;
  triggerRef: React.RefObject<HTMLElement>;
  children: React.ReactNode;
  placement?: Placement;
  timeout?: number | [number, number];
};

type HintComponent = Intergalactic.Component<'div', HintPopperProps>;

class HintPopperRoot extends Component<HintPopperProps, {}, {}, [], { timeout: [number, number] }, Handlers> {
  public readonly hintRef = React.createRef<HTMLElement>();
  private readonly arrowRef = React.createRef<HTMLDivElement>();

  private showTimer?: number;
  private hideTimer?: number;

  static defaultProps = {
    defaultVisible: false,
    timeout: [100, 50],
  };

  constructor(props: HintPopperProps) {
    super(props);

    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
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

  componentDidUpdate(prevProps: HintPopperProps) {
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
            middleware: [offset(6), flip(), shift({ padding: 4 }), arrow({ element: arrowElement })],
          }).then(({ x, y, placement, middlewareData }) => {
            Object.assign(popperElement.style, {
              left: `${x}px`,
              top: `${y}px`,
            });
            popperElement.style.visibility = 'visible';

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
                [staticSide]: '-4px',
              });
            }
          });
        }
      }, 10);
    }, showTimeout);
  }

  private hideHint(): void {
    const { timeout } = this.asProps;

    const hideTimeout = Array.isArray(timeout) ? timeout[0] : timeout;

    if (this.showTimer) {
      clearTimeout(this.showTimer);
    }

    window.setTimeout(() => {
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

  render() {
    const SHintPopper = Root;
    const SHintArrow = Box;
    const { visible, Children } = this.asProps;

    if (!visible) {
      return null;
    }

    return sstyled(styles)(
      <Portal>
        <SHintPopper render={Box} ref={this.hintRef}>
          <Children />
          <SHintArrow ref={this.arrowRef} />
        </SHintPopper>
      </Portal>,
    );
  }
}

export const Hint = createComponent(HintPopperRoot) as HintComponent;
