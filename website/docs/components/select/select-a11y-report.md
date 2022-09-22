## Automated screen reader testing

_Intergalactic v12.5.1, React v17.0.1, Playwright v1.25.1,
Guidepup v0.13.0, MacOS Big Sur 11._

**Running screen reader against [this file](https://github.com/semrush/intergalactic/blob/master/website/docs/components/select/examples/basic.jsx).**

1. Screen reader goes into the active element.
2. Screen reader says "Select an option, sir 🧐 list box pop up button".
3. Screen reader presses the "Control+Option+Space" button.
4. Screen reader says "Press Tab to go to popover".
5. Screen reader presses the "Tab" button.
6. Screen reader says "Entering List of options list box. List of options group".
7. Screen reader goes into the active element.
8. Screen reader says "In List of options list box Option 0 text (1 of 6)".
9. Screen reader goes to the next element.
10. Screen reader says "Option 1 text (2 of 6)".
11. Screen reader presses the "Control+Option+Space" button.
12. Screen reader says "Label 1 Select an option, sir 🧐 list box pop up button".
