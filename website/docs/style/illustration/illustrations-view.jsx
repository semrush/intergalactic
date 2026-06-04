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

import IllustrationGroup, {
  IllustrationGroups,
  ListIllustrations,
  IllustrationDetailsPanel,
} from './illustration-group';
import styles from './styles.module.css';
import { algoliaConfig } from '../../../algoliaConfig';
import { algoliaIndexes } from '../../../algoliaIndexes.ts';
import { logEvent } from '../../.vitepress/theme/amplitude/amplitude';

const searchClient = algoliasearch(algoliaConfig.appName, algoliaConfig.openKey);

let searchTimer = 0;

const SuggestSearch = connectAutoComplete(
  ({ currentRefinement, refine, hits, filteredIllustrations, onChangeValue, ...others }) => {
    const [message, setMessage] = React.useState('');

    const handleChangeValue = (value) => {
      onChangeValue(value);

      clearTimeout(searchTimer);
      searchTimer = setTimeout(() => {
        logEvent('illustration:search', { value });
      }, 400);

      return refine(value);
    };

    useEffect(() => {
      filteredIllustrations(hits);
      if (currentRefinement)
        setMessage(`${hits.length ? hits.length : 'No'} result${hits.length === 1 ? '' : 's'}`);
      else setMessage('');
    }, [currentRefinement, hits]);

    return (
      <Input size='l' mb={4} className={styles.search}>
        <Input.Addon>
          <SearchM />
        </Input.Addon>
        <Input.Value
          {...others}
          onChange={handleChangeValue}
          value={currentRefinement}
          placeholder='What illustration are you looking for?'
          aria-label='Search illustrations'
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
              title='Clear'
              onClick={() => handleChangeValue('')}
            />
          </Input.Addon>
        )}
      </Input>
    );
  },
);

const prefix = import.meta.env.VITE_CURRENT_VERSION === import.meta.env.VITE_LATEST ? 'latest' : import.meta.env.VITE_CURRENT_VERSION;

function SearchIllustrations(props) {
  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={algoliaIndexes(prefix).illustrationsSearchIndexName}
    >
      <SuggestSearch {...props} />
    </InstantSearch>
  );
}

export default function ({ illustrations, json }) {
  const [inputValue, setInputValue] = useState('');
  const [filterIllustrations, setFilterIllustrations] = useState([]);
  const [selectedIllustration, setSelectedIllustration] = React.useState(null);
  const illustrationContainerRef = React.useRef(null);

  return (
    <>
      <SearchIllustrations
        filteredIllustrations={setFilterIllustrations}
        onChangeValue={setInputValue}
      />
      <IllustrationGroups
        illustrations={illustrations}
        json={json}
        selectedIllustration={selectedIllustration}
        setSelectedIllustration={setSelectedIllustration}
        ref={illustrationContainerRef}
      >
        {inputValue.length
          ? (
              filterIllustrations.length
                ? (
                    <ListIllustrations data={filterIllustrations} aria-label='Search results' />
                  )
                : (
                    <NoData
                      type='nothing-found'
                      description='Try searching by illustration or group name, for example "mail" or "chart".'
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
                <IllustrationGroup title='States' />
                <IllustrationGroup title='Chart types' />
                <IllustrationGroup title='Data types' />
                <IllustrationGroup title='Errors' />
                <IllustrationGroup title='Other' />
              </>
            )}
        <IllustrationDetailsPanel
          name={selectedIllustration}
          visible={selectedIllustration !== null}
          onClose={(eventName, e) => {
            if (eventName === 'onCloseClick' || eventName === 'onEscape') {
              setTimeout(() => {
                const button = illustrationContainerRef.current?.querySelector(
                  `[data-id="${selectedIllustration}"]`,
                );

                button?.focus();
              }, 20);
            }
            if (e.target.getAttribute('data-name') !== 'PanelTrigger') {
              setSelectedIllustration(null);
            }
          }}
        />
      </IllustrationGroups>
    </>
  );
}
