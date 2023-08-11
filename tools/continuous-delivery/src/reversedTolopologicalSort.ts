type Sortable<T> = {
  name: string;
  dependencies: string[];
  data: T;
};

export const reversedTopologicalSort = <T>(items: Sortable<T>[]): T[] => {
  const itemsMap = new Map<string, Sortable<T>>();
  const rootItems = new Set(items);
  for (const item of items) {
    itemsMap.set(item.name, item);
  }
  for (const item of items) {
    for (const dependency of item.dependencies) {
      rootItems.delete(itemsMap.get(dependency)!);
    }
  }
  const sumItemPriority = new Map<Sortable<T>, number>();

  for (const rootItem of rootItems) {
    // Tarjan algo. Only difference that we already know root.
    // https://en.wikipedia.org/wiki/Tarjan%27s_strongly_connected_components_algorithm

    const itemIndex = new Map<Sortable<T>, number>();
    const itemPriority = new Map<Sortable<T>, number>();
    const itemLowLink = new Map<Sortable<T>, number>();
    let index = 0;
    const stack: Sortable<T>[] = [];
    const onStack = new Map<Sortable<T>, boolean>();

    const strongconnect = (item: Sortable<T>) => {
      itemIndex.set(item, index);
      itemLowLink.set(item, index);
      index++;
      stack.push(item);
      onStack.set(item, true);

      for (const dependency of item.dependencies) {
        const dependantItem = itemsMap.get(dependency);
        if (!dependantItem) continue;
        if (!itemIndex.has(dependantItem)) {
          strongconnect(dependantItem);
          itemLowLink.set(item, Math.min(itemLowLink.get(item)!, itemLowLink.get(dependantItem)!));
        } else if (onStack.get(dependantItem)) {
          itemLowLink.set(item, Math.min(itemLowLink.get(item)!, itemIndex.get(dependantItem)!));
        }
      }

      if (itemLowLink.get(item) === itemIndex.get(item)) {
        let dependantItem: Sortable<T> | null = null;
        let priority = 0;
        while (stack.length > 0) {
          dependantItem = stack.pop()!;
          onStack.set(dependantItem, false);
          priority += itemLowLink.get(dependantItem)!;
        }
        priority += itemLowLink.get(item)!;
        itemPriority.set(item, priority);
      }
    };

    strongconnect(rootItem);

    for (const item of items) {
      sumItemPriority.set(item, (sumItemPriority.get(item) || 0) + (itemPriority.get(item) || 0));
    }
  }

  return [...items]
    .sort((a, b) => sumItemPriority.get(b)! - sumItemPriority.get(a)!)
    .map((item) => item.data);
};
