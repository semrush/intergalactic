import ShowYesM from '@semcore/icon/ShowYes/m';
import { Box, Flex, NeighborLocation } from '@semcore/ui/base-components';
import Button, { ButtonLink } from '@semcore/ui/button';
import { DatePicker } from '@semcore/ui/date-picker';
import Input from '@semcore/ui/input';
import InputNumber from '@semcore/ui/input-number';
import Select from '@semcore/ui/select';
import { Text } from '@semcore/ui/typography';
import React from 'react';

type ExampleProps = {
  size: 'm' | 'l';
};

const options = [
  { value: 'Option 1', children: 'Option 1' },
  { value: 'Option 2', children: 'Option 2' },
];

const Demo = ({ size }: ExampleProps) => {
  return (
    <Flex direction='column' gap={8} p={2}>
      <Flex direction='column' gap={4} role='group' aria-label='Product compositions'>
        <Text size={300} bold>Product compositions</Text>

        <NeighborLocation tag={Flex} role='group' aria-label='primary buttons'>
          <Button size={size} use='primary'>First</Button>
          <Button size={size} use='primary'>Middle</Button>
          <Button size={size} use='primary'>Last</Button>
        </NeighborLocation>

        <NeighborLocation tag={Flex} role='group' aria-label='secondary buttons'>
          <Button size={size}>First</Button>
          <Button size={size}>Middle</Button>
          <Button size={size}>Last</Button>
        </NeighborLocation>

        <Box p={2} style={{ backgroundColor: '#191B23' }}>
          <NeighborLocation tag={Flex} role='group' aria-label='secondary invert buttons'>
            <Button size={size} theme='invert'>First</Button>
            <Button size={size} theme='invert'>Middle</Button>
            <Button size={size} theme='invert'>Last</Button>
          </NeighborLocation>
        </Box>

        <NeighborLocation tag={Flex} role='group' aria-label='input and secondary button'>
          <Input size={size} w={200}>
            <Input.Value placeholder='Placeholder' aria-label='input with secondary button' />
            <Input.Addon>
              <ButtonLink title='Test hint' use='secondary' addonLeft={ShowYesM} />
            </Input.Addon>
          </Input>
          <Button size={size}>Button</Button>
        </NeighborLocation>

        <NeighborLocation tag={Flex} role='group' aria-label='input and primary button'>
          <Input size={size} w={200}>
            <Input.Value placeholder='Placeholder' aria-label='input with primary button' />
          </Input>
          <Button size={size} use='primary'>Button</Button>
        </NeighborLocation>

        <NeighborLocation tag={Flex} role='group' aria-label='input and two buttons'>
          <Input size={size} w={200}>
            <Input.Value placeholder='Placeholder' aria-label='input with two buttons' />
          </Input>
          <Button size={size}>Apply</Button>
          <Button size={size}>Reset</Button>
        </NeighborLocation>

        <NeighborLocation tag={Flex} role='group' aria-label='disabled input and button'>
          <Input size={size} w={200} disabled>
            <Input.Value placeholder='Placeholder' aria-label='disabled input with button' />
          </Input>
          <Button size={size}>Button</Button>
        </NeighborLocation>

        <Flex role='group' aria-label='select and button'>
          <Select size={size} w={140} aria-label='select with button' neighborLocation='right' options={options} />
          <Button size={size} neighborLocation='left'>Button</Button>
        </Flex>

        <Flex role='group' aria-label='input, select and button'>
          <Input size={size} w={200} neighborLocation='right'>
            <Input.Value placeholder='Placeholder' aria-label='input with select and button' />
          </Input>
          <Select size={size} w={140} aria-label='select between input and button' neighborLocation='both' options={options} />
          <Button size={size} neighborLocation='left' use='primary'>Button</Button>
        </Flex>

        <Flex role='group' aria-label='date picker and button'>
          <DatePicker size={size}>
            <DatePicker.Trigger neighborLocation='right'>
              <DatePicker.Trigger.SingleDateInput>
                <DatePicker.Trigger.SingleDateInput.Indicator />
                <DatePicker.Trigger.SingleDateInput.MaskedInput aria-label='date with button' />
              </DatePicker.Trigger.SingleDateInput>
            </DatePicker.Trigger>
            <DatePicker.Popper />
          </DatePicker>
          <Button size={size} neighborLocation='left'>Button</Button>
        </Flex>

        <NeighborLocation tag={Flex} role='group' aria-label='input number and button'>
          <InputNumber size={size} w={120}>
            <InputNumber.Value placeholder='0' aria-label='input number with button' />
            <InputNumber.Controls />
          </InputNumber>
          <Button size={size}>Button</Button>
        </NeighborLocation>
      </Flex>

      <Flex direction='column' gap={4} role='group' aria-label='Smoke compositions'>
        <Text size={300} bold>Smoke: button before input</Text>

        <NeighborLocation tag={Flex} role='group' aria-label='button and input'>
          <Button size={size}>Button</Button>
          <Input size={size} w={200}>
            <Input.Value placeholder='Placeholder' aria-label='input after button' />
          </Input>
        </NeighborLocation>

        <NeighborLocation tag={Flex} role='group' aria-label='buttons around input'>
          <Button size={size}>Left</Button>
          <Input size={size} w={200}>
            <Input.Value placeholder='Placeholder' aria-label='input between buttons' />
          </Input>
          <Button size={size}>Right</Button>
        </NeighborLocation>
      </Flex>
    </Flex>
  );
};

export const defaultWrappingTestProps: ExampleProps = {
  size: 'm',
};

Demo.defaultProps = defaultWrappingTestProps;
export default Demo;
