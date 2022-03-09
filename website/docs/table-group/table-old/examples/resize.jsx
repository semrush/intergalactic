import React, { useState } from 'react';
import styled from 'styled-components';
import { Resizable } from 'react-resizable';
import Table from '@semcore/table';
import ScrollArea from '@semcore/scroll-area';

const CustomCellHead = styled(Table.CellHead)`
  position: relative;
  overflow: visible;
  z-index: auto;

  & .react-resizable-handle {
    position: absolute;
    width: 10px;
    height: 100%;
    bottom: 0;
    right: -5px;
    cursor: col-resize;
    z-index: 1;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 5px;
      display: none;
      height: 100%;
      width: 1px;
      background-color: #a6b0b3;
    }

    &:hover::after {
      display: block;
    }
  }
`;

const CustomTable = styled(Table)`
  table-layout: fixed;
`;
const ResizeableTitle = (props) => {
  const { onResize, width, ...restProps } = props;

  if (!width) {
    return <Table.CellHead width="80" {...restProps} />;
  }

  return (
    <Resizable
      width={width}
      height={0}
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <CustomCellHead {...restProps} width={width} />
    </Resizable>
  );
};

const DemoResize = () => {
  const [columns, updateColumns] = useState([...new Array(11)].map((_, ind) => ({ width: 90 })));

  const handleResize =
    (index) =>
    (e, { size }) => {
      const nextColumns = [...columns];
      nextColumns[index] = { width: size.width };
      updateColumns(nextColumns);
    };

  return (
    <ScrollArea>
      <CustomTable>
        <Table.Head>
          <Table.Row>
            {[...new Array(12)].map((_, ind) => (
              <ResizeableTitle
                width={columns[ind] && columns[ind].width}
                onResize={handleResize(ind)}
              >
                {`CellHead ${ind}`}
              </ResizeableTitle>
            ))}
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {[...new Array(12)].map((_, ind) => (
            <Table.Row>
              {[...new Array(12)].map((_, ind) => (
                <Table.Cell>{`Cell ${ind}`}</Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </CustomTable>
    </ScrollArea>
  );
};

export default DemoResize;
