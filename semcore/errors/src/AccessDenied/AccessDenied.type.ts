import type { Intergalactic } from '@semcore/core';
import type { WithI18nEnhanceProps } from '@semcore/core/lib/utils/enhances/i18nEnhance';

import type { ErrorsProps } from '../Error.type';

export type AccessDeniedProps = WithI18nEnhanceProps & {
  /**
   * href of the home link
   * @default /
   */
  homeLink?: string;
  /**
   * HTML tag of the error title
   * @default h2
   */
  titleTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'p';
};

export type AccessDeniedComponent = Intergalactic.Component<'div', AccessDeniedProps & ErrorsProps>;
