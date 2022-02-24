import React from 'react';
import { testing, shared, snapshot } from '@semcore/jest-preset-ui';
import Checkbox from '../src';

const { cleanup, render, axe } = testing;
const { shouldSupportClassName, shouldSupportRef } = shared;

describe('Checkbox', () => {
  afterEach(cleanup);

  shouldSupportClassName(Checkbox);
  shouldSupportRef(Checkbox);
  shouldSupportClassName(Checkbox.Value, Checkbox);
  shouldSupportRef(Checkbox.Value, Checkbox);
  shouldSupportClassName(Checkbox.Text, Checkbox);
  shouldSupportRef(Checkbox.Text, Checkbox);

  test('Renders correctly', async () => {
    const component = (
      <snapshot.ProxyProps m="5px">
        <Checkbox>
          <Checkbox.Value />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>
        <Checkbox>
          <Checkbox.Value checked />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>
      </snapshot.ProxyProps>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support sizes', async () => {
    const component = (
      <snapshot.ProxyProps m="5px">
        <Checkbox size="xl">
          <Checkbox.Value />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>
        <Checkbox size="l">
          <Checkbox.Value />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>
        <Checkbox size="m">
          <Checkbox.Value />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>
      </snapshot.ProxyProps>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support normal state', async () => {
    const component = (
      <snapshot.ProxyProps m="5px">
        <Checkbox>
          <Checkbox.Value disabled />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>
        <Checkbox>
          <Checkbox.Value keyboardFocused />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>
        <Checkbox>
          <Checkbox.Value checked />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>
        <Checkbox>
          <Checkbox.Value checked disabled />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>
        <Checkbox>
          <Checkbox.Value checked keyboardFocused />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>
      </snapshot.ProxyProps>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support invalid state', async () => {
    const component = (
      <snapshot.ProxyProps m="5px">
        <Checkbox state="invalid">
          <Checkbox.Value />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>
        <Checkbox state="invalid">
          <Checkbox.Value disabled />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>
        <Checkbox state="invalid">
          <Checkbox.Value keyboardFocused />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>
        <Checkbox state="invalid">
          <Checkbox.Value checked />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>
        <Checkbox state="invalid">
          <Checkbox.Value checked disabled />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>
        <Checkbox state="invalid">
          <Checkbox.Value checked keyboardFocused />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>
      </snapshot.ProxyProps>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support themes', async () => {
    const component = (
      <snapshot.ProxyProps m="5px">
        <Checkbox theme="pink">
          <Checkbox.Value />
          <Checkbox.Text>Princess</Checkbox.Text>
        </Checkbox>
        <Checkbox theme="pink">
          <Checkbox.Value disabled />
          <Checkbox.Text>Princess</Checkbox.Text>
        </Checkbox>
        <Checkbox theme="pink">
          <Checkbox.Value keyboardFocused />
          <Checkbox.Text>Princess</Checkbox.Text>
        </Checkbox>
        <Checkbox theme="pink">
          <Checkbox.Value checked />
          <Checkbox.Text>Princess</Checkbox.Text>
        </Checkbox>
        <Checkbox theme="pink">
          <Checkbox.Value checked disabled />
          <Checkbox.Text>Princess</Checkbox.Text>
        </Checkbox>
        <Checkbox theme="pink">
          <Checkbox.Value checked keyboardFocused />
          <Checkbox.Text>Princess</Checkbox.Text>
        </Checkbox>
      </snapshot.ProxyProps>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('a11y', async () => {
    const { container } = render(
      <Checkbox>
        <Checkbox.Value />
        <Checkbox.Text>Checkbox</Checkbox.Text>
      </Checkbox>,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
