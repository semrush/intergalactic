import React from 'react';
import { DatePicker } from '@semcore/date-picker';
import { Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';

const Demo = () => {
  return (
    <Flex direction='column'>
      <Text tag='label' size={200} htmlFor='trigger-and-popper-example-picker'>
        Date picker
      </Text>
      <DatePicker stretch='fixed'>
        <DatePicker.Trigger mt={2}>
          <DatePicker.Trigger.SingleDateInput>
            <DatePicker.Trigger.SingleDateInput.Indicator />
            <DatePicker.Trigger.SingleDateInput.MaskedInput id='trigger-and-popper-example-picker' />
          </DatePicker.Trigger.SingleDateInput>
        </DatePicker.Trigger>
        <DatePicker.Popper />
      </DatePicker>

      <Text tag='label' size={200} htmlFor='trigger-and-popper-example-picker'>
        Date picker disabled
      </Text>
      <DatePicker>
        <DatePicker.Trigger mt={2} disabled>
          <DatePicker.Trigger.SingleDateInput>
            <DatePicker.Trigger.SingleDateInput.Indicator />
            <DatePicker.Trigger.SingleDateInput.MaskedInput id='trigger-and-popper-example-picker' />
          </DatePicker.Trigger.SingleDateInput>
        </DatePicker.Trigger>
        <DatePicker.Popper />
      </DatePicker>

      <Text tag='label' size={200} htmlFor='trigger-and-popper-example-picker'>
        Date picker L
      </Text>
      <DatePicker>
        <DatePicker.Trigger mt={2} size='l'>
          <DatePicker.Trigger.SingleDateInput>
            <DatePicker.Trigger.SingleDateInput.Indicator />
            <DatePicker.Trigger.SingleDateInput.MaskedInput id='trigger-and-popper-example-picker' />
          </DatePicker.Trigger.SingleDateInput>
        </DatePicker.Trigger>
        <DatePicker.Popper />
      </DatePicker>

      <Text tag='label' size={200} htmlFor='trigger-and-popper-example-picker'>
        Date picker placeholder
      </Text>
      <DatePicker>
        <DatePicker.Trigger mt={2} size='l' >
          <DatePicker.Trigger.SingleDateInput placeholder='123' >
            <DatePicker.Trigger.SingleDateInput.Indicator/>
            <DatePicker.Trigger.SingleDateInput.MaskedInput id='trigger-and-popper-example-picker' />
          </DatePicker.Trigger.SingleDateInput>
        </DatePicker.Trigger>
        <DatePicker.Popper />
      </DatePicker>

      <Text tag='label' size={200} htmlFor='trigger-and-popper-example-picker'>
        Date picker placeholder
      </Text>
      <DatePicker>
        <DatePicker.Trigger mt={2} size='l' >
          <DatePicker.Trigger.SingleDateInput state = 'invalid' >
            <DatePicker.Trigger.SingleDateInput.Indicator/>
            <DatePicker.Trigger.SingleDateInput.MaskedInput id='trigger-and-popper-example-picker' />
          </DatePicker.Trigger.SingleDateInput>
        </DatePicker.Trigger>
        <DatePicker.Popper />
      </DatePicker>

      <Text tag='label' size={200} htmlFor='trigger-and-popper-example-picker'>
        Date picker placeholder
      </Text>
      <DatePicker>
        <DatePicker.Trigger mt={2} size='l'  >
          <DatePicker.Trigger.SingleDateInput state = 'valid' >
            <DatePicker.Trigger.SingleDateInput.Indicator/>
            <DatePicker.Trigger.SingleDateInput.MaskedInput id='trigger-and-popper-example-picker' />
          </DatePicker.Trigger.SingleDateInput>
        </DatePicker.Trigger>
        <DatePicker.Popper />
      </DatePicker>

      <Text tag='label' size={200} htmlFor='trigger-and-popper-example-picker'>
        Date picker placeholder
      </Text>
      <DatePicker>
        <DatePicker.Trigger mt={2} size='l' >
          <DatePicker.Trigger.SingleDateInput  >
            <DatePicker.Trigger.SingleDateInput.Indicator/>
            <DatePicker.Trigger.SingleDateInput.MaskedInput id='trigger-and-popper-example-picker' />
          </DatePicker.Trigger.SingleDateInput>
        </DatePicker.Trigger>
        <DatePicker.Popper />
      </DatePicker>


      <Text tag='label' size={200} htmlFor='trigger-and-popper-example-picker'>
        Date picker size in date picker
      </Text>
      <DatePicker stretch='fixed' size='l'>
        <DatePicker.Trigger mt={2}>
          <DatePicker.Trigger.SingleDateInput>
            <DatePicker.Trigger.SingleDateInput.Indicator />
            <DatePicker.Trigger.SingleDateInput.MaskedInput id='trigger-and-popper-example-picker' />
          </DatePicker.Trigger.SingleDateInput>
        </DatePicker.Trigger>
        <DatePicker.Popper />
      </DatePicker>

      <Text tag='label' size={200} htmlFor='trigger-and-popper-example-picker'>
        Placeholder without error tooltip
      </Text>
      <DatePicker
          value={new Date('January 1, 2021 00:00:00')}
          disabled={[new Date('January 1, 2021 00:00:00')]}
        >
          <DatePicker.Trigger disablePortal />
          <DatePicker.Popper />
        </DatePicker>

    </Flex>



  );
};

export default Demo;
