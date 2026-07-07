import type { BoxProps } from '@semcore/base-components';
import type { PropGetterFn, Intergalactic } from '@semcore/core';
import type { NSText } from '@semcore/typography';

import type { LocalizedMessages } from './translations/__intergalactic-dynamic-locales';

declare namespace NSBreadcrumbs {
  type Props = BoxProps & {
    /**
     * Links divider
     * */
    separator?: React.ReactNode;
    /** Specifies the locale for i18n support */
    locale?: string;
  };
  type DefaultProps = {
    separator: React.JSX.Element;
    i18n: LocalizedMessages;
    locale: 'en';
  };
  type Ctx = {
    getItemProps: PropGetterFn;
  };

  namespace Item {
    type Props = BoxProps & {
      /** The property is responsible for the activity of the element */
      active?: boolean;
      /** Specifies the locale for i18n support */
      locale?: string;
      /**
       * Ellipsis settings. You shouldn't use `cropPosition: middle` for breadcrumbs.
       * If you're sure you need `cropPosition: middle`, set `w` to Breadcrumbs.Item manually, for correct Ellipsis calculations.
       * @default false
       */
    } & NSText.HintProps & NSText.EllipsisProps;

    type Component = Intergalactic.Component<'a', Props>;
  }

  type Component = Intergalactic.Component<'div', Props, Ctx> & {
    Item: Item.Component;
  };
}

/** @deprecated It will be removed in v18. */
export type BreadcrumbsProps = NSBreadcrumbs.Props;
/** @deprecated It will be removed in v18. */
export type BreadcrumbsItemProps = NSBreadcrumbs.Item.Props;
/** @deprecated It will be removed in v18. */
export type BreadcrumbsContext = NSBreadcrumbs.Ctx;

export type { NSBreadcrumbs };
