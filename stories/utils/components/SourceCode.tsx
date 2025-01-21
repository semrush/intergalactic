import React from 'react';
import { AddonPanel } from '@storybook/components';
import { Source } from '@storybook/blocks';
import { useStorybookApi, useStorybookState } from '@storybook/manager-api';
import { useTheme } from '@storybook/theming';

export const SP_ADDON_ID = 'storybook/source-tab';
export const SP_PANEL_ID = `${SP_ADDON_ID}/panel`;

export const SourcePanel = ({ active }: { active: boolean }) => {
  const api = useStorybookApi();
  const state = useStorybookState();
  const theme = useTheme();
  const story = api.getData(state.storyId, state.refId);

  if (!story) {
    return null;
  }

  return (
    <AddonPanel active={active}>
      <div style={{ padding: '1rem' }}>
        <Source
          code={story.parameters?.sourceCode || '// No source available'}
          language='tsx'
          dark={theme.base === 'dark'}
        />
      </div>
    </AddonPanel>
  );
};
