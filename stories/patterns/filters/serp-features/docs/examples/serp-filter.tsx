import ReloadIcon from '@semcore/icon/Reload/m';
import { Flex, Box, ScreenReaderOnly, ScrollArea, hideScrollBarsFromScreenReadersContext } from '@semcore/ui/base-components';
import { FilterTrigger } from '@semcore/ui/base-trigger';
import Button, { ButtonLink } from '@semcore/ui/button';
import Select, { InputSearch } from '@semcore/ui/select';
import { Text } from '@semcore/ui/typography';
import React from 'react';

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
  'Shopping Ads (Product Listing Ads Block)',
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
  const applyButtonRef = React.useRef<HTMLButtonElement>(null);

  const options = React.useMemo(
    () => data.filter((option) => option.value.toLowerCase().includes(search.toLowerCase())),
    [search],
  );

  const filteredValues = React.useMemo(() => {
    return options.map((o) => o.value);
  }, [options]);

  const handleChangeVisible = React.useCallback(
    (visible: boolean) => {
      setVisible(visible);
      if (visible === true) {
        setValue(triggerValue);
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
    [setLoading, setMessage, setVisible, setValue, triggerValue],
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
    if (value.length === 1 && value[0] === '%none%') {
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

  const handleKeyDownTrigger = React.useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Tab' && value.length > 0 && visible) {
        e.preventDefault();
        e.stopPropagation();
        applyButtonRef.current?.focus();
      }
    },
    [value, visible],
  );

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
          onKeyDown={handleKeyDownTrigger}
        >
          <span aria-hidden>SERP Features:</span>
          {' '}
          {triggerValueText}
        </Select.Trigger>
        <Select.Popper wMax='260px' aria-label='SERP Features'>
          <InputSearch
            value={search}
            onChange={setSearch}
          />
          {loading && (<Select.StatusItem itemsCount={0} state='loading' />)}
          {!loading && error && (
            <Select.StatusItem itemsCount={0} state='error' tag={Flex} direction='column' alignItems='start' gap={1}>
              {message}
              <ButtonLink addonLeft={ReloadIcon} onClick={handleReloadClick}>
                Reload
              </ButtonLink>
            </Select.StatusItem>
          )}
          {!loading && !error && (
            <>
              <div
                role='listbox'
                aria-label='SERP Features'
                id='search-list'
                aria-multiselectable='true'
              >
                {options.length > 0 && (
                  <Select.Option
                    value='%all%'
                    onClick={isAllSelected ? handleDeselectAll : handleSelectAll}
                    disabled={value.length === 1 && value[0] === '%none%'}
                  >
                    <Select.Option.Text color='text-link'>{isAllSelected ? 'Deselect all' : 'Select all'}</Select.Option.Text>
                  </Select.Option>
                )}
                <hideScrollBarsFromScreenReadersContext.Provider value={true}>
                  <ScrollArea
                    shadow={true}
                    wMin='224px'
                    hMax='224px'
                    p={0}
                    orientation='vertical'
                  >
                    <ScrollArea.Container tabIndex={undefined}>
                      {options.map((option) => {
                        return (
                          <Select.Option
                            value={option.value}
                            key={option.value}
                            aria-selected={value.includes(option.value)}
                            disabled={value.length === 1 && value[0] === '%none%'}
                          >
                            <Select.Option.Checkbox />
                            <Select.Option.Text flex={1} ellipsis hint:placement='right'>{option.label} </Select.Option.Text>
                          </Select.Option>
                        );
                      })}
                    </ScrollArea.Container>
                    <ScrollArea.Bar orientation='vertical' />
                  </ScrollArea>
                </hideScrollBarsFromScreenReadersContext.Provider>
                <Select.StatusItem itemsCount={options.length} />

                {options.length > 0 && (
                  <Select.Option
                    value='%none%'
                    key='none'
                    onClick={handleNoneClick}
                    disabled={valueHasSerpFeatures(value)}
                  >
                    <Select.Option.Checkbox />
                    None
                  </Select.Option>
                )}
              </div>
              <Box my={1} mx={2}>
                <Button use='primary' w='100%' onClick={handleApply} ref={applyButtonRef}>
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
