## Automated screen reader testing

_Intergalactic v13.5.0, React v18.2.0, Playwright v1.25.1,
Guidepup v0.13.1, MacOS Big Sur 11._

**Running screen reader against [this file](https://github.com/semrush/intergalactic/blob/master/website/docs/components/filter-trigger/examples/select.jsx).**

```
1. Screen reader goes into the active element.
2. Screen reader says "Filter list box pop up group".
3. Screen reader triggers element default action.
4. Screen reader goes to the next element.
5. Screen reader says "Select option  clickable".
6. Screen reader goes to the next element.
7. Screen reader says "end of Press Tab to go to popover list box pop up group".
8. Screen reader goes to the next element.
9. Screen reader says "List of options list box".
10. Screen reader triggers element default action.
11. Screen reader goes out of active element.
12. Screen reader says "Out of web content".
13. Screen reader goes into the active element.
14. Screen reader says "Filter list box pop up group".
15. Screen reader goes into the active element.
16. Screen reader says "Option 3".
17. Screen reader goes to the next element.
18. Screen reader says "Clear button".
19. Screen reader triggers element default action.
20. Screen reader goes out of active element.
21. Screen reader says "Out of web content".
22. Screen reader goes into the active element.
23. Screen reader says "Filter list box pop up group".
```
