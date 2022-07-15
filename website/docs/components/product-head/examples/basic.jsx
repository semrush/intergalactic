import React from 'react';
import { Text } from '@semcore/typography';
import Link from '@semcore/link';
import Button from '@semcore/button';
import Tooltip from '@semcore/tooltip';
import ChevronDownM from '@semcore/icon/ChevronDown/m';
import VideoM from '@semcore/icon/Video/m';
import ChatM from '@semcore/icon/Chat/m';
import BookM from '@semcore/icon/Book/m';
import MathPlusM from '@semcore/icon/MathPlus/m';
import SettingsM from '@semcore/icon/Settings/m';
import InfoM from '@semcore/icon/Info/m';
import Breadcrumbs from '@semcore/breadcrumbs';
import { Box } from '@semcore/flex-box';
import TabPanel from '@semcore/tab-panel';
import Select from '@semcore/select';

import Header, { Info, Title } from '@semcore/product-head';

export default () => {
  return (
    <>
      <Header>
        <Header.Row>
          <Breadcrumbs>
            <Breadcrumbs.Item>Dashboard</Breadcrumbs.Item>
            <Breadcrumbs.Item>Projects</Breadcrumbs.Item>
            <Breadcrumbs.Item>Project Name</Breadcrumbs.Item>
            <Breadcrumbs.Item active>Tool Name</Breadcrumbs.Item>
          </Breadcrumbs>

          <Header.Links>
            <Link>
              <Link.Addon>
                <VideoM />
              </Link.Addon>
              <Link.Text>Video tutorial</Link.Text>
            </Link>
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

      <TabPanel defaultValue="overview">
        <Box px="15px" />
        <TabPanel.Item value="overview">Overview</TabPanel.Item>
        <TabPanel.Item value="issues">Issues</TabPanel.Item>
        <TabPanel.Item value="linked_in">LinkedIn</TabPanel.Item>
        <Box px="15px" />
      </TabPanel>
    </>
  );
};
