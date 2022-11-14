## Automated screen reader testing

_Intergalactic v13.1.1, React v18.2.0, Playwright v1.25.1,
Guidepup v0.13.1, MacOS Big Sur 11._

**Running screen reader against [this file](https://github.com/semrush/intergalactic/blob/master/website/docs/components/time-picker/examples/expanded.jsx).**

```
1. Screen reader goes into the active element.
2. Screen reader says "Time input, no time entered group".
3. Screen reader goes into the active element.
4. Screen reader says "hours field 00 edit text".
5. Screen reader goes into the active element.
6. Screen reader says "In edit text".
7. Screen reader types "04".
8. Screen reader says "04".
9. Screen reader goes out of active element.
10. Screen reader says "Out of edit text".
11. Screen reader goes to the next element.
12. Screen reader says "minutes field 00 edit text".
13. Screen reader goes into the active element.
14. Screen reader says "In edit text".
15. Screen reader types "20".
16. Screen reader says "20".
17. Screen reader goes out of active element.
18. Screen reader says "Out of edit text".
19. Screen reader goes to the previous element.
20. Screen reader says "04 Insertion at end of text. hours field edit text".
21. Screen reader goes out of active element.
22. Screen reader says "Time input, entered time is 4:20 AM group".
```
