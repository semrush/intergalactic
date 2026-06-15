import type { BoxProps } from '@semcore/base-components';
import type Button from '@semcore/button';
import type { PropGetterFn, Intergalactic } from '@semcore/core';
import type { WithI18nEnhanceProps } from '@semcore/core/lib/utils/enhances/i18nEnhance';
import type { InputProps } from '@semcore/input';
import type Input from '@semcore/input';
import type { NSText } from '@semcore/typography';

import type { LocalizedMessages } from './translations/__intergalactic-dynamic-locales';

declare namespace NSPagination {
  type Props = BoxProps &
    WithI18nEnhanceProps & {
      /**
       * Total number of pages
       * @default 1
       */
      totalPages?: number;
      /**
       * Active page number
       * @default 1
       */
      currentPage?: number;
      /**
       * Callback for changing the active page
       * @param pageNumber
       */
      onCurrentPageChange?: (pageNumber: number) => void;
      /** Specifies the locale for i18n support */
      locale?: string;
      /**
       * Sizes for pagination panel
       * @default 'm'
       */
      size?: 'm' | 'l';
    };
  type DefaultProps = {
    defaultCurrentPage: 1;
    defaultTotalPages: 1;
    i18n: LocalizedMessages;
    locale: 'en';
    size: 'm';
  };
  type Ctx = {
    getFirstPageProps: PropGetterFn;
    getPrevPageProps: PropGetterFn;
    getNextPageProps: PropGetterFn;
    getPageInputProps: PropGetterFn;
    getTotalPagesProps: PropGetterFn;
  };
  type Handlers = {
    totalPages: null;
    currentPage: null;
  };

  namespace PrevPage {
    type Component = typeof Button;
  }

  namespace NextPage {
    type Component = typeof Button;
  }

  namespace FirstPage {
    type Component = typeof Button;
  }

  namespace TotalPages {
    type Props = NSText.Props & WithI18nEnhanceProps;

    type Component = Intergalactic.Component<'button', Props, {}, [handlers: Handlers]>;
  }

  namespace PageInput {
    type Props = InputProps & WithI18nEnhanceProps;

    namespace Value {
        type Component = typeof Input.Value;
    }

    namespace Addon {
        type Component = typeof Input.Addon;
    }

    type Component = Intergalactic.Component<'div', Props, {}, [handlers: Handlers]> & {
      Value: Value.Component;
      Addon: Addon.Component;
    };
  }

  type Component = Intergalactic.Component<'div', Props, Ctx, [handlers: Handlers]> & {
    PrevPage: PrevPage.Component;
    NextPage: NextPage.Component;
    FirstPage: FirstPage.Component;
    TotalPages: TotalPages.Component;
    PageInput: PageInput.Component;
  };
}

/** @deprecated It will be removed in v18. */
export type PaginationProps = NSPagination.Props;
/** @deprecated It will be removed in v18. */
export type TotalPagesProps = NSPagination.TotalPages.Props;
/** @deprecated It will be removed in v18. */
export type PageInputProps = NSPagination.PageInput.Props;
/** @deprecated It will be removed in v18. */
export type PaginationContext = NSPagination.Ctx;
/** @deprecated It will be removed in v18. */
export type PaginationHandlers = NSPagination.Handlers;

export type { NSPagination };
