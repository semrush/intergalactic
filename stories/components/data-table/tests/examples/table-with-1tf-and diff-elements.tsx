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
    <DataTable data={data} aria-label={'Base table example'} defaultGridTemplateColumnWidth={'1fr'} wMax={'1200px'} hMax={'200px'}>
      <DataTable.Head sticky={true}>
        <DataTable.Head.Column name='cpc'  >
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
            <DescriptionTooltip.Popper aria-label={'Additional info about item 1'}>
              Jesus Christ, Joe,
              Pink. Let's move on.
            </DescriptionTooltip.Popper>
          </DescriptionTooltip>
        </DataTable.Head.Column>

        <DataTable.Head.Column name='cpc'  >
          <DescriptionTooltip placement='right'>
            Cpc 2
            <DescriptionTooltip.Trigger
              ml={1}
              tag={ButtonLink}
              addonLeft={InfoM}
              color='icon-secondary-neutral'
              aria-label='Additional info2'
              data-test-id='tooltip-with-interactive-el'
            />
            <DescriptionTooltip.Popper aria-label={'Additional info about item 2'}>
              Jesus Christ, Joe, <Link>fucking forget</Link> about it. I'm Mr.
              Pink. Let's move on.
            </DescriptionTooltip.Popper>
          </DescriptionTooltip>
        </DataTable.Head.Column>

        <DataTable.Head.Column name='cpc'  >
          <Tooltip
            tag={Link}
            title='Default tooltip contains short text explaining something about the trigger.'
            data-test-id='tooltip-with-tag-link'
          >
            Keywords
          </Tooltip>

        </DataTable.Head.Column>

        <DataTable.Head.Column name='kd' sortable>
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
        </DataTable.Head.Column>
        <DataTable.Head.Column name='keyword' >

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
            <DescriptionTooltip.Popper aria-label={'Additional info about checkbox item'}>
              Place an additional information here!
            </DescriptionTooltip.Popper>
          </DescriptionTooltip>

        </DataTable.Head.Column>
        <DataTable.Head.Column sortable name='vol' children='Vol.' tag={Tooltip}
          data-test-id='tag-tooltip'
          title={
            <>
              Jesus Christ, Joe, <Link>fucking forget</Link> about it. I'm Mr.
              Pink. Let's move on.
            </>}
        />
      </DataTable.Head>
      <DataTable.Body

        renderCell={(props) => {
          if (props.name === 'keyword') {
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
                  {props.row[props.name]}
                </ButtonLink>
              </>
            );
          }
          if (props.name === 'vol') {
            return (
              <>
                <Ellipsis trim='middle'>
                  {props.row[props.name]}
                </Ellipsis>
              </>
            );
          }


          return props.defaultRender();
        }}
      />

    </DataTable>
  );
};

const data = [
  {
    keyword: 'ebay buy',
    kd: '77.8',
    cpc: '$1.25',
    vol: '32,5nknjk00,000',
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

export default Demo;
