import VideoListL from '@semcore/icon/VideoList/l';
import VideoListM from '@semcore/icon/VideoList/m';
import { Flex, Box } from '@semcore/ui/flex-box';
import Tag, { TagContainer } from '@semcore/ui/tag';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const Demo = () => {
  return (
    <Flex direction='row' gap={1}>
      <Flex direction='column' gap={2} mb={3} data-testid='Primary-base' w={200}>
        <Text size={100}>Primary-base</Text>
        <Tag size='m' addonLeft={VideoListM} addonRight={VideoListM} theme='primary' color='gray-500'>
          M  gray
        </Tag>
        <Tag size='l' addonLeft={VideoListL} addonRight={VideoListL} theme='primary' color='gray-500' interactive>
          L  gray
        </Tag>
        <Tag size='xl' addonLeft={VideoListL} addonRight={VideoListL} theme='primary' color='gray-500' interactive>
          Xl  gray
        </Tag>

        <Tag size='m' addonLeft={VideoListM} addonRight={VideoListM} theme='primary' color='blue-500'>
          M  blue
        </Tag>
        <Tag size='l' addonLeft={VideoListL} addonRight={VideoListL} theme='primary' color='blue-500' interactive>
          L  blue
        </Tag>
        <Tag size='xl' addonLeft={VideoListL} addonRight={VideoListL} theme='primary' color='blue-500' interactive>
          Xl  blue
        </Tag>

        <Tag size='m' addonLeft={VideoListM} addonRight={VideoListM} theme='primary' color='green-500' interactive>
          M  green
        </Tag>
        <Tag size='l' addonLeft={VideoListL} addonRight={VideoListL} theme='primary' color='green-500' interactive>
          L  green
        </Tag>
        <Tag size='xl' addonLeft={VideoListL} addonRight={VideoListL} theme='primary' color='green-500'interactive>
          Xl  green
        </Tag>

        <Tag size='m' addonLeft={VideoListM} addonRight={VideoListM} theme='primary' color='salad-500'>
          M  salad
        </Tag>
        <Tag size='l' addonLeft={VideoListL} addonRight={VideoListL} theme='primary' color='salad-500' interactive>
          L  salad
        </Tag>
        <Tag size='xl' addonLeft={VideoListL} addonRight={VideoListL} theme='primary' color='salad-500' interactive>
          Xl  salad
        </Tag>

        <Tag size='m' addonLeft={VideoListM} addonRight={VideoListM} theme='primary' color='orange-500' interactive>
          M  orange
        </Tag>
        <Tag size='l' addonLeft={VideoListL} addonRight={VideoListL} theme='primary' color='orange-500' interactive>
          L  orange
        </Tag>
        <Tag size='xl' addonLeft={VideoListL} addonRight={VideoListL} theme='primary' color='orange-500' interactive>
          Xl  orange
        </Tag>

        <Tag size='m' addonLeft={VideoListM} addonRight={VideoListM} theme='primary' color='yellow-500' interactive>
          M  yellow
        </Tag>
        <Tag size='l' addonLeft={VideoListL} addonRight={VideoListL} theme='primary' color='yellow-500' interactive>
          L  yellow
        </Tag>
        <Tag size='xl' addonLeft={VideoListL} addonRight={VideoListL} theme='primary' color='yellow-500' interactive>
          Xl  yellow
        </Tag>

        <Tag size='m' addonLeft={VideoListM} addonRight={VideoListM} theme='primary' color='red-500' interactive>
          M  red
        </Tag>
        <Tag size='l' addonLeft={VideoListL} addonRight={VideoListL} theme='primary' color='red-500' interactive>
          L  red
        </Tag>
        <Tag size='xl' addonLeft={VideoListL} addonRight={VideoListL} theme='primary' color='red-500' interactive>
          Xl  red
        </Tag>

        <Tag size='m' addonLeft={VideoListM} addonRight={VideoListM} theme='primary' color='pink-500' interactive>
          M  pink
        </Tag>
        <Tag size='l' addonLeft={VideoListL} addonRight={VideoListL} theme='primary' color='pink-500' interactive>
          L  pink
        </Tag>
        <Tag size='xl' addonLeft={VideoListL} addonRight={VideoListL} theme='primary' color='pink-500' interactive>
          Xl  pink
        </Tag>

        <Tag size='m' addonLeft={VideoListM} addonRight={VideoListM} theme='primary' color='violet-500' interactive>
          M  violet
        </Tag>
        <Tag size='l' addonLeft={VideoListL} addonRight={VideoListL} theme='primary' color='violet-500' interactive>
          L  violet
        </Tag>
        <Tag size='xl' addonLeft={VideoListL} addonRight={VideoListL} theme='primary' color='violet-500' interactive>
          Xl  violet
        </Tag>

        <Box style={{ backgroundColor: '#191B23' }} mb={3} p={1}>
          <Tag size='m' addonLeft={VideoListM} addonRight={VideoListM} theme='primary' color='white-500' mb={2} interactive>
            M  white
          </Tag>
          <Tag size='l' addonLeft={VideoListL} addonRight={VideoListL} theme='primary' color='white-500' mb={2} interactive>
            L  white
          </Tag>
          <Tag size='xl' addonLeft={VideoListL} addonRight={VideoListL} theme='primary' color='white-500' mb={2} interactive>
            Xl  white
          </Tag>

        </Box>
      </Flex>

      <Flex direction='column' gap={2} mb={3} data-testid='Secondary-base' w={200}>
        <Text size={100}>Secondary-base</Text>
        <Tag size='m' addonLeft={VideoListM} addonRight={VideoListM} theme='secondary' color='gray-500' interactive>
          M  gray
        </Tag>
        <Tag size='l' addonLeft={VideoListL} addonRight={VideoListL} theme='secondary' color='gray-500' interactive>
          L  gray
        </Tag>
        <Tag size='xl' addonLeft={VideoListL} addonRight={VideoListL} theme='secondary' color='gray-500' interactive>
          Xl  gray
        </Tag>

        <Tag size='m' addonLeft={VideoListM} addonRight={VideoListM} theme='secondary' color='blue-500' interactive>
          M  blue
        </Tag>
        <Tag size='l' addonLeft={VideoListL} addonRight={VideoListL} theme='secondary' color='blue-500' interactive>
          L  blue
        </Tag>
        <Tag size='xl' addonLeft={VideoListL} addonRight={VideoListL} theme='secondary' color='blue-500' interactive>
          Xl  blue
        </Tag>

        <Tag size='m' addonLeft={VideoListM} addonRight={VideoListM} theme='secondary' color='green-500' interactive>
          M  green
        </Tag>
        <Tag size='l' addonLeft={VideoListL} addonRight={VideoListL} theme='secondary' color='green-500' interactive>
          L  green
        </Tag>
        <Tag size='xl' addonLeft={VideoListL} addonRight={VideoListL} theme='secondary' color='green-500' interactive>
          Xl  green
        </Tag>

        <Tag size='m' addonLeft={VideoListM} addonRight={VideoListM} theme='secondary' color='salad-500' interactive>
          M  salad
        </Tag>
        <Tag size='l' addonLeft={VideoListL} addonRight={VideoListL} theme='secondary' color='salad-500' interactive>
          L  salad
        </Tag>
        <Tag size='xl' addonLeft={VideoListL} addonRight={VideoListL} theme='secondary' color='salad-500' interactive>
          Xl  salad
        </Tag>

        <Tag size='m' addonLeft={VideoListM} addonRight={VideoListM} theme='secondary' color='orange-500' interactive>
          M  orange
        </Tag>
        <Tag size='l' addonLeft={VideoListL} addonRight={VideoListL} theme='secondary' color='orange-500' interactive>
          L  orange
        </Tag>
        <Tag size='xl' addonLeft={VideoListL} addonRight={VideoListL} theme='secondary' color='orange-500' interactive>
          Xl  orange
        </Tag>

        <Tag size='m' addonLeft={VideoListM} addonRight={VideoListM} theme='secondary' color='yellow-500' interactive>
          M  yellow
        </Tag>
        <Tag size='l' addonLeft={VideoListL} addonRight={VideoListL} theme='secondary' color='yellow-500' interactive>
          L  yellow
        </Tag>
        <Tag size='xl' addonLeft={VideoListL} addonRight={VideoListL} theme='secondary' color='yellow-500' interactive>
          Xl  yellow
        </Tag>

        <Tag size='m' addonLeft={VideoListM} addonRight={VideoListM} theme='secondary' color='red-500' interactive>
          M  red
        </Tag>
        <Tag size='l' addonLeft={VideoListL} addonRight={VideoListL} theme='secondary' color='red-500' interactive>
          L  red
        </Tag>
        <Tag size='xl' addonLeft={VideoListL} addonRight={VideoListL} theme='secondary' color='red-500' interactive>
          Xl  red
        </Tag>

        <Tag size='m' addonLeft={VideoListM} addonRight={VideoListM} theme='secondary' color='pink-500' interactive>
          M  pink
        </Tag>
        <Tag size='l' addonLeft={VideoListL} addonRight={VideoListL} theme='secondary' color='pink-500' interactive>
          L  pink
        </Tag>
        <Tag size='xl' addonLeft={VideoListL} addonRight={VideoListL} theme='secondary' color='pink-500' interactive>
          Xl  pink
        </Tag>

        <Tag size='m' addonLeft={VideoListM} addonRight={VideoListM} theme='secondary' color='violet-500' interactive>
          M  violet
        </Tag>
        <Tag size='l' addonLeft={VideoListL} addonRight={VideoListL} theme='secondary' color='violet-500' interactive>
          L  violet
        </Tag>
        <Tag size='xl' addonLeft={VideoListL} addonRight={VideoListL} theme='secondary' color='violet-500' interactive>
          Xl  violet
        </Tag>

        <Box style={{ backgroundColor: '#191B23' }} mb={3} p={1}>
          <Tag size='m' addonLeft={VideoListM} addonRight={VideoListM} theme='secondary' color='white-500' mb={2} interactive>
            M  white
          </Tag>
          <Tag size='l' addonLeft={VideoListL} addonRight={VideoListL} theme='secondary' color='white-500' mb={2} interactive>
            L  white
          </Tag>
          <Tag size='xl' addonLeft={VideoListL} addonRight={VideoListL} theme='secondary' color='white-500' mb={2} interactive>
            Xl  white
          </Tag>

        </Box>
      </Flex>

      <Flex direction='column' gap={2} mb={3} data-testid='additional-base' w={200}>
        <Text size={100}>additional-base</Text>
        <Tag size='m' addonLeft={VideoListM} addonRight={VideoListM} theme='additional' color='gray-500' interactive>
          M  gray
        </Tag>
        <Tag size='l' addonLeft={VideoListL} addonRight={VideoListL} theme='additional' color='gray-500' interactive>
          L  gray
        </Tag>
        <Tag size='xl' addonLeft={VideoListL} addonRight={VideoListL} theme='additional' color='gray-500' interactive>
          Xl  gray
        </Tag>

        <Tag size='m' addonLeft={VideoListM} addonRight={VideoListM} theme='additional' color='blue-500' interactive>
          M  blue
        </Tag>
        <Tag size='l' addonLeft={VideoListL} addonRight={VideoListL} theme='additional' color='blue-500' interactive>
          L  blue
        </Tag>
        <Tag size='xl' addonLeft={VideoListL} addonRight={VideoListL} theme='additional' color='blue-500' interactive>
          Xl  blue
        </Tag>

        <Tag size='m' addonLeft={VideoListM} addonRight={VideoListM} theme='additional' color='green-500' interactive>
          M  green
        </Tag>
        <Tag size='l' addonLeft={VideoListL} addonRight={VideoListL} theme='additional' color='green-500' interactive>
          L  green
        </Tag>
        <Tag size='xl' addonLeft={VideoListL} addonRight={VideoListL} theme='additional' color='green-500' interactive>
          Xl  green
        </Tag>

        <Tag size='m' addonLeft={VideoListM} addonRight={VideoListM} theme='additional' color='salad-500' interactive>
          M  salad
        </Tag>
        <Tag size='l' addonLeft={VideoListL} addonRight={VideoListL} theme='additional' color='salad-500' interactive>
          L  salad
        </Tag>
        <Tag size='xl' addonLeft={VideoListL} addonRight={VideoListL} theme='additional' color='salad-500' interactive>
          Xl  salad
        </Tag>

        <Tag size='m' addonLeft={VideoListM} addonRight={VideoListM} theme='additional' color='orange-500' interactive>
          M  orange
        </Tag>
        <Tag size='l' addonLeft={VideoListL} addonRight={VideoListL} theme='additional' color='orange-500' interactive>
          L  orange
        </Tag>
        <Tag size='xl' addonLeft={VideoListL} addonRight={VideoListL} theme='additional' color='orange-500' interactive>
          Xl  orange
        </Tag>

        <Tag size='m' addonLeft={VideoListM} addonRight={VideoListM} theme='additional' color='yellow-500' interactive>
          M  yellow
        </Tag>
        <Tag size='l' addonLeft={VideoListL} addonRight={VideoListL} theme='additional' color='yellow-500' interactive>
          L  yellow
        </Tag>
        <Tag size='xl' addonLeft={VideoListL} addonRight={VideoListL} theme='additional' color='yellow-500' interactive>
          Xl  yellow
        </Tag>

        <Tag size='m' addonLeft={VideoListM} addonRight={VideoListM} theme='additional' color='red-500' interactive>
          M  red
        </Tag>
        <Tag size='l' addonLeft={VideoListL} addonRight={VideoListL} theme='additional' color='red-500' interactive>
          L  red
        </Tag>
        <Tag size='xl' addonLeft={VideoListL} addonRight={VideoListL} theme='additional' color='red-500' interactive>
          Xl  red
        </Tag>

        <Tag size='m' addonLeft={VideoListM} addonRight={VideoListM} theme='additional' color='pink-500' interactive>
          M  pink
        </Tag>
        <Tag size='l' addonLeft={VideoListL} addonRight={VideoListL} theme='additional' color='pink-500' interactive>
          L  pink
        </Tag>
        <Tag size='xl' addonLeft={VideoListL} addonRight={VideoListL} theme='additional' color='pink-500' interactive>
          Xl  pink
        </Tag>

        <Tag size='m' addonLeft={VideoListM} addonRight={VideoListM} theme='additional' color='violet-500' interactive>
          M  violet
        </Tag>
        <Tag size='l' addonLeft={VideoListL} addonRight={VideoListL} theme='additional' color='violet-500' interactive>
          L  violet
        </Tag>
        <Tag size='xl' addonLeft={VideoListL} addonRight={VideoListL} theme='additional' color='violet-500' interactive>
          Xl  violet
        </Tag>

        <Box style={{ backgroundColor: '#191B23' }} mb={3} p={1}>
          <Tag size='m' addonLeft={VideoListM} addonRight={VideoListM} theme='additional' color='white-500' mb={2} interactive>
            M  white
          </Tag>
          <Tag size='l' addonLeft={VideoListL} addonRight={VideoListL} theme='additional' color='white-500' mb={2} interactive>
            L  white
          </Tag>
          <Tag size='xl' addonLeft={VideoListL} addonRight={VideoListL} theme='additional' color='white-500' mb={2} interactive>
            Xl  white
          </Tag>

        </Box>
      </Flex>
    </Flex>
  );
};

export default Demo;
