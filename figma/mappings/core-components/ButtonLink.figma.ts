import { connect } from '../../src/connect';
import type { ConnectSettings } from '../../src/connect';

const addonLeft = connect.childCode('← - - addon properties', 'ButtonLink.Addon');
const addonRight = connect.childCode('addon properties - - →', 'ButtonLink.Addon');

const textWrapper = addonLeft || addonRight
  ? 'ButtonLink.Text'
  : undefined;
const text = connect.childCode('↳ text', textWrapper);

const ariaLabel = text
  ? undefined
  : connect.setProp('aria-label', connect.childCode('↳ title') ?? '/* short description */');

const active = connect.getProp('state', 'active');
const disabled = connect.getProp('state', 'disabled');
const use = connect.getProp('use');

const example = `
<ButtonLink
  ${ariaLabel}
  ${use}
  size={/* fontSize */}
  color={/* color-token */}
  ${active}
  ${disabled}
>
${addonLeft}
${text}
${addonRight}
</ButtonLink>
`;
export const settings: ConnectSettings = {
  example,
  id: 'ButtonLink',
  url: 'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=45638-2735',
  imports: ['import { ButtonLink } from "@semcore/ui/button"'],
};
