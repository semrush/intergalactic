export class TextMeasurer {
  private store = new Map<string, DOMRect>();

  measure(text: string, fontSize = 12) {
    const key = `${text};${fontSize}`;
    const storedValue = this.store.get(key);

    if (storedValue !== undefined) return storedValue;

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const textEl = document.createElementNS('http://www.w3.org/2000/svg', 'text');

    svg.style.position = 'absolute';
    svg.style.visibility = 'hidden';
    svg.style.pointerEvents = 'none';

    textEl.setAttribute('font-size', String(fontSize));
    textEl.textContent = text;

    svg.appendChild(textEl);
    document.body.appendChild(svg);

    const bbox = textEl.getBBox();

    this.store.set(key, bbox);

    svg.remove();

    return bbox;
  }
}
