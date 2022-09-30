import React from 'react';
import BaseTrigger from '@semcore/base-trigger';
import addonText from '@semcore/utils/lib/addonText';
import Calendar from '@semcore/icon/Calendar/m';
import createComponent, { Root } from '@semcore/core';

const ButtonTriggerRoot = ({ Children }) => {
  return (
    <Root render={BaseTrigger}>
      <ButtonTrigger.Addon tag={Calendar} />
      {addonText(Children, ButtonTrigger.Text, ButtonTrigger.Addon)}
    </Root>
  );
};

ButtonTriggerRoot.displayName = 'ButtonTrigger';

const ButtonTrigger = createComponent(ButtonTriggerRoot, {
  Text: BaseTrigger.Text,
  Addon: BaseTrigger.Addon,
});

export default ButtonTrigger;
