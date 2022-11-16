## Automated screen reader testing

_Intergalactic v13.1.1, React v18.2.0, Playwright v1.25.1,
Guidepup v0.13.1, MacOS Big Sur 11._

**Running screen reader against [this file](https://github.com/semrush/intergalactic/blob/master/website/docs/components/date-picker/examples/datepicker.jsx).**

```
1. Screen reader goes into the active element.
2. Screen reader says "In web content Date field group".
3. Screen reader goes into the active element.
4. Screen reader says "2020".
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
22. Screen reader says "5".
23. Screen reader types "29".
24. Screen reader says "2".
25. Screen reader goes out of active element.
26. Screen reader says "Press Tab to go to popover group".
27. Screen reader goes into the active element.
28. Screen reader says "05/29 Insertion at end of text. Date MM/DD/YYYY edit text".
29. Screen reader types "2000".
30. Screen reader says "0".
31. Screen reader goes out of active element.
32. Screen reader says "2000".
33. Screen reader goes to the next element.
34. Screen reader says "Date field group".
35. Screen reader goes into the active element.
36. Screen reader says "from date MM/DD/YYYY invalid data edit text".
37. Screen reader types "05".
38. Screen reader says "0".
39. Screen reader types "29".
40. Screen reader says "2".
41. Screen reader types "2000".
42. Screen reader says "to date MM/DD/YYYY invalid data edit text".
43. Screen reader types "05".
44. Screen reader says "05".
45. Screen reader types "29".
46. Screen reader says "29".
47. Screen reader types "2000".
48. Screen reader says "You are currently on a text field. To enter text in this field, type.".
49. Screen reader goes out of active element.
50. Screen reader says "Date field group".
```
