import { Flex } from '@semcore/ui/base-components';
import Checkbox from '@semcore/ui/checkbox';
import { Donut, Plot } from '@semcore/ui/d3-chart';
import React from 'react';

import DonutMockData from '../../../__mocks__/donut';

const Demo = () => {
  const [selected, setSelected] = React.useState(['b']);
  const handleCheckboxToggle = React.useCallback(
    (name: any) => () => {
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
    <Flex mt={3} alignItems='flex-start' flexWrap>
      <Plot height={120} width={120} mt={6} mb={6} data={data}>
        <Donut innerRadius={30}>
          {Object.keys(data).map((name, index) => (
            <Donut.Pie
              key={name}
              dataKey={name}
              name={`Pie ${index}`}
              active={selected.includes(name)}
            />
          ))}
        </Donut>
      </Plot>
      <Flex direction='column'>
        {Object.keys(data).map((name, index) => {
          return (
            <Checkbox key={name} id={name} theme={`chart-palette-order-${index + 1}`}>
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

const data = DonutMockData.Default;

export default Demo;
