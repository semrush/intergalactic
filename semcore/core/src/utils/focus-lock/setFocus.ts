import canUseDOM from '../canUseDOM';
import { getFocusableIn } from './getFocusableIn';

const unsafeSetFocus = (
  node: HTMLElement,
  previousActiveElement?: HTMLElement | null,
  actualActiveElement?: HTMLElement,
  focusOptions: FocusOptions = {},
) => {
  const activeElement = actualActiveElement || document.activeElement;

  const focusable = getFocusableIn(node);

  let target = focusable[0];

  if (
    activeElement &&
    previousActiveElement &&
    previousActiveElement.compareDocumentPosition(activeElement) &
      Node.DOCUMENT_POSITION_PRECEDING &&
    !(
      previousActiveElement.compareDocumentPosition(activeElement) & Node.DOCUMENT_POSITION_CONTAINS
    )
  ) {
    target = focusable[focusable.length - 1];
  }

  target?.focus(focusOptions);
};

/** "safe" focus movement means that function wrapper tries
 * to detect focus war (when two focus locks are trying to
 * control focus recursively) and disables it for 10 seconds
 */
let focusMoveRequests: number[] = [];
let focusMoveDisabledUntil = 0;
let lastUserAction = 0;
const safeSetFocus: typeof unsafeSetFocus = (...args) => {
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

  return unsafeSetFocus(...args);
};
if (canUseDOM()) {
  document.addEventListener(
    'keydown',
    (event) => {
      lastUserAction = Date.now();
    },
    { capture: true },
  );
  document.addEventListener(
    'mousedown',
    () => {
      lastUserAction = Date.now();
    },
    { capture: true },
  );
}

export const setFocus = safeSetFocus;
