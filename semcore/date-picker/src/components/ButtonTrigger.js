import React, { ComponentProps } from 'react';
import BaseTrigger from '@semcore/base-trigger';
import { Box } from '@semcore/flex-box';
import addonTextChildren from '@semcore/utils/lib/addonTextChildren';
import CalendarXS from '@semcore/icon/lib/Calendar/xs';
import CalendarS from '@semcore/icon/lib/Calendar/s';
import createComponent, { Root } from '@semcore/core';

const MAP_SIZE_TO_CALENDAR_SIZE = {
  m: CalendarXS,
  l: CalendarS,
  xl: CalendarS,
};

const ButtonTriggerRoot = ({ Children, size }) => {
  const Icon = MAP_SIZE_TO_CALENDAR_SIZE[size || 'm'];
  return (
    <Root render={BaseTrigger}>
      <ButtonTrigger.Addon tag={Icon} />
      {addonTextChildren(Children, ButtonTrigger.Text, ButtonTrigger.Addon)}
    </Root>
  );
};

ButtonTriggerRoot.displayName = 'ButtonTrigger';

const ButtonTrigger = createComponent(ButtonTriggerRoot, {
  Text: BaseTrigger.Text,
  Addon: BaseTrigger.Addon,
});

export default ButtonTrigger;
