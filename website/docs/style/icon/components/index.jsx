import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { InstantSearch } from 'react-instantsearch/dom';
import { connectAutoComplete } from 'react-instantsearch/connectors';
import algoliasearch from 'algoliasearch/lite';

import IconGroup, { IconGroups, ListIcons } from './icon-group';
import Input from '@semcore/ui/input';
import { Text } from '@semcore/ui/typography';
import SearchS from '@semcore/ui/icon/Search/m';
import CloseXS from '@semcore/ui/icon/Close/m';
import staticFiles from '@static';
import algoliaConfig from '@components/algolia-config';

const searchClient = algoliasearch(algoliaConfig.ALGOLIA_APP, algoliaConfig.ALGOLIA_OPEN_KEY);

const NotFound = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  margin: auto;
  border-radius: 6px;
  border: solid 1px #d1d4db;
`;

const SuggestSearch = connectAutoComplete(
  ({ currentRefinement, refine, hits, filteredIcons, onChangeValue, ...others }) => {
    const handleChangeValue = (value) => {
      onChangeValue(value);
      return refine(value);
    };
    useEffect(() => {
      filteredIcons(hits);
    });

    return (
      <Input size="l" mb={4}>
        <Input.Addon>
          <SearchS />
        </Input.Addon>
        <Input.Value
          {...others}
          onChange={handleChangeValue}
          value={currentRefinement}
          placeholder="What icon are you looking for?"
        />
        {!!currentRefinement && (
          <Input.Addon
            tag={CloseXS}
            interactive
            onClick={() => handleChangeValue('')}
            aria-label="Clear field"
          />
        )}
      </Input>
    );
  },
);

function SearchIcons(props) {
  return (
    <InstantSearch searchClient={searchClient} indexName={algoliaConfig.ALGOLIA_INDEX_ICONS}>
      <SuggestSearch {...props} />
    </InstantSearch>
  );
}

export default function ({ icons, old, json }) {
  const [inputValue, updateInputValue] = useState('');
  const [filterIcons, updatefilterIcons] = useState([]);

  return (
    <>
      {!old && <SearchIcons filteredIcons={updatefilterIcons} onChangeValue={updateInputValue} />}

      {inputValue.length ? (
        filterIcons.length ? (
          <ListIcons data={filterIcons} icons={icons} old={old} json={json} />
        ) : (
          <NotFound>
            <img src={staticFiles['search/observatory.svg']} alt="observatory" />
            <Text size={300} mt={2}>
              We found something… it's nothing
            </Text>
          </NotFound>
        )
      ) : (
        <IconGroups icons={icons} old={old} json={json}>
          <IconGroup title="Navigation" />
          <IconGroup title="Action" />
          <IconGroup title="Status" />
          <IconGroup title="Social" />
          <IconGroup title="File" />
          <IconGroup title="Hardware" />
          <IconGroup title="Format" />
          <IconGroup title="Map" />
          <IconGroup title="Misc" />
          {!old && <IconGroup title="Brand" />}
          <IconGroup title="Color" />
          <IconGroup title="Pay" />
          <IconGroup title="External" />
        </IconGroups>
      )}
    </>
  );
}
