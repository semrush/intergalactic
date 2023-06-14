import React from 'react';
import { snapshot } from '@semcore/testing-utils/snapshot';
import { expect, test, describe, beforeEach } from '@semcore/testing-utils/vitest';
import DnD from '../src';
import Badge from '@semcore/badge';
import LinkedInS from '@semcore/icon/LinkedIn/m';
import TabPanel from '@semcore/tab-panel';
import { cleanup } from '@semcore/testing-utils/testing-library';

describe('DragAndDrop', () => {
  beforeEach(cleanup);

  test.concurrent('Should render correctly', async ({ task }) => {
    const icons = {
      social: (
        <TabPanel.Item.Addon>
          <LinkedInS />
        </TabPanel.Item.Addon>
      ),
      issues: (
        <TabPanel.Item.Addon>
          <Badge bg="red">new</Badge>
        </TabPanel.Item.Addon>
      ),
    };
    const titles = {
      overview: 'Overview',
      issues: 'Issues',
      social: 'LinkedIn',
    };

    const tabs = ['overview', 'issues', 'social'];
    const currentTab = 'overview';

    const component = (
      <DnD tag={TabPanel} value={currentTab} onDnD={() => {}}>
        {tabs.map((tab) => (
          <DnD.Draggable placement="bottom" tag={TabPanel.Item} value={tab} key={tab} pb={0}>
            {icons[tab] ?? null}
            <TabPanel.Item.Text>{titles[tab]}</TabPanel.Item.Text>
          </DnD.Draggable>
        ))}
      </DnD>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });
});
