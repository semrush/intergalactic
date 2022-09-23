## Automated screen reader testing

_Intergalactic v12.5.1, React v17.0.1, Playwright v1.25.1,
Guidepup v0.13.0, MacOS Monterey 12._

**Running screen reader against [this file](https://github.com/semrush/intergalactic/blob/master/website/docs/components/pills/examples/basic.jsx).**

1. Screen reader goes into the active element.
2. Screen reader says "Like radio button, 1 of 3".
3. Screen reader goes to the next element.
4. Screen reader says "Don't care selected radio button, 2 of 3".
5. Screen reader goes to the next element.
6. Screen reader says "Dislike radio button, 3 of 3".
7. Screen reader triggers element default action.
8. Screen reader says "selected Dislike radio button, 3 of 3".
9. Screen reader goes to the previous element.
10. Screen reader says "Don't care radio button, 2 of 3".
