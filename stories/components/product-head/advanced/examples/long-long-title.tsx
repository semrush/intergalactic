import { Flex, Box } from '@semcore/ui/base-components';
import { LinkTrigger } from '@semcore/ui/base-trigger';
import { ButtonLink } from '@semcore/ui/button';
import Ellipsis from '@semcore/ui/ellipsis';
import BookM from '@semcore/ui/icon/Book/m';
import Chat from '@semcore/ui/icon/Chat/m';
import EditM from '@semcore/ui/icon/Edit/m';
import InfoM from '@semcore/ui/icon/Info/m';
import Link from '@semcore/ui/link';
import Header, { Info, Title } from '@semcore/ui/product-head';
import Select from '@semcore/ui/select';
import { DescriptionTooltip } from '@semcore/ui/tooltip';
import { Text } from '@semcore/ui/typography';
import React from 'react';

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
              <ButtonLink addonLeft={EditM} aria-label='Hint for button-link' />
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
                defaultValue='us'
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
                defaultValue='Desktop'
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
                  tag={ButtonLink}
                  addonLeft={InfoM}
                  display='inline-flex'
                  ml={1}
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
