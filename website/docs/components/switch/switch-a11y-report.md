## Automated screen reader testing

_Intergalactic v13.31.1, React v18.2.0, Playwright v1.25.1,
Guidepup v0.13.1, MacOS Monterey 12._

**Running screen reader against [this file](https://github.com/semrush/intergalactic/blob/master/website/docs/components/switch/examples/base.tsx).**

```
1. Screen reader goes into the active element.
2. Screen reader says "In web content Email subscription Email subscription".
3. Screen reader goes to the next element.
4. Screen reader says "Enabled on switch".
5. Screen reader triggers element default action.
6. Screen reader says "off Disabled switch".
7. Screen reader goes out of active element.
8. Screen reader says "Out of web content".
9. Screen reader goes into the active element.
10. Screen reader says "Disabled off switch".
```
