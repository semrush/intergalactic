import canUseDOM from './utils/canUseDOM';

class LastInteractionType {
  private lastFocusSource: 'mouse' | 'keyboard' | 'none' = 'none';
  private lastKeyboardKey: string = '';

  constructor() {
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);

    if (canUseDOM()) {
      document.addEventListener('mousedown', this.handleMouseDown, { capture: true });
      document.addEventListener('keydown', this.handleKeyDown, { capture: true });
    }
  }

  public get type() {
    return this.lastFocusSource;
  }

  public isKeyboard() {
    return this.lastFocusSource === 'keyboard';
  }

  public isMouse() {
    return this.lastFocusSource === 'mouse';
  }

  public get isTab(): boolean {
    return this.isKeyboard() && this.lastKeyboardKey === 'tab';
  }

  private handleMouseDown() {
    this.lastFocusSource = 'mouse';
  }

  private handleKeyDown(e: KeyboardEvent) {
    this.lastFocusSource = 'keyboard';
    this.lastKeyboardKey = e.key.toLowerCase();
  }
}

export const lastInteraction = new LastInteractionType();
