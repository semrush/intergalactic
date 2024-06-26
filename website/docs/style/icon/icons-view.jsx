import React, { useState, useEffect } from 'react';
import { InstantSearch } from 'react-instantsearch/dom';
import { connectAutoComplete } from 'react-instantsearch/connectors';
import algoliasearch from 'algoliasearch/lite';
import { Flex } from '@semcore/flex-box';

import IconGroup, { IconGroups, ListIcons } from './icon-group';
import Input from 'intergalactic/input';
import { Text } from 'intergalactic/typography';
import SearchM from 'intergalactic/icon/Search/m';
import CloseM from 'intergalactic/icon/Close/m';
import staticFiles from '@static';
import { algoliaConfig } from '../../../algoliaConfig';

const searchClient = algoliasearch(algoliaConfig.appName, algoliaConfig.openKey);

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
      <Input size='l' mb={4}>
        <Input.Addon>
          <SearchM />
        </Input.Addon>
        <Input.Value
          {...others}
          onChange={handleChangeValue}
          value={currentRefinement}
          placeholder='What icon are you looking for?'
        />
        {!!currentRefinement && (
          <Input.Addon
            tag={CloseM}
            interactive
            onClick={() => handleChangeValue('')}
            aria-label='Clear field'
          />
        )}
      </Input>
    );
  },
);

function SearchIcons(props) {
  return (
    <InstantSearch searchClient={searchClient} indexName={algoliaConfig.iconsSearchIndexName}>
      <SuggestSearch {...props} />
    </InstantSearch>
  );
}

export default function ({ icons, old, json }) {
  const [inputValue, setInputValue] = useState('');
  const [filterIcons, setFilterIcons] = useState([]);

  return (
    <>
      {!old && <SearchIcons filteredIcons={setFilterIcons} onChangeValue={setInputValue} />}

      {inputValue.length ? (
        filterIcons.length ? (
          <ListIcons data={filterIcons} icons={icons} old={old} json={json} />
        ) : (
          <Flex
            justifyContent='center'
            alignItems='center'
            direction='column'
            p={5}
            style={{
              borderRadius: 'var(--intergalactic-rounded-medium)',
              border: 'solid 1px var(--intergalactic-border-secondary)',
            }}
          >
            <img src={staticFiles['search/observatory.svg']} alt='observatory' />
            <Text size={300} mt={2}>
              We found something… it's nothing
            </Text>
          </Flex>
        )
      ) : (
        <IconGroups icons={icons} old={old} json={json}>
          <IconGroup title='Navigation' />
          <IconGroup title='Action' />
          <IconGroup title='Status' />
          <IconGroup title='Social' />
          <IconGroup title='File' />
          <IconGroup title='Hardware' />
          <IconGroup title='Format' />
          <IconGroup title='Map' />
          <IconGroup title='AI' />
          <IconGroup title='SERP Features' />
          <IconGroup title='Misc' />
          {!old && <IconGroup title='Brand' />}
          <IconGroup title='Color' />
          <IconGroup title='Pay' />
          <IconGroup title='External' />
        </IconGroups>
      )}
    </>
  );
}
