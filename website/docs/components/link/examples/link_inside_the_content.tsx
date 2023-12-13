import React from 'react';
import FormatText from '@semcore/ui/format-text';
import { List } from '@semcore/ui/typography';
import Link from '@semcore/ui/link';
import EditM from '@semcore/ui/icon/Edit/m';

class Demo extends React.PureComponent {
  render() {
    return (
      <div>
        <FormatText size={'s'}>
          <p>
            The Intergalactic Design System is so cutting-edge that even black holes are jealous of
            its sleek interface,{' '}
            <Link href='#' inline noWrap={false}>
              <Link.Addon>
                <EditM />
              </Link.Addon>
              <Link.Text>look at them</Link.Text>
            </Link>
            !
          </p>
          <p>
            Aliens from distant galaxies use it to{' '}
            <Link href='#' inline noWrap={false}>
              create otherworldly websites{' '}
            </Link>{' '}
            that are so user-friendly, even a space-faring cat with paws can navigate them.
          </p>
          <p>Look at these:</p>
        </FormatText>
        <List size={300}>
          <List.Item>
            <Link href='#' noWrap={false}>
              Alien fashionistas on Mars are rocking sleek spacesuits with astonishing components.
            </Link>
          </List.Item>
          <List.Item>
            <Link href='#' noWrap={false}>
              Rumor has it that our design system's official font is so futuristic that it writes
              its own code while you're reading it.
            </Link>
          </List.Item>
        </List>
      </div>
    );
  }
}

export default Demo;
