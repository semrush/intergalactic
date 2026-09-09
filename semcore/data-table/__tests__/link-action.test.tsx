import IconM from '@semcore/icon/Cards/m';
import { render, cleanup, fireEvent } from '@semcore/testing-utils/testing-library';
import { expect, describe, afterEach, test, vi } from '@semcore/testing-utils/vitest';
import React from 'react';

import { LinkAction } from '../src/components/LinkAction/LinkAction';

afterEach(cleanup);

const EXTERNAL_HREF = 'https://external.example.com/page';
const RELATIVE_HREF = '/internal/page';

const clickAction = (onClick = () => {}) => ({ title: 'Analyze this URL', icon: IconM, onClick });
const hrefAction = { title: 'Open in new tab', icon: IconM, href: '#target' };

/** The main link is the only anchor that wraps a `Link.Text` — action links never do. */
const getMainLink = (container: HTMLElement) =>
  [...container.querySelectorAll<HTMLAnchorElement>('a[data-ui-name="Link"]')].find((anchor) =>
    anchor.querySelector('[data-ui-name="Link.Text"]'),
  );

const getExternalIcons = (container: HTMLElement) =>
  container.querySelectorAll('[data-ui-name="Link.ExternalIcon"]');

describe('LinkAction', () => {
  test('Verify the link renders its text and href', () => {
    const { container } = render(
      <LinkAction link={{ href: EXTERNAL_HREF, text: 'external.example.com/page' }} actions={clickAction()} />,
    );

    const link = getMainLink(container);

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', EXTERNAL_HREF);
    expect(link?.querySelector('[data-ui-name="Link.Text"]')?.textContent).toBe('external.example.com/page');
  });

  test('Verify a divider separates the link from the actions', () => {
    const { container } = render(
      <LinkAction link={{ href: RELATIVE_HREF, text: 'internal page' }} actions={clickAction()} />,
    );

    const divider = container.querySelector('[data-ui-name="Divider"]');

    expect(divider).toBeInTheDocument();
    expect(divider).toHaveAttribute('aria-orientation', 'vertical');
  });

  describe('actions', () => {
    test('Verify a single onClick action renders an accessible button and fires the handler', () => {
      const onClick = vi.fn();
      const { container, getByRole } = render(
        <LinkAction link={{ href: RELATIVE_HREF, text: 'internal page' }} actions={clickAction(onClick)} />,
      );

      const button = getByRole('button', { name: 'Analyze this URL' });

      expect(container.querySelectorAll('button[data-ui-name="Button"]')).toHaveLength(1);

      fireEvent.click(button);

      expect(onClick).toHaveBeenCalledTimes(1);
    });

    test('Verify a single href action renders an accessible link and does not fire onClick', () => {
      const { container, getByRole } = render(
        <LinkAction link={{ href: RELATIVE_HREF, text: 'internal page' }} actions={hrefAction} />,
      );

      const actionLink = getByRole('link', { name: 'Open in new tab' });

      expect(actionLink).toHaveAttribute('href', '#target');
      expect(container.querySelectorAll('button[data-ui-name="Button"]')).toHaveLength(0);
    });

    test('Verify both actions are rendered when a tuple is passed', () => {
      const onClick = vi.fn();
      const { getByRole } = render(
        <LinkAction
          link={{ href: RELATIVE_HREF, text: 'internal page' }}
          actions={[hrefAction, clickAction(onClick)]}
        />,
      );

      expect(getByRole('link', { name: 'Open in new tab' })).toBeInTheDocument();
      expect(getByRole('button', { name: 'Analyze this URL' })).toBeInTheDocument();
    });
  });

  describe('ellipsisSettings', () => {
    test('Verify cropPosition reaches Link.Text', () => {
      const { container } = render(
        <LinkAction
          link={{ href: RELATIVE_HREF, text: 'a fairly long internal page label', ellipsisSettings: { cropPosition: 'middle' } }}
          actions={clickAction()}
        />,
      );

      const text = getMainLink(container)?.querySelector('[data-ui-name="Link.Text"]');

      expect(text?.className).toMatch(/trim_middle/);
    });

    /**
     * The root flows inline so an untruncated link can wrap with the surrounding text, and
     * becomes a flex container once Ellipsis has to measure a single line.
     */
    test('Verify the root switches from inline to flex when ellipsisSettings are passed', () => {
      const { container: flowing } = render(
        <LinkAction link={{ href: RELATIVE_HREF, text: 'internal page' }} actions={clickAction()} />,
      );

      expect(flowing.firstElementChild).toHaveStyle('display: inline');

      cleanup();

      const { container: truncating } = render(
        <LinkAction
          link={{ href: RELATIVE_HREF, text: 'internal page', ellipsisSettings: { cropPosition: 'middle' } }}
          actions={clickAction()}
        />,
      );

      expect(truncating.firstElementChild).toHaveStyle('display: flex');
    });
  });

  describe('external link detection', () => {
    test('Verify an external href gets the icon, target=_blank and a screen reader announcement', () => {
      const { container } = render(
        <LinkAction link={{ href: EXTERNAL_HREF, text: 'external.example.com/page' }} actions={clickAction()} />,
      );

      const link = getMainLink(container);

      expect(getExternalIcons(container)).toHaveLength(1);
      expect(link).toHaveAttribute('target', '_blank');
      expect(link?.getAttribute('aria-describedby')).toBeTruthy();
    });

    test('Verify a relative href gets no icon and no target', () => {
      const { container } = render(
        <LinkAction link={{ href: RELATIVE_HREF, text: 'internal page' }} actions={clickAction()} />,
      );

      expect(getExternalIcons(container)).toHaveLength(0);
      expect(getMainLink(container)?.getAttribute('target')).toBeNull();
    });

    test('Verify a same-origin absolute href gets no icon', () => {
      const { container } = render(
        <LinkAction
          link={{ href: `${window.location.origin}/internal/page`, text: 'internal page' }}
          actions={clickAction()}
        />,
      );

      expect(getExternalIcons(container)).toHaveLength(0);
    });

    test('Verify the external icon is never shown without target=_blank', () => {
      const { container } = render(
        <LinkAction
          link={{ href: RELATIVE_HREF, text: 'https://external.example.com' }}
          actions={clickAction()}
        />,
      );

      const hasIcon = getExternalIcons(container).length > 0;
      const opensInNewTab = getMainLink(container)?.getAttribute('target') === '_blank';

      expect(hasIcon).toBe(opensInNewTab);
    });

    test('Verify text starting with "http" does not suppress the external icon', () => {
      const { container } = render(
        <LinkAction link={{ href: EXTERNAL_HREF, text: 'httpie tutorial for beginners' }} actions={clickAction()} />,
      );

      expect(getMainLink(container)).toHaveAttribute('target', '_blank');
      expect(getExternalIcons(container)).toHaveLength(1);
    });
  });
});
