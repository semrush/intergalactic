import SmileHappyL from '@semcore/icon/SmileHappy/l';
import SmileHappyM from '@semcore/icon/SmileHappy/m';
import { Flex, Box } from '@semcore/ui/flex-box';
import Tag, { TagContainer } from '@semcore/ui/tag';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const Demo = () => {
  return (
    <Flex direction='row' gap={1}>
      <Flex direction='column' gap={2} mb={3} data-testid='Primary-base' w={200}>
        <Text size={100}>Primary-base</Text>

        <TagContainer
          color='gray-500'
          size='m'
          theme='primary'
          interactive
        >
          <TagContainer.Tag>
            <Tag.Addon>
              <SmileHappyM />
            </Tag.Addon>
            <Tag.Text>
              M gray
            </Tag.Text>
          </TagContainer.Tag>
          <TagContainer.Close />
        </TagContainer>

        <TagContainer
          color='gray-500'
          size='l'
          theme='primary'
          interactive
        >
          <TagContainer.Tag>
            <Tag.Addon>
              <SmileHappyL />
            </Tag.Addon>
            <Tag.Text>
              L gray
            </Tag.Text>
          </TagContainer.Tag>
          <TagContainer.Close />
        </TagContainer>

        <TagContainer
          color='gray-500'
          size='xl'
          theme='primary'
          interactive
        >
          <TagContainer.Tag>
            <Tag.Addon>
              <SmileHappyL />
            </Tag.Addon>
            <Tag.Text>
              XL gray
            </Tag.Text>
          </TagContainer.Tag>
          <TagContainer.Close />
        </TagContainer>

        <TagContainer
          color='blue-500'
          size='m'
          theme='primary'
          interactive
        >
          <TagContainer.Tag>
            <Tag.Addon>
              <SmileHappyM />
            </Tag.Addon>
            <Tag.Text>
              M blue
            </Tag.Text>
          </TagContainer.Tag>
          <TagContainer.Close />
        </TagContainer>

        <TagContainer
          color='blue-500'
          size='l'
          theme='primary'
          interactive
        >
          <TagContainer.Tag>
            <Tag.Addon>
              <SmileHappyL />
            </Tag.Addon>
            <Tag.Text>
              L blue
            </Tag.Text>
          </TagContainer.Tag>
          <TagContainer.Close />
        </TagContainer>

        <TagContainer
          color='blue-500'
          size='xl'
          theme='primary'
          interactive
        >
          <TagContainer.Tag>
            <Tag.Addon>
              <SmileHappyL />
            </Tag.Addon>
            <Tag.Text>
              XL blue
            </Tag.Text>
          </TagContainer.Tag>
          <TagContainer.Close />
        </TagContainer>

        <TagContainer
          color='green-500'
          size='m'
          theme='primary'
          interactive
        >
          <TagContainer.Tag>
            <Tag.Addon>
              <SmileHappyM />
            </Tag.Addon>
            <Tag.Text>
              M green
            </Tag.Text>
          </TagContainer.Tag>
          <TagContainer.Close />
        </TagContainer>

        <TagContainer
          color='green-500'
          size='l'
          theme='primary'
          interactive
        >
          <TagContainer.Tag>
            <Tag.Addon>
              <SmileHappyL />
            </Tag.Addon>
            <Tag.Text>
              L green
            </Tag.Text>
          </TagContainer.Tag>
          <TagContainer.Close />
        </TagContainer>

        <TagContainer
          color='green-500'
          size='xl'
          theme='primary'
          interactive
        >
          <TagContainer.Tag>
            <Tag.Addon>
              <SmileHappyL />
            </Tag.Addon>
            <Tag.Text>
              XL green
            </Tag.Text>
          </TagContainer.Tag>
          <TagContainer.Close />
        </TagContainer>

        <TagContainer
          color='salad-500'
          size='m'
          theme='primary'
          interactive
        >
          <TagContainer.Tag>
            <Tag.Addon>
              <SmileHappyM />
            </Tag.Addon>
            <Tag.Text>
              M salad
            </Tag.Text>
          </TagContainer.Tag>
          <TagContainer.Close />
        </TagContainer>

        <TagContainer
          color='salad-500'
          size='l'
          theme='primary'
          interactive
        >
          <TagContainer.Tag>
            <Tag.Addon>
              <SmileHappyL />
            </Tag.Addon>
            <Tag.Text>
              L salad
            </Tag.Text>
          </TagContainer.Tag>
          <TagContainer.Close />
        </TagContainer>

        <TagContainer
          color='salad-500'
          size='xl'
          theme='primary'
          interactive
        >
          <TagContainer.Tag>
            <Tag.Addon>
              <SmileHappyL />
            </Tag.Addon>
            <Tag.Text>
              XL salad
            </Tag.Text>
          </TagContainer.Tag>
          <TagContainer.Close />
        </TagContainer>

        <TagContainer
          color='orange-500'
          size='m'
          theme='primary'
          interactive
        >
          <TagContainer.Tag>
            <Tag.Addon>
              <SmileHappyM />
            </Tag.Addon>
            <Tag.Text>
              M orange
            </Tag.Text>
          </TagContainer.Tag>
          <TagContainer.Close />
        </TagContainer>

        <TagContainer
          color='orange-500'
          size='l'
          theme='primary'
          interactive
        >
          <TagContainer.Tag>
            <Tag.Addon>
              <SmileHappyL />
            </Tag.Addon>
            <Tag.Text>
              L orange
            </Tag.Text>
          </TagContainer.Tag>
          <TagContainer.Close />
        </TagContainer>

        <TagContainer
          color='orange-500'
          size='xl'
          theme='primary'
          interactive
        >
          <TagContainer.Tag>
            <Tag.Addon>
              <SmileHappyL />
            </Tag.Addon>
            <Tag.Text>
              XL orange
            </Tag.Text>
          </TagContainer.Tag>
          <TagContainer.Close />
        </TagContainer>

        <TagContainer
          color='yellow-500'
          size='m'
          theme='primary'
          interactive
        >
          <TagContainer.Tag>
            <Tag.Addon>
              <SmileHappyM />
            </Tag.Addon>
            <Tag.Text>
              M yellow
            </Tag.Text>
          </TagContainer.Tag>
          <TagContainer.Close />
        </TagContainer>

        <TagContainer
          color='yellow-500'
          size='l'
          theme='primary'
          interactive
        >
          <TagContainer.Tag>
            <Tag.Addon>
              <SmileHappyL />
            </Tag.Addon>
            <Tag.Text>
              L yellow
            </Tag.Text>
          </TagContainer.Tag>
          <TagContainer.Close />
        </TagContainer>

        <TagContainer
          color='yellow-500'
          size='xl'
          theme='primary'
          interactive
        >
          <TagContainer.Tag>
            <Tag.Addon>
              <SmileHappyL />
            </Tag.Addon>
            <Tag.Text>
              XL yellow
            </Tag.Text>
          </TagContainer.Tag>
          <TagContainer.Close />
        </TagContainer>

        <TagContainer
          color='red-500'
          size='m'
          theme='primary'
          interactive
        >
          <TagContainer.Tag>
            <Tag.Addon>
              <SmileHappyM />
            </Tag.Addon>
            <Tag.Text>
              M red
            </Tag.Text>
          </TagContainer.Tag>
          <TagContainer.Close />
        </TagContainer>

        <TagContainer
          color='red-500'
          size='l'
          theme='primary'
          interactive
        >
          <TagContainer.Tag>
            <Tag.Addon>
              <SmileHappyL />
            </Tag.Addon>
            <Tag.Text>
              L red
            </Tag.Text>
          </TagContainer.Tag>
          <TagContainer.Close />
        </TagContainer>

        <TagContainer
          color='red-500'
          size='xl'
          theme='primary'
          interactive
        >
          <TagContainer.Tag>
            <Tag.Addon>
              <SmileHappyL />
            </Tag.Addon>
            <Tag.Text>
              XL red
            </Tag.Text>
          </TagContainer.Tag>
          <TagContainer.Close />
        </TagContainer>

        <TagContainer
          color='pink-500'
          size='m'
          theme='primary'
          interactive
        >
          <TagContainer.Tag>
            <Tag.Addon>
              <SmileHappyM />
            </Tag.Addon>
            <Tag.Text>
              M pink
            </Tag.Text>
          </TagContainer.Tag>
          <TagContainer.Close />
        </TagContainer>

        <TagContainer
          color='pink-500'
          size='l'
          theme='primary'
          interactive
        >
          <TagContainer.Tag>
            <Tag.Addon>
              <SmileHappyL />
            </Tag.Addon>
            <Tag.Text>
              L pink
            </Tag.Text>
          </TagContainer.Tag>
          <TagContainer.Close />
        </TagContainer>

        <TagContainer
          color='pink-500'
          size='xl'
          theme='primary'
          interactive
        >
          <TagContainer.Tag>
            <Tag.Addon>
              <SmileHappyL />
            </Tag.Addon>
            <Tag.Text>
              XL pink
            </Tag.Text>
          </TagContainer.Tag>
          <TagContainer.Close />
        </TagContainer>

        <TagContainer
          color='violet-500'
          size='m'
          theme='primary'
          interactive
        >
          <TagContainer.Tag>
            <Tag.Addon>
              <SmileHappyM />
            </Tag.Addon>
            <Tag.Text>
              M violet
            </Tag.Text>
          </TagContainer.Tag>
          <TagContainer.Close />
        </TagContainer>

        <TagContainer
          color='violet-500'
          size='l'
          theme='primary'
          interactive
        >
          <TagContainer.Tag>
            <Tag.Addon>
              <SmileHappyL />
            </Tag.Addon>
            <Tag.Text>
              L violet
            </Tag.Text>
          </TagContainer.Tag>
          <TagContainer.Close />
        </TagContainer>

        <TagContainer
          color='violet-500'
          size='xl'
          theme='primary'
          interactive
        >
          <TagContainer.Tag>
            <Tag.Addon>
              <SmileHappyL />
            </Tag.Addon>
            <Tag.Text>
              XL violet
            </Tag.Text>
          </TagContainer.Tag>
          <TagContainer.Close />
        </TagContainer>

        <Box style={{ backgroundColor: '#191B23' }} mb={3} p={1}>
          <TagContainer
            color='white-500'
            size='m'
            theme='primary'
            interactive
          >
            <TagContainer.Tag>
              <Tag.Addon>
                <SmileHappyM />
              </Tag.Addon>
              <Tag.Text>
                M white
              </Tag.Text>
            </TagContainer.Tag>
            <TagContainer.Close />
          </TagContainer>

          <TagContainer
            color='white-500'
            size='l'
            theme='primary'
            interactive
          >
            <TagContainer.Tag>
              <Tag.Addon>
                <SmileHappyL />
              </Tag.Addon>
              <Tag.Text>
                L white
              </Tag.Text>
            </TagContainer.Tag>
            <TagContainer.Close />
          </TagContainer>

          <TagContainer
            color='white-500'
            size='xl'
            theme='primary'
            interactive
          >
            <TagContainer.Tag>
              <Tag.Addon>
                <SmileHappyL />
              </Tag.Addon>
              <Tag.Text>
                XL white
              </Tag.Text>
            </TagContainer.Tag>
            <TagContainer.Close />
          </TagContainer>

        </Box>
      </Flex>
      <Flex direction='column' gap={2} mb={3} data-testid='secondary-base' w={200}>
        <Text size={100}>Primary-base</Text>

        <TagContainer
          color='gray-500'
          size='m'
          theme='secondary'
          interactive
        >
          <TagContainer.Tag>
            <Tag.Addon>
              <SmileHappyM />
            </Tag.Addon>
            <Tag.Text>
              M gray
            </Tag.Text>
          </TagContainer.Tag>
          <TagContainer.Close />
        </TagContainer>

        <TagContainer
          color='gray-500'
          size='l'
          theme='secondary'
          interactive
        >
          <TagContainer.Tag>
            <Tag.Addon>
              <SmileHappyL />
            </Tag.Addon>
            <Tag.Text>
              L gray
            </Tag.Text>
          </TagContainer.Tag>
          <TagContainer.Close />
        </TagContainer>

        <TagContainer
          color='gray-500'
          size='xl'
          theme='secondary'
          interactive
        >
          <TagContainer.Tag>
            <Tag.Addon>
              <SmileHappyL />
            </Tag.Addon>
            <Tag.Text>
              XL gray
            </Tag.Text>
          </TagContainer.Tag>
          <TagContainer.Close />
        </TagContainer>

        <TagContainer
          color='blue-500'
          size='m'
          theme='secondary'
          interactive
        >
          <TagContainer.Tag>
            <Tag.Addon>
              <SmileHappyM />
            </Tag.Addon>
            <Tag.Text>
              M blue
            </Tag.Text>
          </TagContainer.Tag>
          <TagContainer.Close />
        </TagContainer>

        <TagContainer
          color='blue-500'
          size='l'
          theme='secondary'
        >
          <TagContainer.Tag>
            <Tag.Addon>
              <SmileHappyL />
            </Tag.Addon>
            <Tag.Text>
              L blue
            </Tag.Text>
          </TagContainer.Tag>
          <TagContainer.Close />
        </TagContainer>

        <TagContainer
          color='blue-500'
          size='xl'
          theme='secondary'
        >
          <TagContainer.Tag>
            <Tag.Addon>
              <SmileHappyL />
            </Tag.Addon>
            <Tag.Text>
              XL blue
            </Tag.Text>
          </TagContainer.Tag>
          <TagContainer.Close />
        </TagContainer>

        <TagContainer
          color='green-500'
          size='m'
          theme='secondary'
        >
          <TagContainer.Tag>
            <Tag.Addon>
              <SmileHappyM />
            </Tag.Addon>
            <Tag.Text>
              M green
            </Tag.Text>
          </TagContainer.Tag>
          <TagContainer.Close />
        </TagContainer>

        <TagContainer
          color='green-500'
          size='l'
          theme='secondary'
        >
          <TagContainer.Tag>
            <Tag.Addon>
              <SmileHappyL />
            </Tag.Addon>
            <Tag.Text>
              L green
            </Tag.Text>
          </TagContainer.Tag>
          <TagContainer.Close />
        </TagContainer>

        <TagContainer
          color='green-500'
          size='xl'
          theme='secondary'
        >
          <TagContainer.Tag>
            <Tag.Addon>
              <SmileHappyL />
            </Tag.Addon>
            <Tag.Text>
              XL green
            </Tag.Text>
          </TagContainer.Tag>
          <TagContainer.Close />
        </TagContainer>

        <TagContainer
          color='salad-500'
          size='m'
          theme='secondary'
        >
          <TagContainer.Tag>
            <Tag.Addon>
              <SmileHappyM />
            </Tag.Addon>
            <Tag.Text>
              M salad
            </Tag.Text>
          </TagContainer.Tag>
          <TagContainer.Close />
        </TagContainer>

        <TagContainer
          color='salad-500'
          size='l'
          theme='secondary'
        >
          <TagContainer.Tag>
            <Tag.Addon>
              <SmileHappyL />
            </Tag.Addon>
            <Tag.Text>
              L salad
            </Tag.Text>
          </TagContainer.Tag>
          <TagContainer.Close />
        </TagContainer>

        <TagContainer
          color='salad-500'
          size='xl'
          theme='secondary'
        >
          <TagContainer.Tag>
            <Tag.Addon>
              <SmileHappyL />
            </Tag.Addon>
            <Tag.Text>
              XL salad
            </Tag.Text>
          </TagContainer.Tag>
          <TagContainer.Close />
        </TagContainer>

        <TagContainer
          color='orange-500'
          size='m'
          theme='secondary'
        >
          <TagContainer.Tag>
            <Tag.Addon>
              <SmileHappyM />
            </Tag.Addon>
            <Tag.Text>
              M orange
            </Tag.Text>
          </TagContainer.Tag>
          <TagContainer.Close />
        </TagContainer>

        <TagContainer
          color='orange-500'
          size='l'
          theme='secondary'
        >
          <TagContainer.Tag>
            <Tag.Addon>
              <SmileHappyL />
            </Tag.Addon>
            <Tag.Text>
              L orange
            </Tag.Text>
          </TagContainer.Tag>
          <TagContainer.Close />
        </TagContainer>

        <TagContainer
          color='orange-500'
          size='xl'
          theme='secondary'
        >
          <TagContainer.Tag>
            <Tag.Addon>
              <SmileHappyL />
            </Tag.Addon>
            <Tag.Text>
              XL orange
            </Tag.Text>
          </TagContainer.Tag>
          <TagContainer.Close />
        </TagContainer>

        <TagContainer
          color='yellow-500'
          size='m'
          theme='secondary'
        >
          <TagContainer.Tag>
            <Tag.Addon>
              <SmileHappyM />
            </Tag.Addon>
            <Tag.Text>
              M yellow
            </Tag.Text>
          </TagContainer.Tag>
          <TagContainer.Close />
        </TagContainer>

        <TagContainer
          color='yellow-500'
          size='l'
          theme='secondary'
        >
          <TagContainer.Tag>
            <Tag.Addon>
              <SmileHappyL />
            </Tag.Addon>
            <Tag.Text>
              L yellow
            </Tag.Text>
          </TagContainer.Tag>
          <TagContainer.Close />
        </TagContainer>

        <TagContainer
          color='yellow-500'
          size='xl'
          theme='secondary'
        >
          <TagContainer.Tag>
            <Tag.Addon>
              <SmileHappyL />
            </Tag.Addon>
            <Tag.Text>
              XL yellow
            </Tag.Text>
          </TagContainer.Tag>
          <TagContainer.Close />
        </TagContainer>

        <TagContainer
          color='red-500'
          size='m'
          theme='secondary'
        >
          <TagContainer.Tag>
            <Tag.Addon>
              <SmileHappyM />
            </Tag.Addon>
            <Tag.Text>
              M red
            </Tag.Text>
          </TagContainer.Tag>
          <TagContainer.Close />
        </TagContainer>

        <TagContainer
          color='red-500'
          size='l'
          theme='secondary'
        >
          <TagContainer.Tag>
            <Tag.Addon>
              <SmileHappyL />
            </Tag.Addon>
            <Tag.Text>
              L red
            </Tag.Text>
          </TagContainer.Tag>
          <TagContainer.Close />
        </TagContainer>

        <TagContainer
          color='red-500'
          size='xl'
          theme='secondary'
        >
          <TagContainer.Tag>
            <Tag.Addon>
              <SmileHappyL />
            </Tag.Addon>
            <Tag.Text>
              XL red
            </Tag.Text>
          </TagContainer.Tag>
          <TagContainer.Close />
        </TagContainer>

        <TagContainer
          color='pink-500'
          size='m'
          theme='secondary'
        >
          <TagContainer.Tag>
            <Tag.Addon>
              <SmileHappyM />
            </Tag.Addon>
            <Tag.Text>
              M pink
            </Tag.Text>
          </TagContainer.Tag>
          <TagContainer.Close />
        </TagContainer>

        <TagContainer
          color='pink-500'
          size='l'
          theme='secondary'
        >
          <TagContainer.Tag>
            <Tag.Addon>
              <SmileHappyL />
            </Tag.Addon>
            <Tag.Text>
              L pink
            </Tag.Text>
          </TagContainer.Tag>
          <TagContainer.Close />
        </TagContainer>

        <TagContainer
          color='pink-500'
          size='xl'
          theme='secondary'
        >
          <TagContainer.Tag>
            <Tag.Addon>
              <SmileHappyL />
            </Tag.Addon>
            <Tag.Text>
              XL pink
            </Tag.Text>
          </TagContainer.Tag>
          <TagContainer.Close />
        </TagContainer>

        <TagContainer
          color='violet-500'
          size='m'
          theme='secondary'
        >
          <TagContainer.Tag>
            <Tag.Addon>
              <SmileHappyM />
            </Tag.Addon>
            <Tag.Text>
              M violet
            </Tag.Text>
          </TagContainer.Tag>
          <TagContainer.Close />
        </TagContainer>

        <TagContainer
          color='violet-500'
          size='l'
          theme='secondary'
        >
          <TagContainer.Tag>
            <Tag.Addon>
              <SmileHappyL />
            </Tag.Addon>
            <Tag.Text>
              L violet
            </Tag.Text>
          </TagContainer.Tag>
          <TagContainer.Close />
        </TagContainer>

        <TagContainer
          color='violet-500'
          size='xl'
          theme='secondary'
        >
          <TagContainer.Tag>
            <Tag.Addon>
              <SmileHappyL />
            </Tag.Addon>
            <Tag.Text>
              XL violet
            </Tag.Text>
          </TagContainer.Tag>
          <TagContainer.Close />
        </TagContainer>

        <Box style={{ backgroundColor: '#191B23' }} mb={3} p={1}>
          <TagContainer
            color='white-500'
            size='m'
            theme='secondary'
          >
            <TagContainer.Tag>
              <Tag.Addon>
                <SmileHappyM />
              </Tag.Addon>
              <Tag.Text>
                M white
              </Tag.Text>
            </TagContainer.Tag>
            <TagContainer.Close />
          </TagContainer>

          <TagContainer
            color='white-500'
            size='l'
            theme='secondary'
          >
            <TagContainer.Tag>
              <Tag.Addon>
                <SmileHappyL />
              </Tag.Addon>
              <Tag.Text>
                L white
              </Tag.Text>
            </TagContainer.Tag>
            <TagContainer.Close />
          </TagContainer>

          <TagContainer
            color='white-500'
            size='xl'
            theme='secondary'
          >
            <TagContainer.Tag>
              <Tag.Addon>
                <SmileHappyL />
              </Tag.Addon>
              <Tag.Text>
                XL white
              </Tag.Text>
            </TagContainer.Tag>
            <TagContainer.Close />
          </TagContainer>

        </Box>
      </Flex>
    </Flex>
  );
};

export default Demo;
