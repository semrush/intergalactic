import React from 'react';
import { Text } from '@semcore/typography';
import Link from '@semcore/link';
import { ButtonLink } from '@semcore/button';
import { DescriptionTooltip } from '@semcore/tooltip';
import Chat from '@semcore/icon/Chat/m';
import BookM from '@semcore/icon/Book/m';
import InfoM from '@semcore/icon/Info/m';
import { Flex, Box } from '@semcore/flex-box';
import EditM from '@semcore/icon/Edit/m';
import Select from '@semcore/select';
import Ellipsis from '@semcore/ellipsis';
import { LinkTrigger } from '@semcore/base-trigger';

import Header, { Info, Title } from '@semcore/product-head';

const Demo = () => {
  return (
    <Box w={800}>
      <Header mx={8}>
        <Header.Row>
          <Title toolName='Tool Name:'>
            <Text color='text-secondary' noWrap tag={Flex} mr={4}>
              <Ellipsis trim='end'>
                Domain.com Domain.com Domain.com Domain.com Domain.com Domain.com Domain.com
                Domain.com Domain.com Domain.com
              </Ellipsis>
              <ButtonLink addonLeft={EditM} aria-label={'Hint for button-link'} />
            </Text>
          </Title>
          <Header.Links>
            <ButtonLink addonLeft={Chat}>Feedback</ButtonLink>
            <Link addonLeft={BookM}>User manual</Link>
          </Header.Links>
        </Header.Row>

        <Header.Row>
          <Info>
            <Info.Item>
              <Info.Item.Label tag='label' htmlFor='select-location'>
                Location:
              </Info.Item.Label>
              <Select
                id='select-location'
                defaultValue={'us'}
                placeholder='Select option'
                m='auto'
                tag={LinkTrigger}
                options={[
                  {
                    value: 'us',
                    label: 'United States',
                    children: 'United States',
                  },
                  { value: 'ch', label: 'China', children: 'China' },
                  { value: 'ja', label: 'Japan', children: 'Japan' },
                  { value: 'ge', label: 'Germany', children: 'Germany' },
                  {
                    value: 'uk',
                    label: 'United Kingdom',
                    children: 'United Kingdom',
                  },
                  { value: 'in', label: 'India', children: 'India' },
                  { value: 'fr', label: 'France', children: 'France' },
                  { value: 'it', label: 'Italy', children: 'Italy' },
                ]}
              />
            </Info.Item>
            <Info.Item>
              <Info.Item.Label tag='label' htmlFor='select-device'>
                Device:
              </Info.Item.Label>
              <Select
                id='select-device'
                defaultValue={'Desktop'}
                placeholder='Select option'
                m='auto'
                tag={LinkTrigger}
                options={[
                  { value: 'Desktop', children: 'Desktop' },
                  { value: 'Mobile', children: 'Mobile' },
                ]}
              />
            </Info.Item>
            <Info.Item label='Last update:'>
              1 hour ago
              <DescriptionTooltip>
                <DescriptionTooltip.Trigger
                  tag={InfoM}
                  display='inline-flex'
                  ml={1}
                  interactive
                  color='icon-secondary-neutral'
                  aria-label='About update rate'
                />
                <DescriptionTooltip.Popper aria-label='About update rate'>
                  Some details about data update rates.
                </DescriptionTooltip.Popper>
              </DescriptionTooltip>
            </Info.Item>
          </Info>
        </Header.Row>
      </Header>
    </Box>
  );
};

export default Demo;
