import React from 'react';
import Button, { ButtonLink } from '@semcore/button';
import { Text } from '@semcore/typography';
import { Flex, Box, ScreenReaderOnly } from '@semcore/flex-box';
import Select, { InputSearch } from '@semcore/select';
import { FilterTrigger } from '@semcore/base-trigger';
import Ellipsis from '@semcore/ellipsis';
import ReloadIcon from '@semcore/icon/Reload/m';

const serpFeatures = [
  'Featured Snippet',
  'Local Pack',
  'Reviews',
  'AI Overviews',
  'Sitelinks',
  'Videos',
  'Top Stories',
  'Images',
  'Twitter',
  'Knowledge Panel',
  'FAQs',
  'People Also Ask',
  'Related Searches',
  'Google Flights Block',
  'Hotel Pack',
  'Job Listings',
  'Google Ads',
  'Shopping Ads (Product Listing Ads)',
  'Rich Snippets',
];

const data = serpFeatures.map((i: string) => {
  return {
    label: i,
    value: i,
  };
});

const compareSelectedValues = (value: string[], selectedValue: string[]): boolean => {
  if (value.length !== selectedValue.length) {
    return false;
  }
  return value.every((valueItem) => {
    return selectedValue.includes(valueItem);
  });
};

const valueHasSerpFeatures = (value: string[]): boolean => {
  return value.some((valueItem) => {
    return serpFeatures.includes(valueItem);
  });
};

const Demo = () => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(true);
  const [visible, setVisible] = React.useState(false);
  const [value, setValue] = React.useState<string[]>([]);
  const [search, setSearch] = React.useState('');
  const [message, setMessage] = React.useState('');

  const triggerRef = React.useRef<HTMLButtonElement>(null);

  const options = React.useMemo(
    () => data.filter((option) => option.value.toLowerCase().includes(search.toLowerCase())),
    [search],
  );

  const handleChangeVisible = React.useCallback((visible: boolean) => {
    setVisible(visible);
    if (visible === true) {
      setLoading(true);
      setMessage('Loading...');
      setTimeout(() => {
        setLoading(false);
        setMessage('Something went wrong.');
      }, 1000);
    }
  }, []);

  const handleReloadClick = React.useCallback(() => {
    setLoading(true);
    setMessage('Loading...');
    setTimeout(() => {
      setLoading(false);
      setError(false);
      console.log(triggerRef.current);
      triggerRef.current?.focus();
    }, 1000);
  }, []);

  const filteredValues = React.useMemo(() => {
    return options.map((o) => o.value);
  }, [options]);

  const handleSelectAll = React.useCallback(() => {
    const values = new Set([...value, ...filteredValues]);

    setValue(Array.from(values));

    return false;
  }, [value, filteredValues]);

  const handleDeselectAll = React.useCallback(() => {
    const values = value.filter((valueItem) => {
      return !filteredValues.includes(valueItem);
    });

    setValue(values);

    return false;
  }, [value, filteredValues]);

  const handleNoneClick = React.useCallback(() => {
    if (value.length === 1 && value[0] === null) {
      setValue([]);
    } else {
      setValue([null]);
    }
    return false;
  }, [value]);

  const handleChange = (value: string[]) => {
    setValue(value);
  };

  let triggerValue: string | undefined;

  if (value.length === data.length) {
    triggerValue = 'All selected';
  } else if (value.length === 1) {
    triggerValue = `${value[0] === null ? 'None' : value[0]}`;
  } else if (value.length > 1) {
    triggerValue = `${value.length} selected`;
  }

  const isAllSelected = compareSelectedValues(
    value,
    options.map((option) => option.value),
  );

  return (
    <>
      <Select
        placeholder='SERP Features'
        multiselect
        value={value}
        onChange={handleChange}
        visible={visible}
        onVisibleChange={handleChangeVisible}
      >
        <Select.Trigger aria-label='SERP Features' tag={FilterTrigger} triggerRef={triggerRef}>
          <span aria-hidden>SERP Features:</span> {triggerValue}
        </Select.Trigger>
        <Select.Popper aria-label='SERP Features'>
          {({ highlightedIndex }) => (
            <>
              <InputSearch
                value={search}
                onChange={setSearch}
                placeholder='Search' // remove if added to the component
                aria-label='Search' // remove if added to the component
                aria-describedby={search ? 'search-result' : undefined}
              />
              {(loading || error) && (
                <Flex direction='column' alignItems='start' gap={1} p={2}>
                  <Text size={200} use={'secondary'} aria-live='polite' role='status'>
                    {message}
                  </Text>
                  {error && !loading && (
                    <ButtonLink addonLeft={ReloadIcon} onClick={handleReloadClick}>
                      Reload
                    </ButtonLink>
                  )}
                </Flex>
              )}
              {!loading && !error && (
                <>
                  {options.length > 0 && (
                    <Select.Option
                      value={'%all%'}
                      onClick={isAllSelected ? handleDeselectAll : handleSelectAll}
                      disabled={value.length === 1 && value[0] === null}
                    >
                      <Text color='text-link'>{isAllSelected ? 'Deselect all' : 'Select all'}</Text>
                    </Select.Option>
                  )}

                  <Select.List
                    hMax={'224px'}
                    wMin={'224px'}
                    wMax={'260px'}
                    p={0}
                    id='search-list'
                    orientation={'vertical'} // is this necessary?
                    aria-label='SERP Features'
                  >
                    {options.map((option, index) => {
                      return (
                        <>
                          <Select.Option
                            value={option.value}
                            key={option.value}
                            id={`option-${index}`}
                            aria-selected={index === highlightedIndex}
                            disabled={value.length === 1 && value[0] === null}
                          >
                            <Select.Option.Checkbox />
                            <Ellipsis placement={'right'}>
                              <Ellipsis.Content>{option.label}</Ellipsis.Content>
                              <Ellipsis.Popper wMin={300}>{option.label}</Ellipsis.Popper>
                            </Ellipsis>
                          </Select.Option>
                        </>
                      );
                    })}
                    {options.length ? (
                      <ScreenReaderOnly id='search-result'>
                        {options.length} result{options.length > 1 && 's'} found
                      </ScreenReaderOnly>
                    ) : (
                      <Text
                        tag='div'
                        key='Nothing'
                        id='search-result'
                        use='secondary'
                        size={200}
                        p={2}
                      >
                        Nothing found
                      </Text>
                    )}
                  </Select.List>
                  <Select.Divider />
                  {options.length > 0 && (
                    <Select.Option
                      value={null}
                      key={'none'}
                      id={'option-null'}
                      onClick={handleNoneClick}
                      disabled={valueHasSerpFeatures(value)}
                    >
                      <Select.Option.Checkbox />
                      None
                    </Select.Option>
                  )}

                  <Box my={3} mx={2}>
                    <Button use={'primary'} w={'100%'}>
                      Apply
                    </Button>
                  </Box>
                </>
              )}
            </>
          )}
        </Select.Popper>
      </Select>
    </>
  );
};

export default Demo;
