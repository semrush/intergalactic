---
title: Table code and API
fileSource: table
tabName: Example
deprecated: true
tabs: Table code and API('index'), API('table-old-api'), Changelog('table-old-changelog')
---

::: warning
:rotating_light: Library `@semcore/table` is deprecated. Use new library [@semcore/data-table](/table-group/data-table/). It is based on `CSS-flex` technology and doesn't use native tables.
:::

## Simple usage example

::: sandbox

<script lang="tsx">
import React from 'react';
import styled from 'styled-components';
import Table from '@semcore/ui/table';
import Checkbox from '@semcore/ui/checkbox';
import Tooltip from '@semcore/ui/tooltip';
import Link from '@semcore/ui/link';
import Spin from '@semcore/ui/spin';
import { Text } from '@semcore/ui/typography';

const data = [
  {
    keyword: 'ebay buy',
    kd: '77.8',
    cpc: '$1.25',
    vol: '32,500,000',
  },
  {
    keyword: 'www.ebay.com',
    kd: '11.2',
    cpc: '$3.4',
    vol: '65,457,920',
  },
  {
    keyword: 'www.ebay.com',
    kd: '10',
    cpc: '$0.65',
    vol: '47,354,640',
  },
  {
    keyword: 'ebay buy',
    kd: '-',
    cpc: '$0',
    vol: 'n/a',
  },
  {
    keyword: 'ebay buy',
    kd: '75.89',
    cpc: <Spin />,
    vol: <Spin />,
  },
];

const sortOrder = {
  desc: 'asc',
  asc: 'desc',
};

const defaultSortOrder = 'desc';

const StyledTable = styled(Table)`
  position: relative;
`;

const StyledSpin = styled(Spin)`
  position: absolute;
  top: 50%;
  left: 50%;
`;

const StyledBody = styled(Table.Body)`
  &::after {
    content: '';
    display: ${({ loading }) => (loading ? 'block' : 'none')};
    position: absolute;
    top: 85px;
    width: 100%;
    height: calc(100% - 85px);
    background: rgba(255, 255, 255, 0.85);
  }
`;

type SortOrder = 'asc' | 'desc';

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: undefined,
      order: {
        keyword: defaultSortOrder as SortOrder,
        cpc: defaultSortOrder as SortOrder,
        vol: defaultSortOrder as SortOrder,
      },
      loading: false,
    };
  }

  _timer = null;

  handleHeadKeyDown = (key) => (event) => {
    if (event.key === 'Enter') {
      this.handleHeadClick(key)();
    }
  };

  handleHeadClick = (key) => () => {
    clearTimeout(this._timer);
    this.setState({
      loading: true,
      active: key,
    });
    this._timer = setTimeout(() => {
      const { active, order } = this.state;
      if (active === key) {
        order[active] = sortOrder[order[active]];
      }
      this.setState({
        loading: false,
        order,
      });
    }, 1000);
  };

  render() {
    const { active, order, loading } = this.state;
    return (
      <StyledTable>
        <Table.Head>
          <Table.Row>
            <Table.CellHead rowSpan={2} align='center'>
              <Checkbox size='l'>
                <Checkbox.Value />
              </Checkbox>
            </Table.CellHead>
            <Table.CellHead
              rowSpan={2}
              sorting={order.keyword}
              active={active === 'keyword'}
              onClick={this.handleHeadClick('keyword')}
              onKeyDown={this.handleHeadKeyDown('keyword')}
              borderRight
            >
              <Tooltip title="Jesus Christ, Joe, fucking forget about it. I'm Mr. Pink. Let's move on.">
                <span>
                  Keyword <Text color='gray60'>(1 – 100)</Text>
                </span>
              </Tooltip>
            </Table.CellHead>
            <Table.CellHead colSpan={3} align='center'>
              <Tooltip title="Jesus Christ, Joe, fucking forget about it. I'm Mr. Pink. Let's move on.">
                <span>Organic Sessions</span>
              </Tooltip>
            </Table.CellHead>
          </Table.Row>
          <Table.Row>
            <Table.CellHead>
              <Tooltip title="Jesus Christ, Joe, fucking forget about it. I'm Mr. Pink. Let's move on.">
                <span>KD,%</span>
              </Tooltip>
            </Table.CellHead>
            <Table.CellHead
              sorting={order.cpc}
              active={active === 'cpc'}
              onClick={this.handleHeadClick('cpc')}
              onKeyDown={this.handleHeadKeyDown('cpc')}
            >
              <Tooltip title="Jesus Christ, Joe, fucking forget about it. I'm Mr. Pink. Let's move on.">
                <span>CPC</span>
              </Tooltip>
            </Table.CellHead>
            <Table.CellHead
              sorting={order.vol}
              active={active === 'vol'}
              onClick={this.handleHeadClick('vol')}
              onKeyDown={this.handleHeadKeyDown('vol')}
            >
              <Tooltip title="Jesus Christ, Joe, fucking forget about it. I'm Mr. Pink. Let's move on.">
                <span>Vol.</span>
              </Tooltip>
            </Table.CellHead>
          </Table.Row>
        </Table.Head>
        <StyledBody loading={loading}>
          {data.map((row, i) => (
            <Table.Row key={i} interactive theme={row.kd === '-' ? 'danger' : undefined}>
              <Table.Cell align='center' valign='middle'>
                <Checkbox size='l'>
                  <Checkbox.Value />
                </Checkbox>
              </Table.Cell>
              <Table.Cell borderRight>
                <Link>{row.keyword}</Link>
              </Table.Cell>
              <Table.Cell align='right'>{row.kd}</Table.Cell>
              <Table.Cell align='right'>{row.cpc}</Table.Cell>
              <Table.Cell align='right'>{row.vol}</Table.Cell>
            </Table.Row>
          ))}
        </StyledBody>
        {loading && <StyledSpin size='xxl' theme='dark' />}
      </StyledTable>
    );
  }
}
</script>

:::

## Advanced use example

You can manually add borders to selected cells using props `borderRight` and `borderLeft`. And if you want the table to look smaller, use the prop `compact`. If a column width limit is set using `style` prop object with `maxWidth` inside, then the sort icon on hover will run over the text in the column header, and the non-fitting part of the text will not be visible.

::: sandbox

<script lang="tsx">
import React from 'react';
import styled from 'styled-components';
import Table from '@semcore/ui/table';
import Checkbox from '@semcore/ui/checkbox';
import Tooltip from '@semcore/ui/tooltip';
import Link from '@semcore/ui/link';
import Spin from '@semcore/ui/spin';
import { Text } from '@semcore/ui/typography';

const data = [
  {
    keyword: 'ebay buy',
    kd: '77.8',
    cpc: '$1.25',
    vol: '32,500,000',
  },
  {
    keyword: 'www.ebay.com',
    kd: '11.2',
    cpc: '$3.4',
    vol: '65,457,920',
  },
  {
    keyword: 'www.ebay.com',
    kd: '10',
    cpc: '$0.65',
    vol: '47,354,640',
  },
  {
    keyword: 'ebay buy',
    kd: '-',
    cpc: '$0',
    vol: 'n/a',
  },
  {
    keyword: 'ebay buy',
    kd: '75.89',
    cpc: <Spin />,
    vol: <Spin />,
  },
];

const sortOrder = {
  desc: 'asc',
  asc: 'desc',
};

const defaultSortOrder = 'desc';

const StyledTable = styled(Table)`
  position: relative;
`;

const StyledSpin = styled(Spin)`
  position: absolute;
  top: 50%;
  left: 50%;
`;

const StyledBody = styled(Table.Body)`
  &::after {
    content: '';
    display: ${({ loading }) => (loading ? 'block' : 'none')};
    position: absolute;
    top: 105px;
    width: 100%;
    height: calc(100% - 105px);
    background: rgba(255, 255, 255, 0.85);
  }
`;

type SortOrder = 'asc' | 'desc';

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: undefined,
      order: {
        keyword: defaultSortOrder as SortOrder,
        cpc: defaultSortOrder as SortOrder,
        vol: defaultSortOrder as SortOrder,
      },
      loading: false,
    };
    this._timer = null;
  }

  handleHeadKeyDown = (key) => (event) => {
    if (event.key === 'Enter') {
      this.handleHeadClick(key)();
    }
  };

  handleHeadClick = (key) => () => {
    clearTimeout(this._timer);
    this.setState({
      loading: true,
      active: key,
    });
    this._timer = setTimeout(() => {
      const { active, order } = this.state;
      if (active === key) {
        order[active] = sortOrder[order[active]];
      }
      this.setState({
        loading: false,
        order,
      });
    }, 1000);
  };

  render() {
    const { active, order, loading } = this.state;
    return (
      <StyledTable compact>
        <Table.Head>
          <Table.Row>
            <Table.CellHead rowSpan={2} align='center'>
              <Checkbox size='l'>
                <Checkbox.Value />
              </Checkbox>
            </Table.CellHead>
            <Table.CellHead
              rowSpan={2}
              sorting={order.keyword}
              active={active === 'keyword'}
              onClick={this.handleHeadClick('keyword')}
              onKeyDown={this.handleHeadKeyDown('keyword')}
              borderRight
            >
              <Tooltip title="Jesus Christ, Joe, fucking forget about it. I'm Mr. Pink. Let's move on.">
                <span>
                  Keyword <Text color='gray60'>(1 – 100)</Text>
                </span>
              </Tooltip>
            </Table.CellHead>
            <Table.CellHead
              colSpan={3}
              align='center'
              active={active === 'cpc' || active === 'vol'}
            >
              <Tooltip title="Jesus Christ, Joe, fucking forget about it. I'm Mr. Pink. Let's move on.">
                <span>Organic Sessions</span>
              </Tooltip>
            </Table.CellHead>
          </Table.Row>
          <Table.Row>
            <Table.CellHead>
              <Tooltip title="Jesus Christ, Joe, fucking forget about it. I'm Mr. Pink. Let's move on.">
                <span>KD,%</span>
              </Tooltip>
            </Table.CellHead>
            <Table.CellHead
              sorting={order.cpc}
              active={active === 'cpc'}
              onClick={this.handleHeadClick('cpc')}
              onKeyDown={this.handleHeadKeyDown('cpc')}
              noWrap={false}
              style={{ maxWidth: '60px' }}
            >
              <Tooltip title="Jesus Christ, Joe, fucking forget about it. I'm Mr. Pink. Let's move on.">
                <span>Sometext Sometext</span>
              </Tooltip>
            </Table.CellHead>
            <Table.CellHead
              sorting={order.vol}
              active={active === 'vol'}
              onClick={this.handleHeadClick('vol')}
              onKeyDown={this.handleHeadKeyDown('vol')}
              style={{ minWidth: '270px' }}
            >
              <Tooltip title="Jesus Christ, Joe, fucking forget about it. I'm Mr. Pink. Let's move on.">
                <span>Vol.</span>
              </Tooltip>
            </Table.CellHead>
          </Table.Row>
        </Table.Head>
        <StyledBody loading={loading}>
          {data.map((row, i) => (
            <Table.Row key={i} interactive theme={row.kd === '-' ? 'danger' : undefined}>
              <Table.Cell align='center' valign='middle'>
                <Checkbox size='l'>
                  <Checkbox.Value />
                </Checkbox>
              </Table.Cell>
              <Table.Cell borderRight>
                <Link>{row.keyword}</Link>
              </Table.Cell>
              <Table.Cell align='right'>{row.kd}</Table.Cell>
              <Table.Cell align='right'>{row.cpc}</Table.Cell>
              <Table.Cell align='right'>{row.vol}</Table.Cell>
            </Table.Row>
          ))}
        </StyledBody>
        {loading && <StyledSpin size='xxl' theme='dark' />}
      </StyledTable>
    );
  }
}
</script>

:::

## Table with an accordion

Example of a table with an [accordion](/components/accordion) 😎

::: sandbox

<script lang="tsx">
import React from 'react';
import Table from '@semcore/ui/table';
import Accordion from '@semcore/ui/accordion';
import { Box } from '@semcore/ui/flex-box';

const Demo = () => (
  <Table>
    <Table.Head>
      <Table.Row>
        {Object.keys(data[0]).map((name) => (
          <Table.CellHead key={name}>{name}</Table.CellHead>
        ))}
      </Table.Row>
    </Table.Head>
    <Table.Body>
      <Accordion>
        {data.map((item, index) => (
          <Accordion.Item value={index} key={index}>
            <Accordion.Item.Toggle tag={Table.Row}>
              {Object.values(item).map((value, ind) => (
                <Table.Cell
                  key={value}
                  style={ind === 0 ? { display: 'flex', alignItems: 'center' } : {}}
                >
                  {ind === 0 && <Accordion.Item.Chevron color='stone' mr={2} />}
                  {value}
                </Table.Cell>
              ))}
            </Accordion.Item.Toggle>
            <Accordion.Item.Collapse>
              <Box p={'12px 32px'}>{`Section ${index + 1}`}</Box>
            </Accordion.Item.Collapse>
          </Accordion.Item>
        ))}
      </Accordion>
    </Table.Body>
  </Table>
);

const data = [
  {
    keyword: 'ebay buy',
    kd: '77.8',
    cpc: '$1.25',
    vol: '32,500,000',
  },
  {
    keyword: 'www.ebay.com',
    kd: '11.2',
    cpc: '$3.4',
    vol: '65,457,920',
  },
  {
    keyword: 'www.ebay.com',
    kd: '10',
    cpc: '$0.65',
    vol: '47,354,640',
  },
  {
    keyword: 'ebay buy',
    kd: '-',
    cpc: '$0',
    vol: 'n/a',
  },
  {
    keyword: 'ebay buy',
    kd: '75.89',
    cpc: '$0',
    vol: '21,644,290',
  },
];
</script>

:::

## Table with dynamic column width

Example of a table where you can change the width of columns using the [react-resizable library](https://github.com/STRML/react-resizable).

::: sandbox

<script lang="tsx">
import React, { useState } from 'react';
import styled from 'styled-components';
import { Resizable } from 'react-resizable';
import Table from '@semcore/ui/table';
import ScrollArea from '@semcore/ui/scroll-area';

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
    return <Table.CellHead width='80' {...restProps} />;
  }

  return (
    <Resizable
      width={width}
      height={0}
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <CustomCellHead {...restProps} width={width} borderRight />
    </Resizable>
  );
};

const DemoResize = () => {
  const [columns, setColumns] = useState([...new Array(11)].map((_, ind) => ({ width: 90 })));

  const handleResize = (index) => (e, { size }) => {
    const nextColumns = [...columns];
    nextColumns[index] = { width: size.width };
    setColumns(nextColumns);
  };

  return (
    <ScrollArea>
      <CustomTable>
        <Table.Head>
          <Table.Row>
            {[...new Array(12)].map((_, ind) => (
              <ResizeableTitle width={columns[ind]?.width} onResize={handleResize(ind)}>
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

Resize;
</script>

:::

## Example with scroll and shadow

::: sandbox

<script lang="tsx">
import React from 'react';
import styled from 'styled-components';
import Spin from '@semcore/ui/spin';
import ScrollArea from '@semcore/ui/scroll-area';
import { Text } from '@semcore/ui/typography';
import Table from '@semcore/ui/table';
import Tooltip from '@semcore/ui/tooltip';
import Checkbox from '@semcore/ui/checkbox';
import Link from '@semcore/ui/link';

const data = [
  {
    keyword: 'ebay buy',
    kd: '77.8',
    cpc: '$1.25',
    vol: '32,500,000',
    diff: 0,
    traffic: '< 0.01',
    url: 'https://ebay.com',
    'last update': new Intl.DateTimeFormat('en-US', { year: 'numeric', era: 'long' }).format(
      new Date('2019/11/12'),
    ),
  },
  {
    keyword: 'www.ebay.com',
    kd: '11.2',
    cpc: '$3.4',
    vol: '65,457,920',
    diff: 0,
    traffic: '< 0.01',
    url: 'https://ebay.com',
    'last update': new Intl.DateTimeFormat('en-US', { year: 'numeric', era: 'long' }).format(
      new Date('2019/11/12'),
    ),
  },
  {
    keyword: 'www.ebay.com',
    kd: '10',
    cpc: '$0.65',
    vol: '47,354,640',
    diff: 0,
    traffic: '< 0.01',
    url: 'https://ebay.com',
    'last update': new Intl.DateTimeFormat('en-US', { year: 'numeric', era: 'long' }).format(
      new Date('2019/11/12'),
    ),
  },
  {
    keyword: 'ebay buy',
    kd: '-',
    cpc: '$0',
    vol: 'n/a',
    diff: 0,
    traffic: '< 0.01',
    url: 'https://ebay.com',
    last_update: 'n/a',
  },
  {
    keyword: 'ebay buy',
    kd: '75.89',
    cpc: <Spin />,
    vol: <Spin />,
    diff: 0,
    traffic: '< 0.01',
    url: 'https://ebay.com',
    last_update: 'n/a',
  },
];

const StyledScrollArea = styled(ScrollArea)`
  [class*='SShadowHorizontal']::before {
    left: 200px !important;
  }
`;

const TableLayoutFixed = styled(Table)`
  table-layout: fixed;
`;

const StyledCellSticky = styled(Table.Cell)`
  position: sticky;
  z-index: 1;
`;

const StyledThSticky = styled(Table.CellHead)`
  position: sticky;
`;

const Demo = () => (
  <StyledScrollArea shadow>
    <ScrollArea.Container>
      <TableLayoutFixed>
        <Table.Head>
          <Table.Row theme={false}>
            <StyledThSticky align='center' valign='middle' width='50' left={0}>
              <Checkbox size='l'>
                <Checkbox.Value />
              </Checkbox>
            </StyledThSticky>
            <StyledThSticky
              width='150'
              left={50}
              valign='middle'
              style={{ boxShadow: '0 0 1px #dee3e5' }}
            >
              <Tooltip title='Lorem ipsum'>
                <span>
                  Keyword <Text color='gray60'>(1 – 100)</Text>
                </span>
              </Tooltip>
            </StyledThSticky>

            {Object.keys(data[0])
              .slice(1)
              .map((name) => (
                <Table.CellHead width='200' valign='middle'>
                  <Tooltip title='Lorem ipsum'>
                    <span>
                      {name.toUpperCase()} {['kd', 'traffic'].includes(name) && '%'}
                    </span>
                  </Tooltip>
                </Table.CellHead>
              ))}
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {data.map((row, i) => (
            <Table.Row key={i} theme={row.kd === '-' ? 'danger' : 'default'}>
              <StyledCellSticky
                theme={row.kd === '-' ? false : 'default'}
                align='center'
                valign='middle'
                left={0}
              >
                <Checkbox size='l'>
                  <Checkbox.Value />
                </Checkbox>
              </StyledCellSticky>
              <StyledCellSticky theme={row.kd === '-' ? false : 'default'} left={50}>
                <Link>{row.keyword}</Link>
              </StyledCellSticky>

              {Object.keys(data[0])
                .slice(1)
                .map((name) => (
                  <Table.Cell align='right' theme={row.kd === '-' ? false : 'default'}>
                    {row[name]}
                  </Table.Cell>
                ))}
            </Table.Row>
          ))}
        </Table.Body>
      </TableLayoutFixed>
    </ScrollArea.Container>
    <ScrollArea.Bar w='calc(100% - 200px)' ml='200px' />
  </StyledScrollArea>
);
</script>

:::

## Table with a fixed header

::: sandbox

<script lang="tsx">
import React, { useState, useEffect } from 'react';
import Spin from '@semcore/ui/spin';
import ScrollArea from '@semcore/ui/scroll-area';
import { Text } from '@semcore/ui/typography';
import Table from '@semcore/ui/table';
import Tooltip from '@semcore/ui/tooltip';
import Checkbox from '@semcore/ui/checkbox';
import Link from '@semcore/ui/link';

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

let data = [
  {
    keyword: 'ebay buy',
    kd: '77.8',
    cpc: '$1.25',
    vol: '32,500,000',
    diff: 0,
    traffic: '< 0.01',
    url: 'https://ebay.com',
    'last update': new Intl.DateTimeFormat('en-US', { year: 'numeric', era: 'long' }).format(
      new Date('2019/11/12'),
    ),
  },
  {
    keyword: 'www.ebay.com',
    kd: '11.2',
    cpc: '$3.4',
    vol: '65,457,920',
    diff: 0,
    traffic: '< 0.01',
    url: 'https://ebay.com',
    'last update': new Intl.DateTimeFormat('en-US', { year: 'numeric', era: 'long' }).format(
      new Date('2019/11/12'),
    ),
  },
  {
    keyword: 'www.ebay.com',
    kd: '10',
    cpc: '$0.65',
    vol: '47,354,640',
    diff: 0,
    traffic: '< 0.01',
    url: 'https://ebay.com',
    'last update': new Intl.DateTimeFormat('en-US', { year: 'numeric', era: 'long' }).format(
      new Date('2019/11/12'),
    ),
  },
  {
    keyword: 'ebay buy',
    kd: '-',
    cpc: '$0',
    vol: 'n/a',
    diff: 0,
    traffic: '< 0.01',
    url: 'https://ebay.com',
    last_update: 'n/a',
  },
  {
    keyword: 'ebay buy',
    kd: '75.89',
    cpc: <Spin />,
    vol: <Spin />,
    diff: 0,
    traffic: '< 0.01',
    url: 'https://ebay.com',
    last_update: 'n/a',
  },
];

data.forEach((d) => {
  data = shuffle(data.concat(data));
});

const Demo = () => {
  const [top, setTop] = useState(0);
  useEffect(() => {
    const header = document.getElementsByTagName('header')[0];
    header && setTop(header.offsetHeight);
  }, []);

  return (
    <ScrollArea>
      <ScrollArea.Container>
        <Table>
          <Table.StickyHead top={top} />
          <Table.Head>
            <Table.Row>
              <Table.CellHead align='center' valign='middle' width='50'>
                <Checkbox size='l'>
                  <Checkbox.Value />
                </Checkbox>
              </Table.CellHead>
              <Table.CellHead width='200'>
                <Tooltip title='Lorem ipsum'>
                  <span>
                    Keyword <Text color='gray60'>(1 – 100)</Text>
                  </span>
                </Tooltip>
              </Table.CellHead>

              {Object.keys(data[0])
                .slice(1)
                .map((name) => (
                  <Table.CellHead width='200' align='right'>
                    <Tooltip title='Lorem ipsum'>
                      <span>
                        {name.toUpperCase()} {['kd', 'traffic'].includes(name) && '%'}
                      </span>
                    </Tooltip>
                  </Table.CellHead>
                ))}
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {data.map((row, i) => (
              <Table.Row key={i} theme={row.kd === '-' ? 'danger' : 'default'}>
                <Table.Cell
                  theme={row.kd === '-' ? false : 'default'}
                  align='center'
                  valign='middle'
                >
                  <Checkbox size='l'>
                    <Checkbox.Value />
                  </Checkbox>
                </Table.Cell>
                <Table.Cell theme={row.kd === '-' ? false : 'default'}>
                  <Link>{row.keyword}</Link>
                </Table.Cell>

                {Object.keys(data[0])
                  .slice(1)
                  .map((name) => (
                    <Table.Cell align='right' theme={row.kd === '-' ? false : 'default'}>
                      {row[name]}
                    </Table.Cell>
                  ))}
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </ScrollArea.Container>
      <ScrollArea.Bar />
    </ScrollArea>
  );
};
</script>

:::

## Secondary table

You can use secondary table for compact displaying small amount of data inside widgets.

::: sandbox

<script lang="tsx">
import React from 'react';
import Table from '@semcore/ui/table';

const data = [
  {
    keyword: 'ebay buy',
    kd: '77.8',
    cpc: '$1.25',
    vol: 'n/a',
  },
  {
    keyword: 'www.ebay.com',
    kd: '11.2',
    cpc: '$3.4',
    vol: '32,500,000',
  },
  {
    keyword: 'www.ebay.com',
    kd: '10',
    cpc: '$0.65',
    vol: '47,354,640',
  },
  {
    keyword: 'ebay buy',
    kd: '-',
    cpc: '$0',
    vol: '65,457,920',
  },
  {
    keyword: 'ebay buy',
    kd: '75.89',
    cpc: '$0',
    vol: '21,644,290',
  },
];

const Demo = () => (
  <Table use='secondary'>
    <Table.Head>
      <Table.Row theme={false}>
        {Object.keys(data[0])
          .slice(0, -1)
          .map((name) => (
            <Table.CellHead key={name}>{name}</Table.CellHead>
          ))}
        {Object.keys(data[0])
          .slice(-1)
          .map((name) => (
            <Table.CellHead key={name} sorting='asc' active>
              {name}
            </Table.CellHead>
          ))}
      </Table.Row>
    </Table.Head>
    <Table.Body>
      {data.map((row) => (
        <Table.Row>
          {Object.keys(row).map((name) => (
            <Table.Cell key={row[name]}>{row[name]}</Table.Cell>
          ))}
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
);
</script>

:::

## Example of data being loaded for the first time

::: sandbox

<script lang="tsx">
import React from 'react';
import Table from '@semcore/ui/table';
import Skeleton from '@semcore/ui/skeleton';
import Checkbox from '@semcore/ui/checkbox';
import Tooltip from '@semcore/ui/tooltip';
import { Text } from '@semcore/ui/typography';

const data = [
  {
    keyword: 'ebay buy',
    kd: '77.8',
    cpc: '$1.25',
    vol: '32,500,000',
    diff: 0,
    traffic: '< 0.01',
    url: 'https://ebay.com',
    'last update': new Intl.DateTimeFormat('en-US', { year: 'numeric', era: 'long' }).format(
      new Date('2019/11/12'),
    ),
  },
];
const fetchData = () => (
  <Table.Cell>
    <Skeleton height={17}>
      <Skeleton.Text y='5' width='60%' />
    </Skeleton>
  </Table.Cell>
);

const Demo = () => (
  <Table>
    <Table.Head>
      <Table.Row>
        <Table.CellHead align='center' valign='middle'>
          <Checkbox size='l'>
            <Checkbox.Value />
          </Checkbox>
        </Table.CellHead>
        <Table.CellHead>
          <Tooltip title='Lorem ipsum'>
            <span>
              Keyword <Text color='gray60'>(1 – 100)</Text>
            </span>
          </Tooltip>
        </Table.CellHead>
        {Object.keys(data[0])
          .slice(1)
          .map((name) => (
            <Table.CellHead>
              <Tooltip title='Lorem ipsum'>
                <span>
                  {name.toUpperCase()} {['kd', 'traffic'].includes(name) && '%'}
                </span>
              </Tooltip>
            </Table.CellHead>
          ))}
      </Table.Row>
    </Table.Head>
    <Table.Body>
      {[...new Array(10)].map(() => (
        <Table.Row theme={false}>
          {fetchData()}
          {Object.keys(data[0]).map(() => fetchData())}
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
);
</script>

:::

## Table with no data

These states for widgets are described in detail in [Widget empty state](/components/widget-empty/widget-empty-code/).

::: sandbox

<script lang="tsx">
import React from 'react';
import Table from '@semcore/ui/table';
import { NoData } from '@semcore/ui/widget-empty';

const Demo = () => {
  const data = [...new Array(5)];

  return (
    <Table h={300}>
      <Table.Head>
        <Table.Row>
          {data.map((_, indCell) => (
            <Table.CellHead>Cell - {indCell + 1}</Table.CellHead>
          ))}
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <Table.Row theme={false}>
          <Table.Cell colSpan={data.length} pt={10}>
            <NoData
              type={'table'}
              description='Try selecting a different date or changing your filter settings.'
            />
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};
</script>

:::

