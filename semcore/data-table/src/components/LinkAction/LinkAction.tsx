import type { NSEllipsis } from '@semcore/base-components';
import Button from '@semcore/button';
import Divider from '@semcore/divider';
import type Icon from '@semcore/icon';
import Link from '@semcore/link';
import React from 'react';

interface ILink {
  href: string;
  text: string;
  ellipsisSettings?: NSEllipsis.Settings;
}

interface IActionButton {
  icon: typeof Icon;
  title: string;
  onClick: (e: React.SyntheticEvent<HTMLButtonElement>) => void;
}

interface IProps {
  children?: never;

  link: ILink;

  actions: Array<IActionButton>;
}

export class LinkAction extends React.PureComponent<IProps> {
  render(): React.ReactNode {
    const { link, actions } = this.props;
    const ellipsisProps = Object.entries(link.ellipsisSettings ?? {}).reduce<Record<string, any>>((acc, [key, value]) => {
      acc[`ellipsis:${key}`] = value;
      return acc;
    }, {});
    return (
      <>
        <Link href={link.href} isExternal={false}>
          <Link.Text {...ellipsisProps}>
            {link.text}
          </Link.Text>
        </Link>
        <Divider orientation='vertical' mx={1} hMin={0} my={1} />
        {actions.map((action) => {
          return (
            <Button
              key={action.title}
              h='auto'
              use='tertiary'
              theme='muted'
              title={action.title}
              addonLeft={action.icon}
              onClick={action.onClick}
            />
          );
        })}
      </>
    );
  }
}
