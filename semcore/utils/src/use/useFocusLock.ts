import canUseDOM from '../canUseDOM';
import moveFocusInside, { focusInside, getFocusableIn } from 'focus-lock';
import LocalReact from 'react';

/** "safe" focus movement means that function wrapper tries
 * to detect focus war (when two focus locks are trying to
 * control focus recursively) and disables it for 10 seconds
 */
let focusMoveRequests: number[] = [];
let focusMoveDisabledUntil = 0;
let lastUserAction = 0;
const safeMoveFocusInside: typeof moveFocusInside = (...args) => {
  if (focusMoveDisabledUntil > Date.now()) return;
  focusMoveRequests.push(Date.now());
  if (focusMoveRequests.length > 10 && Date.now() - lastUserAction > 600) {
    const lastFocusMoveRequests = focusMoveRequests.slice(-10);
    const timeBetweenFocusMoveRequests = lastFocusMoveRequests
      .slice(1)
      .map((time, index) => Math.abs(time - lastFocusMoveRequests[index]));
    if (timeBetweenFocusMoveRequests.every((time) => time < 250)) {
      focusMoveDisabledUntil = Date.now() + 10000;
      focusMoveRequests = [];
      console.error(
        '[useFocusLock] Probably the focus war was detected. It is a process when multiple browser focus control subjects are reacting to "blur" event on their element and are trying to get it back. Focus move function was disabled for 10 seconds. Probably your page has different focus lock systems. If you have multiple versions of Intergalactic components, updated them to the latest version (at least to 15.16.3).',
      );
      return;
    }
  }
  if (focusMoveRequests.length > 500) focusMoveRequests = focusMoveRequests.slice(-10);

  return moveFocusInside(...args);
};
if (canUseDOM()) {
  document.addEventListener('keydown', () => {
    lastUserAction = Date.now();
  });
  document.addEventListener('mousedown', () => {
    lastUserAction = Date.now();
  });
}

const focusBordersConsumers = new Set();
const focusBordersRefs: {
  before: HTMLElement | null;
  after: HTMLElement | null;
} = { before: null, after: null };

const addBorders = () => {
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
};
const removeBorders = () => {
  focusBordersRefs.before?.remove();
  focusBordersRefs.after?.remove();
  focusBordersRefs.before = null;
  focusBordersRefs.after = null;
};
const areBordersPlacedCorrectly = () => {
  if (!focusBordersRefs.before || !focusBordersRefs.after) return true;
  if (document.body.children[0] !== focusBordersRefs.before) return false;
  if (document.body.children[document.body.children.length - 1] !== focusBordersRefs.after)
    return false;
  return true;
};

type ReactT = typeof LocalReact;

let uniqueId = 0;
const getUniqueId = (prefix: string) =>
  `${prefix}-${Math.random().toString(36).slice(2)}-${uniqueId++}`;
const useFocusBorders = (React: ReactT, disabled?: boolean) => {
  useUniqueIdHookMock(React);
  React.useEffect(() => {
    const id = getUniqueId('focus-borders-consumer');
    if (!disabled) {
      focusBordersConsumers.add(id);
    }

    if (!areBordersPlacedCorrectly()) removeBorders();
    if (focusBordersConsumers.size > 0) addBorders();

    return () => {
      focusBordersConsumers.delete(id);
      if (focusBordersConsumers.size === 0) removeBorders();
    };
  }, [disabled]);
};
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

  const handleFocusIn = React.useCallback(
    (event: Event & { relatedTarget?: HTMLElement; target?: HTMLElement }) => {
      const focusCameFrom = event.relatedTarget;
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
        if (focusInside(trapNodes)) return;

        if (focusCameFrom) {
          safeMoveFocusInside(trapRef.current, focusCameFrom);
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
    if (!focusInside(trapNode)) return;
    if (typeof returnFocusTo === 'object' && returnFocusTo?.current) {
      const returnFocusNode = returnFocusTo?.current;
      setTimeout(() => safeMoveFocusInside(returnFocusNode, trapNode), 0);
    }
    if (returnFocusTo === 'auto' && autoTriggerRef.current) {
      const autoTrigger = autoTriggerRef.current;
      setTimeout(() => safeMoveFocusInside(autoTrigger, trapNode), 0);
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
  }, []);
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

    document.body.addEventListener('focusin', handleFocusIn as any);
    document.body.addEventListener('mousedown', handleMouseEvent);
    document.body.addEventListener('touchstart', handleMouseEvent);
    document.body.addEventListener('keydown', handleKeyboardEvent);

    if (autoFocus)
      safeMoveFocusInside(
        trapRef.current,
        typeof returnFocusTo === 'object' ? returnFocusTo?.current! : document.body,
      );

    return () => {
      document.body.removeEventListener('focusin', handleFocusIn as any);
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
export const isFocusInside = focusInside;
export const setFocus = safeMoveFocusInside as (topNode: HTMLElement, lastNode?: Element) => void;
