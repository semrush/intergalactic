import type { Intergalactic } from '@semcore/core';
import type { WithI18nEnhanceProps } from '@semcore/core/lib/utils/enhances/i18nEnhance';

import type { ErrorsProps } from '../Error.type';

export type PageErrorProps = WithI18nEnhanceProps & {
  /**
   * Page reloading button click handler
   * @default () => { if (canUseDOM()) { location.reload(); } }
   */
  onClick?: (e: React.MouseEvent) => void;
  /**
   * HTML tag of the error title
   * @default h2
   */
  titleTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'p';
};

export type PageErrorComponent = Intergalactic.Component<'div', PageErrorProps & ErrorsProps>;
