import CheckM from '@semcore/icon/Check/m';
import LinkExternalM from '@semcore/icon/LinkExternal/m';
import SettingsM from '@semcore/icon/Settings/m';
import VideoListM from '@semcore/icon/VideoList/m';
import Badge from '@semcore/ui/badge';
import { Box, Flex } from '@semcore/ui/base-components';
import { ButtonLink } from '@semcore/ui/button';
import Link from '@semcore/ui/link';
import { Text } from '@semcore/ui/typography';
import React from 'react';

type CombinationProps = {
  size?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800;
  disabled?: boolean;
  use?: 'primary' | 'secondary';
  linkShowAddonLeft?: boolean;
  linkShowAddonRight?: boolean;
  buttonLinkShowAddonLeft?: boolean;
  buttonLinkShowAddonRight?: boolean;
  showIconOnlyVariants?: boolean;
  showMultilineVariants?: boolean;
};

const Demo = (props: CombinationProps) => {
  const {
    size = 300,
    disabled = false,
    use = 'primary',
    linkShowAddonLeft = false,
    linkShowAddonRight = false,
    buttonLinkShowAddonLeft = false,
    buttonLinkShowAddonRight = false,
    showIconOnlyVariants = true,
    showMultilineVariants = true,
  } = props;

  return (
    <Flex direction='column' gap={4}>
      {/* Link + ButtonLink + inside Text */}

      <Text size={size}>
        Text
        {' '}
        {' '}
        <Link
          href='#'
          size={size}
          addonLeft={linkShowAddonLeft ? CheckM : undefined}
          addonRight={linkShowAddonRight ? LinkExternalM : undefined}
        >
          <Link.Text>Link</Link.Text>

        </Link>
        {' '}
        {' '}
        <ButtonLink
          size={size}
          addonLeft={buttonLinkShowAddonLeft ? CheckM : undefined}
          addonRight={buttonLinkShowAddonRight ? LinkExternalM : undefined}
        >
          ButtonLink
        </ButtonLink>
      </Text>

      {/*  Link(text+addonLeft) + ButtonLink(text+addonLeft) - inside Text */}
      <Text size={size}>
        Inline
        {' '}
        <Link href='#' size={size} addonLeft={SettingsM}>
          <Link.Text> Link addonLeft</Link.Text>

        </Link>
        {' '}
        and
        {' '}
        <ButtonLink size={size} addonRight={SettingsM}>
          ButtonLink addonRight
        </ButtonLink>
        {' '}
        in text.
      </Text>

      {/*  Link(text+addonRight) + ButtonLink(text+addonLeft) - standalone */}
      <Flex gap={2} alignItems='baseline'>
        <Link href='#' size={size} addonRight={SettingsM}>
          Link addonRight
        </Link>
        <ButtonLink size={size} addonLeft={SettingsM}>
          ButtonLink addonLeft
        </ButtonLink>
        <Text size={size}>Text</Text>
      </Flex>

      {/* Link(both addons) + ButtonLink(both addons) - inside Text */}
      <Text size={size}>
        Inline
        {' '}
        <Link href='#' size={size} addonLeft={SettingsM} addonRight={SettingsM}>
          Link both addons
        </Link>
        {' '}
        and
        {' '}
        <ButtonLink size={size} addonLeft={SettingsM} addonRight={SettingsM}>
          ButtonLink both SettingsM
        </ButtonLink>
        {' '}
        in text.
      </Text>

      {showIconOnlyVariants && (
        <>
          {/* Link(text+both addons) + ButtonLink(icon-only) - inside Text */}
          <Text size={size}>
            Inline
            {' '}
            <Link href='#' size={size} addonLeft={SettingsM} addonRight={SettingsM}>
              Link both addons
            </Link>
            {' '}
            and
            {' '}
            <ButtonLink size={size} addonLeft={SettingsM} title='Icon-only button link' />
            {' '}
            in text.
          </Text>

          {/*  Link(icon-only) + ButtonLink(icon-only) - inside Text */}
          <Text size={size}>
            Inline
            {' '}
            <Link href='#' size={size} addonLeft={SettingsM} aria-label='Icon-only link' />
            {' '}
            and
            {' '}
            <ButtonLink size={size} addonLeft={SettingsM} title='Icon-only button link' />
            {' '}
            in text.
          </Text>
        </>
      )}

      {showMultilineVariants && (
        <>
          {/* Pair: Link(multiline+addonRight) + ButtonLink(text+addonLeft) - standalone in Box */}
          <Flex gap={2} alignItems='baseline'>
            <Box w={150}>
              <Link href='#' size={size} noWrap={false} addonRight={LinkExternalM}>
                Long multiline link text that wraps to next line
              </Link>
            </Box>
            <ButtonLink size={size} addonLeft={CheckM}>
              ButtonLink
            </ButtonLink>
            <Text size={size}>Text</Text>
          </Flex>

          {/* -Link(text) + ButtonLink(multiline+both addons) - inside Text */}
          <Box w={300}>
            <Text size={size}>
              Inline
              {' '}
              <Link href='#' size={size}>
                Link
              </Link>
              {' '}
              and
              {' '}
              <ButtonLink size={size} addonLeft={CheckM} addonRight={LinkExternalM}>
                Long ButtonLink label that wraps into multiple lines
              </ButtonLink>
              {' '}
              in text.
            </Text>
          </Box>

          {/*  Link(multiline+addonLeft) + ButtonLink(multiline+addonRight) - in Text and Box */}
          <Box w={250}>
            <Text size={size}>
              <Link href='#' size={size} noWrap={false} addonLeft={CheckM}>
                Long multiline link with addon
              </Link>
              {' '}
              and
              {' '}
              <ButtonLink size={size} addonRight={LinkExternalM}>
                Long multiline ButtonLink with addon
              </ButtonLink>
            </Text>
          </Box>
        </>
      )}

      {showIconOnlyVariants && showMultilineVariants && (
        <>
          {/* Link(icon-only) + ButtonLink(multiline) - standalone in Box */}
          <Box w={250}>
            <Link href='#' size={size} addonLeft={CheckM} aria-label='Icon-only link' />
            <Text size={size}>Text</Text>
            <ButtonLink w={120} size={size} addonLeft={CheckM}>
              Long multiline ButtonLink text
            </ButtonLink>
          </Box>

          {/*  Link(multiline+both addons) + ButtonLink(icon-only) - inside Text in Box */}
          <Box w={250}>
            <Text size={size}>
              <Link href='#' size={size} noWrap={false} addonLeft={CheckM} addonRight={LinkExternalM}>
                Long multiline link with both addons
              </Link>
              {' '}
              and
              {' '}
              <ButtonLink size={size} addonLeft={CheckM} title='Icon-only button link' />
              {' '}
              in text.
            </Text>
          </Box>
        </>
      )}

      <Flex direction='row' gap={2}>
        <Flex direction='column' gap={2} mt={10}>
          <ButtonLink
            size={size}
            disabled={disabled}
            use={use}

          >
            ButtonLink
          </ButtonLink>

          <ButtonLink
            size={size}
            disabled={disabled}
            use={use}

          >
            <ButtonLink.Text>ButtonLink.Addon</ButtonLink.Text>
            <ButtonLink.Addon>
              <VideoListM />
            </ButtonLink.Addon>
          </ButtonLink>

          <ButtonLink
            addonLeft={VideoListM}
            size={size}

            disabled={disabled}
            use={use}

          >
            <ButtonLink.Text>ButtonLink with Badge</ButtonLink.Text>
            <ButtonLink.Addon>
              <Badge type='new' />
            </ButtonLink.Addon>
          </ButtonLink>

        </Flex>

        <Flex direction='column' gap={2} mt={10}>
          <Link
            size={size}

            disabled={disabled}

          >
            Link
          </Link>

          <Link
            size={size}

            disabled={disabled}

          >
            <Link.Text>Link.Addon</Link.Text>
            <Link.Addon>
              <VideoListM />
            </Link.Addon>
          </Link>

          <Link
            addonLeft={VideoListM}
            size={size}

            disabled={disabled}

          >
            <Link.Text>Link with Badge</Link.Text>
            <Link.Addon>
              <Badge type='new' />
            </Link.Addon>
          </Link>

        </Flex>
      </Flex>
    </Flex>
  );
};

export const defaultProps: CombinationProps = {
  size: 300,
  linkShowAddonLeft: false,
  use: 'primary',
  linkShowAddonRight: false,
  buttonLinkShowAddonLeft: false,
  buttonLinkShowAddonRight: false,
  showIconOnlyVariants: true,
  showMultilineVariants: true,
  disabled: false,
};

Demo.defaultProps = defaultProps;

export default Demo;
