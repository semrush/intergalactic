import React from 'react';
import { Text } from '@semcore/typography';
import Link from '@semcore/link';
import Button from '@semcore/button';
import Tooltip from '@semcore/tooltip';
import ChevronDownXS from '@semcore/icon/lib/ChevronDown/xs';
import YoutubeXS from '@semcore/icon/lib/Youtube/xs';
import ChatXS from '@semcore/icon/lib/Chat/xs';
import BookXS from '@semcore/icon/lib/Book/xs';
import MathPlusXS from '@semcore/icon/lib/MathPlus/xs';
import SettingsXS from '@semcore/icon/lib/Settings/xs';
import DesktopXS from '@semcore/icon/lib/Desktop/xs';
import InfoXS from '@semcore/icon/lib/Info/xs';
import Breadcrumbs from '@semcore/breadcrumbs';
import { Box } from '@semcore/flex-box';
import TabPanel from '@semcore/tab-panel';

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
              <Link.Addon tag={YoutubeXS} />
              <Link.Text>Video tutorial</Link.Text>
            </Link>
            <Link>
              <Link.Addon tag={BookXS} />
              <Link.Text>User manual</Link.Text>
            </Link>
            <Link>
              <Link.Addon tag={ChatXS} />
              <Link.Text>Send feedback</Link.Text>
            </Link>
          </Header.Links>
        </Header.Row>

        <Header.Row>
          <Title toolName="Tool Name for:">
            <Text color="gray60" noWrap>
              Domain.com
            </Text>
          </Title>

          <Header.Buttons>
            <Button use="primary">
              <Button.Addon tag={MathPlusXS} />
              <Button.Text>Add Project</Button.Text>
            </Button>
            <Button>
              <Button.Addon tag={SettingsXS} />
              <Button.Text>Settings</Button.Text>
            </Button>
          </Header.Buttons>
        </Header.Row>

        <Header.Row>
          <Info>
            <Info.Item label="Location:">
              <Link>
                <Link.Text>United States</Link.Text>
                <Link.Addon tag={ChevronDownXS} />
              </Link>
            </Info.Item>
            <Info.Item label="Device:">
              <Link>
                <Link.Addon tag={DesktopXS} />
                <Link.Text>Desktop</Link.Text>
                <Link.Addon tag={ChevronDownXS} />
              </Link>
            </Info.Item>
            <Info.Item label="Data:">
              Fresh
              <Tooltip title="Fresh data tro-lo-lo">
                <InfoXS ml={1} color="stone" cursor="help" />
              </Tooltip>
            </Info.Item>
            <Info.Item>
              <Info.Item.Label>Last update:</Info.Item.Label>1 hour ago
            </Info.Item>
          </Info>
        </Header.Row>
      </Header>

      <TabPanel>
        <Box px="15px" />
        <TabPanel.Item selected>Overview</TabPanel.Item>
        <TabPanel.Item>Issues</TabPanel.Item>
        <TabPanel.Item>LinkedIn</TabPanel.Item>
        <Box px="15px" />
      </TabPanel>
    </>
  );
};
