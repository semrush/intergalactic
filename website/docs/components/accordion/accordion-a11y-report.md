## Automated screen reader testing

_Intergalactic v15.6.2, React v18.2.0, Playwright v1.25.1,
Guidepup v0.13.1, MacOS Monterey 12._

**Running screen reader against [this file](https://github.com/semrush/intergalactic/blob/master/website/docs/components/accordion/examples/base.tsx).**

```
1. Screen reader goes into the active element.
2. Screen reader says "Section 1 expanded button".
3. Screen reader triggers element default action.
4. Screen reader goes to the next element.
5. Screen reader says "Section 2 collapsed button".
6. Screen reader goes to the next element.
7. Screen reader says "Section 3 dimmed collapsed button".
8. Screen reader goes to the previous element.
9. Screen reader says "Section 2 collapsed button".
10. Screen reader goes to the previous element.
11. Screen reader says "Section 1 collapsed button".
12. Screen reader triggers element default action.
13. Screen reader says "Section 1 expanded button".
14. Screen reader goes to the next element.
15. Screen reader says "Section 1 region".
16. Screen reader goes into the active element.
17. Screen reader says "Hello Section 1".
18. Screen reader goes out of active element.
19. Screen reader says "Section 1 region".
20. Screen reader goes to the previous element.
21. Screen reader says "Section 1 expanded button".
22. Screen reader triggers element default action.
23. Screen reader says "Section 1 collapsed button".
24. Screen reader goes to the next element.
25. Screen reader says "Section 2 collapsed button".
26. Screen reader goes to the next element.
27. Screen reader says "Section 3 dimmed collapsed button".
28. Screen reader triggers element default action.
29. Screen reader says "dimmed".
```
