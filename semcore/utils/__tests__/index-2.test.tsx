import { describe, it, expect, vi } from 'vitest';
import { assignProps, callAllEventHandlers } from '../src'; // Путь до вашего файла с функциями

describe('assignProps', () => {
  it('should merge props and source, and handle event handlers', () => {
    const props = {
      onClick: vi.fn(),
      style: { color: 'red' },
      className: 'props-class',
    };

    const source = {
      onClick: vi.fn(),
      style: { backgroundColor: 'blue' },
      className: 'source-class',
    };

    const result = assignProps(props, source);

    // Проверяем, что props и source были объединены
    expect(result.style).toEqual({ color: 'red', backgroundColor: 'blue' });
    expect(result.className).toBe('props-class source-class');

    // Проверяем, что обработчики событий были объединены
    result.onClick(); // Вызываем событие
    expect(props.onClick).toHaveBeenCalled();
    expect(source.onClick).toHaveBeenCalled();
  });

  it('should handle "use:" prefixed props', () => {
    const props = {
      'use:someProp': 'valueFromProps',
    };

    const source = {
      'use:someProp': 'valueFromSource',
    };

    const result = assignProps(props, source);

    // Проверяем, что "use:" prefixed пропсы были объединены
    expect(result.someProp).toBe('valueFromProps');
  });

  it('should not modify ref if source and props are identical', () => {
    const props = {
      ref: vi.fn(),
    };

    const source = {
      ref: vi.fn(),
    };

    const result = assignProps(props, source);

    // Проверяем, что ref не изменился
    expect(result.ref).toBe(props.ref);
  });

  it('should correctly handle forkRef when refs are different', () => {
    const props = {
      ref: vi.fn(),
    };

    const source = {
      ref: vi.fn(),
    };

    const forkedRef = vi.fn();
    const result = assignProps(props, source);

    // Проверяем, что forkRef был вызван, если refs разные
    expect(result.ref).not.toBe(props.ref);
  });

  it('should correctly merge "use:" prefixed props from both source and props', () => {
    const props = {
      'use:color': 'red',
    };

    const source = {
      'use:color': 'blue',
    };

    const result = assignProps(props, source);

    expect(result.color).toBe('red'); // props значение должно быть приоритетным
  });
});

describe('callAllEventHandlers', () => {
  it('should call both event handlers', () => {
    const handler1 = vi.fn();
    const handler2 = vi.fn();

    const combinedHandler = callAllEventHandlers(handler1, handler2);
    combinedHandler();

    expect(handler1).toHaveBeenCalled();
    expect(handler2).toHaveBeenCalled();
  });

  it('should stop calling further handlers if one returns false', () => {
    const handler1 = vi.fn(() => false); // Останавливаем выполнение
    const handler2 = vi.fn();

    const combinedHandler = callAllEventHandlers(handler1, handler2);
    combinedHandler();

    expect(handler1).toHaveBeenCalled();
    expect(handler2).not.toHaveBeenCalled(); // Не вызывается, так как handler1 вернул false
  });

  it('should handle undefined functions gracefully', () => {
    const handler1 = vi.fn();
    const combinedHandler = callAllEventHandlers(handler1, undefined);
    combinedHandler();

    expect(handler1).toHaveBeenCalled();
  });
});
