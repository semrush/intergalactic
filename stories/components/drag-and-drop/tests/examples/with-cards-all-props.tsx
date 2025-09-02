import { Flex } from '@semcore/base-components';
import Card from '@semcore/card';
import { Chart } from '@semcore/d3-chart';
import DnD from '@semcore/drag-and-drop';
import MathPlusL from '@semcore/icon/MathPlus/l';
import { Text } from '@semcore/typography';
import React from 'react';

type Widget = { id: string; title: string };

type DnDCardProps = {
  placement?: false | 'top' | 'bottom' | 'left' | 'right';
  zoneName?: string;
  draggableCount?: number;
  dropZoneCount?: number;
  noDrop?: boolean;
  isCustomFocus?: boolean;
};

const stableRandom = (seed: number) => {
  let randomIndex = seed;
  return () => {
    if (randomIndex > 20) randomIndex = 1;
    return Math.abs(Math.sin(Math.PI * randomIndex * Math.cos(100 - randomIndex++)));
  };
};

const WidgetCard: React.FC<{ title: string }> = ({ title }) => {
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
    <Card w={240} h={280}>
      <Card.Header>
        <Card.Title>{title}</Card.Title>
      </Card.Header>
      <Card.Body>
        <Chart.Bar
          duration={0}
          groupKey='date'
          data={data}
          plotWidth={200}
          plotHeight={200}
          aria-label={`${title} chart`}
        />
      </Card.Body>
    </Card>
  );
};

const allWidgetsSetup: Widget[] = [
  { id: 'market', title: 'Market traffic' },
  { id: 'backlinks', title: 'Backlinks' },
  { id: 'revenue', title: 'Revenue' },
  { id: 'users', title: 'Users' },
];

const Demo = ({
  placement = 'top',
  zoneName,
  draggableCount = 2,
  dropZoneCount = 2,
  isCustomFocus,
  noDrop,
}: DnDCardProps) => {
  const draggableWidgets = allWidgetsSetup.slice(0, draggableCount);
  const widgets: (Widget | null)[] = [
    ...draggableWidgets,
    ...Array(dropZoneCount).fill(null),
  ];

  const [items, setItems] = React.useState(widgets);

  const handleDnD = React.useCallback(
    ({ fromIndex, toIndex }: { fromIndex: number; toIndex: number }) => {
      setItems((prev) => {
        const newItems = [...prev];
        const shift = fromIndex < toIndex ? 1 : -1;
        for (let i = fromIndex; i !== toIndex; i += shift) {
          newItems[i] = prev[i + shift];
        }
        newItems[toIndex] = prev[fromIndex];
        return newItems;
      });
    },
    [],
  );

  return (
    <DnD tag={Flex} flexWrap gap={4} onDnD={handleDnD} aria-label='Draggable charts' mt={6} ml={6}>
      {items.map((item, index) => {
        if (!item) {
          return (
            <DnD.DropZone
              zoneName={zoneName}
              key={index}
              aria-label={`Drop zone ${index + 1}`}
              style={{
                border: '1px dashed var(--intergalactic-border-primary, #c4c7cf)',
                borderRadius: '6px',
              }}
            >
              <Flex
                alignItems='center'
                gap={1}
                justifyContent='center'
                w={240}
                h={280}
                direction='column'
                p={5}
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

        return (
          <DnD.Draggable
            noDrop={noDrop}
            isCustomFocus={isCustomFocus}
            placement={placement}
            zoneName={zoneName}
            key={item.id}
            aria-label={`${item.title} widget`}
            h='100%'
            style={{ borderRadius: '6px' }}
          >
            <WidgetCard title={item.title} />
          </DnD.Draggable>
        );
      })}
    </DnD>
  );
};

export default Demo;
