import {
  Plot,
  XAxis,
  YAxis,
  minMax,
  Area,
  interpolateValue,
  ChartLegend,
  makeDataHintsContainer,
} from '@semcore/ui/d3-chart';
import { scaleLinear } from 'd3-scale';
import { curveCardinal } from 'd3-shape';
import React from 'react';

function formatDate(value?: Date | number, options?: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat('en', options).format(value);
}

const dataHints = makeDataHintsContainer();

type DataItem = {
  time: Date;
  line1: number | typeof interpolateValue;
  line2: number | typeof interpolateValue;
};

const DemoPattern: React.FC<{ data: DataItem[] }> = ({ data }) => {
  const MARGIN = 40;
  const width = 500;
  const height = 300;

  const xScale = scaleLinear()
    .range([MARGIN, width - MARGIN])
    .domain(minMax(data, 'time'));

  const yScale = scaleLinear()
    .range([height - MARGIN, MARGIN])
    .domain([0, 10]);

  const [legendItems, setLegendItems] = React.useState(
    Object.keys(data[0])
      .filter((name) => name !== 'time')
      .map((item, index) => {
        return {
          id: item,
          label: `Line (${item})`,
          checked: true,
          color: `chart-palette-order-${index + 1}`,
        };
      }),
  );

  const handleChangeVisible = React.useCallback(
    (id: string, isVisible: boolean) => {
      setLegendItems((prevItems) => {
        return prevItems.map((item) => {
          if (item.id === id) {
            item.checked = isVisible;
          }

          return item;
        });
      });
    },
    [],
  );

  return (
    <>
      <ChartLegend
        dataHints={dataHints}
        items={legendItems}
        onChangeVisibleItem={handleChangeVisible}
        patterns
        aria-label='Legend for the area chart'
      />
      <Plot
        data={data}
        scale={[xScale, yScale]}
        width={width}
        height={height}
        dataHints={dataHints}
        patterns={true}
      >
        <YAxis>
          <YAxis.Ticks />
          <YAxis.Grid />
        </YAxis>
        <XAxis>
          <XAxis.Ticks ticks={data.map((d: any) => +d.time)}>
            {({ value }) => ({
              children: formatDate(value, {
                month: 'short',
                day: 'numeric',
              }),
            })}
          </XAxis.Ticks>
        </XAxis>
        {legendItems.map((item) => {
          return (
            item.checked && (
              <Area
                key={item.id}
                x='time'
                y={item.id}
                curve={curveCardinal}
                color={item.color}
              >
                <Area.Dots display />
              </Area>
            )
          );
        })}
      </Plot>
    </>
  );
};

const Demo: React.FC<{ data: DataItem[] }> = ({ data }) => {
  const MARGIN = 40;
  const width = 500;
  const height = 300;

  const xScale = scaleLinear()
    .range([MARGIN, width - MARGIN])
    .domain(minMax(data, 'time'));

  const yScale = scaleLinear()
    .range([height - MARGIN, MARGIN])
    .domain([0, 10]);

  const [legendItems, setLegendItems] = React.useState(
    Object.keys(data[0])
      .filter((name) => name !== 'time')
      .map((item, index) => {
        return {
          id: item,
          label: `Line (${item})`,
          checked: true,
          // color: `chart-palette-order-${index + 1}`,
        };
      }),
  );

  const handleChangeVisible = React.useCallback(
    (id: string, isVisible: boolean) => {
      setLegendItems((prevItems) => {
        return prevItems.map((item) => {
          if (item.id === id) {
            item.checked = isVisible;
          }

          return item;
        });
      });
    },
    [],
  );

  return (
    <>
      <ChartLegend
        dataHints={dataHints}
        // @ts-ignore
        items={legendItems}
        onChangeVisibleItem={handleChangeVisible}
        aria-label='Legend for the area chart'
      />
      <Plot
        data={data}
        scale={[xScale, yScale]}
        width={width}
        height={height}
        dataHints={dataHints}
      >
        <YAxis>
          <YAxis.Ticks />
          <YAxis.Grid />
        </YAxis>
        <XAxis>
          <XAxis.Ticks ticks={data.map((d: any) => +d.time)}>
            {({ value }) => ({
              children: formatDate(value, {
                month: 'short',
                day: 'numeric',
              }),
            })}
          </XAxis.Ticks>
        </XAxis>
        {legendItems.map((item) => {
          return (
            item.checked && (
              <Area
                key={item.id}
                x='time'
                y={item.id}
                curve={curveCardinal}
                // @ts-ignore
                color={item.color}
              >
                <Area.Dots display />
              </Area>
            )
          );
        })}
      </Plot>
    </>
  );
};

const getRandom = (min: any, max: any) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getData = (): DataItem[] => {
  return [
    {
      time: new Date(Date.now() + 5 * 60 * 60 * 1000),
      line1: 5,
      line2: 3,
    },
    {
      time: new Date(Date.now() + 10 * 60 * 60 * 1000),
      line1: 8,
      line2: interpolateValue,
    },
    {
      time: new Date(Date.now() + 15 * 60 * 60 * 1000),
      line1: 4,
      line2: 8,
    },
    {
      time: new Date(Date.now() + 20 * 60 * 60 * 1000),
      line1: 5,
      line2: interpolateValue,
    },
    {
      time: new Date(Date.now() + 25 * 60 * 60 * 1000),
      line1: 5,
      line2: interpolateValue,
    },
    {
      time: new Date(Date.now() + 30 * 60 * 60 * 1000),
      line1: getRandom(1, 10),
      line2: getRandom(1, 10),
    },
  ];
};

export const App = () => {
  const [data, setData] = React.useState(() => getData());

  React.useEffect(() => {
    const interval = setInterval(() => {
      setData(getData());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <DemoPattern data={data} />
      <Demo data={data} />
    </>
  );
};

export default App;
