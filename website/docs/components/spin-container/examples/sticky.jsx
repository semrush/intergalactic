import React from 'react';
import Sticky from '@semcore/sticky';
import SpinContainer from '@semcore/spin-container';
import { Text } from '@semcore/typography';
import Spin from '@semcore/spin';
import { ScrollArea } from '@semcore/scroll-area';

const Demo = () => (
  <ScrollArea h={300}>
    <SpinContainer h={500} w={150} loading style={{ overflow: 'initial' }}>
      <SpinContainer.Content>
        <Text size={100}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aperiam atque beatae
          distinctio doloremque, et id quae reiciendis repellat saepe sapiente sequi veritatis.
          Adipisci, consequuntur excepturi nobis porro quas recusandae? Lorem ipsum dolor sit amet,
          consectetur adipisicing elit. Aliquam aperiam atque beatae distinctio doloremque, et id
          quae reiciendis repellat saepe sapiente sequi veritatis. Adipisci, consequuntur excepturi
          nobis porro quas recusandae?
        </Text>
      </SpinContainer.Content>
      <SpinContainer.Overlay style={{ alignItems: 'flex-start' }}>
        <Sticky top="100px">
          <Spin size="xxl" />
        </Sticky>
      </SpinContainer.Overlay>
    </SpinContainer>
  </ScrollArea>
);

export default Demo;
