import React from 'react';
import Tag, { TagContainer } from '@semcore/tag';
import { Flex } from '@semcore/flex-box';
import SmileHappyM from '@semcore/icon/SmileHappy/m';
import SmileHappyL from '@semcore/icon/SmileHappy/l';
import SmileSadM from '@semcore/icon/SmileSad/m';
import SmileSadL from '@semcore/icon/SmileSad/l';

const Demo = () => {
  return (
    <Flex direction='column' gap={3}>

      <Flex gap={1}>
      <TagContainer
          color="gray-500"
          disabled={false}
          size="m"
          theme="primary"
        >
          <TagContainer.Tag>
          <Tag.Addon>
      <SmileHappyL />
    </Tag.Addon>
            <Tag.Text>
              Tag text
            </Tag.Text>
          </TagContainer.Tag>
          <TagContainer.Close />
        </TagContainer>

        <TagContainer
          color="gray-500"
          disabled={false}
          interactive={false}
          size="l"
          theme="primary"
          addonLeft={SmileHappyL}
        >
          <TagContainer.Tag >
          <Tag.Addon>
      <SmileHappyL />
    </Tag.Addon>
            <Tag.Text>
              Tag text
            </Tag.Text>
          </TagContainer.Tag>
          <TagContainer.Close />
        </TagContainer>

        <TagContainer
          color="gray-500"
          disabled={false}
          size="xl"
          theme="primary"
          addonLeft={SmileHappyL}
        >
          <TagContainer.Tag >
          <Tag.Addon>
      <SmileHappyL />
    </Tag.Addon>
            <Tag.Text>
              Tag text
            </Tag.Text>
          </TagContainer.Tag>
          <TagContainer.Close />
        </TagContainer>
      </Flex>

      {/* <Flex gap={1}>
        <Tag size='m'>
          <Tag.Addon>
            <SmileSadM />
          </Tag.Addon>
          <Tag.Text>Tag</Tag.Text>
          <Tag.Addon>
            <SmileSadM />
          </Tag.Addon>
          <Tag.Close />
        </Tag>
        <Tag size='l'>
          <Tag.Addon>
            <SmileSadM />
          </Tag.Addon>
          <Tag.Text>Tag</Tag.Text>
          <Tag.Addon>
            <SmileSadM />
          </Tag.Addon>
          <Tag.Close />
        </Tag>
        <Tag size='xl'>
          <Tag.Addon>
            <SmileSadL />
          </Tag.Addon>
          <Tag.Text>Tag</Tag.Text>
          <Tag.Addon>
            <SmileSadL />
          </Tag.Addon>
          <Tag.Close />
        </Tag>
      </Flex> */}


      {/* <Flex gap={1}> */}
        {/* <Tag size='m' addonRight={SmileHappyM}>
          <Tag.Text>Tag</Tag.Text>
          <Tag.Close />
        </Tag>
        <Tag size='l' addonRight={SmileHappyM}>
          <Tag.Text>Tag</Tag.Text>
          <Tag.Close />
        </Tag>
        <Tag size='xl' addonRight={SmileHappyL}>
          <Tag.Text>Tag</Tag.Text>
          <Tag.Close />
        </Tag> */}
        {/* <Tag size='m'>
          <Tag.Text>Tag</Tag.Text>
          <Tag.Addon>
            <SmileSadM />
          </Tag.Addon>
          <Tag.Close />
        </Tag>
        <Tag size='l'>
          <Tag.Text>Tag</Tag.Text>
          <Tag.Addon>
            <SmileSadM />
          </Tag.Addon>
          <Tag.Close />
        </Tag>
        <Tag size='xl'>
          <Tag.Text>Tag</Tag.Text>
          <Tag.Addon>
            <SmileSadL />
          </Tag.Addon>
          <Tag.Close />
        </Tag>
      </Flex>

      <Flex gap={1}>
        <Tag size='m'>
          <Tag.Text>Tag</Tag.Text>
          <Tag.Close />
        </Tag>
        <Tag size='l'>
          <Tag.Text>Tag</Tag.Text>
          <Tag.Close />
        </Tag>
        <Tag size='xl'>
          <Tag.Text>Tag</Tag.Text>
          <Tag.Close />
        </Tag> */}

      {/* </Flex> */}

    </Flex>

  );
};

export default Demo;
