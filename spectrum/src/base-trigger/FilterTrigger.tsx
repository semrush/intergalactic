import { FilterTrigger as UIFilterTrigger } from '@semcore/base-trigger';
import React from 'react';

import styles from './filterTrigger.module.css';

function FilterTrigger(props: any) {
  const classNames = [styles.filterTrigger, styles.sizeM];

  if (!props.empty || props.active) {
    classNames.push(styles.selected);
  }

  return <UIFilterTrigger {...props} className={classNames.join(' ')} />;
}

FilterTrigger.Text = UIFilterTrigger.Text;
FilterTrigger.Addon = UIFilterTrigger.Addon;
FilterTrigger.Counter = UIFilterTrigger.Counter;
FilterTrigger.TriggerButton = UIFilterTrigger.TriggerButton;
FilterTrigger.ClearButton = UIFilterTrigger.ClearButton;

export default FilterTrigger;
