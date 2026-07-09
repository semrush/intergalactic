import { Flex, ScreenReaderOnly, Hint } from '@semcore/base-components';
import Button, { ButtonLink } from '@semcore/button';
import type { Intergalactic } from '@semcore/core';
import { createComponent, Component, sstyled, Root } from '@semcore/core';
import i18nEnhance from '@semcore/core/lib/utils/enhances/i18nEnhance';
import uniqueIDEnhancement from '@semcore/core/lib/utils/uniqueID';
import ChevronDoubleLeft from '@semcore/icon/ChevronDoubleLeft/m';
import InputNumber from '@semcore/input-number';
import { Text } from '@semcore/typography';
import React from 'react';

import type { NSPagination } from './Pagination.type';
import style from './style/pagination.shadow.css';
import { localizedMessages } from './translations/__intergalactic-dynamic-locales';

type State = {
  dirtyCurrentPage: NSPagination.Props['currentPage'];
};

class PaginationRoot extends Component<
  Intergalactic.InternalTypings.InferComponentProps<NSPagination.Component>,
  typeof PaginationRoot.enhance,
  NSPagination.Handlers,
  {},
  State,
  NSPagination.DefaultProps
> {
  static displayName = 'Pagination';

  static defaultProps = {
    defaultCurrentPage: 1,
    defaultTotalPages: 1,
    i18n: localizedMessages,
    locale: 'en',
    size: 'm',
  } as const;

  static style = style;
  static enhance = [i18nEnhance(localizedMessages), uniqueIDEnhancement()] as const;

  nextPageButtonRef = React.createRef<HTMLButtonElement>();
  prevPageButtonRef = React.createRef<HTMLButtonElement>();

  state: State = {
    // Crutch, so as not to take out `dirtyCurrentPage` in props
    dirtyCurrentPage: undefined,
  };

  pageInputAddonRef = React.createRef();

  uncontrolledProps() {
    return {
      totalPages: null,
      currentPage: null,
    };
  }

  componentDidUpdate(prevProps: typeof this.asProps) {
    if (prevProps.currentPage !== undefined && prevProps.currentPage !== this.asProps.currentPage) {
      this.setState({ dirtyCurrentPage: undefined });
    }
  }

  get paginationInputId() {
    const { uid } = this.asProps;

    return `pagination-input-${uid}`;
  }

  returnLostFocusTo = (ref: React.RefObject<HTMLButtonElement>) => {
    requestAnimationFrame(() => {
      ref.current?.focus();
    });
  };

  handlePageChange = (currentPage?: number) => {
    currentPage = Number(currentPage);
    if (Number.isNaN(currentPage)) {
      return;
    }
    this.handlers.currentPage(currentPage);
    this.setState({ dirtyCurrentPage: undefined });
  };

  handlePageValueChange = (value: NSPagination.Props['currentPage']) => {
    const { dirtyCurrentPage } = this.state;
    if (Number.isNaN(Number(value))) {
      value = dirtyCurrentPage;
    }
    this.setState({ dirtyCurrentPage: value });
  };

  handlePageValueBlur = () => {
    setTimeout(() => {
      if (this.pageInputAddonRef.current !== document.activeElement) {
        const { currentPage } = this.asProps;
        this.setState({ dirtyCurrentPage: currentPage });
      }
    }, 0);
  };

  getDirtyCurrentPage = () => {
    const { dirtyCurrentPage } = this.state;
    const { totalPages } = this.asProps;

    if (dirtyCurrentPage === undefined) return dirtyCurrentPage;

    const finalValue = dirtyCurrentPage > totalPages ? totalPages : dirtyCurrentPage;
    return finalValue <= 0 ? 1 : finalValue;
  };

  handlePageInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return;
    const dirtyCurrentPage = this.getDirtyCurrentPage();
    this.handlePageChange(dirtyCurrentPage);
  };

  getFirstPageProps = () => {
    const { currentPage, getI18nText, size } = this.asProps;
    const disabled = currentPage <= 1;
    return {
      disabled,
      onClick: () => {
        this.handlePageChange(1);
        this.returnLostFocusTo(this.nextPageButtonRef);
      },
      getI18nText,
      size,
    };
  };

  getPrevPageProps = () => {
    const { currentPage, getI18nText, size } = this.asProps;
    const disabled = currentPage <= 1;
    return {
      currentPage,
      disabled,
      onClick: () => {
        const followingPage = currentPage - 1;

        this.handlePageChange(followingPage);

        if (followingPage <= 1) {
          this.returnLostFocusTo(this.nextPageButtonRef);
        }
      },
      getI18nText,
      ref: this.prevPageButtonRef,
      size,
    };
  };

  getNextPageProps = () => {
    const { currentPage, totalPages, getI18nText, size } = this.asProps;
    const disabled = currentPage >= totalPages;
    return {
      currentPage,
      disabled,
      onClick: () => {
        const followingPage = currentPage + 1;

        this.handlePageChange(followingPage);

        if (followingPage >= totalPages) {
          this.returnLostFocusTo(this.prevPageButtonRef);
        }
      },
      getI18nText,
      ref: this.nextPageButtonRef,
      size,
    };
  };

  getPageInputProps = () => {
    const { getI18nText, locale, size } = this.asProps;
    return {
      getI18nText,
      locale,
      size,
      paginationInputId: this.paginationInputId,
    };
  };

  getPageInputAddonProps = () => {
    return {
      ref: this.pageInputAddonRef,
      onBlur: this.handlePageValueBlur,
    };
  };

  getPageInputValueProps = () => {
    const { dirtyCurrentPage } = this.state;
    const { currentPage, totalPages, getI18nText, size } = this.asProps;
    return {
      min: 1,
      max: totalPages,
      disabled: totalPages === 1,
      value: dirtyCurrentPage === undefined ? currentPage : dirtyCurrentPage,
      onBlur: this.handlePageValueBlur,
      onChange: this.handlePageValueChange,
      onKeyDown: this.handlePageInputKeyDown,
      getI18nText,
      size,
      id: this.paginationInputId,
    };
  };

  getTotalPagesProps = () => {
    const { currentPage, totalPages, getI18nText, locale, size } = this.asProps;
    const formatter = new Intl.NumberFormat(locale, { style: 'decimal' });
    return {
      totalPages,
      children: formatter.format(totalPages),
      isLastOrSingle: currentPage === totalPages,
      onClick: () => {
        this.handlePageChange(totalPages);
        this.returnLostFocusTo(this.prevPageButtonRef);
      },
      getI18nText,
      size,
    };
  };

  render() {
    const SPagination = Root;
    const {
      Children,
      children: hasChildren,
      getI18nText,
      currentPage,
      totalPages = 1,
    } = this.asProps;

    return sstyled(this.asProps.styles)(
      <SPagination
        render={Flex}
        flexWrap='wrap'
        withGap={!hasChildren}
        tag='nav'
        aria-label={getI18nText('pagination')}
      >
        {hasChildren
          ? (
              <Children />
            )
          : (
              <>
                {totalPages === 1
                  ? null
                  : (
                      <Flex>
                        <Pagination.FirstPage />
                        <Pagination.PrevPage />
                        <Pagination.NextPage />
                      </Flex>
                    )}
                <Flex alignItems='center'>
                  <Pagination.PageInput />
                  <Pagination.TotalPages />
                </Flex>
              </>
            )}
        <ScreenReaderOnly aria-live='polite' role='status'>
          {getI18nText('pageInputLabel')}
          {' '}
          {currentPage}
        </ScreenReaderOnly>
      </SPagination>,
    );
  }
}

class FirstPage extends Component<
  Intergalactic.InternalTypings.InferChildComponentProps<NSPagination.FirstPage.Component, typeof PaginationRoot, 'FirstPage'>
> {
  buttonRef = React.createRef<HTMLButtonElement>();

  render() {
    const { getI18nText, Children, children } = this.asProps;
    const hintContent = getI18nText('firstPage');
    const isAdvanced = children !== undefined;

    return (
      <>
        <Root render={Button} aria-label={getI18nText('firstPage')} ref={this.buttonRef}>
          {isAdvanced
            ? <Children />
            : <Button.Addon tag={ChevronDoubleLeft} />}
        </Root>
        {!isAdvanced && (<Hint triggerRef={this.buttonRef} timeout={[250, 50]}>{hintContent}</Hint>)}
      </>
    );
  }
}

type PrevPageProps = Intergalactic.InternalTypings.InferChildComponentProps<NSPagination.PrevPage.Component, typeof PaginationRoot, 'PrevPage'>;
class PrevPage extends Component<PrevPageProps> {
  static defaultProps = (props: PrevPageProps) => ({
    children: props.getI18nText('prevPageLabel'),
  });

  render() {
    const SPrevPage = Root;
    return sstyled(this.asProps.styles)(<SPrevPage render={Button} />);
  }
}

type NextPageProps = Intergalactic.InternalTypings.InferChildComponentProps<NSPagination.NextPage.Component, typeof PaginationRoot, 'NextPage'>;
class NextPage extends Component<NextPageProps> {
  static defaultProps = (props: NextPageProps) => ({
    children: props.getI18nText('nextPageLabel'),
  });

  render() {
    const SNextPage = Root;
    return sstyled(this.asProps.styles)(<SNextPage render={Button} use='primary' theme='info' />);
  }
}

class TotalPages extends Component<
  Intergalactic.InternalTypings.InferChildComponentProps<NSPagination.TotalPages.Component, typeof PaginationRoot, 'TotalPages'>
> {
  render() {
    const STotalPages = Root;
    const STotalPagesLabel = Text;
    const STotalLastPages = Text;
    const { styles, getI18nText, totalPages, isLastOrSingle, children, size, ...other } = this.asProps;
    const textSize = size === 'l' ? 300 : 200;
    return sstyled(styles)(
      <>
        <STotalPagesLabel size={textSize}>{getI18nText('totalPagesLabel')}</STotalPagesLabel>
        {isLastOrSingle
          ? (
              // @ts-ignore
              <STotalLastPages
                size={textSize}
                aria-label={getI18nText('lastPage', { lastPageNumber: totalPages })}
                {...other}
              >
                {children}
              </STotalLastPages>
            )
          : (
              <STotalPages
                render={ButtonLink}
                use:size={textSize}
                aria-label={getI18nText('lastPage', { lastPageNumber: totalPages })}
              />
            )}
      </>,
    );
  }
}

function PageInputValue(
  props: Intergalactic.InternalTypings.InferChildComponentProps<
    NSPagination.PageInput.Value.Component,
    typeof PaginationRoot,
    'PageInputValue'
  >,
) {
  const SPageInputValue = Root;

  return sstyled(props.styles)(
    <SPageInputValue
      render={InputNumber.Value}
      // By default, InputNumber has validation on blur.
      // We should disable it, because of Pagination.PageInput.Addon
      onBlur={() => false}
    />,
  );
}

function PageInputAddon(
  props: Intergalactic.InternalTypings.InferChildComponentProps<
    NSPagination.PageInput.Addon.Component,
    typeof PaginationRoot,
    'PageInputAddon'
  >,
) {
  const SPageInputAddon = Root;
  return sstyled(props.styles)(<SPageInputAddon render={InputNumber.Addon} />);
}

class PageInput extends Component<
  Intergalactic.InternalTypings.InferChildComponentProps<NSPagination.PageInput.Component, typeof PaginationRoot, 'PageInput'>,
  typeof PageInput.enhance
> {
  static enhance = [uniqueIDEnhancement()] as const;

  render() {
    const SPageInput = Root;
    const SLabel = Text;
    const { Children, getI18nText, styles, locale, size, paginationInputId } = this.asProps;
    const textSize = size === 'l' ? 300 : 200;

    return sstyled(styles)(
      <>
        <SLabel tag='label' htmlFor={paginationInputId} size={textSize}>
          {getI18nText('pageInputLabel')}
        </SLabel>
        <SPageInput
          render={InputNumber}
          controlsLength={Children.origin ? undefined : 2}
          locale={locale}
        >
          {Children.origin
            ? (
                <Children />
              )
            : (
                <Pagination.PageInput.Value />
              )}
        </SPageInput>
      </>,
    );
  }
}

/**
 * Pagination
 *
 * {@link https://developer.semrush.com/intergalactic/components/pagination/pagination-api/|API} | {@link https://developer.semrush.com/intergalactic/components/pagination/pagination-code/|Examples}
 */
const Pagination = createComponent<
  NSPagination.Component,
  typeof PaginationRoot
>(PaginationRoot, {
  PrevPage,
  NextPage,
  FirstPage,
  TotalPages,
  PageInput: [
    PageInput,
    {
      Value: PageInputValue,
      Addon: PageInputAddon,
    },
  ],
});

export default Pagination;
