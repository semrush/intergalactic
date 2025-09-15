import { getFocusableIn } from '@semcore/core/lib/utils/focus-lock/getFocusableIn';
import type * as React from 'react';

export interface IFocusableCell {
  handleFocusableCellKeyDown: (e: React.KeyboardEvent) => void;
  handleFocusableCellFocus: (target: HTMLElement, currentTarget: HTMLElement, e: React.FocusEvent<HTMLElement, HTMLElement>) => void;
}

interface IFocusableCellCtor<T = any> {
  new (...args: any[]): T & IFocusableCell;
}

export function FocusableCell<T extends IFocusableCellCtor>(target: T) {
  return class extends target implements IFocusableCell {
    lockedCell: [HTMLElement | null, boolean] = [null, false];

    handleFocusableCellKeyDown(e: React.KeyboardEvent) {
      if (e.currentTarget === this.lockedCell[0]) {
        const focusableChildren = Array.from(this.lockedCell[0].children).flatMap((node) =>
          getFocusableIn(node as HTMLElement),
        );

        if (this.lockedCell[1]) {
          if (e.key === 'Escape') {
            this.lockedCell[0]?.focus();
            this.lockedCell[1] = false;
          }
          if (e.key.startsWith('Arrow')) {
            e.stopPropagation();
            e.preventDefault();
          }
          if (e.key === 'Tab') {
            if (e.target === focusableChildren[0] && e.shiftKey) {
              focusableChildren[focusableChildren.length - 1]?.focus();
              e.preventDefault();
            } else if (e.target === focusableChildren[focusableChildren.length - 1] && !e.shiftKey) {
              focusableChildren[0]?.focus();
              e.preventDefault();
            }
            e.stopPropagation();
          }
        } else if (e.key === 'Enter') {
          e.preventDefault();
          e.stopPropagation();
          this.lockedCell[1] = true;
          focusableChildren[0]?.focus();
        }
      }
    };

    handleFocusableCellFocus(target: HTMLElement, currentTarget: HTMLElement, e: React.FocusEvent<HTMLElement, HTMLElement>) {
      if (target === currentTarget && target.matches(':focus-visible')) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'center',
        });

        const focusableChildren = Array.from(currentTarget.children).flatMap((node) =>
          getFocusableIn(node as HTMLElement),
        );

        if (focusableChildren.length === 1) {
          focusableChildren[0].focus();
        } else if (focusableChildren.length > 1) {
          this.lockedCell = [currentTarget, false];
        }
      }
    };
  };
}
