import React, { ComponentProps } from 'react';
import { CProps, PropGetterFn, ReturnEl } from '@semcore/core';
import { IBoxProps } from '@semcore/flex-box';
import Input, { IInputProps } from '@semcore/input';
import { ITextProps } from '@semcore/typography';
import Button from '@semcore/button';
import { IWithI18nEnhanceProps } from '@semcore/utils/lib/enhances/i18nEnhance';

export interface IPaginationProps extends IBoxProps, IWithI18nEnhanceProps {
  /**
   * Total number of pages
   * @default 1
   */
  totalPages?: number;
  /**
   * Function of formatting the value totalPages
   * @default formatThousands - inserts a comma every 3 characters
   * @deprecated  v2.0.0 The property "totalPagesFormatter" is outdated, use the component "<Pagination.TotalPages/>"
   */
  totalPagesFormatter?: (totalPages: number) => string | number;
  /**
   * Active page number
   * @default 1
   */
  currentPage?: number;
  /**
   * Callback for changing the active page
   * @param pageNumber
   * @deprecated v2.0.0 {@link IPaginationProps.onCurrentPageChange}
   */
  onPageChange?: (pageNumber: number) => void;
  /**
   * Callback for changing the active page
   * @param pageNumber
   */
  onCurrentPageChange?: (pageNumber: number) => void;
}

export interface ITotalPagesProps extends ITextProps, IWithI18nEnhanceProps {
  /**
   * @deprecated v2.0.0 Use i118n, in order to redefine the text
   * */
  label?: React.ReactNode;
}

export interface IPageInputProps extends IInputProps, IWithI18nEnhanceProps {
  /**
   * @deprecated v2.0.0 Use i118n, in order to redefine the text
   * */
  label?: React.ReactNode;
}

export interface IPaginationContext {
  getFirstPageProps: PropGetterFn;
  getPrevPageProps: PropGetterFn;
  getNextPageProps: PropGetterFn;
  getPageInputProps: PropGetterFn;
  getTotalPagesProps: PropGetterFn;
}

export interface IPaginationHandlers {
  totalPages: (value: number) => void;
  currentPage: (value: number) => void;
}

declare const Pagination: (<T>(
  props: CProps<IPaginationProps & T, IPaginationContext, IPaginationHandlers>,
) => ReturnEl) & {
  PrevPage: <T>(props: ComponentProps<typeof Button>) => ReturnEl;
  NextPage: <T>(props: ComponentProps<typeof Button>) => ReturnEl;
  FirstPage: <T>(props: ComponentProps<typeof Button>) => ReturnEl;
  TotalPages: <T>(props: CProps<ITotalPagesProps, {}, IPaginationHandlers>) => ReturnEl;
  PageInput: (<T>(props: CProps<IPageInputProps & T, {}, IPaginationHandlers>) => ReturnEl) & {
    Value: typeof Input.Value;
    Addon: typeof Input.Addon;
  };
};

export default Pagination;
