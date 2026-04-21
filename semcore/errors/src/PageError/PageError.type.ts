import type { Intergalactic } from '@semcore/core';
import type { WithI18nEnhanceProps } from '@semcore/core/lib/utils/enhances/i18nEnhance';

import type { NSErrors } from '../Error.type';

declare namespace NSPageError {
  type Props = WithI18nEnhanceProps & {
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

  type Component = Intergalactic.Component<'div', Props & NSErrors.Props>;
}

/** @deprecated It will be removed in v18. */
export type PageErrorProps = NSPageError.Props;

export type { NSPageError };
