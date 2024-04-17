import React from 'react';
import Select from 'intergalactic/select';
import DnD from 'intergalactic/drag-and-drop';
import { Flex } from 'intergalactic/flex-box';
import { Text } from 'intergalactic/typography';

const initialOptions = Array(6)
  .fill(0)
  .map((i, idx) => ({
    value: idx,
    title: `Awesome option ${idx}`,
  }));

const Demo = () => {
  const [options, setOptions] = React.useState(initialOptions);

  const handleDnD = React.useCallback(
    ({ fromIndex, toIndex }: { fromIndex: number; toIndex: number }) => {
      setOptions((options) => {
        const newOptions = [...options];
        const swap = newOptions[fromIndex];
        newOptions[fromIndex] = newOptions[toIndex];
        newOptions[toIndex] = swap;
        return newOptions;
      });
    },
    [options],
  );

  return (
    <Flex direction='column'>
      <Text tag='label' size={200} htmlFor='controlled-order-select'>
        Controlled order select
      </Text>
      <Select multiselect>
        <Select.Trigger mt={2} mr='auto' id='controlled-order-select' />
        <Select.Menu>
          {({ highlightedIndex }) => {
            return (
              <DnD onDnD={handleDnD} customFocus={highlightedIndex}>
                {options.map((option, idx) => {
                  const { value, title } = option;
                  return (
                    <DnD.Draggable tag={Select.Option} value={value} key={idx} pr={5}>
                      {title}
                    </DnD.Draggable>
                  );
                })}
              </DnD>
            );
          }}
        </Select.Menu>
      </Select>
    </Flex>
  );
};

export default Demo;
