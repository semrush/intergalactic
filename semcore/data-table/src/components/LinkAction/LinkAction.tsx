import type { NSEllipsis } from '@semcore/base-components';
import { Flex, Box } from '@semcore/base-components';
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

interface ICommonAction {
  icon: typeof Icon;
  title: string;
}

type IAction = ICommonAction & ({
  onClick: (e: React.SyntheticEvent<HTMLButtonElement>) => void;
} | {
  href: string;
});

interface IProps {
  children?: never;
  link: ILink;
  actions: IAction | [IAction, IAction];
}

export class LinkAction extends React.PureComponent<IProps> {
  private renderAction(action: IAction) {
    if ('href' in action) {
      return (
        <Link
          px='2px'
          key={action.title}
          href={action.href}
          title={action.title}
          theme='light'
          addonLeft={action.icon}
        />
      );
    }

    return (
      <Button
        key={action.title}
        hMax='20px'
        w='24px'
        wMin={0}
        use='tertiary'
        theme='muted'
        title={action.title}
        addonLeft={action.icon}
        onClick={action.onClick}
      />
    );
  }

  private renderActions(actions: IAction[]) {
    return (
      <Flex gap={1} display='inline-flex' alignItems='flex-start'>
        {actions.map((action) => this.renderAction(action))}
      </Flex>
    );
  }

  private isUrl(value: string): boolean {
    return value.startsWith('//') || value.toLowerCase().startsWith('http');
  }

  private isExternalLink(href: string, text: string) {
    const link = this.isUrl(text) ? text : href;

    if (!this.isUrl(link)) {
      return false;
    }

    try {
      const linkUrl = new URL(link, window.location.origin);

      return linkUrl.host !== window.location.host;
    } catch (e: unknown) {
      if (e instanceof Error && e.message.includes('Invalid base URL')) {
        return true;
      }
    }

    return false;
  }

  render(): React.ReactNode {
    const { link, actions } = this.props;
    const ellipsisProps = Object.entries(link.ellipsisSettings ?? {}).reduce<Record<string, any>>((acc, [key, value]) => {
      acc[`ellipsis:${key}`] = value;
      return acc;
    }, {});
    return (
      <Box display={link.ellipsisSettings ? 'flex' : 'inline'}>
        <Link href={link.href}>
          <Link.Text {...ellipsisProps}>
            {link.text}
          </Link.Text>
          {this.isExternalLink(link.href, link.text) && <Link.ExternalIcon />}
        </Link>
        <Flex display='inline-flex' alignItems='center'>
          <Divider orientation='vertical' mx={1} my={1} hMin={0} />
          {Array.isArray(actions) ? this.renderActions(actions) : this.renderAction(actions)}
        </Flex>
      </Box>
    );
  }
}
