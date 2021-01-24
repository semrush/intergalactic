import React, { ComponentProps } from 'react';
import BaseTrigger from '@semcore/base-trigger';
import addonTextChildren from '@semcore/utils/lib/addonTextChildren';
import CalendarXS from '@semcore/icon/lib/Calendar/xs';
import CalendarS from '@semcore/icon/lib/Calendar/s';
import createComponent from '@semcore/core';

const MAP_SIZE_TO_CALENDAR_SIZE = {
  m: CalendarXS,
  l: CalendarS,
  xl: CalendarS,
};

const ButtonTriggerRoot = (props) => {
  const { Root, Children } = props;
  const Icon = MAP_SIZE_TO_CALENDAR_SIZE[(props.size && props.size) || 'm'];
  return (
    <Root render={BaseTrigger}>
      <ButtonTrigger.Addon tag={Icon} />
      {addonTextChildren(Children, ButtonTrigger.Text, ButtonTrigger.Addon)}
    </Root>
  );
};

ButtonTriggerRoot.displayName = 'ButtonTrigger';

const ButtonTrigger = createComponent<
  ComponentProps<typeof BaseTrigger>,
  {
    Text: ComponentProps<typeof BaseTrigger.Text>;
    Addon: ComponentProps<typeof BaseTrigger.Addon>;
  }
>(ButtonTriggerRoot, {
  Text: BaseTrigger.Text,
  Addon: BaseTrigger.Addon,
});

export default ButtonTrigger;
