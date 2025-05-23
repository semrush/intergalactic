import React from 'react';
import { Flex, Box } from '@semcore/flex-box';
import { Text } from '@semcore/typography';

const Demo = () => (
  <>
    <Text fontSize='10px' mb={2} >Tiny text 10px</Text>
    <br />
    <Text fontSize='20px'>Larger text 20px</Text>
    <br />
    <Text lineHeight='40px'>
      This is a tall line-height example 40px
    </Text>

    <br />
    <Text inline fontWeight={100}>fontWeight = 100 text </Text>
    <br />
    <Text inline fontWeight={900} mb={3} > fontWeight = 900 text</Text>
    <br />

    <Text>Normal text</Text>
    <br />
    <Text use='primary'>Use primary</Text>
    <br />
    <Text inline use='secondary' mb={2} >Use secondary</Text>
    <br />
    <div style={{ width: 200 }}>
      <Text inline textAlign='left'>Left-aligned text example</Text>
    </div>
    <div style={{ width: 200 }}>
      <Text w={200} inline textAlign='center'  >
        Centered text example
      </Text>
    </div>
    <div style={{ width: 200 }}>
      <Text w={200} inline textAlign='right' >
        Right-aligned text example
      </Text>
    </div>
    <br />
    <Text display='block' w={100} fontWeight={900} noWrap>
      Ellipsis This text should not wrap
    </Text>
    <br />
    <Text inline fontWeight={900} disabled mb={2}>Disabled text example</Text>
    <br />
    <Text inline size={800} fontSize='12px' mb={2}>
      High priority for fontSize size=800 fontSize=12px
    </Text>
    <br />
    <Text color='blanchedalmond'>blanchedalmond</Text>
    <br />
    <Text color='#3eeb4c'>#3eeb4c</Text>
    <br />
    <Text color='dark-violet'>dark-violet</Text>
  </>
);

export default Demo;
