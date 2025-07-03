import type { Placement } from '@floating-ui/dom';
import { computePosition, flip, offset, shift } from '@floating-ui/dom';
import { Box, Portal } from '@semcore/base-components';
import { createComponent, Root, sstyled, Component } from '@semcore/core';
import React from 'react';

import styles from './style/hint.shadow.css';

type Props = {
  visible?: boolean;
  triggerRef: React.RefObject<HTMLElement>;
  children: React.ReactNode;
  placement?: Placement;
};

type Handlers = {
  visible: (visible: boolean) => void;
};

class HintPopperRoot extends Component<Props, {}, {}, [], {}, Handlers> {
  public readonly hintRef = React.createRef<HTMLElement>();

  static defaultProps = {
    defaultVisible: false,
  };

  uncontrolledProps() {
    return {
      visible: null,
    };
  }

  componentDidMount() {
    const trigger = this.asProps.triggerRef.current;

    trigger?.addEventListener('focus', this.handleFocus.bind(this));
    trigger?.addEventListener('blur', this.handleBlur.bind(this));
    trigger?.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
    trigger?.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
  }

  componentWillUnmount() {
    const trigger = this.asProps.triggerRef.current;

    trigger?.removeEventListener('focus', this.handleFocus.bind(this));
    trigger?.removeEventListener('blur', this.handleBlur.bind(this));
    trigger?.removeEventListener('mouseenter', this.handleMouseEnter.bind(this));
    trigger?.removeEventListener('mouseleave', this.handleMouseLeave.bind(this));
  }

  private showHint(node: HTMLElement): void {
    const { placement } = this.asProps;

    this.handlers.visible(true);

    setTimeout(() => {
      const popperElement = this.hintRef.current;
      if (popperElement) {
        popperElement.style.display = 'block';

        computePosition(node, popperElement, {
          placement: placement,
          middleware: [offset(6), flip(), shift({ padding: 4 })],
        }).then(({ x, y }) => {
          Object.assign(popperElement.style, {
            left: `${x}px`,
            top: `${y}px`,
          });
        });
      }
    });
  }

  private hideHint(node: HTMLElement): void {
    this.hintRef.current?.style.setProperty('display', 'none');
    this.handlers.visible(false);
  }

  private handleFocus(e: FocusEvent): void {
    if (e.target instanceof HTMLElement && this.asProps.triggerRef.current === e.target) {
      console.log('focus on some node, render popper for', e.target);
      this.showHint(e.target);
    }
  }

  private handleBlur(e: FocusEvent): void {
    if (e.target instanceof HTMLElement && this.asProps.triggerRef.current === e.target) {
      console.log('blur some node, disable popper for', e.target);
      this.hideHint(e.target);
    }
  }

  private handleMouseEnter(e: MouseEvent): void {
    if (e.target instanceof HTMLElement && this.asProps.triggerRef.current === e.target) {
      console.log('mouse enter some node, render popper for', e.target);
      this.showHint(e.target);
    }
  }

  private handleMouseLeave(e: MouseEvent): void {
    if (e.target instanceof HTMLElement && this.asProps.triggerRef.current === e.target) {
      console.log('mouse leave some node, disable popper for', e.target);
      this.hideHint(e.target);
    }
  }

  render() {
    const SHintPopper = Root;

    if (!this.asProps.visible) {
      return null;
    }

    return sstyled(styles)(<Portal><SHintPopper render={Box} ref={this.hintRef} /></Portal>);
  }
}

export const HintPopper = createComponent(HintPopperRoot);
