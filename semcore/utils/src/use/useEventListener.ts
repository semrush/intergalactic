import { useEffect, useRef } from 'react';
import canUseDOM from '../canUseDOM';
import { getRef } from '../ref';

const useEventListener = (
  elementOrRef: any,
  eventName: any,
  handler: any,
  options: any = undefined,
) => {
  const savedHandler = useRef<(event: any) => {}>();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    if (!canUseDOM()) return;

    const eventListener = (event: any) => savedHandler.current?.(event);
    const node = getRef(elementOrRef);
    if (!node) return;
    node.addEventListener(eventName, eventListener, options);
    return () => {
      node.removeEventListener(eventName, eventListener, options);
    };
  }, [eventName, elementOrRef]);
};

export default useEventListener;
