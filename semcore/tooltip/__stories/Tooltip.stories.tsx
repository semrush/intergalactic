import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Tooltip from '@semcore/tooltip';
import Select from '@semcore/select';
import { Text } from '@semcore/typography';
import { Flex } from '@semcore/flex-box';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

const options = Array(50)
  .fill('')
  .map((_, index) => `Option ${index}`);

const tooltipIndexContext = React.createContext<number>(0);

const TooltipContent: React.FC = () => {
  const tooltipIndex = React.useContext(tooltipIndexContext);
  return <>Option {tooltipIndex} description</>;
};

const SelectWithTooltip = React.memo(
  ({ setTooltipIndex }: { setTooltipIndex: (index: number) => void }) => {
    return (
      <Flex direction='column'>
        <Text tag='label' size={200} htmlFor='select-with-tooltips'>
          Select with tooltips
        </Text>
        <Select
          onHighlightedIndexChange={(index) => {
            if (index !== null) {
              setTooltipIndex(index);
            }
          }}
        >
          <Select.Trigger placeholder='Select option' mt={2} mr='auto' id='select-with-tooltips' />
          <Select.Menu>
            <Tooltip timeout={[0, 50]} placement='right'>
              {options.map((option, index) => (
                <Select.Option
                  onMouseEnter={() => setTooltipIndex(index)}
                  value={option}
                  key={index}
                  tag={Tooltip.Trigger}
                  // @ts-ignore
                  use:inline={false}
                >
                  {option}
                </Select.Option>
              ))}
              <Tooltip.Popper w={200}>
                <TooltipContent />
              </Tooltip.Popper>
            </Tooltip>
          </Select.Menu>
        </Select>
      </Flex>
    );
  },
  () => true,
);

export const Singleton: Story = {
  render: () => {
    const [tooltipIndex, setTooltipIndex] = React.useState<number>(0);
    return (
      <tooltipIndexContext.Provider value={tooltipIndex}>
        <SelectWithTooltip setTooltipIndex={setTooltipIndex} />
      </tooltipIndexContext.Provider>
    );
  },
};
