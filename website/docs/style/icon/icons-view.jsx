import React, { useState, useEffect } from 'react';
import { InstantSearch } from 'react-instantsearch/dom';
import { connectAutoComplete } from 'react-instantsearch/connectors';
import algoliasearch from 'algoliasearch/lite';
import { Box } from '@semcore/flex-box';

import IconGroup, { IconGroups, ListIcons } from './icon-group';
import Input from '@semcore/input';
import { ButtonLink } from '@semcore/button';
import { NoData } from '@semcore/widget-empty';
import SearchM from '@semcore/icon/Search/m';
import CloseM from '@semcore/icon/Close/m';
import { algoliaConfig } from '../../../algoliaConfig';

const searchClient = algoliasearch(algoliaConfig.appName, algoliaConfig.openKey);

const SuggestSearch = connectAutoComplete(
  ({ currentRefinement, refine, hits, filteredIcons, onChangeValue, ...others }) => {
    const [message, setMessage] = React.useState('');

    const handleChangeValue = (value) => {
      onChangeValue(value);
      return refine(value);
    };
    useEffect(() => {
      filteredIcons(hits);
      if (currentRefinement)
        setMessage(
          `${hits.length ? `${hits.length} icon${hits.length === 1 ? '' : 's'}` : 'Nothing'} found`,
        );
      else setMessage('');
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
          aria-label={'Search icons'}
          aria-describedby={'search-count'}
        />
        <Input.Addon id='search-count' role='status' key='search-count'>
          {message}
        </Input.Addon>
        {!!currentRefinement && (
          <Input.Addon>
            <ButtonLink
              addonLeft={CloseM}
              use='secondary'
              onClick={() => handleChangeValue('')}
              title='Clear'
            />
          </Input.Addon>
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
          <Box
            style={{
              borderRadius: 'var(--intergalactic-rounded-medium)',
              border: 'solid 1px var(--intergalactic-border-secondary)',
            }}
          >
            <NoData my={10} mx='auto' type='nothing-found' />
          </Box>
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
