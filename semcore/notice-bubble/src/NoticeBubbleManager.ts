import { callAllEventHandlers } from '@semcore/core/lib/utils/assignProps';
import EventEmitter from '@semcore/core/lib/utils/eventEmitter';
import type { RefObject } from 'react';
import React from 'react';

import type {
  NoticeBubbleManagerClass,
  NoticeBubbleInfoProps,
  NoticeBubbleWarningProps,
  AddedNoticeMeta,
} from './NoticeBubble.type';

const EVENT_NAME = 'CHANGE';

export type NoticeItem = (NoticeBubbleInfoProps | NoticeBubbleWarningProps) & {
  uid: number;
  visible: boolean;
  forwardRef: RefObject<HTMLElement>;
  onClose: () => void;
};

class NoticeBubbleManager implements NoticeBubbleManagerClass {
  private items: NoticeItem[] = [];
  private emitter = new EventEmitter();
  private counter = 0;

  public addListener(fn: (items: NoticeItem[]) => void): () => void {
    return this.emitter.subscribe(EVENT_NAME, fn);
  }

  private emit() {
    this.emitter.emit(EVENT_NAME, this.items);
  }

  public add(props: NoticeBubbleInfoProps | NoticeBubbleWarningProps): AddedNoticeMeta {
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

  public replace(uid: number, props: NoticeBubbleInfoProps | NoticeBubbleWarningProps): Promise<AddedNoticeMeta> {
    this.remove(uid);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.add(props));
      }, 300);
    });
  }

  public replaceLast(props: NoticeBubbleInfoProps | NoticeBubbleWarningProps): Promise<AddedNoticeMeta> {
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
