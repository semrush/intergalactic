import React from 'react';
import { snapshot } from '@semcore/testing-utils/snapshot';
import * as sharedTests from '@semcore/testing-utils/shared-tests';
import { expect, test, describe, beforeEach } from '@semcore/testing-utils/vitest';
import { render, cleanup } from '@semcore/testing-utils/testing-library';
import { axe } from '@semcore/testing-utils/axe';

import Notice, { NoticeSmart } from '../src';
const { shouldSupportClassName, shouldSupportRef } = sharedTests;

describe('Notice', () => {
  beforeEach(cleanup);

  shouldSupportClassName(Notice);
  shouldSupportRef(Notice);

  test.concurrent('Should support custom attributes', () => {
    const { getByTestId } = render(<Notice data-testid="notice" name="notice" />);
    expect(getByTestId('notice').attributes['name'].value).toBe('notice');
  });

  test.concurrent('Should support children', () => {
    const component = (
      <Notice>
        <p data-testid="child">Test</p>
      </Notice>
    );
    const { getByTestId } = render(component);
    expect(getByTestId('child')).toBeTruthy();
  });

  test.concurrent('Should support custom close icon', () => {
    const component = (
      <Notice>
        <Notice.CloseIcon data-testid="close">Close Icon</Notice.CloseIcon>
      </Notice>
    );
    const { getByTestId } = render(component);
    expect(getByTestId('close')).toBeTruthy();
  });

  test.concurrent('Should support theme', async ({ task }) => {
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

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support custom theme', async ({ task }) => {
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

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should correctly render', async ({ task }) => {
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
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });
});

describe('Notice.Label', () => {
  beforeEach(cleanup);

  test.concurrent('Should support theme', async ({ task }) => {
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

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });
});

describe('NoticeSmart', () => {
  beforeEach(cleanup);

  shouldSupportClassName(NoticeSmart);
  shouldSupportRef(NoticeSmart);

  test.concurrent('Should support theme props', async ({ task }) => {
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

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should correctly render', async ({ task }) => {
    const component = (
      <NoticeSmart
        label={<div style={{ width: '16px', height: '16px', background: 'orange' }} />}
        actions={<button>Wow, so cool!</button>}
        closable
      >
        Look at this cool notice!
      </NoticeSmart>
    );
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
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
