import React, { ComponentProps, HTMLAttributes } from 'react';
import createComponent, {
  Component,
  IFunctionProps,
  Merge,
  PropGetter,
  styled,
} from '@semcore/core';
import { Box, IBoxProps } from '@semcore/flex-box';
import Input, { IInputProps, IInputValueProps } from '@semcore/input';
import Link from '@semcore/link';
import { ITextProps, Text } from '@semcore/typography';
import Button, { IButtonProps } from '@semcore/button';
import Return from '@semcore/icon/lib/ActionReturn/xs';
import ChevronDoubleLeftXS from '@semcore/icon/lib/ChevronDoubleLeft/xs';
import fire from '@semcore/utils/lib/fire';
import i18nEnhance, { IWithI18nEnhanceProps } from '@semcore/utils/lib/enhances/i18nEnhance';
import logger from '@semcore/utils/lib/logger';
import de from './translations/de.json';
import en from './translations/en.json';
import es from './translations/es.json';
import fr from './translations/fr.json';
import it from './translations/it.json';
import ja from './translations/ja.json';
import ru from './translations/ru.json';
import zh from './translations/zh.json';

import style from './style/pagination.shadow.css';

const KEY_ENTER = 13;

function formatThousands(value) {
  const main = String(value);
  const length = main.length;
  let output = '';
  let i = length - 1;

  while (i >= 0) {
    output = main.charAt(i) + output;
    if ((length - i) % 3 === 0 && i > 0) {
      output = `,${output}`;
    }
    i -= 1;
  }

  return output;
}

// export interface IPaginationI18n {
//   /**
//    * Button label to go to the previous page
//    */
//   prevPageLabel: string;
//   /**
//    * Button label to go to the next page
//    */
//   nextPageLabel: string;
//   /**
//    * Input label of the current page
//    */
//   pageInputLabel: string;
//   /**
//    * Total pages label
//    */
//   totalPagesLabel: string;
//   [key: string]: string;
// }

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

export interface IPaginationState {
  dirtyCurrentPage?: number;
}

export interface IPaginationContext extends IPaginationProps {
  getFirstPageProps: PropGetter<PaginationRoot['getFirstPageProps']>;
  getPrevPageProps: PropGetter<PaginationRoot['getPrevPageProps']>;
  getNextPageProps: PropGetter<PaginationRoot['getNextPageProps']>;
  getPageInputProps: PropGetter<PaginationRoot['getPageInputProps']>;
  getTotalPagesProps: PropGetter<PaginationRoot['getTotalPagesProps']>;
}

class PaginationRoot extends Component<IPaginationProps, IPaginationState> {
  static displayName = 'Pagination';

  static defaultProps = () => ({
    defaultCurrentPage: 1,
    defaultTotalPages: 1,
    children: (
      <>
        <Pagination.FirstPage />
        <Pagination.PrevPage />
        <Pagination.NextPage />
        <Pagination.PageInput />
        <Pagination.TotalPages />
      </>
    ),
    i18n: {
      de,
      en,
      es,
      fr,
      it,
      ja,
      ru,
      zh,
    },
  });
  static style = style;
  static enhance = [i18nEnhance()];

  state = {
    // Crutch, so as not to take out `dirtyCurrentPage` in props
    dirtyCurrentPage: undefined,
  };

  constructor(props) {
    super(props);
    logger.warn(
      !!props.onPageChange,
      'The property "onPageChange" is deprecated, use "onCurrentPageChange"',
      props['data-ui-name'],
    );
    logger.warn(
      !!props.totalPagesFormatter,
      'The "totalPagesFormatter" property is deprecated, use the "<Pagination.TotalPages/>" component',
      props['data-ui-name'],
    );
  }

  uncontrolledProps() {
    return {
      totalPages: null,
      currentPage: null,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentPage !== this.asProps.currentPage) {
      this.setState({ dirtyCurrentPage: undefined });
    }
  }

  handlePageChange = (currentPage) => {
    currentPage = Number(currentPage);
    if (Number.isNaN(currentPage)) {
      return;
    }

    this.handlers.currentPage(currentPage);
    this.setState({ dirtyCurrentPage: undefined }, () => {
      // deprecated
      fire(this, 'onPageChange', currentPage);
    });
  };

  handlePageValueChange = (value) => {
    const { dirtyCurrentPage } = this.state;
    if (Number.isNaN(Number(value))) {
      value = dirtyCurrentPage;
    }
    this.setState({ dirtyCurrentPage: value });
  };

  handlePageValueBlur = () => {
    const { currentPage } = this.asProps;
    this.setState({ dirtyCurrentPage: currentPage });
  };

  getDirtyCurrentPage = () => {
    const { dirtyCurrentPage } = this.state;
    const { totalPages } = this.asProps;
    const finalValue = dirtyCurrentPage > totalPages ? totalPages : dirtyCurrentPage;
    return finalValue <= 0 ? 1 : finalValue;
  };

  handlePageInputIconClick = () => {
    const dirtyCurrentPage = this.getDirtyCurrentPage();
    this.handlePageChange(dirtyCurrentPage);
  };

  handlePageInputKeyDown = (event) => {
    if (event.keyCode !== KEY_ENTER) {
      return;
    }
    const dirtyCurrentPage = this.getDirtyCurrentPage();
    this.handlePageChange(dirtyCurrentPage);
  };

  getFirstPageProps = () => {
    const { currentPage } = this.asProps;
    const disabled = currentPage <= 1;
    return {
      disabled,
      onClick: () => this.handlePageChange(1),
    };
  };

  getPrevPageProps = () => {
    const { currentPage, getI18nText } = this.asProps;
    const disabled = currentPage <= 1;
    return {
      disabled,
      onClick: () => this.handlePageChange(currentPage - 1),
      getI18nText,
    };
  };

  getNextPageProps = () => {
    const { currentPage, totalPages, getI18nText } = this.asProps;
    const disabled = !(currentPage < totalPages);
    return {
      disabled,
      onClick: () => this.handlePageChange(currentPage + 1),
      getI18nText,
    };
  };

  getPageInputProps = () => {
    const { getI18nText } = this.asProps;
    return {
      getI18nText,
    };
  };

  getPageInputAddonProps = () => {
    return {
      onClick: this.handlePageInputIconClick,
    };
  };

  getPageInputValueProps = () => {
    const { dirtyCurrentPage } = this.state;
    const { currentPage, totalPages, getI18nText } = this.asProps;

    return {
      min: 1,
      max: totalPages,
      value: dirtyCurrentPage === undefined ? currentPage : dirtyCurrentPage,
      onBlur: this.handlePageValueBlur,
      onChange: this.handlePageValueChange,
      onKeyDown: this.handlePageInputKeyDown,
      getI18nText,
    };
  };

  getTotalPagesProps = () => {
    const { currentPage, totalPages, totalPagesFormatter, getI18nText } = this.asProps;
    const disabled = currentPage === totalPages;
    return {
      // deprecated
      children: totalPagesFormatter ? totalPagesFormatter(totalPages) : formatThousands(totalPages),
      disabled,
      onClick: () => this.handlePageChange(totalPages),
      getI18nText,
    };
  };

  render() {
    const { Root: SPagination } = this;
    const { styles } = this.asProps;
    return styled(styles)(<SPagination render={Box} tag="nav" aria-label="pagination" />);
  }
}

class FirstPage extends Component<IButtonProps> {
  static defaultProps = () => ({
    children: <Button.Addon tag={ChevronDoubleLeftXS} />,
  });
  render() {
    const { Root } = this;
    return <Root render={Button} />;
  }
}

class NextPage extends Component<IButtonProps> {
  static defaultProps = (props) => ({
    children: props.getI18nText('nextPageLabel'),
  });

  render() {
    const { Root: SNextPage } = this;
    const { styles } = this.asProps;
    return styled(styles)(<SNextPage render={Button} use="primary" theme="info" />);
  }
}

class PrevPage extends Component<IButtonProps> {
  static defaultProps = (props) => ({
    children: props.getI18nText('prevPageLabel'),
  });

  render() {
    const { Root: SPrevPage } = this;
    const { styles } = this.asProps;
    return styled(styles)(<SPrevPage render={Button} />);
  }
}

class TotalPages extends Component<ITotalPagesProps> {
  render() {
    const { Root: STotalPages } = this;
    const STotalPagesLabel = Text;
    const { styles, label, getI18nText, disabled } = this.asProps;

    logger.warn(
      !!label,
      '"Label" property is deprecated, use i118n to override text',
      this.asProps['data-ui-name'],
    );

    return styled(styles)(
      <>
        <STotalPagesLabel size={100}>{label || getI18nText('totalPagesLabel')}</STotalPagesLabel>
        {disabled ? (
          <STotalPages render={Text} size={100} />
        ) : (
          <STotalPages render={Link} tag="button" type="button" size={100} />
        )}
      </>,
    );
  }
}

const PageInputValue = (props: IFunctionProps<IInputValueProps>) => {
  const { Root: SPageInputValue, styles } = props;
  return styled(styles)(<SPageInputValue render={Input.Value} />);
};

class PageInput extends Component<IPageInputProps> {
  static defaultProps = () => ({
    children: (
      <>
        <Pagination.PageInput.Value />
        <Pagination.PageInput.Addon tag={Return} interactive />
      </>
    ),
  });

  render() {
    const { Root: SPageInput } = this;
    const SLabel = Text;
    const { label, getI18nText, styles } = this.asProps;

    logger.warn(
      !!label,
      '"Label" property is deprecated, use i118n to override text',
      this.asProps['data-ui-name'],
    );

    return styled(styles)(
      <>
        <SLabel size={100}>{label || getI18nText('pageInputLabel')}</SLabel>
        <SPageInput render={Input} />
      </>,
    );
  }
}

const Pagination = createComponent<
  Merge<IPaginationProps, HTMLAttributes<HTMLDivElement>>,
  {
    PrevPage: Merge<IButtonProps, HTMLAttributes<HTMLButtonElement>>;
    NextPage: Merge<IButtonProps, HTMLAttributes<HTMLButtonElement>>;
    FirstPage: Merge<IButtonProps, HTMLAttributes<HTMLButtonElement>>;
    TotalPages: Merge<ITotalPagesProps, HTMLAttributes<HTMLSpanElement>>;
    PageInput: [
      Merge<IPageInputProps, HTMLAttributes<HTMLDivElement>>,
      {
        Value: ComponentProps<typeof Input.Value>;
        Addon: ComponentProps<typeof Input.Addon>;
      },
    ];
  },
  IPaginationContext
>(PaginationRoot, {
  PrevPage,
  NextPage,
  FirstPage,
  TotalPages,
  PageInput: [
    PageInput,
    {
      Value: PageInputValue,
      Addon: Input.Addon,
    },
  ],
});

export default Pagination;
