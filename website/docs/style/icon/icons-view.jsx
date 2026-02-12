import { ButtonLink } from '@semcore/button';
import CloseM from '@semcore/icon/Close/m';
import SearchM from '@semcore/icon/Search/m';
import Input from '@semcore/input';
import { Text } from '@semcore/typography';
import { NoData } from '@semcore/widget-empty';
import algoliasearch from 'algoliasearch/lite';
import React, { useState, useEffect } from 'react';
import { connectAutoComplete } from 'react-instantsearch/connectors';
import { InstantSearch } from 'react-instantsearch/dom';

import IconGroup, { IconGroups, ListIcons, IconDetailsPanel } from './icon-group';
import { algoliaConfig } from '../../../algoliaConfig';
import { algoliaIndexes } from '../../../algoliaIndexes.ts';
import { logEvent } from '../../.vitepress/theme/amplitude/amplitude';

const searchClient = algoliasearch(algoliaConfig.appName, algoliaConfig.openKey);

let searchTimer = 0;

const SuggestSearch = connectAutoComplete(
  ({ currentRefinement, refine, hits, filteredIcons, onChangeValue, ...others }) => {
    const [message, setMessage] = React.useState('');

    const handleChangeValue = (value) => {
      onChangeValue(value);

      clearTimeout(searchTimer);
      searchTimer = setTimeout(() => {
        logEvent('icon:search', { value });
      }, 400);

      return refine(value);
    };

    useEffect(() => {
      filteredIcons(hits);
      if (currentRefinement)
        setMessage(`${hits.length ? hits.length : 'No'} result${hits.length === 1 ? '' : 's'}`);
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
          aria-label='Search icons'
          aria-describedby='search-message'
        />
        <Input.Addon
          tag={Text}
          id='search-message'
          role='status'
          aria-live='polite'
          color='text-secondary'
        >
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

const prefix = import.meta.env.VITE_CURRENT_VERSION === import.meta.env.VITE_LATEST ? 'latest' : import.meta.env.VITE_CURRENT_VERSION;

function SearchIcons(props) {
  return (
    <InstantSearch searchClient={searchClient} indexName={algoliaIndexes(prefix).iconsSearchIndexName}>
      <SuggestSearch {...props} />
    </InstantSearch>
  );
}

export default function ({ icons, old, json }) {
  const [inputValue, setInputValue] = useState('');
  const [filterIcons, setFilterIcons] = useState([]);
  const [selectedIcon, setSelectedIcon] = React.useState(null);
  const iconsContainerRef = React.useRef(null);

  return (
    <>
      {!old && <SearchIcons filteredIcons={setFilterIcons} onChangeValue={setInputValue} />}
      <IconGroups
        icons={icons}
        old={old}
        json={json}
        selectedIcon={selectedIcon}
        setSelectedIcon={setSelectedIcon}
        ref={iconsContainerRef}
      >
        {inputValue.length
          ? (
              filterIcons.length
                ? (
                    <ListIcons data={filterIcons} aria-label='Search results' />
                  )
                : (
                    <NoData
                      type='nothing-found'
                      description='Try entering another keyword, for example "key" or "play".'
                      style={{
                        borderRadius: 'var(--intergalactic-rounded-medium)',
                        border: 'solid 1px var(--intergalactic-border-secondary)',
                      }}
                      py={10}
                    />
                  )
            )
          : (
              <>
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
              </>
            )}
        <IconDetailsPanel
          name={selectedIcon}
          visible={selectedIcon !== null}
          onClose={(eventName, e) => {
            if (eventName === 'onCloseClick' || eventName === 'onEscape') {
              setTimeout(() => {
                const button = iconsContainerRef.current?.querySelector(
                  `[data-id="${selectedIcon}"]`,
                );

                button?.focus();
              }, 20);
            }
            if (e.target.getAttribute('data-name') !== 'PanelTrigger') {
              setSelectedIcon(null);
            }
          }}
        />
      </IconGroups>
    </>
  );
}
