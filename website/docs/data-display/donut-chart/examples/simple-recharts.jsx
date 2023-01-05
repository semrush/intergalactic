import React, { PureComponent } from 'react';
import { PieChart, Pie, Cell, Tooltip as TooltipChart, getColor } from '@semcore/chart';
import Card from '@semcore/ui/card';
import { Text } from '@semcore/ui/typography';
import { Flex, Box } from '@semcore/ui/flex-box';
import Tooltip from '@semcore/ui/tooltip';
import Checkbox from '@semcore/ui/checkbox';
import InfoXS from '@semcore/ui/icon/Info/m';
import SettingsS from '@semcore/ui/icon/Settings/m';

const data = [
  { domain: 'tut.by', value: 35844 },
  { domain: 'onliner.by', value: 17239 },
  { domain: 'roga&kopita.ru', value: 13186 },
  { domain: 'money.ru', value: 6341 },
];

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

class Demo extends PureComponent {
  constructor(props) {
    super(props);
    this.commonValue = data.reduce((acc, entry) => acc + entry.value, 0);
    this.state = {
      domains: data.reduce((acc, entry) => [...acc, entry.domain], []),
    };
  }

  handleCheckedDomain = (domain, id) => () => {
    const { domains } = this.state;
    if (domains[id] === domain) {
      domains[id] = null;
    } else {
      domains[id] = domain;
    }
    this.setState({ domains: [...domains] });
  };

  render() {
    const { domains } = this.state;
    let indexInclude = 0;
    const dataPie = data.reduce((acc, entry) => {
      if (domains.includes(entry.domain)) {
        return [...acc, { ...entry, id: indexInclude++ }];
      }
      return acc;
    }, []);

    return (
      <Card my={6} pt={5} pb={6} px={6}>
        <Flex mb={2} alignItems="center" justifyContent="space-between">
          <Text tag="h3" size={400} medium mt={0} mx={0} mb={2}>
            Chart heading
            <Tooltip title="Awesome hint text">
              <InfoXS ml="4px" color="gray-300" cursor="help" />
            </Tooltip>
          </Text>
          <SettingsS color="gray-300" interactive aria-label="Open settings" />
        </Flex>
        <Flex mt={3} alignItems="flex-start" flexWrap="wrap">
          <PieChart height={80} width={80} style={{ margin: '0 28px 24px 0' }}>
            <Pie
              data={dataPie}
              dataKey="value"
              nameKey="domain"
              startAngle={90}
              endAngle={-270}
              innerRadius={20}
              outerRadius={40}
            >
              {dataPie.map((entry) => (
                <Cell fill={getColor(entry.domain)} key={entry.domain} />
              ))}
            </Pie>
            <TooltipChart
              label="Value"
              formatter={(value, name, props) => {
                const { percent } = props;
                return (
                  <>
                    <Box tag="span" style={{ color: '#6C6E79', fontWeight: 'normal' }}>
                      {percent.toFixed(0)}%
                    </Box>
                    <Box tag="span" ml={3}>
                      {value}
                    </Box>
                  </>
                );
              }}
            />
          </PieChart>
          <Text
            tag="table"
            size={100}
            style={{
              marginTop: '-4px',
              borderCollapse: 'separate',
              borderSpacing: '0 4px',
            }}
            onMouseLeave={this.handleMouseLeave}
          >
            {domains.map((name, id) => {
              const { domain, value } = data[id];

              return (
                <tr>
                  <td>
                    <Checkbox style={{ cursor: 'pointer' }} theme={getColor(domain)}>
                      <Checkbox.Value
                        checked={name !== null}
                        onChange={this.handleCheckedDomain(domain, id)}
                      />
                      <Checkbox.Text pr={3}>
                        <Text>{domain}</Text>
                      </Checkbox.Text>
                    </Checkbox>
                  </td>
                  <Text color="gray-500" pr={4} tag="td">
                    {((value / this.commonValue) * 100).toFixed(0)}%
                  </Text>
                  <Text tag="td">{formatThousands(value)}</Text>
                </tr>
              );
            })}
          </Text>
        </Flex>
      </Card>
    );
  }
}

export default Demo;
