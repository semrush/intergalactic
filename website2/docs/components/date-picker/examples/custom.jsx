import React from 'react';
import { DatePicker } from '@semcore/date-picker';
import ProgressBar from '@semcore/progress-bar';
import { Flex } from '@semcore/flex-box';

function randomInteger(min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
}

function Demo() {
  return (
    <DatePicker>
      <DatePicker.Trigger />
      <DatePicker.Popper>
        <DatePicker.Header />
        <DatePicker.Calendar>
          {({ days }) =>
            days.map((data, i) => (
              <DatePicker.Calendar.Unit {...data} key={i}>
                <Flex direction="column" p={1} w={'100%'} alignItems="center">
                  {data.children}
                  <ProgressBar
                    size="s"
                    duration={0}
                    value={randomInteger(0, 100)}
                    theme="dark"
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
}

export default Demo;
