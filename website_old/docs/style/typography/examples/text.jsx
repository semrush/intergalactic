import React from 'react';
import { Blockquote, Hint, List, Text } from '@semcore/typography';

export default () => (
  <div>
    <Text size={800} tag="h1" mb={6} mt={0}>
      H1, 48px
    </Text>
    <Text tag="p" mb={2} mt={0}>
      But I do love the taste of a <Text tag="strong">good burger</Text>. Mm-mm-mm.
    </Text>
    <Text size={700} tag="h2" mb={4} mt={0}>
      H2, 36px
    </Text>
    <Text tag="p" mb={2} mt={0}>
      But I do love the taste of a <Text tag="em">good burger</Text>. Mm-mm-mm.
    </Text>
    <Text size={600} tag="h3" fontWeight={500} mb={4} mt={0}>
      H3, 33px
    </Text>
    <Text tag="p" mb={2} mt={0}>
      But I do love the taste of a <Text color="green">good burger</Text>. Mm-mm-mm.
    </Text>
    <Text size={500} tag="h4" fontWeight={500} mb={3} mt={0}>
      H4, 25px
    </Text>
    <Text tag="p" mb={2} mt={0}>
      But I do love the taste of a <Hint>good burger</Hint>. Mm-mm-mm.
    </Text>
    <Text size={400} tag="h5" fontWeight={500} mb={2} mt={0}>
      H5, 19px
    </Text>
    <Text tag="p" mb={2} mt={0}>
      But I do love the taste of a <Text tag="s">good burger</Text>. Mm-mm-mm.
    </Text>
    <Text size={300} tag="h6" mb={1} mt={0}>
      H6, 16px
    </Text>
    <Text size={200} tag="p" mb={3} mt={0}>
      Text, 14px
    </Text>
    <Text size={100} tag="p" mb={2} mt={0}>
      Text, 12px
    </Text>
    <List mb={2}>
      <List.Item>I'm gonna make him an offer he can't refuse.</List.Item>
      <List.Item>Carpe diem. Seize the day, boys. Make your lives extraordinary.</List.Item>
    </List>
    <List tag="ol" mb={2}>
      <List.Item marker={1}>I'm gonna make him an offer he can't refuse.</List.Item>
      <List.Item marker={2}>
        Carpe diem. Seize the day, boys. Make your lives extraordinary.
      </List.Item>
    </List>
    <Blockquote author="Author Author" my={4.5}>
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diem nonummy nibh euismod
      tincidunt ut lacreet dolore magna aliguam erat volutpat. Ut wisis enim ad minim veniam, quis
      nostrud exerci tution ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
    </Blockquote>
  </div>
);
