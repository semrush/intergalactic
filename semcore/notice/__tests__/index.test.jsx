import React from 'react';
import { testing, snapshot, shared as testsShared } from '@semcore/jest-preset-ui';
const { render, cleanup, axe } = testing;
import Notice, { NoticeSmart } from '../src';
const { shouldSupportClassName, shouldSupportRef } = testsShared;

describe('Notice', () => {
  afterEach(cleanup);

  shouldSupportClassName(Notice);
  shouldSupportRef(Notice);

  test('Should support custom attributes', () => {
    const { getByTestId } = render(<Notice data-testid="notice" name="notice" />);
    expect(getByTestId('notice').attributes['name'].value).toBe('notice');
  });

  test('Should support children', () => {
    const component = (
      <Notice>
        <p data-testid="child">Test</p>
      </Notice>
    );
    const { getByTestId } = render(component);
    expect(getByTestId('child')).toBeTruthy();
  });

  test('Should support custom close icon', () => {
    const component = (
      <Notice>
        <Notice.CloseIcon data-testid="close">Close Icon</Notice.CloseIcon>
      </Notice>
    );
    const { getByTestId } = render(component);
    expect(getByTestId('close')).toBeTruthy();
  });

  test('Should support theme', async () => {
    const component = (
      <>
        <Notice>Text Notice</Notice>
        <br />
        <Notice theme="success">Text Notice</Notice>
        <br />
        <Notice theme="danger">Text Notice</Notice>
        <br />
        <Notice theme="warning">Text Notice</Notice>
      </>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support custom theme', async () => {
    const component = (
      <>
        <Notice theme="#feebc5">
          <Notice.Label>Lab</Notice.Label>
          <Notice.Content>
            Text Notice
            <Notice.Actions>
              <button>Wow, so cool!</button>
            </Notice.Actions>
          </Notice.Content>
          <Notice.CloseIcon />
        </Notice>
      </>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should correctly render', async () => {
    const component = (
      <Notice>
        <Notice.Label>
          <div style={{ width: '16px', height: '16px', background: 'orange' }} />
        </Notice.Label>
        <Notice.Content>
          Look at this cool notice!
          <Notice.Actions>
            <button>Wow, so cool!</button>
          </Notice.Actions>
        </Notice.Content>
        <Notice.CloseIcon />
      </Notice>
    );
    expect(await snapshot(component)).toMatchImageSnapshot();
  });
});

describe('Notice.Label', () => {
  afterEach(cleanup);

  test('Should support theme', async () => {
    const component = (
      <>
        <Notice>
          <Notice.Label>Lab</Notice.Label>
        </Notice>
        <br />
        <Notice theme="success">
          <Notice.Label>Lab</Notice.Label>
        </Notice>
        <br />
        <Notice theme="danger">
          <Notice.Label>Lab</Notice.Label>
        </Notice>
        <br />
        <Notice theme="warning">
          <Notice.Label>Lab</Notice.Label>
        </Notice>
      </>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });
});

describe('NoticeSmart', () => {
  afterEach(cleanup);

  shouldSupportClassName(NoticeSmart);
  shouldSupportRef(NoticeSmart);

  test('Should support theme props', async () => {
    const component = (
      <>
        <NoticeSmart>Text NoticeSmart</NoticeSmart>
        <br />
        <NoticeSmart theme="success">Text NoticeSmart</NoticeSmart>
        <br />
        <NoticeSmart theme="danger">Text NoticeSmart</NoticeSmart>
        <br />
        <NoticeSmart theme="warning">Text NoticeSmart</NoticeSmart>
      </>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should correctly render', async () => {
    const component = (
      <NoticeSmart
        label={<div style={{ width: '16px', height: '16px', background: 'orange' }} />}
        actions={<button>Wow, so cool!</button>}
        closable
      >
        Look at this cool notice!
      </NoticeSmart>
    );
    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('a11y', async () => {
    const { container } = render(
      <NoticeSmart label="label" actions="actions" closable>
        Text NoticeSmart
      </NoticeSmart>,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
