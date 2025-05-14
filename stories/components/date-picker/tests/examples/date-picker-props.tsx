import React from 'react';
import { DatePicker } from '@semcore/ui/date-picker';
import { Text } from '@semcore/ui/typography';

const Demo = () => {
  const [value, setValue] = React.useState(new Date('2024-04-06'));
  const [displayedPeriod, setDisplayedPeriod] = React.useState(new Date('2024-04-01'));
  const [highlightedDates, setHighlightedDates] = React.useState([new Date('2024-04-10')]);

  const disabledErrorText = (attemptedDate: Date) => `Date ${attemptedDate.toDateString()} is disabled`;

  const handleDisplayedPeriodChange = (newDate: Date) => {
    setDisplayedPeriod(newDate);
  };

  return (
    <div>
      <DatePicker
        value={value} 
        onChange={(date: Date) => setValue(date)} 
        disabled={[new Date('2024-04-28'), new Date('2024-04-29')]} 
        disabledErrorText={disabledErrorText} 
        displayedPeriod={displayedPeriod} 
        onDisplayedPeriodChange={handleDisplayedPeriodChange} 
        size="l" 
        highlighted={highlightedDates} 
        defaultValue={new Date('2024-04-06')} 
        defaultDisplayedPeriod={new Date('2024-03-01')} 
        defaultHighlighted={[new Date('2024-04-10')]} 
      >
        <DatePicker.Trigger mt={2}>
          <DatePicker.Trigger.SingleDateInput>
            <DatePicker.Trigger.SingleDateInput.Indicator />
            <DatePicker.Trigger.SingleDateInput.MaskedInput id="trigger-and-popper-example-picker" />
          </DatePicker.Trigger.SingleDateInput>
        </DatePicker.Trigger>
        <DatePicker.Popper />
      </DatePicker>
    </div>
  );
};

export default Demo;
