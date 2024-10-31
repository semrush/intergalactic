import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import Badge from '@semcore/badge';
import CheckM from '@semcore/icon/Check/m';
import Breadcrumbs from '@semcore/breadcrumbs';
import Ellipsis from '@semcore/ellipsis';
import Link from '@semcore/link';

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Breadcrumbs>;

// export const SimpleButton: Story = {
//   args: {
//     children: 'Breadcrumbs',
//     size: 'm',
//     onClick: fn(),
//     use: 'primary',
//   },
// };

export const BreadcrumbsItemTruncation: Story = {
  render: () => {
    return (
      <>
        <Breadcrumbs>
          <Ellipsis>
            <Ellipsis.Content tag={Breadcrumbs.Item} active={false} href='#' role={'link'}>
              Ellipsis
            </Ellipsis.Content>
            <Ellipsis.Popper />
          </Ellipsis>
          <Ellipsis>
            <Ellipsis.Content tag={Breadcrumbs.Item} active={false} href='#' role={'link'}>
              This title is longer than a giraffe's neck, I bet it's been doing neck workouts!
            </Ellipsis.Content>
            <Ellipsis.Popper />
          </Ellipsis>
          <Breadcrumbs.Item active>Current page</Breadcrumbs.Item>
        </Breadcrumbs>
      </>
    );
  },
};

export const RedefiningATag: Story = {
  render: () => {
    return (
      <>
        <Breadcrumbs>
          <Breadcrumbs.Item href='/'>Projects</Breadcrumbs.Item>
          <Breadcrumbs.Item href='/components/breadcrumbs'>somedomain.com</Breadcrumbs.Item>
          <Breadcrumbs.Item tag={Link} active href={'#'}>
            Current page
          </Breadcrumbs.Item>
        </Breadcrumbs>
      </>
    );
  },
};
