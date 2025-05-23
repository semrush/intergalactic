import React from 'react';
import Radio, { RadioGroup } from '@semcore/radio';
import { Text } from '@semcore/typography';
import { Flex } from '@semcore/flex-box';

const Demo = () => {
  const [value, setValue] = React.useState('10');
  return (
    <Flex direction='row' >

<RadioGroup theme='blue' name='demo-radio' mr={6} w={250}  value={value}
        onChange={(v:any) => setValue(v)}>
      <Flex direction='column' gap={2} >
        <Text size={200}>States whrn radio theme set</Text>

        <Radio value='1' state='invalid' label=' supports state=invalid' />

        <Radio value='3' theme='yellow' label='theme=yellow' />

        <Radio value='5' state='invalid' disabled label=' supports state=invalid and disabled' />

        <Radio value='6' disabled label='supports disabled' />

        <Radio value='7' state='normal' label='supports normal state' />
        <Radio value='8' state='invalid' theme='yellow' label='supports state=invalid and theme' />

        <Radio value='9' label='checked via checked prop '>
          <Radio.Value
            autoFocus
          />
          <Radio.Text>supports autoFocused</Radio.Text>
         
        </Radio>
        <Radio value='10' state='normal' label='supports normal state checked' />
      </Flex>
    </RadioGroup>


    <RadioGroup disabled size = 'l' name='disabled-radio-group'  mr={6} w={250} value={value}
        onChange={(v:any) => setValue(v)}>
      <Flex direction='column' gap={2}>
        <Text size={200}>Radio group L is disabled</Text>

        <Radio value='1' state='invalid' label='supports state=invalid' />


        <Radio value='2' theme='yellow' label='supports theme=yellow' />

        <Radio value='3' state='invalid' disabled label='supports state=invalid and disabled' />

        <Radio value='4' disabled label='supports disabled' />

        <Radio value='5' state='normal' label='supports normal state' />

        <Radio value='6' label='supports checked prop'>
          <Radio.Value
            autoFocus
          />
          <Radio.Text>supports autoFocus</Radio.Text>
        </Radio>

        <Radio value='10' state='normal' label='supports normal state checked' />
      </Flex>
    </RadioGroup>

    <RadioGroup name='sizes-in-children-radio-group '  mr={6} w={250} value={value}
        onChange={(v:any) => setValue(v)}>
      <Flex direction='column' gap={2}>
        <Text size={200}>Sizes set in radios</Text>

        <Radio size = 'm' value='1' state='invalid' label=' supports state=invalid and m' />
        <Radio size = 'l' value='2' state='invalid' label='supports state=invalid and l' />
        <Radio value='10' size = 'l' state='invalid' label='supports invalid state checked l' />
        <Radio size = 'm' value='3' state='normal' label='supports normal state and m' />
        <Radio size = 'l' value='4' state='normal' label='supports normal state and l' />

      </Flex>
    </RadioGroup>

    <RadioGroup size = 'l' name='sizes-in-parent-and-children-radio-group' w={250} value={value}
        onChange={(v:any) => setValue(v)}>
      <Flex direction='column' gap={2}>
        <Text size={200}>Sizes set in group and radios</Text>

        <Radio size = 'm' value='1' state='invalid' label='supports state=invalid and m' />
        <Radio size = 'l' value='2' state='invalid' label='supports state=invalid and l' />

        <Radio size = 'm' value='4' state='normal' label='supports normal state and m' />
        <Radio size = 'l' value='5' state='normal' label='supports normal state and l' />
        <Radio value='10' size = 'm' label='supports normal state checked m' />
      </Flex>
    </RadioGroup>
    </Flex>
  );
};

export default Demo;
