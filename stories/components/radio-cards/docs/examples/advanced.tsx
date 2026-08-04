import FileExport from '@semcore/icon/FileExport/m';
import Info from '@semcore/icon/Info/m';
import RadioCards from '@semcore/ui/radio-cards';
import Spin from '@semcore/ui/spin';
import Tag, { TagContainer } from '@semcore/ui/tag';
import React from 'react';

const Demo = () => {
  return (
    <RadioCards aria-label='Radio cards'>
      <RadioCards.Item value='Icons everywhere!'>
        <RadioCards.Item.Header>
          <RadioCards.Item.Header.LeftAddon>
            <FileExport />
          </RadioCards.Item.Header.LeftAddon>
          <RadioCards.Item.Header.Text>
            Icons everywhere!
          </RadioCards.Item.Header.Text>
          <RadioCards.Item.Header.RightAddon>
            <Info />
          </RadioCards.Item.Header.RightAddon>
        </RadioCards.Item.Header>
        <RadioCards.Item.Description>Help!</RadioCards.Item.Description>
      </RadioCards.Item>
      <RadioCards.Item value='You can pass anything being in advanced mode!'>
        <RadioCards.Item.Header>
          <RadioCards.Item.Header.LeftAddon>
            <Spin />
          </RadioCards.Item.Header.LeftAddon>
          <RadioCards.Item.Header.Text>
            Configuration...🤤
          </RadioCards.Item.Header.Text>
          <RadioCards.Item.Header.RightAddon>
            <TagContainer interactive={false}>
              <TagContainer.Tag active={false}>
                <Tag.Text>
                  Tags!
                </Tag.Text>
              </TagContainer.Tag>
            </TagContainer>
          </RadioCards.Item.Header.RightAddon>
        </RadioCards.Item.Header>
        <RadioCards.Item.Description>Help!</RadioCards.Item.Description>
      </RadioCards.Item>
    </RadioCards>
  );
};

export default Demo;
