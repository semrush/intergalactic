import React from 'react';
import Tooltip from 'intergalactic/tooltip';
import Select from 'intergalactic/select';

const options = Array(50)
  .fill('')
  .map((_, index) => `Option ${index}`);

const tooltipIndexContext = React.createContext(0);

const TooltipContent = () => {
  const tooltipIndex = React.useContext(tooltipIndexContext);
  return <>Option {tooltipIndex} description</>;
};

const SelectWithTooltip = React.memo(
  ({ setTooltipIndex }: { setTooltipIndex: (number) => void }) => {
    return (
      <Select onHighlightedIndexChange={setTooltipIndex}>
        <Select.Trigger placeholder='Select option' />
        <Select.Menu>
          <Tooltip timeout={[0, 50]} placement='right'>
            {options.map((option, index) => (
              <Select.Option
                onMouseEnter={() => setTooltipIndex(index)}
                value={option}
                key={index}
                tag={Tooltip.Trigger}
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
