import React, { useEffect } from 'react';
import { withRouter, useLocation } from 'react-router-dom';
import { InstantSearch, Highlight } from 'react-instantsearch/dom';
import { connectAutoComplete, connectStateResults } from 'react-instantsearch/connectors';
import algoliasearch from 'algoliasearch/lite';

import IF from '@semcore/utils/lib/if';
import { Box } from '@semcore/flex-box';
import Select from '@semcore/select';
import SearchM from '@semcore/icon/Search/m';
import ArrowRight from '@semcore/icon/ArrowRight/m';
import cx from 'classnames';

const ru = require('convert-layout/ru');

import observatory from '../static/search/observatory.svg';
import CONFIG from '../algolia';
import Divider from '@semcore/divider';
import styles from './SearchHome.module.css';

const algoliaClient = algoliasearch(CONFIG.ALGOLIA_APP, CONFIG.ALGOLIA_OPEN_KEY);
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
        >
          <div className={styles.optionText}>
            <Highlight
              attribute="title"
              hit={item}
              className={styles.highlightMark}
              tagName="mark"
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
        >
          <div className={styles.optionText}>
            <Highlight
              attribute="title"
              hit={item}
              className={styles.highlightMark}
              tagName="mark"
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
          alt="observatory"
          aria-hidden="true"
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
}) => {
  const pages = hits.filter((el) => !el.heading);
  const content = hits.filter((el) => el.heading);
  const location = useLocation();

  useEffect(() => {
    refine('');
  }, [location]);

  return (
    <Select
      interaction="focus"
      offset={0}
      stretch="fixed"
      value={location.pathname}
      onChange={(value) => {
        history.push(value);
        onItemSelect?.();
      }}
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
                role="search"
                aria-label="Search for a component"
                value={ru.toEn(currentRefinement)}
                onChange={(e) => {
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
              />
              <div className={styles.iconSearchWrapper}>
                <SearchM className={styles.searchIcon} />
              </div>
            </>
          );
        }}
      </Select.Trigger>
      <IF condition={!!currentRefinement && searchResults}>
        <Select.Popper className={styles.popper}>
          <Select.List m={0} style={{ overflow: 'hidden' }}>
            {showList(hits, pages, content)}
          </Select.List>
        </Select.Popper>
      </IF>
    </Select>
  );
};

const SuggestSearch = withRouter(connectAutoComplete(connectStateResults(Search)));

function SearchHome(props) {
  return (
    <InstantSearch searchClient={searchClient} indexName={CONFIG.ALGOLIA_INDEX}>
      <SuggestSearch {...props} visible={true} />
    </InstantSearch>
  );
}

export default SearchHome;
