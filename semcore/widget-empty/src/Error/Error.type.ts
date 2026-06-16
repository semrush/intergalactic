import type { Intergalactic } from '@semcore/core';
import type { WithI18nEnhanceProps } from '@semcore/core/lib/utils/enhances/i18nEnhance';

import type { NSWidgetEmpty } from '../WidgetEmpty.type';
import type { LocalizedMessages } from './translations/__intergalactic-dynamic-locales';

declare namespace NSWidgetEmptyError {
    type Props = NSWidgetEmpty.Props &
      WithI18nEnhanceProps & {
        /** Error description. If it is absent, use the local default one */
        description?: React.ReactNode;
      };
    type DefaultProps = {
      i18n: LocalizedMessages;
      locale: 'en';
    };

    type Component = Intergalactic.Component<'div', Props>;
}

/** @deprecated It will be removed in v18. */
export type WidgetErrorProps = NSWidgetEmptyError.Props;

export type { NSWidgetEmptyError };
