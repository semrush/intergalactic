import React from 'react';
import canUseDOM from '../canUseDOM';
import { getRef } from '../ref';

const useEventListener = (
  elementOrRef: any,
  eventName: any,
  handler: any,
  options: any = undefined,
) => {
  const savedHandler = React.useRef<(event: any) => {}>();

  React.useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  React.useEffect(() => {
    if (!canUseDOM()) return;

    const eventListener = (event: any) => savedHandler.current?.(event);
    const node = getRef(elementOrRef);
    if (!(node instanceof Element)) return;
    node.addEventListener(eventName, eventListener, options);
    return () => {
      node.removeEventListener(eventName, eventListener, options);
    };
  }, [eventName, elementOrRef]);
};

export default useEventListener;
