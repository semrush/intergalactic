import React from 'react';
import { Box, Flex } from '@semcore/ui/flex-box';
import { Text } from '@semcore/ui/typography';
import InputMask from '@semcore/ui/input-mask';

export default () => {
  const expireDateInput = React.useRef(null);
  const handleSuccess = React.useCallback(() => expireDateInput.current.focus(), []);

  return (
    <Box wMax={225} p={8} m='0 auto' style={{ borderRadius: '12px', background: '#F4F5F9' }}>
      <Text
        tag='label'
        size={300}
        medium
        mb={2}
        htmlFor='card_number'
        style={{ display: 'inline-block' }}
      >
        Card number
      </Text>
      <InputMask size='l' mb={4}>
        <InputMask.Value
          mask='9999 9999 9999 9999'
          placeholder='____ ____ ____ ____'
          onSuccess={handleSuccess}
          title='card number – 16-digits'
          id='card_number'
        />
      </InputMask>
      <Flex alignItems='center' justifyContent='flex-end'>
        <Text tag='label' mr={2} size={300} htmlFor='expire_date'>
          Expire date
        </Text>
        <InputMask size='l' wMax={85}>
          <InputMask.Value
            ref={expireDateInput}
            mask='99/99'
            placeholder='MM/YY'
            pipe={pipeExpireDate}
            title='month and year of card expiration – 4 digits in total'
            id='expire_date'
          />
        </InputMask>
      </Flex>
    </Box>
  );
};

const pipeExpireDate = (value) => {
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
