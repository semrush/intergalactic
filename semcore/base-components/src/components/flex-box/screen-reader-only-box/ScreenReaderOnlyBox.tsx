import { createComponent, sstyled, Root, type Intergalactic } from '@semcore/core';
import React from 'react';

import style from './screenReaderOnlyBox.shadow.css';
import Box from '../Box';

type SROnlyType = {
  ariaLive?: boolean;
  children?: React.ReactNode;
};

function ScreenReaderOnlyComponent(props: SROnlyType) {
  const SScreenReaderOnly = Root;
  const { ariaLive, children } = props;
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
      role={ariaLive ? 'statue' : undefined}
    >
      {content}
    </SScreenReaderOnly>,
  );
};

type ScreenReaderOnlyType = Intergalactic.Component<'span', SROnlyType>;

export const ScreenReaderOnly = createComponent<
  ScreenReaderOnlyType,
  typeof ScreenReaderOnlyComponent
>(ScreenReaderOnlyComponent);

export default ScreenReaderOnly;
