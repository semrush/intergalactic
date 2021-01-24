import React, { useRef } from 'react';
import { Box, Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';
import InputMask from '@semcore/input-mask';

export default () => {
  const expireDateInput = useRef(null);
  const handleSuccess = () => expireDateInput.current.focus();
  return (
    <Box wMax={240} p={8} m={'0 auto'} style={{ borderRadius: '12px', background: '#dee3e5' }}>
      <Text tag={'p'} size={300} medium mb={2}>
        Номер карты
      </Text>
      <InputMask size="l" mb={4}>
        <InputMask.Value
          mask="9999 9999 9999 9999"
          placeholder="____ ____ ____ ____"
          onSuccess={handleSuccess}
        />
      </InputMask>
      <Flex alignItems="center" justifyContent="flex-end">
        <Text tag="p" my={0} size={100} wMax={40}>
          Expire date
        </Text>
        <InputMask size="l" wMax={65}>
          <InputMask.Value ref={expireDateInput} mask="99/99" placeholder="__/__" pipe={datePipe} />
        </InputMask>
      </Flex>
    </Box>
  );
};
function datePipe(value) {
  const limits = [[0, 12], [19, 99]];
  const valueArr = value.split('/');
  const indexesOfPipedChars = [];
  const month = parseInt(valueArr[0], 10);

  // Добавляем 0 для месяца если значение больше 1
  if (month < 10 && month !== 1) {
    valueArr[0] = `0${month}`;
    indexesOfPipedChars.push(0);
  }

  const isInvalid = valueArr.some((value, index) => {
    const intValue = parseInt(value, 10);
    if (index === 1 && intValue < 10) return false;
    if (intValue < limits[index][0] || intValue > limits[index][1]) return true;
  });

  if (isInvalid) {
    return false;
  }
  return {
    value: valueArr.join('/'),
    indexesOfPipedChars,
  };
}
