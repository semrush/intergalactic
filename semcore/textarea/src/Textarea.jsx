import React from 'react';
import { Box } from '@semcore/flex-box';
import autoFocusEnhance from '@semcore/core/lib/utils/enhances/autoFocusEnhance';
import canUseDOM from '@semcore/core/lib/utils/canUseDOM';
import cssToIntDefault from '@semcore/core/lib/utils/cssToIntDefault';
import rafTrottle from '@semcore/core/lib/utils/rafTrottle';
import { createComponent, Component, sstyled, Root } from '@semcore/core';

import style from './style/textarea.shadow.css';

class Textarea extends Component {
  static displayName = 'Textarea';
  static defaultProps = {
    size: 'm',
    state: 'normal',
    resize: 'none',
    minRows: 2,
    defaultValue: '',
  };
  static enhance = [autoFocusEnhance()];
  static style = style;

  node = null;

  uncontrolledProps() {
    return {
      value: [
        (e) => e.target.value,
        () => {
          this.calculateRows();
        },
      ],
    };
  }

  setRef = (node) => {
    if (!node) return;
    this.node = node;
  };

  addGlobalHandlers = () => {
    if (!canUseDOM()) return;
    window.addEventListener('resize', this.calculateRows);
  };

  removeGlobalHandlers = () => {
    if (!canUseDOM()) return;
    window.removeEventListener('resize', this.calculateRows);
  };

  calculateRows = rafTrottle((disabledScrolling = false) => {
    const { node } = this;
    const { rows, minRows, maxRows } = this.asProps;
    if (!node || !canUseDOM() || rows || !(minRows || maxRows)) return;

    const previousRows = node.rows;
    const clonnedNode = node.cloneNode(true);
    const computedStyle = window.getComputedStyle(node);

    for (let i = 0; i < computedStyle.length; i++) {
      const key = computedStyle.item(i);

      clonnedNode.style.setProperty(
        key,
        computedStyle.getPropertyValue(key),
        computedStyle.getPropertyPriority(key),
      );
    }

    clonnedNode.style.setProperty('visibility', 'hidden', 'important');

    document.body.appendChild(clonnedNode);

    const lh = cssToIntDefault(getComputedStyle(clonnedNode).getPropertyValue('line-height'));

    clonnedNode.rows = minRows;
    clonnedNode.style.setProperty('height', 'fit-content');

    const computed = Math.floor(clonnedNode.scrollHeight / lh);

    document.body.removeChild(clonnedNode);

    if (computed === previousRows) {
      node.rows = computed;
      return;
    }
    if (computed <= minRows) {
      node.rows = minRows;
    }
    if (computed >= maxRows) {
      node.rows = maxRows;
    }
    if (
      (minRows !== undefined || maxRows !== undefined) &&
      (minRows === undefined || computed >= minRows) &&
      (maxRows === undefined || computed <= maxRows)
    ) {
      node.rows = computed;
    }

    if (disabledScrolling) return;
    const { selectionEnd, value } = node;
    if (selectionEnd < value.length) return;

    node.scrollTop = node.scrollHeight;
  });

  componentDidMount() {
    this.calculateRows(true);
    this.addGlobalHandlers();
  }

  componentDidUpdate(prevProps) {
    const { minRows, maxRows, value } = this.asProps;
    if (
      prevProps.minRows !== minRows ||
      prevProps.maxRows !== maxRows ||
      prevProps.value !== value
    ) {
      this.calculateRows();
    }
  }

  componentWillUnmount() {
    this.removeGlobalHandlers();
  }

  render() {
    const STextarea = Root;
    const { styles } = this.asProps;

    return sstyled(styles)(<STextarea render={Box} tag='textarea' ref={this.setRef} />);
  }
}

export default createComponent(Textarea);
