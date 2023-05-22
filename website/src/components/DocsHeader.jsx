import React, { useState, useLayoutEffect } from 'react';
import Link from '@semcore/link';
import Tooltip from '@semcore/tooltip';
import { Box, Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';
import Divider from '@semcore/divider';
import BracketsCodeM from '@semcore/icon/BracketsCode/m';
import FigmaM from '@semcore/icon/color/Figma/m';
import GitHubM from '@semcore/icon/color/GitHub/m';
import GitHubInvertM from '@semcore/icon/color/GitHubInvert/m';
import EditM from '@semcore/icon/Edit/m';
import WarningM from '@semcore/ui/icon/Warning/m';
import { css } from '@semcore/core';
import Tag from '@semcore/tag';
import RouterLink from './RouterLink';
import { logEvent } from '../utils/amplitude';
import { getThemePreference } from '../utils/theme';

import styles from './DocsHeader.module.css';

const tooltipStyles = css`
  STooltip[theme] {
    padding: var(--intergalactic-spacing-3x);
    border: 1px solid #d1d4db;
    box-shadow: 5px 8px 25px rgba(137, 141, 154, 0.2);
    border-radius: var(--intergalactic-rounded-medium);
  }
`;

function VersionLink({ to, version, onClick }) {
  return (
    <RouterLink to={to} mx={1} aria-label={`Component version ${version}`} onClick={onClick}>
      {version}
    </RouterLink>
  );
}

export default function (props) {
  const {
    title,
    category,
    fileSource,
    sourcePath,
    beta,
    version,
    changelogUrl,
    deprecated,
    route,
  } = props;
  const [group, page] = route.split('/');
  const [theme, setTheme] = useState('');

  useLayoutEffect(() => {
    const currentTheme = getThemePreference();
    setTheme(currentTheme);
  }, [getThemePreference()]);

  return (
    <Box mb={8}>
      <h1 className={styles.title}>{title}</h1>
      <Text tag={Flex} alignItems={'center'} color="#898D9A" mb={3} size={300}>
        {category}
        {version && changelogUrl && (
          <>
            <Divider orientation="vertical" h={16} m={'4px 4px 0 8px'} />
            <VersionLink
              to={`/${changelogUrl}/#${version}`}
              version={version}
              onClick={() =>
                logEvent('version:click', {
                  group,
                  page,
                  label: version,
                })
              }
            />
          </>
        )}
        {beta && <Tag size="m" theme="primary" color="orange-500" children="beta" />}
        {deprecated && (
          <Tooltip>
            <Tooltip.Trigger tag={Flex} alignItems="center">
              <Divider orientation="vertical" ml={1} mr={1} />
              <WarningM className={styles.deprecatedIcon} />
            </Tooltip.Trigger>
            <Tooltip.Popper>Deprecated component</Tooltip.Popper>
          </Tooltip>
        )}
      </Text>
      <Flex className={styles.overlay} mb={4} tag="nav" aria-label="External links">
        <Box mr={5}>
          <Link
            size={300}
            target="_blank"
            href="https://www.figma.com/@semrush"
            onClick={() =>
              logEvent('figma_btn:click', {
                group,
                page,
              })
            }
          >
            <Link.Addon>
              <FigmaM />
            </Link.Addon>
          </Link>
        </Box>
        {!!fileSource && (
          <>
            <Box mr={5}>
              <Link
                size={300}
                target="_blank"
                href={`https://www.npmjs.com/package/@semcore/ui`}
                onClick={() =>
                  logEvent('npm_btn:click', {
                    group,
                    page,
                  })
                }
              >
                <Link.Addon>
                  <BracketsCodeM color="var(--intergalactic-icon-non-interactive)" />
                </Link.Addon>
                <Link.Text className={styles.linkText}>NPM</Link.Text>
              </Link>
            </Box>
            <Box mr={5}>
              <Link
                size={300}
                target="_blank"
                href={`https://github.com/semrush/intergalactic/tree/master/semcore/${fileSource}`}
                onClick={() =>
                  logEvent('github_btn:click', {
                    group,
                    page,
                  })
                }
              >
                <Link.Addon>
                  {theme === 'light' ? (
                    <GitHubM width={18} height={18} />
                  ) : (
                    <GitHubInvertM width={18} height={18} />
                  )}
                </Link.Addon>
              </Link>
            </Box>
          </>
        )}
        <Box mr={5}>
          <Divider h="20px" orientation="vertical" />
        </Box>
        <Box mr={4}>
          <Tooltip styles={tooltipStyles}>
            <Tooltip.Trigger>
              <Link
                size={300}
                target="_blank"
                href={`https://github.com/semrush/intergalactic/edit/master/website/docs/${sourcePath}`}
                onClick={() =>
                  logEvent('edit_page_btn:click', {
                    group,
                    page,
                  })
                }
              >
                <Link.Addon>
                  <EditM color="var(--intergalactic-icon-non-interactive)" />
                </Link.Addon>
                <Link.Text className={styles.linkText}>Edit page</Link.Text>
              </Link>
            </Tooltip.Trigger>
            <Tooltip.Popper>
              <Text size={200}>
                If you notice an error or typo, please help us find and fix it. Fork the project and
                send us the changes. Thank you!
              </Text>
            </Tooltip.Popper>
          </Tooltip>
        </Box>
      </Flex>
      <Divider orientation="horizontal" />
    </Box>
  );
}
