import React from 'react';
import { DatePicker } from '@semcore/date-picker';
import ProgressBar from '@semcore/progress-bar';
import { Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';

const stableRandom = (randomIndex: number) => {
  return Math.abs(Math.sin(Math.PI * randomIndex * Math.cos(100 - randomIndex++)));
};

const Demo = () => {
  const [value, setValue] = React.useState(new Date('06/29/2020'));

  return (
    <Flex direction='column'>
      <Text tag='label' size={200} htmlFor='custom-day-example-picker'>
        Date picker
      </Text>
      <div>
        <DatePicker value={value} onChange={(date: any) => setValue(date)}>
          <DatePicker.Trigger mt={2} id='custom-day-example-picker' />
          <DatePicker.Popper>
            <DatePicker.Header />
            <DatePicker.Calendar>
              {({ days }) =>
                days.map((data, i) => {
                  const progress = stableRandom(i) * 100;
                  return (
                    <DatePicker.Calendar.Unit {...data} key={i}>
                      <Flex direction='column' p={1} w={'100%'} alignItems='center'>
                        {data.children}
                        <ProgressBar
                          size='s'
                          duration={0}
                          value={progress}
                          theme='dark'
                          mt={1}
                          aria-label={`Progress is ${progress.toFixed(2)}%`}
                        />
                      </Flex>
                    </DatePicker.Calendar.Unit>
                  );
                })
              }
            </DatePicker.Calendar>
          </DatePicker.Popper>
        </DatePicker>
      </div>
    </Flex>
  );
};

export default Demo;
