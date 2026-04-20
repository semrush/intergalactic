import type { Intergalactic } from '@semcore/core';
import type { WithI18nEnhanceProps } from '@semcore/core/lib/utils/enhances/i18nEnhance';

import type { NSError } from '../Error.type';

declare namespace NSPageNotFound {
  type Props = WithI18nEnhanceProps & {
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

  type Component = Intergalactic.Component<'div', Props & NSError.Props>;
}

/** @deprecated It will be removed in v18. */
export type PageNotFoundProps = NSPageNotFound.Props;

export type { NSPageNotFound };
