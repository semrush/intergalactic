import React from 'react';
import cn from 'classnames';
import addonText from '@semcore/utils/lib/addonText';
import assignProps from '@semcore/utils/lib/assignProps';
import styles from './style.module.css';

interface IEmailButtonProps {
  children: React.ReactNode;
}

class Button extends React.Component<IEmailButtonProps> {
  static Text: React.ComponentType<any>;
  static Addon: React.ComponentType<any>;
  displayName = 'Button';

  render() {
    const { children } = this.props;
    const className = cn(styles.button, {});
    return (
      <a {...assignProps(this.props, { className })}>
        {addonText(children, Button.Text, Button.Addon)}
      </a>
    );
  }
}

Button.Text = function ({ children }) {
  return <span className={styles.button__text}>{children}</span>;
};
Button.Text.displayName = 'Button.Text';

Button.Addon = function ({ children }) {
  return <span className={styles.button__addon}>{children}</span>;
};
Button.Addon.displayName = 'Button.Addon';

export default Button;
