import React from 'react';
import Select from '@semcore/ui/select';
import DnD from '@semcore/ui/drag-and-drop';

const initialOptions = Array(6)
  .fill()
  .map((i, idx) => ({
    value: idx,
    title: `Awesome option ${idx}`,
  }));

function Demo() {
  const [options, setOptions] = React.useState(initialOptions);

  const handleDnD = React.useCallback(
    ({ fromIndex, toIndex }) => {
      const newOptions = [...options];
      newOptions[fromIndex] = options[toIndex];
      newOptions[toIndex] = options[fromIndex];
      setOptions(newOptions);
    },
    [options],
  );

  return (
    <Select multiselect>
      <Select.Trigger />
      <DnD tag={Select.Menu} onDnD={handleDnD}>
        {options.map((option, idx) => {
          const { value, title } = option;
          return (
            <DnD.Draggable tag={Select.Option} value={value} key={idx} pr={5}>
              {title}
            </DnD.Draggable>
          );
        })}
      </DnD>
    </Select>
  );
}

export default Demo;
