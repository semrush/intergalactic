import React from 'react';
import BaseTrigger from '@semcore/base-trigger';
import addonTextChildren from '@semcore/utils/lib/addonTextChildren';
import Calendar from '@semcore/icon/Calendar/m';
import createComponent, { Root } from '@semcore/core';

const ButtonTriggerRoot = ({ Children }) => {
  return (
    <Root render={BaseTrigger}>
      <ButtonTrigger.Addon tag={Calendar} />
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
