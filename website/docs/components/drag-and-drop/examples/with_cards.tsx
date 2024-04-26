import React from 'react';
import DnD from 'intergalactic/drag-and-drop';
import Card from 'intergalactic/card';
import { Flex } from 'intergalactic/flex-box';
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
    return Array(3)
      .fill(0)
      .map((_, i) => ({
        date: dateFormatter.format(new Date(Date.now() - 1000 * 60 * 60 * 24 * 3 * i)),
        value: Math.round(random() * 10),
      }));
  }, [title]);

  return (
    <Card w={240} h={300}>
      <Card.Header>
        <Card.Title>{title}</Card.Title>
      </Card.Header>
      <Card.Body>
        <Chart.Bar
          duration={0}
          mt={5}
          groupKey={'date'}
          data={data}
          plotWidth={200}
          plotHeight={200}
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
];
const defaultWidgets = [null, 'market-traffic', 'backlinks', null];

const Demo = () => {
  const [widgets, setWidgets] = React.useState(defaultWidgets);

  const handleDnD = React.useCallback(
    ({ fromIndex, toIndex }: { fromIndex: number; toIndex: number }) => {
      setWidgets((widgets) => {
        const newWidgets = [...widgets];
        const shift = fromIndex < toIndex ? 1 : -1;
        for (let i = fromIndex; i !== toIndex; i += shift) {
          newWidgets[i] = widgets[i + shift];
        }
        newWidgets[toIndex] = widgets[fromIndex];
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
              <Flex
                alignItems='center'
                gap={1}
                justifyContent='center'
                h={300}
                direction='column'
                p={5}
                style={{
                  border: '1px dashed var(--intergalactic-border-primary, #c4c7cf)',
                  borderRadius: '6px',
                }}
              >
                <Text color='text-secondary'>
                  <MathPlusL />
                </Text>
                <Text color='text-secondary' bold size={200}>
                  Place widget here
                </Text>
                <Text color='text-secondary' textAlign='center' size={200}>
                  Change the order of the widgets!
                </Text>
              </Flex>
            </DnD.DropZone>
          );
        }

        const widget = widgetsSetup.find((widget) => widget.id === id)!;

        return (
          <DnD.Draggable placement='top' key={id} aria-label={`${widget.title} widget`} h='100%'>
            <Widget title={widget.title} />
          </DnD.Draggable>
        );
      })}
    </DnD>
  );
};

export default Demo;
