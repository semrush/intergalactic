import React from 'react';
import styled from 'styled-components';
import Table from '@semcore/table';
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

const MAP_ORDER = {
  desc: 'asc',
  asc: 'desc',
};

const DEFAULT_ORDER = 'desc';

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

class Demo extends React.Component {
  state = {
    active: undefined,
    order: {
      keyword: DEFAULT_ORDER,
      cpc: DEFAULT_ORDER,
      vol: DEFAULT_ORDER,
    },
    loading: false,
  };

  _timer = null;

  handleHeadKeyDown = (key) => (e) => {
    if (e.keyCode === 13) {
      this.handleHeadClick(key)(e);
    }
  };

  handleHeadClick = (key) => () => {
    clearTimeout(this._timer);
    this.setState({
      loading: true,
    });
    this._timer = setTimeout(() => {
      const { active, order } = this.state;
      if (active === key) {
        order[active] = MAP_ORDER[order[active]];
      }
      this.setState({
        loading: false,
        active: key,
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
            <Table.CellHead rowSpan={2} align="center">
              <Checkbox size="l">
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
                  Keyword <Text color="gray60">(1 – 100)</Text>
                </span>
              </Tooltip>
            </Table.CellHead>
            <Table.CellHead
              colSpan={3}
              align="center"
              active={active === 'cpc' || active === 'vol'}
              // style={{
              //   borderBottomColor: active === 'cpc' || active === 'vol' ? '#e0e1e9' : '#f4f5f9',
              // }}
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
              <Table.Cell align="center" valign="middle">
                <Checkbox size="l">
                  <Checkbox.Value />
                </Checkbox>
              </Table.Cell>
              <Table.Cell borderRight>
                <Link>{row.keyword}</Link>
              </Table.Cell>
              <Table.Cell align="right">{row.kd}</Table.Cell>
              <Table.Cell align="right">{row.cpc}</Table.Cell>
              <Table.Cell align="right">{row.vol}</Table.Cell>
            </Table.Row>
          ))}
        </StyledBody>
        {loading && <StyledSpin size="xxl" theme="dark" />}
      </StyledTable>
    );
  }
}

export default Demo;
