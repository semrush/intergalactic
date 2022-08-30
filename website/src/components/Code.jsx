import React from 'react';
import cn from 'classnames';
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/nightOwl';
import styles from './Code.module.css';

export default function ({ children, lang, block, className }) {
  return (
    <Highlight {...defaultProps} code={children} language={lang} theme={theme}>
      {({ style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={cn(styles.pre, className)}
          style={{ ...style, display: block ? 'block' : 'inline-block' }}
        >
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => {
                const { className, ...other } = getTokenProps({ token, key });
                return <span {...other} />;
              })}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}
