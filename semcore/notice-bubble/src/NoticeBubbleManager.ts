import { callAllEventHandlers } from '@semcore/core/lib/utils/assignProps';
import EventEmitter from '@semcore/core/lib/utils/eventEmitter';
import React from 'react';

import type { NSNoticeBubble } from './NoticeBubble.type';

const EVENT_NAME = 'CHANGE';

class NoticeBubbleManager implements NSNoticeBubble.Manager {
  private items: NSNoticeBubble.Item[] = [];
  private emitter = new EventEmitter();
  private counter = 0;

  public addListener(fn: (items: NSNoticeBubble.Item[]) => void): () => void {
    return this.emitter.subscribe(EVENT_NAME, fn);
  }

  private emit() {
    this.emitter.emit(EVENT_NAME, this.items);
  }

  public add(props: NSNoticeBubble.Info.Props | NSNoticeBubble.Warning.Props): NSNoticeBubble.Meta {
    const uid = this.counter++;
    const ref = React.createRef<HTMLElement>();

    const item = {
      type: 'info',
      uid,
      visible: true,
      forwardRef: ref,
      ...props,
      onClose: callAllEventHandlers(props.onClose, () => {
        this.remove(uid);
      }),
    } as const;
    this.items.push(item);
    this.emit();
    return {
      uid,
      update: this.replace.bind(this, uid),
      remove: this.remove.bind(this, uid),
      ref,
    };
  }

  public replace(uid: number, props: NSNoticeBubble.Info.Props | NSNoticeBubble.Warning.Props): Promise<NSNoticeBubble.Meta> {
    this.remove(uid);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.add(props));
      }, 300);
    });
  }

  public replaceLast(props: NSNoticeBubble.Info.Props | NSNoticeBubble.Warning.Props): Promise<NSNoticeBubble.Meta> {
    const item = this.items[this.items.length - 1];

    if (item?.visible) {
      this.remove(this.counter - 1);
    }

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.add(props));
      }, 300);
    });
  }

  public remove(uid: number): boolean {
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
