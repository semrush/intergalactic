import React from 'react';
import { testing, snapshot, shared as testsShared } from '@semcore/jest-preset-ui';
import Sticky from '@semcore/sticky';
import ProgressBar from '@semcore/progress-bar';
import Divider from '@semcore/divider';
import Portal, { PortalProvider } from '@semcore/portal';
import Skeleton from '@semcore/skeleton';
import SpinContainer from '@semcore/spin-container';
import Accordion from '@semcore/accordion';
import { Box, Flex } from '@semcore/flex-box';
import Spin from '@semcore/spin';
import Link from '@semcore/link';
import Tooltip from '@semcore/tooltip';
import { Text } from '@semcore/typography';
import DropdownMenu from '@semcore/dropdown-menu';
import { LinkTrigger } from '@semcore/base-trigger';
import resolveColor from '@semcore/utils/lib/color';

import DataTable, { ROW_GROUP } from '../src';

const { render, cleanup, axe } = testing;
const { shouldSupportClassName, shouldSupportRef } = testsShared;

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

describe('DataTable', () => {
  afterEach(cleanup);

  shouldSupportClassName(DataTable);
  shouldSupportRef(DataTable);

  test('base render', async () => {
    const component = (
      <div style={{ width: 800 }}>
        <DataTable data={data}>
          <DataTable.Head>
            <DataTable.Column name="keyword" children="Keyword" />
            <DataTable.Column name="kd" children="KD,%" />
            <DataTable.Column name="cpc" children="CPC" />
            <DataTable.Column name="vol" children="Vol." />
          </DataTable.Head>
          <DataTable.Body />
        </DataTable>
      </div>
    );
    expect(await snapshot(component)).toMatchImageSnapshot();
  });
  test('Customizing the header', async () => {
    const component = (
      <div style={{ width: 800 }}>
        <DataTable data={data}>
          <DataTable.Head>
            <DataTable.Column name="keyword">
              <Tooltip title="Jesus Christ, Joe, fucking forget about it. I'm Mr. Pink. Let's move on.">
                <Text noWrap>
                  Keyword <Text color="gray60">(1 – 100)</Text>
                </Text>
              </Tooltip>
            </DataTable.Column>
            <DataTable.Column name="kd">
              <DropdownMenu>
                <DropdownMenu.Trigger tag={LinkTrigger} color="gray20">
                  KD,%
                </DropdownMenu.Trigger>
                <DropdownMenu.Menu>
                  <DropdownMenu.Item>Options 1</DropdownMenu.Item>
                  <DropdownMenu.Item>Options 2</DropdownMenu.Item>
                </DropdownMenu.Menu>
              </DropdownMenu>
            </DataTable.Column>
            <DataTable.Column name="cpc">
              <Tooltip title="Jesus Christ, Joe, fucking forget about it. I'm Mr. Pink. Let's move on.">
                CPC
              </Tooltip>
            </DataTable.Column>
            <DataTable.Column name="vol">
              <Tooltip title="Jesus Christ, Joe, fucking forget about it. I'm Mr. Pink. Let's move on.">
                Vol.
              </Tooltip>
            </DataTable.Column>
          </DataTable.Head>
          <DataTable.Body />
        </DataTable>
      </div>
    );
    expect(await snapshot(component)).toMatchImageSnapshot();
  });
  test('The size of the columns', async () => {
    const component = (
      <div style={{ width: 800 }}>
        <DataTable data={data}>
          <DataTable.Head>
            <DataTable.Column name="keyword" children="Keyword" wMin={100} flex="1 0 auto" />
            <DataTable.Column name="kd" children="KD,%" flex="0" wMin={100} />
            <DataTable.Column name="cpc" children="CPC" />
            <DataTable.Column name="vol" children="Vol." />
          </DataTable.Head>
          <DataTable.Body />
        </DataTable>
      </div>
    );
    expect(await snapshot(component)).toMatchImageSnapshot();
  });
  test('The alignment of the columns', async () => {
    const component = (
      <div style={{ width: 800 }}>
        <DataTable data={data}>
          <DataTable.Head>
            <DataTable.Column name="keyword" children="Keyword" />
            <DataTable.Column name="kd" children="KD,%" justifyContent="flex-end" />
            <DataTable.Column name="cpc" children="CPC" justifyContent="flex-end" />
            <DataTable.Column name="vol" children="Vol." justifyContent="flex-end" />
          </DataTable.Head>
          <DataTable.Body />
        </DataTable>
      </div>
    );
    expect(await snapshot(component)).toMatchImageSnapshot();
  });
  test('Sorting', async () => {
    const component = (
      <div style={{ width: 800 }}>
        <DataTable data={data} sort={['kd, cpc']} onSortChange={jest.fn()}>
          <DataTable.Head>
            <DataTable.Column name="keyword" children="Keyword" />
            <DataTable.Column name="kd" children="KD,%" sortable />
            <DataTable.Column name="cpc" children="CPC" sortable />
            <DataTable.Column name="vol" children="Vol." sortable />
          </DataTable.Head>
          <DataTable.Body />
        </DataTable>
      </div>
    );
    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  /** Currently has no difference from DataTable without Sticky */
  test.skip('Fixed header', async () => {
    const component = (
      <div style={{ width: 800 }}>
        <DataTable data={data}>
          <Sticky zIndex={2} top={top}>
            <DataTable.Head wMin={1000}>
              <DataTable.Column name="keyword" children="Keyword" />
              <DataTable.Column name="kd" children="KD,%" />
              <DataTable.Column name="cpc" children="CPC" />
              <DataTable.Column name="vol" children="Vol." />
            </DataTable.Head>
          </Sticky>
          <DataTable.Body />
        </DataTable>
      </div>
    );
    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  /** Currenty screenshot service unable to execute js and scroll area shadows needs to run js for containers measuring */
  test.skip('Fixed columns', async () => {
    const component = (
      <div style={{ width: 500 }}>
        <DataTable data={data}>
          <DataTable.Head wMin={800}>
            <DataTable.Column name="keyword" children="Keyword" fixed="left" />
            <DataTable.Column name="kd" children="KD,%" />
            <DataTable.Column name="cpc" children="CPC" />
            <DataTable.Column name="vol" children="Vol." fixed="right" />
          </DataTable.Head>
          <DataTable.Body />
        </DataTable>
      </div>
    );
    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Multi-level header', async () => {
    const component = (
      <div style={{ width: 800 }}>
        <DataTable data={data}>
          <DataTable.Head>
            <DataTable.Column name="keyword" children="Keyword" />
            <DataTable.Column>
              Organic Sessions
              <DataTable.Column name="kd" children="KD,%" />
              <DataTable.Column name="cpc" children="CPC" />
              <DataTable.Column name="vol" children="Vol." />
            </DataTable.Column>
          </DataTable.Head>
          <DataTable.Body />
        </DataTable>
      </div>
    );
    expect(await snapshot(component)).toMatchImageSnapshot();
  });
  test('Adding additional elements to the header', async () => {
    const component = (
      <div style={{ width: 800 }}>
        <DataTable data={data}>
          <DataTable.Head>
            <DataTable.Column name="keyword" children="Keyword" />
            <DataTable.Column name="kd" children="KD,%" />
            <DataTable.Column name="cpc" children="CPC" />
            <DataTable.Column name="vol" children="Vol." />
            <ProgressBar value={40} size="s" style={{ borderRadius: 0 }}>
              <ProgressBar.Value style={{ borderRadius: 0 }} />
            </ProgressBar>
          </DataTable.Head>
          <DataTable.Body />
        </DataTable>
      </div>
    );
    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  /** Currenty screenshot service unable to execute js and portals needs to run js for dom manipulations */
  test.skip('Header separation', async () => {
    const Component = () => {
      const portalRef = React.useRef(null);
      return (
        <div style={{ width: 800 }}>
          <div style={{ border: '1px solid' }} ref={portalRef} />
          <Divider my={5} />
          <DataTable style={{ border: '1px solid' }} data={data}>
            <PortalProvider value={portalRef}>
              <Portal>
                <DataTable.Head>
                  <DataTable.Column name="keyword" children="Keyword" />
                  <DataTable.Column name="kd" children="KD,%" />
                  <DataTable.Column name="cpc" children="CPC" />
                  <DataTable.Column name="vol" children="Vol." />
                </DataTable.Head>
              </Portal>
            </PortalProvider>
            <DataTable.Body />
          </DataTable>
        </div>
      );
    };
    expect(await snapshot(<Component />)).toMatchImageSnapshot();
  });
  test('Access to Row', async () => {
    const component = (
      <div style={{ width: 800 }}>
        <DataTable data={data}>
          <DataTable.Head>
            <DataTable.Column name="keyword" children="Keyword" />
            <DataTable.Column name="kd" children="KD,%" />
            <DataTable.Column name="cpc" children="CPC" />
            <DataTable.Column name="vol" children="Vol." />
          </DataTable.Head>
          <DataTable.Body>
            <DataTable.Row>
              {(props, row, index) => {
                return {
                  theme: row['kd'] === '-' ? 'warning' : props.theme,
                };
              }}
            </DataTable.Row>
            <DataTable.Row>
              {(props, row, index) => {
                return {
                  style: {
                    cursor: 'pointer',
                  },
                  onClick: () => {
                    alert(`Click row
                  props: ${JSON.stringify(Object.keys(props), null, '  ')};
                  row: ${JSON.stringify(row, null, '  ')};
                  index: ${index};`);
                  },
                };
              }}
            </DataTable.Row>
          </DataTable.Body>
        </DataTable>
      </div>
    );
    expect(await snapshot(component)).toMatchImageSnapshot();
  });
  test('Access to Cell', async () => {
    const component = (
      <div style={{ width: 800 }}>
        <DataTable data={data}>
          <DataTable.Head>
            <DataTable.Column name="keyword" children="Keyword" />
            <DataTable.Column name="kd" children="KD,%" />
            <DataTable.Column name="cpc" children="CPC" />
            <DataTable.Column name="vol" children="Vol." />
          </DataTable.Head>
          <DataTable.Body>
            <DataTable.Cell name="keyword">
              {(props, row, index) => {
                return {
                  children: <Link>{row[props.name]}</Link>,
                };
              }}
            </DataTable.Cell>
            <DataTable.Cell name="keyword">
              {(props, row, index) => {
                return {
                  style: {
                    cursor: 'pointer',
                  },
                  onClick: () => {
                    alert(`Click row
                  props: ${JSON.stringify(Object.keys(props), null, '  ')};
                  row: ${JSON.stringify(row, null, '  ')};
                  index: ${index};`);
                  },
                };
              }}
            </DataTable.Cell>
          </DataTable.Body>
        </DataTable>
      </div>
    );
    expect(await snapshot(component)).toMatchImageSnapshot();
  });
  test('Access to a set of cells', async () => {
    const component = (
      <div style={{ width: 800 }}>
        <DataTable data={data}>
          <DataTable.Head>
            <DataTable.Column name="keyword" children="Keyword" />
            <DataTable.Column name="kd" children="KD,%" />
            <DataTable.Column name="cpc" children="CPC" />
            <DataTable.Column name="vol" children="Vol." />
          </DataTable.Head>
          <DataTable.Body>
            <DataTable.Cell name="keyword/kd/cpc/vol">
              {(props, row, index) => {
                return {
                  children: ['-', '$0', 'n/a'].includes(row[props.name]) ? (
                    <Spin />
                  ) : (
                    props.children
                  ),
                };
              }}
            </DataTable.Cell>
          </DataTable.Body>
        </DataTable>
      </div>
    );
    expect(await snapshot(component)).toMatchImageSnapshot();
  });
  test('Adding additional elements to the table body', async () => {
    const component = (
      <div style={{ width: 800 }}>
        <DataTable data={data}>
          <DataTable.Head>
            <DataTable.Column name="keyword" children="Keyword" />
            <DataTable.Column name="kd" children="KD,%" />
            <DataTable.Column name="cpc" children="CPC" />
            <DataTable.Column name="vol" children="Vol." />
          </DataTable.Head>
          <DataTable.Body>
            <div
              style={{
                position: 'absolute',
                width: '100%',
                height: 'calc(45px * 2)',
                left: 0,
                bottom: 0,
                background: 'rgba(255, 0, 0, 0.2)',
                zIndex: 2,
              }}
            />
          </DataTable.Body>
        </DataTable>
      </div>
    );
    expect(await snapshot(component)).toMatchImageSnapshot();
  });
  test('Accordion in the table', async () => {
    function RowAccordion({ value, collapse = {}, ...props }) {
      return (
        <Accordion.Item value={value}>
          <Accordion.Item.Toggle {...props} />
          <Accordion.Item.Collapse {...collapse} />
        </Accordion.Item>
      );
    }

    const component = (
      <div style={{ width: 800 }}>
        <Accordion value={[1, 2]} onChange={jest.fn}>
          <DataTable data={data}>
            <DataTable.Head>
              <DataTable.Column name="keyword" children="Keyword" />
              <DataTable.Column name="kd" children="KD,%" />
              <DataTable.Column name="cpc" children="CPC" />
              <DataTable.Column name="vol" children="Vol." />
            </DataTable.Head>
            <DataTable.Body>
              <DataTable.Row tag={RowAccordion}>
                {(props, row, index) => {
                  return {
                    value: index,
                    active: [1, 2].includes(index),
                    collapse: {
                      children: (
                        <Box
                          style={{
                            padding: '12px 32px',
                            borderBottom: `1px solid ${resolveColor('stone')}`,
                          }}
                        >
                          {`Section ${index + 1}`}
                        </Box>
                      ),
                    },
                  };
                }}
              </DataTable.Row>
              <DataTable.Cell name="keyword">
                {(props, row, index) => {
                  return {
                    children: (
                      <Flex alignItems="center">
                        <Accordion.Item.Chevron color="stone" mr={2} />
                        {props.children}
                      </Flex>
                    ),
                  };
                }}
              </DataTable.Cell>
            </DataTable.Body>
          </DataTable>
        </Accordion>
      </div>
    );
    expect(await snapshot(component)).toMatchImageSnapshot();
  });
  test('Table in table', async () => {
    function RowAccordion({ value, collapse = {}, ...props }) {
      return (
        <Accordion.Item value={value}>
          <Accordion.Item.Toggle {...props} />
          <Accordion.Item.Collapse {...collapse} />
        </Accordion.Item>
      );
    }

    const component = (
      <div style={{ width: 800 }}>
        <Accordion value={[1, 2]} onChange={jest.fn}>
          <DataTable data={data}>
            <DataTable.Head wMin={800}>
              <DataTable.Column name="keyword" children="Keyword" fixed="left" />
              <DataTable.Column name="kd" children="KD,%" />
              <DataTable.Column name="cpc" children="CPC" />
              <DataTable.Column name="vol" children="Vol." />
            </DataTable.Head>
            <DataTable.Body>
              <DataTable.Row tag={RowAccordion}>
                {(props, row, index) => {
                  return {
                    value: index,
                    active: [1, 2].includes(index),
                    collapse: {
                      children: (
                        <DataTable data={data} zIndex={2}>
                          <DataTable.Head hidden>
                            <DataTable.Column name="keyword" fixed="left" />
                            <DataTable.Column name="kd" />
                            <DataTable.Column name="cpc" />
                            <DataTable.Column name="vol" />
                          </DataTable.Head>
                          <DataTable.Body />
                        </DataTable>
                      ),
                    },
                  };
                }}
              </DataTable.Row>
              <DataTable.Cell name="keyword">
                {(props, row, index) => {
                  return {
                    children: (
                      <Flex alignItems="center">
                        <Accordion.Item.Chevron color="stone" mr={2} />
                        {props.children}
                      </Flex>
                    ),
                  };
                }}
              </DataTable.Cell>
            </DataTable.Body>
          </DataTable>
        </Accordion>
      </div>
    );
    expect(await snapshot(component)).toMatchImageSnapshot();
  });
  test('Download status', async () => {
    const component = (
      <div style={{ width: 800 }}>
        <DataTable data={data}>
          <DataTable.Head>
            <DataTable.Column name="keyword" children="Keyword" />
            <DataTable.Column name="kd" children="KD,%" />
            <DataTable.Column name="cpc" children="CPC" />
            <DataTable.Column name="vol" children="Vol." />
          </DataTable.Head>
          <DataTable.Body tag={SpinContainer} loading={true} />
        </DataTable>
      </div>
    );
    expect(await snapshot(component)).toMatchImageSnapshot();
  });
  test('Skeleton in the table', async () => {
    function getSkeleton() {
      return ['keyword', 'kd', 'cpc', 'vol'].map((c) => ({
        name: c,
        data: (
          <Skeleton height={17}>
            <Skeleton.Text y="5" width="60%" />
          </Skeleton>
        ),
      }));
    }

    const component = (
      <div style={{ width: 800 }}>
        <DataTable data={data}>
          <DataTable.Head>
            <DataTable.Column name="keyword" children="Keyword" />
            <DataTable.Column name="kd" children="KD,%" />
            <DataTable.Column name="cpc" children="CPC" />
            <DataTable.Column name="vol" children="Vol." />
          </DataTable.Head>
          <DataTable.Body rows={[getSkeleton(), getSkeleton(), getSkeleton()]} />
        </DataTable>
      </div>
    );
    expect(await snapshot(component)).toMatchImageSnapshot();
  });
  test('Merging columns', async () => {
    const data = [
      {
        keyword: 'ebay buy',
        'kd/cpc/vol': 'This is columns group. This is columns group. This is columns group.',
      },
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
        kd: '75.89',
        cpc: '$0',
        vol: '21,644,290',
      },
    ];

    const component = (
      <div style={{ width: 800 }}>
        <DataTable data={data}>
          <DataTable.Head>
            <DataTable.Column name="keyword" children="Keyword" />
            <DataTable.Column name="kd" children="KD,%" />
            <DataTable.Column name="cpc" children="CPC" />
            <DataTable.Column name="vol" children="Vol." />
          </DataTable.Head>
          <DataTable.Body />
        </DataTable>
      </div>
    );
    expect(await snapshot(component)).toMatchImageSnapshot();
  });
  test('Row merging', async () => {
    const data = [
      {
        keyword: 'ebay buy',
        [ROW_GROUP]: [
          {
            kd: '77.8',
            cpc: '$1.25',
            vol: '32,500,000',
          },
          {
            kd: '-',
            cpc: '$0',
            vol: 'n/a',
          },
          {
            kd: '75.89',
            cpc: '$0',
            vol: '21,644,290',
          },
        ],
      },
      {
        keyword: 'www.ebay.com',
        [ROW_GROUP]: [
          {
            kd: '11.2',
            cpc: '$3.4',
            vol: '65,457,920',
          },
          {
            kd: '10',
            cpc: '$0.65',
            vol: '47,354,640',
          },
        ],
      },
    ];

    const component = (
      <div style={{ width: 800 }}>
        <DataTable data={data}>
          <DataTable.Head>
            <DataTable.Column name="keyword" children="Keyword" />
            <DataTable.Column name="kd" children="KD,%" />
            <DataTable.Column name="cpc" children="CPC" />
            <DataTable.Column name="vol" children="Vol." />
          </DataTable.Head>
          <DataTable.Body />
        </DataTable>
      </div>
    );
    expect(await snapshot(component)).toMatchImageSnapshot();
  });
  test('Secondary table', async () => {
    const component = (
      <div style={{ width: 800 }}>
        <DataTable data={data} use="secondary" sort={['kd', 'desc']}>
          <DataTable.Head>
            <DataTable.Column name="keyword" children="Keyword" />
            <DataTable.Column name="kd" children="KD,%" sortable />
            <DataTable.Column name="cpc" children="CPC" />
            <DataTable.Column name="vol" children="Vol." />
          </DataTable.Head>
          <DataTable.Body />
        </DataTable>
      </div>
    );
    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('a11y', async () => {
    const { container } = render(
      <DataTable data={[{ keyword: 123 }]}>
        <DataTable.Head>
          <DataTable.Column name="keyword" />
        </DataTable.Head>
        <DataTable.Body />
      </DataTable>,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe('DataTable.Column', () => {
  test('Should support set flex after rerender', () => {
    const { getByTestId, rerender } = render(
      <DataTable data={[]}>
        <DataTable.Head>
          <DataTable.Column name="keyword" data-testid="column" flex={0} />
          <DataTable.Column name="kd" />
        </DataTable.Head>
      </DataTable>,
    );
    expect(getByTestId('column').style.flex).toBe('0 0px');
    rerender(
      <DataTable data={[]}>
        <DataTable.Head>
          <DataTable.Column name="keyword" data-testid="column" flex={0} />
        </DataTable.Head>
      </DataTable>,
    );
    expect(getByTestId('column').style.flex).toBe('0 0px');
  });
});
