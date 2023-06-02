## Automated screen reader testing

_Intergalactic v13.31.1, React v18.2.0, Playwright v1.25.1,
Guidepup v0.13.1, MacOS Monterey 12._

**Running screen reader against [this file](https://github.com/semrush/intergalactic/blob/master/website/docs/components/drag-and-drop/examples/tabs.tsx).**

```
1. Screen reader goes into the active element.
2. Screen reader says "Overview selected tab, 1 of 3".
3. Screen reader goes to the next element.
4. Screen reader says "new Issues tab, 2 of 3".
5. Screen reader presses the "Space" button.
6. Screen reader says "newIssues grabbed, current position is 2 of 3".
7. Screen reader goes to the next element.
8. Screen reader says "new Issues tab, 3 of 3".
9. Screen reader presses the "Space" button.
10. Screen reader says "newIssues dropped, final position is 3 of 3".
```
