import React from 'react';
import Input from '@semcore/input';
import InputMask from '@semcore/input-mask';
import Select from '@semcore/select';
import { Hint } from '@semcore/tooltip';
import { ButtonLink } from '@semcore/button';
import NeighborLocation from '@semcore/neighbor-location';
import Flag from '@semcore/flags';
import { Text } from '@semcore/typography';
import CloseM from '@semcore/icon/Close/m';
import { Box, Flex } from '@semcore/flex-box';

const Demo = () => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [country, setCountry] = React.useState<keyof typeof countries>('DE');
  const prefix = countries[country].prefix;
  const [phoneNumber, setPhoneNumber] = React.useState(prefix);
  const [phoneMask, setPhoneMask] = React.useState(`${prefix} (___)___-____`);

  return (
    <Flex direction='column'>
      <Text tag='label' htmlFor='phone-number-with-country-select' size={200}>
        Phone number
      </Text>
      <Box mt={2}>
        <NeighborLocation controlsLength={2}>
          <Select
            value={country}
            onChange={(newCountry: keyof typeof countries) => {
              setCountry(newCountry);
              const prefix = countries[newCountry].prefix;
              setPhoneNumber(prefix);
              setPhoneMask(`${prefix} (___)___-____`);
              setTimeout(() => {
                inputRef?.current?.focus();
              }, 1);
            }}
          >
            <Select.Trigger aria-label={'Country code'}>
              <Select.Trigger.Addon mx={0}>
                <Flag iso2={country} aria-label={countries[country].name} />
              </Select.Trigger.Addon>
            </Select.Trigger>

            <Select.Menu>
              {Object.keys(countries).map((country) => {
                const countryKey = country as keyof typeof countries;
                return (
                  <Select.Option key={countryKey} value={countryKey}>
                    <Text size={200} mr={2} aria-hidden='true'>
                      <Flag iso2={countryKey} />
                    </Text>
                    <Text size={200} mr={2}>
                      {countries[countryKey].name}
                    </Text>
                    <Text size={200} color='text-secondary'>
                      {countries[countryKey].prefix}
                    </Text>
                  </Select.Option>
                );
              })}
            </Select.Menu>
          </Select>
          <InputMask w={210}>
            <InputMask.Value
              id='phone-number-with-country-select'
              ref={inputRef}
              value={phoneNumber}
              onChange={setPhoneNumber}
              mask={phoneMask.replace(/_/g, '9')}
              type='tel'
              autoComplete='tel'
              title='10 digits, without country code'
            />
            {phoneNumber !== prefix && (
              <Input.Addon>
                <ButtonLink
                  use='secondary'
                  addonLeft={CloseM}
                  title='Clear'
                  onClick={() => setPhoneNumber(prefix)}
                />
              </Input.Addon>
            )}
          </InputMask>
        </NeighborLocation>
      </Box>
    </Flex>
  );
};

const countries = {
  DE: { name: 'Germany', prefix: '+49' },
  IT: { name: 'Italy', prefix: '+39' },
  NL: { name: 'Netherlands', prefix: '+31' },
  GB: { name: 'United Kingdom', prefix: '+44' },
};

export default Demo;
