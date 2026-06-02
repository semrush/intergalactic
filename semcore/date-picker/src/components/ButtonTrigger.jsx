import BaseTrigger from '@semcore/base-trigger';
import { createComponent, Root } from '@semcore/core';
import addonTextChildren from '@semcore/core/lib/utils/addonTextChildren';
import Calendar from '@semcore/icon/Calendar/m';
import React from 'react';

function ButtonTriggerRoot({ Children }) {
  return (
    <Root render={BaseTrigger}>
      <ButtonTrigger.Addon tag={Calendar} />
      {addonTextChildren(Children, ButtonTrigger.Text, ButtonTrigger.Addon, true)}
    </Root>
  );
}

ButtonTriggerRoot.displayName = 'ButtonTrigger';

/**
 * ButtonTrigger
 *
 * {@link https://developer.semrush.com/intergalactic/components/date-picker/date-picker-api/|API} | {@link https://developer.semrush.com/intergalactic/components/date-picker/date-picker-code/|Examples}
 */
const ButtonTrigger = createComponent(ButtonTriggerRoot, {
  Text: BaseTrigger.Text,
  Addon: BaseTrigger.Addon,
});

export default ButtonTrigger;
