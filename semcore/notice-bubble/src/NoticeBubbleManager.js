import EventEmitter from '@semcore/core/lib/utils/eventEmitter';
import { callAllEventHandlers } from '@semcore/core/lib/utils/assignProps';
import { setFocus } from '@semcore/core/lib/utils/use/useFocusLock';
import React from 'react';

const EVENT_NAME = 'CHANGE';

class NoticeBubbleManager {
  items = [];
  emitter = null;
  counter = 0;

  replaceTimer = 0;

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
      // todo Brauer Ilia: remove this property, because we added logic about autofocus in Notice
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

  replaceLast(props) {
    if (this.replaceTimer) {
      clearTimeout(this.replaceTimer);
    }

    const item = this.items[this.items.length - 1];

    if (item?.visible) {
      this.remove(this.counter - 1);
    }

    this.replaceTimer = setTimeout(() => {
      this.add(props);
    }, 300);
  }

  remove(uid) {
    const item = this.items.find((item) => item.uid === uid);
    if (item) {
      item.visible = false;
      setTimeout(() => {
        this.items = this.items.filter((item) => item.uid !== uid);
        this.emit();
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
