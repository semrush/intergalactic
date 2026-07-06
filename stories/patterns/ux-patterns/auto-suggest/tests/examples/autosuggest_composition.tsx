import SearchL from '@semcore/icon/Search/l';
import SearchM from '@semcore/icon/Search/m';
import Badge from '@semcore/ui/badge';
import { Box, Flex } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import { AutoSuggest } from '@semcore/ui/select';
import Spin from '@semcore/ui/spin';
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
  'Maine Coon',
  'British Shorthair',
  'Sphynx',
  'Siamese',
  'Bengal',
  'Abyssinian',
  'Birman',
  'Oriental Shorthair',
  'Scottish Fold',
  'Devon Rex',
  'Norwegian Forest',
];

const fakeFetch = async (query: string, signal: AbortSignal, delay: number): Promise<string[]> => {
  if (!query) return [];
  if (signal.aborted) return [];

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

export type AutosuggestCompositionProps = {
  suggestionsSource?: 'sync' | 'async';
  asyncDelay?: number;
  size?: 'm' | 'l';
  width?: number;
  popperWidth?: number;
  popperMaxHeight?: number;
  placeholder?: string;
  statusItemPlaceholder?: string;
  addonLeft?: AddonType;
  addonRight?: AddonType;
  neighborLocation?: 'none' | 'left' | 'right' | 'both';
  customStartTyping?: boolean;
  customLoadingState?: boolean;
  customSuggestionItem?: boolean;
};

export const autosuggestCompositionDefaultProps: Required<AutosuggestCompositionProps> = {
  suggestionsSource: 'sync',
  asyncDelay: 1000,
  size: 'm',
  width: 320,
  popperWidth: 0,
  popperMaxHeight: 0,
  placeholder: 'Search...',
  statusItemPlaceholder: 'Start typing to see options',
  addonLeft: 'none',
  addonRight: 'none',
  neighborLocation: 'none',
  customStartTyping: true,
  customLoadingState: false,
  customSuggestionItem: false,
};

const Demo = (props: AutosuggestCompositionProps) => {
  const {
    suggestionsSource,
    asyncDelay,
    size,
    width,
    popperWidth,
    popperMaxHeight,
    placeholder,
    statusItemPlaceholder,
    addonLeft,
    addonRight,
    neighborLocation,
    customStartTyping,
    customLoadingState,
    customSuggestionItem,
  } = {
    ...autosuggestCompositionDefaultProps,
    ...props,
  };
  const [query, setQuery] = React.useState('');

  // neighborLocation squares the AutoSuggest corners adjacent to the button(s).
  let autoSuggestNeighbor: 'left' | 'right' | 'both' | undefined;
  if (neighborLocation !== 'none') {
    autoSuggestNeighbor = neighborLocation;
  }
  const hasLeftButton = neighborLocation === 'left' || neighborLocation === 'both';
  const hasRightButton = neighborLocation === 'right' || neighborLocation === 'both';

  const getSuggestions = React.useCallback(
    (q: string, signal: AbortSignal) => fakeFetch(q, signal, asyncDelay),
    [asyncDelay],
  );

  const addonLeftComponent = React.useMemo(() => buildAddon(addonLeft, size), [addonLeft, size]);
  const addonRightComponent = React.useMemo(() => buildAddon(addonRight, size), [addonRight, size]);

  // Popper sizing is optional; only pass when configured (0 = use defaults).
  // Note: stretch='min' (Dropdown default) keeps the popper at least as wide as
  // the trigger, so popperWidth can widen it but cannot narrow below the input.
  const popperProps: Record<string, unknown> = {};
  if (popperWidth) popperProps.w = popperWidth;
  if (popperMaxHeight) popperProps.hMax = popperMaxHeight;

  // Render subcomponents self-closing when not customized — passing children
  // (even `undefined`) overrides the built-in content, pass children
  // when we actually want a custom render.
  let loadingStateEl = <AutoSuggest.Popper.LoadingState itemsCount={0} />;
  if (customLoadingState) {
    loadingStateEl = (
      <AutoSuggest.Popper.LoadingState itemsCount={0}>
        <Flex alignItems='center' gap={2} data-testid='custom-loading'>
          <Spin size={size === 'l' ? 's' : 'xs'} />
          <Text>Fetching breeds…</Text>
        </Flex>
      </AutoSuggest.Popper.LoadingState>
    );
  }

  let startTypingStateEl = <AutoSuggest.Popper.StartTypingState itemsCount={0} />;
  if (customStartTyping) {
    startTypingStateEl = (
      <AutoSuggest.Popper.StartTypingState itemsCount={0}>
        <Flex alignItems='center' gap={2} data-testid='custom-start-typing'>
          <SearchM />
          <Text>Search for your favourite breed</Text>
        </Flex>
      </AutoSuggest.Popper.StartTypingState>
    );
  }

  let suggestionItemEl = <AutoSuggest.Popper.SuggestionItem itemsCount={0} />;
  if (customSuggestionItem) {
    suggestionItemEl = (
      <AutoSuggest.Popper.SuggestionItem itemsCount={0}>
        <Flex alignItems='center' gap={2} data-testid='custom-suggestion-item'>
          <SearchM />
          <Text>Custom option</Text>
        </Flex>
      </AutoSuggest.Popper.SuggestionItem>
    );
  }

  const autoSuggestEl = (
    <AutoSuggest
      key={`${suggestionsSource}-${size}-${addonLeft}-${addonRight}-${customStartTyping}-${customLoadingState}-${customSuggestionItem}-${neighborLocation}`}
      id='composition-autosuggest'
      value={query}
      onChange={setQuery}
      suggestions={suggestionsSource === 'async' ? getSuggestions : suggestions}
      size={size}
      placeholder={placeholder}
      statusItemPlaceholder={statusItemPlaceholder}
      addonLeft={addonLeftComponent}
      addonRight={addonRightComponent}
      neighborLocation={autoSuggestNeighbor}
    >
      <AutoSuggest.Trigger>
        <AutoSuggest.Trigger.Value />
      </AutoSuggest.Trigger>
      <AutoSuggest.Popper {...popperProps}>
        {loadingStateEl}
        {startTypingStateEl}
        <AutoSuggest.Popper.List hMax={popperMaxHeight}>
          {suggestionItemEl}
        </AutoSuggest.Popper.List>
      </AutoSuggest.Popper>
    </AutoSuggest>
  );

  return (
    <Box w={width}>
      <Text tag='label' size={200} htmlFor='composition-autosuggest'>
        Your pet breed
      </Text>
      {neighborLocation === 'none'
        ? (
            <Box mt={2}>
              {autoSuggestEl}
            </Box>
          )
        : (
            <Flex mt={2}>
              {hasLeftButton && (
                <Button size={size} neighborLocation='right'>
                  Go
                </Button>
              )}
              <Box flex={1} wMin={0}>
                {autoSuggestEl}
              </Box>
              {hasRightButton && (
                <Button size={size} neighborLocation='left'>
                  Go
                </Button>
              )}
            </Flex>
          )}
    </Box>
  );
};

export default Demo;
