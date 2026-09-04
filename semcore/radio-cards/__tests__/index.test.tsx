import { extractUIName } from '@semcore/testing-utils/shared/extractUINameTree.ts';
import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { render, cleanup, userEvent } from '@semcore/testing-utils/testing-library';
import { expect, test, describe, beforeEach, vi } from '@semcore/testing-utils/vitest';
import React from 'react';

import RadioCards from '../src';

describe('pills Dependency imports', () => {
  runDependencyCheckTests('radio-cards');
});

describe('RadioCards', () => {
  beforeEach(cleanup);

  test('Verify data-ui-name', () => {
    const radioCards = (
      <RadioCards aria-label='Radio cards' value='1'>
        <RadioCards.Item value='1' text='1' />
        <RadioCards.Item value='2' text='2' />
      </RadioCards>
    );

    const { container } = render(radioCards);
    const result = extractUIName(container);

    expect(result).toMatchSnapshot();
  });

  test('calls onChange with selected value', async () => {
    const onChange = vi.fn();

    const { getByRole } = render(
      <RadioCards aria-label='Radio cards' value='' onChange={onChange}>
        <RadioCards.Item value='1'>1</RadioCards.Item>
        <RadioCards.Item value='2'>2</RadioCards.Item>
        <RadioCards.Item value='4'>4</RadioCards.Item>
      </RadioCards>,
    );

    await userEvent.click(getByRole('radio', { name: '4' }));

    expect(onChange).toHaveBeenCalledWith(
      '4',
      expect.any(Object),
    );
  });

  test('clicks aren\'t propagated on disabled tab', async () => {
    const spy = vi.fn();

    const { getByRole } = render(
      <RadioCards aria-label='Radio cards' value='' onChange={spy}>
        <RadioCards.Item value='1'>1</RadioCards.Item>
        <RadioCards.Item value='2'>2</RadioCards.Item>
        <RadioCards.Item value='3'>3</RadioCards.Item>
        <RadioCards.Item value='4' disabled>4</RadioCards.Item>
      </RadioCards>,
    );

    await expect(userEvent.click(getByRole('radio', { name: '4' }))).rejects.toThrow('pointer-events: none');
    expect(spy).not.toHaveBeenCalled();
  });

  test('does not call onChange when group is disabled', async () => {
    const spy = vi.fn();

    const { getByRole } = render(
      <RadioCards
        aria-label='Radio cards'
        value=''
        disabled
        onChange={spy}
      >
        <RadioCards.Item value='1'>1</RadioCards.Item>
        <RadioCards.Item value='2'>2</RadioCards.Item>
      </RadioCards>,
    );

    await expect(userEvent.click(getByRole('radio', { name: '2' }))).rejects.toThrow('pointer-events: none');
    expect(spy).not.toHaveBeenCalled();
  });

  test('renders a skeleton instead of the text addon when loading', () => {
    const { container, queryByText } = render(
      <RadioCards aria-label='Radio cards' value='1'>
        <RadioCards.Item value='1' text='All' textAddon='300' loading />
        <RadioCards.Item value='2' text='Best' textAddon='100' />
      </RadioCards>,
    );

    const cards = container.querySelectorAll('label');

    expect(cards[0].querySelectorAll('[data-ui-name="SkeletonSVG"]')).toHaveLength(1);
    expect(queryByText('300')).toBeNull();

    /* Only the loading card is affected, its neighbour keeps the text addon. */
    expect(cards[1].querySelectorAll('[data-ui-name="SkeletonSVG"]')).toHaveLength(0);
    expect(queryByText('100')).not.toBeNull();
  });

  test('supports keyboard navigation with ArrowRight', async () => {
    const spy = vi.fn();

    const { getByRole } = render(
      <RadioCards aria-label='Radio cards' value='1' onChange={spy}>
        <RadioCards.Item value='1'>1</RadioCards.Item>
        <RadioCards.Item value='2'>2</RadioCards.Item>
        <RadioCards.Item value='3'>3</RadioCards.Item>
      </RadioCards>,
    );

    const firstRadio = getByRole('radio', { name: '1' });

    firstRadio.focus();
    expect(firstRadio).toHaveFocus();

    await userEvent.keyboard('{ArrowRight}');

    expect(spy).toHaveBeenCalledWith(
      '2',
      expect.any(Object),
    );
  });
});
