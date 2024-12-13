import React from 'react';
import { Component, sstyled, Root } from '@semcore/core';
import { Box } from '@semcore/flex-box';

import style from './inputField.shadow.css';
import { PopperContext } from '@semcore/popper';
import Tooltip from '@semcore/tooltip';
import { InputFieldProps, ErrorItem } from './InputField.types';
import { extractAriaProps } from '@semcore/utils/lib/ariaProps';
import uniqueIDEnhancement from '@semcore/utils/lib/uniqueID';

type State = {
  visibleErrorPopper: boolean;
  currentRowIndex: number;
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
    defaultCurrentRowIndex: -1,
  };

  delimiter = '\n';

  containerRef = React.createRef<HTMLDivElement>();
  textarea: HTMLDivElement;
  textareaObserver: MutationObserver;

  popper: PopperContext['popper'] | null = null;
  setPopperTrigger: PopperContext['setTrigger'] | null = null;

  state = {
    visibleErrorPopper: false,
    currentRowIndex: -1,
  };

  constructor(props: InputFieldProps) {
    super(props);

    this.textarea = this.createContentEditableElement(props);
    this.textareaObserver = new MutationObserver(this.handleChangeTextareaTree.bind(this));

    this.textareaObserver.observe(this.textarea, { childList: true });
  }

  uncontrolledProps() {
    return {
      value: null,
      isEmptyValue: null,
      currentRowIndex: null,
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

    if (prevProps.value !== value && value !== this.getRows().join(this.delimiter)) {
      this.handleValueOutChange();
    }

    if (prevProps.showErrors !== showErrors) {
      if (showErrors) {
        this.textarea.setAttribute('aria-invalid', 'true');
        this.textarea.setAttribute('aria-describedby', this.popperDescribedId);
      } else {
        this.textarea.removeAttribute('aria-invalid');
        this.textarea.removeAttribute('aria-describedby');
      }
    }

    if (prevProps.errorIndex !== errorIndex) {
      const error: ErrorItem | null | undefined = errors[errorIndex];

      const node = error?.rowNode;
      const selection = document.getSelection();

      if (selection && node instanceof HTMLDivElement) {
        const range = document.createRange();
        range.setStart(node, 0);
        range.setEnd(node, 1);

        selection.removeAllRanges();
        selection.addRange(range);

        node.focus();
        node.scrollIntoView({
          block: 'nearest',
          inline: 'nearest',
          behavior: 'smooth',
        });

        this.setState({ visibleErrorPopper: true }, () => {
          this.setPopperTrigger?.(node);
          this.popper?.current?.update();
        });
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
    const { extractedAriaProps } = extractAriaProps(props);
    for (const key in extractedAriaProps) {
      const ariaProp: string | undefined = (props as any)[key];
      if (ariaProp) {
        textarea.setAttribute(key, ariaProp);
      }
    }

    textarea.addEventListener('paste', this.handlePaste.bind(this));
    textarea.addEventListener('input', this.handleChange.bind(this));
    textarea.addEventListener('blur', this.handleBlur.bind(this));
    textarea.addEventListener('keydown', this.handleKeyDown.bind(this));
    textarea.addEventListener('mousemove', this.handleMouseMove.bind(this));

    const firstRow = document.createElement('div');
    const emptyText = document.createElement('br');
    firstRow.appendChild(emptyText);
    textarea.appendChild(firstRow);

    return textarea;
  }

  handleValueOutChange() {
    const value = this.props.value;
    const listOfNodes = this.prepareNodesForPaste(value);

    this.textarea.replaceChildren(...listOfNodes);

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

  handleMouseMove(event: MouseEvent): void {
    this.toggleErrorsPopper(event.target);
  }

  handlePaste(event: ClipboardEvent) {
    event.preventDefault();
    const { validateOn } = this.asProps;
    const value = event.clipboardData?.getData('text/plain');
    const listOfNodes = value ? this.prepareNodesForPaste(value) : [];

    this.textarea.append(...listOfNodes);

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

      if (firstNode instanceof Text) {
        const nodeText = firstNode.textContent ?? '';
        const selection = document.getSelection();
        const firstRow = document.createElement('div');
        const text = document.createTextNode(nodeText);
        firstRow.append(text);
        firstNode.replaceWith(firstRow);

        selection?.setPosition(firstRow, nodeText.length);
      } else if (!firstNode || firstNode instanceof HTMLBRElement) {
        const firstRow = document.createElement('div');
        const emptyText = document.createElement('br');
        firstRow.appendChild(emptyText);
        this.textarea.replaceChildren(firstRow);
      }

      this.recalculateIsEmpty();
    }
  }

  handleBlur = (event: Event) => {
    this.asProps.onBlur(this.getRows().join(this.delimiter), event);
    if (this.asProps.validateOn.includes('blur')) {
      this.recalculateErrors();
    }
  };

  handleKeyDown(event: KeyboardEvent) {
    const { rowsDelimiters, validateOn, onEnterNextRow } = this.asProps;

    if (event.key === 'Enter' || rowsDelimiters?.includes(event.key)) {
      const selection = document.getSelection();
      const currentNode = selection?.focusNode;
      const currentRowValue = currentNode?.textContent;

      if (!currentRowValue) {
        event.preventDefault();
      } else {
        if (event.key !== 'Enter') {
          event.preventDefault();
          const row = document.createElement('div');
          const emptyText = document.createElement('br');
          row.appendChild(emptyText);
          this.textarea.append(row);

          selection?.setPosition(row, 0);
        }

        if (validateOn.includes('enterNextRow')) {
          this.validateRow(currentNode);
          this.recalculateErrors();
        }
        onEnterNextRow();
      }
    }

    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      const selection = document.getSelection();
      const rowNode =
        selection?.focusNode instanceof Text
          ? selection.focusNode.parentNode
          : selection?.focusNode;

      let target: ChildNode | undefined | null = null;

      if (event.key === 'ArrowDown') {
        target = rowNode?.nextSibling;
      } else if (event.key === 'ArrowUp') {
        target = rowNode?.previousSibling;
      }

      this.toggleErrorsPopper(target);
    }
  }

  render() {
    const SInputField = Root;
    const { styles, errors, errorIndex, showErrors, currentRowIndex } = this.asProps;

    let errorItem: ErrorItem | undefined = errors[errorIndex];

    if (currentRowIndex !== -1) {
      errorItem = errors.find((e) => e?.rowIndex === currentRowIndex);
    }

    return sstyled(styles)(
      <>
        <Tooltip
          interaction={'none'}
          placement={'right-start'}
          visible={this.state.visibleErrorPopper && showErrors && Boolean(errorItem?.errorMessage)}
          theme={'warning'}
          offset={[0, 24]}
        >
          {({ popper, setTrigger }) => {
            this.setPopperTrigger = setTrigger;
            this.popper = popper;
            this.popper.current?.update();

            return (
              <Tooltip.Popper id={this.popperDescribedId}>{errorItem?.errorMessage}</Tooltip.Popper>
            );
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
        const node = document.createElement('div');
        const text =
          preparedLine === ''
            ? document.createElement('br')
            : document.createTextNode(preparedLine);
        node.append(text);
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
      if (node instanceof HTMLDivElement && node.getAttribute('aria-invalid') === 'true') {
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

  private getRows(): string[] {
    const rows: string[] = [];
    this.textarea.childNodes.forEach((node) => {
      rows.push(node.textContent ?? '');
    });

    return rows;
  }

  private toggleErrorsPopper(target?: unknown) {
    if (
      target instanceof HTMLDivElement &&
      target.getAttribute('aria-invalid') === 'true' &&
      target !== this.textarea
    ) {
      const index = Array.from(this.textarea.childNodes).indexOf(target);
      this.setState({ visibleErrorPopper: true, currentRowIndex: index }, () => {
        this.setPopperTrigger?.(target);
        this.popper?.current?.update();
      });
    } else {
      this.setState({ visibleErrorPopper: false });
    }
  }

  private validateRow(node: Node): boolean {
    const { rowValidation } = this.asProps;
    if (rowValidation && node instanceof HTMLElement) {
      const { isValid, errorMessage } = rowValidation(node.textContent ?? '', this.getRows());

      if (!isValid) {
        node.setAttribute('aria-invalid', 'true');
        node.setAttribute('aria-errormessage', errorMessage);
      } else {
        node.removeAttribute('aria-invalid');
        node.removeAttribute('aria-errormessage');
        this.recalculateErrors();
        this.setState({ visibleErrorPopper: false });
      }

      return isValid;
    }

    return true;
  }
}

export { InputField };
export type { InputFieldProps, ErrorItem };
