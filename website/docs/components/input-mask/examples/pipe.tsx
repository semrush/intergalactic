import React from 'react';
import { Box, Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';
import InputMask from '@semcore/input-mask';

const Demo = () => {
  const expireDateInput = React.useRef(null);
  const handleSuccess = React.useCallback(() => expireDateInput.current.focus(), []);

  return (
    <Flex
      direction='column'
      wMax={300}
      gap={2}
      p={8}
      mx='auto'
      style={{
        borderRadius: 'var(--intergalactic-surface-rounded)',
        background: 'var(--intergalactic-bg-secondary-neutral)',
      }}
    >
      <Text tag='label' size={300} htmlFor='card_number'>
        Card number
      </Text>
      <InputMask size='l' mb={2}>
        <InputMask.Value
          mask='9999 9999 9999 9999'
          placeholder='____ ____ ____ ____'
          onSuccess={handleSuccess}
          title='16 digits'
          id='card_number'
          autoComplete='cc-number'
        />
      </InputMask>
      <Flex alignItems='center' justifyContent='flex-end' gap={2}>
        <Text tag='label' size={300} htmlFor='expire_date'>
          Expiry date
        </Text>
        <InputMask size='l' wMax={85}>
          <InputMask.Value
            ref={expireDateInput}
            mask='99/99'
            placeholder='MM/YY'
            pipe={pipeExpireDate}
            title='Month and year, 4 digits in total'
            id='expire_date'
            autoComplete='cc-exp'
          />
        </InputMask>
      </Flex>
    </Flex>
  );
};

const pipeExpireDate = (maskedValue: string, conf: { rawValue: string }) => {
  let value = maskedValue;

  if (conf.rawValue.length === 7) {
    value = conf.rawValue
      .split('/')
      .map((valueItem, index) => {
        if (valueItem.length === 2) {
          return valueItem;
        }

        if (valueItem.length === 4 && index === 1) {
          return valueItem.toString().substring(2);
        }
      })
      .join('/');
  }

  const indexesOfPipedChars = [];
  const firstMonthDigit = parseInt(value[0], 10);
  if (firstMonthDigit > 1) {
    value = `0${value[0]}/${value.split('/')[1]}`;
    indexesOfPipedChars.push(0);
  }
  const [month, year] = value
    .split('/')
    .map((chunk) => (chunk.includes('_') ? undefined : parseInt(chunk, 10)));
  const currentYear = new Date().getFullYear() % 100;
  const currentMonth = new Date().getMonth() + 1;

  if (month > 12) return false;
  if (year === currentYear && month < currentMonth) return false;
  if (year < currentYear) return false;

  return { value, indexesOfPipedChars };
};

export default Demo;
