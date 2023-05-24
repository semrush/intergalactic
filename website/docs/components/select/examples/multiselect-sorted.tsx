import React, { useState } from 'react';
import Select from '@semcore/ui/select';

const options = Array(20)
  .fill('')
  .map((i, idx) => ({
    value: idx,
    title: `Awesome option ${idx}`,
  }));

const Option = ({ value, title }) => (
  <Select.Option value={value} key={value}>
    <Select.Option.Checkbox />
    {title}
  </Select.Option>
);

export default () => {
  const [selected, setSelected] = useState([]);
  const [prevSelected, setPrevSelected] = useState([]);

  const handleVisibleChange = (value) => {
    if (value) return;
    setPrevSelected(options.filter((o) => selected.includes(o.value)));
  };

  const renderOptions = () => {
    if (!prevSelected.length) {
      return options.map((props) => <Option key={props.value} {...props} />);
    }
    const [checked, unchecked] = options.reduce(
      (acc, o) => {
        prevSelected.find((v) => v.value === o.value) ? acc[0].push(o) : acc[1].push(o);
        return acc;
      },
      [[], []],
    );
    return [
      ...checked.map((props) => <Option key={props.value} {...props} />),
      <Select.Divider />,
      ...unchecked.map((props) => <Option key={props.value} {...props} />),
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
