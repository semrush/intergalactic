import type { Intergalactic } from '@semcore/core';
import { createComponent, sstyled, Root } from '@semcore/core';
import React from 'react';

import style from './screenReaderOnlyBox.shadow.css';
import type { NSScreenReaderOnly } from './ScreenReaderOnlyBox.type';
import Box from '../Box/Box';

function ScreenReaderOnlyComponent(props: Intergalactic.InternalTypings.InferComponentProps<NSScreenReaderOnly.Component>) {
  const SScreenReaderOnly = Root;
  // have to cast it to component's props since children type is mixed with `Component`'s types.
  const { ariaLive, children } = props as NSScreenReaderOnly.Props;
  const [content, setContent] = React.useState(ariaLive ? null : children);

  React.useEffect(() => {
    if (!ariaLive) {
      setContent(children);
      return;
    }

    const timer = setTimeout(() => {
      setContent(children);
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [children]);

  return sstyled(style)(
    <SScreenReaderOnly
      render={Box}
      tag='span'
      aria-live={ariaLive ? 'polite' : undefined}
      role={ariaLive ? 'status' : undefined}
    >
      {content}
    </SScreenReaderOnly>,
  );
};

export const ScreenReaderOnly = createComponent<
  NSScreenReaderOnly.Component,
  typeof ScreenReaderOnlyComponent
>(ScreenReaderOnlyComponent);

export default ScreenReaderOnly;
