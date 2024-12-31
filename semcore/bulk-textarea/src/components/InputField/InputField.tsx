import React from 'react';
import { Component, sstyled, Root } from '@semcore/core';
import { Box } from '@semcore/flex-box';

import style from './inputField.shadow.css';
import { PopperContext } from '@semcore/popper';
import Tooltip from '@semcore/tooltip';
import { InputFieldProps, ErrorItem } from './InputField.types';
import { extractAriaProps } from '@semcore/utils/lib/ariaProps';
import uniqueIDEnhancement from '@semcore/utils/lib/uniqueID';

type IndexKeys = 'keyboardRowIndex' | 'mouseRowIndex';

type State = {
  [key in IndexKeys]: number;
} & {
  visibleErrorPopper: boolean;
};

class InputField extends Component<InputFieldProps, {}, State, typeof InputField.enhance> {
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
  };

  delimiter = '\n';
  skipEmptyRows = false;
  emptyRowValue = '&#xfeff;';

  containerRef = React.createRef<HTMLDivElement>();
  textarea: HTMLDivElement;
  textareaObserver: MutationObserver;

  popper: PopperContext['popper'] | null = null;
  setPopperTrigger: PopperContext['setTrigger'] | null = null;

  errorByInteraction: 'keyboard' | 'mouse' | null = null;

  changeTriggerTimeout = 0;
  isScrolling = false;
  scrollingTimeout = 0;

  toggleErrorsPopperTimeout = 0;

  isFocusing = false;

  state = {
    visibleErrorPopper: false,
    keyboardRowIndex: -1,
    mouseRowIndex: -1,
  };

  constructor(props: InputFieldProps) {
    super(props);

    this.textarea = this.createContentEditableElement(props);
    this.textareaObserver = new MutationObserver(this.handleChangeTextareaTree.bind(this));
  }

  uncontrolledProps() {
    return {
      value: null,
    };
  }

  componentDidMount() {
    this.setStylesForRowsOverLimit();

    this.containerRef.current?.append(this.textarea);
    this.textareaObserver.observe(this.textarea, { childList: true });

    this.handleValueOutChange();
  }

  componentDidUpdate(prevProps: InputFieldProps): void {
    const { value, errors, errorIndex, showErrors } = this.props;

    if (prevProps.value !== value && value !== this.getRowsValue().join(this.delimiter)) {
      this.handleValueOutChange();
    }

    if (prevProps.showErrors !== showErrors || prevProps.errors.length !== errors.length) {
      this.toggleAriaInvalid(showErrors, errors.length);
    }

    if (prevProps.errorIndex !== errorIndex) {
      this.handleChangeErrorIndex(errorIndex);
    }
  }

  componentWillUnmount() {
    this.textareaObserver.disconnect();
    this.cleanStylesForRowsOverLimit();
  }

  get popperDescribedId() {
    const { uid } = this.asProps;
    return `bulk-textarea-${uid}-popper-describedby`;
  }

  get errorMessage() {
    const { errors, errorIndex, commonErrorMessage, lastError } = this.asProps;
    const { mouseRowIndex, keyboardRowIndex } = this.state;
    const currentRowIndex =
      this.errorByInteraction === 'keyboard'
        ? keyboardRowIndex
        : this.errorByInteraction === 'mouse'
        ? mouseRowIndex
        : -1;
    let errorItem: ErrorItem | undefined = errors[errorIndex];

    if (currentRowIndex !== -1) {
      errorItem = errors.find((e) => e?.rowIndex === currentRowIndex);
    }

    const errorMessage =
      errors.length === 0 // show any errors only if there are at least one error
        ? null
        : errorItem?.errorMessage ?? lastError?.errorMessage ?? commonErrorMessage;
    const isCommonError = !errorItem?.errorMessage && !lastError?.errorMessage;

    return {
      errorMessage,
      isCommonError,
    };
  }

  createContentEditableElement(props: InputFieldProps) {
    const textarea = document.createElement('div');
    textarea.setAttribute('contentEditable', 'true');
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

    textarea.addEventListener('paste', this.handlePaste.bind(this));
    textarea.addEventListener('input', this.handleChange.bind(this));
    textarea.addEventListener('focus', this.handleFocus.bind(this));
    textarea.addEventListener('blur', this.handleBlur.bind(this));
    textarea.addEventListener('keydown', this.handleKeyDown.bind(this));
    textarea.addEventListener('mousedown', this.handleMouseDown.bind(this));
    textarea.addEventListener('mousemove', this.handleMouseMove.bind(this));
    textarea.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
    textarea.addEventListener('scroll', this.handleScroll.bind(this));

    return textarea;
  }

  handleValueOutChange() {
    const { value } = this.props;

    if (value === '') {
      this.textarea.textContent = '';
    } else {
      const listOfNodes = this.prepareNodesForPaste(value);

      this.textarea.replaceChildren(...listOfNodes);
    }
  }

  handleChangeTextareaTree(): void {
    const nodes = this.textarea.childNodes;
    let rowsCount = nodes.length;

    if (nodes.length === 1 && !nodes.item(0).textContent?.trim()) {
      rowsCount = 0;
    }

    this.props.onChangeRowsCount(rowsCount);
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
    // because we need to change keyboardRowIndex, because the caret in real on that current row
    this.errorByInteraction = 'keyboard';
    const element = event.target;

    if (element instanceof HTMLElement) {
      // because we need to change keyboardRowIndex, because the caret in real on that current row
      this.toggleErrorsPopper('keyboardRowIndex', element);
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
        this.toggleErrorsPopper('mouseRowIndex', element);
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

      this.toggleErrorsPopper('keyboardRowIndex', rowNode, 0);
      this.setState({ mouseRowIndex: -1 });
    } else {
      this.setState({ visibleErrorPopper: false });
    }
  }

  handlePaste(event: ClipboardEvent) {
    event.preventDefault();
    const { validateOn } = this.asProps;
    const value = event.clipboardData?.getData('text/plain');
    const listOfNodes = value ? this.prepareNodesForPaste(value) : [];

    const selection = document.getSelection();

    if (selection) {
      const focusNode = selection.focusNode;
      const rowNode = focusNode?.parentElement;

      let paragraph: HTMLParagraphElement | null = null;
      let textNode: ChildNode | null = null;
      let position: number | null = null;

      if (rowNode === this.textarea && focusNode instanceof HTMLParagraphElement) {
        paragraph = focusNode;
      } else if (focusNode instanceof Text && rowNode instanceof HTMLParagraphElement) {
        paragraph = rowNode;
      }

      if (focusNode === this.textarea) {
        this.textarea.append(...listOfNodes);

        const lastNodeToInsert = listOfNodes[listOfNodes.length - 1];
        textNode = lastNodeToInsert.childNodes.item(0);
        position = (lastNodeToInsert.textContent ?? '').length;
      } else if (paragraph) {
        const before = paragraph.textContent?.trim().substring(0, selection.focusOffset) ?? '';
        const after = paragraph.textContent?.trim().substring(selection.focusOffset) ?? '';

        const firstNodeToInsert = listOfNodes.splice(0, 1)[0];
        const lastNodeToInsert = listOfNodes[listOfNodes.length - 1];

        paragraph.textContent = before + firstNodeToInsert?.textContent ?? '';

        paragraph.after(...listOfNodes);

        if (lastNodeToInsert) {
          lastNodeToInsert.textContent = (lastNodeToInsert.textContent ?? '') + after;
          textNode = lastNodeToInsert.childNodes.item(0);
          position = (lastNodeToInsert.textContent ?? '').length;

          this.validateRow(lastNodeToInsert);
        } else {
          position = (paragraph.textContent ?? '').length;
          paragraph.textContent = (paragraph.textContent ?? '') + after;
          textNode = paragraph.childNodes.item(0);

          this.validateRow(paragraph);
        }
      }

      if (textNode instanceof Text) {
        this.setSelection(textNode, position ?? 1, position ?? 1);
        this.toggleErrorsPopper('keyboardRowIndex', textNode.parentNode);
      } else {
        console.warn('incorrect child type', textNode, textNode?.parentNode);
      }
    }

    if (validateOn.includes('paste') || this.asProps.showErrors) {
      this.recalculateErrors();
    }
  }

  handleChange(event: Event) {
    const target = event.target;
    if (target instanceof HTMLDivElement) {
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
      } else if (!firstNode || firstNode instanceof HTMLBRElement) {
        this.textarea.textContent = '';
      } else if (firstNode instanceof HTMLParagraphElement && !firstNode.textContent) {
        if (nodes.length <= 1 || secondNode instanceof HTMLBRElement) {
          this.textarea.textContent = '';
        }
      }

      let maxDeep = 10;
      let rowNode = selection?.focusNode;

      while (rowNode?.parentNode !== this.textarea && maxDeep > 0) {
        rowNode = rowNode?.parentNode;
        maxDeep--;
      }

      if (rowNode instanceof HTMLElement) {
        const childNodes = rowNode.childNodes;
        const textContent = rowNode.textContent ?? '';

        if (childNodes.length > 1) {
          const offset = childNodes.item(0).textContent?.length;

          rowNode.textContent = textContent;

          if (offset) {
            this.setSelection(rowNode.childNodes.item(0), offset, offset);
          }
        }

        const { errors, showErrors } = this.asProps;
        const isValid = this.validateRow(rowNode);
        this.recalculateErrors();

        if (!isValid && showErrors) {
          this.toggleErrorsPopper('keyboardRowIndex', rowNode, 0);
        }

        const trigger =
          !isValid || (isValid && errors.length === 1 && errors[0].rowNode === rowNode)
            ? rowNode
            : this.textarea;

        if (showErrors && this.popper?.current.state.elements.reference !== trigger) {
          this.setPopperTrigger?.(trigger);
        }
      } else if (rowNode === null) {
        this.setPopperTrigger?.(this.textarea);
      }
    }
  }

  handleFocus(event: FocusEvent) {
    this.isFocusing = true;
    this.errorByInteraction = 'keyboard';

    if (this.asProps.showErrors) {
      this.toggleErrorsPopperByKeyboard(150);
    }
  }

  handleBlur = (event: Event) => {
    this.isFocusing = false;
    this.setState({ visibleErrorPopper: false });

    const { validateOn, onBlur } = this.asProps;

    if (validateOn.includes('blur')) {
      this.recalculateErrors();
    }

    onBlur(this.getRowsValue().join(this.delimiter), event);

    setTimeout(() => {
      this.setState({ keyboardRowIndex: -1 });
    }, 200);
  };

  handleKeyDown(event: KeyboardEvent) {
    this.errorByInteraction = 'keyboard';
    const { rowsDelimiters, validateOn, onEnterNextRow } = this.asProps;

    const currentNode = this.getNodeFromSelection();

    if (event.key === 'Enter' || rowsDelimiters?.includes(event.key)) {
      if (currentNode === this.textarea) {
        event.preventDefault();
      }
      if (currentNode instanceof HTMLParagraphElement) {
        const currentRowValue = currentNode.textContent?.trim();

        if (!currentRowValue) {
          event.preventDefault();
        } else {
          if (event.key !== 'Enter') {
            event.preventDefault();
            const row = document.createElement('p');
            row.innerHTML = this.emptyRowValue;
            currentNode.after(row);

            this.setSelection(row, 0, 0);
          }

          setTimeout(() => {
            if (validateOn.includes('enterNextRow')) {
              this.validateRow(currentNode);
              if (currentNode.previousSibling) {
                this.validateRow(currentNode.previousSibling);
              }
              this.recalculateErrors();
            }
            onEnterNextRow();
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
    }
  }

  render() {
    const SInputField = Root;
    const { styles, showErrors } = this.asProps;
    const { visibleErrorPopper } = this.state;

    const { errorMessage, isCommonError } = this.errorMessage;
    const visibleErrorTooltip = showErrors && visibleErrorPopper && Boolean(errorMessage);

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
              this.popper = popper;
            }

            return <Tooltip.Popper id={this.popperDescribedId}>{errorMessage}</Tooltip.Popper>;
          }}
        </Tooltip>
        <SInputField
          render={Box}
          ref={this.containerRef}
          id={'boundary'}
          __excludeProps={['onBlur', 'value']}
        />
      </>,
    );
  }

  private setStylesForRowsOverLimit(): void {
    const name = 'rowsOverLimit';
    const existsStyleSheet = document.querySelector(`style[name=${name}]`);

    if (!existsStyleSheet) {
      const classes = this.containerRef.current?.classList;
      const styleSheet = document.createElement('style');
      styleSheet.setAttribute('name', name);
      const ofRows = this.asProps.ofRows ?? Infinity;
      styleSheet.textContent = `.${classes?.item(0)} > div > p:nth-child(n + ${ofRows + 1}) {
    background-color: var(--intergalactic-bg-secondary-critical, #fff0f7);
  }`;

      document.head.appendChild(styleSheet);
    }
  }
  private cleanStylesForRowsOverLimit(): void {
    const name = 'rowsOverLimit';
    const existsStyleSheet = document.querySelector(`style[name=${name}]`);

    if (existsStyleSheet) {
      document.head.removeChild(existsStyleSheet);
    }
  }

  private prepareNodesForPaste(value: string): HTMLParagraphElement[] {
    const listOfNodes: HTMLParagraphElement[] = [];
    const { pasteProps } = this.asProps;
    const rowProcessing = pasteProps?.rowProcessing ?? ((row: string) => row.trim());
    const skipEmptyRows = pasteProps?.skipEmptyRows ?? this.skipEmptyRows;
    const delimiter = pasteProps?.delimiter ?? this.delimiter;

    value.split(delimiter).forEach((line) => {
      const preparedLine = rowProcessing(line);
      if ((preparedLine === '' && skipEmptyRows === false) || preparedLine !== '') {
        const node = document.createElement('p');

        if (preparedLine === '') {
          node.innerHTML = this.emptyRowValue;
        } else {
          node.append(document.createTextNode(preparedLine));
        }

        listOfNodes.push(node);

        this.validateRow(node);
      }
    });

    return listOfNodes;
  }

  private recalculateErrors(): void {
    const errors: ErrorItem[] = [];

    this.textarea.childNodes.forEach((node, index) => {
      if (node instanceof HTMLParagraphElement && node.getAttribute('aria-invalid') === 'true') {
        const errorItem = {
          errorMessage: node.getAttribute('aria-errormessage') ?? '',
          rowNode: node,
          rowIndex: index,
        };
        errors.push(errorItem);
      }
    });

    this.asProps.onErrorsChange(errors);
  }

  private getRowsValue(): string[] {
    const rows: string[] = [];
    this.textarea.childNodes.forEach((node) => {
      rows.push(node.textContent ?? '');
    });

    return rows;
  }

  private toggleErrorsPopperByKeyboard(timer: number) {
    if (this.toggleErrorsPopperTimeout) {
      clearTimeout(this.toggleErrorsPopperTimeout);
    }

    if (!this.isScrolling) {
      setTimeout(() => {
        const rowNode = this.getNodeFromSelection();

        this.toggleErrorsPopper('keyboardRowIndex', rowNode, timer);
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

        if (targetElement instanceof HTMLParagraphElement) {
          const isInvalidRow = targetElement.getAttribute('aria-invalid') === 'true';
          const rowIndex = Array.from(this.textarea.childNodes).indexOf(targetElement);

          this.setState(
            (prevState) => {
              const newState: State = {
                visibleErrorPopper: this.isFocusing ? true : isInvalidRow,
                mouseRowIndex: prevState.mouseRowIndex,
                keyboardRowIndex: prevState.keyboardRowIndex,
              };

              if (this.isFocusing || (key === 'mouseRowIndex' && isInvalidRow)) {
                newState[key] = rowIndex;
              }

              return newState;
            },
            () => {
              const trigger = isInvalidRow ? targetElement : this.textarea;
              this.setPopperTrigger?.(trigger);

              this.forceUpdate();
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
      this.textarea.setAttribute('aria-invalid', 'true');
      this.textarea.setAttribute('aria-describedby', this.popperDescribedId);
    } else {
      this.textarea.removeAttribute('aria-invalid');
      this.textarea.removeAttribute('aria-describedby');
    }
  }

  private handleChangeErrorIndex(errorIndex: number): void {
    const error: ErrorItem | undefined = this.asProps.errors[errorIndex];

    const node = error?.rowNode;
    const selection = document.getSelection();

    if (selection && node instanceof HTMLParagraphElement) {
      this.setState({ visibleErrorPopper: false });

      setTimeout(() => {
        this.setSelection(node, 0, 1);
      }, 150);
    }
  }

  private validateRow(node: Node): boolean {
    const { rowValidation } = this.asProps;
    if (rowValidation && node instanceof HTMLElement) {
      const { isValid, errorMessage } = rowValidation(node.textContent ?? '', this.getRowsValue());

      if (!isValid) {
        node.setAttribute('aria-invalid', 'true');
        node.setAttribute('aria-errormessage', errorMessage);
      } else {
        node.removeAttribute('aria-invalid');
        node.removeAttribute('aria-errormessage');
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
    let nextNode;

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
        if (currentNode.textContent?.trim() === '') {
          event.preventDefault();
          nextNode = currentNode.previousSibling;
        }
        break;
      }
      case 'ArrowRight': {
        if (currentNode.textContent?.trim() === '') {
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
}

export { InputField };
export type { InputFieldProps, ErrorItem };
