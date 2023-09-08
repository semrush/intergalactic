## Automated screen reader testing

_Intergalactic v15.16.2, React v18.2.0, Playwright v1.25.1,
Guidepup v0.13.1, MacOS Monterey 12._

**Running screen reader against [this file](https://github.com/semrush/intergalactic/blob/master/website/docs/components/filter-trigger/examples/select.tsx).**

```
1. Screen reader goes into the active element.
2. Screen reader says "In web content Filter trigger with options Filter trigger with options".
3. Screen reader goes to the next element.
4. Screen reader says "Filter list box pop up group".
5. Screen reader triggers element default action.
6. Screen reader says "You are currently on a group, inside of web content.".
7. Screen reader goes to the next element.
8. Screen reader says "Select option  clickable".
9. Screen reader goes to the next element.
10. Screen reader says "end of Filter list box pop up group".
11. Screen reader goes to the next element.
12. Screen reader says "List of options list box".
13. Screen reader triggers element default action.
14. Screen reader says "Option 3 group Filter list box pop up group".
15. Screen reader goes out of active element.
16. Screen reader says "Filter list box pop up group".
17. Screen reader goes into the active element.
18. Screen reader says "Option 3".
19. Screen reader triggers element default action.
20. Screen reader goes to the next element.
21. Screen reader says "Option 3 button".
22. Screen reader triggers element default action.
23. Screen reader says "Select option group Filter list box pop up group".
24. Screen reader goes out of active element.
25. Screen reader says "Filter list box pop up group".
26. Screen reader goes into the active element.
27. Screen reader says "Select option  clickable".
28. Screen reader goes to the next element.
29. Screen reader says "end of Filter list box pop up group".
```
