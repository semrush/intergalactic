import { Box } from '@semcore/base-components';
import type { PopperContext } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import { Component, sstyled, Root } from '@semcore/core';
import { extractAriaProps } from '@semcore/core/lib/utils/ariaProps';
import logger from '@semcore/core/lib/utils/logger';
import uniqueIDEnhancement from '@semcore/core/lib/utils/uniqueID';
import Tooltip from '@semcore/tooltip';
import DOMPurify from 'dompurify';
import React from 'react';

import type { HistoryState } from './History';
import { History } from './History';
import style from './inputField.shadow.css';
import type { BulkTextareaRootType } from '../../BulkTextarea';
import type { NSBulktextarea } from '../../BulkTextarea.types';

type Props<T extends string | string[]> = Intergalactic.InternalTypings.InferChildComponentProps<NSBulktextarea.InputField.Component<T>, BulkTextareaRootType, 'InputField'>;

class InputField<T extends string | string[]> extends Component<
  Props<T>,
  typeof InputField.enhance,
  NSBulktextarea.InputField.Handlers,
  {},
  NSBulktextarea.InputField.State,
  NSBulktextarea.InputField.DefaultProps
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
  emptyLineValueJs = '\uFEFF';
  spaceLineValue = '&nbsp;';

  containerRef = React.createRef<HTMLOListElement>();
  textarea: HTMLOListElement;

  popper: PopperContext['popper'] | null = null;
  setPopperTrigger: PopperContext['setTrigger'] | null = null;

  errorByInteraction: 'keyboard' | 'mouse' | null = null;

  changeTriggerTimeout = 0;
  isScrolling = false;
  scrollingTimeout = 0;

  toggleErrorsPopperTimeout = 0;

  isFocusing = false;

  linesCountTimeout = 0;

  observer: MutationObserver;

  history: History = new History();

  state = {
    visibleErrorPopper: false,
    keyboardLineIndex: -1,
    mouseLineIndex: -1,
  };

  constructor(props: Props<T>) {
    super(props);

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

    this.observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'characterData' || mutation.type === 'childList') {
          this.props.onImmediatelyChange?.(this.getValues(), this.textarea.textContent ?? '');
        }
      }
    });
  }

  uncontrolledProps() {
    return {
      value: null,
      linesCount: null,
      errorIndex: null,
    };
  }

  componentDidMount() {
    const { value, autoFocus, disabled } = this.asProps;

    this.textarea = this.createContentEditableElement(this.asProps);
    this.containerRef.current?.append(this.textarea);

    this.handleValueOutChange(value);

    const config = {
      childList: true,
      characterData: true,
      subtree: true,
    };

    if (this.props.onImmediatelyChange) {
      this.observer.observe(this.textarea, config);
    }

    if (autoFocus && !disabled) {
      /* Safari & Firefox may silently ignore programmatic focus calls with very short
        delays (<10ms). Using 10ms as a safe threshold based on observed behavior.
      */
      setTimeout(() => this.textarea.focus(), 10);
    }

    this.history.push(this.createHistoryState());
  }

  componentDidUpdate(prevProps: typeof this.asProps, prevState: typeof this.state): void {
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
          : value?.join(this.delimiter) !== currentValue
      ) {
        this.handleValueOutChange(value);
      }
    }

    if (prevProps.showErrors !== showErrors || prevProps.errors !== errors) {
      if (showErrors) {
        const errorsMap = new Map<number, NSBulktextarea.ErrorItem>();
        errors.forEach((error: NSBulktextarea.ErrorItem) => {
          errorsMap.set(error.lineIndex, error);
        });

        this.textarea.childNodes.forEach((node, index) => {
          if (node instanceof HTMLLIElement) {
            const errorItem = errorsMap.get(index);
            if (errorItem) {
              node.setAttribute('aria-invalid', 'true');
              node.dataset.errormessage = errorItem.errorMessage;
            } else {
              node.removeAttribute('aria-invalid');
              node.dataset.errormessage = undefined;
            }
          }
        });
      }

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

        if (paragraph instanceof HTMLLIElement) {
          if (newValue === '') {
            if (lines.length === 1) {
              this.textarea.textContent = '';
            } else {
              paragraph.innerHTML = this.emptyLineValue;
            }
          } else {
            paragraph.replaceChild(newValueTextNode, paragraph.childNodes.item(0));
          }

          this.validateLine(paragraph);
        }

        setTimeout(() => {
          const newNode = this.textarea.childNodes.item(keyboardLineIndex);
          if (newNode) {
            this.setErrorIndex(newNode);
          }
        }, 0); // need this timeout to update errorIndex to the new (usually empty) line
      }

      this.recalculateErrors();
      this.recalculateLinesCount();
      this.asProps.onChangeLineIndex();
    }
  }

  componentWillUnmount() {
    this.removeEventListeners(this.textarea);
    this.containerRef.current?.removeChild(this.textarea);

    this.observer.disconnect();
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
    let errorItem: NSBulktextarea.ErrorItem | undefined = errors[errorIndex];

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

  createContentEditableElement(props: Props<T>) {
    const textarea = document.createElement('ol');
    textarea.setAttribute('contentEditable', props.disabled || props.readonly ? 'false' : 'true');
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

    if (props.inputRef) {
      props.inputRef.current = textarea;
    }

    return textarea;
  }

  handleValueOutChange(value?: string | string[]) {
    const { onChangeLinesCount } = this.props;

    if (value === '' || value === undefined) {
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

  handleMouseLeave(): void {
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

  handleChange(event: InputEvent) {
    this.history.push(this.createHistoryState());
    switch (event.inputType) {
      case 'insertText': {
        this.insertText(event);
        break;
      }
      case 'insertFromPaste': {
        this.insertFromPaste(event);
        break;
      }
      case 'insertParagraph': {
        this.insertParagraph(event);
        break;
      }
      case 'deleteContentForward':
      case 'deleteContentBackward':
      case 'deleteByCut': {
        this.deleteText(event);
        break;
      }
      default: {
        logger.warn(true, `Unknown input type "${event.inputType}"`, event);
      }
    }

    this.recalculateLinesCount();

    return;
  }

  handleFocus() {
    this.isFocusing = true;
    this.errorByInteraction = 'keyboard';

    if (this.asProps.showErrors) {
      this.toggleErrorsPopperByKeyboard(150);
    } else {
      this.toggleErrorsPopper('keyboardLineIndex', this.textarea);
    }

    const lastRow = this.textarea.lastChild?.firstChild;
    if (lastRow instanceof Text) {
      this.setSelection(lastRow, lastRow.length, lastRow.length);
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
      if (document.activeElement !== this.textarea) {
        this.setState({ keyboardLineIndex: -1 });
      }
    }, 200);
  }

  handleKeyDown(event: KeyboardEvent) {
    this.errorByInteraction = 'keyboard';
    const currentNode = this.getNodeFromSelection();

    if (event.key === 'Tab' && currentNode instanceof HTMLLIElement) {
      this.validateLine(currentNode);
    }

    if (
      event.key === 'ArrowDown' ||
      event.key === 'ArrowUp' ||
      event.key === 'ArrowLeft' ||
      event.key === 'ArrowRight'
    ) {
      if (currentNode instanceof HTMLLIElement) {
        this.handleCursorMovement(currentNode, event);
      }
      this.toggleErrorsPopperByKeyboard(200);
    }

    if (event.key === 'z' && !event.shiftKey && (event.ctrlKey || event.metaKey)) {
      const data = this.history.undo(this.createHistoryState());

      if (data) {
        this.restoreHistoryState(data);
      }
    }

    if (((event.key === 'z' && event.shiftKey) || event.key === 'y') && (event.ctrlKey || event.metaKey)) {
      const data = this.history.redo(this.createHistoryState());

      if (data) {
        this.restoreHistoryState(data);
      }
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
          interaction='none'
          placement={isCommonError ? 'right-start' : 'right'}
          visible={visibleErrorTooltip}
          theme='warning'
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

  private insertText(event: InputEvent) {
    event.preventDefault();

    const data = event.data;
    const staticRange = event.getTargetRanges()?.[0];

    if (!data) {
      logger.warn(true, `No data in insertText event: `, event);
      return;
    }

    if (!staticRange) {
      logger.warn(true, `No staticRange in event: `, event);
      return;
    }

    if (this.asProps.linesDelimiters?.includes(data)) {
      this.insertParagraph(event);
      return;
    }

    const nodes = this.textarea.childNodes;

    if (nodes.length === 0) {
      const firstRow = document.createElement('li');
      const text = document.createTextNode(data);
      firstRow.append(text);
      this.textarea.append(firstRow);

      document.getSelection()?.setPosition(firstRow, data.length);

      this.validateLine(firstRow);
      this.setErrorIndex(firstRow);
    } else {
      const [startElement, endElement] = this.getRangeTextNodes(staticRange);
      const resultText = `${startElement.textContent.slice(0, staticRange.startOffset)}${data}${endElement.textContent.slice(staticRange.endOffset)}`;

      // we need to clear empty value in the line node, because this is unnecessary symbol in the next calculations
      startElement.textContent = startElement.textContent === this.emptyLineValueJs ? resultText.slice(0, -1) : resultText;

      document.getSelection()?.setPosition(startElement, staticRange.startOffset + 1);

      if (startElement.parentElement instanceof HTMLLIElement) {
        this.validateLine(startElement.parentElement);
        this.setErrorIndex(startElement.parentElement);
      }

      if (startElement !== endElement) {
        this.clearNodes(startElement, endElement);
      }
    }

    setTimeout(() => {
      this.recalculateErrors();
    }, 0);

    this.toggleErrorsPopperByKeyboard(0);
  }

  private insertParagraph(event: InputEvent) {
    event.preventDefault();

    const staticRange = event.getTargetRanges()?.[0];

    if (!staticRange) {
      logger.warn(true, `No staticRange in event: `, event);
      return;
    }

    const nodes = this.getRangeTextNodes(staticRange);

    let startElement = nodes[0];
    const endElement = nodes[1];
    const parent = startElement.parentElement;

    if (parent instanceof HTMLLIElement) {
      const currentLineText = startElement.textContent.slice(0, staticRange.startOffset);
      const newLineText = endElement.textContent.slice(staticRange.endOffset);

      startElement.textContent = currentLineText;
      if (startElement.textContent === '') {
        parent.innerHTML = this.emptyLineValue;
        startElement = parent.childNodes.item(0) as Text;
      }

      if (startElement !== endElement && endElement.parentElement) {
        this.clearNodes(startElement, endElement);
      }

      const row = document.createElement('li');
      if (newLineText === '') {
        row.innerHTML = this.emptyLineValue;
      } else {
        row.textContent = newLineText;
      }

      parent.after(row);

      this.setSelection(row, 0, 0);

      this.validateLine(parent);
      if (newLineText !== '') {
        this.validateLine(row);
      }

      this.setErrorIndex(parent);

      setTimeout(() => {
        this.recalculateErrors();
      }, 0);

      this.toggleErrorsPopperByKeyboard(0);
    } else {
      logger.warn(true, `Not texts in start/end`, { startElement, endElement });
    }
  }

  private deleteText(event: InputEvent) {
    event.preventDefault();
    const staticRange = event.getTargetRanges()?.[0];

    if (!staticRange) {
      logger.warn(true, `No staticRange in event: `, event);
      return;
    }

    const nodes = this.getRangeTextNodes(staticRange);

    let startElement = nodes[0];
    const endElement = nodes[1];
    const parent = startElement.parentElement;

    if (parent instanceof HTMLLIElement) {
      const resultText = `${startElement.textContent.slice(0, staticRange.startOffset)}${endElement.textContent === this.emptyLineValueJs ? '' : endElement.textContent.slice(staticRange.endOffset)}`;

      const next = parent.nextSibling;
      if (resultText === '' && event.inputType === 'deleteContentForward' && endElement.textContent === this.emptyLineValueJs && next) {
        this.textarea.removeChild(parent);
        document.getSelection()?.setPosition(next, 0);
      } else {
        if (resultText === '') {
          parent.innerHTML = this.emptyLineValue;
          startElement = parent.childNodes.item(0) as Text;
        } else {
          startElement.textContent = resultText;
        }

        document.getSelection()?.setPosition(startElement, staticRange.startOffset);
      }

      this.validateLine(parent);
      if (startElement !== endElement && endElement.parentElement) {
        this.clearNodes(startElement, endElement);
      }

      if (resultText === '' && this.textarea.childNodes.length <= 1) {
        this.textarea.innerHTML = '';
      }

      this.setErrorIndex(parent);

      setTimeout(() => {
        this.recalculateErrors();
      }, 0);

      this.toggleErrorsPopperByKeyboard(0);
    }
  }

  private clearNodes(startElement: Node, endElement: Node) {
    const nodes = Array.from(this.textarea.childNodes);

    let forClear = false;
    for (const node of nodes) {
      if (forClear) {
        this.textarea.removeChild(node);
      }

      if (node === (endElement instanceof HTMLLIElement ? endElement : endElement.parentElement)) {
        forClear = false;
        break;
      }

      if (node === startElement.parentElement) {
        forClear = true;
      }
    }
  }

  private insertFromPaste(event: InputEvent) {
    event.preventDefault();
    const { validateOn } = this.asProps;
    const value = event.dataTransfer?.getData('text/plain');
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
        focusNode instanceof HTMLLIElement &&
        anchorNode instanceof HTMLLIElement
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

        anchorNode.textContent = noEmptyLineBefore + (firstNodeToInsert?.textContent ?? '');

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
        // eslint-disable-next-line no-console
        console.warn('incorrect child type', textNode, textNode?.parentNode);
      }
    }

    this.recalculateLinesCount();

    if (validateOn.includes('paste') || this.asProps.showErrors) {
      this.recalculateErrors();
    }
  }

  private getRangeTextNodes(range: StaticRange): [Text, Text] {
    const startElement = this.getTextNode(range.startContainer);
    const endElement = this.getTextNode(range.endContainer);

    return [startElement, endElement];
  }

  private getTextNode(node: Node): Text {
    if (node instanceof Text) {
      return node;
    }
    if (node instanceof HTMLLIElement) {
      const text = node.firstChild;
      if (text instanceof Text) {
        return text;
      }
    }
    throw new Error(`Unknown node element "${node}"`);
  }

  private createHistoryState(): HistoryState {
    const lines: string[] = [];
    const historySelection = {
      startLine: -1,
      startOffset: -1,
      endLine: -1,
      endOffset: -1,
    };

    const selection = document.getSelection();
    const direction = this.getSelectionDirection();
    const anchorElement = direction === 'backward' ? selection?.focusNode : selection?.anchorNode;
    const focusElement = direction === 'backward' ? selection?.anchorNode : selection?.focusNode;
    const anchorOffset = direction === 'backward' ? selection?.focusOffset : selection?.anchorOffset;
    const focusOffset = direction === 'backward' ? selection?.anchorOffset : selection?.focusOffset;

    this.textarea.childNodes.forEach((node, index) => {
      if (node.textContent === this.emptyLineValueJs) {
        lines.push('');
      } else {
        lines.push(node.textContent ?? '');
      }
      if ((node === anchorElement || node === anchorElement?.parentElement) && anchorOffset !== undefined) {
        historySelection.startLine = index;
        historySelection.startOffset = anchorOffset;
      }
      if ((node === focusElement || node === focusElement?.parentElement) && focusOffset !== undefined) {
        historySelection.endLine = index;
        historySelection.endOffset = focusOffset;
      }
    });

    const historyState: HistoryState = {
      lines,
      selection: historySelection,
    };

    return historyState;
  }

  private restoreHistoryState(historyState: HistoryState): void {
    this.handleValueOutChange(historyState.lines.map((l) => l === '' ? this.emptyLineValueJs : l));

    const { startLine, startOffset, endLine, endOffset } = historyState.selection;
    const nodes = this.textarea.childNodes;
    const startNode = nodes.item(startLine)?.firstChild;
    const endNode = nodes.item(endLine)?.firstChild;

    if (startNode && endNode) {
      this.setSelection([startNode, endNode], startOffset, endOffset, 'nearest');
    }
  }

  private prepareNodesForPaste(value: string | string[]): HTMLLIElement[] {
    const listOfNodes: HTMLLIElement[] = [];
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
        const node = document.createElement('li');

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
    const errors: NSBulktextarea.ErrorItem[] = [];

    this.textarea.childNodes.forEach((node, index) => {
      if (node instanceof HTMLLIElement && node.getAttribute('aria-invalid') === 'true') {
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

      this.textarea.childNodes.forEach((node) => {
        if (node instanceof HTMLLIElement) {
          node.dataset.overMaxRows = 'false';

          if (
            node.textContent !== this.emptyLineValueJs &&
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
      if (node.textContent === this.emptyLineValueJs) {
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

  private toggleErrorsPopper(
    key: Exclude<keyof NSBulktextarea.InputField.State, 'visibleErrorPopper'>,
    target?: unknown, timer?: number,
  ) {
    if (target instanceof HTMLOListElement || target instanceof HTMLLIElement) {
      if (this.changeTriggerTimeout) {
        clearTimeout(this.changeTriggerTimeout);
      }

      this.changeTriggerTimeout = window.setTimeout(() => {
        const targetElement = target === this.textarea ? this.getNodeFromSelection() : target;

        let lineIndex = -1;
        let isInvalidRow = false;

        if (targetElement instanceof HTMLLIElement) {
          isInvalidRow = targetElement.getAttribute('aria-invalid') === 'true';
          lineIndex = Array.from(this.textarea.childNodes).indexOf(targetElement);
        } else if (targetElement === this.textarea) {
          lineIndex = 0;
        }

        if (targetElement instanceof HTMLElement) {
          this.setState(
            (prevState) => {
              const newState: NSBulktextarea.InputField.State = {
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
    const error: NSBulktextarea.ErrorItem | undefined = this.asProps.errors[errorIndex];
    const childNodes = this.textarea.childNodes;

    const node = error ? error.lineNode ?? childNodes.item(error.lineIndex) : null;
    const selection = document.getSelection();

    if (selection && node instanceof HTMLLIElement) {
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

  private validateLine(node: HTMLLIElement): boolean {
    const { lineValidation } = this.asProps;
    if (lineValidation) {
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
    node: Node | [Node, Node],
    start: number,
    end: number,
    scrollType: 'center' | 'nearest' = 'center',
  ): void {
    const selection = document.getSelection();
    const range = document.createRange();
    const [startNode, endNode] = Array.isArray(node) ? node : [node, node];
    range.setStart(startNode, start);
    range.setEnd(endNode, end);

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

  private handleCursorMovement(currentNode: HTMLLIElement, event: KeyboardEvent): void {
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
        if (currentNode.textContent === this.emptyLineValueJs) {
          event.preventDefault();
          nextNode = currentNode.previousSibling;
        }
        break;
      }
      case 'ArrowRight': {
        if (currentNode.textContent === this.emptyLineValueJs) {
          event.preventDefault();
          nextNode = currentNode.nextSibling;
        }
      }
    }

    if (nextNode instanceof HTMLLIElement) {
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

  private addEventListeners(textarea: HTMLElement) {
    textarea.addEventListener('beforeinput', this.handleChange);
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
    textarea.removeEventListener('beforeinput', this.handleChange);
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
