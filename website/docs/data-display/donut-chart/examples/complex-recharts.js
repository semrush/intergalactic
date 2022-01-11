import React, { PureComponent } from 'react';
import { PieChart, Pie, Cell, Label, Tooltip as TooltipChart, getColor } from '@semcore/chart';
import Card from '@semcore/card';
import { Text } from '@semcore/typography';
import { Flex, Box } from '@semcore/flex-box';
import Tooltip from '@semcore/tooltip';
import Checkbox from '@semcore/checkbox';
import InfoXS from '@semcore/icon/lib/Info/m';
import SettingsS from '@semcore/icon/lib/Settings/m';

let data = [
  { domain: 'tut.by', value: 35844 },
  { domain: 'onliner.by', value: 17239 },
  { domain: 'news.ru', value: 13186 },
  { domain: 'money.ru', value: 6341 },
];

function formatThousands(n) {
  let s = '' + Math.floor(n),
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
      activeIndex: null,
      domains: data.reduce((acc, entry) => [...acc, entry.domain], []),
    };
  }
  changeActiveIndex = (activeIndex) => {
    this.setState({ activeIndex });
  };
  handleCheckedDomain = (domain, id) => () => {
    const { domains } = this.state;
    if (domains[id] === domain) {
      domains[id] = null;
    } else {
      domains[id] = domain;
    }
    this.setState({ domains: [...domains] });
    this.changeActiveIndex(null);
  };
  onPieClick = (data, index) => {
    const { activeIndex } = this.state;
    this.changeActiveIndex(activeIndex === index ? null : index);
  };

  render() {
    const { activeIndex, domains } = this.state;
    let indexInclude = 0;
    const dataPie = data.reduce((acc, entry) => {
      if (domains.includes(entry.domain)) {
        return [...acc, { ...entry, id: indexInclude++ }];
      }
      return acc;
    }, []);

    return (
      <Card my={6} pt={5} pb={6} px={6}>
        <Flex alignItems="center" justifyContent="space-between">
          <Text tag="h3" size={400} medium m={0}>
            Chart heading
            <Tooltip title="Awesome hint text">
              <InfoXS ml="4px" color="stone" cursor="help" />
            </Tooltip>
          </Text>
          <SettingsS color="stone" interactive />
        </Flex>
        <Flex mt={3} alignItems="flex-start" flexWrap>
          <PieChart height={196} width={196} style={{ margin: '0 20px 24px 0' }}>
            <Pie
              activeIndex={activeIndex}
              activeShape={{ outerRadius: 98, style: { cursor: 'pointer' } }}
              data={dataPie}
              dataKey="value"
              nameKey="domain"
              startAngle={90}
              endAngle={-270}
              innerRadius={60}
              outerRadius={90}
              onClick={this.onPieClick}
            >
              {dataPie.map((entry, id) => (
                <Cell
                  fill={getColor(entry.domain)}
                  key={entry.domain}
                  fillOpacity={activeIndex !== null && activeIndex !== id ? 0.3 : 1}
                />
              ))}
              <Label
                position="center"
                content={({ viewBox: { cx, cy } }) => (
                  <>
                    <text x={cx} y={cy} textAnchor="middle" verticalAnchor="middle">
                      <Text tag="tspan" size={500} bold>
                        {formatThousands(this.commonValue)}
                      </Text>
                      <Text
                        tag="tspan"
                        cssProperty="fill"
                        color="gray60"
                        x={cx}
                        y={cy + 15}
                        size={100}
                      >
                        value name
                      </Text>
                      <Text
                        tag="tspan"
                        cssProperty="fill"
                        color="gray60"
                        x={cx}
                        y={cy + 30}
                        size={100}
                      >
                        long
                      </Text>
                    </text>
                  </>
                )}
              />
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
              marginTop: '4px',
              borderCollapse: 'separate',
              borderSpacing: '0 4px',
            }}
          >
            {domains.map((name, id) => {
              let { domain, value, opacity = 0.3 } = data[id];
              const chartId =
                name !== null ? dataPie.filter((entry) => entry.domain === name)[0].id : null;

              if (
                (activeIndex === null && chartId !== null) ||
                (chartId === activeIndex && activeIndex !== null)
              ) {
                opacity = 1;
              }

              return (
                <tr>
                  <td>
                    <Checkbox style={{ opacity, cursor: 'pointer' }} theme={getColor(domain)}>
                      <Checkbox.Value
                        checked={name !== null}
                        onChange={this.handleCheckedDomain(domain, id)}
                      />
                      <Checkbox.Text tag={Text} pr={3}>
                        {domain}
                      </Checkbox.Text>
                    </Checkbox>
                  </td>
                  <Text color="gray60" pr={4} tag="td">
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
