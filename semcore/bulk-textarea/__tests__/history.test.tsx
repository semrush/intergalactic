import { describe, expect, test } from '@semcore/testing-utils/vitest';

import { History, type HistoryState } from '../src/components/InputField/History';

const mockCreateState = (line: string): HistoryState => ({
  lines: [line],
  selection: {
    startLine: 0,
    startOffset: line.length,
    endLine: 0,
    endOffset: line.length,
  },
});

describe('BulkTextarea History', () => {
  test('Verify undo returns the last pushed state and then null when stack is empty', () => {
    const history = new History();
    const previousState = mockCreateState('previous');

    history.push(previousState);

    expect(history.undo(mockCreateState('current'))).toEqual(previousState);
    expect(history.undo(mockCreateState('current'))).toBeNull();
  });

  test('Verify undo on empty stack returns null', () => {
    const history = new History();

    expect(history.undo(mockCreateState('current'))).toBeNull();
  });

  test('Verify redo returns the current state saved by undo', () => {
    const history = new History();
    const previousState = mockCreateState('previous');
    const nextCurrentState = mockCreateState('next current');

    history.push(previousState);

    expect(history.undo(nextCurrentState)).toEqual(previousState);
    expect(history.redo(mockCreateState('current'))).toEqual(nextCurrentState);
  });

  test('Verify redo on empty stack returns null', () => {
    const history = new History();

    expect(history.redo(mockCreateState('current'))).toBeNull();
  });

  test('Verify push clears redo stack after undo', () => {
    const history = new History();
    const firstState = mockCreateState('first');
    const secondState = mockCreateState('second');
    const thirdState = mockCreateState('third');

    history.push(firstState);
    expect(history.undo(secondState)).toEqual(firstState);

    history.push(thirdState);
    expect(history.redo(mockCreateState('current'))).toBeNull();
  });

  test('Verify history max length', () => {
    const history = new History(2);
    const firstState = mockCreateState('first');
    const secondState = mockCreateState('second');
    const thirdState = mockCreateState('third');
    const currentState = mockCreateState('current');

    history.push(firstState);
    history.push(secondState);
    history.push(thirdState);

    expect(history.undo(currentState)).toEqual(thirdState);
    expect(history.undo(currentState)).toEqual(secondState);
    expect(history.undo(currentState)).toBeNull();
  });

  test('Verify keeps complete lines and selection state', () => {
    const history = new History();
    const state: HistoryState = {
      lines: ['first', '', 'third'],
      selection: {
        startLine: 0,
        startOffset: 2,
        endLine: 2,
        endOffset: 3,
      },
    };

    history.push(state);

    expect(history.undo(mockCreateState('current'))).toEqual(state);
  });
});
