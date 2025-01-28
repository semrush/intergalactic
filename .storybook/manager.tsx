import React from 'react';
import {
  ADDON_ID,
  InteractionToggle,
  TOOL_ID,
} from '../stories/utils/components/InteractionToggle';
import { addons, types } from '@storybook/manager-api';
import { SP_ADDON_ID, SP_PANEL_ID, SourcePanel } from '../stories/utils/components/SourceCode';

addons.register(ADDON_ID, () => {
  addons.add(TOOL_ID, {
    title: 'toggle interaction',
    type: types.TOOL,
    match: ({ viewMode, tabId }) => viewMode === 'story' && !tabId,
    render: () => <InteractionToggle />,
  });
});

addons.register(SP_ADDON_ID, () => {
  addons.add(SP_PANEL_ID, {
    type: types.PANEL,
    title: 'Source',
    render: ({ active }) => <SourcePanel active={Boolean(active)} />,
  });
});
