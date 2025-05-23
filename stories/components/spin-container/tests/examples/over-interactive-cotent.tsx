import React from 'react';
import { Text } from '@semcore/typography';
import SpinContainer from '@semcore/spin-container';
import Input from '@semcore/input';
import { Flex } from '@semcore/flex-box';

class Demo extends React.PureComponent {


  render() {

    return (
      <Flex>
        <SpinContainer
          background={undefined}
          p="3px"
          size="xxl"
          theme="dark"
        >
          <Flex
            direction="column"
            gap={2}
            w={150}>
            <Text
              htmlFor="input-1"
              size={200}
              tag="label" >
              Input 1
            </Text>
            <Input>
              <Input.Value id="input-1" />
            </Input>
            <Text
              htmlFor="input-2"
              mt={2}
              size={200}
              tag="label">
              Input 2
            </Text>
            <Input>
              <Input.Value id="input-2" />
            </Input>
          </Flex>
        </SpinContainer>


        <SpinContainer
          background={undefined}
          loading={true}
          p="3px"
          size="xxl">
          <Flex
            direction="column"
            gap={2}
            w={150}>
            <Text
              htmlFor="input-1"
              size={200}
              tag="label">
              Input 1
            </Text>
            <Input>
              <Input.Value id="input-1" />
            </Input>
            <Text
              htmlFor="input-2"
              mt={2}
              size={200}
              tag="label">
              Input 2
            </Text>
            <Input>
              <Input.Value id="input-2" />
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
