import React from 'react';
import Accordion from 'intergalactic/accordion';
import { Text } from 'intergalactic/typography';
import { Flex, Box } from 'intergalactic/flex-box';
import DnD from 'intergalactic/drag-and-drop';

const sections = [
  {
    id: 'pharetra-sit-amet-aliquam-id',
    question: 'Pharetra sit amet aliquam id?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ipsum suspendisse ultrices gravida dictum fusce ut placerat orci nulla. Platea dictumst quisque sagittis purus sit amet volutpat consequat mauris. Diam quis enim lobortis scelerisque. Nunc congue nisi vitae suscipit tellus mauris a.',
  },
  {
    id: 'pellentesque-adipiscing-commodo-elit-at',
    question: 'pellentesque adipiscing commodo elit at?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fringilla ut morbi tincidunt augue interdum velit euismod. Velit egestas dui id ornare arcu. Pretium quam vulputate dignissim suspendisse in est. Fusce id velit ut tortor pretium viverra suspendisse.',
  },
  {
    id: 'id-faucibus-nisl-tincidunt-eget',
    question: 'Id faucibus nisl tincidunt eget?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ornare aenean euismod elementum nisi. Turpis cursus in hac habitasse platea. Condimentum lacinia quis vel eros donec ac odio tempor. Leo integer malesuada nunc vel risus commodo viverra maecenas accumsan.',
  },
];

const Demo = () => {
  const [value, onChange] = React.useState<string[]>([]);
  const [sortedSections, setSortedSections] = React.useState(sections);
  const handleDnD = React.useCallback(
    ({ fromIndex, toIndex }: { fromIndex: number; toIndex: number }) => {
      setSortedSections((sections) => {
        const newSections = [...sections];
        const shift = fromIndex < toIndex ? 1 : -1;
        for (let i = fromIndex; i !== toIndex; i += shift) {
          newSections[i] = sections[i + shift];
        }
        newSections[toIndex] = sections[fromIndex];
        return newSections;
      });
    },
    [],
  );

  return (
    <DnD
      tag={Accordion}
      onDnD={handleDnD}
      value={value}
      onChange={(value: any) => onChange(value)}
      aria-label={'drag-and-drop container'}
    >
      {sortedSections.map((section) => (
        <Accordion.Item value={section.id} key={section.id}>
          <DnD.Draggable tag={Accordion.Item.Toggle} pb={2} w={420} aria-label={section.question}>
            <Flex alignItems='center'>
              <Accordion.Item.Chevron mr={2} />
              <Text size={300} tag='h3' my={0}>
                {section.question}
              </Text>
            </Flex>
          </DnD.Draggable>
          <Accordion.Item.Collapse w={420}>
            <Box p='12px 24px 24px'>{section.answer}</Box>
          </Accordion.Item.Collapse>
        </Accordion.Item>
      ))}
    </DnD>
  );
};

export default Demo;
