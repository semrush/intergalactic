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
import ArrowUpXS from '@semcore/icon/lib/ArrowUp/xs';
import ArrowDownXS from '@semcore/icon/lib/ArrowDown/xs';
import ActionReturnXS from '@semcore/icon/lib/ActionReturn/xs';

import convertKeyboard from '../utils/convert-keyboard';

import observatory from '../static/search/observatory.svg';
import CONFIG from '../algolia';

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

const Option = styled.span`
  padding: 0 28px;
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  text-decoration: none;
`;

const OptionText = styled.span`
  font-size: 16px;
  text-decoration: none;
`;

const OptionPlace = styled.span`
  font-size: 14px;
  color: #898d9a;
`;

const MenuFooter = styled.div`
  height: 60px;
  background-color: #f6f7f8;
  display: flex;
  align-items: center;
  padding: 0 28px;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
`;

const SelectPopper = styled(Select.Popper)`
  @media (max-width: 415px) {
    margin-left: -200px !important;
    width: 244px !important;
  }
`;

const MenuAction = styled.div`
  margin-right: 24px;
  font-size: 16px;
  line-height: 150%;
  color: #898d9a;
  display: flex;
  align-items: center;

  svg {
    margin-right: 4px;
  }
`;

const SuggestSearch = withRouter(
  connectAutoComplete(({ currentRefinement, refine, hits, history, ...other }) => {
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
              {hits.length ? (
                hits.map((item) => (
                  <Select.Option
                    tag={Option}
                    key={item.objectID}
                    value={item.slug}
                    disabled={item.disabled}
                  >
                    <OptionText>{item.title}</OptionText>
                    <OptionPlace>in: {item.category}</OptionPlace>
                  </Select.Option>
                ))
              ) : (
                <NotFound key={1}>
                  <NotFoundImg src={observatory} alt="observatory" />
                  <OptionText>We found something… it's nothing</OptionText>
                </NotFound>
              )}
            </Select.List>
            <MenuFooter>
              <MenuAction>
                <ArrowDownXS />
                <ArrowUpXS />
                <span>to navigate</span>
              </MenuAction>
              <MenuAction>
                <ActionReturnXS />
                <span>to select</span>
              </MenuAction>
              <MenuAction>
                <span>
                  <b>esc</b> to hide
                </span>
              </MenuAction>
            </MenuFooter>
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
