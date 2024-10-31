import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import Badge from '@semcore/badge';
import CheckM from '@semcore/icon/Check/m';
import Ellipsis, { useResizeObserver } from '@semcore/ellipsis';
import { Box } from '@semcore/flex-box';
import CheckL from '@semcore/icon/Check/l';
import CloseM from '@semcore/icon/Close/m';
import Spin from '@semcore/spin';
import Card from '@semcore/card';
import { Text } from '@semcore/typography';
import DataTable from '@semcore/data-table';

const meta: Meta<typeof Ellipsis> = {
  title: 'Components/Ellipsis/TestStories',
  component: Ellipsis,
  parameters: {},
  decorators: [
    (Story) => (
      <div style={{ margin: '3em' }}>
        {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Ellipsis>;

export const TextInsideBoxLongTrimEnd: Story = {
  render: (props) => {
    return (
      <Box w={220}>
        <Ellipsis>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi hic nemo tenetur
          voluptatem! A aliquid assumenda dolore ducimus impedit numquam ratione recusandae sed
          ullam voluptate? Aperiam distinctio minus possimus quasi.
        </Ellipsis>
      </Box>
    );
  },
};

export const TextInsideBoxLongTrimMiddle: Story = {
  render: (props) => {
    return (
      <Box w={220}>
        <Ellipsis trim='middle'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi hic nemo tenetur
          voluptatem! A aliquid assumenda dolore ducimus impedit numquam ratione recusandae sed
          ullam voluptate? Aperiam distinctio minus possimus quasi.
        </Ellipsis>
      </Box>
    );
  },
};

export const TextInsideBoxLongTrimEndMaxLine3: Story = {
  render: (props) => {
    return (
      <Box w={220}>
        <Ellipsis trim='middle' maxLine='3'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi hic nemo tenetur
          voluptatem! A aliquid assumenda dolore ducimus impedit numquam ratione recusandae sed
          ullam voluptate? Aperiam distinctio minus possimus quasi.
        </Ellipsis>
      </Box>
    );
  },
};

export const TextInsideBoxShortTrimEnd: Story = {
  render: (props) => {
    return (
      <Box w={220}>
        <Ellipsis>Lorem ipsum dolor</Ellipsis>
      </Box>
    );
  },
};

export const TextInsideBoxShortTrimMiddle: Story = {
  render: (props) => {
    return (
      <Box w={220}>
        <Ellipsis trim='middle'>Lorem ipsum dolor</Ellipsis>
      </Box>
    );
  },
};

export const TextInsideBoxShortTrimEndMaxLine3: Story = {
  render: (props) => {
    return (
      <Box w={220}>
        <Ellipsis trim='middle' maxLine='3'>
          Lorem ipsum dolor sit amet
        </Ellipsis>
      </Box>
    );
  },
};

//Cases when The user implements text with w and h settings

export const TextInsideBoxShortTrimEndMaxLine_111: Story = {
  render: (args) => {
    return (
      <Text
        display='block'
        w={200}
        h={10}
        mb={3}
        size={100}
        tag='p'
        mt={0}
        style={{ outline: '1px solid red' }}
      >
        <Ellipsis>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi hic nemo tenetur
          voluptatem! A aliquid assumenda dolore ducimus impedit numquam ratione recusandae sed
          ullam voluptate? Aperiam distinctio minus possimus quasi.
        </Ellipsis>
      </Text>
    );
  },
};

//           export const BoxInTextLongTrimMiddle: Story = {

//               render: (props) => {
//               return(
//                 <>
//                 <Text
//             display="block"
//              w={200} h={10} mb={3}
//              size={100} tag='p' mt={0}>
//                 style={{ outline: "1px solid red" }}
//                 <Ellipsis trim="middle">
//         Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi hic nemo tenetur
//         voluptatem! A aliquid assumenda dolore ducimus impedit numquam ratione recusandae sed ullam
//         voluptate? Aperiam distinctio minus possimus quasi.
//         </Ellipsis>
//         </Text>
//         </>
//               );
//             },
//             };

//             export const BoxInTextLongTrimEndMaxLine3: Story = {

//                 render: (props) => {
//                 return(
//                     <Text
//                     display="block"
//                      w={200} h={10} mb={3}
//                      size={100} tag='p' mt={0}>
//                         style={{ outline: "1px solid red" }}
//                         <Ellipsis trim="end" maxLine="3">
//                 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi hic nemo tenetur
//                 voluptatem! A aliquid assumenda dolore ducimus impedit numquam ratione recusandae sed ullam
//                 voluptate? Aperiam distinctio minus possimus quasi.
//                 </Ellipsis>
//                 </Text>
//                 );
//               },
//               };

//               export const BoxInTextShortTrimEnd: Story = {
//                   render: (props) => {
//                   return(
//                     <Text
//                     display="block"
//                      w={200} h={10} mb={3}
//                      size={100} tag='p' mt={0}>
//                         style={{ outline: "1px solid red" }}
//                         <Ellipsis>
//                 Lorem ipsum dolor
//                 </Ellipsis>
//                 </Text>
//                   );
//                 },
//                 };

//                 export const BoxInTextShortTrimMiddle: Story = {
//                     render: (props) => {
//                     return(
//                       <Text
//                       display="block"
//                        w={200} h={10} mb={3}
//                        size={100} tag='p' mt={0}>
//                           style={{ outline: "1px solid red" }}
//                           <Ellipsis trim="middle" maxLine="3">
//                   Lorem ipsum dolor
//                   </Ellipsis>
//                   </Text>
//                     );
//                   },
//                   };

//                   export const BoxInTextShortTrimEndMaxLine: Story = {
//                     render: (props) => {
//                     return(
//                       <Text
//                       display="block"
//                        w={200} h={10} mb={3}
//                        size={100} tag='p' mt={0}>
//                           style={{ outline: "1px solid red" }}
//                           <Ellipsis trim="end" maxLine="3">
//                   Lorem ipsum dolor
//                   </Ellipsis>
//                   </Text>
//                     );
//                   },
//                   };
