import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within, fn, expect, waitFor } from '@storybook/test';

import Badge from '@semcore/badge';
import CheckM from '@semcore/icon/Check/m';
import Button from '@semcore/button';
import { ButtonLink } from '@semcore/button';
import { Flex } from '@semcore/flex-box';
import CheckL from '@semcore/icon/Check/l';
import CloseM from '@semcore/icon/Close/m';
import Spin from '@semcore/spin';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const SimpleButton: Story = {
  args: {
    children: 'Button',
    onClick: fn(),
  },
};

export const Addons: Story = {
  render: () => {
    return (
      <>
        <Button addonLeft={CheckM} use={'secondary'}>
          Some button text
        </Button>
        <Button ml={2} use={'secondary'}>
          <Button.Text>Some button text</Button.Text>
          <Button.Addon>
            <Badge bg='--intergalactic-control-primary-success'>new</Badge>
          </Button.Addon>
        </Button>
      </>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    return (
      <>
        <Button size={'m'}>Medium</Button>
        <Button size={'l'} ml={2}>
          Large
        </Button>
      </>
    );
  },
};

export const IconOnlyButton: Story = {
  render: () => {
    return (
      <>
        <Button title='Confirm'>
          <Button.Addon>
            <CheckM />
          </Button.Addon>
        </Button>
      </>
    );
  },
};

export const ButtonLikeALink: Story = {
  render: () => {
    return (
      <>
        <Flex direction={'column'} gap={6} alignItems={'flex-start'}>
          <ButtonLink addonLeft={CheckM}>Primary ButtonLink</ButtonLink>
          <ButtonLink addonLeft={CheckM} color={'text-primary'}>
            Colored primary ButtonLink
          </ButtonLink>
          <ButtonLink addonRight={CloseM} color={'text-critical'}>
            Colored primary ButtonLink
          </ButtonLink>
          <ButtonLink use={'secondary'}>
            <ButtonLink.Addon>
              <CheckM />
            </ButtonLink.Addon>
            <ButtonLink.Text>Secondary ButtonLink</ButtonLink.Text>
          </ButtonLink>

          <ButtonLink addonLeft={CheckM} aria-label={'Icon-only button'} />

          <ButtonLink addonLeft={CheckL} size={500}>
            ButtonLink with other text size
          </ButtonLink>
        </Flex>
      </>
    );
  },
};

export const ButtonWithNoVisibleText: Story = {
  render: () => {
    return (
      <>
        <Button addonLeft={CheckM} aria-label='Confirm action' mr={2} />
        <Button addonLeft={CloseM} aria-label='Close notification' />
      </>
    );
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const button = canvas.getByRole('button', { name: 'Confirm action' });
    await userEvent.hover(button);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const hint = within(document.body).queryByText('Confirm action');
    if (!hint) throw new Error('Hint not found');
    expect(hint).toBeVisible();
    const hintStyles = window.getComputedStyle(hint);
    expect(hintStyles.padding).toBe('12px');
    expect(hintStyles.fontSize).toBe('14px');
    expect(hint.textContent).not.toBeNull();
    expect(hintStyles.color).toBe('rgb(25, 27, 35)');
    expect(hintStyles.backgroundColor).toBe('rgb(255, 255, 255)');

    await userEvent.unhover(button);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    expect(hint).not.toBeVisible();
  },
};

export const ButtonWithLoadingState: Story = {
  render: () => {
    return (
      <>
        <Button loading>Loading</Button>{' '}
        <Button disabled>
          <Button.Addon>
            <Spin size='xs' />
          </Button.Addon>
          <Button.Text>Loading</Button.Text>
        </Button>
      </>
    );
  },
};
