import React, { useState } from 'react';
import Select from '@semcore/select';

const options = Array(20)
  .fill('')
  .map((i, idx) => ({
    value: idx,
    title: `Awesome option ${idx}`,
  }));

const Option = ({ value, title }) => (
  <Select.OptionCheckbox value={value} key={value}>
    {title}
  </Select.OptionCheckbox>
);

export default () => {
  const [selected, setSelected] = useState([]);
  const [prevSelected, setPrevSelected] = useState([]);

  const handleVisibleChange = (val) => {
    if (!val) {
      setPrevSelected(options.filter((o) => selected.includes(o.value)));
    }
  };

  const renderOptions = () => {
    if (!prevSelected.length) {
      return options.map((option) => <Option {...option} />);
    }
    const [checked, unchecked] = options.reduce(
      (acc, o) => {
        prevSelected.find((v) => v.value === o.value) ? acc[0].push(o) : acc[1].push(o);
        return acc;
      },
      [[], []],
    );
    return [
      ...checked.map((o) => <Option {...o} />),
      <Select.Divider />,
      ...unchecked.map((o) => <Option {...o} />),
    ];
  };

  return (
    <Select
      value={selected}
      onChange={(v) => setSelected(v)}
      onVisibleChange={handleVisibleChange}
      multiselect
      placeholder="Select values"
    >
      <Select.Trigger />
      <Select.Menu hMax="240px">{renderOptions()}</Select.Menu>
    </Select>
  );
};
