import { ScrollArea, Portal, ScreenReaderOnly } from '@semcore/base-components';
import {
  createComponent,
  Component,
  sstyled,
  Root,
  type Intergalactic,
} from '@semcore/core';
import type { WithI18nEnhanceProps } from '@semcore/core/lib/utils/enhances/i18nEnhance';
import i18nEnhance from '@semcore/core/lib/utils/enhances/i18nEnhance';
import { extractFrom, isAdvanceMode } from '@semcore/core/lib/utils/findComponent';
import fire from '@semcore/core/lib/utils/fire';
import { getAccessibleName } from '@semcore/core/lib/utils/getAccessibleName';
import uniqueIDEnhancement from '@semcore/core/lib/utils/uniqueID';
import Input from '@semcore/input';
import Tag, { TagContainer } from '@semcore/tag';
import React from 'react';

import type { NSInputTags } from './InputTags.type';
import style from './style/input-tag.shadow.css';
import { localizedMessages } from './translations/__intergalactic-dynamic-locales';

class InputTagsRoot extends Component<
  Intergalactic.InternalTypings.InferComponentProps<NSInputTags.Component>,
  typeof InputTagsRoot.enhance,
  {},
  WithI18nEnhanceProps,
  {},
  NSInputTags.DefaultProps
> {
  static displayName = 'InputTags';
  static style = style;
  static enhance = [uniqueIDEnhancement(), i18nEnhance(localizedMessages)] as const;
  static defaultProps = {
    size: 'm' as const,
    delimiters: [',', ';', '|', 'Enter', 'Tab'],
    i18n: localizedMessages,
    locale: 'en' as const,
  };

  inputRef = React.createRef<HTMLInputElement>();
  scrollContainerRef = React.createRef<HTMLElement>();
  tagsRefs: (HTMLElement | null)[] = [];

  state = {
    tagsContainerAriaLabel: '',
  };

  componentDidMount() {
    const inputElement = this.inputRef.current;
    const inputAccessibleName = getAccessibleName(inputElement);

    this.setState({
      tagsContainerAriaLabel: inputAccessibleName,
    });
  }

  moveFocusToInput = (event: React.FocusEvent) => {
    const inputRef = this.inputRef.current;
    if (inputRef && event.target !== inputRef) {
      const caretPosition = inputRef.value.length;
      event.preventDefault();
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

    if ((delimiters?.includes(key) || (lastSymbol === ' ' && key === ' ')) && trimmedValue) {
      event.preventDefault();
      fire(this, 'onAdd', trimmedValue, event);
      fire(this, 'onAppend', [trimmedValue], event);
      if (typeof this.inputRef.current?.scrollIntoView === 'function') {
        setTimeout(() => {
          if (typeof this.inputRef.current?.scrollIntoView === 'function') {
            this.inputRef.current.scrollIntoView({
              block: 'nearest',
              inline: 'nearest',
              behavior: 'smooth',
            });
          }
        }, 0);
      }
    }

    if (key === 'Backspace' && !value) {
      event.preventDefault();
      fire(this, 'onRemove', event);
    }
  };

  handlePaste = (event: React.ClipboardEvent) => {
    const { disabled } = this.asProps;

    if (disabled) return;

    const currentEnteredValue = this.inputRef.current?.value;
    const value = event.clipboardData.getData('text/plain');
    const { delimiters, onAppend } = this.asProps;
    const reg = new RegExp(
      delimiters!
        .filter((s) => !/\w+/.test(String(s)))
        .map((s) => s.replace(/[\\^$*+?.()|[\]{}]/g, '\\$&'))
        .join('|'),
    );
    let tagsToBeAdded = value.split(reg).filter(Boolean);

    if (currentEnteredValue) {
      tagsToBeAdded = [currentEnteredValue, ...tagsToBeAdded];
    }

    if (tagsToBeAdded.length > 0) {
      event.preventDefault();
      onAppend?.(tagsToBeAdded, event);
    }
    if (typeof this.inputRef.current?.scrollIntoView === 'function') {
      setTimeout(() => {
        if (typeof this.inputRef.current?.scrollIntoView === 'function') {
          this.inputRef.current.scrollIntoView({
            block: 'nearest',
            inline: 'nearest',
            behavior: 'smooth',
          });
        }
      }, 0);
    }
  };

  onTagClick = (event: React.MouseEvent | React.KeyboardEvent) => {
    fire(this, 'onRemove', event);
  };

  getValueProps() {
    return {
      ref: this.inputRef,
      onKeyDown: this.handleKeyDown,
      onPaste: this.handlePaste,
    };
  }

  getTagProps(
    { editable, disabled }: { editable: boolean; disabled: boolean },
    index: number,
  ) {
    const isDisabled = this.asProps.disabled ?? (disabled ?? false);
    const isEditable = isDisabled ? false : editable;

    return {
      'size': this.asProps.size,
      'onClick': isEditable ? this.onTagClick : undefined,
      'interactive': isEditable,
      'ref': (node: HTMLElement | null) => {
        this.tagsRefs[index] = node;
      },
      'use:disabled': isDisabled,
      'use:editable': isEditable,
    };
  }

  getTagTextProps(_: any, index: number) {
    return {
      uid: `${this.asProps.uid}-${index}`,
      getI18nText: this.asProps.getI18nText,
    };
  }

  getInputTagsContainerProps() {
    return {
      tagsContainerAriaLabel: this.state.tagsContainerAriaLabel,
    };
  }

  getTagContainerTextContentProps() {
    return {
      tabIndex: null,
    };
  }

  render() {
    const SInputTags = Root;
    const { Children, styles } = this.asProps;
    const SListAriaWrapper = 'ul';

    const isAdvancedMode = isAdvanceMode(Children, ['InputTags.TagsContainer']);

    if (isAdvancedMode) {
      return sstyled(styles)(
        <SInputTags
          render={Input}
          tag={ScrollArea}
          onMouseDown={this.moveFocusToInput}
          container={this.scrollContainerRef}
          tabIndex={null}
        >
          <Children />
        </SInputTags>,
      );
    }

    const [InputComponents, RestComponents] = extractFrom(Children, ['InputTags.Value']);

    return sstyled(styles)(
      <SInputTags
        render={Input}
        tag={ScrollArea}
        onMouseDown={this.moveFocusToInput}
        container={this.scrollContainerRef}
        tabIndex={null}
      >
        <SListAriaWrapper aria-label={this.state.tagsContainerAriaLabel}>
          {RestComponents}
        </SListAriaWrapper>
        {InputComponents}
      </SInputTags>,
    );
  }
}

class Value extends Component<
  Intergalactic.InternalTypings.InferChildComponentProps<NSInputTags.Value.Component, typeof InputTagsRoot, 'Value'>
> {
  private _spacer = React.createRef<HTMLDivElement>();

  state = {
    width: '10px',
  };

  componentDidMount() {
    this.updateInputStyles(this.asProps.value!);
  }

  componentDidUpdate(prevProps: typeof this.asProps) {
    const { value, placeholder } = this.asProps;
    if (value !== prevProps.value || placeholder !== prevProps.placeholder) {
      this.updateInputStyles(value!);
    }
  }

  handleChange = (value: string) => {
    this.updateInputStyles(value);
  };

  updateInputStyles = (value: string) => {
    const { current: spacerNode } = this._spacer;
    if (!spacerNode) return;
    const { placeholder } = this.props;
    /* for display cursor */
    let magicOffset = 2;
    if (placeholder && (value === undefined || value === '')) {
      spacerNode['innerText'] = placeholder;
      /* for [placeholder] {
          text-overflow: ellipsis;
      } */
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
        <SSpacer ref={this._spacer} aria-hidden />
      </>,
    );
  }
}

function InputTagsContainer(
  props: Intergalactic.InternalTypings.InferChildComponentProps<
    NSInputTags.TagsContainer.Component,
    typeof InputTagsRoot,
    'TagsContainer'
  >,
) {
  const { Children, tagsContainerAriaLabel, styles } = props;
  const SListAriaWrapper = 'ul';

  return sstyled(styles)(
    <SListAriaWrapper aria-label={tagsContainerAriaLabel}>
      <Children />
    </SListAriaWrapper>,
  );
}

function InputTagContainer(
  props: Intergalactic.InternalTypings.InferChildComponentProps<NSInputTags.Tag.Component, typeof InputTagsRoot, 'Tag'>,
) {
  const STag = Root;

  const onKeyDown = React.useCallback(
    (event: React.KeyboardEvent) => {
      if (props.onClick && (event.key === 'Enter' || event.key === ' ')) {
        event.preventDefault();
        props.onClick(event);

        return false;
      }
    },
    [props.onClick],
  );
  const interactive = props.editable || props.onClick;

  return sstyled(props.styles)(
    <STag
      render={TagContainer}
      tag='li'
      onKeyDown={onKeyDown}
      interactive={interactive}
    />,
  );
}
function InputTagContainerTag(
  props: Intergalactic.InternalTypings.InferChildComponentProps<NSInputTags.Tag.Text.Component, typeof InputTagsRoot, 'TagText'>,
) {
  const STag = Root;
  const { getI18nText } = props;

  const ref = React.useRef<HTMLElement>();

  React.useEffect(() => {
    if (
      ref.current instanceof HTMLButtonElement ||
      ref.current?.getAttribute('role') === 'button'
    ) {
      ref.current.setAttribute('aria-describedby', `${props.uid}-description`);
    } else {
      ref.current?.removeAttribute('aria-describedby');
    }
  }, [ref.current, props.uid]);

  return sstyled(props.styles)(
    <>
      <Portal>
        <ScreenReaderOnly id={`${props.uid}-description`} aria-hidden='true'>
          {getI18nText('pressEnterToEdit')}
        </ScreenReaderOnly>
      </Portal>
      <STag render={TagContainer.Tag} ref={ref} />
    </>,
  );
}

function TagContainerTextContent(
  props: Intergalactic.InternalTypings.InferComponentProps<NSInputTags.Tag.Text.Content.Component>,
) {
  return sstyled(props.styles)(<Root render={Tag.Text} />);
}

function TagCloseButton(
  props: Intergalactic.InternalTypings.InferComponentProps<NSInputTags.Tag.Close.Component>,
) {
  const STagContainerClose = Root;
  return sstyled(props.styles)(<STagContainerClose render={TagContainer.Close} />);
}

/**
 * InputTags
 *
 * {@link https://developer.semrush.com/intergalactic/components/input-tags/input-tags-api/|API} | {@link https://developer.semrush.com/intergalactic/components/input-tags/input-tags-code/|Examples}
 */
const InputTags = createComponent<
  NSInputTags.Component,
  typeof InputTagsRoot
>(InputTagsRoot, {
  Value,
  TagsContainer: InputTagsContainer,
  Tag: [
    InputTagContainer,
    {
      Text: [InputTagContainerTag, { Content: TagContainerTextContent }],
      Close: TagCloseButton,
      Addon: TagContainer.Tag.Addon,
      Circle: TagContainer.Circle,
    },
  ],
});

export default InputTags;
