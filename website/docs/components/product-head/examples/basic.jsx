import React from 'react';
import { Text } from '@semcore/ui/typography';
import Link from '@semcore/ui/link';
import Button from '@semcore/ui/button';
import Tooltip from '@semcore/ui/tooltip';
import ChevronDownM from '@semcore/ui/icon/ChevronDown/m';
import ChatM from '@semcore/ui/icon/Chat/m';
import BookM from '@semcore/ui/icon/Book/m';
import MathPlusM from '@semcore/ui/icon/MathPlus/m';
import SettingsM from '@semcore/ui/icon/Settings/m';
import InfoM from '@semcore/ui/icon/Info/m';
import Breadcrumbs from '@semcore/ui/breadcrumbs';
import { Box } from '@semcore/ui/flex-box';
import TabLine from '@semcore/ui/tab-line';
import Select from '@semcore/ui/select';

import Header, { Info, Title } from '@semcore/ui/product-head';

export default () => {
  return (
    <>
      <Header mx={6}>
        <Header.Row>
          <Breadcrumbs>
            <Breadcrumbs.Item>Dashboard</Breadcrumbs.Item>
            <Breadcrumbs.Item>Projects</Breadcrumbs.Item>
            <Breadcrumbs.Item active>Project Name</Breadcrumbs.Item>
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
          <Title toolName="Tool Name for:">
            <Text color="gray-500" noWrap>
              Domain.com
            </Text>
          </Title>

          <Header.Buttons>
            <Button use="primary">
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
            <Info.Item label="Location:">
              <Select value={['us']} placeholder="Select an option, sir 🧐" m="auto">
                <Select.Trigger tag={Link}>
                  United States
                  <Link.Addon tag={ChevronDownM} />
                </Select.Trigger>
                <Select.Popper>
                  <Select.Option value="us">United States</Select.Option>
                  <Select.Option value="ch">China</Select.Option>
                  <Select.Option value="jp">Japan</Select.Option>
                  <Select.Option value="gr">Germany</Select.Option>
                  <Select.Option value="uk">United Kingdom</Select.Option>
                  <Select.Option value="in">India</Select.Option>
                  <Select.Option value="fr">France</Select.Option>
                  <Select.Option value="it">Italy</Select.Option>
                </Select.Popper>
              </Select>
            </Info.Item>
            <Info.Item label="Device:">
              <Select value={['desktop']} placeholder="Select an option, sir 🧐" m="auto">
                <Select.Trigger tag={Link}>
                  Desktop
                  <Link.Addon tag={ChevronDownM} />
                </Select.Trigger>
                <Select.Popper>
                  <Select.Option value="desktop">Desktop</Select.Option>
                  <Select.Option value="mobile">Mobile</Select.Option>
                </Select.Popper>
              </Select>
            </Info.Item>
            <Info.Item label="Data:">
              Fresh
              <Tooltip
                title="Some more details why data is fresh 🌚"
                style={{ display: 'inline-flex' }}
              >
                <InfoM ml={1} color="gray-300" cursor="help" />
              </Tooltip>
            </Info.Item>
            <Info.Item>
              <Info.Item.Label>Last update:</Info.Item.Label>1 hour ago
            </Info.Item>
          </Info>
        </Header.Row>
      </Header>

      <TabLine defaultValue="overview" px={6}>
        <TabLine.Item value="overview">Overview</TabLine.Item>
        <TabLine.Item value="issues">Issues</TabLine.Item>
        <TabLine.Item value="linked_in">LinkedIn</TabLine.Item>
      </TabLine>
    </>
  );
};
