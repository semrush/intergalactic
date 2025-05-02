import React from 'react';
import Divider from '@semcore/divider';
import { Flex } from '@semcore/flex-box';

const Demo = () => {
    return (

        <Flex w={200} direction='column' style={{ background: '#979797' }}>
            <Divider use='primary' mb={2} mt={2} />
            <Divider use='secondary' mb={2} />
            <Divider use='primary' theme='default' mb={2} />
            <Divider use='secondary' theme='default' mb={2} />
            <Divider use='primary' theme='invert' mb={2} />
            <Divider use='secondary' theme='invert' mb={2} />
            <Divider use='primary' theme='border-warning-active' mb={2} />
            <Divider use='secondary' theme='border-warning-active' mb={2} />

        </Flex>
    );
};

export default Demo;
