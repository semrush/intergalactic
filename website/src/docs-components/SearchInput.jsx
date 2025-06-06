import { ButtonLink } from '@semcore/button';
import CloseIcon from '@semcore/icon/Close/m/index.js';
import SearchIcon from '@semcore/icon/Search/m/index.js';
import Input from '@semcore/input';
import { Text } from '@semcore/typography';
import React from 'react';

import styles from './design-tokens.module.css';

export const SearchInput = ({
  filter,
  setFilter,
  resultsCount,
  placeholder,
  ariaLabel,
  statusAddonId = 'search-message',
}) => {
  const [message, setMessage] = React.useState('');

  React.useEffect(() => {
    if (filter)
      setMessage(`${resultsCount ? resultsCount : 'No'} result${resultsCount === 1 ? '' : 's'}`);
    else setMessage('');
  }, [filter, resultsCount]);

  return (
    <Input className={styles.nameFilterInput} size='l'>
      <Input.Addon>
        <SearchIcon />
      </Input.Addon>
      <Input.Value
        placeholder={placeholder}
        value={filter}
        onChange={setFilter}
        aria-label={ariaLabel}
        aria-describedby={statusAddonId}
      />
      <Input.Addon
        tag={Text}
        id={statusAddonId}
        role='status'
        aria-live='polite'
        color='text-secondary'
      >
        {message}
      </Input.Addon>
      {!!filter && (
        <Input.Addon>
          <ButtonLink
            addonLeft={CloseIcon}
            use='secondary'
            title='Clear'
            onClick={() => setFilter('')}
            id={`clear-${statusAddonId}`}
          />
        </Input.Addon>
      )}
    </Input>
  );
};
