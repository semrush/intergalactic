## Automated screen reader testing

_Intergalactic v12.5.1, React v17.0.1, Playwright v1.25.1,
Guidepup v0.13.0, MacOS Big Sur 11._

**Running screen reader against [this file](https://github.com/semrush/intergalactic/blob/master/website/docs/components/auto-tips/examples/autosuggest.jsx).**

1. Screen reader goes into the active element.
2. Screen reader says "Press Tab to go to popover Select option list box pop up Menu pop-up combo box".
3. Screen reader goes into the active element.
4. Screen reader says "In Menu pop-up combo box".
5. Screen reader goes into the active element.
6. Screen reader says "Press Tab to go to popover Type domain or URL edit text".
7. Screen reader types "semrush".
8. Screen reader says "semrush".
9. Screen reader goes out of active element.
10. Screen reader says "Out of edit text".
11. Screen reader goes out of active element.
12. Screen reader says "You are currently on a Menu pop-up combo box, inside of web content. Type text or, to display a list of choices, press Control-Option-Space. To exit this web area, press Control-Option-Shift-Up Arrow.".
13. Screen reader presses the "Tab" button.
14. Screen reader says "Entering List of options list box. List of options group".
15. Screen reader goes into the active element.
16. Screen reader says "In List of options list box salesforce text (1 of 11)".
17. Screen reader goes to the next element.
18. Screen reader says "soundcloud text (2 of 11)".
19. Screen reader goes to the next element.
20. Screen reader says "stackoverflow text (3 of 11)".
21. Screen reader presses the "Control+Option+Space" button.
22. Screen reader presses the "Shift+Tab" button.
23. Screen reader says "stackoverflow tr text (2 of 6)".
24. Screen reader presses the "Shift+Tab" button.
25. Screen reader says "stackoverflow text (1 of 6)".
26. Screen reader presses the "Shift+Tab" button.
27. Screen reader presses the "Shift+Tab" button.
28. Screen reader says "stackoverflow".
29. Screen reader types "Some_new_text_after".
30. Screen reader says "stackoverflowSome_new_text_after".
