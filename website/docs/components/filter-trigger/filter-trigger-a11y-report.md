## Automated screen reader testing

_Intergalactic v15.6.2, React v18.2.0, Playwright v1.25.1,
Guidepup v0.13.1, MacOS Monterey 12._

**Running screen reader against [this file](https://github.com/semrush/intergalactic/blob/master/website/docs/components/filter-trigger/examples/select.tsx).**

```
1. Screen reader goes into the active element.
2. Screen reader says "In web content Filter trigger with options Filter trigger with options".
3. Screen reader goes to the next element.
4. Screen reader says "Filter list box pop up group".
5. Screen reader triggers element default action.
6. Screen reader goes to the next element.
7. Screen reader says "You are currently on a text element.".
8. Screen reader goes to the next element.
9. Screen reader says "end of Filter list box pop up group".
10. Screen reader goes to the next element.
11. Screen reader says "List of options list box".
12. Screen reader triggers element default action.
13. Screen reader says "Option 3 group Filter list box pop up group".
14. Screen reader goes out of active element.
15. Screen reader says "Filter list box pop up group".
16. Screen reader goes into the active element.
17. Screen reader says "Option 3".
18. Screen reader triggers element default action.
19. Screen reader goes to the next element.
20. Screen reader says "Option 3 button".
21. Screen reader triggers element default action.
22. Screen reader says "Select option group Filter list box pop up group".
23. Screen reader goes out of active element.
24. Screen reader says "Filter list box pop up group".
25. Screen reader goes into the active element.
26. Screen reader says "Select option  clickable".
27. Screen reader goes to the next element.
28. Screen reader says "end of Filter list box pop up group".
```
