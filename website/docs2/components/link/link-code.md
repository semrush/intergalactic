---
title: Example
tabs: Design('link'), A11y('link-a11y'), API('link-api'), Example('link-code'), Changelog('link-changelog')
---

## Link inside the content

By default, links are displayed as `inline-block` and don’t wrap properly within the text. To achieve proper wrapping and underlining of links, set `noWrap=false` and `inline=true`.

::: sandbox

<script lang="tsx">
import React from 'react';
import FormatText from '@semcore/ui/format-text';
import Link from '@semcore/ui/link';
import EditM from '@semcore/ui/icon/Edit/m';

class Demo extends React.PureComponent {
  render() {
    return (
      <FormatText>
        <p>
          Lorem ipsum dolor sit amet, adipisicing elit. Ab aperiam aut autem beatae, consequuntur
          debitis doloremque facilis fuga illum inventore ipsa iure magni maxime molestias omnis
          reprehenderit, voluptas voluptatem voluptates{' '}
          <Link href='#' inline noWrap={false}>
            <Link.Addon>
              <EditM />
            </Link.Addon>
            <Link.Text>consectetur corporis cupiditate</Link.Text>
          </Link>
          .
        </p>
        <p>
          Atque beatae commodi culpa dicta nam odit rerum{' '}
          <Link href='#' inline noWrap={false}>
            suscipit temporibus! Accusamus accusantium assumenda beatae dignissimos eius id nam{' '}
          </Link>{' '}
          quae repellendus temporibus voluptatibus. Ad cum error excepturi, ipsum necessitatibus
          officiis temporibus.
        </p>
        <p>
          Commodi consequuntur dolorum id maiores maxime, natus nesciunt nihil odit sapiente sequi!
          Blanditiis dicta ea, eum excepturi explicabo hic id, incidunt ipsum itaque molestias neque
          officia placeat rerum sint, veritatis.
        </p>
        <p>
          Distinctio doloremque eaque eos fugiat incidunt iure magni officia praesentium quidem{' '}
          <Link href='#' inline noWrap={false}>
            repudiandae tempora, voluptate, voluptatem voluptatibus!
          </Link>{' '}
          Enim exercitationem id labore sunt totam velit. Ab animi provident quo quos tenetur
          voluptatem.
        </p>
      </FormatText>
    );
  }
}


</script>

:::

## Link addon

You can add addons to link either by specifying the desired tag in the `addonLeft`/`addonRight` property or by rendering the `Link.Addon`/`Link.Text` in the component body. Both methods achieve the same result.

::: sandbox

<script lang="tsx">
import React from 'react';
import Link from '@semcore/ui/link';
import CheckM from '@semcore/ui/icon/Check/m';
import ChevronRightM from '@semcore/ui/icon/ChevronRight/m';

const Demo = () => {
  return (
    <>
      <Link ml={4} href='#' size={300}>
        <Link.Addon>
          <CheckM />
        </Link.Addon>
        <Link.Text>Link</Link.Text>
        <Link.Addon>
          <ChevronRightM />
        </Link.Addon>
      </Link>
    </>
  );
}
</script>

:::

## Color links

Links can be colored for specific purposes. You can apply a specific color to links by passing the `color` property to them.

::: sandbox

<script lang="tsx">
import React from 'react';
import Link from '@semcore/ui/link';

class Demo extends React.PureComponent {
  render() {
    return (
      <div>
        <Link color='red-500' href='#' size={300}>
          Warning link
        </Link>
        <br />
        <br />
        <Link color='green-500' href='#' size={300}>
          Success link
        </Link>
      </div>
    );
  }
}


</script>

:::

## Links with ellipsis

There are two moments you need to consider when using link with addons and ellipsis:

- To properly display a link with ellipsis inside a flex block, you need to use a hack with `min-width: 0px`.
- When the text has an `overflow:hidden` property, it may overlap with a vertical addon. To avoid this, wrap the content in a flex container with vertical alignment.

::: sandbox

<script lang="tsx">
import React from 'react';
import { Flex } from '@semcore/ui/flex-box';
import { Text } from '@semcore/ui/typography';
import Divider from '@semcore/ui/divider';
import Link from '@semcore/ui/link';
import EditM from '@semcore/ui/icon/Edit/m';

class Demo extends React.PureComponent {
  render() {
    return (
      <Flex>
        <Text flex='0 0 auto'>Sep 3</Text>
        <Divider mx={4} orientation='vertical' />
        <Link w='100%' wMin={0} href='#'>
          <Flex alignItems='center'>
            <Link.Text w='100%' inline noWrap>
              <Text w='100%' inline noWrap>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque iusto, sed!
                Asperiores, consectetur deserunt et ipsam omnis quae repellendus velit veniam.
                Asperiores dicta dolor ducimus enim fugit laborum minima reprehenderit?
              </Text>
            </Link.Text>
            <Link.Addon>
              <EditM />
            </Link.Addon>
          </Flex>
        </Link>
      </Flex>
    );
  }
}


</script>

:::

## Accessibility

If a link has no visible text, it is important to add an aria-label attribute with a description of the link for accessibility purposes.

::: sandbox

<script lang="tsx">
import React from 'react';
import Link from '@semcore/ui/link';
import HomeM from '@semcore/ui/icon/Home/m';
import ArrowRightM from '@semcore/ui/icon/ArrowRight/m';

const Demo = () => {
  return (
    <>
      <Link addonLeft={HomeM} aria-label='home page' href='#' />
      <Link ml={2} aria-label='go to the next page' href='#'>
        <Link.Addon>
          <ArrowRightM />
        </Link.Addon>
      </Link>
    </>
  );
}
</script>

:::
