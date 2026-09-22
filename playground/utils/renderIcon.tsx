import ArrowRightL from '@semcore/icon/ArrowRight/l';
import ArrowRightM from '@semcore/icon/ArrowRight/m';
import CheckL from '@semcore/icon/Check/l';
import CheckM from '@semcore/icon/Check/m';
import type { NSButton } from '@semcore/ui/button';
import type { NSText } from '@semcore/ui/typography';
import React from 'react';

const SizeToIconMap = {
  100: {
    before: <CheckM />,
    after: <ArrowRightM />,
  },
  200: {
    before: <CheckM />,
    after: <ArrowRightM />,
  },
  300: {
    before: <CheckM />,
    after: <ArrowRightM />,
  },
  350: {
    before: <CheckM />,
    after: <ArrowRightM />,
  },
  400: {
    before: <CheckM />,
    after: <ArrowRightM />,
  },
  500: {
    before: <CheckL />,
    after: <ArrowRightL />,
  },
  600: {
    before: <CheckL />,
    after: <ArrowRightL />,
  },
  700: {
    before: <CheckL />,
    after: <ArrowRightL />,
  },
  800: {
    before: <CheckL />,
    after: <ArrowRightL />,
  },
  m: {
    before: <CheckM />,
    after: <ArrowRightM />,
  },
  l: {
    before: <CheckM />,
    after: <ArrowRightM />,
  },
};

const renderIcon = (position: 'before' | 'after', size: NSText.Props['size'] | NSButton.Props['size']) => {
  if (!size) return null;

  return SizeToIconMap[size][position] ?? null;
};

export default renderIcon;
