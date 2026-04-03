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
      <Title toolName='Tool Name:' m={2}>
        <Text color='text-secondary' noWrap>
          Title only
        </Text>
      </Title>

      <Title m={2}>
        <Text color='text-secondary' noWrap>
          Title without ToolName
        </Text>
      </Title>

      <Header.Row m={2}>
        <Breadcrumbs>
          <Breadcrumbs.Item href='#'>Row only</Breadcrumbs.Item>
          <Breadcrumbs.Item href='#'>Domain.com</Breadcrumbs.Item>
          <Breadcrumbs.Item href='#' active>
            Tool Name
          </Breadcrumbs.Item>
        </Breadcrumbs>

      </Header.Row>

      <Header.Links m={2}>
        <ButtonLink addonLeft={Chat} mr={2}>Links only</ButtonLink>
        <Link addonLeft={BookM}>User manual</Link>
      </Header.Links>

      <Header.Buttons m={2}>
        <Button use='primary' addonLeft={MathPlusM} mr={2}>
          Buttons only
        </Button>
        <Button addonLeft={SettingsM}>Settings</Button>
      </Header.Buttons>

      <Info m={2}>
        <Info.Item mr={2}>
          <Info.Item.Label tag='label' htmlFor='select-location'>
            InfoItem inside Info Location:
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
      </Info>

      <Info.Item label='Info Item:' m={2}>
        Info Item
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
    </>
  );
};

export default Demo;
