import canUseDOM from './utils/canUseDOM';

class LastInteractionType {
  private lastFocusSource: 'mouse' | 'keyboard' | 'none' = 'none';

  constructor() {
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);

    if (canUseDOM()) {
      document.addEventListener('mousedown', this.handleMouseDown, { capture: true });
      document.addEventListener('keydown', this.handleKeyDown, { capture: true });

      const originFocusHandler = HTMLElement.prototype.focus;
      const instance = this;

      HTMLElement.prototype.focus = function () {
        instance.lastFocusSource = 'keyboard';

        originFocusHandler.apply(this);
      };
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

  private handleMouseDown() {
    this.lastFocusSource = 'mouse';
  }

  private handleKeyDown() {
    this.lastFocusSource = 'keyboard';
  }
}

export const lastInteraction = new LastInteractionType();
