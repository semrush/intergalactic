import React from 'react';
import DnD from 'intergalactic/drag-and-drop';
import Card from 'intergalactic/card';
import { Flex } from 'intergalactic/flex-box';
import Pills from 'intergalactic/pills';
import TabLine from 'intergalactic/tab-line';
import { Chart } from 'intergalactic/d3-chart';
import MathPlusL from 'intergalactic/icon/MathPlus/l';
import { Text } from 'intergalactic/typography';

const stableRandom = (seed: number) => {
  let randomIndex = seed;
  return () => {
    if (randomIndex > 20) randomIndex = 1;
    return Math.abs(Math.sin(Math.PI * randomIndex * Math.cos(100 - randomIndex++)));
  };
};
const Widget: React.FC<{ title: string }> = ({ title }) => {
  const data = React.useMemo(() => {
    const random = stableRandom(title.length);
    const dateFormatter = new Intl.DateTimeFormat('en', { month: 'numeric', day: 'numeric' });
    return Array(4)
      .fill(0)
      .map((_, i) => ({
        date: dateFormatter.format(new Date(Date.now() - 1000 * 60 * 60 * 24 * 3 * i)),
        value: Math.round(random() * 30),
      }));
  }, [title]);

  return (
    <Card w={235}>
      <Card.Header>
        <Card.Title>{title}</Card.Title>
      </Card.Header>
      <Card.Body>
        <Flex justifyContent='space-between'>
          <Pills defaultValue='a'>
            <Pills.Item value={'a'}>A</Pills.Item>
            <Pills.Item value={'b'}>B</Pills.Item>
            <Pills.Item value={'c'}>C</Pills.Item>
          </Pills>
          <TabLine defaultValue='1m' w='auto'>
            <TabLine.Item value='1m'>1M</TabLine.Item>
            <TabLine.Item value='3m'>3M</TabLine.Item>
          </TabLine>
        </Flex>
        <Chart.Bar
          duration={0}
          mt={5}
          groupKey={'date'}
          data={data}
          plotWidth={200}
          plotHeight={150}
        />
      </Card.Body>
    </Card>
  );
};

const widgetsSetup = [
  {
    title: 'Market traffic',
    id: 'market-traffic',
  },
  {
    title: 'Backlinks',
    id: 'backlinks',
  },
  {
    title: 'Keyword Research',
    id: 'keyword-research',
  },
  {
    title: 'Organic traffic',
    id: 'organic-traffic',
  },
  {
    title: 'Paid traffic',
    id: 'paid-traffic',
  },
];
const defaultWidgets = [
  'market-traffic',
  null,
  'backlinks',
  null,
  'keyword-research',
  'organic-traffic',
  'paid-traffic',
];

const Demo = () => {
  const [widgets, setWidgets] = React.useState(defaultWidgets);

  const handleDnD = React.useCallback(
    ({ fromIndex, toIndex }: { fromIndex: number; toIndex: number }) => {
      setWidgets((widgets) => {
        const newWidgets = [...widgets];
        const swap = widgets[fromIndex];
        newWidgets[fromIndex] = widgets[toIndex];
        newWidgets[toIndex] = swap;
        return newWidgets;
      });
    },
    [],
  );

  return (
    <DnD tag={Flex} flexWrap gap={4} onDnD={handleDnD}>
      {widgets.map((id, index) => {
        if (!id) {
          return (
            <DnD.DropZone key={index}>
              <Flex alignItems='center' justifyContent='center' w={235} h={278} direction='column'>
                <Text color='text-secondary'>
                  <MathPlusL />
                </Text>
                <Text color='text-secondary' bold size={200}>
                  Put widget
                </Text>
                <Text color='text-secondary' size={200}>
                  You can move widget here
                </Text>
              </Flex>
            </DnD.DropZone>
          );
        }

        const widget = widgetsSetup.find((widget) => widget.id === id)!;

        return (
          <DnD.Draggable placement='top' key={id} aria-label={`${widget.title} widget`}>
            <Widget title={widget.title} />
          </DnD.Draggable>
        );
      })}
    </DnD>
  );
};

export default Demo;
