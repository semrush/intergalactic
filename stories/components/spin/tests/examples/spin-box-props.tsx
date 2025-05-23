import React from 'react';
import Spin from '@semcore/spin';
import { Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';

const Demo = () => {
    return (
        <>
                <Spin w={50}/>
                <Spin h={50}/>
                <Spin w={50}  h={50} m={4}/>
                <Spin w={50}  h={50} p={4}/>
                <Spin w={50}  h={50} pb={4}/>
        </>
    );
};

export default Demo;
