import { shouldHaveDataUiName, runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { describe } from '@semcore/testing-utils/vitest';

import WidgetEmpty, { Error as WidgetError, NoData } from '../src';

describe('widget-empty Dependency imports', () => {
  runDependencyCheckTests('widget-empty');
});

describe('WidgetEmpty data-ui-name', () => {
  shouldHaveDataUiName({
    Component: WidgetEmpty,
    props: { children: 'WidgetEmpty' },
    expectedDataUiName: 'WidgetEmpty',
  });

  shouldHaveDataUiName({
    Component: WidgetEmpty.Title,
    Wrapper: WidgetEmpty,
    props: { children: 'Title' },
    expectedDataUiName: 'WidgetEmpty.Title',
  });

  shouldHaveDataUiName({
    Component: WidgetEmpty.Description,
    Wrapper: WidgetEmpty,
    props: { children: 'Description' },
    expectedDataUiName: 'WidgetEmpty.Description',
  });

  shouldHaveDataUiName({
    Component: NoData,
    expectedDataUiName: 'WidgetNoData',
  });

  shouldHaveDataUiName({
    Component: WidgetError,
    expectedDataUiName: 'WidgetError',
  });
});
