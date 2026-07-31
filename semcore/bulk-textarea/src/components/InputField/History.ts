export type HistorySelection = {
  startLine: number;
  startOffset: number;
  endLine: number;
  endOffset: number;
};

export type HistoryState = {
  lines: string[];
  selection: HistorySelection;
};

const DEFAULT_MAX_LENGTH = 100;

export class History {
  private undoStack: HistoryState[] = [];
  private redoStack: HistoryState[] = [];
  private readonly maxLength: number;

  constructor(maxLength = DEFAULT_MAX_LENGTH) {
    this.maxLength = maxLength;
  }

  public push(state: HistoryState): void {
    this.undoStack.push(state);
    this.trimUndoStack();

    this.redoStack = [];
  }

  public undo(currentState: HistoryState): HistoryState | null {
    const previousState = this.undoStack.pop();

    if (!previousState) {
      return null;
    }

    this.redoStack.push(currentState);

    return previousState;
  }

  public redo(currentState: HistoryState): HistoryState | null {
    const nextState = this.redoStack.pop();

    if (!nextState) {
      return null;
    }

    this.undoStack.push(currentState);
    this.trimUndoStack();

    return nextState;
  }

  private trimUndoStack(): void {
    if (this.undoStack.length > this.maxLength) {
      this.undoStack.shift();
    }
  }
}
