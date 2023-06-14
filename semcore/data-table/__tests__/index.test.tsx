import { render, cleanup, act } from '@semcore/testing-utils/testing-library';
import { axe } from '@semcore/testing-utils/axe';
import { snapshot } from '@semcore/testing-utils/snapshot';
import * as sharedTests from '@semcore/testing-utils/shared-tests';
import { expect, test, describe, beforeEach, vi } from '@semcore/testing-utils/vitest';

import React from 'react';
import Sticky from '@semcore/sticky';
import ProgressBar from '@semcore/progress-bar';
import Divider from '@semcore/divider';
import Portal, { PortalProvider } from '@semcore/portal';
import Skeleton from '@semcore/skeleton';
import SpinContainer from '@semcore/spin-container';
import Accordion from '@semcore/accordion';
import { Box, Flex } from '@semcore/flex-box';
import Spin from '@semcore/spin';
import Tooltip from '@semcore/tooltip';
import { Text } from '@semcore/typography';
import DropdownMenu from '@semcore/dropdown-menu';
import { LinkTrigger } from '@semcore/base-trigger';
import resolveColor from '@semcore/utils/lib/color';

import DataTable, { ROW_GROUP } from '../src';

const { shouldSupportClassName, shouldSupportRef } = sharedTests;

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
  beforeEach(cleanup);

  shouldSupportClassName(DataTable);
  shouldSupportRef(DataTable);

  test.concurrent('renders correctly', async ({ task }) => {
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
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Customizing the header', async ({ task }) => {
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
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('The size of the columns', async ({ task }) => {
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
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('The alignment of the columns', async ({ task }) => {
    const component = (
      <div style={{ width: 800 }}>
        <DataTable data={data}>
          <DataTable.Head>
            <DataTable.Column name="keyword">
              Keyword
              <br />
              Keyword
            </DataTable.Column>
            <DataTable.Column name="kd" children="KD,%" justifyContent="flex-end" />
            <DataTable.Column name="cpc" children="CPC" justifyContent="flex-end" />
            <DataTable.Column
              name="vol"
              children="Vol."
              justifyContent="flex-end"
              alignItems="flex-end"
            />
          </DataTable.Head>
          <DataTable.Body>
            <DataTable.Cell name="keyword">
              {(props, row) => {
                return {
                  children: (
                    <>
                      {row[props.name]}
                      <br />
                      {row[props.name]}
                    </>
                  ),
                };
              }}
            </DataTable.Cell>
          </DataTable.Body>
        </DataTable>
      </div>
    );
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Sorting', async ({ task }) => {
    const component = (
      <div style={{ width: 800 }}>
        <DataTable data={data} sort={['kd, cpc', 'desc']} onSortChange={vi.fn()}>
          <DataTable.Head>
            <DataTable.Column name="keyword" children="Keyword" />
            <DataTable.Column name="kd" children="KD,%" sortable id="row" />
            <DataTable.Column name="cpc" children="CPC" sortable />
            <DataTable.Column name="vol" children="Vol." sortable />
          </DataTable.Head>
          <DataTable.Body />
        </DataTable>
      </div>
    );

    await expect(
      await snapshot(component, {
        actions: {
          hover: '#row',
        },
      }),
    ).toMatchImageSnapshot(task);
  });

  /** Currently has no difference from DataTable without Sticky */
  test.skip('Fixed header', async ({ task }) => {
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
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  /** Currently screenshot service unable to execute js and scroll area shadows needs to run js for containers measuring */
  test.skip('Fixed columns', async ({ task }) => {
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
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Multi-level header', async ({ task }) => {
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
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Adding additional elements to the header', async ({ task }) => {
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
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  /** Currently screenshot service unable to execute js and portals needs to run js for dom manipulations */
  test.skip('Header separation', async ({ task }) => {
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
    await expect(await snapshot(<Component />)).toMatchImageSnapshot(task);
  });

  test.concurrent('Access to Row', async ({ task }) => {
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
              {(props, row) => {
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
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Access to Cell', async ({ task }) => {
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
              {(props, row) => {
                return {
                  children: <>[{row[props.name]}]</>,
                };
              }}
            </DataTable.Cell>
            <DataTable.Cell name="keyword">
              {() => {
                return {
                  style: {
                    fontWeight: 'bold',
                  },
                };
              }}
            </DataTable.Cell>
          </DataTable.Body>
        </DataTable>
      </div>
    );
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Access to a set of cells', async ({ task }) => {
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
              {(props, row) => {
                return {
                  children: ['-', '$0', 'n/a'].includes((row as any)[props.name]) ? (
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
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Adding additional elements to the table body', async ({ task }) => {
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
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Accordion in the table', async ({ task }) => {
    const RowAccordion = React.forwardRef(function ({ value, collapse = {}, ...props }, ref) {
      return (
        <Accordion.Item value={value} ref={ref}>
          <Accordion.Item.Toggle {...props} />
          <Accordion.Item.Collapse {...collapse} />
        </Accordion.Item>
      );
    });

    const component = (
      <div style={{ width: 800 }}>
        <Accordion value={[1, 2]} onChange={vi.fn}>
          <DataTable data={data}>
            <DataTable.Head>
              <DataTable.Column name="keyword" children="Keyword" />
              <DataTable.Column name="kd" children="KD,%" />
              <DataTable.Column name="cpc" children="CPC" />
              <DataTable.Column name="vol" children="Vol." />
            </DataTable.Head>
            <DataTable.Body>
              <DataTable.Row tag={RowAccordion}>
                {(_props, _row, index) => {
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
                {(props) => {
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
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Table in table', async ({ task }) => {
    const RowAccordion = React.forwardRef(function ({ value, collapse = {}, ...props }, ref) {
      return (
        <Accordion.Item value={value} ref={ref}>
          <Accordion.Item.Toggle {...props} />
          <Accordion.Item.Collapse {...collapse} />
        </Accordion.Item>
      );
    });

    const component = (
      <div style={{ width: 800 }}>
        <Accordion value={[1, 2]} onChange={vi.fn}>
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
                {(props) => {
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
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Download status', async ({ task }) => {
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
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Skeleton in the table', async ({ task }) => {
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
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Merging columns', async ({ task }) => {
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
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Row merging', async ({ task }) => {
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
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Row and Column merging', async ({ task }) => {
    const data = [
      {
        keyword: 'ebay buy',
        [ROW_GROUP]: [
          {
            ['kd/cpc']: '77.8',
            vol: '32,500,000',
          },
          {
            ['kd/cpc']: '-',
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
            ['kd/cpc']: '11.2',
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
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Secondary table', async ({ task }) => {
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
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Hover of grouped rows', async ({ task }) => {
    const data = [
      {
        keyword: 'www.ebay.com',
        [ROW_GROUP]: [
          {
            kd: '11.2',
          },
          {
            kd: '10',
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
          </DataTable.Head>
          <DataTable.Body />
        </DataTable>
      </div>
    );

    await expect(
      await snapshot(component, {
        actions: {
          hover: '[data-ui-name="DefinitionTable.Body"] [data-ui-name="Flex"]',
        },
      }),
    ).toMatchImageSnapshot(task);
    await expect(
      await snapshot(component, {
        actions: {
          hover:
            '[data-ui-name="DefinitionTable.Body"] [data-ui-name="group-cell"] [data-ui-name="Flex"]',
        },
      }),
    ).toMatchImageSnapshot(task);
  });

  test('a11y', async ({ task }) => {
    vi.useFakeTimers();
    const { container } = render(
      <DataTable data={[{ keyword: 123 }]}>
        <DataTable.Head>
          <DataTable.Column name="keyword" children="KD,%" />
        </DataTable.Head>
        <DataTable.Body />
      </DataTable>,
    );
    act(() => {
      vi.runAllTimers();
    });
    vi.useRealTimers();

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('rowgroup a11y', async () => {
    vi.useFakeTimers();
    const data = [
      {
        keyword: 'www.ebay.com',
        [ROW_GROUP]: [
          {
            kd: '11.2',
          },
          {
            kd: '10',
          },
        ],
      },
    ];

    const { container } = render(
      <div style={{ width: 800 }}>
        <DataTable data={data}>
          <DataTable.Head>
            <DataTable.Column name="keyword" children="Keyword" />
            <DataTable.Column name="kd" children="KD,%" />
          </DataTable.Head>
          <DataTable.Body />
        </DataTable>
      </div>,
    );

    act(() => vi.runAllTimers());
    vi.useRealTimers();

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe('DataTable.Column', () => {
  test.concurrent('Should support set flex after rerender', () => {
    const { getByTestId, rerender } = render(
      <DataTable data={[]}>
        <DataTable.Head>
          <DataTable.Column name="keyword" data-testid="column" flex={0} />
          <DataTable.Column name="kd" />
        </DataTable.Head>
      </DataTable>,
    );
    expect(getByTestId('column').style.flex).toBe('1 1 0px');
    rerender(
      <DataTable data={[]}>
        <DataTable.Head>
          <DataTable.Column name="keyword" data-testid="column" flex={0} />
        </DataTable.Head>
      </DataTable>,
    );
    expect(getByTestId('column').style.flex).toBe('1 1 0px');
  });

  test.concurrent('Should support ref', () => {
    const spy = vi.fn();
    render(
      <DataTable data={[]}>
        <DataTable.Head>
          <DataTable.Column name="keyword" ref={spy} />
          <DataTable.Column name="kd" />
        </DataTable.Head>
      </DataTable>,
    );
    expect(spy).toBeCalled();
  });
});
