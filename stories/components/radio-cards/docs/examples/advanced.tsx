import FileExport from '@semcore/icon/FileExport/m';
import Info from '@semcore/icon/Info/m';
import { Flex } from '@semcore/ui/base-components';
import Dot from '@semcore/ui/dot';
import RadioCards from '@semcore/ui/radio-cards';
import Spin from '@semcore/ui/spin';
import Tag, { TagContainer } from '@semcore/ui/tag';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const Demo = () => {
  return (
    <RadioCards aria-label='Radio cards' name='radio-cards' defaultValue='loading-state'>
      <RadioCards.Item value='custom-layout'>
        <Flex alignItems='center' gap='var(--intergalactic-spacing-content-gap-medium, 6px)'>
          <FileExport />
          <Text size={300} use='primary'>Custom layout</Text>
          <Info />
        </Flex>
        <Text size={200} use='secondary'>Combine any addons and content</Text>
        <Dot up size='l' aria-label='New'>12</Dot>
      </RadioCards.Item>
      <RadioCards.Item value='loading-state'>
        <Flex alignItems='center' gap='var(--intergalactic-spacing-content-gap-medium, 6px)'>
          <Spin />
          <Text size={300} use='primary'>Loading state</Text>
          <TagContainer interactive={false}>
            <TagContainer.Tag active={false}>
              <Tag.Text>
                One
              </Tag.Text>
            </TagContainer.Tag>
          </TagContainer>
        </Flex>
        <Text size={200} use='secondary'>Any children are supported</Text>
      </RadioCards.Item>
    </RadioCards>
  );
};

export default Demo;
