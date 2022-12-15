import React from 'react';
import createComponent, { Component, sstyled, Root } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import Input from '@semcore/input';
import Link from '@semcore/link';
import { Text } from '@semcore/typography';
import Button from '@semcore/button';
import Return from '@semcore/icon/Return/m';
import ChevronDoubleLeft from '@semcore/icon/ChevronDoubleLeft/m';
import uniqueIDEnhancement from '@semcore/utils/lib/uniqueID';
import i18nEnhance from '@semcore/utils/lib/enhances/i18nEnhance';
import { localizedMessages } from './translations/__intergalactic-dynamic-locales';

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

class PaginationRoot extends Component {
  static displayName = 'Pagination';

  static defaultProps = (props) => {
    const totalPages = props.totalPages || props.defaultTotalPages || 1;
    return {
      defaultCurrentPage: 1,
      defaultTotalPages: 1,
      i18n: localizedMessages,
      children: (
        <>
          {totalPages === 1 ? null : (
            <>
              <Pagination.FirstPage />
              <Pagination.PrevPage />
              <Pagination.NextPage />
            </>
          )}
          <Pagination.PageInput />
          <Pagination.TotalPages />
        </>
      ),
    };
  };
  static style = style;
  static enhance = [i18nEnhance()];

  state = {
    // Crutch, so as not to take out `dirtyCurrentPage` in props
    dirtyCurrentPage: undefined,
  };

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

  handlePageChange = (currentPage) => {
    currentPage = Number(currentPage);
    if (Number.isNaN(currentPage)) {
      return;
    }
    this.handlers.currentPage(currentPage);
    this.setState({ dirtyCurrentPage: undefined });
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
      currentPage,
      disabled,
      onClick: () => this.handlePageChange(currentPage - 1),
      getI18nText,
    };
  };

  getNextPageProps = () => {
    const { currentPage, totalPages, getI18nText } = this.asProps;
    const disabled = !(currentPage < totalPages);
    return {
      currentPage,
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
    const { currentPage, totalPages, getI18nText } = this.asProps;
    return {
      totalPages,
      children: formatThousands(totalPages),
      isLastOrSingle: currentPage === totalPages,
      onClick: () => this.handlePageChange(totalPages),
      getI18nText,
    };
  };

  render() {
    const SPagination = Root;
    const { Children } = this.asProps;
    return sstyled(this.asProps.styles)(
      <SPagination render={Box} tag="nav" aria-label="pagination">
        <Children />
      </SPagination>,
    );
  }
}

class FirstPage extends Component {
  static defaultProps = () => ({
    children: <Button.Addon tag={ChevronDoubleLeft} />,
  });

  render() {
    return <Root render={Button} aria-label="First page" />;
  }
}

class NextPage extends Component {
  static defaultProps = (props) => ({
    children: props.getI18nText('nextPageLabel'),
  });

  render() {
    const SNextPage = Root;
    const { currentPage } = this.asProps;
    return sstyled(this.asProps.styles)(
      <SNextPage
        render={Button}
        use="primary"
        theme="info"
        aria-label={`Page ${currentPage + 1}`}
      />,
    );
  }
}

class PrevPage extends Component {
  static defaultProps = (props) => ({
    children: props.getI18nText('prevPageLabel'),
  });

  render() {
    const SPrevPage = Root;
    const { currentPage } = this.asProps;
    return sstyled(this.asProps.styles)(
      <SPrevPage render={Button} aria-label={`Page ${currentPage - 1}`} />,
    );
  }
}

class TotalPages extends Component {
  render() {
    const STotalPages = Root;
    const STotalPagesLabel = Text;
    const STotalLastPages = Text;
    const { styles, getI18nText, totalPages, isLastOrSingle, children, ...other } = this.asProps;

    return sstyled(styles)(
      <>
        <STotalPagesLabel>{getI18nText('totalPagesLabel')}</STotalPagesLabel>
        {isLastOrSingle ? (
          <STotalLastPages aria-label={`Last page ${totalPages}`} {...other}>
            {children}
          </STotalLastPages>
        ) : (
          <STotalPages
            render={Link}
            tag="button"
            type="button"
            aria-label={`Last page ${totalPages}`}
          />
        )}
      </>,
    );
  }
}

const PageInputValue = (props) => {
  const SPageInputValue = Root;
  return sstyled(props.styles)(
    <SPageInputValue render={Input.Value} aria-label="Current page" aria-current="Page" />,
  );
};

const PageInputAddon = (props) => {
  const SPageInputAddon = Root;
  return sstyled(props.styles)(<SPageInputAddon render={Input.Addon} />);
};

class PageInput extends Component {
  static enhance = [uniqueIDEnhancement()];

  render() {
    const SPageInput = Root;
    const SLabel = Text;
    const { Children, getI18nText, styles, uid } = this.asProps;

    return sstyled(styles)(
      <>
        <SLabel tag="label" htmlFor={`pagination-input-${uid}`}>
          {getI18nText('pageInputLabel')}
        </SLabel>
        <SPageInput render={Input} controlsLength={Children.origin ? undefined : 2}>
          {Children.origin ? (
            <Children />
          ) : (
            <>
              <Pagination.PageInput.Value id={`pagination-input-${uid}`} />
              <Pagination.PageInput.Addon
                tag={Return}
                interactive
                aria-label="Confirm page number"
              />
            </>
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
