import React from 'react';
import { DatePicker } from '@semcore/ui/date-picker';
import { Flex } from '@semcore/ui/flex-box';
import ProgressBar from '@semcore/ui/progress-bar';

const stableRandom = (randomIndex: number) => {
  return Math.abs(Math.sin(Math.PI * randomIndex * Math.cos(100 - randomIndex++)));
};

const Demo = () => {
  const [value, setValue] = React.useState([new Date('2024-04-06')]);
  const [displayedPeriod, setDisplayedPeriod] = React.useState(new Date('2024-04-01')); 

 const disabledDates = [
    new Date('2024-04-28'),
    new Date('2024-04-29'),
    new Date(2024, 3, 27),
  ];

  const highlightedDates = [
    new Date('2024-04-10'), 
  ];

  const handleDisplayedPeriodChange = (newPeriod: Date) => {
    setDisplayedPeriod(newPeriod);
  };

  const handlePrevMonth = () => {
    const newMonth = new Date(displayedPeriod);
    newMonth.setMonth(displayedPeriod.getMonth() - 1);
    setDisplayedPeriod(newMonth);
  };

  const handleNextMonth = () => {
    const newMonth = new Date(displayedPeriod);
    newMonth.setMonth(displayedPeriod.getMonth() + 1);
    setDisplayedPeriod(newMonth);
  };

  return (
    <DatePicker>
      <DatePicker.Trigger mt={2} id="custom-day-example-picker" />
      <DatePicker.Popper>
        <DatePicker.Header>
          <DatePicker.Prev onClick={handlePrevMonth}/>
          <DatePicker.Title/>
          <DatePicker.Next onClick={handleNextMonth}/>
        </DatePicker.Header>
        <DatePicker.Calendar
          locale="en-US"
          disabled={disabledDates}
          highlighted={highlightedDates} 
          value={value} 
          onChange={setValue}
          displayedPeriod={displayedPeriod}
          renderOutdated={false}
        >
          {({ days }) =>
            days.map((data, i) => {
              const progress = stableRandom(i) * 100;
              return (
                <DatePicker.Calendar.Unit {...data} key={i}>
                  <Flex direction="column" p={1} w="100%" alignItems="center">
                    {data.children}
                    <ProgressBar
                      size="s"
                      duration={0}
                      value={progress}
                      theme="dark"
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
  );
};

export default Demo;
