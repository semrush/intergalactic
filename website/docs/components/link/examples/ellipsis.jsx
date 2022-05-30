import React from 'react';
import { Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';
import Divider from '@semcore/divider';
import Link from '@semcore/link';
import EditXS from '@semcore/icon/Edit/m';

class Demo extends React.PureComponent {
  render() {
    return (
      <Flex>
        <Text flex="0 0 auto">Sep 3</Text>
        <Divider mx={4} orientation="vertical" />
        <Link w="100%" wMin={0}>
          <Flex alignItems="center">
            <Link.Text w="100%" inline noWrap>
              <Text w="100%" inline noWrap>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque iusto, sed!
                Asperiores, consectetur deserunt et ipsam omnis quae repellendus velit veniam.
                Asperiores dicta dolor ducimus enim fugit laborum minima reprehenderit?
              </Text>
            </Link.Text>
            <Link.Addon>
              <EditXS />
            </Link.Addon>
          </Flex>
        </Link>
      </Flex>
    );
  }
}

export default Demo;
