import React from 'react';
import { DatePicker } from '@semcore/ui/date-picker';
import ProgressBar from '@semcore/ui/progress-bar';
import { Flex } from '@semcore/ui/flex-box';

function randomInteger(min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
}

const Demo = () => {
  return (
    <DatePicker>
      <DatePicker.InputTrigger />
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
  );
};

export default Demo;
