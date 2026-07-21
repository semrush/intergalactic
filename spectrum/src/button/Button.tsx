import UIButton from '@semcore/button';
import React from 'react';

import styles from './button.module.css';
import type { NSButton } from './Button.type.ts';

function Button(props: NSButton.Props) {
  const classNames = [styles.button, styles.size];

  if (props.theme === 'outline') {
    classNames.push(styles.outline);

    if (props.use === 'primary') {
      classNames.push(styles.primaryOutline);
    }
  }

  if (props.use === 'accent') {
    classNames.push(styles.accent);
  }

  // @ts-expect-error because of spectrum theme
  return <UIButton {...props} className={classNames.join(' ')} />;
}

Button.Text = UIButton.Text;

Button.Addon = UIButton.Addon;

export default Button;
