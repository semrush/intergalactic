import canUseDOM from '../canUseDOM';
import { useUID } from '../uniqueID';
import moveFocusInside, { focusInside, getFocusableIn } from 'focus-lock';
import React from 'react';

const focusBordersConsumers = new Set();
const focusBordersRefs = { before: null, after: null } as {
  before: null | HTMLElement;

  after: null | HTMLElement;
};
const useFocusBorders = (disabled) => {
  const id = useUID('focus-borders-consumer');
  const addBorders = React.useCallback(() => {
    if (!focusBordersRefs.before) {
      focusBordersRefs.before = document.createElement('div');
      focusBordersRefs.before.setAttribute('tabindex', '0');
      focusBordersRefs.before.style.position = 'fixed';
      focusBordersRefs.before.dataset.id = '__intergalactic-focus-border-before';
      document.body.prepend(focusBordersRefs.before);
    }
    if (!focusBordersRefs.after) {
      focusBordersRefs.after = document.createElement('div');
      focusBordersRefs.after.setAttribute('tabindex', '0');
      focusBordersRefs.after.dataset.id = '__intergalactic-focus-border-after';
      focusBordersRefs.after.style.position = 'fixed';
      document.body.append(focusBordersRefs.after);
    }
  }, []);
  const removeBorders = React.useCallback(() => {
    focusBordersRefs.before?.remove();
    focusBordersRefs.after?.remove();
    focusBordersRefs.before = null;
    focusBordersRefs.after = null;
  }, []);
  const areBordersPlacedCorrectly = React.useCallback(() => {
    if (!focusBordersRefs.before || !focusBordersRefs.after) return true;
    if (document.body.children[0] !== focusBordersRefs.before) return false;
    if (document.body.children[document.body.children.length - 1] !== focusBordersRefs.after)
      return false;
    return true;
  }, []);
  React.useEffect(() => {
    if (!disabled) {
      focusBordersConsumers.add(id);
    }

    if (!areBordersPlacedCorrectly()) removeBorders();
    if (focusBordersConsumers.size > 0) addBorders();

    return () => {
      focusBordersConsumers.delete(id);
      if (focusBordersConsumers.size === 0) removeBorders();
    };
  }, [id, disabled]);
};

const focusLockUsers = new Set<HTMLElement>();

export const useFocusLock = (
  trapRef: React.RefObject<HTMLElement>,
  autoFocus: boolean,
  returnFocusTo: React.RefObject<HTMLElement> | null | 'auto',
  disabled?: boolean,
) => {
  useFocusBorders(disabled);

  const autoTriggerRef = React.useRef<HTMLElement | null>(null);
  const lastUserInteractionRef = React.useRef<'mouse' | 'keyboard' | undefined>(undefined);

  const handleFocusIn = React.useCallback((event) => {
    const focusCameFrom = event.relatedTarget;
    setTimeout(() => {
      if (!focusCameFrom) return;
      if (autoTriggerRef.current) return;
      autoTriggerRef.current = focusCameFrom;
    }, 0);
    if (lastUserInteractionRef.current === 'mouse') return;
    Promise.resolve().then(() => {
      if (!trapRef.current) return;
      if (focusInside([trapRef.current, ...focusLockUsers])) return;

      moveFocusInside(trapRef.current, event.target);
    });
  }, []);
  const handleMouseEvent = React.useCallback(() => {
    lastUserInteractionRef.current = 'mouse';
  }, []);
  const handleKeyboardEvent = React.useCallback(() => {
    lastUserInteractionRef.current = 'keyboard';
  }, []);
  const returnFocus = React.useCallback(() => {
    const trapNode = trapRef.current!;
    if (!focusInside(trapNode)) return;
    if (typeof returnFocusTo === 'object' && returnFocusTo?.current) {
      const returnFocusNode = returnFocusTo?.current;
      setTimeout(() => moveFocusInside(returnFocusNode, trapNode), 0);
    }
    if (returnFocusTo === 'auto' && autoTriggerRef.current) {
      const autoTrigger = autoTriggerRef.current;
      setTimeout(() => moveFocusInside(autoTrigger, trapNode), 0);
    }
  }, [returnFocusTo]);
  React.useEffect(() => {
    if (typeof trapRef !== 'object' || trapRef === null) return;
    const node = trapRef.current;
    if (!node) return;
    focusLockUsers.add(node);
    return () => {
      if (!node) return;
      focusLockUsers.delete(node);
    };
  }, [trapRef]);
  React.useEffect(() => {
    if (disabled) return;
    if (!canUseDOM()) return;
    if (!trapRef.current) return;
    const focusableChildren = Array.from(trapRef.current.children).flatMap(getFocusableIn);
    if (focusableChildren.length === 0) return;

    document.body.addEventListener('focusin', handleFocusIn);
    document.body.addEventListener('mousedown', handleMouseEvent);
    document.body.addEventListener('touchstart', handleMouseEvent);
    document.body.addEventListener('keydown', handleKeyboardEvent);

    if (autoFocus)
      moveFocusInside(
        trapRef.current,
        typeof returnFocusTo === 'object' ? returnFocusTo?.current! : document.body,
      );

    return () => {
      document.body.removeEventListener('focusin', handleFocusIn);
      document.body.removeEventListener('mousedown', handleMouseEvent);
      document.body.removeEventListener('touchstart', handleMouseEvent);
      document.body.removeEventListener('keydown', handleKeyboardEvent);
      returnFocus();
      autoTriggerRef.current = null;
    };
  }, [disabled, autoFocus, returnFocusTo, returnFocus]);
};

export const isFocusInside = focusInside;
export const setFocus = moveFocusInside as (topNode: HTMLElement, lastNode?: Element) => void;
