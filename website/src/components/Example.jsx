import React from 'react';
import styles from './Example.module.css';
import Code from './Code';
import Copy from './Copy';
import Sandbox from './Sandbox';
import CopyS from '@semcore/icon/Copy/m';

class Example extends React.PureComponent {
  render() {
    const { raw, children } = this.props;
    return (
      <div className={`example ${styles.exampleWrapper}`}>
        <div className={styles.view} tabIndex={0}>
          {children}
        </div>
        <div className={styles.codeView}>
          <div className={styles.codeViewControls}>
            <div className={styles.codeViewControlsParent}>
              <div className={styles.stylesIcons}>
                <Sandbox raw={raw} />
              </div>
              <div className={styles.stylesIcons}>
                <Copy toCopy={raw.code} title="Click to copy code">
                  <CopyS />
                </Copy>
              </div>
            </div>
          </div>
          <Code lang="jsx" block>
            {raw.code}
          </Code>
        </div>
      </div>
    );
  }
}

export default Example;
