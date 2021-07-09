import createUUID from '@semcore/utils/lib/createUUID';
import EventEmitter from '@semcore/utils/lib/eventEmitter';

const EVENT_NAME = 'CHANGE';

/**
 * ```js
 * import NoticeBubbleManager from "@semcore/notice-bubble"
 * ```
 *
 * The manager is a repository of all notices and has the ability
 * to add, delete and update notices by calling the appropriate methods.
 * */
class NoticeBubbleManager {
  items = [];
  emitter = null;

  constructor() {
    this.emitter = new EventEmitter();
  }

  addListener(fn) {
    return this.emitter.subscribe(EVENT_NAME, fn);
  }

  createItem(props) {
    const manager = this;
    return {
      uid: createUUID(),
      type: 'info',
      ...props,
      onClose: function(...args) {
        if (props.onClose !== undefined) {
          props.onClose.apply(this, args);
        }
        if (this.props.visible === undefined) {
          manager.remove(this.props.uid);
        }
      },
    };
  }

  emit() {
    const list = this.items.map((item) => {
      if (item.visible === undefined) {
        return { ...item, visible: true };
      }
      return item;
    });
    this.emitter.emit(EVENT_NAME, list);
  }

  add(props) {
    const item = this.createItem(props);
    const { uid } = item;
    this.items.push(item);
    this.emit();
    return {
      uid,
      update: this.update.bind(this, uid),
      remove: this.remove.bind(this, uid),
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
      this.items.splice(index, 1);
      this.emit();
      return true;
    }
    return false;
  }

  // for documentation because react-docgen not resolve not react files
  render() {}
}

export { NoticeBubbleManager };
export default new NoticeBubbleManager();
