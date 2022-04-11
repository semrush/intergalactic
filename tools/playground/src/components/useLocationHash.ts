import React from 'react';

export const useLocationHash = (): [
  value: string | null,
  setLocationHash: (value: string) => void,
] => {
  const getHashValue = React.useCallback(() => {
    let hash = location.hash;
    if (hash && hash[0] === '#') {
      hash = hash.substring(1);
    }
    return hash;
  }, []);
  const [value, setValue] = React.useState(getHashValue());

  React.useEffect(() => {
    const hashChangeHandler = () => {
      setValue(getHashValue());
    };
    addEventListener('hashchange', hashChangeHandler);
    return () => removeEventListener('hashchange', hashChangeHandler);
  }, [setValue, getHashValue]);

  const setLocationHash = React.useCallback(
    (value: string) => {
      location.hash = value;
      setValue(value);
    },
    [setValue],
  );

  return [value ?? null, setLocationHash];
};
