import React from 'react';
import styled from 'styled-components';

import LinkM from '@semcore/icon/lib/Link/m';

const Heading = styled.h3`
  position: relative;
  &:hover svg {
    opacity: 1;
  }
  svg {
    cursor: pointer;
    color: #a6b0b3;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate(-100%, -50%);
    opacity: 0;
    padding: 5px;
    line-height: 16px;
  }
  svg:hover {
    color: #333;
  }

  font-weight: ${({ as }) => (parseInt(as.slice(1), 10) > 3 ? 'normal' : 500)};
`;

function HeadingLink({ level, route, children, ...other }) {
  return (
    <Heading as={`h${level}`} id={route} {...other}>
      <LinkM onClick={() => (window.location.hash = `#${route}`)} />
      {children}
    </Heading>
  );
}

export default HeadingLink;
