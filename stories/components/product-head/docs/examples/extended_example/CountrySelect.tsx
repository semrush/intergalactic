import Flags, { type FlagsIso2, iso2Name } from '@semcore/flags';
import { ScreenReaderOnly } from '@semcore/ui/base-components';
import { LinkTrigger } from '@semcore/ui/base-trigger';
import { Info } from '@semcore/ui/product-head';
import Select from '@semcore/ui/select';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const formatName = (name?: string) => name?.replace(/([a-z])([A-Z])/g, '$1 $2');

export function CountrySelect() {
  const flags = Object.keys(iso2Name) as FlagsIso2[];
  const countries = flags.map((code) => {
    return {
      value: code,
      children: <><Flags iso2={code as keyof typeof iso2Name} mr={2} />{formatName(iso2Name[code])}</>,
      label: formatName(iso2Name[code]),
    };
  });
  const [value, setValue] = React.useState(null);
  const [filter, setFilter] = React.useState('');
  const country = countries.filter((item) => {
    return item.value === value;
  })[0]?.label;
  const filteredCountries = React.useMemo(
    () =>
      countries.filter((option) => {
        return option.value.toString().toLowerCase().includes(filter.toLowerCase());
      }),
    [filter],
  );

  return (
    <Info.Item>
      <Info.Item.Label tag='label' htmlFor='select-location'>
        Location:
      </Info.Item.Label>
      <Select placeholder='Select country' value={value} onChange={setValue}>
        <Select.Trigger tag={LinkTrigger} m='auto' aria-label='Country'>
          {country}
        </Select.Trigger>
        <Select.Popper aria-label='Fruits with search' wMax={250}>
          <Select.InputSearch
            value={filter}
            onChange={setFilter}
            aria-describedby={filter ? 'search-result' : undefined}
          />
          <Select.List>
            {filteredCountries.map(({ value, children }) => (
              <Select.Option key={value} value={value}>
                {children}
              </Select.Option>
            ))}
            {filteredCountries.length
              ? (
                  <ScreenReaderOnly id='search-result' aria-hidden='true'>
                    {filteredCountries.length}
                    {' '}
                    result
                    {filteredCountries.length > 1 && 's'}
                    {' '}
                    found
                  </ScreenReaderOnly>
                )
              : (
                  <Text
                    tag='div'
                    id='search-result'
                    key='Nothing'
                    p='6px 8px'
                    size={200}
                    use='secondary'
                  >
                    Nothing found
                  </Text>
                )}
          </Select.List>
        </Select.Popper>
      </Select>
    </Info.Item>
  );
}
