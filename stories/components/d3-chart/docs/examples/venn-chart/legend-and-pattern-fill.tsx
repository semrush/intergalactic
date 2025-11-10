import { Plot, Venn, ChartLegend } from '@semcore/ui/d3-chart';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const data = {
  'G': 200,
  'F': 200,
  'C': 500,
  'U': 1,
  'G/F': 100,
  'G/C': 100,
  'F/C': 100,
  'G/F/C': 100,
};

const defaultLegendItems = [
  {
    id: 'G',
    label: 'Good',
    checked: true,
    color: 'chart-palette-order-1',
  },
  {
    id: 'F',
    label: 'Fast',
    checked: true,
    color: 'chart-palette-order-2',
  },
  {
    id: 'C',
    label: 'Cheap',
    checked: true,
    color: 'chart-palette-order-3',
  },
  {
    id: 'U',
    label: 'Unknown',
    checked: true,
    color: 'chart-palette-order-4',
  },
];

const defaultIntersections = [
  {
    id: 'G/F',
    label: 'Good & Fast',
    visible: true,
  },
  {
    id: 'G/C',
    label: 'Fast',
    visible: true,
  },
  {
    id: 'F/C',
    label: 'Cheap',
    visible: true,
  },
  {
    id: 'G/F/C',
    label: 'Unknown',
    visible: true,
  },
];

const Demo = () => {
  const [legendItems, setLegendItems] = React.useState(() => defaultLegendItems);
  const intersectionItems = defaultIntersections.filter((intersection) => {
    const intersectionKeys = intersection.id.split('/');
    const disabled = intersectionKeys.some((key: string) => {
      return !legendItems.find((item) => item.id === key)?.checked;
    });

    return !disabled;
  });

  const handleChangeVisible = React.useCallback((id: string, isVisible: boolean) => {
    setLegendItems((prevItems) => {
      const newItems = prevItems.map((item) => {
        if (item.id === id) {
          item.checked = isVisible;
        }

        return item;
      });

      return newItems;
    });
  }, []);

  return (
    <>
      <ChartLegend
        items={legendItems}
        patterns
        aria-label='Venn chart legend'
        onChangeVisibleItem={handleChangeVisible}
      />
      <Plot height={300} width={400} data={data} patterns>
        <Venn>
          {legendItems.map(({ id, label, checked, color }) => {
            return checked && <Venn.Circle key={id} dataKey={id} name={label} color={color} />;
          })}
          {intersectionItems.map(({ id, label }) => (
            <Venn.Intersection key={id} dataKey={id} name={label} />
          ))}
          <Venn.Tooltip>
            {({ name, dataKey }) => {
              return {
                children: (
                  <>
                    <Venn.Tooltip.Title>{name}</Venn.Tooltip.Title>
                    {/* @ts-ignore */}
                    <Text bold>{data[dataKey]}</Text>
                  </>
                ),
              };
            }}
          </Venn.Tooltip>
        </Venn>
      </Plot>
    </>
  );
};

export default Demo;
