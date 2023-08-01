import React, { useState, useEffect } from 'react';
import { InstantSearch } from 'react-instantsearch/dom';
import { connectAutoComplete } from 'react-instantsearch/connectors';
import algoliasearch from 'algoliasearch/lite';

import IllustrationGroup, { IllustrationGroups, ListIllustrations } from './illustration-group';
import Input from '@semcore/ui/input';
import { Text } from '@semcore/ui/typography';
import SearchM from '@semcore/ui/icon/Search/m';
import CloseM from '@semcore/ui/icon/Close/m';
import staticFiles from '@static';
import algoliaConfig from '@components/algolia-config';
import styles from './styles.module.css';

const searchClient = algoliasearch(algoliaConfig.ALGOLIA_APP, algoliaConfig.ALGOLIA_OPEN_KEY);

const SuggestSearch = connectAutoComplete(
  ({ currentRefinement, refine, hits, filteredIllustrations, onChangeValue, ...others }) => {
    const handleChangeValue = (value) => {
      onChangeValue(value);
      return refine(value);
    };
    useEffect(() => {
      filteredIllustrations(hits);
    });

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
        />
        {!!currentRefinement && (
          <Input.Addon>
            <CloseM interactive onClick={() => handleChangeValue('')} />
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
      indexName={algoliaConfig.ALGOLIA_INDEX_ILLUSTRATIONS}
    >
      <SuggestSearch {...props} />
    </InstantSearch>
  );
}

export default function ({ illustrations, json }) {
  const [inputValue, setInputValue] = useState('');
  const [filterIllustrations, setFilterIllustrations] = useState([]);

  return (
    <>
      {
        <SearchIllustrations
          filteredIllustrations={setFilterIllustrations}
          onChangeValue={setInputValue}
        />
      }

      {inputValue.length ? (
        filterIllustrations.length ? (
          <ListIllustrations data={filterIllustrations} illustrations={illustrations} json={json} />
        ) : (
          <div className={styles.notFound}>
            <img src={staticFiles['search/observatory.svg']} alt='observatory' />
            <Text size={300} mt={2}>
              We found something… it's nothing
            </Text>
          </div>
        )
      ) : (
        <IllustrationGroups illustrations={illustrations} json={json}>
          <IllustrationGroup title='States' />
          <IllustrationGroup title='Chart types' />
          <IllustrationGroup title='Data types' />
          <IllustrationGroup title='Errors' />
          <IllustrationGroup title='Other' />
        </IllustrationGroups>
      )}
    </>
  );
}
