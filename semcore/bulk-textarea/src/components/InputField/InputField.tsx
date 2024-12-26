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
    defaultIsEmptyValue: true,
    defaultShowErrors: false,
  };

  delimiter = '\n';

  containerRef = React.createRef<HTMLDivElement>();
  textarea: HTMLDivElement;
  textareaObserver: MutationObserver;
  intersectionObserver: IntersectionObserver;

  popper: PopperContext['popper'] | null = null;
  setPopperTrigger: PopperContext['setTrigger'] | null = null;

  lastInteraction: 'keyboard' | 'mouse' | null = null;

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

    this.textareaObserver.observe(this.textarea, { childList: true });

    this.intersectionObserver = new IntersectionObserver(this.handleIntersection.bind(this), {
      root: this.textarea,
      threshold: 1.0,
    });
  }

  uncontrolledProps() {
    return {
      value: null,
      isEmptyValue: null,
    };
  }

  componentDidMount() {
    const classes = this.containerRef.current?.classList;
    const styleSheet = document.createElement('style');
    const ofRows = this.asProps.ofRows ?? Infinity;
    styleSheet.textContent = `.${classes?.item(0)} > div > div:nth-child(n + ${ofRows + 1}) {
    background-color: var(--intergalactic-bg-secondary-critical, #fff0f7);
  }`;

    document.head.appendChild(styleSheet);
    this.containerRef.current?.append(this.textarea);

    this.handleValueOutChange();
  }

  componentDidUpdate(prevProps: InputFieldProps): void {
    const { value, errors, errorIndex, showErrors } = this.props;

    if (prevProps.value !== value && value !== this.getRowsValue().join(this.delimiter)) {
      this.handleValueOutChange();
    }

    if (prevProps.showErrors !== showErrors || prevProps.errors.length !== errors.length) {
      if (showErrors) {
        if (errors.length > 0) {
          this.textarea.setAttribute('aria-invalid', 'true');
          this.textarea.setAttribute('aria-describedby', this.popperDescribedId);
        }
      } else {
        this.textarea.removeAttribute('aria-invalid');
        this.textarea.removeAttribute('aria-describedby');
      }
    }

    if (prevProps.errorIndex !== errorIndex) {
      const error: ErrorItem | null | undefined = errors[errorIndex];

      const node = error?.rowNode;
      const selection = document.getSelection();

      if (selection && node instanceof HTMLParagraphElement) {
        this.setState({ visibleErrorPopper: false });

        setTimeout(() => {
          node.scrollIntoView({
            block: 'center',
            inline: 'center',
            behavior: 'smooth',
          });
          setTimeout(() => {
            this.setSelection(node, 0, 1);
          }, 50);
        }, 100);
      }
    }
  }

  componentWillUnmount() {
    this.textareaObserver.disconnect();
  }

  get popperDescribedId() {
    const { uid } = this.asProps;
    return `bulk-textarea-${uid}-popper-describedby`;
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

    this.recalculateIsEmpty();
  }

  handleChangeTextareaTree(mutations: MutationRecord[]): void {
    const childNodes = this.textarea.childNodes;
    this.props.onChangeRows(childNodes.length);

    const mutationRecord = mutations[0];

    mutationRecord.addedNodes.forEach((node) => {
      this.validateRow(node);
    });
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

  handleIntersection(entries: IntersectionObserverEntry[]): void {
    const element = entries[0];

    if (element.target instanceof HTMLParagraphElement) {
      if (element.isIntersecting) {
        this.setPopperTrigger?.(element.target);
        this.popper?.current?.update();
      } else if (element.rootBounds) {
        this.setPopperTrigger?.(this.textarea);

        const middle = (element.rootBounds.bottom - element.rootBounds.top) / 2;
        const top = element.intersectionRect.top;
        const yOffset = top < middle ? -1 * middle : middle;

        this.popper?.current?.setOptions((options) => {
          return {
            ...options,
            placement: 'right',
            modifiers: [
              ...(options.modifiers ?? []),
              {
                name: 'offset',
                options: {
                  offset: [yOffset, 10],
                },
              },
            ],
          };
        });
        this.popper?.current?.update();
      }
    }
  }

  handleMouseMove(event: MouseEvent): void {
    this.lastInteraction = 'mouse';
    const element = event.target;

    if (this.changeTriggerTimeout) {
      clearTimeout(this.changeTriggerTimeout);
    }

    if (
      this.isFocusing ||
      (element instanceof HTMLElement &&
        element.getAttribute('aria-invalid') === 'true' &&
        element !== this.textarea)
    ) {
      this.toggleErrorsPopper('mouseRowIndex', element);
    } else {
      this.setState({ visibleErrorPopper: false });
    }
  }

  handleMouseLeave(event: MouseEvent): void {
    if (this.changeTriggerTimeout) {
      clearTimeout(this.changeTriggerTimeout);
    }

    if (this.isFocusing) {
      this.lastInteraction = 'keyboard';
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
      const previousNode = focusNode?.previousSibling;
      const rowNode = focusNode?.parentElement;
      const lastNodeToInsert = listOfNodes[listOfNodes.length - 1];

      if (focusNode === this.textarea) {
        this.textarea.append(...listOfNodes);
      } else if (previousNode) {
        previousNode.after(...listOfNodes);
      } else if (
        rowNode === this.textarea &&
        focusNode instanceof HTMLParagraphElement &&
        focusNode.textContent?.trim() === ''
      ) {
        focusNode.replaceWith(...listOfNodes);
      } else if (rowNode instanceof HTMLParagraphElement) {
        if (rowNode.textContent?.trim() === '') {
          rowNode.replaceWith(...listOfNodes);
        } else {
          const before = rowNode.textContent?.substring(0, selection.focusOffset) ?? '';
          const after = rowNode.textContent?.substring(selection.focusOffset) ?? '';

          const firstNodeToInsert =
            listOfNodes.length > 1 ? listOfNodes.splice(0, 1) : [lastNodeToInsert];

          rowNode.textContent = before + firstNodeToInsert[0]?.textContent ?? '';

          rowNode.after(...listOfNodes);

          if (lastNodeToInsert) {
            lastNodeToInsert.textContent = (lastNodeToInsert.textContent ?? '') + after;
          }
        }
      }

      if (lastNodeToInsert) {
        this.setSelection(lastNodeToInsert, 1, 1);
        lastNodeToInsert.scrollIntoView({
          block: 'center',
          inline: 'center',
          behavior: 'smooth',
        });
      }
    }

    if (validateOn.includes('paste')) {
      this.recalculateErrors();
    }

    this.recalculateIsEmpty();
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
        this.recalculateErrors();
      } else if (firstNode instanceof HTMLParagraphElement && !firstNode.textContent) {
        if (nodes.length <= 1 || secondNode instanceof HTMLBRElement) {
          this.textarea.textContent = '';
          this.recalculateErrors();
        } else {
          selection?.setPosition(firstNode, 0);
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

        this.validateRow(rowNode);
        this.recalculateErrors();
      }

      this.recalculateIsEmpty();
    }
  }

  handleFocus(event: FocusEvent) {
    this.isFocusing = true;
    this.lastInteraction = 'keyboard';

    if (this.asProps.showErrors) {
      this.toggleErrorsPopperByKeyboard(150);
    }
  }

  handleBlur = (event: Event) => {
    this.isFocusing = false;
    this.asProps.onBlur(this.getRowsValue().join(this.delimiter), event);
    if (this.asProps.validateOn.includes('blur')) {
      this.recalculateErrors();
    }
    this.setState({ visibleErrorPopper: false });

    setTimeout(() => {
      this.setState({ keyboardRowIndex: -1 });
    }, 200);
  };

  handleKeyDown(event: KeyboardEvent) {
    this.lastInteraction = 'keyboard';
    const { rowsDelimiters, validateOn, onEnterNextRow } = this.asProps;

    const selection = document.getSelection();
    const currentNode =
      selection?.focusNode instanceof Text
        ? selection?.focusNode?.parentNode
        : selection?.focusNode;

    if (event.key === 'Enter' || rowsDelimiters?.includes(event.key)) {
      if (currentNode instanceof HTMLParagraphElement) {
        const currentRowValue = currentNode.textContent?.trim();

        if (!currentRowValue) {
          event.preventDefault();
        } else {
          if (event.key !== 'Enter') {
            event.preventDefault();
            const row = document.createElement('p');
            row.innerHTML = '&#xfeff;';
            currentNode.after(row);

            selection?.setPosition(row, 0);
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
        }
      }
    }

    if (
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
    const { styles, errors, errorIndex, showErrors, commonErrorMessage } = this.asProps;
    const { visibleErrorPopper, mouseRowIndex, keyboardRowIndex } = this.state;
    const currentRowIndex =
      this.lastInteraction === 'keyboard'
        ? keyboardRowIndex
        : this.lastInteraction === 'mouse'
        ? mouseRowIndex
        : -1;
    let errorItem: ErrorItem | undefined = errors[errorIndex];

    if (currentRowIndex !== -1) {
      errorItem = errors.find((e) => e?.rowIndex === currentRowIndex);
    }

    const errorMessage = errorItem?.errorMessage ?? commonErrorMessage;
    const visibleErrorTooltip = showErrors && visibleErrorPopper && Boolean(errorMessage);

    return sstyled(styles)(
      <>
        <Tooltip
          interaction={'none'}
          placement={errorItem?.errorMessage ? 'right' : 'right-start'}
          visible={visibleErrorTooltip}
          theme={'warning'}
          offset={errorItem?.errorMessage ? [0, 26] : undefined}
        >
          {({ popper, setTrigger }) => {
            this.setPopperTrigger = setTrigger;
            this.popper = popper;
            this.popper.current?.update();

            return <Tooltip.Popper id={this.popperDescribedId}>{errorMessage}</Tooltip.Popper>;
          }}
        </Tooltip>
        <SInputField
          render={Box}
          ref={this.containerRef}
          __excludeProps={['onBlur', 'value', 'id']}
        />
      </>,
    );
  }

  private prepareNodesForPaste(value: string): HTMLDivElement[] {
    const listOfNodes: HTMLDivElement[] = [];
    const { pasteProps } = this.asProps;
    const rowProcessing = pasteProps?.rowProcessing ?? ((row: string) => row.trim());
    const skipEmptyRows = pasteProps?.skipEmptyRows ?? false;
    const delimiter = pasteProps?.delimiter ?? this.delimiter;

    value.split(delimiter).forEach((line) => {
      const preparedLine = rowProcessing(line);
      if ((preparedLine === '' && skipEmptyRows === false) || preparedLine !== '') {
        const node = document.createElement('p');

        if (preparedLine === '') {
          node.innerHTML = '&#xfeff;';
        } else {
          node.append(document.createTextNode(preparedLine));
        }

        listOfNodes.push(node);
      }
    });

    return listOfNodes;
  }

  private recalculateIsEmpty(): void {
    const nodes = this.textarea.childNodes;

    if (nodes.length === 1) {
      const text = nodes.item(0).textContent;

      this.handlers.isEmptyValue(!text);
    } else {
      this.handlers.isEmptyValue(nodes.length > 1 ? false : true);
    }
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
        const isInvalidRow =
          target.getAttribute('aria-invalid') === 'true' && target !== this.textarea;
        const rowIndex =
          target instanceof HTMLParagraphElement
            ? Array.from(this.textarea.childNodes).indexOf(target)
            : -1;

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
            // setTimeout(
            //   () => {
            const trigger = isInvalidRow ? target : this.textarea;

            this.setPopperTrigger?.(trigger);
            this.popper?.current?.update();

            this.intersectionObserver.disconnect();

            if (trigger !== this.textarea) {
              this.intersectionObserver.observe(trigger);
            }
            // },
            // this.state.visibleErrorPopper ? 0 : 150,
            // );
          },
        );
      }, timer ?? 50);
    } else {
      this.setState({ visibleErrorPopper: false });
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
        this.recalculateErrors();
      }

      return isValid;
    }

    return true;
  }

  private setSelection(node: Node, start: number, end: number): void {
    const selection = document.getSelection();
    const range = document.createRange();
    range.setStart(node, start);
    range.setEnd(node, end);

    selection?.removeAllRanges();
    selection?.addRange(range);
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

      this.setSelection(nodeToSetSelection, offset, offset);
      nextNode.scrollIntoView({
        block: 'nearest',
        inline: 'nearest',
        behavior: 'smooth',
      });
    }
  }
}

export { InputField };
export type { InputFieldProps, ErrorItem };
