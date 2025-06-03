import React from 'react';
import { List } from '@semcore/typography';
import Link from '@semcore/link';
import LinkExternalM from '@semcore/icon/LinkExternal/m';

const Demo = () => {
  return (
    <div>
        <p>
          The Intergalactic Design System is so cutting-edge that even black holes are jealous of
          its sleek interface,{' '}
          <Link href='https://developer.semrush.com/intergalactic/components/link/link-api' inline noWrap={false} enableVisited>
            <Link.Text>look at them</Link.Text>
            <Link.Addon>
              <LinkExternalM />
            </Link.Addon>
          </Link>
          .
        </p>
        <p>
          Aliens from distant galaxies use it to{' '}
          <Link href='#' inline noWrap={false} active={true}>
            create otherworldly websites{' '} active with addon
            <Link.Addon>
              <LinkExternalM />
            </Link.Addon>
          </Link> 
          </p>
          <p>
          Aliens from distant galaxies use it to{' '}
          <Link href='#' inline noWrap={false} active={true}>
            create otherworldly websites{' '} active without addon
          </Link>{' '}
          that are so user-friendly, even a space-faring cat with paws can navigate them.
        </p>
        <p>Look at these:</p>
      <List size={300}>
        <List.Item>
          <Link href='#' noWrap={false} disabled>
            Alien fashionistas on Mars are rocking sleek spacesuits with astonishing components.
            <Link.Addon>
              <LinkExternalM />
            </Link.Addon>
          </Link>
        </List.Item>
        <List.Item>
          <Link href='#' noWrap={false}>
            Rumor has it that our design system's official font is so futuristic that it writes its
            own code while you're reading it.
          </Link>
        </List.Item>
      </List>
    </div>
  );
};

export default Demo;
