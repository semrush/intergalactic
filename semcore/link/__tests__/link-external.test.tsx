// @vitest-environment jsdom
import { extractUIName } from '@semcore/testing-utils/shared/extractUINameTree';
import { cleanup, render } from '@semcore/testing-utils/testing-library';
import { expect, test, describe, beforeEach } from '@semcore/testing-utils/vitest';
import React from 'react';

import Link from '../src';

/**
 * Decision table for Link's external-link auto-detection, plus the DOM and composition
 * the external branch produces.
 *
 * link.browser-test.tsx covers the three cases that need a real browser — an external
 * href, `isExternal={false}` overriding one, and detection from string children — using
 * `loadPageWithOrigin`. Everything here is deliberately NOT repeated there: the remaining
 * rows are pure branch coverage of isExternalLink(), which is cheap in jsdom and would
 * cost a page load per case per engine in Playwright.
 *
 * Note isExternalLink() resolves the href against `window.location.origin` and treats an
 * "Invalid base URL" throw as external, so a couple of hrefs classify differently where
 * the origin is unavailable (about:blank, sandboxed iframes). Rows below record the jsdom
 * answer and flag where that diverges.
 */

/** Derived at runtime so the suite does not depend on the jsdom origin staying fixed. */
const SAME_HOST_URL = `${window.location.origin}/internal-page`;
const EXTERNAL_URL = 'https://other.example.com/page';

const getLink = (container: HTMLElement) =>
  container.querySelector('[data-ui-name="Link"]') as HTMLAnchorElement;

/** Whether auto-injected or written by hand, the icon renders as Link.ExternalIcon. */
const getExternalIcons = (container: HTMLElement) =>
  container.querySelectorAll('[data-ui-name="Link.ExternalIcon"]');

type Case = {
  desc: string;
  props: Record<string, unknown>;
  children?: React.ReactNode;
  external: boolean;
};

const cases: Case[] = [
  { desc: 'isExternal=true wins over a relative href', props: { isExternal: true, href: '/local' }, children: 'Text', external: true },
  { desc: 'isExternal=true with no href', props: { isExternal: true }, children: 'Text', external: true },
  { desc: 'plain http href on another host', props: { href: 'http://other.example.com' }, children: 'Text', external: true },
  { desc: 'absolute href on the same host', props: { href: SAME_HOST_URL }, children: 'Text', external: false },
  { desc: 'relative href', props: { href: '/relative' }, children: 'Text', external: false },
  // A hrefless anchor navigates nowhere, so there is nothing to open in a new tab — the
  // children branch only decides externality once an href exists.
  { desc: 'string children holding a URL are not external without an href', props: {}, children: EXTERNAL_URL, external: false },
  { desc: 'string children holding a same-host URL lose to nothing', props: { href: '/local' }, children: SAME_HOST_URL, external: false },
  { desc: 'element children fall back to href', props: { href: EXTERNAL_URL }, children: <Link.Text>Text</Link.Text>, external: true },

  // Scheme edge cases that isUrl() is meant to handle.
  { desc: 'protocol-relative //host href', props: { href: '//other.example.com' }, children: 'Text', external: true },
  { desc: 'uppercase HTTPS:// href', props: { href: 'HTTPS://other.example.com' }, children: 'Text', external: true },
  { desc: 'mailto: href is not external', props: { href: 'mailto:a@b.com' }, children: 'a@b.com', external: false },
  // isUrl() is a prefix check, so this relative href counts as a URL. With an origin
  // available it resolves against it and lands on the same host; without one `new URL`
  // throws and isExternalLink() treats the throw as external. Same href, opposite answer.
  { desc: 'relative href starting with the letters "http"', props: { href: 'http-docs/page' }, children: 'Text', external: false },
];

describe('Link external detection', () => {
  beforeEach(cleanup);

  cases.forEach(({ desc, props, children, external }) => {
    test(`Verify ${desc}`, () => {
      const { container } = render(<Link {...props}>{children}</Link>);
      const link = getLink(container);

      if (external) {
        expect(link.getAttribute('target')).toBe('_blank');
      } else {
        expect(link.getAttribute('target')).toBe(null);
      }
    });
  });

  test('Verify external link with no children renders no icon', () => {
    const { container } = render(<Link href={EXTERNAL_URL} aria-label='External' />);

    expect(getLink(container).getAttribute('target')).toBe('_blank');
    expect(getExternalIcons(container)).toHaveLength(0);
  });

  test('Verify the external icon is injected only for an external href', () => {
    const { container: external } = render(<Link href={EXTERNAL_URL}>Text</Link>);
    const { container: internal } = render(<Link href='/relative'>Text</Link>);

    expect(getExternalIcons(external)).toHaveLength(1);
    expect(getExternalIcons(internal)).toHaveLength(0);
  });

  test('Verify string children that are themselves a URL get no icon', () => {
    const { container } = render(<Link href='/relative'>{EXTERNAL_URL}</Link>);

    expect(getExternalIcons(container)).toHaveLength(0);
  });

  test('Verify element children get no icon on their own', () => {
    const { container } = render(
      <Link href={EXTERNAL_URL}>
        <Link.Text>Text</Link.Text>
      </Link>,
    );

    expect(getLink(container).getAttribute('target')).toBe('_blank');
    expect(getExternalIcons(container)).toHaveLength(0);
  });

  test('Verify Link.ExternalIcon renders where the consumer puts it', () => {
    const { container } = render(
      <Link href={EXTERNAL_URL}>
        <Link.Text>Text</Link.Text>
        <Link.ExternalIcon />
      </Link>,
    );

    const inner = container.querySelector('[data-ui-name="Link.InnerWrapper"]')!;
    const order = Array.from(inner.children).map((el) => el.getAttribute('data-ui-name'));

    expect(getExternalIcons(container)).toHaveLength(1);
    expect(order.indexOf('Link.ExternalIcon')).toBeGreaterThan(order.indexOf('Link.Text'));
  });

  test('Verify Link.ExternalIcon takes its size from the parent Link', () => {
    const { container } = render(
      <Link href={EXTERNAL_URL} size={800}>
        <Link.Text>Text</Link.Text>
        <Link.ExternalIcon />
      </Link>,
    );

    expect(getExternalIcons(container)[0].getAttribute('width')).toBe('29');
  });
});

describe('Link external DOM attributes', () => {
  beforeEach(cleanup);

  test('Verify internal link carries no rel', () => {
    const { container } = render(<Link href='/relative'>Text</Link>);

    expect(getLink(container).getAttribute('rel')).toBe(null);
  });

  test('Verify external link is announced as opening in a new tab', () => {
    const { container } = render(<Link href={EXTERNAL_URL}>Text</Link>);
    const describedBy = getLink(container).getAttribute('aria-describedby');

    expect(describedBy).toBeTruthy();
    expect(container.querySelector(`#${describedBy}`)?.textContent).toBe('Opens in a new tab');
  });

  test('Verify internal link has no new-tab announcement', () => {
    const { container } = render(<Link href='/relative'>Text</Link>);

    expect(getLink(container).getAttribute('aria-describedby')).toBe(null);
    expect(container.textContent).not.toContain('Opens in a new tab');
  });
});

describe('Link external children composition', () => {
  beforeEach(cleanup);

  /*
    External mode runs the same addonTextChildren() call as internal mode and appends the
    icon as a sibling. The snapshots cover both shapes the docs advertise plus Link.Addon
    children, which used to end up inside Link.Text. Prop addons render outside the branch
    entirely and never regressed, so they are left to the decision table above.
  */

  test('Verify neither documented external-link shape double-wraps Link.Text', () => {
    // The two shapes from docs/examples/external_links.tsx: a bare string child, where the
    // icon is injected automatically, and Link.Text plus an explicit Link.ExternalIcon.
    // The second is what stories and DataTable's LinkAction use, and it is the one that
    // used to get double-wrapped — doubling text-decoration and breaking the ellipsis
    // container.
    const { container: autoIcon } = render(
      <Link use='primary' href={EXTERNAL_URL}>Primary external link</Link>,
    );
    const { container: manualIcon } = render(
      <Link use='secondary' href={EXTERNAL_URL}>
        <Link.Text>Secondary external link</Link.Text>
        <Link.ExternalIcon />
      </Link>,
    );

    expect(extractUIName(getLink(autoIcon))).toMatchSnapshot('string child, icon injected');
    expect(extractUIName(getLink(manualIcon))).toMatchSnapshot('Link.Text with explicit Link.ExternalIcon');

    for (const container of [autoIcon, manualIcon]) {
      expect(container.querySelectorAll('[data-ui-name="Link.Text"] [data-ui-name="Link.Text"]'))
        .toHaveLength(0);
      expect(getExternalIcons(container)).toHaveLength(1);
    }
  });

  test('Verify Link.Addon children stay siblings of Link.Text in external mode', () => {
    const { container } = render(
      <Link href={EXTERNAL_URL}>
        <Link.Addon>L</Link.Addon>
        Text
        <Link.Addon>R</Link.Addon>
      </Link>,
    );

    expect(extractUIName(getLink(container))).toMatchSnapshot();
    expect(container.querySelectorAll('[data-ui-name="Link.Text"] [data-ui-name="Link.Addon"]'))
      .toHaveLength(0);
  });
});
