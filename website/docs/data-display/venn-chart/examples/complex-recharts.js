import React, { useState } from 'react';
import Card from '@semcore/card';
import { Text } from '@semcore/typography';
import { Flex } from '@semcore/flex-box';
import Tooltip from '@semcore/tooltip';
import Checkbox from '@semcore/checkbox';
import InfoXS from '@semcore/icon/lib/Info/xs';
import SettingsS from '@semcore/icon/lib/Settings/s';
import { VennChart, VennArea, Tooltip as RechartsTooltip, getColor } from '@semcore/chart';

function formatThousands(n) {
  var s = '' + Math.floor(n),
    d = n % 1,
    i = s.length,
    r = '';
  while ((i -= 3) > 0) {
    r = ',' + s.substr(i, 3) + r;
  }
  return s.substr(0, i + 3) + r + (d ? '.' + Math.round(d * Math.pow(10, 2)) : '');
}

const data = [
  { sets: ['A'], name: 'First set', size: 120000 },
  { sets: ['B'], name: 'Second set', size: 230000 },
  { sets: ['C'], name: 'Third set', size: 10000 },
  { sets: ['A', 'B'], size: 2000 },
];

const sets = data.reduce((acc, item) => {
  if (item.sets.length > 1) return acc;
  return [...acc, item.name];
}, []);

const Demo = () => {
  const [setNames, updateSets] = useState(sets);

  const handleCheck = (name) => () => {
    const newSetNames = setNames.includes(name)
      ? setNames.filter((item) => item !== name)
      : [...setNames, name];
    updateSets(newSetNames);
  };

  return (
    <Card my={6} pt={5} px={6}>
      <Flex mb={2} alignItems="center" justifyContent="space-between">
        <Text tag="h3" size={400} medium mt={0} mx={0} mb={2}>
          Chart heading
          <Tooltip title="Awesome hint text">
            <InfoXS ml="4px" color="stone" interactive />
          </Tooltip>
        </Text>
        <SettingsS color="stone" interactive />
      </Flex>
      <Flex mt={3} alignItems="flex-start" justifyContent="flex-start" flexWrap={true}>
        <VennChart
          data={data}
          width={320}
          height={240}
          style={{ margin: '0 28px 24px 0' }}
          tooltipLabelIntersectionSizeFormatter={formatThousands}
        >
          {data.map(({ name, sets }) => {
            if (sets.length === 1) {
              return (
                <VennArea
                  name={name}
                  hidden={!setNames.includes(name)}
                  fill={getColor(name)}
                  key={name}
                />
              );
            }
          })}
          <RechartsTooltip formatter={formatThousands} />
        </VennChart>
        <Text
          tag="table"
          size={100}
          style={{
            marginTop: '-4px',
            marginBottom: '24px',
            borderCollapse: 'separate',
            borderSpacing: '0 4px',
          }}
        >
          <tbody>
            {data.map((item) => {
              const { sets, name, size } = item;
              if (sets.length > 1) {
                return null;
              }
              return (
                <tr key={name}>
                  <td>
                    <Checkbox style={{ cursor: 'pointer' }} theme={getColor(name)}>
                      <Checkbox.Value
                        checked={setNames.includes(name)}
                        onChange={handleCheck(name)}
                      />
                      <Checkbox.Text tag={Text} pr={3}>
                        {name}
                      </Checkbox.Text>
                    </Checkbox>
                  </td>
                  <Text tag="td">{size}</Text>
                </tr>
              );
            })}
          </tbody>
        </Text>
      </Flex>
    </Card>
  );
};

export default Demo;
