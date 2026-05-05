import { Box, Flex } from '@semcore/ui/flex-box';
import Button from '@semcore/ui/button';
import Card from '@semcore/ui/card';
import Checkbox from '@semcore/ui/checkbox';
import Input from '@semcore/ui/input';
import InputMask from '@semcore/ui/input-mask';
import Select from '@semcore/ui/select';
import Textarea from '@semcore/ui/textarea';
import { Text } from '@semcore/ui/typography';
import React from 'react';

import { CardBodySkeleton } from '../CardBodySkeleton';
import { REQUEST_FORM_COUNTRIES, type RequestFormCountryKey } from './countries';
import { EmailTagsField } from './EmailTagsField';
import Switch from '../../../../../../../components/switch/docs/examples/basic_example';

type RequestFormProps = {
  mt?: number;
  contentReady?: boolean;
};

export function RequestForm({ mt = 4, contentReady = true }: RequestFormProps) {
  const phoneRef = React.useRef<HTMLInputElement>(null);
  const [country, setCountry] = React.useState<RequestFormCountryKey>('US');
  const prefix = REQUEST_FORM_COUNTRIES[country].prefix;
  const [phone, setPhone] = React.useState<string>(prefix);
  const [mask, setMask] = React.useState(REQUEST_FORM_COUNTRIES[country].mask);

  React.useEffect(() => {
    setPhone(prefix);
    setMask(REQUEST_FORM_COUNTRIES[country].mask);
  }, [country, prefix]);

  return (
    <Card mt={mt}>
      <Card.Header>
        <Card.Title innerHint='Something'>Request a Custom Plan</Card.Title>
      </Card.Header>
      <Card.Body tag={Flex} direction='column' gap={4}>
        <CardBodySkeleton contentReady={contentReady} h={400}>
          <>
            <Text size={300}>
              Please fill out and submit the contact form below to request a Custom Plan.
            </Text>

            <Flex direction='column' gap={6}>
              <Flex direction='column' gap={2}>
                <Text tag='label' size={300} htmlFor='request-form-name'>
                  Your name
                </Text>
                <Input size='l'>
                  <Input.Value id='request-form-name' />
                </Input>
              </Flex>

              <Flex direction='column' gap={2}>
                <Text tag='label' size={300} htmlFor='request-form-phone'>
                  Phone
                </Text>
                <Box w='100%'>
                  <Select
                    value={country}
                    onChange={(value: RequestFormCountryKey) => {
                      setCountry(value);
                      setTimeout(() => phoneRef.current?.focus(), 0);
                    }}
                    size='l'
                  >
                    <Select.Trigger aria-label='Country code' neighborLocation='right' />
                    <Select.Menu>
                      {Object.entries(REQUEST_FORM_COUNTRIES).map(([key, c]) => (
                        <Select.Option key={key} value={key}>
                          <Text size={200} mr={2}>
                            {c.name}
                          </Text>
                          <Text size={200} color='text-secondary'>
                            {c.prefix}
                          </Text>
                        </Select.Option>
                      ))}
                    </Select.Menu>
                  </Select>
                  <InputMask w='90%' neighborLocation='left' size='l'>
                    <InputMask.Value
                      id='request-form-phone'
                      ref={phoneRef}
                      value={phone}
                      onChange={(value) => setPhone(value)}
                      aliases={{ _: /\d/ }}
                      mask={mask}
                      type='tel'
                      autoComplete='tel'
                    />
                  </InputMask>
                </Box>
              </Flex>

              <EmailTagsField />

              <Flex direction='column' gap={2}>
                <Flex justifyContent='space-between' alignItems='baseline'>
                  <Text tag='label' size={300} htmlFor='request-form-details'>
                    Additional details
                  </Text>
                  <Text size={300} color='text-secondary'>
                    (optional)
                  </Text>
                </Flex>
                <Textarea size='l' id='request-form-details' />
              </Flex>

              <Checkbox size='l' label={'I agree to the Terms and Conditions\nand Privacy Policy'} />

              <Switch />
            </Flex>

            <Flex flexWrap gap={3} pt={4}>
              <Button size='l' use='primary' theme='success'>
                Send request
              </Button>
              <Button size='l' use='secondary' theme='muted'>
                Cancel
              </Button>
            </Flex>
          </>
        </CardBodySkeleton>
      </Card.Body>
    </Card>
  );
}
