import React from 'react';
import { DatePicker } from 'intergalactic/date-picker';
import ProgressBar from 'intergalactic/progress-bar';
import { Flex } from 'intergalactic/flex-box';
import { Text } from 'intergalactic/typography';

function randomInteger(min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
}

const Demo = () => {
  return (
    <Flex direction='column'>
      <Text tag='label' size={200} htmlFor='custom-day-example-picker'>
        Date picker
      </Text>
      <DatePicker>
        <DatePicker.Trigger mt={2} id='custom-day-example-picker' />
        <DatePicker.Popper>
          <DatePicker.Header />
          <DatePicker.Calendar>
            {({ days }) =>
              days.map((data, i) => (
                <DatePicker.Calendar.Unit {...data} key={i}>
                  <Flex direction='column' p={1} w={'100%'} alignItems='center'>
                    {data.children}
                    <ProgressBar
                      size='s'
                      duration={0}
                      value={randomInteger(0, 100)}
                      theme='dark'
                      mt={1}
                    />
                  </Flex>
                </DatePicker.Calendar.Unit>
              ))
            }
          </DatePicker.Calendar>
        </DatePicker.Popper>
      </DatePicker>
    </Flex>
  );
};

export default Demo;
