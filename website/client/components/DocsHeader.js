import React from 'react';
import Link from '@semcore/link';
import Tooltip from '@semcore/tooltip';
import { Box, Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';
import Divider from '@semcore/divider';
import LinkExternalXS from '@semcore/icon/lib/LinkExternal/xs';
import FigmaS from '@semcore/icon/lib/color/Figma/s';
import GitHubS from '@semcore/icon/lib/color/GitHub/s';
import EditS from '@semcore/icon/lib/Edit/s';
import styled from 'styled-components';

const Title = styled.h2`
  font-family: FactorA-Regular;
  font-size: 50px;
  line-height: 110%;
  margin: 0;
  margin-bottom: 4px;
  @media (max-width: 320px) {
    font-size: 40px;
    line-height: 120%;
  }
`;

const Overlay = styled(Flex)`
  @media (max-width: 320px) {
    display: none;
  }
`;

export default function(props) {
  const { title, category, fileSource, sourcePath } = props;

  return (
    <Box tag="header" mb={6}>
      <Title>{title}</Title>
      <Text tag="p" color="#898D9A" mb={3} size={300}>
        {category}
      </Text>
      <Overlay mb={3}>
        <Box mr={5}>
          <Link
            size={300}
            color="#171A22"
            target="_blank"
            href="https://www.figma.com/files/826881787188133920/project/7254473/Library"
          >
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
          <Tooltip>
            <Tooltip.Trigger>
              <Link
                size={300}
                color="#171A22"
                target="_blank"
                href={`https://github.com/semrush/intergalactic/edit/master/website/${sourcePath}`}
              >
                <Link.Addon>
                  <EditS color="#898D9A" />
                </Link.Addon>
                <Link.Text>Edit page</Link.Text>
              </Link>
            </Tooltip.Trigger>
            <Tooltip.Popper>
              <Text tag="p" mb={1}>
                If you saw an error, typo, do not pass by 🙏
              </Text>
              <Text tag="p" mb={1}>
                Fork the project and send us changes.
              </Text>
              Thank you 🖤
            </Tooltip.Popper>
          </Tooltip>
        </Box>
      </Overlay>
      <Divider orientation="horizontal" style={{ backgroundColor: '#D1D4DB' }} />
    </Box>
  );
}
