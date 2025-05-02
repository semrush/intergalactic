import React from 'react';
import Divider from '@semcore/divider';
import { Flex } from '@semcore/flex-box';

const Demo = () => {
    return (
<>
        <Flex w={200} direction='column' style={{ background: '#979797' }}>
            <Divider orientation='horizontal' use='primary' mb={2} mt={2} />
            <Divider orientation='horizontal' use='secondary' mb={2} />
            <Divider orientation='horizontal' use='primary' theme='default' mb={2} />
            <Divider orientation='horizontal' use='secondary' theme='default' mb={2} />
            <Divider orientation='horizontal' use='primary' theme='invert' mb={2} />
            <Divider orientation='horizontal' use='secondary' theme='invert' mb={2} />
            <Divider orientation='horizontal' use='primary' theme='border-warning-active' mb={2} />
            <Divider orientation='horizontal' use='secondary' theme='border-warning-active' mb={2} />
        </Flex>

        <Flex w={200} h={100} direction='row' style={{ background: '#979797' }}>
            <Divider orientation='vertical' use='primary' mr={2}  />
            <Divider orientation='vertical' use='secondary' mr={2} />
            <Divider orientation='vertical' use='primary' theme='default' mr={2} />
            <Divider orientation='vertical' use='secondary' theme='default'mr={2} />
            <Divider orientation='vertical' use='primary' theme='invert' mr={2} />
            <Divider orientation='vertical' use='secondary' theme='invert' mr={2} />
            <Divider orientation='vertical' use='primary' theme='border-warning-active' mr={2}/>
            <Divider orientation='vertical' use='secondary' theme='border-warning-active' mr={2} />
        </Flex>
        </>
    );
};

export default Demo;
