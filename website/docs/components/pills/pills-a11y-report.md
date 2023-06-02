## Automated screen reader testing

_Intergalactic v13.31.1, React v18.2.0, Playwright v1.25.1,
Guidepup v0.13.1, MacOS Monterey 12._

**Running screen reader against [this file](https://github.com/semrush/intergalactic/blob/master/website/docs/components/pills/examples/basic.tsx).**

```
1. Screen reader goes into the active element.
2. Screen reader says "Like tab, 1 of 3".
3. Screen reader goes to the next element.
4. Screen reader says "Don't care selected tab, 2 of 3".
5. Screen reader goes to the next element.
6. Screen reader says "Dislike tab, 3 of 3".
7. Screen reader triggers element default action.
8. Screen reader says "selected".
9. Screen reader says "You are currently on a selected tab, 3 of 3, inside of web content.  To exit this web area, press Control-Option-Shift-Up Arrow.".
10. Screen reader goes to the previous element.
11. Screen reader says "Don't care tab, 2 of 3".
```
