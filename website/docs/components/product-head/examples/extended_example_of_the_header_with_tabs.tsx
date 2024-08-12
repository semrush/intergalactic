import React from 'react';
import { Text } from 'intergalactic/typography';
import Link from 'intergalactic/link';
import Button from 'intergalactic/button';
import { DescriptionTooltip } from 'intergalactic/tooltip';
import ChevronDownM from 'intergalactic/icon/ChevronDown/m';
import ChatM from 'intergalactic/icon/Chat/m';
import BookM from 'intergalactic/icon/Book/m';
import MathPlusM from 'intergalactic/icon/MathPlus/m';
import SettingsM from 'intergalactic/icon/Settings/m';
import InfoM from 'intergalactic/icon/Info/m';
import Breadcrumbs from 'intergalactic/breadcrumbs';
import TabLine from 'intergalactic/tab-line';
import Select from 'intergalactic/select';

import Header, { Info, Title } from 'intergalactic/product-head';

const Demo = () => {
  return (
    <>
      <Header mx={8}>
        <Header.Row>
          <Breadcrumbs>
            <Breadcrumbs.Item href='#'>Dashboard</Breadcrumbs.Item>
            <Breadcrumbs.Item href='#'>Projects</Breadcrumbs.Item>
            <Breadcrumbs.Item href='#' active>
              Project Name
            </Breadcrumbs.Item>
          </Breadcrumbs>

          <Header.Links>
            <Link>
              <Link.Addon>
                <BookM />
              </Link.Addon>
              <Link.Text>User manual</Link.Text>
            </Link>
            <Link>
              <Link.Addon>
                <ChatM />
              </Link.Addon>
              <Link.Text>Send feedback</Link.Text>
            </Link>
          </Header.Links>
        </Header.Row>

        <Header.Row>
          <Title toolName='Tool Name for:'>
            <Text color='gray-500' noWrap>
              Domain.com
            </Text>
          </Title>

          <Header.Buttons>
            <Button use='primary'>
              <Button.Addon>
                <MathPlusM />
              </Button.Addon>
              <Button.Text>Add Project</Button.Text>
            </Button>
            <Button>
              <Button.Addon>
                <SettingsM />
              </Button.Addon>
              <Button.Text>Settings</Button.Text>
            </Button>
          </Header.Buttons>
        </Header.Row>

        <Header.Row>
          <Info>
            <Info.Item label='Location:'>
              <Select value={['us']} placeholder='Select option' m='auto'>
                <Select.Trigger tag={Link}>
                  United States
                  <Link.Addon tag={ChevronDownM} />
                </Select.Trigger>
                <Select.Popper>
                  <Select.Option value='us'>United States</Select.Option>
                  <Select.Option value='ch'>China</Select.Option>
                  <Select.Option value='jp'>Japan</Select.Option>
                  <Select.Option value='gr'>Germany</Select.Option>
                  <Select.Option value='uk'>United Kingdom</Select.Option>
                  <Select.Option value='in'>India</Select.Option>
                  <Select.Option value='fr'>France</Select.Option>
                  <Select.Option value='it'>Italy</Select.Option>
                </Select.Popper>
              </Select>
            </Info.Item>
            <Info.Item label='Device:'>
              <Select value={['desktop']} placeholder='Select option' m='auto'>
                <Select.Trigger tag={Link}>
                  Desktop
                  <Link.Addon tag={ChevronDownM} />
                </Select.Trigger>
                <Select.Popper>
                  <Select.Option value='desktop'>Desktop</Select.Option>
                  <Select.Option value='mobile'>Mobile</Select.Option>
                </Select.Popper>
              </Select>
            </Info.Item>
            <Info.Item label='Data:'>
              Fresh
              <DescriptionTooltip>
                <DescriptionTooltip.Trigger
                  tag={InfoM}
                  style={{ display: 'inline-flex' }}
                  ml={1}
                  interactive
                  color='icon-secondary-neutral'
                  aria-label='About data'
                />
                <DescriptionTooltip.Popper aria-label='About data'>
                  Some more details why data is fresh
                </DescriptionTooltip.Popper>
              </DescriptionTooltip>
            </Info.Item>
            <Info.Item>
              <Info.Item.Label>Last update:</Info.Item.Label>1 hour ago
            </Info.Item>
          </Info>
        </Header.Row>
      </Header>

      <TabLine defaultValue='overview' px={8} size='l'>
        <TabLine.Item value='overview'>Overview</TabLine.Item>
        <TabLine.Item value='issues'>Issues</TabLine.Item>
        <TabLine.Item value='linked_in'>LinkedIn</TabLine.Item>
      </TabLine>
    </>
  );
};

export default Demo;
