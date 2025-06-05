import BaseTrigger from '@semcore/base-trigger';
import { createComponent, Root } from '@semcore/core';
import addonTextChildren from '@semcore/core/lib/utils/addonTextChildren';
import Calendar from '@semcore/icon/Calendar/m';

const ButtonTriggerRoot = ({ Children }) => {
  return (
    <Root render={BaseTrigger}>
      <ButtonTrigger.Addon tag={Calendar} />
      {addonTextChildren(Children, ButtonTrigger.Text, ButtonTrigger.Addon, true)}
    </Root>
  );
};

ButtonTriggerRoot.displayName = 'ButtonTrigger';

const ButtonTrigger = createComponent(ButtonTriggerRoot, {
  Text: BaseTrigger.Text,
  Addon: BaseTrigger.Addon,
});

export default ButtonTrigger;
