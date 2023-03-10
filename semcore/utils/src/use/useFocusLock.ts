import canUseDOM from '../canUseDOM';
import { useUID } from '../uniqueID';
import moveFocusInside, { focusInside, getFocusableIn } from 'focus-lock';
import React from 'react';

const focusBordersConsumers = new Set();
const focusBordersRefs = { before: null, after: null } as {
  // eslint-disable-next-line ssr-friendly/no-dom-globals-in-module-scope
  before: null | HTMLElement;
  // eslint-disable-next-line ssr-friendly/no-dom-globals-in-module-scope
  after: null | HTMLElement;
};
const useFocusBorders = (disabled) => {
  const id = useUID('focus-borders-consumer');
  const addBorders = React.useCallback(() => {
    if (!focusBordersRefs.before) {
      focusBordersRefs.before = document.createElement('div');
      focusBordersRefs.before.setAttribute('tabindex', '0');
      focusBordersRefs.before.style.position = 'absolute';
      focusBordersRefs.before.dataset.id = '__intergalactic-focus-border-before';
      document.body.prepend(focusBordersRefs.before);
    }
    if (!focusBordersRefs.after) {
      focusBordersRefs.after = document.createElement('div');
      focusBordersRefs.after.setAttribute('tabindex', '0');
      focusBordersRefs.after.dataset.id = '__intergalactic-focus-border-after';
      focusBordersRefs.after.style.position = 'absolute';
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
    if (event.relatedTarget && !autoTriggerRef.current)
      autoTriggerRef.current = event.relatedTarget;
    Promise.resolve().then(() => {
      if (!trapRef.current) return;
      if (focusInside(trapRef.current)) return;

      moveFocusInside(trapRef.current, event.target);
    });
  }, []);
  const handleMouseEvent = React.useCallback(() => (lastUserInteractionRef.current = 'mouse'), []);
  const handleKeyboardEvent = React.useCallback(
    () => (lastUserInteractionRef.current = 'keyboard'),
    [],
  );
  const returnFocus = React.useCallback(() => {
    if (lastUserInteractionRef.current === 'mouse') return;
    if (typeof returnFocusTo === 'object' && returnFocusTo?.current)
      moveFocusInside(returnFocusTo?.current, trapRef.current!);
    if (returnFocusTo === 'auto' && autoTriggerRef.current) {
      moveFocusInside(autoTriggerRef.current, trapRef.current!);
    }
  }, [returnFocusTo]);
  React.useEffect(() => {
    if (disabled) return;
    if (!canUseDOM()) return;
    if (!trapRef.current) return;
    if (getFocusableIn(trapRef.current).length === 0) return;

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
