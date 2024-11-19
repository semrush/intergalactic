import React from 'react';
import Tooltip from '@semcore/tooltip';
import Select from '@semcore/select';
import { Text } from '@semcore/typography';
import { Flex } from '@semcore/flex-box';

const options = Array(50)
  .fill('')
  .map((_, index) => `Option ${index}`);

const tooltipIndexContext = React.createContext(0);

const TooltipContent = () => {
  const tooltipIndex = React.useContext(tooltipIndexContext);
  return <>Option {tooltipIndex} description</>;
};

const SelectWithTooltip = React.memo(
  ({ setTooltipIndex }: { setTooltipIndex: (number: number) => void }) => {
    const handleHighlightedIndexChange = React.useCallback(
      (index: number | null) => {
        if (index !== null) {
          setTooltipIndex(index);
        }
      },
      [setTooltipIndex],
    );
    return (
      <Flex direction='column'>
        <Text tag='label' size={200} htmlFor='select-with-tooltips'>
          Select with tooltips
        </Text>
        <Select onHighlightedIndexChange={handleHighlightedIndexChange}>
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

const Demo = () => {
  const [tooltipIndex, setTooltipIndex] = React.useState(0);

  return (
    <tooltipIndexContext.Provider value={tooltipIndex}>
      <SelectWithTooltip setTooltipIndex={setTooltipIndex} />
    </tooltipIndexContext.Provider>
  );
};

export default Demo;
