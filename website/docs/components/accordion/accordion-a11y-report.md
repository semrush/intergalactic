## Automated screen reader testing

_Intergalactic v13.4.0, React v18.2.0, Playwright v1.25.1,
Guidepup v0.13.1, MacOS Monterey 12._

**Running screen reader against [this file](https://github.com/semrush/intergalactic/blob/master/website/docs/components/accordion/examples/base.jsx).**

```
1. Screen reader goes into the active element.
2. Screen reader says "Section 1 expanded button".
3. Screen reader triggers element default action.
4. Screen reader says "Section 1 button".
5. Screen reader goes to the next element.
6. Screen reader says "Section 2 button".
7. Screen reader goes to the next element.
8. Screen reader says "Section 3 dimmed button".
9. Screen reader goes to the previous element.
10. Screen reader says "Section 2 button".
11. Screen reader goes to the previous element.
12. Screen reader says "Section 1 button".
13. Screen reader triggers element default action.
14. Screen reader says "Section 1 expanded button".
15. Screen reader goes to the next element.
16. Screen reader says "Section 1 region".
17. Screen reader goes into the active element.
18. Screen reader says "Hello Section 1".
19. Screen reader goes out of active element.
20. Screen reader says "Section 1 region".
21. Screen reader goes to the previous element.
22. Screen reader says "Section 1 expanded button".
23. Screen reader triggers element default action.
24. Screen reader says "Section 1 button".
25. Screen reader goes to the next element.
26. Screen reader says "Section 2 button".
27. Screen reader goes to the next element.
28. Screen reader says "Section 3 dimmed button".
29. Screen reader triggers element default action.
30. Screen reader says "dimmed".
```
