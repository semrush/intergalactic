## Automated screen reader testing

_Intergalactic v14.6.0, React v18.2.0, Playwright v1.25.1,
Guidepup v0.13.1, MacOS Monterey 12._

**Running screen reader against [this file](https://github.com/semrush/intergalactic/blob/master/website/docs/components/date-picker/examples/datepicker.tsx).**

```
1. Screen reader goes into the active element.
2. Screen reader says "In web content Date field group".
3. Screen reader goes into the active element.
4. Screen reader says "06/29/2020 Insertion at end of text. Date MM/DD/YYYY edit text".
5. Screen reader presses the "Backspace" button.
6. Screen reader says "0".
7. Screen reader presses the "Backspace" button.
8. Screen reader says "2".
9. Screen reader presses the "Backspace" button.
10. Screen reader says "0".
11. Screen reader presses the "Backspace" button.
12. Screen reader says "06/29".
13. Screen reader presses the "Backspace" button.
14. Screen reader says "9".
15. Screen reader presses the "Backspace" button.
16. Screen reader says "06".
17. Screen reader presses the "Backspace" button.
18. Screen reader says "6".
19. Screen reader presses the "Backspace" button.
20. Screen reader says "0".
21. Screen reader types "05".
22. Screen reader types "29".
23. Screen reader says "2".
24. Screen reader goes out of active element.
25. Screen reader says "Date field group".
26. Screen reader goes into the active element.
27. Screen reader says "05/29 Insertion at end of text. Date MM/DD/YYYY edit text".
28. Screen reader types "2000".
29. Screen reader says "05/29/2000 Insertion at end of text. Date MM/DD/YYYY edit text".
30. Screen reader goes out of active element.
31. Screen reader says "Date field group".
32. Screen reader goes to the next element.
33. Screen reader goes into the active element.
34. Screen reader says "from date MM/DD/YYYY edit text".
35. Screen reader types "05".
36. Screen reader says "5".
37. Screen reader types "29".
38. Screen reader says "29".
39. Screen reader types "2000".
40. Screen reader says "05/29/2000 Insertion at end of text. from date MM/DD/YYYY edit text".
41. Screen reader types "05".
42. Screen reader says "to date MM/DD/YYYY edit text".
43. Screen reader types "29".
44. Screen reader says "29".
45. Screen reader types "2000".
46. Screen reader says "05/29/2000 Insertion at end of text. to date MM/DD/YYYY edit text".
47. Screen reader goes out of active element.
48. Screen reader says "Date field group".
```
