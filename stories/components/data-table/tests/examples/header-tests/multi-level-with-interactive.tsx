import React from 'react';
import { DataTable } from '@semcore/data-table';
import Link from '@semcore/link';
import Select from '@semcore/select';
import { LinkTrigger } from '@semcore/base-trigger';
import Checkbox from '@semcore/checkbox';
import { DescriptionTooltip } from '@semcore/tooltip';
import InfoM from '@semcore/icon/Info/m';
import { ButtonLink } from '@semcore/button';

const options = Array(6)
  .fill('')
  .map((_, index) => ({
    value: index,
    label: `Option ${index}`,
    children: `Option ${index}`,
  }));

const CustomSelect = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  return (
      <Select visible={isVisible} onVisibleChange={setIsVisible} mt={2} mr='auto' options={options} placeholder='Select option' data-test-id='select-header' id='basic-select' tag={LinkTrigger} onKeyDown={(e) => {
        if ((e.key === 'ArrowDown' || e.key === 'ArrowUp') && !isVisible) {
          return false
        }
        if (e.key.startsWith('Arrow') && isVisible) {
          e.stopPropagation();
        }
      }} />
  );
}

const Demo = () => {
  return (

<DataTable
    data={data} aria-label={'Base table example'} defaultGridTemplateColumnWidth={'auto'}

 h={400}
 headerProps={{
    sticky: true,
  }}
      columns={[
        {
            children: 'Keyword',
            name: 'keyword',
            gtcWidth: '300px',
          },
          {
            children: 'Group',
            columns: [
              {
                name: 'kd',
                gtcWidth: 'minmax(100px, max-content)',
                children: (
                  <DescriptionTooltip placement="right">
                    Cpc 1
                    <DescriptionTooltip.Trigger
                      ml={1}
                      tag={ButtonLink}
                      addonLeft={InfoM}
                      color="icon-secondary-neutral"
                      aria-label="Additional info 1"
                      data-test-id="tooltip-with-interactive-el"
                    />
                    <DescriptionTooltip.Popper aria-label={'Additional info about item 1'}>
                      Jesus Christ, Joe, <Link>fucking forget</Link> about it. I'm Mr.
                      Pink. Let's move on.
                    </DescriptionTooltip.Popper>
                  </DescriptionTooltip>
                ),
              },
              {
                name: 'cpc',
                gtcWidth: 'minmax(300px, max-content)',
                children: (
                  <>
                    <Checkbox data-test-id="header-checkbox" />
                    <DescriptionTooltip placement="right">
                      Hello
                      <DescriptionTooltip.Trigger
                        ml={1}
                        tag={ButtonLink}
                        addonLeft={InfoM}
                        color="icon-secondary-neutral"
                        aria-label="Additional info"
                        data-test-id="tooltip-without-interactive-el"
                      />
                      <DescriptionTooltip.Popper aria-label={'Additional info about checkbox item'}>
                        Jesus Christ, Joe,
                        Pink. Let's move on.
                      </DescriptionTooltip.Popper>
                    </DescriptionTooltip>
                  </>
                ),
              },
              {
                name: 'vol',
                gtcWidth: '300px',
                children: (<CustomSelect />),
              },
            ],
          },
      ]}

    />
  );
};

const data = [
  {
    keyword: 'ebay buy',
    kd: '77.8',
    cpc: '$1.25',
    vol: '32,500,000',
  },
  {
    keyword: 'www.ebay.comwww.ebay.comwww.ebay.comwww.ebay.comwww.ebay.com',
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
    keyword: 'www.ebay.comwww.ebay.comwww.ebay.comwww.ebay.comwww.ebay.com',
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
];

export default Demo;
