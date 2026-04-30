import { getFocusableIn } from '@semcore/core/lib/utils/focus-lock/getFocusableIn';
import type * as React from 'react';

export type LockedCell = [HTMLElement | null, boolean];

export function handleFocusCell(lockedCell: LockedCell, target: Element, currentTarget: Element) {
  if (target instanceof HTMLElement && currentTarget instanceof HTMLElement && target === currentTarget && target.matches(':focus-visible')) {
    target.scrollIntoView({
      block: 'center',
      inline: 'center',
    });

    const focusableChildren = Array.from(currentTarget.children).flatMap((node) =>
      getFocusableIn(node as HTMLElement),
    );

    if (focusableChildren.length === 1) {
      focusableChildren[0].focus({ focusVisible: true });
      focusableChildren[0].scrollIntoView({
        block: 'center',
        inline: 'center',
      });
    } else if (focusableChildren.length > 1) {
      lockedCell[0] = currentTarget;
      lockedCell[1] = false;
    }
  }
}
export function handleKeydownFocusCell(lockedCell: LockedCell, e: React.KeyboardEvent): void {
  if (e.currentTarget === lockedCell[0]) {
    const focusableChildren = Array.from(lockedCell[0].children).flatMap((node) =>
      getFocusableIn(node as HTMLElement),
    );

    if (lockedCell[1]) {
      if (e.key === 'Escape') {
        lockedCell[0]?.focus({ focusVisible: true });
        lockedCell[1] = false;
      }
      if (e.key.startsWith('Arrow')) {
        e.stopPropagation();
        e.preventDefault();
      }
      if (e.key === 'Tab') {
        if (e.target === focusableChildren[0] && e.shiftKey) {
          focusableChildren[focusableChildren.length - 1]?.focus({ focusVisible: true });
          e.preventDefault();
        } else if (e.target === focusableChildren[focusableChildren.length - 1] && !e.shiftKey) {
          focusableChildren[0]?.focus({ focusVisible: true });
          e.preventDefault();
        }
        e.stopPropagation();
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      lockedCell[1] = true;
      focusableChildren[0]?.focus({ focusVisible: true });
    }
  }
}

export interface IFocusableCell {
  lockedCell: LockedCell;
  handleFocusableCellKeyDown: (e: React.KeyboardEvent) => void;
  handleFocusableCellFocus: (e: React.FocusEvent<HTMLElement, HTMLElement>) => void;
}
