import EventEmitter from '@semcore/utils/lib/eventEmitter';
import { callAllEventHandlers } from '@semcore/utils/lib/assignProps';
import { setFocus } from '@semcore/utils/lib/use/useFocusLock';
import React from 'react';

const EVENT_NAME = 'CHANGE';

class NoticeBubbleManager {
  items = [];
  emitter = null;
  counter = 0;

  constructor() {
    this.emitter = new EventEmitter();
  }

  addListener(fn) {
    return this.emitter.subscribe(EVENT_NAME, fn);
  }

  createItem(props) {
    const manager = this;

    return {
      type: 'info',
      ...props,
      onClose: callAllEventHandlers(props.onClose, () => {
        manager.remove(props.uid);
      }),
    };
  }

  emit() {
    this.emitter.emit(EVENT_NAME, this.items);
  }

  add(props) {
    const uid = this.counter++;
    const ref = React.createRef();
    const focus = () => setTimeout(() => setFocus(ref.current), 0);
    const item = this.createItem({
      uid,
      visible: props.initialAnimation ? true : undefined,
      forwardRef: ref,
      ...props,
    });
    this.items.push(item);
    this.emit();
    return {
      uid,
      update: this.update.bind(this, uid),
      remove: this.remove.bind(this, uid),
      ref,
      focus,
    };
  }

  update(uid, props) {
    const index = this.items.findIndex((item) => item.uid === uid);
    if (index !== -1) {
      this.items[index] = this.createItem({
        ...this.items[index],
        ...props,
      });
      this.emit();
      return true;
    }
    return false;
  }

  remove(uid) {
    const index = this.items.findIndex((item) => item.uid === uid);
    if (index !== -1) {
      this.items[index].visible = false;
      setTimeout(() => {
        const index = this.items.findIndex((item) => item.uid === uid);
        if (index !== -1) {
          this.items.splice(index, 1);
          this.emit();
        }
      }, 1000);
      this.emit();
      return true;
    }
    return false;
  }
}

const noticeBubbleDefaultManager = new NoticeBubbleManager();

export { NoticeBubbleManager };
export default noticeBubbleDefaultManager;
