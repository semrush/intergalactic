import { ButtonLink } from '@semcore/button';
import Divider from '@semcore/divider';
import LinkExternalM from '@semcore/icon/LinkExternal/m';
import Link from '@semcore/link';
import type { NSText } from '@semcore/typography';
import React from 'react';

interface IProps extends NSText.BaseProps, NSText.EllipsisProps, NSText.HintProps {
  displayHref: string;
  externalHref: string;
  internalAction: string | (() => void);
}

export class LinkAction extends React.PureComponent<IProps> {
  render(): React.ReactNode {
    const { displayHref, externalHref, internalAction, ...textProps } = this.props;
    return (
      <>
        {typeof internalAction === 'string'
          ? (<Link href={internalAction}><Link.Text {...textProps}>{displayHref}</Link.Text></Link>)
          : (<ButtonLink onClick={internalAction}><ButtonLink.Text {...textProps}>{displayHref}</ButtonLink.Text></ButtonLink>)}
        <Divider orientation='vertical' mx={1} hMin={0} my={1} />
        <Link
          href={externalHref}
          color='--gray-400'
          addonLeft={() => <LinkExternalM width={14} height={14} />}
          aria-label={externalHref}
        />
      </>
    );
  }
}
