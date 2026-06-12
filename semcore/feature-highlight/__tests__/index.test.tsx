import { extractUIName } from '@semcore/testing-utils/shared/extractUINameTree.ts';
import { render } from '@semcore/testing-utils/testing-library';
import { expect, describe } from '@semcore/testing-utils/vitest';
import React, { createRef } from 'react';

import { BadgeFH } from '../src/components/badge/Badge';
import { ButtonFH } from '../src/components/button/Button';
import { CheckboxFH } from '../src/components/checkbox/Checkbox';
import { InputFH } from '../src/components/input/Input';
import { NoticeFH } from '../src/components/notice/Notice';
import { PillsFH } from '../src/components/pills/Pills';
import { RadioFH } from '../src/components/radio/Radio';
import { SelectFH } from '../src/components/select/Select';
import { SwitchFH } from '../src/components/switch/Switch';
import { TabLineFH } from '../src/components/tab-line/TabLine';
import { ButtonTriggerFH } from '../src/inner-components/button-trigger/ButtonTrigger';
import SvgSparkle from '../src/inner-components/sparkle/Sparkle';

const expectUINameToMatchSnapshot = (component: React.ReactElement) => {
  const { container } = render(component);
  const result = extractUIName(container);

  expect(result).toMatchSnapshot();
};

describe('SvgSparkle', (test) => {
  test('Verify renders an SVG element', () => {
    const { container } = render(<SvgSparkle num={5} index={0} />);
    const svg = container.querySelector('svg');
    expect(svg).toBeTruthy();
  });

  test('Verify forwards ref to svg element', () => {
    const ref = createRef<SVGSVGElement>();
    render(<SvgSparkle num={5} index={1} ref={ref} />);
    expect(ref.current).toBeInstanceOf(SVGElement);
  });
});

const verifyDataTestIds = (container: HTMLElement, ids: string[], texts?: Record<string, string>) => {
  ids.forEach((id) => {
    const el = container.querySelector(`[data-test-id="${id}"]`);
    expect(el).not.toBeNull();
    if (texts && texts[id]) {
      expect(el!.textContent).toBe(texts[id]);
    }
  });
};

describe('BadgeFH', (test) => {
  test('Verify data-ui-name', () => {
    expectUINameToMatchSnapshot(<BadgeFH>AI-powered</BadgeFH>);
  });
});

describe('PillsFH', (test) => {
  test('Verify data-ui-name', () => {
    const pills = (
      <PillsFH defaultValue={1}>
        <PillsFH.Item value={1}>One</PillsFH.Item>
        <PillsFH.HighlightedItem value={2} aria-describedby='pills-aria-desc'>
          <PillsFH.HighlightedItem.Text>Two</PillsFH.HighlightedItem.Text>
          <PillsFH.HighlightedItem.Addon>{999}</PillsFH.HighlightedItem.Addon>
        </PillsFH.HighlightedItem>
      </PillsFH>
    );

    expectUINameToMatchSnapshot(pills);
  });

  test('Verify allow adding data-test-id everywhere', () => {
    const { container } = render(
      <PillsFH defaultValue={1} data-test-id='PillsFH1'>
        <PillsFH.Item data-test-id='PillsItem1' value={1}>One</PillsFH.Item>
        <PillsFH.HighlightedItem data-test-id='PillsItem2' value={2} aria-describedby='pills-aria-desc'>
          <PillsFH.HighlightedItem.Text data-test-id='text'>Two</PillsFH.HighlightedItem.Text>
          <PillsFH.HighlightedItem.Addon data-test-id='addon'>{999}</PillsFH.HighlightedItem.Addon>
        </PillsFH.HighlightedItem>
        <PillsFH.Item value={3}>Three</PillsFH.Item>
      </PillsFH>,
    );

    verifyDataTestIds(container, ['PillsFH1', 'PillsItem1', 'PillsItem2', 'text', 'addon'], {
      PillsItem1: 'One',
      PillsItem2: 'Two999',
      addon: '999',
    });
  });
});

describe('ButtonFH', (test) => {
  test('Verify data-ui-name', () => {
    const button = (
      <ButtonFH size='l'>
        <ButtonFH.Addon animatedSparkleCount={5} />
        <ButtonFH.Text>Button</ButtonFH.Text>
        <ButtonFH.Addon>
          <BadgeFH>AI-powered</BadgeFH>
        </ButtonFH.Addon>
      </ButtonFH>
    );

    expectUINameToMatchSnapshot(button);
  });

  test('Verify allow adding data-test-id everywhere', () => {
    const { container } = render(
      <ButtonFH size='l' data-test-id='ButtonFH1'>
        <ButtonFH.Addon data-test-id='addon1' animatedSparkleCount={5} />
        <ButtonFH.Text data-test-id='text1'>Secondary Large</ButtonFH.Text>
        <ButtonFH.Addon>
          <BadgeFH data-test-id='badge1'>AI-powered</BadgeFH>
        </ButtonFH.Addon>
      </ButtonFH>,
    );

    verifyDataTestIds(container, ['ButtonFH1', 'addon1', 'text1', 'badge1'], {
      text1: 'Secondary Large',
      badge1: 'AI-powered',
    });
  });
});

describe('ButtonTriggerFH', (test) => {
  test('Verify data-ui-name', () => {
    const buttonTrigger = (
      <ButtonTriggerFH>
        <ButtonTriggerFH.Addon />
        <ButtonTriggerFH.Text>Button trigger</ButtonTriggerFH.Text>
      </ButtonTriggerFH>
    );

    expectUINameToMatchSnapshot(buttonTrigger);
  });
});

describe('CheckboxFH', (test) => {
  test('Verify data-ui-name', () => {
    const checkbox = (
      <CheckboxFH aria-describedby='checkbox-aria-desc'>
        <CheckboxFH.Value />
        <CheckboxFH.Text>First option</CheckboxFH.Text>
      </CheckboxFH>
    );

    expectUINameToMatchSnapshot(checkbox);
  });

  test('Verify allow adding data-test-id everywhere', () => {
    const { container } = render(
      <CheckboxFH aria-describedby='checkbox-aria-desc' data-test-id='test1'>
        <CheckboxFH.Value data-test-id='test2' />
        <CheckboxFH.Text data-test-id='test4'>
          First option
        </CheckboxFH.Text>
      </CheckboxFH>,
    );

    verifyDataTestIds(container, ['test1', 'test2', 'test4']);
  });
});

describe('InputFH', (test) => {
  test('Verify data-ui-name', () => {
    const input = (
      <InputFH w={200}>
        <InputFH.Addon />
        <InputFH.Value placeholder='Your domain' aria-label='Highlighted input' />
      </InputFH>
    );

    expectUINameToMatchSnapshot(input);
  });

  test('Verify allow adding data-test-id everywhere', () => {
    const { container } = render(
      <InputFH w={200} data-test-id='test1'>
        <InputFH.Addon data-test-id='test2' />
        <InputFH.Value data-test-id='test3' placeholder='Your domain' aria-label='Highlighted input' aria-describedby='input-aria-desc' />
      </InputFH>,
    );

    verifyDataTestIds(container, ['test1', 'test2', 'test3']);
  });
});

describe('SelectFH', (test) => {
  test('Verify data-ui-name', () => {
    const select = (
      <SelectFH value='one' visible disablePortal>
        <SelectFH.Trigger>
          <SelectFH.Trigger.Addon />
          <SelectFH.Trigger.Text>One</SelectFH.Trigger.Text>
        </SelectFH.Trigger>
        <SelectFH.Popper aria-label=''>
          <SelectFH.Menu>
            <SelectFH.Option value='one'>One</SelectFH.Option>
          </SelectFH.Menu>
        </SelectFH.Popper>
      </SelectFH>
    );

    expectUINameToMatchSnapshot(select);
  });
});

describe('NoticeFH', (test) => {
  test.sequential('Verify data-ui-name', () => {
    const notice = (
      <NoticeFH closable>
        <NoticeFH.Label />
        <NoticeFH.Content>
          <NoticeFH.Title />
          <NoticeFH.Text />
          <NoticeFH.Actions />
        </NoticeFH.Content>
        <NoticeFH.Close />
      </NoticeFH>
    );

    expectUINameToMatchSnapshot(notice);
  });

  test('Verify render closable notice with data-test-id', () => {
    const { container } = render(
      <NoticeFH closable aria-label='Highlighted notice' data-test-id='test1' text='We have a new feature!' />,
    );

    verifyDataTestIds(container, ['test1']);
  });

  test('Should render in smart mode with simple props', () => {
    const { getByText, container } = render(
      <NoticeFH
        closable
        aria-label='Smart mode notice'
        label={<span data-testid='label-icon'>Icon</span>}
        title={<span>Test Title</span>}
        actions={<button>Action</button>}
        text='Test content'
      />,
    );

    expect(getByText('Test Title')).toBeTruthy();
    expect(getByText('Test content')).toBeTruthy();
    expect(getByText('Action')).toBeTruthy();
    expect(container.querySelector('[data-testid="label-icon"]')).toBeTruthy();
  });

  test.sequential('Should render in advanced mode with subcomponents', () => {
    const { getByText, container } = render(
      <NoticeFH closable aria-label='Advanced mode notice'>
        <NoticeFH.Label data-testid='custom-label'>
          <span>Custom Icon</span>
        </NoticeFH.Label>
        <NoticeFH.Content>
          <NoticeFH.Title>
            <span>Advanced Title</span>
          </NoticeFH.Title>
          <NoticeFH.Text>Advanced content text</NoticeFH.Text>
          <NoticeFH.Actions>
            <button>Advanced Action</button>
          </NoticeFH.Actions>
        </NoticeFH.Content>
        <NoticeFH.Close />
      </NoticeFH>,
    );

    expect(getByText('Custom Icon')).toBeTruthy();
    expect(getByText('Advanced Title')).toBeTruthy();
    expect(getByText('Advanced content text')).toBeTruthy();
    expect(getByText('Advanced Action')).toBeTruthy();
    expect(container.querySelector('[data-testid="custom-label"]')).toBeTruthy();
  });

  test('Should render advanced mode with only content and text', () => {
    const { getByText } = render(
      <NoticeFH aria-label='Minimal advanced mode'>
        <NoticeFH.Content>
          <NoticeFH.Text>Simple advanced mode text</NoticeFH.Text>
        </NoticeFH.Content>
      </NoticeFH>,
    );

    expect(getByText('Simple advanced mode text')).toBeTruthy();
  });

  test('Should support mixing Label and Content in advanced mode', () => {
    const { getByText } = render(
      <NoticeFH aria-label='Mixed mode'>
        <NoticeFH.Label>Label part</NoticeFH.Label>
        <NoticeFH.Content>
          <NoticeFH.Text>Content part</NoticeFH.Text>
        </NoticeFH.Content>
      </NoticeFH>,
    );

    expect(getByText('Label part')).toBeTruthy();
    expect(getByText('Content part')).toBeTruthy();
  });
});

describe('RadioFH', (test) => {
  test('Verify data-ui-name', () => {
    const radio = (
      <RadioFH value={1}>
        <RadioFH.Value />
        <RadioFH.Text>First option</RadioFH.Text>
      </RadioFH>
    );

    expectUINameToMatchSnapshot(radio);
  });

  test('Verify allow adding data-test-id to all subcomponents', () => {
    const { container } = render(
      <RadioFH value={1} data-test-id='radio-1'>
        <RadioFH.Value data-test-id='radio-value' />
        <RadioFH.Text data-test-id='radio-text'>
          First option
        </RadioFH.Text>
      </RadioFH>,
    );

    verifyDataTestIds(container, ['radio-1', 'radio-value', 'radio-text']);
  });
});

describe('SwitchFH', (test) => {
  test('Verify data-ui-name', () => {
    const switchFH = (
      <SwitchFH>
        <SwitchFH.Value aria-describedby='switch-aria-desc' ml={0} />
        <SwitchFH.Addon>Medium switch</SwitchFH.Addon>
      </SwitchFH>
    );

    expectUINameToMatchSnapshot(switchFH);
  });

  test('Verify allow adding data-test-id to all subcomponents', () => {
    const { container } = render(
      <SwitchFH data-test-id='switchfh'>
        <SwitchFH.Value data-test-id='switch-value' aria-describedby='switch-aria-desc' ml={0} />
        <SwitchFH.Addon data-test-id='switch-addon'>
          Medium switch
        </SwitchFH.Addon>
      </SwitchFH>,
    );

    verifyDataTestIds(container, ['switchfh', 'switch-value', 'switch-addon']);
  });
});

describe('TabLineFH', (test) => {
  test('Verify data-ui-name', () => {
    const tabLine = (
      <TabLineFH size='m' aria-label='Tabs with highlighted item' defaultValue={1}>
        <TabLineFH.Item value={1}>First option</TabLineFH.Item>
        <TabLineFH.HighlightedItem value={2} aria-describedby='tab-aria-desc'>
          <TabLineFH.HighlightedItem.Addon animatedSparkleCount={5} />
          <TabLineFH.HighlightedItem.Text>Second option</TabLineFH.HighlightedItem.Text>
        </TabLineFH.HighlightedItem>
      </TabLineFH>
    );

    expectUINameToMatchSnapshot(tabLine);
  });

  test('Verify allow adding data-test-id to all subcomponents', () => {
    const { container } = render(
      <TabLineFH size='m' aria-label='Tabs with highlighted item' defaultValue={1} data-test-id='tablinefh'>
        <TabLineFH.Item value={1} data-test-id='tab-item-1'>First option</TabLineFH.Item>
        <TabLineFH.HighlightedItem value={2} aria-describedby='tab-aria-desc' data-test-id='tab-highlighted-2'>
          <TabLineFH.HighlightedItem.Addon data-test-id='tab-addon-2' animatedSparkleCount={5} />
          <TabLineFH.HighlightedItem.Text data-test-id='tab-text-2'>Second option</TabLineFH.HighlightedItem.Text>
        </TabLineFH.HighlightedItem>
        <TabLineFH.Item value={3} data-test-id='tab-item-3'>Third option</TabLineFH.Item>
      </TabLineFH>,
    );

    verifyDataTestIds(container, [
      'tablinefh', 'tab-item-1', 'tab-highlighted-2', 'tab-addon-2', 'tab-text-2', 'tab-item-3',
    ], {
      'tab-text-2': 'Second option',
    });
  });
});
