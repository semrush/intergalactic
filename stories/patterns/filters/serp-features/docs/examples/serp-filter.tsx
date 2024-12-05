import React from 'react';
import Button, { ButtonLink } from '@semcore/button';
import { Text } from '@semcore/typography';
import { Flex, Box, ScreenReaderOnly } from '@semcore/flex-box';
import Select, { InputSearch } from '@semcore/select';
import { FilterTrigger } from '@semcore/base-trigger';
import Ellipsis from '@semcore/ellipsis';
import ReloadIcon from '@semcore/icon/Reload/m';
import ScrollAreaComponent, { hideScrollBarsFromScreenReadersContext } from '@semcore/scroll-area';

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
  const [triggerValue, setTriggerValue] = React.useState<string[]>([]);

  const triggerRef = React.useRef<HTMLButtonElement>(null);

  const options = React.useMemo(
    () => data.filter((option) => option.value.toLowerCase().includes(search.toLowerCase())),
    [search],
  );

  const handleChangeVisible = React.useCallback(
    (visible: boolean) => {
      setVisible(visible);
      if (visible === true) {
        setLoading(true);
        setTimeout(() => {
          setMessage('Loading...');
        }, 100);
        setTimeout(() => {
          setLoading(false);
          setMessage('Something went wrong.');
        }, 1000);
      } else {
        setValue([]);
      }
    },
    [setLoading, setMessage, setVisible, setValue],
  );

  const handleReloadClick = React.useCallback(() => {
    setLoading(true);
    setMessage('Loading...');
    setTimeout(() => {
      setLoading(false);
      setError(false);
      setValue(triggerValue);
      triggerRef.current?.focus();
    }, 1000);
  }, [triggerValue, triggerRef, setLoading, setMessage, setError, setValue]);

  const filteredValues = React.useMemo(() => {
    return options.map((o) => o.value);
  }, [options]);

  const handleSelectAll = React.useCallback(() => {
    const values = new Set([...value, ...filteredValues]);

    setValue(Array.from(values));

    return false;
  }, [value, filteredValues, setValue]);

  const handleDeselectAll = React.useCallback(() => {
    const values = value.filter((valueItem) => {
      return !filteredValues.includes(valueItem);
    });

    setValue(values);

    return false;
  }, [value, filteredValues, setValue]);

  const handleNoneClick = React.useCallback(() => {
    if (value.length === 1 && value[0] === null) {
      setValue([]);
    } else {
      setValue(['%none%']);
    }
    return false;
  }, [value, setValue]);

  const handleChange = (value: string[]) => {
    setValue(value);
  };

  const handleApply = () => {
    setTriggerValue(value);
    setVisible(false);
  };

  const handleClear = () => {
    setValue([]);
    setTriggerValue([]);
  };

  let triggerValueText: string | undefined;

  if (triggerValue.length === data.length) {
    triggerValueText = 'All selected';
  } else if (triggerValue.length === 1) {
    triggerValueText = `${triggerValue[0] === null ? 'None' : triggerValue[0]}`;
  } else if (triggerValue.length > 1) {
    triggerValueText = `${triggerValue.length} selected`;
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
        <Select.Trigger
          aria-label='SERP Features'
          tag={FilterTrigger}
          triggerRef={triggerRef}
          empty={triggerValue.length === 0}
          onClear={handleClear}
        >
          <span aria-hidden>SERP Features:</span> {triggerValueText}
        </Select.Trigger>
        <Select.Popper aria-label='SERP Features'>
          <InputSearch
            value={search}
            onChange={setSearch}
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
              <div
                role={'listbox'}
                aria-label='SERP Features'
                id='search-list'
                aria-multiselectable='true'
              >
                {options.length > 0 && (
                  <Select.Option
                    value={'%all%'}
                    onClick={isAllSelected ? handleDeselectAll : handleSelectAll}
                    disabled={value.length === 1 && value[0] === '%none%'}
                  >
                    <Text color='text-link'>{isAllSelected ? 'Deselect all' : 'Select all'}</Text>
                  </Select.Option>
                )}
                <hideScrollBarsFromScreenReadersContext.Provider value={true}>
                  <ScrollAreaComponent
                    shadow={true}
                    hMax={'224px'}
                    wMin={'224px'}
                    wMax={'260px'}
                    p={0}
                    orientation={'vertical'}
                  >
                    <ScrollAreaComponent.Container tabIndex={undefined}>
                      {options.map((option) => {
                        return (
                          <Select.Option
                            value={option.value}
                            key={option.value}
                            aria-selected={value.includes(option.value)}
                            disabled={value.length === 1 && value[0] === '%none%'}
                          >
                            <Select.Option.Checkbox />
                            <Ellipsis placement={'right'}>
                              <Ellipsis.Content flex={'auto'}>{option.label}</Ellipsis.Content>
                              <Ellipsis.Popper wMin={300}>{option.label}</Ellipsis.Popper>
                            </Ellipsis>
                          </Select.Option>
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
                    </ScrollAreaComponent.Container>
                    <ScrollAreaComponent.Bar orientation='vertical' />
                  </ScrollAreaComponent>
                </hideScrollBarsFromScreenReadersContext.Provider>

                {/*<Select.Divider mt={0} role={''} use:aria-orientation={undefined} />*/}
                {options.length > 0 && (
                  <Select.Option
                    value={'%none%'}
                    key={'none'}
                    onClick={handleNoneClick}
                    disabled={valueHasSerpFeatures(value)}
                  >
                    <Select.Option.Checkbox />
                    None
                  </Select.Option>
                )}
              </div>
              <Box my={3} mx={2}>
                <Button use={'primary'} w={'100%'} onClick={handleApply}>
                  Apply
                </Button>
              </Box>
            </>
          )}
        </Select.Popper>
      </Select>
    </>
  );
};

export default Demo;
