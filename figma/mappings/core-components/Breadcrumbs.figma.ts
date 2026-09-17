import { connect } from '../../src/connect';
import type { ConnectSettings } from '../../src/connect';

const first = connect.childCode('Home link', {
  wrapper: 'Breadcrumbs.Item href="/"',
});

const second = connect.childCode('Toolkit link', {
  wrapper: 'Breadcrumbs.Item href={/* url */}',
});

const third = connect.childCode('Product link', {
  wrapper: 'Breadcrumbs.Item active',
});

const example = `
<Breadcrumbs>
  ${first}${second}${third}
</Breadcrumbs>
`;

export const settings: ConnectSettings = {
  example,
  id: 'Breadcrumbs',
  url: 'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=11878-115146',
  imports: ['import Breadcrumbs from "@semcore/ui/breadcrumbs"'],
};
