## Automated screen reader testing

_Intergalactic v13.1.0, React v18.2.0, Playwright v1.25.1,
Guidepup v0.13.1, MacOS Big Sur 11._

**Running screen reader against [this file](https://github.com/semrush/intergalactic/blob/master/website/docs/components/accordion/examples/base.jsx).**

```
1. Screen reader goes into the active element.
2. Screen reader says "Section 1 button".
3. Screen reader goes to the next element.
4. Screen reader says "Section 2 button".
5. Screen reader goes to the next element.
6. Screen reader says "Section 3 dimmed button".
7. Screen reader goes to the previous element.
8. Screen reader says "Section 2 button".
9. Screen reader goes to the previous element.
10. Screen reader says "Section 1 button".
11. Screen reader triggers element default action.
12. Screen reader goes to the next element.
13. Screen reader says "Section 1 region".
14. Screen reader goes into the active element.
15. Screen reader says "Hello Section 1".
16. Screen reader goes out of active element.
17. Screen reader says "Section 1 region".
18. Screen reader goes to the previous element.
19. Screen reader says "Section 1 expanded button".
20. Screen reader triggers element default action.
21. Screen reader says "Section 1 button".
22. Screen reader goes to the next element.
23. Screen reader says "Section 2 button".
24. Screen reader goes to the next element.
25. Screen reader says "Section 3 dimmed button".
26. Screen reader triggers element default action.
27. Screen reader says "dimmed".
```
