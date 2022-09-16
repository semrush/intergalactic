## Automated screen reader testing

_Intergalactic v12.5.0, React v17.0.1, Playwright v1.25.1,
Guidepup v0.13.0, MacOS Monterey 12._

**Running screen reader against [this file](https://github.com/semrush/intergalactic/blob/master/website/docs/components/input-mask/examples/basic.jsx).**

1. Screen reader goes into the active element.
2. Screen reader says "16-digit number invalid data edit text".
3. Screen reader goes into the active element.
4. Screen reader says "In edit text".
5. Screen reader types "55aa44".
6. Screen reader says "4".
7. Screen reader goes out of active element.
8. Screen reader says "Out of edit text".
