## Automated screen reader testing

_Intergalactic v13.0.2, React v18.2.0, Playwright v1.25.1,
Guidepup v0.13.1, MacOS Big Sur 11._

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
10. Screen reader goes out of active element.
11. Screen reader says "You are currently on a Menu pop-up combo box, inside of web content. Type text or, to display a list of choices, press Control-Option-Space. To exit this web area, press Control-Option-Shift-Up Arrow.".
12. Screen reader presses the "Tab" button.
13. Screen reader says "Entering List of options list box. List of options group".
14. Screen reader goes into the active element.
15. Screen reader says "In List of options list box Semrush text (1 of 1)".
16. Screen reader goes to the next element.
17. Screen reader says "Semrush text (1 of 1)".
18. Screen reader goes to the next element.
19. Screen reader presses the "Control+Option+Space" button.
20. Screen reader says "semrush".
21. Screen reader presses the "Shift+Tab" button.
22. Screen reader says "You are currently on a text element, inside of a list box.".
23. Screen reader presses the "Shift+Tab" button.
24. Screen reader says "Leaving List of options. semrush Insertion at end of text. Press Tab to go to popover edit text".
25. Screen reader presses the "Shift+Tab" button.
26. Screen reader says "Entering List of options list box. semrush text (1 of 1)".
27. Screen reader presses the "Shift+Tab" button.
28. Screen reader triggers element default action.
29. Screen reader says "semrush text (1 of 1)".
