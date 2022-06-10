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
        <div className={styles.view}>
          <div style={{ width: '100%' }}>{children}</div>
        </div>
        <div className={styles.codeView}>
          <div className={styles.codeViewControls}>
            <div className={styles.codeViewControlsParent}>
              <div className={styles.stylesIcons}>
                <Sandbox raw={raw} />
              </div>
              <div className={styles.stylesIcons}>
                <Copy text={raw.code} textTooltip="Click to copy code">
                  <CopyS />
                </Copy>
              </div>
            </div>
          </div>
          <Code lang="jsx" block copy={false}>
            {raw.code}
          </Code>
        </div>
      </div>
    );
  }
}

export default Example;
