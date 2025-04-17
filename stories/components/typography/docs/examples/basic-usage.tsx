import React from 'react';
import { Blockquote, List, Text } from '@semcore/typography';

const Demo = () => (
  <div>
    <Text size={800} tag='h1' fontWeight={600} mb={6} mt={0}>
      H1, 48px, --fs-800
    </Text>
    <Text size={300} tag='p' mb={2} mt={0}>
      Paragraph example.
    </Text>
    <Text size={700} tag='h2' fontWeight={600} mb={4} mt={10}>
      H2, 36px, --fs-700
    </Text>
    <Text tag='p' mb={2} mt={0}>
      Paragraph example.
    </Text>
    <Text size={600} tag='h3' fontWeight={600} mb={4} mt={10}>
      H3, 32px, --fs-600
    </Text>
    <Text tag='p' mb={2} mt={0}>
      Paragraph example.
    </Text>
    <Text size={500} tag='h4' fontWeight={600} mb={3} mt={10}>
      H4, 24px, --fs-500
    </Text>
    <Text tag='p' mb={2} mt={0}>
      Paragraph example.
    </Text>
    <Text size={400} tag='h5' fontWeight={600} mb={2} mt={10}>
      H5, 20px, --fs-400
    </Text>
    <Text tag='p' mb={2} mt={0}>
      Paragraph example.
    </Text>
    <Text size={300} tag='h6' fontWeight={700} mb={1} mt={10}>
      H6, 16px, --fs-300
    </Text>
    <Text size={200} tag='p' mb={3} mt={0}>
      Paragraph example.
    </Text>
    <Text tag='p' mb={2} mt={10}>
      Paragraph example, 16px, --fs-300
    </Text>
    <Text size={200} tag='p' mb={3} mt={0}>
      Paragrap example, 14px, --fs-200
    </Text>
    <Text size={100} tag='p' mb={2} mt={0}>
      Paragraph example, 12px, --fs-200
    </Text>
    <List mb={2} mt={10}>
      <List.Item>I'm gonna make him an offer he can't refuse.</List.Item>
      <List.Item>Carpe diem. Seize the day, boys. Make your lives extraordinary.</List.Item>
    </List>
    <List tag='ol' mb={10} mt={10}>
      <List.Item marker={1}>I'm gonna make him an offer he can't refuse.</List.Item>
      <List.Item marker={2}>
        Carpe diem. Seize the day, boys. Make your lives extraordinary.
      </List.Item>
    </List>
    <Blockquote author='Roy Batty' my={4.5}>
      I've seen things you people wouldn't believe. Attack ships on fire off the shoulder of Orion.
      I watched C-beams glitter in the dark near the Tannhäuser Gate. All those moments will be lost
      in time, like tears in rain. Time to die.
    </Blockquote>
  </div>
);

export default Demo;
