import React from 'react';
import Link from '@semcore/link';
import Tooltip from '@semcore/tooltip';
import { Box, Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';
import Divider from '@semcore/divider';
import LinkExternalXS from '@semcore/icon/LinkExternal/m';
import FigmaS from '@semcore/icon/color/Figma/m';
import GitHubS from '@semcore/icon/color/GitHub/m';
import EditS from '@semcore/icon/Edit/m';
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
    <RouterLink to={to} mx={1}>
      {version}
    </RouterLink>
  );
}

export default function (props) {
  const { title, category, fileSource, sourcePath, beta, version, changelogUrl } = props;

  return (
    <Box mb={8}>
      <h1 className={styles.title}>{title}</h1>
      <Text tag={Flex} alignItems={'center'} color="#898D9A" mb={3} size={300}>
        {category}
        {version && (
          <>
            {' '}
            |<VersionLink to={`/${changelogUrl}/#${version}`} version={version} />
          </>
        )}
        {beta && <Tag size="m" theme="primary" color="orange-500" children="beta" />}
      </Text>
      <Flex className={styles.overlay} mb={4} tag="nav" aria-label="External links">
        <Box mr={5}>
          <Link size={300} color="#171A22" target="_blank" href="https://www.figma.com/@semrush">
            <Link.Addon>
              <FigmaS />
            </Link.Addon>
            <Link.Text>Figma libraries</Link.Text>
            <Link.Addon>
              <LinkExternalXS color="#898D9A" />
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
                  <svg
                    className={styles.packageLogo}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 256 256"
                  >
                    <rect width="256" height="256" fill="none" />
                    <path
                      fill="none"
                      stroke="#000"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="16"
                      d="M224,177.32122V78.67878a8,8,0,0,0-4.07791-6.9726l-88-49.5a8,8,0,0,0-7.84418,0l-88,49.5A8,8,0,0,0,32,78.67878v98.64244a8,8,0,0,0,4.07791,6.9726l88,49.5a8,8,0,0,0,7.84418,0l88-49.5A8,8,0,0,0,224,177.32122Z"
                    />
                    <polyline
                      fill="none"
                      stroke="#000"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="16"
                      points="177.022 152.511 177.022 100.511 80 47"
                    />
                    <polyline
                      fill="none"
                      stroke="#000"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="16"
                      points="222.897 74.627 128.949 128 33.108 74.617"
                    />
                    <line
                      x1="128.949"
                      x2="128.01"
                      y1="128"
                      y2="234.821"
                      fill="none"
                      stroke="#000"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="16"
                    />
                  </svg>
                </Link.Addon>
                <Link.Text>NPM</Link.Text>
                <Link.Addon>
                  <LinkExternalXS color="#898D9A" />
                </Link.Addon>
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
                  <GitHubS />
                </Link.Addon>
                <Link.Text>GitHub source</Link.Text>
                <Link.Addon>
                  <LinkExternalXS color="#898D9A" />
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
                  <EditS color="#898D9A" />
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
