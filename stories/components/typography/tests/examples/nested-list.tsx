import React from 'react';
import { List } from '@semcore/typography';
import CheckM from '@semcore/icon/Check/m';

const Demo = () => (
  <div>
    <List >
        <List.Item marker = {1}>List item 1</List.Item>
        <List.Item marker = {2}>List item 2</List.Item>
        <List.Item marker = {null}>
          List item 3
          <List>
            <List.Item>List item</List.Item>
            <List.Item>
              List item
              <List>
                <List.Item>List item</List.Item>
                <List.Item>List item</List.Item>
                <List.Item>List item</List.Item>
              </List>
            </List.Item>
            <List.Item>List item</List.Item>
          </List>
        </List.Item>
        <List.Item marker={3}>
          List item 4
          </List.Item>
      </List>
  </div>
);

export default Demo;
