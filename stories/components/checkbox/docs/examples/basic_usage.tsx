import React from 'react';
import Checkbox from '@semcore/checkbox';

const fieldsetStyle = { border: 'none' };
const ulStyle = {};
const liStyle = { listStyle: 'none', margin: 0 };

const Demo = () => {
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
};

export default Demo;
