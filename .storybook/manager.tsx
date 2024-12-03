import React from 'react';
import {
  ADDON_ID,
  InteractionToggle,
  TOOL_ID,
} from '../stories/utils/components/InteractionToggle';
import { addons, types } from '@storybook/manager-api';

addons.register(ADDON_ID, () => {
  addons.add(TOOL_ID, {
    title: 'toggle interaction',
    type: types.TOOL,
    match: ({ viewMode, tabId }) => viewMode === 'story' && !tabId,
    render: () => <InteractionToggle />,
  });
});
