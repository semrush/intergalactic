import React from 'react';
import Spin from '@semcore/spin';
import { Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';

const Demo = () => {
    return (
        <>
            <Flex
                alignItems="center"
                direction="row"
                gap={1}>
                <Spin size='xs' locale='de'/>
                <Text
                    color="text-secondary"
                    size={100}>
                   size='xs'
                </Text>
            </Flex>
            <Flex
                alignItems="center"
                direction="row"
                gap={1}>
                <Spin size='s'/>
                <Text
                    color="text-secondary"
                    size={100}>
                   size='s'
                </Text>
            </Flex>
            <Flex
                alignItems="center"
                direction="row"
                gap={2}>
                <Spin size='m'/>
                <Text
                    color="text-secondary"
                    size={200}>
                   size='m'
                </Text>
            </Flex>
            <Flex
                alignItems="center"
                direction="row"
                gap={2}>
                <Spin size='l'/>
                <Text
                    color="text-secondary"
                    size={300}>
                   size='l'
                </Text>
            </Flex>
            <Flex
                alignItems="center"
                direction="row"
                gap={4}>
                <Spin size='xl'/>
                <Text
                    color="text-secondary"
                    size={300}>
                   size='xl'
                </Text>
            </Flex>
            <Flex
                alignItems="center"
                direction="row"
                gap={4}>
                <Spin size='xxl'/>
                <Text
                    color="text-secondary"
                    size={300}>
                   size='xxl'
                </Text>
            </Flex>
        </>
    );
};

export default Demo;
