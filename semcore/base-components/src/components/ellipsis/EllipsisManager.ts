import canUseDOM from '@semcore/core/lib/utils/canUseDOM';

import type { Ellipsis } from './Ellipsis';
import { Queue } from './Queue';

export const isSafari = canUseDOM() ? /^((?!chrome|android).)*safari/i.test(navigator.userAgent) : false;

class EllipsisManager {
  private readonly queue: Queue;

  private ro: ResizeObserver | undefined;
  private io: IntersectionObserver | undefined;

  private readonly containersMap = new WeakMap<HTMLElement, Set<Ellipsis>>();
  private readonly containersApproximateSizeMap = new WeakMap<HTMLElement, [number, number]>();

  private handledElements = new WeakSet<HTMLElement>();
  private ellipsisEntities = new WeakMap<HTMLElement, Ellipsis>();
  private ellipsisMutationObservers = new WeakMap<HTMLElement, MutationObserver>();

  constructor() {
    this.queue = new Queue(isSafari ? { queueTimeout: 16 } : undefined);

    this.handleResizeObserver = this.handleResizeObserver.bind(this);
    this.handleMutationObserver = this.handleMutationObserver.bind(this);
    this.handleIntersectionObserver = this.handleIntersectionObserver.bind(this);

    this.handleCopy = this.handleCopy.bind(this);

    if (canUseDOM()) {
      this.ro = new ResizeObserver(this.handleResizeObserver);
      this.io = new IntersectionObserver(this.handleIntersectionObserver, {
        root: null,
        // @ts-ignore
        scrollMargin: '500px 500px 500px 500px',
        threshold: 0.1,
      });
      document.addEventListener('copy', this.handleCopy);
    }
  }

  public addEllipsis(ellipsis: Ellipsis) {
    const element = ellipsis.element;

    if (!this.ellipsisEntities.has(element)) {
      this.ellipsisEntities.set(element, ellipsis);

      this.io?.observe(element);

      if (ellipsis.observeChildrenMutations && canUseDOM()) {
        const mo = new MutationObserver(this.handleMutationObserver);
        mo.observe(element, {
          characterData: true,
          subtree: true,
          characterDataOldValue: true,
          childList: true,
        });

        this.ellipsisMutationObservers.set(element, mo);
      }
    }

    if (ellipsis.containerElement !== undefined) {
      const ellipsisSet = this.containersMap.get(ellipsis.containerElement) ?? new Set();

      ellipsisSet.add(ellipsis);

      this.containersMap.set(ellipsis.containerElement, ellipsisSet);
    }
  }

  public removeEllipsis(ellipsis: Ellipsis) {
    const element = ellipsis.element;

    if (this.ellipsisEntities.has(element)) {
      this.ellipsisEntities.delete(element);
      this.handledElements.delete(element);

      this.io?.unobserve(element);
      this.ro?.unobserve(element);
      this.ellipsisMutationObservers.get(element)?.disconnect();
      this.ellipsisMutationObservers.delete(element);
    }

    if (ellipsis.containerElement) {
      const ellipsisSet = this.containersMap.get(ellipsis.containerElement);
      if (ellipsisSet) {
        ellipsisSet.delete(ellipsis);

        if (ellipsisSet.size === 0) {
          this.containersMap.delete(ellipsis.containerElement);
        } else {
          this.containersMap.set(ellipsis.containerElement, ellipsisSet);
        }
      }
    }
  }

  private handleResizeObserver(entries: ResizeObserverEntry[]) {
    entries.forEach((entry) => {
      const target = entry.target;

      if (target instanceof HTMLElement) {
        const ellipsisSet = this.containersMap.get(target);
        if (ellipsisSet !== undefined) {
          const firstEllipsis = ellipsisSet.values().next().value;
          if (firstEllipsis) {
            this.containersApproximateSizeMap.set(target, firstEllipsis.getTruncateSize());
          }

          for (const el of ellipsisSet.values()) {
            const ellipsis = this.ellipsisEntities.get(el.element);

            if (ellipsis) {
              if (ellipsis.cropPosition === 'middle') {
                this.setApproximateSize(target, ellipsis);
              }

              this.queue.add(ellipsis.handleChanges);
            }
          }
        } else {
          const ellipsis = this.ellipsisEntities.get(target);

          if (ellipsis) {
            this.queue.add(ellipsis.handleChanges);
          }
        }
      }
    });
  }

  private handleMutationObserver(mutations: MutationRecord[]) {
    if (mutations.length === 1) {
      const { type, target } = mutations[0];

      let text: Text | undefined;

      if (type === 'characterData' && target instanceof Text) {
        text = target;
      } else if (type === 'childList') {
        const mutation = mutations[0];
        const addedNodes = mutation.addedNodes;
        const removedNodes = mutation.removedNodes;
        if (addedNodes.length === 1 && addedNodes[0] instanceof Text && removedNodes.length === 2 && removedNodes[0] instanceof HTMLSpanElement && removedNodes[1] instanceof HTMLSpanElement) {
          text = addedNodes[0];
        }
      }

      const parent = text?.parentElement;
      if (text && parent instanceof HTMLElement) {
        const ellipsis = this.ellipsisEntities.get(parent);

        if (ellipsis) {
          ellipsis.textContent = text.wholeText;
          ellipsis?.scheduler.schedule(ellipsis?.handleChanges);
        }
      }
    }
  }

  private handleIntersectionObserver(entries: IntersectionObserverEntry[]) {
    entries.forEach((entry) => {
      const target = entry.target;

      if (target instanceof HTMLElement) {
        if (entry.isIntersecting === true && !this.handledElements.has(target)) {
          const ellipsis = this.ellipsisEntities.get(target);

          if (ellipsis?.containerElement !== undefined) {
            this.ro?.observe(ellipsis?.containerElement);

            if (ellipsis.cropPosition === 'middle') {
              this.setApproximateSize(target, ellipsis);
            }

            this.queue.add(ellipsis.handleChanges);
          } else {
            this.ro?.observe(target);
          }

          this.handledElements.add(target);
        } else if (entry.isIntersecting === false && this.handledElements.has(target)) {
          const ellipsis = this.ellipsisEntities.get(target);

          if (ellipsis) {
            this.queue.delete(ellipsis.handleChanges);
          }

          this.handledElements.delete(target);

          this.ro?.unobserve(target);
          this.ellipsisMutationObservers.get(target)?.disconnect();
        }
      }
    });
  }

  private setApproximateSize(container: HTMLElement, ellipsis: Ellipsis) {
    const approximateSize = this.containersApproximateSizeMap.get(container);

    if (approximateSize && ellipsis.textContent.length > approximateSize[0] + approximateSize[1]) {
      ellipsis.element.textContent = ellipsis?.textContent.slice(0, approximateSize[0]) + '...' + ellipsis?.textContent.slice(-1 * approximateSize[1]);
    }
  }

  private handleCopy(event: ClipboardEvent) {
    if (event instanceof ClipboardEvent && event.target instanceof HTMLElement && event.target.parentElement instanceof HTMLElement) {
      const selection = window.getSelection();
      let ellipsis = this.ellipsisEntities.get(event.target);

      if (event.target.getAttribute('aria-hidden') === 'true') {
        ellipsis = this.ellipsisEntities.get(event.target.parentElement);
      }

      if (selection && ellipsis) {
        const ellipsisSpans = ellipsis.element.childNodes;
        const croppedSpan = ellipsisSpans[0];
        const lastSpan = ellipsisSpans[ellipsisSpans.length - 2];
        const fullSpan = ellipsisSpans[ellipsisSpans.length - 1];

        const croppedLength = croppedSpan?.textContent?.length;
        const lastLength = lastSpan?.textContent?.length;

        const anchorInCropped = selection.anchorNode === croppedSpan?.childNodes[0];
        const anchorInLast = selection.anchorNode === lastSpan?.childNodes[0];
        const focusInCropped = selection.focusNode === croppedSpan?.childNodes[0];
        const focusInLast = selection.focusNode === lastSpan?.childNodes[0];

        const anchorOffset = selection.anchorOffset;
        const focusOffset = selection.focusOffset;

        const isCroppedSelected =
          (anchorInCropped && focusOffset === croppedLength) ||
          (anchorInLast && anchorOffset === lastLength && focusInCropped && focusOffset === 0) ||
          (focusInLast && focusOffset === lastLength);

        const isFullSelected = selection.focusNode === fullSpan?.childNodes[0] && focusOffset === fullSpan?.textContent?.length;

        if (fullSpan?.textContent && (!(selection.focusNode instanceof Text) || isCroppedSelected || isFullSelected)) {
          event.preventDefault();
          navigator.clipboard.writeText(fullSpan.textContent);
        }
      }
    }
  }
}

export const ellipsisManager = new EllipsisManager();
