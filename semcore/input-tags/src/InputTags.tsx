import React from 'react';
import createComponent, { Component, sstyled, Root, PropGetterFn, CProps } from '@semcore/core';
import Input, { IInputProps, IInputValueProps } from '@semcore/input';
import ScrollArea, { IScrollAreaProps } from '@semcore/scroll-area';
import Tag, { ITagProps } from '@semcore/tag';
import fire from '@semcore/utils/lib/fire';

import style from './style/input-tag.shadow.css';

export interface IInputTagsValueProps extends IInputValueProps {}

export type InputTagsSize = 'l' | 'm';

export interface IInputTagsProps extends Omit<IInputProps, 'size'>, IScrollAreaProps {
  /**
   * Component size
   * @default m
   */
  size?: InputTagsSize;
  /**
   * Event is called when tag needs to be added
   * @deprecated use `onAppend` instead
   */
  onAdd?: (value: string, event: React.KeyboardEvent | React.ClipboardEvent) => void;
  /** Event is called when tags need to be added */
  onAppend?: (values: string[], event: React.KeyboardEvent | React.ClipboardEvent) => void;
  /** Event is called when tags need to be removed  */
  onRemove?: (event: React.KeyboardEvent | React.MouseEvent) => void;
  /** List delimiter of tags
   * @default [',', ';', '|']
   * */
  delimiters?: string[];
}

export interface IInputTagsTagProps extends ITagProps {
  /** Property enabling the ability to remove a tag on click */
  editable?: boolean;
}

export interface IInputTagsContext extends IInputTagsProps {
  getValueProps: PropGetterFn;
  getTagProps: PropGetterFn;
}

const MAP_SIZES_TAG = {
  l: 'l',
  m: 'm',
};

class InputTags extends Component<IInputTagsProps> {
  static displayName = 'InputTags';
  static style = style;

  static defaultProps = {
    size: 'm',
    delimiters: [',', ';', '|', 'Enter', 'Tab'],
    defaultValue: '',
  };

  _input = React.createRef<HTMLInputElement>();

  setFocusInput = (e) => {
    const inputRef = this._input.current;
    if (inputRef && e.target !== inputRef) {
      const caretPosition = inputRef.value.length;
      e.preventDefault();
      inputRef.focus();
      inputRef.setSelectionRange(caretPosition, caretPosition);
    }
  };

  handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { key, currentTarget } = event;
    const { delimiters } = this.asProps;
    const { value } = currentTarget;
    const lastSymbol = value.slice(-1);
    const trimmedValue = value.trim();

    if ((delimiters.includes(key) || (lastSymbol === ' ' && key === ' ')) && trimmedValue) {
      event.preventDefault();
      fire(this, 'onAdd', trimmedValue, event);
      fire(this, 'onAppend', [trimmedValue], event);
      setTimeout(() => this._input?.current?.scrollIntoView(false), 0);
    }

    if (key === 'Backspace' && !value) {
      event.preventDefault();
      fire(this, 'onRemove', event);
    }
  };

  handlePaste = (event: React.ClipboardEvent) => {
    const value = event.clipboardData.getData('text/plain');
    const { delimiters, onAdd, onAppend } = this.asProps;
    const reg = new RegExp(
      delimiters
        .filter((s) => !/\w+/.test(String(s)))
        .map((s) => s.replace(/[\\^$*+?.()|[\]{}]/g, '\\$&'))
        .join('|'),
    );
    const tagsToBeAdded = value.split(reg).filter(Boolean);
    if (tagsToBeAdded.length > 0) {
      event.preventDefault();
      for (const tag of tagsToBeAdded) {
        onAdd?.(tag, event);
      }
      onAppend?.(tagsToBeAdded, event);
    }
    setTimeout(() => this._input?.current?.scrollIntoView(false), 0);
  };

  bindHandlerTagClick = (editable: boolean) => (event: React.MouseEvent) => {
    if (!editable) return;
    fire(this, 'onRemove', event);
  };

  getValueProps() {
    return {
      ref: this._input,
      onKeyDown: this.handleKeyDown,
      onPaste: this.handlePaste,
    };
  }

  getTagProps({ editable }: { editable: boolean }) {
    return {
      size: MAP_SIZES_TAG[this.asProps.size],
      onClick: this.bindHandlerTagClick(editable),
    };
  }

  render() {
    const SInputTags = Root;
    const { Children, styles } = this.asProps;

    return sstyled(styles)(
      <SInputTags
        render={Input}
        tag={ScrollArea}
        onMouseDown={this.setFocusInput}
        role="list"
        tabIndex={0}
      >
        <Children />
      </SInputTags>,
    );
  }
}

class Value extends Component<IInputTagsValueProps> {
  private _spacer = React.createRef<HTMLDivElement>();

  state = {
    width: '10px',
  };

  componentDidMount() {
    this.updateInputStyles(this.asProps.value);
  }

  componentDidUpdate(prevProps) {
    const { value, placeholder } = this.asProps;
    if (value !== prevProps.value || placeholder !== prevProps.placeholder) {
      this.updateInputStyles(value);
    }
  }

  handleChange = (value) => {
    this.updateInputStyles(value);
  };

  updateInputStyles = (value) => {
    const { current: spacerNode } = this._spacer;
    if (!spacerNode) return;
    const { placeholder } = this.props;
    /* for display cursor */
    let magicOffset = 2;
    if (placeholder && (value === undefined || value === '')) {
      // @ts-ignore
      spacerNode['innerText'] = placeholder;
      /* for [placeholder] {
          text-overflow: ellipsis;
      }*/
      magicOffset += 8;
    } else {
      spacerNode['innerText'] = value;
    }
    this.setState({
      width: `${Math.max(spacerNode['offsetWidth'], spacerNode['scrollWidth']) + magicOffset}px`,
    });
  };

  render() {
    const SValue = Root;
    const SSpacer = 'div';

    return sstyled(this.asProps.styles)(
      <>
        <SValue render={Input.Value} style={{ width: this.state.width }} />
        <SSpacer ref={this._spacer} />
      </>,
    );
  }
}

function InputTag(props) {
  const STag = Root;

  const onKeyDown = (event) => {
    if (event.code === 'Enter') {
      props.onClick && props.onClick(event);
    }
  };

  return sstyled(props.styles)(
    <STag data-value={props.value} render={Tag} role="listitem" onKeyDown={onKeyDown} />,
  );
}

export default createComponent(InputTags, {
  Value,
  Tag: [
    InputTag,
    {
      Text: Tag.Text,
      Close: Tag.Close,
      Addon: Tag.Addon,
      Circle: Tag.Circle,
    },
  ],
}) as (<T>(props: CProps<IInputTagsProps & T, IInputTagsContext>) => React.ReactElement) & {
  Value: typeof Input.Value;
  Tag: (<T>(props: IInputTagsTagProps & T) => React.ReactElement) & {
    Text: typeof Tag.Text;
    Close: typeof Tag.Close;
    Addon: typeof Tag.Addon;
    Circle: typeof Tag.Circle;
  };
};
