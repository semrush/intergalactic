import React from 'react';
import DnD from '@semcore/drag-and-drop';
import Card from '@semcore/card';
import { Row, Col } from '@semcore/grid';

function Demo() {
  return (
    <DnD tag={Row} gutter={4}>
      <Col span={12} mb={4}>
        <DnD.Droppable h={73} style={{ display: 'flex' }} />
      </Col>

      <Col span={4} mb={4}>
        <DnD.Draggable tag={Card} placement="top" onDragEnter={() => false}>
          <Card.Title>Backlink</Card.Title>
        </DnD.Draggable>
      </Col>
      <Col span={4} mb={4}>
        <DnD.Draggable tag={Card} placement="top" onDragEnter={() => false}>
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
}

export default Demo;
