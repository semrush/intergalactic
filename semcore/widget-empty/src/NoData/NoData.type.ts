import type { Intergalactic } from '@semcore/core';
import type { WithI18nEnhanceProps } from '@semcore/core/lib/utils/enhances/i18nEnhance';
import type { TIllustrationNamesWidgetEmpty } from '@semcore/illustration';

import type { NSWidgetEmpty } from '../WidgetEmpty.type';
import type { LocalizedMessages } from './translations/__intergalactic-dynamic-locales';

declare namespace NSWidgetEmptyNoData {
    type Props = NSWidgetEmpty.Props & WithI18nEnhanceProps & {
      /** Error description. If it is absent, use the local default one */
      description?: React.ReactNode;
      /** Data types */
      type?: TIllustrationNamesWidgetEmpty;
    };
    type DefaultProps = {
      i18n: LocalizedMessages;
      locale: 'en';
      type: 'other-data';
    };

    type Component = Intergalactic.Component<'div', Props>;
}

/** @deprecated It will be removed in v18. */
export type WidgetNoDataProps = NSWidgetEmptyNoData.Props;

export type { NSWidgetEmptyNoData };
