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
import styles from './DocsHeader.module.css';

const tooltipStyles = css`
  STooltip[theme] {
    padding: 12px;
    border: 1px solid #d1d4db;
    box-shadow: 5px 8px 25px rgba(137, 141, 154, 0.2);
    border-radius: 6px;
  }
`;

export default function (props) {
  const { title, category, fileSource, sourcePath, beta } = props;

  return (
    <Box tag="header" mb={10}>
      <h2 className={styles.title}>
        {title} {beta && <Tag size="l" theme="warning" use="primary" children="beta" />}
      </h2>
      <Text tag="p" color="#898D9A" mb={3} size={300}>
        {category}
      </Text>
      <Flex className={styles.overlay} mb={3}>
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
