import { connect } from '../../src/connect';
import type { ConnectSettings } from '../../src/connect';

const addonLeft = connect.childCode('← - - addon properties', 'Link.Addon');
const addonRight = connect.childCode('addon properties - - →', 'Link.Addon');

const textWrapper = addonLeft || addonRight ? 'Link.Text' : undefined;
const text = connect.childCode('↳ text', textWrapper);

const ariaLabel = text ? undefined : 'aria-label = {/* short description */}';

const active = connect.getProp('state', 'active');
const disabled = connect.getProp('state', 'disabled');

const example = `
<Link
  ${ariaLabel}
  size={/* fontSize */}
  href={/* URL */}
  ${active}
  ${disabled}
>
${addonLeft}
${text}
${addonRight}
</Link>
`;

export const settings: ConnectSettings = {
  example,
  id: 'Link',
  url: 'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10142-178857',
  imports: ['import Link from "@semcore/ui/link"'],
};
