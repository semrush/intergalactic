import React from 'react';
import { Component, sstyled, Root } from '@semcore/core';
import { Box } from '@semcore/flex-box';

import style from './inputField.shadow.css';
import { PopperContext } from '@semcore/popper';
import Tooltip from '@semcore/tooltip';
import { InputFieldProps, ErrorItem } from './InputField.types';
import { extractAriaProps } from '@semcore/core/lib/utils/ariaProps';
import uniqueIDEnhancement from '@semcore/core/lib/utils/uniqueID';
import DOMPurify from 'dompurify';

type IndexKeys = 'keyboardLineIndex' | 'mouseLineIndex';

type State = {
  [key in IndexKeys]: number;
} & {
  visibleErrorPopper: boolean;
};

class InputField<T extends string | string[]> extends Component<
  InputFieldProps<T>,
  {},
  State,
  typeof InputField.enhance
> {
  static displayName = 'Textarea';
  static style = style;

  static enhance = [uniqueIDEnhancement()] as const;

  static defaultProps = {
    defaultValue: '',
    size: 'm',
    state: 'normal',
    minRows: 2,
    maxRows: 10,
    defaultShowErrors: false,
    defaultErrorIndex: -1,
    defaultLinesCount: 0,
  };

  delimiter = '\n';
  skipEmptyLines = true;
  emptyLineValue = '&#xfeff;';
  spaceLineValue = '&nbsp;';

  containerRef = React.createRef<HTMLDivElement>();
  textarea: HTMLDivElement;

  popper: PopperContext['popper'] | null = null;
  setPopperTrigger: PopperContext['setTrigger'] | null = null;

  errorByInteraction: 'keyboard' | 'mouse' | null = null;

  changeTriggerTimeout = 0;
  isScrolling = false;
  scrollingTimeout = 0;

  toggleErrorsPopperTimeout = 0;

  isFocusing = false;

  linesCountTimeout = 0;

  state = {
    visibleErrorPopper: false,
    keyboardLineIndex: -1,
    mouseLineIndex: -1,
  };

  constructor(props: InputFieldProps<T>) {
    super(props);

    this.handlePaste = this.handlePaste.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.handleSelectAll = this.handleSelectAll.bind(this);

    this.textarea = this.createContentEditableElement(props);
  }

  uncontrolledProps() {
    return {
      value: null,
      linesCount: null,
      errorIndex: null,
    };
  }

  componentDidMount() {
    this.containerRef.current?.append(this.textarea);

    this.handleValueOutChange();
  }

  componentDidUpdate(prevProps: InputFieldProps<T>, prevState: State): void {
    const {
      value,
      errors,
      errorIndex,
      showErrors,
      disabled,
      readonly,
      highlightErrorIndex,
      lineProcessing,
      ['aria-describedby']: ariaDescribedby = '',
    } = this.props;

    if (prevProps.value !== value) {
      const currentValue = this.getValues().join(this.delimiter);
      if (
        typeof value === 'string'
          ? value !== currentValue
          : value.join(this.delimiter) !== currentValue
      ) {
        this.handleValueOutChange();
      }
    }

    if (prevProps.showErrors !== showErrors || prevProps.errors.length !== errors.length) {
      this.toggleAriaInvalid(showErrors, errors.length);

      if (showErrors === false) {
        this.textarea.setAttribute('aria-describedby', ariaDescribedby);
      }
    }

    if (prevProps.errorIndex !== errorIndex && highlightErrorIndex) {
      this.handleChangeErrorIndex(errorIndex);
    }

    if (prevProps.disabled !== disabled || prevProps.readonly !== readonly) {
      if (this.isDisabled) {
        this.textarea.setAttribute('contenteditable', 'false');
        this.removeEventListeners(this.textarea);
      } else {
        this.textarea.setAttribute('contenteditable', 'true');
        this.addEventListeners(this.textarea);
      }

      if (disabled) {
        this.textarea.setAttribute('tabindex', '-1');
      } else {
        this.textarea.setAttribute('tabindex', '0');
      }
    }

    const { keyboardLineIndex } = this.state;

    if (prevState.keyboardLineIndex !== -1 && prevState.keyboardLineIndex !== keyboardLineIndex) {
      if (lineProcessing) {
        const lines = this.getValues();
        const newValue = lineProcessing(lines[prevState.keyboardLineIndex] ?? '', lines);
        const newValueTextNode = document.createTextNode(newValue);
        const paragraph = this.textarea.childNodes.item(prevState.keyboardLineIndex);

        if (paragraph instanceof HTMLParagraphElement) {
          if (newValue === '') {
            paragraph.innerHTML = this.emptyLineValue;
          } else {
            paragraph.replaceChild(newValueTextNode, paragraph.childNodes.item(0));
          }
        }

        this.validateLine(paragraph);

        setTimeout(() => {
          const newNode = this.textarea.childNodes.item(keyboardLineIndex);
          if (newNode) {
            this.setErrorIndex(newNode);
          }
        }, 0); // need this timeout to update errorIndex to the new (usually empty) line
      }

      if (!showErrors) {
        this.recalculateErrors();
      }
      this.recalculateLinesCount();
      this.asProps.onChangeLineIndex(keyboardLineIndex);
    }
  }

  componentWillUnmount() {
    this.removeEventListeners(this.textarea);
  }

  get isDisabled(): boolean {
    const { disabled, readonly } = this.asProps;

    return Boolean(disabled || readonly);
  }

  get popperDescribedId() {
    const { uid } = this.asProps;
    return `bulk-textarea-${uid}-popper-describedby`;
  }

  get errorMessage() {
    const { errors, errorIndex, commonErrorMessage, prevError } = this.asProps;
    const { mouseLineIndex, keyboardLineIndex } = this.state;
    const currentLineIndex =
      this.errorByInteraction === 'keyboard'
        ? keyboardLineIndex
        : this.errorByInteraction === 'mouse'
        ? mouseLineIndex
        : -1;
    let errorItem: ErrorItem | undefined = errors[errorIndex];

    if (currentLineIndex !== -1) {
      errorItem = errors.find((e) => e?.lineIndex === currentLineIndex);
    }

    const errorMessage =
      errors.length === 0 && !prevError // show any errors only if there are at least one error
        ? null
        : errorItem?.errorMessage ??
          (commonErrorMessage === '' || errors.length === 0
            ? prevError?.errorMessage
            : commonErrorMessage);
    const isCommonError =
      !errorItem?.errorMessage &&
      (commonErrorMessage === '' || errors.length === 0 ? !prevError?.errorMessage : true);

    return {
      errorMessage,
      isCommonError,
    };
  }

  createContentEditableElement(props: InputFieldProps<T>) {
    const textarea = document.createElement('div');
    textarea.setAttribute('contentEditable', props.disabled || props.readonly ? 'false' : 'true');
    textarea.setAttribute('role', 'textbox');
    textarea.setAttribute('classname', 'editable');

    if (props.id) {
      textarea.setAttribute('id', props.id);
    }
    if (props.placeholder) {
      textarea.setAttribute('placeholder', props.placeholder);
    }
    const { extractedAriaProps } = extractAriaProps(props);
    for (const key in extractedAriaProps) {
      const ariaProp: string | undefined = (props as any)[key];
      if (ariaProp) {
        textarea.setAttribute(key, ariaProp);
      }
    }

    if (!props.disabled) {
      textarea.setAttribute('tabIndex', '0');
    } else {
      textarea.setAttribute('tabIndex', '-1');
    }

    if (!props.disabled && !props.readonly) {
      this.addEventListeners(textarea);
    } else {
      textarea.addEventListener('keydown', this.handleSelectAll.bind(this));
    }

    return textarea;
  }

  handleValueOutChange() {
    const { value, onChangeLinesCount } = this.props;

    if (value === '') {
      this.textarea.textContent = '';
      onChangeLinesCount(0);
    } else {
      const listOfNodes = this.prepareNodesForPaste(value);

      this.textarea.replaceChildren(...listOfNodes);

      this.recalculateLinesCount();
      this.recalculateErrors();
    }
  }

  handleScroll(): void {
    if (this.scrollingTimeout) {
      clearTimeout(this.scrollingTimeout);
    }

    this.isScrolling = true;

    this.scrollingTimeout = window.setTimeout(() => {
      this.isScrolling = false;
    }, 50);
  }

  handleMouseDown(event: MouseEvent): void {
    const element = event.target;

    if (element instanceof HTMLElement) {
      // we need to change keyboardLineIndex, because the caret in real on that current row
      this.toggleErrorsPopper('keyboardLineIndex', element);

      this.setErrorIndex(element);
    }
  }

  handleMouseMove(event: MouseEvent): void {
    this.errorByInteraction = 'mouse';
    const element = event.target;

    if (element !== this.textarea) {
      if (
        this.isFocusing ||
        (element instanceof HTMLElement && element.getAttribute('aria-invalid') === 'true')
      ) {
        this.toggleErrorsPopper('mouseLineIndex', element);
      } else {
        this.setState({ visibleErrorPopper: false });
      }
    }
  }

  handleMouseLeave(event: MouseEvent): void {
    if (this.changeTriggerTimeout) {
      clearTimeout(this.changeTriggerTimeout);
    }

    if (this.isFocusing) {
      this.errorByInteraction = 'keyboard';
      const rowNode = this.getNodeFromSelection();

      this.toggleErrorsPopper('keyboardLineIndex', rowNode, 0);
      this.setState({ mouseLineIndex: -1 });
    } else {
      this.setState({ visibleErrorPopper: false });
    }
  }

  handlePaste(event: ClipboardEvent) {
    event.preventDefault();
    const { validateOn } = this.asProps;
    const value = event.clipboardData?.getData('text/plain');
    const listOfNodes = value ? this.prepareNodesForPaste(value) : [];

    if (listOfNodes.length === 0) return;

    const selection = document.getSelection();

    if (selection?.anchorNode && selection?.focusNode) {
      const anchorOffset = selection.anchorOffset;
      const focusOffset = selection.focusOffset;
      const documentPosition = selection.anchorNode.compareDocumentPosition(selection.focusNode);
      const direction = this.getSelectionDirection();

      const anchorElement = direction === 'forward' ? selection.anchorNode : selection.focusNode;
      const focusElement = direction === 'forward' ? selection.focusNode : selection.anchorNode;
      const fromOffset = direction === 'forward' ? anchorOffset : focusOffset;
      const toOffset = direction === 'forward' ? focusOffset : anchorOffset;
      const anchorNode =
        anchorElement instanceof Text ? anchorElement.parentElement : anchorElement;
      const focusNode = focusElement instanceof Text ? focusElement.parentElement : focusElement;

      let textNode: ChildNode | null = null;
      let position: number | null = null;

      if (focusElement === this.textarea) {
        this.textarea.replaceChildren(...listOfNodes);

        const lastNodeToInsert = listOfNodes[listOfNodes.length - 1];
        textNode = lastNodeToInsert.childNodes.item(0);
        position = (lastNodeToInsert.textContent ?? '').length;
      } else if (
        focusNode instanceof HTMLParagraphElement &&
        anchorNode instanceof HTMLParagraphElement
      ) {
        const before = anchorNode?.textContent?.substring(0, fromOffset) ?? '';
        const after = focusNode?.textContent?.substring(toOffset) ?? '';

        const noEmptyLineBefore = before.trim() === '' ? '' : before;
        const noEmptyLineAfter = after.trim() === '' ? '' : after;

        selection.deleteFromDocument();

        if (documentPosition !== 0) {
          this.textarea.removeChild(focusNode);
        }

        const firstNodeToInsert = listOfNodes.splice(0, 1)[0];
        const lastNodeToInsert = listOfNodes[listOfNodes.length - 1];

        anchorNode.textContent = noEmptyLineBefore + firstNodeToInsert?.textContent ?? '';

        anchorNode.after(...listOfNodes);

        if (lastNodeToInsert) {
          lastNodeToInsert.textContent = (lastNodeToInsert.textContent ?? '') + noEmptyLineAfter;
          textNode = lastNodeToInsert.childNodes.item(0);
          position = (lastNodeToInsert.textContent ?? '').length;

          this.validateLine(lastNodeToInsert);
          this.setErrorIndex(lastNodeToInsert);
        } else {
          position = (anchorNode.textContent ?? '').length;
          anchorNode.textContent = (anchorNode.textContent ?? '') + noEmptyLineAfter;
          textNode = anchorNode.childNodes.item(0);

          this.validateLine(anchorNode);
          this.setErrorIndex(anchorNode);
        }
      }

      if (textNode instanceof Text) {
        this.setSelection(textNode, position ?? 1, position ?? 1);
        this.toggleErrorsPopper('keyboardLineIndex', textNode.parentNode);
      } else {
        console.warn('incorrect child type', textNode, textNode?.parentNode);
      }
    }

    this.recalculateLinesCount();

    if (validateOn.includes('paste') || this.asProps.showErrors) {
      this.recalculateErrors();
    }
  }

  handleChange(event: Event) {
    const target = event.target;
    if (target instanceof HTMLDivElement && event instanceof InputEvent) {
      const nodes = this.textarea.childNodes;
      const firstNode = nodes.item(0);
      const secondNode = nodes.item(1);
      const selection = document.getSelection();

      if (firstNode instanceof Text) {
        const nodeText = firstNode.textContent ?? '';
        const firstRow = document.createElement('p');
        const text = document.createTextNode(nodeText);
        firstRow.append(text);
        firstNode.replaceWith(firstRow);

        selection?.setPosition(firstRow, nodeText.length);
      } else if (!firstNode || (firstNode instanceof HTMLBRElement && nodes.length === 1)) {
        this.textarea.textContent = '';
        this.setState({ keyboardLineIndex: 0 });
      } else if (firstNode instanceof HTMLParagraphElement && !firstNode.textContent?.trim()) {
        if (nodes.length <= 1 || secondNode instanceof HTMLBRElement) {
          this.textarea.textContent = '';
          this.setState({ keyboardLineIndex: 0 });
        }
      }

      let maxDeep = 10;
      let rowNode = selection?.focusNode;

      while (rowNode?.parentNode !== this.textarea && maxDeep > 0) {
        rowNode = rowNode?.parentNode;
        maxDeep--;
      }

      if (rowNode instanceof HTMLParagraphElement) {
        const childNodes = rowNode.childNodes;
        const textContent = rowNode.textContent ?? '';

        if (childNodes.length > 1) {
          const offset = childNodes.item(0).textContent?.length;

          rowNode.textContent = textContent;

          if (offset) {
            this.setSelection(rowNode.childNodes.item(0), offset, offset);
          }
        }

        if (textContent.length > 0) {
          const firstSymbol = textContent.at(0);
          const lastSymbol = textContent.at(textContent.length - 1);

          if (
            firstSymbol === this.getEmptyParagraph().textContent ||
            lastSymbol === this.getEmptyParagraph().textContent
          ) {
            let offset: number | null = null;
            if (firstSymbol === this.getEmptyParagraph().textContent) {
              rowNode.textContent = textContent.substring(1);
              offset =
                event.inputType === 'deleteContentBackward' ||
                event.inputType === 'deleteContentForward'
                  ? 0
                  : rowNode.textContent.length;
            } else if (lastSymbol === this.getEmptyParagraph().textContent) {
              rowNode.textContent = textContent.substring(0, textContent.length - 1);
              offset = rowNode.textContent.length;
            }

            if (offset) {
              this.setSelection(rowNode.childNodes.item(0), offset, offset);
            }
          }
        } else if (childNodes.length === 1 && childNodes[0] instanceof HTMLBRElement) {
          rowNode.innerHTML = this.emptyLineValue;
        }

        const { errors, showErrors } = this.asProps;
        const isValid = this.validateLine(rowNode);
        this.recalculateErrors();
        this.setErrorIndex(rowNode);

        if (!isValid && showErrors) {
          this.toggleErrorsPopper('keyboardLineIndex', rowNode, 0);
        }

        const trigger =
          !isValid || (isValid && errors.length === 1 && errors[0].lineNode === rowNode)
            ? rowNode
            : this.textarea;

        if (showErrors && this.popper?.current.state.elements.reference !== trigger) {
          if (this.shouldChangePopperTrigger(trigger)) {
            this.setPopperTrigger?.(trigger);
          } else {
            this.setState({ visibleErrorPopper: false });
          }
        }
      } else if (rowNode === null) {
        this.setPopperTrigger?.(this.textarea);

        if (selection?.focusNode === this.textarea && this.textarea.childNodes.length > 1) {
          const nodeIndex = selection.focusOffset;
          const emptyParagraph = this.textarea.childNodes.item(nodeIndex - 1);
          const emptyBr = this.textarea.childNodes.item(nodeIndex);

          this.textarea.removeChild(emptyBr);

          if (emptyParagraph instanceof HTMLParagraphElement) {
            emptyParagraph.innerHTML = this.emptyLineValue;
          }

          if (emptyParagraph) {
            this.setSelection(emptyParagraph, 0, 0);
          }
        } else {
          this.setSelection(this.textarea, 0, 0);
        }
      }

      this.recalculateLinesCount();
    }
  }

  handleFocus(event: FocusEvent) {
    this.isFocusing = true;
    this.errorByInteraction = 'keyboard';

    if (this.asProps.showErrors) {
      this.toggleErrorsPopperByKeyboard(150);
    } else {
      this.toggleErrorsPopper('keyboardLineIndex', this.textarea);
    }
  }

  handleBlur(event: Event) {
    this.isFocusing = false;
    this.setState({ visibleErrorPopper: false });

    const { validateOn, onBlur, value } = this.asProps;

    if (validateOn.includes('blur')) {
      this.recalculateErrors();
    }

    const valueToChange =
      typeof value === 'string' ? this.getValues().join(this.delimiter) : this.getValues();

    onBlur(valueToChange as T, event);

    setTimeout(() => {
      this.setState({ keyboardLineIndex: -1 });
    }, 200);
  }

  handleKeyDown(event: KeyboardEvent) {
    this.errorByInteraction = 'keyboard';
    const { linesDelimiters } = this.asProps;

    const currentNode = this.getNodeFromSelection();

    if (event.key === 'Enter' || linesDelimiters?.includes(event.key)) {
      if (currentNode === this.textarea) {
        event.preventDefault();
      }
      if (currentNode instanceof HTMLParagraphElement) {
        const currentRowValue = currentNode.textContent?.trim();

        if (!currentRowValue) {
          event.preventDefault();
        } else {
          event.preventDefault();
          const selection = document.getSelection();
          const selectionNode =
            selection?.focusNode instanceof Text
              ? selection.focusNode
              : selection?.focusNode?.childNodes.item(0);
          const selectionOffset = selection?.focusOffset;

          let newRowValue = '';

          if (
            selectionNode instanceof Text &&
            selectionOffset !== undefined &&
            selectionOffset !== selectionNode.textContent?.length
          ) {
            newRowValue =
              selectionNode.textContent?.substring(selectionOffset) ?? this.emptyLineValue;

            if (selectionNode.textContent) {
              selectionNode.textContent = selectionNode.textContent.substring(0, selectionOffset);
            }
          }

          if (currentNode.textContent?.trim() === '') {
            currentNode.innerHTML = this.emptyLineValue;
          }

          const row = document.createElement('p');
          if (newRowValue) {
            row.textContent = newRowValue;
          } else {
            row.innerHTML = this.emptyLineValue;
          }
          currentNode.after(row);

          this.setSelection(row, 0, 0);

          this.validateLine(currentNode);
          this.validateLine(row);
          if (currentNode.previousSibling) {
            this.validateLine(currentNode.previousSibling);
          }
          this.setErrorIndex(row);

          if (row.textContent?.trim() !== '') {
            this.recalculateLinesCount();
          }

          setTimeout(() => {
            this.recalculateErrors();
          }, 0);

          this.toggleErrorsPopperByKeyboard(0);
        }
      }
    } else if (
      event.key === 'ArrowDown' ||
      event.key === 'ArrowUp' ||
      event.key === 'ArrowLeft' ||
      event.key === 'ArrowRight'
    ) {
      if (currentNode instanceof HTMLParagraphElement) {
        this.handleCursorMovement(currentNode, event);
      }
      this.toggleErrorsPopperByKeyboard(200);
    } else if (this.isDeleteKey(event) && currentNode instanceof HTMLParagraphElement) {
      if (currentNode.textContent?.trim() === '' && !this.isRangeSelection()) {
        // Backspace on empty row
        const prevNode = currentNode.previousSibling;
        if (prevNode instanceof HTMLParagraphElement) {
          event.preventDefault();
          this.textarea.removeChild(currentNode);
          this.toggleErrorsPopperByKeyboard(0);

          if (
            prevNode.textContent?.trim() === '' &&
            prevNode.previousSibling === null &&
            this.textarea.childNodes.length === 1
          ) {
            this.textarea.textContent = '';
            this.setSelection(this.textarea, 0, 0);
          } else {
            if (prevNode instanceof HTMLParagraphElement) {
              const text = prevNode.childNodes.item(0);
              const offset = text.textContent?.length ?? 0;
              this.setSelection(text, offset, offset);
            } else {
              console.warn('incorrect prevNode type', prevNode);
            }
          }

          setTimeout(() => {
            this.recalculateErrors();
          }, 0);

          this.toggleErrorsPopperByKeyboard(0);
        }
      } else if (this.isRangeSelection()) {
        const selection = document.getSelection();

        const direction = this.getSelectionDirection();
        const anchorElement =
          direction === 'backward' ? selection?.focusNode : selection?.anchorNode;
        const focusElement =
          direction === 'backward' ? selection?.anchorNode : selection?.focusNode;
        const anchorOffset =
          direction === 'backward' ? selection?.focusOffset : selection?.anchorOffset;
        const focusOffset =
          direction === 'backward' ? selection?.anchorOffset : selection?.focusOffset;

        // Backspace on selected full row
        if (
          anchorElement === focusElement &&
          anchorOffset === 0 &&
          ((focusElement === currentNode && focusOffset === 1) ||
            focusOffset === currentNode.textContent?.length)
        ) {
          event.preventDefault();

          const anchorParagraph = anchorElement?.parentElement;
          const focusParagraph = focusElement?.parentElement;
          const childNodes = this.textarea.childNodes;
          if (
            anchorParagraph === childNodes.item(0) &&
            focusParagraph === childNodes.item(childNodes.length - 1)
          ) {
            this.textarea.textContent = '';
            this.setSelection(this.textarea, 0, 0);
          } else {
            currentNode.innerHTML = this.emptyLineValue;
            this.validateLine(currentNode);
          }

          this.setErrorIndex(currentNode);
          this.recalculateLinesCount();

          setTimeout(() => {
            this.recalculateErrors();
          }, 0);

          this.toggleErrorsPopperByKeyboard(0);
        }
        // Backspace on selected few full rows
        else if (
          focusElement !== anchorElement &&
          focusElement instanceof Text &&
          anchorElement instanceof Text &&
          focusElement?.textContent === focusElement?.parentNode?.textContent &&
          anchorElement?.textContent === anchorElement?.parentNode?.textContent &&
          anchorOffset === 0 &&
          focusOffset === focusElement?.parentNode?.textContent?.length
        ) {
          event.preventDefault();

          const paragraphs = Array.from(this.textarea.children);
          const anchorParagraph = anchorElement.parentElement;
          const focusParagraph = focusElement.parentElement;
          const childNodes = this.textarea.childNodes;

          if (
            anchorParagraph === childNodes.item(0) &&
            focusParagraph === childNodes.item(childNodes.length - 1)
          ) {
            this.textarea.textContent = '';
            this.setSelection(this.textarea, 0, 0);
          } else {
            let isCleaning = false;

            for (const paragraph of paragraphs) {
              if (paragraph === anchorParagraph || isCleaning) {
                isCleaning = true;

                if (paragraph === focusParagraph) {
                  focusParagraph.innerHTML = this.emptyLineValue;
                  this.setSelection(focusParagraph, 0, 0);
                  break;
                } else {
                  this.textarea.removeChild(paragraph);
                }
              }
            }

            this.validateLine(currentNode);
          }

          this.setErrorIndex(currentNode);
          this.recalculateLinesCount();

          setTimeout(() => {
            this.recalculateErrors();
          }, 0);

          this.toggleErrorsPopperByKeyboard(0);
        }
      }
    } else if (event.key === 'z' && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
    }
  }

  render() {
    const SInputField = Root;
    const { styles, showErrors } = this.asProps;
    const { visibleErrorPopper } = this.state;

    const { errorMessage, isCommonError } = this.errorMessage;
    const visibleErrorTooltip =
      showErrors && visibleErrorPopper && Boolean(errorMessage) && !this.isDisabled;

    const { __excludeProps } = extractAriaProps(this.asProps);

    return sstyled(styles)(
      <>
        <Tooltip
          interaction={'none'}
          placement={isCommonError ? 'right-start' : 'right'}
          visible={visibleErrorTooltip}
          theme={'warning'}
          offset={isCommonError ? undefined : [0, 26]}
          preventOverflow={{
            boundary: this.containerRef.current ?? undefined,
            tether: false,
          }}
        >
          {({ popper, setTrigger }) => {
            if (!this.popper) {
              this.setPopperTrigger = setTrigger;
              // @ts-ignore
              this.popper = popper;
            }

            return <Tooltip.Popper id={this.popperDescribedId}>{errorMessage}</Tooltip.Popper>;
          }}
        </Tooltip>
        <SInputField
          render={Box}
          ref={this.containerRef}
          __excludeProps={['onBlur', 'value', ...__excludeProps]}
        />
      </>,
    );
  }

  private prepareNodesForPaste(value: string | string[]): HTMLParagraphElement[] {
    const listOfNodes: HTMLParagraphElement[] = [];
    const { pasteProps } = this.asProps;
    const lineProcessing =
      pasteProps?.lineProcessing ??
      ((line: string) => {
        const trimmedLine = line.trim();
        return trimmedLine === '' ? line : trimmedLine;
      });
    const skipEmptyLines = pasteProps?.skipEmptyLines ?? this.skipEmptyLines;
    const delimiter = pasteProps?.delimiter ?? this.delimiter;
    const lines: string[] = Array.isArray(value) ? value : value.split(delimiter);

    lines.forEach((line, index) => {
      const preparedLine = lineProcessing(line, index, lines.length);

      if ((preparedLine === '' && skipEmptyLines === false) || preparedLine !== '') {
        const node = document.createElement('p');

        if (preparedLine === '') {
          node.innerHTML = this.emptyLineValue;
        } else if (preparedLine.trim() === '') {
          const allSpacesRegExp = new RegExp('\\s', 'g');
          node.innerHTML = DOMPurify.sanitize(
            preparedLine.replace(allSpacesRegExp, this.spaceLineValue),
          );
        } else {
          node.append(document.createTextNode(preparedLine));
        }

        listOfNodes.push(node);

        this.validateLine(node);
      }
    });

    return listOfNodes;
  }

  private recalculateErrors(): void {
    const errors: ErrorItem[] = [];

    this.textarea.childNodes.forEach((node, index) => {
      if (node instanceof HTMLParagraphElement && node.getAttribute('aria-invalid') === 'true') {
        const errorItem = {
          errorMessage: node.dataset.errormessage ?? '',
          lineNode: node,
          lineIndex: index,
        };
        errors.push(errorItem);
      }
    });

    this.asProps.onErrorsChange(errors);
  }

  private recalculateLinesCount(): void {
    if (this.linesCountTimeout) {
      clearTimeout(this.linesCountTimeout);
    }

    this.linesCountTimeout = window.setTimeout(() => {
      let lines = 0;
      const { maxLines, linesCount } = this.asProps;

      this.textarea.childNodes.forEach((node, index) => {
        if (node instanceof HTMLParagraphElement) {
          node.dataset.overMaxRows = 'false';

          if (
            node.textContent !== this.getEmptyParagraph().textContent &&
            node.textContent !== ''
          ) {
            lines++;

            if (lines > maxLines) {
              node.dataset.overMaxRows = 'true';
            }
          }
        }
      });

      if (linesCount !== lines) {
        this.asProps.onChangeLinesCount(lines);
      }
    }, 100);
  }

  private getValues(): string[] {
    const values: string[] = [];
    this.textarea.childNodes.forEach((node) => {
      if (node.textContent?.trim() === '') {
        values.push('');
      } else {
        values.push(node.textContent ?? '');
      }
    });

    return values;
  }

  private shouldChangePopperTrigger(node: HTMLElement): boolean {
    return (
      this.textarea !== node || (this.textarea === node && Boolean(this.asProps.commonErrorMessage))
    );
  }

  private toggleErrorsPopperByKeyboard(timer: number) {
    if (this.toggleErrorsPopperTimeout) {
      clearTimeout(this.toggleErrorsPopperTimeout);
    }

    if (!this.isScrolling) {
      setTimeout(() => {
        const rowNode = this.getNodeFromSelection();

        this.toggleErrorsPopper('keyboardLineIndex', rowNode, timer);
      }, 0);
    } else {
      this.toggleErrorsPopperTimeout = window.setTimeout(() => {
        this.toggleErrorsPopperByKeyboard(timer);
      }, 50);
    }
  }

  private toggleErrorsPopper(key: IndexKeys, target?: unknown, timer?: number) {
    if (target instanceof HTMLDivElement || target instanceof HTMLParagraphElement) {
      if (this.changeTriggerTimeout) {
        clearTimeout(this.changeTriggerTimeout);
      }

      this.changeTriggerTimeout = window.setTimeout(() => {
        const targetElement = target === this.textarea ? this.getNodeFromSelection() : target;

        let lineIndex = -1;
        let isInvalidRow = false;

        if (targetElement instanceof HTMLParagraphElement) {
          isInvalidRow = targetElement.getAttribute('aria-invalid') === 'true';
          lineIndex = Array.from(this.textarea.childNodes).indexOf(targetElement);
        } else if (targetElement === this.textarea) {
          lineIndex = 0;
        }

        if (targetElement instanceof HTMLElement) {
          this.setState(
            (prevState) => {
              const newState: State = {
                visibleErrorPopper:
                  this.isFocusing && Boolean(this.asProps.commonErrorMessage) ? true : isInvalidRow,
                mouseLineIndex: prevState.mouseLineIndex,
                keyboardLineIndex: prevState.keyboardLineIndex,
              };

              if (this.isFocusing || (key === 'mouseLineIndex' && isInvalidRow)) {
                newState[key] = lineIndex;
              }

              return newState;
            },
            () => {
              this.errorByInteraction = key === 'mouseLineIndex' ? 'mouse' : 'keyboard';

              const trigger = isInvalidRow ? targetElement : this.textarea;

              if (this.shouldChangePopperTrigger(trigger)) {
                this.setPopperTrigger?.(trigger);

                this.forceUpdate();
              }
            },
          );
        }
      }, timer ?? 50);
    } else {
      this.setState({ visibleErrorPopper: false });
    }
  }

  private toggleAriaInvalid(showErrors: boolean, errorsLength: number): void {
    if (showErrors && errorsLength > 0) {
      this.textarea.setAttribute('aria-describedby', this.popperDescribedId);
      this.textarea.setAttribute('aria-invalid', 'true');
    } else {
      this.textarea.removeAttribute('aria-invalid');
      this.textarea.removeAttribute('aria-describedby');
    }
  }

  private handleChangeErrorIndex(errorIndex: number): void {
    const error: ErrorItem | undefined = this.asProps.errors[errorIndex];
    const childNodes = this.textarea.childNodes;

    const node = error ? error.lineNode ?? childNodes.item(error.lineIndex) : null;
    const selection = document.getSelection();

    if (selection && node instanceof HTMLParagraphElement) {
      this.setState({ visibleErrorPopper: false });

      setTimeout(() => {
        const text = node.childNodes.item(0);
        if (text instanceof Text) {
          this.setSelection(text, 0, text.length);
        } else {
          this.setSelection(node, 0, 1);
        }
      }, 150);
    }
  }

  private validateLine(node: Node): boolean {
    const { lineValidation } = this.asProps;
    if (lineValidation && node instanceof HTMLElement) {
      const { isValid, errorMessage } = lineValidation(node.textContent ?? '', this.getValues());

      if (!isValid) {
        node.setAttribute('aria-invalid', 'true');
        node.dataset.errormessage = errorMessage;
      } else {
        node.removeAttribute('aria-invalid');
        node.dataset.errormessage = undefined;
      }

      return isValid;
    }

    return true;
  }

  private setSelection(
    node: Node,
    start: number,
    end: number,
    scrollType: 'center' | 'nearest' = 'center',
  ): void {
    const selection = document.getSelection();
    const range = document.createRange();
    range.setStart(node, start);
    range.setEnd(node, end);

    selection?.removeAllRanges();
    selection?.addRange(range);

    const nodeToScroll = node instanceof Text ? node.parentNode : node;

    if (nodeToScroll instanceof HTMLElement) {
      nodeToScroll.scrollIntoView({
        block: scrollType,
        inline: scrollType,
        behavior: 'smooth',
      });
    }
  }

  private getNodeFromSelection(): Node | null {
    const selection = document.getSelection();

    const rowNode =
      selection?.focusNode instanceof Text ? selection.focusNode.parentNode : selection?.focusNode;

    return rowNode ?? null;
  }

  private handleCursorMovement(currentNode: HTMLParagraphElement, event: KeyboardEvent): void {
    let nextNode: ChildNode | null = null;

    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();
        nextNode = currentNode.previousSibling;
        break;
      case 'ArrowDown':
        event.preventDefault();
        nextNode = currentNode.nextSibling;
        break;
      case 'ArrowLeft': {
        if (currentNode.textContent === this.getEmptyParagraph().textContent) {
          event.preventDefault();
          nextNode = currentNode.previousSibling;
        }
        break;
      }
      case 'ArrowRight': {
        if (currentNode.textContent === this.getEmptyParagraph().textContent) {
          event.preventDefault();
          nextNode = currentNode.nextSibling;
        }
      }
    }

    if (nextNode instanceof HTMLParagraphElement) {
      const selection = document.getSelection();
      const firstNode = nextNode.childNodes.item(0);
      const nodeToSetSelection = firstNode instanceof Text ? firstNode : nextNode;
      const textNode = nextNode.textContent?.trim() ?? '';
      const currentOffset = selection?.focusOffset ?? 0;
      let offset = currentOffset <= textNode.length ? currentOffset : textNode.length;

      // it only works if node is empty, that's why here we could set 0 or node.length
      if (event.key === 'ArrowLeft') {
        offset = textNode.length;
      } else if (event.key === 'ArrowRight') {
        offset = 0;
      }

      this.setSelection(nodeToSetSelection, offset, offset, 'nearest');
    }
  }

  private setErrorIndex(nodeToCompare: Node): void {
    const errorIndex = Array.from(this.textarea.childNodes)
      .filter((node) => {
        return node instanceof Element && node.getAttribute('aria-invalid') === 'true';
      })
      .findIndex((node) => {
        return node === nodeToCompare;
      });

    this.handlers.errorIndex(errorIndex);
  }

  private isDeleteKey(event: KeyboardEvent): boolean {
    return event.key === 'Backspace' || (event.key === 'x' && (event.ctrlKey || event.metaKey));
  }

  private getEmptyParagraph() {
    const element = document.createElement('p');

    element.innerHTML = this.emptyLineValue;

    return element;
  }

  private addEventListeners(textarea: HTMLElement) {
    textarea.addEventListener('paste', this.handlePaste);
    textarea.addEventListener('input', this.handleChange);
    textarea.addEventListener('focus', this.handleFocus);
    textarea.addEventListener('blur', this.handleBlur);
    textarea.addEventListener('keydown', this.handleKeyDown);
    textarea.addEventListener('mousedown', this.handleMouseDown);
    textarea.addEventListener('mousemove', this.handleMouseMove);
    textarea.addEventListener('mouseleave', this.handleMouseLeave);
    textarea.addEventListener('scroll', this.handleScroll);

    textarea.removeEventListener('keydown', this.handleSelectAll);
  }
  private removeEventListeners(textarea: HTMLElement) {
    textarea.removeEventListener('paste', this.handlePaste);
    textarea.removeEventListener('input', this.handleChange);
    textarea.removeEventListener('focus', this.handleFocus);
    textarea.removeEventListener('blur', this.handleBlur);
    textarea.removeEventListener('keydown', this.handleKeyDown);
    textarea.removeEventListener('mousedown', this.handleMouseDown);
    textarea.removeEventListener('mousemove', this.handleMouseMove);
    textarea.removeEventListener('mouseleave', this.handleMouseLeave);
    textarea.removeEventListener('scroll', this.handleScroll);

    textarea.addEventListener('keydown', this.handleSelectAll);
  }

  private handleSelectAll(event: KeyboardEvent) {
    if (event.key === 'a' && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();

      const node = event.target;
      if (node instanceof HTMLElement && node === this.textarea) {
        this.setSelection(node, 0, node.childNodes.length);
      }
    }
  }

  private isRangeSelection(): boolean {
    const selection = document.getSelection();

    return (
      selection?.focusNode !== selection?.anchorNode ||
      selection?.focusOffset !== selection?.anchorOffset
    );
  }

  private getSelectionDirection(): 'forward' | 'backward' | null {
    const selection = document.getSelection();

    if (selection?.anchorNode && selection?.focusNode) {
      const documentPosition = selection.anchorNode.compareDocumentPosition(selection.focusNode);

      if (
        (documentPosition === 0 && selection.anchorOffset > selection.focusOffset) || // if nodes are the same
        documentPosition === Node.DOCUMENT_POSITION_PRECEDING
      ) {
        return 'backward';
      }

      return 'forward';
    }

    return null;
  }
}

export { InputField };
export type { InputFieldProps, ErrorItem };
