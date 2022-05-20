import React from 'react';
import styled from 'styled-components';
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/nightOwl';

const PreStyled = styled.pre`
  overflow: auto;
  margin: 0 !important;
  padding: 8px 16px;
  font-size: 16px;
  line-height: 1.2em;
  display: ${({ block }) => (block ? 'block' : 'inline-block')};
`;

export default function ({ children, lang, ...others }) {
  return (
    <Highlight {...defaultProps} code={children} language={lang} theme={theme}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <PreStyled {...others} className={others.className} style={style}>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => {
                const { className, ...other } = getTokenProps({ token, key });
                return <span {...other} />;
              })}
            </div>
          ))}
        </PreStyled>
      )}
    </Highlight>
  );
}
