## Automated screen reader testing

_Intergalactic v15.26.0, React v18.2.0, Playwright v1.25.1,
Guidepup v0.13.1, MacOS Monterey 12._

**Running screen reader against [this file](https://github.com/semrush/intergalactic/blob/master/website/docs/components/input-mask/examples/basic.tsx).**

```
1. Screen reader goes into the active element.
2. Screen reader says "In web content Card number Card number".
3. Screen reader goes to the next element.
4. Screen reader says "Card number edit text".
5. Screen reader goes into the active element.
6. Screen reader says "In edit text".
7. Screen reader types "55aa44 ".
8. Screen reader says "5544".
9. Screen reader goes out of active element.
10. Screen reader says "Out of edit text".
```
