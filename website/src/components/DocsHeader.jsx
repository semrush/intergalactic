import React from 'react';
import Link from '@semcore/link';
import Tooltip from '@semcore/tooltip';
import { Box, Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';
import Divider from '@semcore/divider';
import BracketsCodeM from '@semcore/icon/BracketsCode/m';
import FigmaM from '@semcore/icon/color/Figma/m';
import GitHubM from '@semcore/icon/color/GitHub/m';
import EditM from '@semcore/icon/Edit/m';
import WarningM from '@semcore/ui/icon/Warning/m';
import { css } from '@semcore/core';
import Tag from '@semcore/tag';
import RouterLink from './RouterLink.jsx';

import styles from './DocsHeader.module.css';

const tooltipStyles = css`
  STooltip[theme] {
    padding: 12px;
    border: 1px solid #d1d4db;
    box-shadow: 5px 8px 25px rgba(137, 141, 154, 0.2);
    border-radius: 6px;
  }
`;

function VersionLink({ to, version }) {
  return (
    <RouterLink to={to} mx={1} aria-label={`Component version ${version}`}>
      {version}
    </RouterLink>
  );
}

export default function (props) {
  const { title, category, fileSource, sourcePath, beta, version, changelogUrl, deprecated } =
    props;

  return (
    <Box mb={8}>
      <h1 className={styles.title}>{title}</h1>
      <Text tag={Flex} alignItems={'center'} color="#898D9A" mb={3} size={300}>
        {category}
        {version && changelogUrl && (
          <>
            {' '}
            |<VersionLink to={`/${changelogUrl}/#${version}`} version={version} />
          </>
        )}
        {beta && <Tag size="m" theme="primary" color="orange-500" children="beta" />}
        {deprecated && (
          <Tooltip>
            <Tooltip.Trigger tag={Flex} alignItems="center">
              |<WarningM className={styles.deprecatedIcon} />
            </Tooltip.Trigger>
            <Tooltip.Popper>Deprecated component</Tooltip.Popper>
          </Tooltip>
        )}
      </Text>
      <Flex className={styles.overlay} mb={4} tag="nav" aria-label="External links">
        <Box mr={5}>
          <Link size={300} color="#171A22" target="_blank" href="https://www.figma.com/@semrush">
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
                color="#171A22"
                target="_blank"
                href={`https://www.npmjs.com/package/@semcore/ui`}
              >
                <Link.Addon>
                  <BracketsCodeM />
                </Link.Addon>
                <Link.Text>NPM</Link.Text>
              </Link>
            </Box>
            <Box mr={5}>
              <Link
                size={300}
                color="#171A22"
                target="_blank"
                href={`https://github.com/semrush/intergalactic/tree/master/semcore/${fileSource}`}
              >
                <Link.Addon>
                  <GitHubM width={18} height={18} />
                </Link.Addon>
              </Link>
            </Box>
          </>
        )}
        <Box mr={5}>
          <Divider h="20px" orientation="vertical" style={{ backgroundColor: '#D1D4DB' }} />
        </Box>
        <Box mr={4}>
          <Tooltip styles={tooltipStyles}>
            <Tooltip.Trigger>
              <Link
                size={300}
                color="#171A22"
                target="_blank"
                href={`https://github.com/semrush/intergalactic/edit/master/website/docs/${sourcePath}`}
              >
                <Link.Addon>
                  <EditM color="#898D9A" />
                </Link.Addon>
                <Link.Text>Edit page</Link.Text>
              </Link>
            </Tooltip.Trigger>
            <Tooltip.Popper>
              <Text tag="p" mb={1}>
                If you find an error, typo, do not pass by 🙏
              </Text>
              <Text tag="p" mb={1}>
                Fork the project and send us changes.
              </Text>
              Thank you 🖤
            </Tooltip.Popper>
          </Tooltip>
        </Box>
      </Flex>
      <Divider orientation="horizontal" style={{ backgroundColor: '#D1D4DB' }} />
    </Box>
  );
}
