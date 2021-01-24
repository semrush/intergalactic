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

export default function() {
  return (
    <DropdownMenu>
      {(props, handlers) => {
        const {
          getTriggerProps, // инкапсулирует логику Trigger'a
          getPopperProps, // инкапсулирует логику Popper'a
          getListProps, // инкапсулирует логику List'a
          getItemProps, // // инкапсулирует логику Item'a
        } = props;

        const {
          visible, // управляет внутренним состоянием видимости
          highlightedIndex, // управляет внутренним состоянием выбора эл-тов списка с клавиатуры
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
