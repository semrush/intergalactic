import React from "react";
import Ellipsis from "@semcore/ellipsis";
import { Box } from "@semcore/flex-box";

const Demo = () => {
  return (
    <Box w={220}>
      <Ellipsis
        onVisibleChange={() => alert("Hi!")}
        includeTooltipProps={["onVisibleChange"]}
      >
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi hic
        nemo tenetur voluptatem! A aliquid assumenda dolore ducimus impedit
        numquam ratione recusandae sed ullam voluptate? Aperiam distinctio minus
        possimus quasi.
      </Ellipsis>
    </Box>
  );
};

export default Demo;

export const App = () => <Demo />;