import React from 'react';
import { testing, snapshot } from '@semcore/jest-preset-ui';
import { assert, expect, test, describe, afterEach, vi } from 'vitest';
import DnD from '../src';
import Badge from '@semcore/badge';
import LinkedInS from '@semcore/icon/LinkedIn/m';
import TabPanel from '@semcore/tab-panel';
const { cleanup } = testing;

describe('DragAndDrop', () => {
  afterEach(cleanup);

  test('Should render correctly', async () => {
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

    expect(await snapshot(component)).toMatchImageSnapshot();
  });
});
