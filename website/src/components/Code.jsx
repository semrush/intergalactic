import React from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/nightOwl';
import styles from './Code.module.css';

export default function ({ children, lang, block, ...others }) {
  return (
    <Highlight {...defaultProps} code={children} language={lang} theme={theme}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          {...others}
          className={styles.pre}
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
