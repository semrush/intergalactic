import React from 'react';
import Button from 'intergalactic/button';
import { Text } from 'intergalactic/typography';
import { Box } from 'intergalactic/flex-box';
import Select, { InputSearch } from 'intergalactic/select';
import { FilterTrigger } from 'intergalactic/base-trigger';
import Ellipsis from 'intergalactic/ellipsis';
import ReloadIcon from 'intergalactic/icon/Reload/m';

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

const data = serpFeatures.map((i, idx) => {
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
  const [filter, setFilter] = React.useState('');
  const options = React.useMemo(
    () => data.filter((option) => option.value.toLowerCase().includes(filter.toLowerCase())),
    [filter],
  );

  const handleChangeVisible = React.useCallback((visible: boolean) => {
    setVisible(visible);
    if (visible === true) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, []);

  const handleReloadClick = React.useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setError(false);
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
    triggerValue = `SERP Features: ${value[0] === null ? 'None' : value[0]}`;
  } else if (value.length > 1) {
    triggerValue = `SERP Features: ${value.length} selected`;
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
        <Select.Trigger tag={FilterTrigger}>{triggerValue}</Select.Trigger>
        <Select.Popper>
          {({ highlightedIndex }) => (
            <>
              <InputSearch
                value={filter}
                onChange={setFilter}
                placeholder='Search'
                role='combobox'
                aria-autocomplete='list'
                aria-controls='search-list'
                aria-owns='search-list'
                aria-expanded='true'
                aria-activedescendant={`option-${highlightedIndex}`}
              />
              {loading && (
                <Text tag={'div'} m={'10px 8px 11px 8px'} size={200} use={'secondary'}>
                  Loading...
                </Text>
              )}
              {!loading && error && (
                <>
                  <Text tag={'div'} m={'10px 8px 11px 8px'} size={200} use={'secondary'}>
                    Something went wrong.
                  </Text>
                  <Button addonLeft={ReloadIcon} onClick={handleReloadClick} use={'tertiary'}>
                    Reload
                  </Button>
                </>
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
                    orientation={'vertical'}
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
                    {!options.length && (
                      <Select.OptionHint key='Nothing'>Nothing found</Select.OptionHint>
                    )}
                  </Select.List>
                  {options.length > 0 && (
                    <>
                      <Select.Divider />
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

                      <Box m={'8px 8px 12px 8px'}>
                        <Button use={'primary'} w={'100%'}>
                          Apply
                        </Button>
                      </Box>
                    </>
                  )}
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
