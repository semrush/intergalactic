import React from 'react';
import { Text } from '@semcore/typography';
import SpinContainer from '@semcore/spin-container';
import { Flex } from '@semcore/flex-box';

class Demo extends React.PureComponent {

  render() {

    return (
      <>
        <Flex>
          <SpinContainer background={'blanchedalmond'} loading>
            <div style={{ width: 200, height: 200 }}>Hello world</div>
            <SpinContainer.Overlay>No theme overlay</SpinContainer.Overlay>
          </SpinContainer>
          <SpinContainer background={'#3eeb4c'} loading  >
            <div style={{ width: 200, height: 200 }}>Hello world</div>
          </SpinContainer>
          <SpinContainer background={'dark-violet'} loading>
            <div style={{ width: 200, height: 200 }}>Hello world</div>
          </SpinContainer>
        </Flex>

        <Flex>
          <SpinContainer background={'blanchedalmond'} loading theme="dark">
            <div style={{ width: 200, height: 200 }}>Hello world</div>
         
          </SpinContainer>
          <SpinContainer background={'#3eeb4c'} loading theme="dark">
            <div style={{ width: 200, height: 200 }}>Hello world</div>
            <SpinContainer.Overlay>Dark theme overlay</SpinContainer.Overlay>
          </SpinContainer>
          <SpinContainer background={'dark-violet'} loading theme="dark">
            <div style={{ width: 200, height: 200 }}>Hello world</div>
          </SpinContainer>
        </Flex>
        <Flex>
          <SpinContainer background={'blanchedalmond'} loading theme="invert">
            <div style={{ width: 200, height: 200 }}>Hello world</div>
          </SpinContainer>
          <SpinContainer background={'#3eeb4c'} loading theme="invert">
            <div style={{ width: 200, height: 200 }}>Hello world</div>
          </SpinContainer>
          <SpinContainer background="blue" loading theme="invert">
          <SpinContainer.Overlay>Invert theme overlay</SpinContainer.Overlay>
            <div style={{ width: 200, height: 200 }}>Hello world</div>
          </SpinContainer>
        </Flex>
      </>
    );
  }
}

export default () => <Demo />;
