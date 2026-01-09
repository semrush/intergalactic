import canUseDOM from '@semcore/core/lib/utils/canUseDOM';

import type { Ellipsis } from './Ellipsis';

class EllipsisManager {
  private ro = new ResizeObserver(this.handleResizeObserver.bind(this));
  private io = new IntersectionObserver(this.handleIntersectionObserver.bind(this), {
    root: null,
    // @ts-ignore
    scrollMargin: '500px 500px 500px 500px',
    threshold: 0.1,
  });

  private readonly containersMap = new WeakMap<HTMLElement, Set<Ellipsis>>();
  private readonly containersApproximateSizeMap = new WeakMap<HTMLElement, [number, number]>();

  private handledElements = new WeakSet<HTMLElement>();
  private ellipsisEntities = new WeakMap<HTMLElement, Ellipsis>();
  private ellipsisMutationObservers = new WeakMap<HTMLElement, MutationObserver>();

  constructor() {
    this.handleResizeObserver = this.handleResizeObserver.bind(this);
    this.handleMutationObserver = this.handleMutationObserver.bind(this);
    this.handleIntersectionObserver = this.handleIntersectionObserver.bind(this);

    this.handleCopy = this.handleCopy.bind(this);

    if (canUseDOM()) {
      document.addEventListener('copy', this.handleCopy);
    }
  }

  public addEllipsis(ellipsis: Ellipsis) {
    const element = ellipsis.element;

    if (!this.ellipsisEntities.has(element)) {
      this.ellipsisEntities.set(element, ellipsis);

      this.io.observe(element);

      if (ellipsis.observeChildrenMutations) {
        const mo = new MutationObserver(this.handleMutationObserver);
        mo.observe(element, {
          characterData: true,
          subtree: true,
          characterDataOldValue: true,
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

      this.io.unobserve(element);
      this.ro.unobserve(element);
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

            if (ellipsis && ellipsis.cropPosition === 'middle') {
              this.setApproximateSize(target, ellipsis);
            }

            ellipsis?.scheduler.schedule(ellipsis?.handleChanges);
          }
        } else {
          const ellipsis = this.ellipsisEntities.get(target);

          ellipsis?.scheduler.schedule(ellipsis?.handleChanges);
        }
      }
    });
  }

  private handleMutationObserver(mutations: MutationRecord[]) {
    const text = mutations[0]?.target;
    const parent = text?.parentElement;

    if (text instanceof Text && parent instanceof HTMLElement) {
      const ellipsis = this.ellipsisEntities.get(parent);

      if (ellipsis) {
        ellipsis.textContent = text.wholeText;
        ellipsis?.scheduler.schedule(ellipsis?.handleChanges);
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

            ellipsis?.scheduler.schedule(ellipsis?.handleChanges);
          } else {
            this.ro?.observe(target);
          }

          this.handledElements.add(target);
        } else if (entry.isIntersecting === false && this.handledElements.has(target)) {
          const ellipsis = this.ellipsisEntities.get(target);
          ellipsis?.scheduler.cancel();

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
    if (event instanceof ClipboardEvent && event.target instanceof HTMLElement) {
      const selection = window.getSelection();
      const ellipsis = this.ellipsisEntities.get(event.target);

      if (selection && ellipsis && (selection.anchorNode === ellipsis.element.childNodes[0] || selection.focusNode === ellipsis.element.childNodes[0])) {
        if (!(selection.focusNode instanceof Text) || selection.focusOffset === ellipsis.element.textContent?.length || selection.focusOffset === 0) {
          navigator.clipboard.writeText(ellipsis.textContent);
        }
      }
    }
  }
}

export const ellipsisManager = new EllipsisManager();
