import CheckM from '@semcore/ui/icon/Check/m';
import LinkExternalM from '@semcore/ui/icon/LinkExternal/m';
import Link from '@semcore/ui/link';
import { List, Text } from '@semcore/ui/typography';
import React from 'react';

const Demo = () => {
  return (
    <div>
      <p>
        The Intergalactic Design System is so cutting-edge that even black holes are jealous of
        its sleek interface,
        {' '}
        <Link href='https://developer.semrush.com/intergalactic/components/link/link-api' noWrap={false} enableVisited>
          <Link.Text>look at them</Link.Text>
          <Link.Addon>
            <LinkExternalM />
          </Link.Addon>
        </Link>
        .
      </p>
      <p>
        Aliens from distant galaxies use it to
        {' '}
        <Link href='#' noWrap={false} active={true}>
          create otherworldly websites
          {' '}
          {' '}
          active with addon
          <Link.Addon>
            <LinkExternalM />
          </Link.Addon>
        </Link>
      </p>
      <p>
        Aliens from distant galaxies use it to
        {' '}
        <Link href='#' noWrap={false} active={true}>
          create otherworldly websites
          {' '}
          {' '}
          active without addon
        </Link>
        {' '}
        {' '}
        that are so user-friendly, even a space-faring cat with paws can navigate them.
      </p>
      <p>Look at these:</p>
      <List size={300}>
        <List.Item w={200}>
          <Link href='#' disabled w={100}>
            Disabled Alien fashionistas on Mars are rocking sleek spacesuits with astonishing components.
            <Link.Addon>
              <LinkExternalM />
            </Link.Addon>
          </Link>
        </List.Item>
        <List.Item w={200}>
          This is some text with a
          {' '}
          {' '}
          <Link href='#' inline={true} w={100} data-testid='Inline-true'>
            Inline = true Alien fashionistas on Mars are rocking sleek spacesuits with astonishing components.
            <Link.Addon>
              <LinkExternalM />
            </Link.Addon>
          </Link>
        </List.Item>
        <List.Item>
          This is some text with a
          {' '}
          {' '}
          <Link href='#' inline={false} w={100} data-testid='Inline-false'>
            Inline = false Alien fashionistas on Mars are rocking sleek spacesuits with astonishing components.
            <Link.Addon>
              <LinkExternalM />
            </Link.Addon>
          </Link>
        </List.Item>
        <List.Item w={200}>
          This is some text with a
          {' '}
          {' '}
          <Link href='#' noWrap={false}>
            noWrap=false Rumor has it that our design system's official font is so futuristic that it writes its
            own code while you're reading it.
          </Link>
        </List.Item>
        <List.Item w={200}>
          <Link href='#' noWrap={true}>
            noWrap=true Rumor has it that our design system's official font is so futuristic that it writes its
            own code while you're reading it.
          </Link>
        </List.Item>
      </List>

      <Text>
        This is some text with a
        {' '}
        <Link addonLeft={CheckM}>
          Link and addon Left
        </Link>
        {' '}
        and
        {' '}
        <Link addonRight={CheckM}>
          Link and addon Right
        </Link>
        {' '}
        and
        {' '}
        <Link>
          Link without addon
        </Link>
        {' '}
        to check that everything is on the baseline
      </Text>
    </div>
  );
};

export default Demo;
