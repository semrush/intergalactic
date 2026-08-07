import FileExport from '@semcore/icon/FileExport/m';
import Info from '@semcore/icon/Info/m';
import { Flex } from '@semcore/ui/base-components';
import RadioCards from '@semcore/ui/radio-cards';
import Spin from '@semcore/ui/spin';
import Tag, { TagContainer } from '@semcore/ui/tag';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const Demo = () => {
  return (
    <RadioCards aria-label='Radio cards'>
      <RadioCards.Item value='Icons everywhere!'>
        <Flex gap={1}>
          <FileExport />
          <Text>Icons everywhere!</Text>
          <Info />
        </Flex>
        <Text>Help!</Text>
      </RadioCards.Item>
      <RadioCards.Item value='You can pass anything being in advanced mode!'>
        <Flex gap={1}>
          <Spin />
          <Text>Configuration...🤤</Text>
          <TagContainer interactive={false}>
            <TagContainer.Tag active={false}>
              <Tag.Text>
                Tags!
              </Tag.Text>
            </TagContainer.Tag>
          </TagContainer>
        </Flex>
        <Text>Help!</Text>
      </RadioCards.Item>
    </RadioCards>
  );
};

export default Demo;
