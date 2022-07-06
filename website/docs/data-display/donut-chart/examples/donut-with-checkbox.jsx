import React from 'react';
import { colors, Donut, Plot } from '@semcore/d3-chart';
import { Flex } from '@semcore/flex-box';
import Checkbox from '@semcore/checkbox';

const data = { a: 3, b: 1, c: 2 };
const pieColors = [colors['blue-03'], colors['green-02'], colors['violet-04']];

export default () => {
  const [selected, setSelected] = React.useState(['b']);
  const handleCheckboxToggle = React.useCallback(
    (name) => () => {
      setSelected((selected) => {
        if (selected.includes(name)) {
          return selected.filter((selectedName) => selectedName !== name);
        } else {
          return [...selected, name];
        }
      });
    },
    [setSelected],
  );

  return (
    <Flex mt={3} alignItems="flex-start" flexWrap="wrap">
      <Plot height={120} width={120} m="0 28px 24px 0" data={data}>
        <Donut innerRadius={40}>
          {Object.keys(data).map((name, index) => (
            <Donut.Pie
              key={name}
              dataKey={name}
              color={pieColors[index]}
              name={`Pie ${index}`}
              active={selected.includes(name)}
            />
          ))}
        </Donut>
      </Plot>
      <Flex direction="column">
        {Object.keys(data).map((name, index) => {
          return (
            <Checkbox key={name} id={name} theme={pieColors[index]}>
              <Checkbox.Value
                value={name}
                checked={selected.includes(name)}
                onChange={handleCheckboxToggle(name)}
              />
              <Checkbox.Text>{`Option ${name.toUpperCase()}`}</Checkbox.Text>
            </Checkbox>
          );
        })}
      </Flex>
    </Flex>
  );
};
