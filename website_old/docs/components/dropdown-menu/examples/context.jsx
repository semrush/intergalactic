import React from 'react';
import styled from 'styled-components';
import DropdownMenu from '@semcore/dropdown-menu';
import { ButtonTrigger } from '@semcore/base-trigger';

const Popper = styled.div`
  display: ${(props) => (props.visible ? 'block' : 'none')};
  background: #fff;
  border: 1px solid green;
  padding: 10px;
  z-index: 10;
`;

const ListItem = styled.li`
  color: ${(props) => (props.highlighted ? 'red' : '#000')};
`;

export default function () {
  return (
    <DropdownMenu>
      {(props, handlers) => {
        const {
          getTriggerProps, // encapsulates Trigger logic
          getPopperProps, // encapsulates Popper logic
          getListProps, // encapsulates List logic
          getItemProps, // // encapsulates Item logic
        } = props;

        const {
          visible, // manages internal visibility state
          highlightedIndex, // controls the internal state of selecting list items from the keyboard
        } = handlers;

        return (
          <React.Fragment>
            <ButtonTrigger {...getTriggerProps()}>Click me</ButtonTrigger>
            <Popper {...getPopperProps()}>
              <ul {...getListProps()}>
                <ListItem {...getItemProps()}>Option 1</ListItem>
                <ListItem {...getItemProps()}>Option 2</ListItem>
                <ListItem {...getItemProps()}>Option 3</ListItem>
                <ListItem {...getItemProps()}>Option 4</ListItem>
                <ListItem {...getItemProps()}>Option 5</ListItem>
              </ul>
              <button onClick={() => visible(false)}>Close me</button>
              <button onClick={() => highlightedIndex(2)}>Highlight item 3</button>
            </Popper>
          </React.Fragment>
        );
      }}
    </DropdownMenu>
  );
}
