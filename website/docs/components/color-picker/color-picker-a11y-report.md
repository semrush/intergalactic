## Automated screen reader testing

_Intergalactic v13.0.2, React v18.2.0, Playwright v1.25.1,
Guidepup v0.13.1, MacOS Big Sur 11._

**Running screen reader against [this file](https://github.com/semrush/intergalactic/blob/master/website/docs/components/color-picker/examples/defaultExtended.jsx).**

```
1. Screen reader goes into the active element.
2. Screen reader says "Color field, empty menu pop up button".
3. Screen reader triggers element default action.
4. Screen reader says "Color field, empty, press Tab to go to palette or click to hide palette".
5. Screen reader presses the "Tab" button.
6. Screen reader says "Colors palette, press Tab+Shift to go back to color field group".
7. Screen reader goes to the next element.
8. Screen reader says "list Preset colors 12 items".
9. Screen reader goes to the next element.
10. Screen reader says "Clear color group 1 of 12".
11. Screen reader goes to the next element.
12. Screen reader says "Color #2BB3FF group 2 of 12".
13. Screen reader goes to the next element.
14. Screen reader says "Color #8649E1 group 3 of 12".
15. Screen reader triggers element default action.
16. Screen reader says "Color field, current color is #8649E1 menu pop up button".
17. Screen reader triggers element default action.
18. Screen reader says "Color field, current color is #8649E1, press Tab to go to palette or click to hide palette".
19. Screen reader presses the "Tab" button.
20. Screen reader says "Colors palette, press Tab+Shift to go back to color field group".
21. Screen reader goes to the next element.
22. Screen reader says "list Preset colors 12 items".
23. Screen reader goes to the next element.
24. Screen reader says "Clear color group 1 of 12".
25. Screen reader goes to the next element.
26. Screen reader says "Color #2BB3FF group 2 of 12".
27. Screen reader goes to the next element.
28. Screen reader says "Color #8649E1 group 3 of 12".
29. Screen reader goes to the next element.
30. Screen reader says "Color #C695FF group 4 of 12".
31. Screen reader goes to the next element.
32. Screen reader says "Color #F67CF2 group 5 of 12".
33. Screen reader goes to the next element.
34. Screen reader says "Color #FFA9FA group 6 of 12".
35. Screen reader goes to the next element.
36. Screen reader says "Color #FF8786 group 7 of 12".
37. Screen reader goes to the next element.
38. Screen reader says "Color #FF8C43 group 8 of 12".
39. Screen reader goes to the next element.
40. Screen reader says "Color #FDC23C group 9 of 12".
41. Screen reader goes to the next element.
42. Screen reader says "Color #66C030 group 10 of 12".
43. Screen reader goes to the next element.
44. Screen reader says "Color #9BD85D group 11 of 12".
45. Screen reader goes to the next element.
46. Screen reader says "Color #C7EE96 group 12 of 12".
47. Screen reader goes to the next element.
48. Screen reader says "end of list".
49. Screen reader goes to the next element.
50. Screen reader says "Custom color field container empty group".
51. Screen reader goes to the next element.
52. Screen reader says "Custom color field, HEX format FFFFFF edit text".
53. Screen reader goes into the active element.
54. Screen reader says "In edit text".
55. Screen reader types "0088FF".
56. Screen reader says "F".
57. Screen reader goes out of active element.
58. Screen reader says "0088FF".
59. Screen reader goes to the next element.
60. Screen reader says "Add color to the list of custom colors button".
61. Screen reader triggers element default action.
62. Screen reader says "0088FF".
63. Screen reader goes to the previous element.
64. Screen reader says "end of list".
65. Screen reader goes to the previous element.
66. Screen reader says "Color #0088ff group".
67. Screen reader triggers element default action.
68. Screen reader says "Color field, current color is #0088ff menu pop up button".
```
