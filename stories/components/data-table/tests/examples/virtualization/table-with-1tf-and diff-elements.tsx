import React from 'react';
import { DataTable } from '@semcore/data-table';
import LinkExternalM from '@semcore/icon/LinkExternal/m';
import Tooltip, { Hint } from '@semcore/tooltip';
import Link from '@semcore/link';
import Checkbox from '@semcore/checkbox';
import { DescriptionTooltip } from '@semcore/tooltip';
import InfoM from '@semcore/icon/Info/m';
import { ButtonLink } from '@semcore/button';
import Ellipsis from '@semcore/ellipsis';
import { Text } from '@semcore/typography';

const Demo = () => {

  return (

    <DataTable
    data={data} aria-label={'Base table example'} defaultGridTemplateColumnWidth={'1fr'} wMax={'1200px'} hMax={'200px'} virtualScroll
    headerProps={{
      sticky: true,
    }}
    columns={[
      {
        name: 'hiddenColumn',
        children: <Checkbox label='Option 1' />,
      },
      {
        name: 'cpc',
        children: (
          <DescriptionTooltip placement='right'>
            Cpc 1
            <DescriptionTooltip.Trigger
              ml={1}
              tag={ButtonLink}
              addonLeft={InfoM}
              color='icon-secondary-neutral'
              aria-label='Additional info 1'
              data-test-id='tooltip-without-interactive-el'
            />
            <DescriptionTooltip.Popper aria-label='Additional info about item 1'>
              Jesus Christ, Joe,
              Pink. Let's move on.
            </DescriptionTooltip.Popper>
          </DescriptionTooltip>
        ),
      },
      {
        name: 'cpc',
        children: (
          <DescriptionTooltip placement='right'>
            Cpc 2
            <DescriptionTooltip.Trigger
              ml={1}
              tag={ButtonLink}
              addonLeft={InfoM}
              color='icon-secondary-neutral'
              aria-label='Additional info 2'
              data-test-id='tooltip-with-interactive-el'
            />
            <DescriptionTooltip.Popper aria-label='Additional info about item 2'>
              Jesus Christ, Joe, <Link>fucking forget</Link> about it. I'm Mr. Pink. Let's move on.
            </DescriptionTooltip.Popper>
          </DescriptionTooltip>
        ),
      },
      {
        name: 'cpc',
        children: (
          <Tooltip
            tag={Link}
            title='Default tooltip contains short text explaining something about the trigger.'
            data-test-id='tooltip-with-tag-link'
          >
            Keywords
          </Tooltip>
        ),
      },
      {
        name: 'kd',
        sortable:  'asc',
        children: (
          <>
            <Text noWrap>
              Keyword <Text color='text-secondary'>(100)</Text>
            </Text>
            <Hint
              ml={1}
              tag={LinkExternalM}
              interactive
              title='Go to our awesome article'
              data-test-id='interactive-icon'
              color='icon-secondary-neutral'
            />
          </>
        ),
      },
      {
        name: 'keyword',
        children: (
          <>
            <Checkbox data-test-id='header-checkbox' />
            <DescriptionTooltip placement='right'>
              Hello
              <DescriptionTooltip.Trigger
                ml={1}
                tag={ButtonLink}
                addonLeft={InfoM}
                color='icon-secondary-neutral'
                aria-label='Additional info'
                data-test-id='few-interactive'
              />
              <DescriptionTooltip.Popper aria-label='Additional info about checkbox item'>
                Place an additional information here!
              </DescriptionTooltip.Popper>
            </DescriptionTooltip>
          </>
        ),
      },
      {
        name: 'vol',
        sortable:  'desc',
        children: 'Vol.',
        tag: Tooltip,
  
        title: (
          <>
            Jesus Christ, Joe, <Link>fucking forget</Link> about it. I'm Mr. Pink. Let's move on.
          </>
        ),
      },
      ]}


        renderCell={(props) => {
          if (props.columnName === 'keyword') {
            return (
              <>
                <Checkbox label='Option 1' />
                <ButtonLink
                  onClick={() => {
                    alert(`Click row 
                 props: ${JSON.stringify(Object.keys(props), null, '  ')};
                 row: ${JSON.stringify(props.row, null, '  ')};
                 index: ${props.rowIndex};`);
                  }}
                >
                  {props.value}
                </ButtonLink>
              </>
            );
          }
          if (props.columnName === 'hiddenColumn') {
            return (
              <>
                <Checkbox/>
            
              </>
            );
          }
          if (props.columnName === 'vol') {
            return (
              <>
                <Ellipsis trim='middle'>
                  {props.value}
                </Ellipsis>
              </>
            );
          }


          return props.defaultRender();
        }}
      />
  );
};

const keyword = ['ebay buy', 'www.ebay.com', 'ebay buy']
const kd = ['77.8', '10', '11.2', '-', '75.89'];
const cpc = ['$3.4', '$0.65', '$1.25', '$0', '$0'];
const vol = ['32,500,000', '65,457,920', '47,354,640', 'n/a', '21,644,290'];

const data = Array(10000)
  .fill(0)
  .map((_, index) => ({
    id: `#${index + 1}`,
    keyword: keyword[Math.floor(keyword.length * Math.random())],
    // [ROW_GROUP]: [
    //   {
        kd: kd[Math.floor(kd.length * Math.random())],
        cpc: cpc[Math.floor(cpc.length * Math.random())],
        vol: vol[Math.floor(vol.length * Math.random())],
      // },
    // ],
  }));

export default Demo;
