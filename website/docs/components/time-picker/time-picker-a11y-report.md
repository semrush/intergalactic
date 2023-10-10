## Automated screen reader testing

_Intergalactic v15.25.1, React v18.2.0, Playwright v1.25.1,
Guidepup v0.13.1, MacOS Monterey 12._

**Running screen reader against [this file](https://github.com/semrush/intergalactic/blob/master/website/docs/components/time-picker/examples/expanded.tsx).**

```
1. Screen reader goes into the active element.
2. Screen reader says "In web content Your time Your time".
3. Screen reader goes to the next element.
4. Screen reader says "Your time group".
5. Screen reader goes into the active element.
6. Screen reader says "Time input, no time entered group".
7. Screen reader goes into the active element.
8. Screen reader says "Hours input field 00 list box pop up Menu pop-up combo box".
9. Screen reader goes into the active element.
10. Screen reader says "In Menu pop-up combo box".
11. Screen reader types "04".
12. Screen reader says "Minutes input field 00 list box pop up Menu pop-up combo box".
13. Screen reader goes to the next element.
14. Screen reader says "04".
15. Screen reader types "20".
16. Screen reader says "20".
17. Screen reader presses the "Enter" button.
18. Screen reader goes out of active element.
19. Screen reader says "Your time group".
20. Screen reader goes into the active element.
21. Screen reader says "Time input, entered time is 4:20 AM group".
```
