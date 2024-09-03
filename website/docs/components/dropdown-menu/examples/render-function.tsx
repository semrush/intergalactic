import React from 'react';
import DropdownMenu from 'intergalactic/dropdown-menu';
import { ButtonTrigger } from 'intergalactic/base-trigger';
import { Box } from '@semcore/flex-box';
import { Text } from 'intergalactic/typography';
import { Flex } from 'intergalactic/flex-box';

const Demo = () => {
  return (
    <Flex direction='column'>
      <Text tag='label' size={200} htmlFor='dropdown-menu-render-function'>
        Dropdown menu with render function
      </Text>
      <DropdownMenu>
        {(props, handlers) => {
          const {
            getTriggerProps, // encapsulates Trigger logic
            getPopperProps, // encapsulates Popper logic
            getListProps, // encapsulates List logic
            getItemProps, // // encapsulates Item logic
          } = props;

          const popperProps = getPopperProps();

          return (
            <React.Fragment>
              <ButtonTrigger
                {...getTriggerProps()}
                mt={2}
                mr='auto'
                id='dropdown-menu-render-function'
              >
                Check them out
              </ButtonTrigger>
              <Box
                {...popperProps}
                hidden={!popperProps.visible}
                zIndex={10}
                p={2}
                style={{
                  backgroundColor: 'var(--intergalactic-bg-primary-neutral, #FFF)',
                  border: '1px solid gray',
                }}
              >
                <ul {...getListProps()}>
                  <li {...getItemProps()}>Option 1</li>
                  <li {...getItemProps()}>Option 2</li>
                  <li {...getItemProps()}>Option 3</li>
                  <li {...getItemProps()}>Option 4</li>
                  <li {...getItemProps()}>Option 5</li>
                </ul>
                <button type='button' onClick={() => handlers.visible(false)}>
                  Close me
                </button>
                <button type='button' onClick={() => handlers.highlightedIndex(2)}>
                  Highlight item 3
                </button>
              </Box>
            </React.Fragment>
          );
        }}
      </DropdownMenu>
    </Flex>
  );
};

export default Demo;
