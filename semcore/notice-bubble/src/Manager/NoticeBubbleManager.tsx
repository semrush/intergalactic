import createUUID from '@semcore/utils/lib/createUUID';
import EventEmitter from '@semcore/utils/lib/eventEmitter';

const EVENT_NAME = 'CHANGE';

export interface INoticeBubbleManager {
  /**
   * Adding a notice.
   * Takes the props properties of NoticeBubble.
   *  Returns an object with the uid and the update, remove functions.
   * */
  add?: (props: object) => object;
  /**
   * Updates the notice by uid.
   * Takes the uid-unique identifier and the props-properties of NoticeBubble.
   *  Returns a successful or unsuccessful update.
   * */
  update?: (uid: string, props: object) => boolean;
  /**
   * Deletes the notice by uid.
   * Takes an uid-unique identifier.
   * Returns a successful or unsuccessful deletion.
   * */
  remove?: (uid: string) => boolean;
}

/**
 * ```js
 * import NoticeBubbleManager from "@semcore/notice-bubble"
 * ```
 *
 * The manager is a repository of all notices and has the ability
 * to add, delete and update notices by calling the appropriate methods.
 * */
class NoticeBubbleManager implements INoticeBubbleManager {
  private items = [];
  private emitter: EventEmitter;

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
      onClose: function (...args) {
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
    const list = this.items.filter((item) => item.visible === undefined || item.visible);
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
