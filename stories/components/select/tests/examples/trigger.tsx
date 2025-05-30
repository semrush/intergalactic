import React from 'react';
import { Flex } from '@semcore/flex-box';
import Select from '@semcore/select';
import { LinkTrigger, ButtonTrigger } from '@semcore/base-trigger';



const Demo = () => (
    <Flex direction='column' gap ={2}>

        <Select state='normal' tag={ButtonTrigger}>
            <Select.Trigger />
        </Select>

        <Select state='invalid'>
            <Select.Trigger />
        </Select>

        <Select state='valid'>
            <Select.Trigger />
        </Select>

        <Select disabled>
            <Select.Trigger />
        </Select>

        {/* with selected option */}
        <Select value={1}>
            <Select.Trigger />
        </Select>

        <Select >
            <Select.Trigger loading/>
        </Select>

        {/* 'Trigger with selected option ellipsis text renders correctly', */}
        <Select value={'English burashka gpq 1'}>
            <Select.Trigger w={100} />
        </Select>

        {/* 'MultiSelect trigger with selected options renders correctly', */}
        <Select multiselect value={[1, 2, 3]}>
            <Select.Trigger />
        </Select>

        <Select placeholder='placeholder'>
            <Select.Trigger />
        </Select>

        <Select>
            <Select.Trigger disabled />
        </Select>
    </Flex>
);

export default Demo;
