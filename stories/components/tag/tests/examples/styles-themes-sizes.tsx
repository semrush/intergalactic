import { Flex, Box } from '@semcore/ui/flex-box';
import Tag, { TagContainer } from '@semcore/ui/tag';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const Demo = () => {
  return (
    <Flex direction='row' gap={1}>
      <Flex direction='column' gap={2} mb={3} data-testid='Primary-base' w={100}>
        <Text size={100}>Primary-base</Text>
        <Tag size='m' theme='primary' color='gray-500'>
          M  gray
        </Tag>
        <Tag size='l' theme='primary' color='gray-500'>
          L  gray
        </Tag>
        <Tag size='xl' theme='primary' color='gray-500'>
          Xl  gray
        </Tag>

        <Tag size='m' theme='primary' color='blue-500'>
          M  blue
        </Tag>
        <Tag size='l' theme='primary' color='blue-500'>
          L  blue
        </Tag>
        <Tag size='xl' theme='primary' color='blue-500'>
          Xl  blue
        </Tag>

        <Tag size='m' theme='primary' color='green-500'>
          M  green
        </Tag>
        <Tag size='l' theme='primary' color='green-500'>
          L  green
        </Tag>
        <Tag size='xl' theme='primary' color='green-500'>
          Xl  green
        </Tag>

        <Tag size='m' theme='primary' color='salad-500'>
          M  salad
        </Tag>
        <Tag size='l' theme='primary' color='salad-500'>
          L  salad
        </Tag>
        <Tag size='xl' theme='primary' color='salad-500'>
          Xl  salad
        </Tag>

        <Tag size='m' theme='primary' color='orange-500'>
          M  orange
        </Tag>
        <Tag size='l' theme='primary' color='orange-500'>
          L  orange
        </Tag>
        <Tag size='xl' theme='primary' color='orange-500'>
          Xl  orange
        </Tag>

        <Tag size='m' theme='primary' color='yellow-500'>
          M  yellow
        </Tag>
        <Tag size='l' theme='primary' color='yellow-500'>
          L  yellow
        </Tag>
        <Tag size='xl' theme='primary' color='yellow-500'>
          Xl  yellow
        </Tag>

        <Tag size='m' theme='primary' color='red-500'>
          M  red
        </Tag>
        <Tag size='l' theme='primary' color='red-500'>
          L  red
        </Tag>
        <Tag size='xl' theme='primary' color='red-500'>
          Xl  red
        </Tag>

        <Tag size='m' theme='primary' color='pink-500'>
          M  pink
        </Tag>
        <Tag size='l' theme='primary' color='pink-500'>
          L  pink
        </Tag>
        <Tag size='xl' theme='primary' color='pink-500'>
          Xl  pink
        </Tag>

        <Tag size='m' theme='primary' color='violet-500'>
          M  violet
        </Tag>
        <Tag size='l' theme='primary' color='violet-500'>
          L  violet
        </Tag>
        <Tag size='xl' theme='primary' color='violet-500'>
          Xl  violet
        </Tag>

        <Box style={{ backgroundColor: '#191B23' }} mb={3} p={1}>
          <Tag size='m' theme='primary' color='white-500' mb={2}>
            M  white
          </Tag>
          <Tag size='l' theme='primary' color='white-500' mb={2}>
            L  white
          </Tag>
          <Tag size='xl' theme='primary' color='white-500' mb={2}>
            Xl  white
          </Tag>

        </Box>
      </Flex>

      <Flex direction='column' gap={2} mb={3} data-testid='Secondary-base' w={100}>
        <Text size={100}>Secondary-base</Text>
        <Tag size='m' theme='secondary' color='gray-500'>
          M  gray
        </Tag>
        <Tag size='l' theme='secondary' color='gray-500'>
          L  gray
        </Tag>
        <Tag size='xl' theme='secondary' color='gray-500'>
          Xl  gray
        </Tag>

        <Tag size='m' theme='secondary' color='blue-500'>
          M  blue
        </Tag>
        <Tag size='l' theme='secondary' color='blue-500'>
          L  blue
        </Tag>
        <Tag size='xl' theme='secondary' color='blue-500'>
          Xl  blue
        </Tag>

        <Tag size='m' theme='secondary' color='green-500'>
          M  green
        </Tag>
        <Tag size='l' theme='secondary' color='green-500'>
          L  green
        </Tag>
        <Tag size='xl' theme='secondary' color='green-500'>
          Xl  green
        </Tag>

        <Tag size='m' theme='secondary' color='salad-500'>
          M  salad
        </Tag>
        <Tag size='l' theme='secondary' color='salad-500'>
          L  salad
        </Tag>
        <Tag size='xl' theme='secondary' color='salad-500'>
          Xl  salad
        </Tag>

        <Tag size='m' theme='secondary' color='orange-500'>
          M  orange
        </Tag>
        <Tag size='l' theme='secondary' color='orange-500'>
          L  orange
        </Tag>
        <Tag size='xl' theme='secondary' color='orange-500'>
          Xl  orange
        </Tag>

        <Tag size='m' theme='secondary' color='yellow-500'>
          M  yellow
        </Tag>
        <Tag size='l' theme='secondary' color='yellow-500'>
          L  yellow
        </Tag>
        <Tag size='xl' theme='secondary' color='yellow-500'>
          Xl  yellow
        </Tag>

        <Tag size='m' theme='secondary' color='red-500'>
          M  red
        </Tag>
        <Tag size='l' theme='secondary' color='red-500'>
          L  red
        </Tag>
        <Tag size='xl' theme='secondary' color='red-500'>
          Xl  red
        </Tag>

        <Tag size='m' theme='secondary' color='pink-500'>
          M  pink
        </Tag>
        <Tag size='l' theme='secondary' color='pink-500'>
          L  pink
        </Tag>
        <Tag size='xl' theme='secondary' color='pink-500'>
          Xl  pink
        </Tag>

        <Tag size='m' theme='secondary' color='violet-500'>
          M  violet
        </Tag>
        <Tag size='l' theme='secondary' color='violet-500'>
          L  violet
        </Tag>
        <Tag size='xl' theme='secondary' color='violet-500'>
          Xl  violet
        </Tag>

        <Box style={{ backgroundColor: '#191B23' }} mb={3} p={1}>
          <Tag size='m' theme='secondary' color='white-500' mb={2}>
            M  white
          </Tag>
          <Tag size='l' theme='secondary' color='white-500' mb={2}>
            L  white
          </Tag>
          <Tag size='xl' theme='secondary' color='white-500' mb={2}>
            Xl  white
          </Tag>

        </Box>
      </Flex>

      <Flex direction='column' gap={2} mb={3} data-testid='additional-base' w={100}>
        <Text size={100}>additional-base</Text>
        <Tag size='m' theme='additional' color='gray-500'>
          M  gray
        </Tag>
        <Tag size='l' theme='additional' color='gray-500'>
          L  gray
        </Tag>
        <Tag size='xl' theme='additional' color='gray-500'>
          Xl  gray
        </Tag>

        <Tag size='m' theme='additional' color='blue-500'>
          M  blue
        </Tag>
        <Tag size='l' theme='additional' color='blue-500'>
          L  blue
        </Tag>
        <Tag size='xl' theme='additional' color='blue-500'>
          Xl  blue
        </Tag>

        <Tag size='m' theme='additional' color='green-500'>
          M  green
        </Tag>
        <Tag size='l' theme='additional' color='green-500'>
          L  green
        </Tag>
        <Tag size='xl' theme='additional' color='green-500'>
          Xl  green
        </Tag>

        <Tag size='m' theme='additional' color='salad-500'>
          M  salad
        </Tag>
        <Tag size='l' theme='additional' color='salad-500'>
          L  salad
        </Tag>
        <Tag size='xl' theme='additional' color='salad-500'>
          Xl  salad
        </Tag>

        <Tag size='m' theme='additional' color='orange-500'>
          M  orange
        </Tag>
        <Tag size='l' theme='additional' color='orange-500'>
          L  orange
        </Tag>
        <Tag size='xl' theme='additional' color='orange-500'>
          Xl  orange
        </Tag>

        <Tag size='m' theme='additional' color='yellow-500'>
          M  yellow
        </Tag>
        <Tag size='l' theme='additional' color='yellow-500'>
          L  yellow
        </Tag>
        <Tag size='xl' theme='additional' color='yellow-500'>
          Xl  yellow
        </Tag>

        <Tag size='m' theme='additional' color='red-500'>
          M  red
        </Tag>
        <Tag size='l' theme='additional' color='red-500'>
          L  red
        </Tag>
        <Tag size='xl' theme='additional' color='red-500'>
          Xl  red
        </Tag>

        <Tag size='m' theme='additional' color='pink-500'>
          M  pink
        </Tag>
        <Tag size='l' theme='additional' color='pink-500'>
          L  pink
        </Tag>
        <Tag size='xl' theme='additional' color='pink-500'>
          Xl  pink
        </Tag>

        <Tag size='m' theme='additional' color='violet-500'>
          M  violet
        </Tag>
        <Tag size='l' theme='additional' color='violet-500'>
          L  violet
        </Tag>
        <Tag size='xl' theme='additional' color='violet-500'>
          Xl  violet
        </Tag>

        <Box style={{ backgroundColor: '#191B23' }} mb={3} p={1}>
          <Tag size='m' theme='additional' color='white-500' mb={2}>
            M  white
          </Tag>
          <Tag size='l' theme='additional' color='white-500' mb={2}>
            L  white
          </Tag>
          <Tag size='xl' theme='additional' color='white-500' mb={2}>
            Xl  white
          </Tag>

        </Box>
      </Flex>
    </Flex>
  );
};

export default Demo;
