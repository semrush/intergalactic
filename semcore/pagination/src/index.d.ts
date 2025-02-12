import { PropGetterFn, UnknownProperties, Intergalactic } from '@semcore/core';
import { BoxProps } from '@semcore/flex-box';
import Input, { InputProps } from '@semcore/input';
import { TextProps } from '@semcore/typography';
import Button from '@semcore/button';
import { WithI18nEnhanceProps } from '@semcore/core/lib/utils/enhances/i18nEnhance';

/** @deprecated */
export interface IPaginationProps extends PaginationProps, UnknownProperties {}
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
    locale?: string;
    /**
     * Sizes for pagination panel
     * @default 'm'
     */
    size?: 'm' | 'l';
  };

/** @deprecated */
export interface ITotalPagesProps extends TotalPagesProps, UnknownProperties {}
export type TotalPagesProps = TextProps & WithI18nEnhanceProps & {};

/** @deprecated */
export interface IPageInputProps extends PageInputProps, UnknownProperties {}
export type PageInputProps = InputProps & WithI18nEnhanceProps & {};

/** @deprecated */
export interface IPaginationContext extends PaginationContext, UnknownProperties {}
export type PaginationContext = {
  getFirstPageProps: PropGetterFn;
  getPrevPageProps: PropGetterFn;
  getNextPageProps: PropGetterFn;
  getPageInputProps: PropGetterFn;
  getTotalPagesProps: PropGetterFn;
};

/** @deprecated */
export interface IPaginationHandlers extends PaginationHandlers, UnknownProperties {}
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
  };
};

export default Pagination;
