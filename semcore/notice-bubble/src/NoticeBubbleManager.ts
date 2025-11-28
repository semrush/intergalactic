import { callAllEventHandlers } from '@semcore/core/lib/utils/assignProps';
import EventEmitter from '@semcore/core/lib/utils/eventEmitter';
import { setFocus } from '@semcore/core/lib/utils/use/useFocusLock';
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
  visible?: boolean;
  forwardRef: RefObject<HTMLElement>;
  onClose: () => void;
};

class NoticeBubbleManager implements NoticeBubbleManagerClass {
  private items: NoticeItem[] = [];
  private emitter = new EventEmitter();
  private counter = 0;

  private replaceTimer: ReturnType<typeof setTimeout> | null = null;

  public addListener(fn: (items: NoticeItem[]) => void): () => void {
    return this.emitter.subscribe(EVENT_NAME, fn);
  }

  private emit() {
    this.emitter.emit(EVENT_NAME, this.items);
  }

  public add(props: NoticeBubbleInfoProps | NoticeBubbleWarningProps): AddedNoticeMeta {
    const uid = this.counter++;
    const ref = React.createRef<HTMLElement>();
    const focus = () => {
      setTimeout(() => {
        if (ref.current) {
          setFocus(ref.current);
        }
      }, 0);
    };
    const item = {
      type: 'info',
      uid,
      visible: props.initialAnimation ? true : undefined,
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
      update: this.update.bind(this, uid),
      remove: this.remove.bind(this, uid),
      ref,
      // todo Brauer Ilia: remove this property, because we added logic about autofocus in Notice
      focus,
    };
  }

  public update(uid: number, props: NoticeBubbleInfoProps | NoticeBubbleWarningProps): boolean {
    const index = this.items.findIndex((item) => item.uid === uid);
    if (index !== -1) {
      this.items[index] = {
        ...this.items[index],
        ...props,
      };
      this.emit();
      return true;
    }
    return false;
  }

  public replace(uid: number, props: NoticeBubbleInfoProps | NoticeBubbleWarningProps): void {
    if (this.replaceTimer) {
      clearTimeout(this.replaceTimer);
    }

    this.remove(uid);

    this.replaceTimer = setTimeout(() => {
      this.add(props);
    }, 300);
  }

  public replaceLast(props: NoticeBubbleInfoProps | NoticeBubbleWarningProps): void {
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
