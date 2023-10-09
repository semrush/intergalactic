## Automated screen reader testing

_Intergalactic v15.25.2, React v18.2.0, Playwright v1.25.1,
Guidepup v0.13.1, MacOS Monterey 12._

**Running screen reader against [this file](https://github.com/semrush/intergalactic/blob/master/website/docs/components/filter-trigger/examples/select.tsx).**

```
1. Screen reader goes into the active element.
2. Screen reader says "In web content Filter trigger with options Filter trigger with options".
3. Screen reader goes to the next element.
4. Screen reader says "Filter Select option list box pop up button".
5. Screen reader triggers element default action.
6. Screen reader goes to the next element.
7. Screen reader says "List of options list box".
8. Screen reader goes to the next element.
9. Screen reader goes to the next element.
10. Screen reader triggers element default action.
11. Screen reader says "Option 3 group Filter list box pop up group".
12. Screen reader goes out of active element.
13. Screen reader says "Filter list box pop up group".
14. Screen reader goes into the active element.
15. Screen reader says "Option 3".
16. Screen reader triggers element default action.
17. Screen reader goes to the next element.
18. Screen reader says "Option 3 button".
19. Screen reader triggers element default action.
20. Screen reader says "Filter list box pop up empty pop up button".
21. Screen reader goes out of active element.
22. Screen reader says "Out of web content".
23. Screen reader goes into the active element.
24. Screen reader says "Filter Select option list box pop up button".
25. Screen reader goes to the next element.
```
