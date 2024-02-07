import canUseDOM from '../canUseDOM';
import LocalReact from 'react';

import { isFocusInside } from '../focus-lock/isFocusInside';
import { setFocus } from '../focus-lock/setFocus';
import { getFocusableIn } from '../focus-lock/getFocusableIn';
import {
  addFocusBorders,
  removeFocusBorders,
  areFocusBordersPlacedCorrectly,
} from '../focus-lock/focusBorders';

export { isFocusInside, setFocus };

const focusBordersConsumers = new Set();

const useFocusBorders = (React: ReactT, disabled?: boolean) => {
  useUniqueIdHookMock(React);
  React.useEffect(() => {
    const id = getUniqueId('focus-borders-consumer');
    if (!disabled) {
      focusBordersConsumers.add(id);
    }

    if (!areFocusBordersPlacedCorrectly()) removeFocusBorders();
    if (focusBordersConsumers.size > 0) addFocusBorders();

    return () => {
      focusBordersConsumers.delete(id);
      if (focusBordersConsumers.size === 0) removeFocusBorders();
    };
  }, [disabled]);
};

type ReactT = typeof LocalReact;

let uniqueId = 0;
const getUniqueId = (prefix: string) =>
  `${prefix}-${Math.random().toString(36).slice(2)}-${uniqueId++}`;

/**
 * # Focus lock hook merging
 * In some cases same page might contain different versions of components.
 * In such cases, we need to ensure that only one version of focus lock hook is used.
 * So, it's why we have `useFocusLockHook` function that is wrapped into `useFocusLock`.
 *
 * While evaluating this file code, we check if global focus lock hook is already defined.
 * If it's defined, we replace it ONLY if our version is higher and no components currently use it.
 * The last condition is very important because we are unable to replace React hook without reimplementing
 * React hooks lifecycle in some kind of wrapper.
 *
 * ## Versioning
 * Such versions merging requires us to keep hook api backward compatible.
 * When hook logic changes, the variable `focusLockVersion` should be incremented.
 *
 * Version update `1 -> 2`. Fixed call `safeMoveFocusInside` in `handleFocusIn` with correct second parameter (focusCameFrom instead of event.target)
 * Version update `2 -> 3`. Fixed React version isolation in nested hooks (`useFocusBorders`, `useUniqueId`).
 *
 * Initially (for a several versions) key was `__intergalactic_focus_lock_hook_`.
 * Making it respect react version required to change key. So key was changed to `__intergalactic_focus_lock_hook_react_v_respectful`.
 *
 * ## React hooks order
 * When updating from version 2 to version 3 `useUniqueId` hook was removed.
 * Due to replacing useFocusLock hook in runtime, the order of hooks must be preserved.
 * So, useUniqueIdHookMock helps to preserve hooks order when hook is being replaced from version 2 to version 3.
 *
 * If new update requires to remove some hooks – add mocks instead of them.
 * If new update requires to add some hooks and no workaround with current hooks list is possible – probably focus lock hook key should be changed.
 */
const focusLockVersion = 3;
const globalFocusLockHookKey = '__intergalactic_focus_lock_hook_react_v_respectful';

const focusLockAllTraps = new Set<HTMLElement>();
const focusLockUsedInMountedComponents = new Set<string>();
/** Focus master is a special mode in which focus lock might work.
 * Normally, focus lock hook allows user focus to move freely between
 * all active focus traps. When component provides `focusMaster=true`
 * parameter, it says that it doesn't want to share focus with other traps.
 * It is very useful for a big components like modals or side-bars that
 * also have some visual backdrop.
 * The last element in focus masters stack is considered as a current focus master.
 */
const focusMastersStack: HTMLElement[] = [];

const noop = () => {};
const useUniqueIdHookMock = (React: ReactT) => {
  React.useState(undefined);
  const useEnhancedEffect = canUseDOM() ? React.useLayoutEffect : React.useEffect;
  useEnhancedEffect(noop, []);
};

const useFocusLockHook = (
  React: ReactT,
  trapRef: React.RefObject<HTMLElement>,
  autoFocus: boolean,
  returnFocusTo: React.RefObject<HTMLElement> | null | 'auto',
  disabled = false,
  focusMaster = false,
) => {
  useFocusBorders(React, disabled);

  const autoTriggerRef = React.useRef<HTMLElement | null>(null);
  const lastUserInteractionRef = React.useRef<'mouse' | 'keyboard' | undefined>(undefined);

  const handleFocusOut = React.useCallback(
    (event: Event & { relatedTarget?: HTMLElement; target?: HTMLElement }) => {
      const focusCameFrom = event.target;
      const focusMovedTo = event.relatedTarget;

      setTimeout(() => {
        if (!focusCameFrom) return;
        if (autoTriggerRef.current) return;
        autoTriggerRef.current = focusCameFrom;
      }, 0);
      if (lastUserInteractionRef.current === 'mouse') return;
      Promise.resolve().then(() => {
        if (!trapRef.current) return;
        const currentFocusMaster = focusMastersStack[focusMastersStack.length - 1];
        if (currentFocusMaster && currentFocusMaster !== trapRef.current) return;
        const trapNodes = currentFocusMaster
          ? [trapRef.current]
          : [trapRef.current, ...focusLockAllTraps];
        if (isFocusInside(trapNodes, focusMovedTo)) return;

        if (focusCameFrom) {
          setFocus(trapRef.current, focusCameFrom, focusMovedTo);
        }
      });
    },
    [],
  );
  const handleMouseEvent = React.useCallback(() => {
    lastUserInteractionRef.current = 'mouse';
  }, []);
  const handleKeyboardEvent = React.useCallback(() => {
    lastUserInteractionRef.current = 'keyboard';
  }, []);
  const returnFocus = React.useCallback(() => {
    const trapNode = trapRef.current!;
    if (!isFocusInside(trapNode)) return;
    if (typeof returnFocusTo === 'object' && returnFocusTo?.current) {
      const returnFocusNode = returnFocusTo?.current;
      setTimeout(() => setFocus(returnFocusNode, trapNode), 0);
    }
    if (returnFocusTo === 'auto' && autoTriggerRef.current) {
      const autoTrigger = autoTriggerRef.current;
      setTimeout(() => setFocus(autoTrigger, trapNode), 0);
    }
  }, [returnFocusTo]);
  React.useEffect(() => {
    if (typeof trapRef !== 'object' || trapRef === null) return;
    const node = trapRef.current;
    if (!node) return;
    focusLockAllTraps.add(node);
    return () => {
      if (!node) return;
      focusLockAllTraps.delete(node);
    };
  }, [disabled]);
  React.useEffect(() => {
    if (typeof trapRef !== 'object' || trapRef === null) return;
    if (disabled) return;
    if (!canUseDOM()) return;
    if (!trapRef.current) return;

    if (focusMaster) {
      focusMastersStack.push(trapRef.current);
    }

    return () => {
      if (!focusMaster) return;
      if (focusMastersStack[focusMastersStack.length - 1] === trapRef.current) {
        focusMastersStack.pop();
      } else {
        focusMastersStack.splice(focusMastersStack.indexOf(trapRef.current!), 1);
      }
    };
  }, [disabled, focusMaster]);
  React.useEffect(() => {
    if (disabled) return;
    if (!canUseDOM()) return;
    if (!trapRef.current) return;
    const focusableChildren = Array.from(trapRef.current.children).flatMap((node) =>
      getFocusableIn(node as HTMLElement),
    );
    if (focusableChildren.length === 0) return;

    document.body.addEventListener('focusout', handleFocusOut as any);
    document.body.addEventListener('mousedown', handleMouseEvent);
    document.body.addEventListener('touchstart', handleMouseEvent);
    document.body.addEventListener('keydown', handleKeyboardEvent);

    if (autoFocus)
      setFocus(
        trapRef.current,
        typeof returnFocusTo === 'object' ? returnFocusTo?.current! : document.body,
      );

    return () => {
      document.body.removeEventListener('focusout', handleFocusOut as any);
      document.body.removeEventListener('mousedown', handleMouseEvent);
      document.body.removeEventListener('touchstart', handleMouseEvent);
      document.body.removeEventListener('keydown', handleKeyboardEvent);
      returnFocus();
      autoTriggerRef.current = null;
    };
  }, [disabled, autoFocus, returnFocusTo, returnFocus]);

  useUniqueIdHookMock(React);
  React.useEffect(() => {
    const id = getUniqueId('focus-lock-consumer');
    if (disabled) return;
    focusLockUsedInMountedComponents.add(id);
    return () => {
      focusLockUsedInMountedComponents.delete(id);
    };
  }, [disabled]);
};
const establishHookAsGlobal = () => {
  (globalThis as any)[globalFocusLockHookKey] = {
    hook: useFocusLockHook,
    version: focusLockVersion,
    usedInComponents: focusLockUsedInMountedComponents,
  };
};
if (!(globalThis as any)[globalFocusLockHookKey]) {
  establishHookAsGlobal();
} else if (typeof (globalThis as any)[globalFocusLockHookKey].version !== 'number') {
  establishHookAsGlobal();
} else {
  const { version: theirVersion, usedInComponents } = (globalThis as any)[globalFocusLockHookKey];
  if (focusLockVersion > theirVersion && usedInComponents.size === 0) {
    establishHookAsGlobal();
  }
}

export const useFocusLock = (
  trapRef: React.RefObject<HTMLElement>,
  autoFocus: boolean,
  returnFocusTo: React.RefObject<HTMLElement> | null | 'auto',
  disabled = false,
  focusMaster = false,
) => {
  const hook = (globalThis as any)[globalFocusLockHookKey]?.hook ?? useFocusLockHook;
  return hook(LocalReact, trapRef, autoFocus, returnFocusTo, disabled, focusMaster);
};

export const hasFocusableIn = (element: HTMLElement): boolean => {
  return (
    Array.from(element.children).flatMap((node) => getFocusableIn(node as HTMLElement)).length > 0
  );
};
