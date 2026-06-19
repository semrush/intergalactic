import type { BoxProps } from '@semcore/base-components';
import type Button from '@semcore/button';
import type { PropGetterFn, Intergalactic } from '@semcore/core';
import type { WithI18nEnhanceProps } from '@semcore/core/lib/utils/enhances/i18nEnhance';
import type { NSInput } from '@semcore/input';
import type Input from '@semcore/input';
import type { NSText } from '@semcore/typography';

export type PaginationProps = BoxProps &
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

export type TotalPagesProps = NSText.Props & WithI18nEnhanceProps & {};

export type PageInputProps = NSInput.Props & WithI18nEnhanceProps & {};

export type PaginationContext = {
  getFirstPageProps: PropGetterFn;
  getPrevPageProps: PropGetterFn;
  getNextPageProps: PropGetterFn;
  getPageInputProps: PropGetterFn;
  getTotalPagesProps: PropGetterFn;
};

export type PaginationHandlers = {
  totalPages: (value: number) => void;
  currentPage: (value: number) => void;
};

declare const Pagination: Intergalactic.Component<
  'div',
  PaginationProps,
  PaginationContext,
  [handlers: PaginationHandlers]
> & {
  PrevPage: typeof Button;
  NextPage: typeof Button;
  FirstPage: typeof Button;
  TotalPages: Intergalactic.Component<
    'button',
    TotalPagesProps,
    {},
    [handlers: PaginationHandlers]
  >;
  PageInput: Intergalactic.Component<'div', PageInputProps, {}, [handlers: PaginationHandlers]> & {
    Value: typeof Input.Value;
    Addon: typeof Input.Addon;
  };
};

export default Pagination;
