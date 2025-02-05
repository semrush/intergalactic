import React from 'react';
import Checkbox from '@semcore/checkbox';
import { Text } from '@semcore/typography';

const fieldsetStyle = { border: 'none' };
const ulStyle = { margin: 0, padding: 0 };
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
      <Text tag='legend' size={200} mb={3}>
        List of options
      </Text>
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
