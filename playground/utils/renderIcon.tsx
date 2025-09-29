import type { ButtonProps } from '@semcore/ui/button';
import ArrowRightL from '@semcore/ui/icon/ArrowRight/l';
import ArrowRightM from '@semcore/ui/icon/ArrowRight/m';
import CheckL from '@semcore/ui/icon/Check/l';
import CheckM from '@semcore/ui/icon/Check/m';
import type { TextProps } from '@semcore/ui/typography';
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
    before: <CheckL />,
    after: <ArrowRightL />,
  },
};

const renderIcon = (position: 'before' | 'after', size: TextProps['size'] | ButtonProps['size']) => {
  if (!size) return null;

  return SizeToIconMap[size][position] ?? null;
};

export default renderIcon;
