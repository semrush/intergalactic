import React from 'react';
import Accordion from '@semcore/accordion';
import { Box } from '@semcore/flex-box';
import {Flex} from '@semcore/flex-box';

const Demo = () => {
  const [value, onChange] = React.useState([0]);

  return (
    <>

    <Accordion  pb ={4}>
     
        <Accordion.Item value={11} >
          <Accordion.Item.Toggle pb={2}>
            <Accordion.Item.ToggleButton>
              <Accordion.Item.Chevron mr={2} />
              Duration 500
            </Accordion.Item.ToggleButton>
          </Accordion.Item.Toggle>
          <Accordion.Item.Collapse duration={500}>
            <Box p='12px 12px '>Hello Section</Box>
            <Box p='24px'> Hello Section</Box>
          </Accordion.Item.Collapse>
        </Accordion.Item>

        <Accordion.Item value={1} >
          <Accordion.Item.Toggle pb={2}>
            <Accordion.Item.ToggleButton>
              <Accordion.Item.Chevron mr={2} />
              Duration 500 Delay 500
            </Accordion.Item.ToggleButton>
          </Accordion.Item.Toggle>
          <Accordion.Item.Collapse duration={500} delay = {500}>
            <Box p='12px 12px '>Hello Section</Box>
            <Box p='24px'> Hello Section</Box>
          </Accordion.Item.Collapse>
        </Accordion.Item>

        <Accordion.Item value={2} >
          <Accordion.Item.Toggle pb={2}>
            <Accordion.Item.ToggleButton>
              <Accordion.Item.Chevron mr={2} />
             Duration 0
            </Accordion.Item.ToggleButton>
          </Accordion.Item.Toggle>
          <Accordion.Item.Collapse duration={0}>
            <Box p='12px 12px '>Hello Section</Box>
            <Box p='24px'> Hello Section</Box>
          </Accordion.Item.Collapse>
        </Accordion.Item>

        <Accordion.Item value={3} >
          <Accordion.Item.Toggle pb={2}>
            <Accordion.Item.ToggleButton>
              <Accordion.Item.Chevron mr={2} />
            Default
            </Accordion.Item.ToggleButton>
          </Accordion.Item.Toggle>
          <Accordion.Item.Collapse >
            <Box p='12px 12px '>Hello Section</Box>
            <Box p='24px'> Hello Section</Box>
          </Accordion.Item.Collapse>
        </Accordion.Item>
      
    </Accordion>

    </>
  );
};

export default Demo;
