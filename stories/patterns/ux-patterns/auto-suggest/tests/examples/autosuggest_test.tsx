import SearchL from '@semcore/icon/Search/l';
import SearchM from '@semcore/icon/Search/m';
import Badge from '@semcore/ui/badge';
import { Box, Flex } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import { AutoSuggest } from '@semcore/ui/select';
import Tag from '@semcore/ui/tag';
import { Text } from '@semcore/ui/typography';
import React from 'react';

type AddonType = 'none' | 'icon' | 'badge' | 'tag';

const buildAddon = (type: AddonType, size: 'm' | 'l'): React.ElementType | undefined => {
  if (type === 'icon') {
    return size === 'l' ? SearchL : SearchM;
  }
  if (type === 'badge') {
    return () => <Badge type='new' />;
  }
  if (type === 'tag') {
    return () => <Tag size={size === 'l' ? 'l' : 'm'}>Tag</Tag>;
  }
  return undefined;
};

const suggestions = [
  'Persian',
  '<img src=x onerror="alert(\'test\')">',
  '<b>cat</b>',
  'Sphynx/',
  '[Siamese',
  'Bengal]',
  'British Shorthair',
  'Abyssinian',
  'Birman',
  'Oriental Shorthair',
  'Scottish Fold',
  'Devon Rex',
  'Norwegian Forest',
  'Siberian',
  'Russian Blue',
  'Savannah',
  'American Shorthair',
  'Exotic Shorthair',
  'Ragamuffin',
  'Balinese',
];

export type AutosuggestTestProps = {
  suggestionsSource?: 'sync' | 'async';
  initialValue?: string;
  asyncDelay?: number;
  autoFocus?: boolean;
  width?: number;
  withPlaceholder?: boolean;
  placeholder?: string;
  size?: 'm' | 'l';
  readOnly?: boolean;
  statusItemPlaceholder?: string;
  addonLeft?: AddonType;
  addonRight?: AddonType;
  button?: 'none' | 'left' | 'right' | 'both';
  onChangeLog?: boolean;
};

export const autosuggestTestDefaultProps: Required<AutosuggestTestProps> = {
  suggestionsSource: 'sync',
  initialValue: '',
  asyncDelay: 1000,
  autoFocus: false,
  width: 250,
  withPlaceholder: true,
  placeholder: 'Start typing to see options',
  size: 'm',
  readOnly: false,
  statusItemPlaceholder: 'Start typing to see options',
  addonLeft: 'none',
  addonRight: 'none',
  button: 'none',
  onChangeLog: false,
};

const fakeFetch = async (query: string, signal: AbortSignal, delay: number): Promise<string[]> => {
  if (!query) return [];

  if (signal.aborted) {
    return [];
  }

  return new Promise((resolve) => {
    const onAbort = () => {
      signal.removeEventListener('abort', onAbort);
      resolve([]);
    };
    signal.addEventListener('abort', onAbort);

    setTimeout(() => {
      signal.removeEventListener('abort', onAbort);

      resolve(suggestions.filter((breed) => breed.toLowerCase().includes(query.toLowerCase())));
    }, delay);
  });
};

const Demo = (props: AutosuggestTestProps) => {
  const {
    suggestionsSource,
    initialValue,
    asyncDelay,
    autoFocus,
    width,
    withPlaceholder,
    placeholder,
    size,
    readOnly,
    statusItemPlaceholder,
    addonLeft,
    addonRight,
    button,
    onChangeLog,
  } = {
    ...autosuggestTestDefaultProps,
    ...props,
  };
  const [query, setQuery] = React.useState(initialValue);

  React.useEffect(() => {
    setQuery(initialValue);
  }, [initialValue]);

  const handleChange = (value: string, event?: unknown) => {
    setQuery(value);
    if (onChangeLog) {
      // Manual bug check: the second arg should be the change event, but it's
      // currently `undefined` (onChange regression after the compound extraction).
      console.log('AutoSuggest onChange → value:', value, '| event:', event);
    }
  };

  const getSuggestions = React.useCallback(
    (query: string, signal: AbortSignal) => fakeFetch(query, signal, asyncDelay),
    [asyncDelay],
  );

  // Memoized so the addon component identity is stable across keystrokes and only
  // changes when the addon type or input size changes.
  const addonLeftComponent = React.useMemo(() => buildAddon(addonLeft, size), [addonLeft, size]);
  const addonRightComponent = React.useMemo(() => buildAddon(addonRight, size), [addonRight, size]);

  const placeholderProp = withPlaceholder ? { placeholder } : {};

  let autoSuggestNeighbor: 'left' | 'right' | 'both' | undefined;
  if (button === 'left') {
    autoSuggestNeighbor = 'left';
  } else if (button === 'right') {
    autoSuggestNeighbor = 'right';
  } else if (button === 'both') {
    autoSuggestNeighbor = 'both';
  }

  const autoSuggestEl = (
    <AutoSuggest
      key={`${suggestionsSource}-${initialValue}-${asyncDelay}-${autoFocus}-${withPlaceholder}-${size}-${readOnly}-${addonLeft}-${addonRight}-${button}`}
      value={query}
      id='autosuggest'
      onChange={handleChange}
      suggestions={suggestionsSource === 'async' ? getSuggestions : suggestions}
      autoFocus={autoFocus}
      size={size}
      readOnly={readOnly}
      statusItemPlaceholder={statusItemPlaceholder}
      addonLeft={addonLeftComponent}
      addonRight={addonRightComponent}
      neighborLocation={autoSuggestNeighbor}
      {...placeholderProp}
    />
  );

  return (
    <>
      <Text tag='label' size={200} htmlFor='autosuggest'>
        Your pet breed
      </Text>
      {button === 'none'
        ? (
            <Box mt={2} w={width}>
              {autoSuggestEl}
            </Box>
          )
        : (
            <Flex mt={2} w={width}>
              {(button === 'left' || button === 'both') && (
                <Button size={size} neighborLocation='right'>
                  Go
                </Button>
              )}
              <Box flex={1} wMin={0}>
                {autoSuggestEl}
              </Box>
              {(button === 'right' || button === 'both') && (
                <Button size={size} neighborLocation='left'>
                  Go
                </Button>
              )}
            </Flex>
          )}
    </>
  );
};

export default Demo;
