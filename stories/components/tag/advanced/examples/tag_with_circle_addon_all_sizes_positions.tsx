import React from 'react';
import Tag from '@semcore/tag';
import { Flex } from '@semcore/flex-box';

const Demo = () => {
  return (
    <Flex direction='column' gap={3}>
      <Flex gap={1}>
        <Tag size='m'>
        <Tag.Circle>
            <img
              src="https://picsum.photos/id/1025/28/28"
              alt="tag"
            />
          </Tag.Circle>
          <Tag.Text>Tag</Tag.Text>
        </Tag>
        <Tag size='l'>
        <Tag.Circle>
            <img
              src="https://picsum.photos/id/1025/28/28"
              alt="tag"
            />
          </Tag.Circle>
          <Tag.Text>Tag</Tag.Text>
        </Tag>
        <Tag size='xl'>
        <Tag.Circle>
            <img
              src="https://picsum.photos/id/1025/28/28"
              alt="tag"
            />
          </Tag.Circle>
          <Tag.Text>Tag</Tag.Text>
        </Tag>
      </Flex>

      <Flex gap={1}>
        <Tag size='m'>
          <Tag.Text>Tag</Tag.Text>
          <Tag.Circle>
            <img
              src="https://picsum.photos/id/1025/28/28"
              alt="tag"
            />
          </Tag.Circle>
        </Tag>
        <Tag size='l'>
          <Tag.Text>Tag</Tag.Text>
          <Tag.Circle>
            <img
              src="https://picsum.photos/id/1025/28/28"
              alt="tag"
            />
          </Tag.Circle>
        </Tag>
        <Tag size='xl'>
          <Tag.Text>Tag</Tag.Text>
          <Tag.Circle>
            <img
              src="https://picsum.photos/id/1025/28/28"
              alt="tag"
            />
          </Tag.Circle>
        </Tag>
      </Flex>

      <Flex gap={1}>
        <Tag size='m'>
        <Tag.Circle>
            <img
              src="https://picsum.photos/id/1025/28/28"
              alt="tag"
            />
          </Tag.Circle>
          <Tag.Text>Tag</Tag.Text>
          <Tag.Circle>
            <img
              src="https://picsum.photos/id/1025/28/28"
              alt="tag"
            />
          </Tag.Circle>
        </Tag>
        <Tag size='l'>
        <Tag.Circle>
            <img
              src="https://picsum.photos/id/1025/28/28"
              alt="tag"
            />
          </Tag.Circle>
          <Tag.Text>Tag</Tag.Text>
          <Tag.Circle>
            <img
              src="https://picsum.photos/id/1025/28/28"
              alt="tag"
            />
          </Tag.Circle>
        </Tag>
        <Tag size='xl'>
        <Tag.Circle>
            <img
              src="https://picsum.photos/id/1025/28/28"
              alt="tag"
            />
          </Tag.Circle>
          <Tag.Text>Tag</Tag.Text>
          <Tag.Circle>
            <img
              src="https://picsum.photos/id/1025/28/28"
              alt="tag"
            />
          </Tag.Circle>
        </Tag>
      </Flex>

      <Flex gap={1}>
        <Tag size='m'>
          <Tag.Text>Tag</Tag.Text>
        </Tag>
        <Tag size='l'>
          <Tag.Text>Tag</Tag.Text>
        </Tag>
        <Tag size='xl'>
          <Tag.Text>Tag</Tag.Text>
        </Tag>
        
      </Flex>
      
    </Flex>
  );
};

export default Demo;
