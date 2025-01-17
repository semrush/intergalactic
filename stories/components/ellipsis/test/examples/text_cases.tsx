import React from "react";
import Ellipsis from "@semcore/ellipsis";
import { Box } from "@semcore/flex-box";
import { Text } from "@semcore/typography";

const Demo = () => {
  return (
    <div>
      <p>
        <Box w={111}>
          <Ellipsis>Segment 2sfdsf</Ellipsis>
        </Box>
      </p>
      <p>
        <Box w={111}>
          <Ellipsis trim="middle">
            Segment 2sfdsf
            </Ellipsis>
        </Box>
      </p>
      <p>
        <Box w={120} >
          <Ellipsis trim="end" >
            Lorem bbjips
          </Ellipsis>
        </Box>
      </p>
      <p>
        <Box w={120} >
          <Ellipsis trim="middle" >
            Lorem bbjips
          </Ellipsis>
        </Box>
      </p>
      <p>
        <Box w={220}>
          <Ellipsis>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi hic nemo tenetur
            voluptatem! A aliquid assumenda dolore ducimus impedit numquam ratione recusandae sed ullam
            voluptate? Aperiam distinctio minus possimus quasi.
          </Ellipsis>
        </Box>
      </p>
      <p>
        <Text
          display="block"
          w={111}
          mb={3}>
          <Ellipsis trim="end">Segment 2sfdsf</Ellipsis>
        </Text>
      </p>
      <p>
        <Text
          display="block"
          w={111}
          mb={3}>
          <Ellipsis trim="middle">Segment 2sfdsf</Ellipsis>
        </Text>
      </p>
    </div>
  );
};

export default Demo;
