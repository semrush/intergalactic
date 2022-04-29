import React from 'react';
import { testing, snapshot } from '@semcore/jest-preset-ui';
import DnD from '../src';
import { Col, Row } from '@semcore/grid';
import Card from '@semcore/card';
const { cleanup } = testing;

describe('DragAndDrop', () => {
  afterEach(cleanup);

  test('Should support hover and active item', async () => {
    const component = (
      <DnD tag={Row} gutter={4} mt={10}>
        <Col span={12} mb={4}>
          <DnD.Droppable h={73} style={{ display: 'flex' }} />
        </Col>

        <Col span={4} mb={4}>
          <DnD.Draggable tag={Card} placement="top" onDragEnter={() => false}>
            <Card.Title>Backlink</Card.Title>
          </DnD.Draggable>
        </Col>
        <Col span={4} mb={4}>
          <DnD.Draggable id="dnd" tag={Card} placement="top" onDragEnter={() => false}>
            <Card.Title>Keyword</Card.Title>
          </DnD.Draggable>
        </Col>
        <Col span={4} mb={4}>
          <DnD.Draggable tag={Card} placement="top" onDragEnter={() => false}>
            <Card.Title>On Page SEO</Card.Title>
          </DnD.Draggable>
        </Col>
      </DnD>
    );

    expect(
      await snapshot(component, {
        actions: {
          hover: '#dnd',
        },
      }),
    ).toMatchImageSnapshot();
    expect(
      await snapshot(component, {
        actions: {
          active: '#dnd',
        },
      }),
    ).toMatchImageSnapshot();
  });
});
