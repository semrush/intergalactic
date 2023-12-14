import React from 'react';
import { withRouter, useLocation } from 'react-router-dom';
import { InstantSearch, Highlight, Configure } from 'react-instantsearch/dom';
import { connectAutoComplete, connectStateResults } from 'react-instantsearch/connectors';
import algoliasearch from 'algoliasearch/lite';
import { logEvent } from '../utils/amplitude';

import { Box } from '@semcore/flex-box';
import Select from '@semcore/select';
import SearchM from '@semcore/icon/Search/m';
import ArrowRight from '@semcore/icon/ArrowRight/m';
import CloseM from '@semcore/icon/Close/m';
import cx from 'classnames';

const ru = require('convert-layout/ru');

import observatory from '../static/search/observatory.svg';
import CONFIG from '../algolia';
import Divider from '@semcore/divider';
import { getCookie, AMPLITUDE_COOKIE_NAME } from '../utils/cookie';
import styles from './SearchHome.module.css';

const algoliaClient = algoliasearch(CONFIG.appName, CONFIG.openKey);
/* To utilize synonyms in Algolia, a userToken parameter is required. However, since the website 
does not have any registered usernames or users, the randomly generated string known as the deviceId, 
which is stored in cookies, is used as the userToken instead, sourced from Amplitude. */
const userToken = typeof window !== 'undefined' ? getCookie(AMPLITUDE_COOKIE_NAME) : '';
const searchClient = {
  search(requests) {
    if (requests.every(({ params }) => !params.query)) {
      return;
    }
    return algoliaClient.search(requests);
  },
};

const showList = (hits, pages, content) => {
  const options = [];
  if (pages.length) {
    options.push(
      <div className={cx(styles.optionHeader, styles.option)} key={'_page_'}>
        Pages
      </div>,
    );
    options.push(
      ...pages.map((item) => (
        <Select.Option
          className={styles.option}
          key={item.objectID}
          value={item.slug}
          disabled={item.disabled}
          onClick={() =>
            logEvent('search:click', {
              dropdown: `${item.title.toLowerCase()} ${item.category.toLowerCase()}`,
            })
          }
        >
          <div className={styles.optionText}>
            <Highlight
              attribute='title'
              hit={item}
              className={styles.highlightMark}
              tagName='mark'
            />
          </div>
          <div className={styles.optionPlace}>{item.category}</div>
        </Select.Option>
      )),
    );
  }
  if (pages.length && content.length) {
    options.push(<Divider key={'_divider_'} />);
  }
  if (content.length) {
    options.push(
      <div className={cx(styles.optionHeader, styles.option)} key={'_content_'}>
        Content
      </div>,
    );
    options.push(
      ...content.map((item) => (
        <Select.Option
          className={styles.option}
          key={item.objectID}
          value={item.slug}
          disabled={item.disabled}
          onClick={() => {
            logEvent('search:click', {
              dropdown: `${item.title.toLowerCase()} ${item.category.toLowerCase()}`,
            });
          }}
        >
          <div className={styles.optionText}>
            <Highlight
              attribute='title'
              hit={item}
              className={styles.highlightMark}
              tagName='mark'
            />
          </div>
          <div className={styles.optionPlace}>
            {item.category}
            <ArrowRight className={styles.arrowRightIcon} />
            {item.pageTitle}
          </div>
        </Select.Option>
      )),
    );
  }
  if (!hits.length)
    options.push(
      <div className={styles.notFound} key={'_nothing_'}>
        <img
          className={styles.notFoundImg}
          src={observatory}
          alt='observatory'
          aria-hidden='true'
        />
        <div className={styles.notFoundText}>We found something… it's nothing</div>
      </div>,
    );

  return options;
};

const Search = ({
  currentRefinement,
  refine,
  hits,
  history,
  searchResults,
  wrapperClassName,
  onItemSelect,
  placeholder,
  className,
  onFocus,
}) => {
  const pages = hits.filter((el) => !el.heading);
  const content = hits.filter((el) => el.heading);
  const location = useLocation();
  const [value, setValue] = React.useState(ru.toEn(currentRefinement) || '');

  React.useEffect(() => {
    refine('');
  }, [location]);

  const ref = React.useRef(null);
  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key !== 'k') return;
      if (!event.ctrlKey && !event.metaKey) return;
      ref.current?.focus();
    };
    document.body.addEventListener('keydown', handleKeyDown);

    return () => document.body.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <Select
      interaction='focus'
      offset={0}
      stretch='fixed'
      value={location.pathname}
      onChange={(value) => {
        history.push(value);
        onItemSelect?.();
      }}
      visible={!!currentRefinement && searchResults}
    >
      <Select.Trigger
        tag={Box}
        className={cx(styles.inputWrapper, wrapperClassName)}
        inline={false}
      >
        {({ visible }, action) => {
          return (
            <>
              <input
                role='search'
                aria-label='Search for a component'
                value={value}
                onChange={(e) => {
                  setValue(ru.toEn(e.currentTarget.value));
                  refine(ru.toEn(e.currentTarget.value));
                  action.visible(true);
                  action.highlightedIndex(0);
                }}
                placeholder={placeholder}
                className={cx(
                  styles.input,
                  !!currentRefinement && visible && styles.inputOpen,
                  className,
                )}
                onFocus={onFocus}
                ref={ref}
              />
              <div className={styles.iconSearchWrapper}>
                {value.length > 0 ? (
                  <CloseM
                    className={styles.closeIcon}
                    onClick={() => {
                      setValue('');
                      refine('');
                    }}
                  />
                ) : (
                  <SearchM className={styles.searchIcon} />
                )}
              </div>
            </>
          );
        }}
      </Select.Trigger>
      <Select.Popper className={styles.popper}>
        <Select.List m={0} style={{ overflow: 'hidden' }}>
          {showList(hits, pages, content)}
        </Select.List>
      </Select.Popper>
    </Select>
  );
};

const SuggestSearch = withRouter(connectAutoComplete(connectStateResults(Search)));

function SearchHome(props) {
  return (
    <InstantSearch searchClient={searchClient} indexName={CONFIG.mainSearchIndexName}>
      {userToken && <Configure userToken={userToken} />}
      <SuggestSearch {...props} visible={true} />
    </InstantSearch>
  );
}

export default SearchHome;
