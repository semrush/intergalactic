

import React from 'react';
import { Text } from '@semcore/typography';
import SpinContainer from '@semcore/spin-container';
import { Flex } from '@semcore/flex-box';

class Demo extends React.PureComponent {

    render() {
        return (
            <>
                <Flex h={150}>
                    <SpinContainer loading size='xs'>
                        <Text >Hello world</Text>
                    </SpinContainer>

                    <SpinContainer loading size='s'>
                        <Text >Hello world</Text>
                    </SpinContainer>

                    <SpinContainer loading size='m'>
                        <Text  >Hello world</Text>
                    </SpinContainer>

                    <SpinContainer loading size='l'>
                        <Text  >Hello world</Text>
                    </SpinContainer>

                    <SpinContainer loading size='xl'>
                        <Text >Hello world</Text>
                    </SpinContainer>


                    <SpinContainer loading size='xxl'>
                        <Text h={250} >Hello world</Text>
                    </SpinContainer>

                </Flex>

                <Flex h={150}>
                    <SpinContainer theme="invert" loading size='xs'>
                        <Text >Hello world</Text>
                    </SpinContainer>

                    <SpinContainer theme="invert" loading size='s'>
                        <Text >Hello world</Text>
                    </SpinContainer>

                    <SpinContainer theme="invert" loading size='m'>
                        <Text  >Hello world</Text>
                    </SpinContainer>

                    <SpinContainer theme="invert" loading size='l'>
                        <Text  >Hello world</Text>
                    </SpinContainer>

                    <SpinContainer theme="invert" loading size='xl'>
                        <Text >Hello world</Text>
                    </SpinContainer>


                    <SpinContainer theme="invert" loading size='xxl'>
                        <Text h={250} >Hello world</Text>
                    </SpinContainer>

                </Flex>
            </>
        );
    }
}

export default () => <Demo />;
