import BookM from '@semcore/icon/Book/m';
import Chat from '@semcore/icon/Chat/m';
import InfoM from '@semcore/icon/Info/m';
import MathPlusM from '@semcore/icon/MathPlus/m';
import SettingsM from '@semcore/icon/Settings/m';
import { LinkTrigger } from '@semcore/ui/base-trigger';
import Breadcrumbs from '@semcore/ui/breadcrumbs';
import Button, { ButtonLink } from '@semcore/ui/button';
import Link from '@semcore/ui/link';
import Header, { Info, Title } from '@semcore/ui/product-head';
import Select from '@semcore/ui/select';
import { DescriptionTooltip } from '@semcore/ui/tooltip';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const Demo = () => {
  return (
    <>
      <Header mx={8}>
        <Header.Row>
          <Breadcrumbs>
            <Breadcrumbs.Item href='#'>Projects</Breadcrumbs.Item>
            <Breadcrumbs.Item href='#'>Domain.com</Breadcrumbs.Item>
            <Breadcrumbs.Item href='#' active>
              Tool Name
            </Breadcrumbs.Item>
          </Breadcrumbs>

          <Header.Links>
            <ButtonLink addonLeft={Chat}>Feedback</ButtonLink>
            <Link noWrap addonLeft={BookM}>User manual</Link>
          </Header.Links>
        </Header.Row>

        <Header.Row>
          <Title toolName='Tool Name:'>
            <Text color='text-secondary' noWrap>
              Domain.com
            </Text>
          </Title>

          <Header.Buttons>
            <Button use='primary' addonLeft={MathPlusM}>
              Add Project
            </Button>
            <Button addonLeft={SettingsM}>Settings</Button>
          </Header.Buttons>
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
                  { value: 'us', label: 'United States', children: 'United States' },
                  { value: 'ch', label: 'China', children: 'China' },
                  { value: 'ja', label: 'Japan', children: 'Japan' },
                  { value: 'ge', label: 'Germany', children: 'Germany' },
                  { value: 'uk', label: 'United Kingdom', children: 'United Kingdom' },
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
                  mt='-2px'
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
    </>
  );
};

export default Demo;
