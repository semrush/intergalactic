import React from 'react';
import styles from './Example.module.css';
import Code from './Code';
import Copy from './Copy';
import Sandbox from './Sandbox';
import CopyM from '@semcore/icon/Copy/m';
import { logEvent } from '../utils/amplitude';
import { ThemeProvider } from '@semcore/core/lib/utils/ThemeProvider';
import lightThemeTokens from '@semcore/core/lib/utils/themes/light.json';

class Example extends React.PureComponent {
  render() {
    const { raw, children } = this.props;
    const [group, component, , exampleName] = raw.path
      ? raw.path.split('/')
      : [undefined, undefined, undefined, undefined];
    const eventProperties = {
      group,
      component,
      example: exampleName ? exampleName.slice(0, exampleName.length - 4) : undefined,
    };
    return (
      <div className={`example ${styles.exampleWrapper}`}>
        <ThemeProvider tokens={lightThemeTokens}>
          <div className={styles.view} tabIndex={0} role='group'>
            {children}
          </div>
        </ThemeProvider>
        <div className={styles.codeView}>
          <div className={styles.codeViewControls}>
            <div className={styles.codeViewControlsParent}>
              <div className={styles.stylesIcons}>
                <Sandbox
                  raw={raw}
                  onClick={() => logEvent('tab_examples:open_sandbox:click', eventProperties)}
                />
              </div>
              <div className={styles.stylesIcons}>
                <Copy
                  toCopy={raw.code}
                  title='Click to copy code'
                  onClick={() => logEvent('tab_examples:copy_code:click', eventProperties)}
                >
                  <CopyM />
                </Copy>
              </div>
            </div>
          </div>
          <Code lang='jsx' block>
            {raw.code}
          </Code>
        </div>
      </div>
    );
  }
}

export default Example;
