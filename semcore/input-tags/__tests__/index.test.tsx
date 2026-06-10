import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { render, userEvent, cleanup, fireEvent } from '@semcore/testing-utils/testing-library';
import { expect, test, describe, beforeEach, vi } from '@semcore/testing-utils/vitest';
import * as React from 'react';

import InputTags from '../src';

describe('input-tags Dependency imports', () => {
  runDependencyCheckTests('input-tags');
});

describe('InputTags', () => {
  beforeEach(cleanup);

  test('Verify calls onClick', async () => {
    const onClick = vi.fn();
    const { getByTestId } = render(
      <InputTags>
        <InputTags.Tag theme='primary' editable data-testid='tag' onClick={onClick}>
          <InputTags.Tag.Text>tag</InputTags.Tag.Text>
          <InputTags.Tag.Close />
        </InputTags.Tag>
        <InputTags.Value aria-label='input with tags' value='' />
      </InputTags>,
    );

    fireEvent.keyDown(getByTestId('tag'), { key: 'Enter' });
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('Verify tags add on paste', async () => {
    const onAppend = vi.fn();

    const { getByRole } = render(
      <InputTags onAppend={onAppend}>
        <InputTags.Value aria-label='input with tags' value='' />
      </InputTags>,
    );

    const input = getByRole('textbox');

    fireEvent.paste(input, {
      clipboardData: {
        getData: () => 'foo,bar',
      },
    } as any);

    expect(onAppend).toHaveBeenCalledWith(['foo', 'bar'], expect.anything());
  });

  test('Verify onAppend calls on Enter ', async () => {
    const onAdd = vi.fn();
    const onAppend = vi.fn();

    const { getByRole } = render(
      <InputTags onAppend={onAppend}>
        <InputTags.Value aria-label='input with tags' />
      </InputTags>,
    );

    const input = getByRole('textbox');

    await userEvent.type(input, 'foo');
    await userEvent.keyboard('{Enter}');

    expect(onAppend).toHaveBeenCalledWith(['foo'], expect.anything());
    expect(onAppend).toHaveBeenCalledTimes(1);
  });

  test('Verify onRemove calls when tag is removed by Backspace', async () => {
    const onRemove = vi.fn();

    const { getByRole } = render(
      <InputTags defaultValue={['foo']} onRemove={onRemove}>
        <InputTags.Value aria-label='input with tags' />
      </InputTags>,
    );

    const input = getByRole('textbox');

    await userEvent.click(input);
    await userEvent.keyboard('{Backspace}');

    expect(onRemove).toHaveBeenCalledTimes(1);
    expect(onRemove.mock.calls[0][0]).toEqual(expect.objectContaining({ type: 'keydown', key: 'Backspace' }));
  });
});
