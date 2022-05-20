import React, { useEffect } from 'react';
import styled from 'styled-components';
import { withRouter, useLocation } from 'react-router-dom';
import { InstantSearch, Highlight } from 'react-instantsearch/dom';
import { connectAutoComplete, connectStateResults } from 'react-instantsearch/connectors';
import algoliasearch from 'algoliasearch/lite';

import IF from '@semcore/utils/lib/if';
import { Box } from '@semcore/flex-box';
import Select from '@semcore/select';
import SearchM from '@semcore/icon/Search/m';
import ArrowRight from '@semcore/icon/ArrowRight/m';

const ru = require('convert-layout/ru');

import observatory from '../static/search/observatory.svg';
import CONFIG from '../algolia';
import Divider from '@semcore/divider';

const algoliaClient = algoliasearch(CONFIG.ALGOLIA_APP, CONFIG.ALGOLIA_OPEN_KEY);
const searchClient = {
  search(requests) {
    if (requests.every(({ params }) => !params.query)) {
      return;
    }
    return algoliaClient.search(requests);
  },
};

const Popper = styled.div`
  background-color: #fff;
  color: #171a22;
  z-index: 999;
  box-shadow: 0 10px 25px 0 rgba(0, 0, 0, 0.2);
  border-radius: 0 0 6px 6px;
  overflow: hidden;
  border: none;
`;

const InputWrapper = styled(Box)`
  position: relative;
  @media (max-width: 767px) {
    margin-right: 32px;
  }
  @media (max-width: 415px) {
    margin: 0 55px 0 8px;
    width: 85%;
  }
`;

const Input = styled.input`
  height: 46px;
  width: 100%;
  padding-left: 24px;
  padding-right: 35px;
  border-radius: 6px 6px ${({ isOpen }) => (isOpen ? '0 0;' : '6px 6px;')};
  box-sizing: border-box;
  font-size: 16px;
  border: 1px solid #d1d4db;
  outline: none;
  text-overflow: ellipsis;

  &:focus {
    border: 1px solid #171a22;
  }

  &::placeholder {
    color: #898d9a;
    text-overflow: ellipsis;
  }
`;

const DesktopInput = styled(Input)`
  display: none;
  font-family: Inter, sans-serif;
  @media (min-width: 768px) {
    display: flex;
  }
`;

const MobileInput = styled(Input)`
  display: none;
  @media (max-width: 767px) {
    display: flex;
  }
`;

const IconSearchWrapper = styled.div`
  position: absolute;
  right: 15px;
  top: 14px;
  color: #171a22;
  @media (max-width: 415px) {
    left: 0;
  }
`;

const SearchIcon = styled(SearchM)`
  cursor: default;
  @media (max-width: 415px) {
    display: none;
  }
`;

const NotFound = styled.div`
  padding: 24px 68px 64px;
  display: flex;
  flex-direction: column;
  color: #575c66;
`;

const NotFoundImg = styled.img`
  margin: 0 auto 8px auto;
`;

const NotFoundText = styled.div`
  font-size: 14px;
  text-align: center;
`;

const Option = styled.div`
  padding: 0 28px;
  height: 54px;
  display: block;
  font-size: 16px;
  text-decoration: none;
`;

const OptionText = styled.div`
  font-size: 14px;
  text-decoration: none;
`;

const OptionPlace = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #575c66;
`;

const OptionHeader = styled.div`
  padding: 8px;
  height: 21px;
  font-weight: bold;
  font-size: 14px;
  display: flex;
  align-items: end;
`;

const HighlightMark = styled.mark`
  background: rgba(255, 232, 77, 0.5);
`;

const ArrowRightIcon = styled(ArrowRight)`
  margin: 0 4px;
  cursor: default;

  @media (max-width: 415px) {
    display: none;
  }
`;

const SelectPopper = styled(Select.Popper)`
  @media (max-width: 415px) {
    margin-left: -200px !important;
    width: 244px !important;
  }
`;

const Search = ({ currentRefinement, refine, hits, history, searchResults, ...other }) => {
  const pages = hits.filter((el) => !el.heading);
  const content = hits.filter((el) => el.heading);
  const location = useLocation();

  useEffect(() => {
    refine('');
  }, [location]);

  const showList = (hits, pages, content) => {
    let options = [];
    if (pages.length) {
      options.push(
        <OptionHeader tag={Option} key={1}>
          Pages
        </OptionHeader>,
      );
      options.push(
        ...pages.map((item) => (
          <Select.Option
            tag={Option}
            key={item.objectID}
            value={item.slug}
            disabled={item.disabled}
          >
            <OptionText>
              <Highlight attribute="title" hit={item} tagName={HighlightMark} />
            </OptionText>
            <OptionPlace>{item.category}</OptionPlace>
          </Select.Option>
        )),
      );
    }
    if (pages.length && content.length) {
      options.push(<Divider key={2} />);
    }
    if (content.length) {
      options.push(
        <OptionHeader tag={Option} key={3}>
          Content
        </OptionHeader>,
      );
      options.push(
        ...content.map((item) => (
          <Select.Option
            tag={Option}
            key={item.objectID}
            value={item.slug}
            disabled={item.disabled}
          >
            <OptionText>
              <Highlight attribute="title" hit={item} tagName={HighlightMark} />
            </OptionText>
            <OptionPlace>
              {item.category}
              <ArrowRightIcon />
              {item.pageTitle}
            </OptionPlace>
          </Select.Option>
        )),
      );
    }
    if (!hits.length)
      options.push(
        <NotFound key={4}>
          <NotFoundImg src={observatory} alt="observatory" />
          <NotFoundText>We found something… it's nothing</NotFoundText>
        </NotFound>,
      );

    return options;
  };

  return (
    <Select
      interaction="focus"
      offset={0}
      stretch="fixed"
      value={location.pathname}
      onChange={(value) => history.push(value)}
    >
      <Select.Trigger tag={InputWrapper} inline={false}>
        {({ visible }, action) => {
          return (
            <>
              <DesktopInput
                autoFocus
                value={ru.toEn(currentRefinement)}
                isOpen={!!currentRefinement && visible}
                onChange={(e) => {
                  refine(ru.toEn(e.currentTarget.value));
                  action.visible(true);
                  action.highlightedIndex(0);
                }}
                onKeyDown={(e) => {
                  e.key === ' ' && e.stopPropagation();
                }}
                {...other}
              />
              <MobileInput
                isOpen={!!currentRefinement && visible}
                value={ru.toEn(currentRefinement)}
                onChange={(e) => {
                  refine(ru.toEn(e.currentTarget.value));
                  action.visible(true);
                  action.highlightedIndex(0);
                }}
                {...other}
              />
              <IconSearchWrapper>
                <SearchIcon />
              </IconSearchWrapper>
            </>
          );
        }}
      </Select.Trigger>
      <SelectPopper tag={Popper}>
        <IF condition={!!currentRefinement && searchResults}>
          <Select.List m={0} style={{ overflow: 'hidden' }}>
            {showList(hits, pages, content)}
          </Select.List>
        </IF>
      </SelectPopper>
    </Select>
  );
};

const SuggestSearch = withRouter(connectAutoComplete(connectStateResults(Search)));

function SearchHome(props) {
  return (
    <InstantSearch searchClient={searchClient} indexName={CONFIG.ALGOLIA_INDEX}>
      <SuggestSearch {...props} />
    </InstantSearch>
  );
}

export default SearchHome;
