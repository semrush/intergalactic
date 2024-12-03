import React, { useCallback } from 'react';

import { IconButton } from '@storybook/components';
import { PlayIcon, StopIcon } from '@storybook/icons';
import { isAutoPlay, toggleAutoPlay } from '../playWrapper';

export const ADDON_ID = 'toggle-interaction';
export const TOOL_ID = `${ADDON_ID}/tool`;

export const InteractionToggle = () => {
  const [disableInteractions, setDisableInteractions] = React.useState(isAutoPlay());

  const toggleMyTool = useCallback(() => {
    toggleAutoPlay();
    setDisableInteractions(!disableInteractions);
    // Refreshes the page to cause the interaction to stop/start
    window.location.reload();
  }, [disableInteractions, setDisableInteractions]);

  return (
    <IconButton
      key={TOOL_ID}
      aria-label='Disable Interactions'
      onClick={toggleMyTool}
      defaultChecked={disableInteractions}
      aria-pressed={disableInteractions}
    >
      {disableInteractions ? <PlayIcon /> : <StopIcon />}
      Interactions
    </IconButton>
  );
};
