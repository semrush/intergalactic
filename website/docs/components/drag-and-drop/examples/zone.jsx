import React from 'react';
import DnD from '@semcore/ui/drag-and-drop';
import Card from '@semcore/ui/card';
import { Row, Col } from '@semcore/ui/grid';

const titles = { backlink: 'Backlink', keyword: 'Keyword', seo: 'On Page SEO' };
function Demo() {
  const [items, setItems] = React.useState(['backlink', 'keyword', 'seo']);
  const [saved, setSaved] = React.useState({});
  const handleDnD = React.useCallback(({ fromId, toId }) => {
    if (toId === 'drop-zone') {
      setSaved((saved) => ({ ...saved, [fromId]: true }));
    } else {
      setItems((items) => {
        const newItems = [...items];
        const fromIndex = items.indexOf(fromId);
        const toIndex = items.indexOf(toId);
        newItems[fromIndex] = items[toIndex];
        newItems[toIndex] = items[fromIndex];
        return newItems;
      });
    }
  }, []);

  return (
    <DnD tag={Row} gutter={4} onDnD={handleDnD}>
      <Col span={12} mb={4}>
        <DnD.DropZone h={73} style={{ display: 'flex' }} id="drop-zone">
          {items
            .filter((item) => saved[item])
            .map((item) => (
              <Card key={item} mr={4}>
                <Card.Title>{titles[item]}</Card.Title>
              </Card>
            ))}
        </DnD.DropZone>
      </Col>

      {items
        .filter((item) => !saved[item])
        .map((item) => (
          <Col span={4} mb={4} key={item}>
            <DnD.Draggable placement="top" id={item}>
              <Card>
                <Card.Title>{titles[item]}</Card.Title>
              </Card>
            </DnD.Draggable>
          </Col>
        ))}
    </DnD>
  );
}

export default Demo;
