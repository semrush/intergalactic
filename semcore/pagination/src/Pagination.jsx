import React from 'react';
import { createComponent, Component, sstyled, Root } from '@semcore/core';
import { Flex } from '@semcore/flex-box';
import InputNumber from '@semcore/input-number';
import { Text } from '@semcore/typography';
import Button, { ButtonLink } from '@semcore/button';
import { Hint } from '@semcore/tooltip';
import ChevronDoubleLeft from '@semcore/icon/ChevronDoubleLeft/m';
import uniqueIDEnhancement from '@semcore/core/lib/utils/uniqueID';
import i18nEnhance from '@semcore/core/lib/utils/enhances/i18nEnhance';
import { localizedMessages } from './translations/__intergalactic-dynamic-locales';

import style from './style/pagination.shadow.css';
import { ScreenReaderOnly } from '@semcore/flex-box';

class PaginationRoot extends Component {
  static displayName = 'Pagination';

  static defaultProps = () => {
    return {
      defaultCurrentPage: 1,
      defaultTotalPages: 1,
      i18n: localizedMessages,
      locale: 'en',
      size: 'm',
    };
  };
  static style = style;
  static enhance = [i18nEnhance(localizedMessages)];

  nextPageButtonRef = React.createRef();
  prevPageButtonRef = React.createRef();

  state = {
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

  componentDidUpdate(prevProps) {
    if (prevProps.currentPage !== undefined && prevProps.currentPage !== this.asProps.currentPage) {
      this.setState({ dirtyCurrentPage: undefined });
    }
  }

  returnLostFocus = () => {
    setTimeout(() => {
      if (document.activeElement !== document.body) return;

      const prevPageButton = this.prevPageButtonRef.current;
      const nextPageButton = this.nextPageButtonRef.current;

      if (prevPageButton && !prevPageButton.disabled) {
        prevPageButton.focus();
      } else if (nextPageButton && !nextPageButton.disabled) {
        nextPageButton.focus();
      }
    }, 0);
  };

  handlePageChange = (currentPage) => {
    currentPage = Number(currentPage);
    if (Number.isNaN(currentPage)) {
      return;
    }
    this.handlers.currentPage(currentPage);
    this.setState({ dirtyCurrentPage: undefined });
    this.returnLostFocus();
  };

  handlePageValueChange = (value) => {
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
    const finalValue = dirtyCurrentPage > totalPages ? totalPages : dirtyCurrentPage;
    return finalValue <= 0 ? 1 : finalValue;
  };

  /** @deprecated */
  handlePageInputIconClick = () => {
    const dirtyCurrentPage = this.getDirtyCurrentPage();
    this.handlePageChange(dirtyCurrentPage);
  };

  handlePageInputKeyDown = (event) => {
    if (event.key !== 'Enter') return;
    const dirtyCurrentPage = this.getDirtyCurrentPage();
    this.handlePageChange(dirtyCurrentPage);
  };

  getFirstPageProps = () => {
    const { currentPage, getI18nText, size } = this.asProps;
    const disabled = currentPage <= 1;
    return {
      disabled,
      onClick: () => this.handlePageChange(1),
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
      onClick: () => this.handlePageChange(currentPage - 1),
      getI18nText,
      ref: this.nextPageButtonRef,
      size,
    };
  };

  getNextPageProps = () => {
    const { currentPage, totalPages, getI18nText, size } = this.asProps;
    const disabled = !(currentPage < totalPages);
    return {
      currentPage,
      disabled,
      onClick: () => this.handlePageChange(currentPage + 1),
      getI18nText,
      ref: this.prevPageButtonRef,
      size,
    };
  };

  getPageInputProps = () => {
    const { getI18nText, locale, size } = this.asProps;
    return {
      getI18nText,
      locale,
      size,
    };
  };

  /** @deprecated */
  getPageInputAddonProps = () => {
    return {
      onClick: this.handlePageInputIconClick,
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
    };
  };

  getTotalPagesProps = () => {
    const { currentPage, totalPages, getI18nText, locale, size } = this.asProps;
    const formatter = new Intl.NumberFormat(locale, { style: 'decimal' });
    return {
      totalPages,
      children: formatter.format(totalPages),
      isLastOrSingle: currentPage === totalPages,
      onClick: () => this.handlePageChange(totalPages),
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
        flexWrap={'wrap'}
        withGap={!hasChildren}
        tag='nav'
        aria-label={getI18nText('pagination')}
      >
        {hasChildren ? (
          <Children />
        ) : (
          <>
            {totalPages === 1 ? null : (
              <Flex>
                <Pagination.FirstPage />
                <Pagination.PrevPage />
                <Pagination.NextPage />
              </Flex>
            )}
            <Flex alignItems={'center'}>
              <Pagination.PageInput />
              <Pagination.TotalPages />
            </Flex>
          </>
        )}
        <ScreenReaderOnly aria-live={'polite'} role={'status'}>
          {getI18nText('pageInputLabel')} {currentPage}
        </ScreenReaderOnly>
      </SPagination>,
    );
  }
}

class FirstPage extends Component {
  static defaultProps = (props) => {
    const hintContent = props.getI18nText('firstPage');

    return {
      children: (
        <Button.Addon
          tag={Hint}
          title={hintContent}
          timeout={[250, 50]}
          __excludeProps={['aria-label']}
        >
          <ChevronDoubleLeft />
        </Button.Addon>
      ),
    };
  };

  render() {
    const { getI18nText } = this.asProps;

    return <Root render={Button} aria-label={getI18nText('firstPage')} />;
  }
}

class PrevPage extends Component {
  static defaultProps = (props) => ({
    children: props.getI18nText('prevPageLabel'),
  });

  render() {
    const SPrevPage = Root;
    return sstyled(this.asProps.styles)(<SPrevPage render={Button} />);
  }
}
class NextPage extends Component {
  static defaultProps = (props) => ({
    children: props.getI18nText('nextPageLabel'),
  });

  render() {
    const SNextPage = Root;
    return sstyled(this.asProps.styles)(<SNextPage render={Button} use='primary' theme='info' />);
  }
}

class TotalPages extends Component {
  render() {
    const STotalPages = Root;
    const STotalPagesLabel = Text;
    const STotalLastPages = Text;
    const { styles, getI18nText, totalPages, isLastOrSingle, children, ...other } = this.asProps;
    const textSize = other.size === 'l' ? '300' : '200';
    return sstyled(styles)(
      <>
        <STotalPagesLabel size={textSize}>{getI18nText('totalPagesLabel')}</STotalPagesLabel>
        {isLastOrSingle ? (
          <STotalLastPages
            size={textSize}
            aria-label={getI18nText('lastPage', { lastPageNumber: totalPages })}
            {...other}
          >
            {children}
          </STotalLastPages>
        ) : (
          <STotalPages
            render={ButtonLink}
            aria-label={getI18nText('lastPage', { lastPageNumber: totalPages })}
          />
        )}
      </>,
    );
  }
}

const PageInputValue = (props) => {
  const SPageInputValue = Root;

  return sstyled(props.styles)(
    <SPageInputValue
      render={InputNumber.Value}
      // By default, InputNumber has validation on blur.
      // We should disable it, because of Pagination.PageInput.Addon
      onBlur={() => false}
    />,
  );
};

const PageInputAddon = (props) => {
  const SPageInputAddon = Root;
  return sstyled(props.styles)(<SPageInputAddon render={InputNumber.Addon} />);
};

class PageInput extends Component {
  static enhance = [uniqueIDEnhancement()];

  render() {
    const SPageInput = Root;
    const SLabel = Text;
    const { Children, getI18nText, styles, uid, locale, size } = this.asProps;

    return sstyled(styles)(
      <>
        <SLabel tag='label' htmlFor={`pagination-input-${uid}`} size={size}>
          {getI18nText('pageInputLabel')}
        </SLabel>
        <SPageInput
          render={InputNumber}
          controlsLength={Children.origin ? undefined : 2}
          locale={locale}
        >
          {Children.origin ? (
            <Children />
          ) : (
            <Pagination.PageInput.Value id={`pagination-input-${uid}`} />
          )}
        </SPageInput>
      </>,
    );
  }
}

const Pagination = createComponent(PaginationRoot, {
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
