import React, { useState, useEffect } from 'react';
import { InstantSearch } from 'react-instantsearch/dom';
import { connectAutoComplete } from 'react-instantsearch/connectors';
import algoliasearch from 'algoliasearch/lite';
import IllustrationGroup, {
  IllustrationGroups,
  ListIllustrations,
  IllustrationDetailsPanel,
} from './illustration-group';
import Input from 'intergalactic/input';
import { ButtonLink } from '@semcore/button';
import { Text } from 'intergalactic/typography';
import { NoData } from '@semcore/widget-empty';
import SearchM from 'intergalactic/icon/Search/m';
import CloseM from 'intergalactic/icon/Close/m';
import { algoliaConfig } from '../../../algoliaConfig';
import styles from './styles.module.css';
import { logEvent } from '../../.vitepress/theme/amplitude/amplitude.js';

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
      }, 500);

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
          aria-label={'Search illustrations'}
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

function SearchIllustrations(props) {
  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={algoliaConfig.illustrationsSearchIndexName}
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
        {inputValue.length ? (
          filterIllustrations.length ? (
            <ListIllustrations data={filterIllustrations} aria-label='Search results' />
          ) : (
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
        ) : (
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
