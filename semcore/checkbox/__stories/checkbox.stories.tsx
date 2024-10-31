import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Flex } from '@semcore/flex-box';
import Checkbox from '@semcore/checkbox';
import { DescriptionTooltip } from '@semcore/tooltip';
import InfoM from '@semcore/icon/Info/m';
import Link from '@semcore/link';
import { ButtonLink } from '@semcore/button';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

const fieldsetStyle = { border: 'none' };
const ulStyle = {};
const liStyle = { listStyle: 'none', margin: 0 };

export const BasicExample: Story = {
  render: (props) => {
    const [checked, setChecked] = React.useState([false, false, false]);

    const handleItemChange = React.useCallback(
      (index: number) => (value: boolean) => {
        setChecked((checked) => checked.map((item, i) => (i === index ? value : item)));
      },
      [setChecked],
    );
    return (
      <fieldset style={fieldsetStyle}>
        <legend>Options list label</legend>
        <ul style={ulStyle}>
          {checked.map((value, index) => (
            <li key={index} style={liStyle}>
              <Checkbox
                mb={3}
                key={index}
                checked={value}
                onChange={handleItemChange(index)}
                label={`Option ${index + 1}`}
              />
            </li>
          ))}
        </ul>
      </fieldset>
    );
  },
};

export const PartialSelection: Story = {
  render: (props) => {
    const [checked, setChecked] = React.useState([false, false, false]);
    const handleGroupChange = React.useCallback(
      (value: boolean) => {
        setChecked((checked) => checked.map(() => value));
      },
      [setChecked],
    );
    const handleItemChange = React.useCallback(
      (index: number) => (value: boolean) => {
        setChecked((checked) => checked.map((item, i) => (i === index ? value : item)));
      },
      [setChecked],
    );
    return (
      <>
        <Flex>
          <Checkbox
            mb={3}
            label='Options group'
            onChange={handleGroupChange}
            indeterminate={checked.includes(false) && checked.includes(true)}
            checked={checked.includes(true)}
          />
        </Flex>
        {checked.map((value, index) => (
          <Flex key={index} ml={6}>
            <Checkbox
              mb={3}
              key={index}
              checked={value}
              onChange={handleItemChange(index)}
              label={`Option ${index + 1}`}
            />
          </Flex>
        ))}
      </>
    );
  },
};

function noop(e) {
  e.preventDefault();
}

export const CheckboxWithOtherСomponents: Story = {
  render: (props) => {
    return (
      <>
        <Flex>
          <Checkbox mb={3} label='Option 1' />
          <DescriptionTooltip placement='right'>
            <DescriptionTooltip.Trigger
              ml={1}
              tag={ButtonLink}
              addonLeft={InfoM}
              color='icon-secondary-neutral'
              aria-label='Additional info'
            />
            <DescriptionTooltip.Popper aria-label={'Additional info about checkbox item'}>
              Place an additional information here!
            </DescriptionTooltip.Popper>
          </DescriptionTooltip>
        </Flex>

        <Flex>
          <Checkbox mb={3}>
            <Checkbox.Value />
            <Checkbox.Text>
              Option 2
              <Link ml={2} href='#' onClick={noop}>
                Learn more
              </Link>
            </Checkbox.Text>
          </Checkbox>
        </Flex>
      </>
    );
  },
};

export const AdditionalPropsForInput: Story = {
  render: (props) => {
    return (
      <Checkbox>
        <Checkbox.Value>
          <Checkbox.Value.Control data-testid='checkbox_input_tag' />
          <Checkbox.Value.CheckMark />
        </Checkbox.Value>
        <Checkbox.Text>Value</Checkbox.Text>
      </Checkbox>
    );
  },
};
