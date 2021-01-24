import React from 'react';
import Select from '@semcore/select';
import DnD from '@semcore/drag-and-drop';

function Demo() {
  const options = Array(6)
    .fill()
    .map((i, idx) => ({
      value: idx,
      title: `Awesome option ${idx}`,
    }));

  return (
    <Select multiselect>
      <Select.Trigger />
      <DnD tag={Select.Menu}>
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
