import React from 'react';
import Checkbox from '@semcore/ui/checkbox';

const Demo = () => {
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
      <div>
        <Checkbox
          mb={3}
          label='Select all'
          onChange={handleGroupChange}
          indeterminate={checked.includes(false) && checked.includes(true)}
          checked={checked.includes(true)}
        />
      </div>
      {checked.map((value, index) => (
        <div key={index}>
          <Checkbox
            mb={3}
            key={index}
            checked={value}
            onChange={handleItemChange(index)}
            label={`Option ${index + 1}`}
          />
        </div>
      ))}
    </>
  );
};
