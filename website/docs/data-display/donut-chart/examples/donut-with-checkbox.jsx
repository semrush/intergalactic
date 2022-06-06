import React from 'react';
import { colors, Donut, Plot } from '@semcore/d3-chart';
import Card from '@semcore/card';
import { Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';
import Tooltip from '@semcore/tooltip';
import InfoM from '@semcore/icon/Info/m';
import SettingsM from '@semcore/icon/Settings/m';
import Checkbox from '@semcore/checkbox';

export default () => {
  const [active, update] = React.useState(null);
  const onChange = (checked, e) => {
    const { id } = e.currentTarget;
    update(checked ? id : null);
  };

  const onActivePie = (e) => onChange(true, e);
  const onNormalPie = (e) => onChange(false, e);

  const COLORS = {
    a: colors['blue-03'],
    b: colors['green-02'],
    c: colors['violet-04'],
  };

  return (
    <Card my={6} pt={5} pb={6} px={6}>
      <Flex mb={2} alignItems="center" justifyContent="space-between">
        <Text tag="h3" size={400} medium mt={0} mx={0} mb={2}>
          Chart heading
          <Tooltip title="Awesome hint text">
            <InfoM ml="4px" color="gray-300" cursor="help" />
          </Tooltip>
        </Text>
        <SettingsM color="gray-300" interactive />
      </Flex>
      <Flex mt={3} alignItems="flex-start" flexWrap="wrap">
        <Plot height={120} width={120} m="0 28px 24px 0" data={data}>
          <Donut innerRadius={40}>
            {['a', 'b', 'c'].map((name, id) => (
              <Donut.Pie
                key={name}
                dataKey={name}
                color={COLORS[name]}
                name={`Pie ${id}`}
                active={name === active}
              />
            ))}
          </Donut>
        </Plot>
        <Text
          tag="table"
          size={100}
          mt="-4px"
          style={{
            borderCollapse: 'separate',
            borderSpacing: '0 4px',
          }}
        >
          {['a', 'b', 'c'].map((name) => {
            return (
              <tr>
                <td>
                  <Checkbox
                    key={name}
                    id={name}
                    onMouseOver={onActivePie}
                    onMouseOut={onNormalPie}
                    theme={COLORS[name]}
                  >
                    <Checkbox.Value value={name} />
                    <Checkbox.Text>{`${name} check`}</Checkbox.Text>
                  </Checkbox>
                </td>
              </tr>
            );
          })}
        </Text>
      </Flex>
    </Card>
  );
};

const data = {
  a: 3,
  b: 1,
  c: 2,
};
