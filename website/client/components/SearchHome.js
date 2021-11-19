import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { InstantSearch } from 'react-instantsearch/dom';
import { connectAutoComplete } from 'react-instantsearch/connectors';
import algoliasearch from 'algoliasearch/lite';

import IF from '@semcore/utils/lib/if';
import { Box } from '@semcore/flex-box';
import Select from '@semcore/select';
import SearchM from '@semcore/icon/lib/Search/m';
import ArrowRight from '@semcore/icon/lib/ArrowRight/xxs';

import convertKeyboard from '../utils/convert-keyboard';

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
  border-radius: 6px;
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
  top: 50%;
  transform: translate(0, -50%);
  color: #171a22;
  @media (max-width: 415px) {
    left: 0;
  }
`;

const SearchIcon = styled(SearchM)`
  &:hover {
    cursor: default;
  }

  @media (max-width: 415px) {
    display: none;
  }
`;

const NotFound = styled.div`
  height: 142px;
  padding: 24px;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
  color: #575c66;
`;

const NotFoundImg = styled.img`
  flex: 1 0 100%;
  width: 80px;
  height: 80px;
  margin: 0 auto 4px auto;
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

const ArrowRightIcon = styled(ArrowRight)`
  margin: 0 4px;
  &:hover {
    cursor: default;
  }

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

const SuggestSearch = withRouter(
  connectAutoComplete(({ currentRefinement, refine, hits, history, ...other }) => {
    const pages = hits.filter((el) => !el.heading);
    const content = hits.filter((el) => el.heading);

    const showList = (hits, pages, content) => {
      let options = [];
      if (pages.length) {
        options.push(<OptionHeader tag={Option}>Pages</OptionHeader>);
        options.push(
          ...pages.map((item) => (
            <Select.Option
              tag={Option}
              key={item.objectID}
              value={item.slug}
              disabled={item.disabled}
            >
              <OptionText>{item.title}</OptionText>
              <OptionPlace>{item.category}</OptionPlace>
            </Select.Option>
          )),
        );
      }
      if (pages.length && content.length) {
        options.push(<Divider />);
      }
      if (content.length) {
        options.push(<OptionHeader tag={Option}>Content</OptionHeader>);
        options.push(
          ...content.map((item) => (
            <Select.Option
              tag={Option}
              key={item.objectID}
              value={item.slug}
              disabled={item.disabled}
            >
              <OptionText>{item.title}</OptionText>
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
          <NotFound key={1}>
            <NotFoundImg src={observatory} alt="observatory" />
            <OptionText>We found something… it's nothing</OptionText>
          </NotFound>,
        );

      return options;
    };

    return (
      <Select
        interaction="focus"
        offset={0}
        stretch="fixed"
        onChange={(value) => history.push(value)}
      >
        <Select.Trigger tag={InputWrapper} inline={false}>
          {({ visible }, action) => {
            return (
              <>
                <DesktopInput
                  autoFocus
                  isOpen={!!currentRefinement && visible}
                  onChange={(e) => {
                    refine(convertKeyboard(e.currentTarget.value));
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
                  onChange={(e) => {
                    refine(convertKeyboard(e.currentTarget.value));
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
          <IF condition={!!currentRefinement}>
            <Select.List m={0} h={225} style={{ overflow: 'hidden' }}>
              {showList(hits, pages, content)}
            </Select.List>
          </IF>
        </SelectPopper>
      </Select>
    );
  }),
);

function SearchHome(props) {
  return (
    <InstantSearch searchClient={searchClient} indexName={CONFIG.ALGOLIA_INDEX}>
      <SuggestSearch {...props} />
    </InstantSearch>
  );
}

export default SearchHome;
