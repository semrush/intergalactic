import { Flex } from '@semcore/ui/base-components';
import Input from '@semcore/ui/input';
import SpinContainer from '@semcore/ui/spin-container';
import { Text } from '@semcore/ui/typography';
import React from 'react';

class Demo extends React.PureComponent {
  render() {
    return (
      <Flex>
        <SpinContainer
          background={undefined}
          p='3px'
          size='xxl'
        >
          <Flex
            direction='column'
            gap={2}
            w={150}
          >
            <Text
              htmlFor='input-1'
              size={200}
              tag='label'
            >
              Input 1
            </Text>
            <Input>
              <Input.Value id='input-1' />
            </Input>
            <Text
              htmlFor='input-2'
              mt={2}
              size={200}
              tag='label'
            >
              Input 2
            </Text>
            <Input>
              <Input.Value id='input-2' />
            </Input>
          </Flex>
        </SpinContainer>

        <SpinContainer
          background={undefined}
          loading={true}
          p='3px'
          size='xxl'
        >
          <Flex
            direction='column'
            gap={2}
            w={150}
          >
            <Text
              htmlFor='input-1'
              size={200}
              tag='label'
            >
              Input 1
            </Text>
            <Input>
              <Input.Value id='input-1' />
            </Input>
            <Text
              htmlFor='input-2'
              mt={2}
              size={200}
              tag='label'
            >
              Input 2
            </Text>
            <Input>
              <Input.Value id='input-2' />
            </Input>
          </Flex>
        </SpinContainer>

        <SpinContainer loading>
          <SpinContainer.Content>
            <div style={{ width: 200, height: 200 }}>Hello world</div>
          </SpinContainer.Content>
          <SpinContainer.Overlay>With overlay</SpinContainer.Overlay>
        </SpinContainer>
      </Flex>
    );
  }
}

export default () => <Demo />;
