import React from 'react';
import Select from 'intergalactic/select';
import { Text } from 'intergalactic/typography';
import { Flex } from 'intergalactic/flex-box';

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

const Demo = () => {
  const [selected, setSelected] = React.useState([]);
  const [prevSelected, setPrevSelected] = React.useState([]);

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
    <Flex direction='column'>
      <Text tag='label' size={200} htmlFor='sortable-multiselect'>
        Sortable multiselect
      </Text>
      <Select
        value={selected}
        onChange={(v) => setSelected(v)}
        onVisibleChange={handleVisibleChange}
        multiselect
        placeholder='Select values'
      >
        <Select.Trigger mt={2} mr='auto' id='sortable-multiselect' />
        <Select.Menu hMax='240px'>{renderOptions()}</Select.Menu>
      </Select>
    </Flex>
  );
};

export default Demo;
