import { Flex } from '@semcore/ui/base-components';
import { DatePicker } from '@semcore/ui/date-picker';
import ProgressBar from '@semcore/ui/progress-bar';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const stableRandom = (randomIndex: number) => {
  return Math.abs(Math.sin(Math.PI * randomIndex * Math.cos(100 - randomIndex++)));
};

const Demo = () => {
  return (
    <Flex direction='column'>
      <Text tag='label' size={200} htmlFor='custom-day-example-picker'>
        Date picker
      </Text>
      <div>
        <DatePicker>
          <DatePicker.Trigger mt={2} id='custom-day-example-picker' />
          <DatePicker.Popper>
            <DatePicker.Header />
            <DatePicker.Calendar>
              {({ days }) =>
                days.map((data, i) => {
                  const progress = stableRandom(i) * 100;
                  return (
                    <DatePicker.Calendar.Unit {...data} key={i}>
                      <Flex direction='column' p={1} w='100%' alignItems='center'>
                        {data.children}
                        <ProgressBar
                          size='s'
                          duration={0}
                          value={progress}
                          mt={1}
                          aria-label={`Progress is ${progress.toFixed(2)}%`}
                        />
                      </Flex>
                    </DatePicker.Calendar.Unit>
                  );
                })}
            </DatePicker.Calendar>
          </DatePicker.Popper>
        </DatePicker>
      </div>
    </Flex>
  );
};

export default Demo;
