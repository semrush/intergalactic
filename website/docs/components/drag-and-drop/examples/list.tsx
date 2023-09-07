//https://github.com/semrush/intergalactic/tree/master/website/docs/components/drag-and-drop/examples/list.tsx
import React from 'react';
import Select from '@semcore/ui/select';
import DnD from '@semcore/ui/drag-and-drop';

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
    <Select multiselect>
      <Select.Trigger />
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
  );
};

export default Demo;
