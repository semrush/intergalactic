## Automated screen reader testing

_Intergalactic v12.5.0, React v17.0.1, Playwright v1.25.1,
Guidepup v0.13.0, MacOS Monterey 12._

**Running screen reader against [this file](https://github.com/semrush/intergalactic/blob/master/website/docs/components/select/examples/basic.jsx).**

1. Screen reader goes into the active element.
2. Screen reader says "Select an option, sir 🧐 list box pop up button".
3. Screen reader presses the "Control+Option+Space" button.
4. Screen reader says "Press Tab to go to popover Select an option, sir 🧐 list box pop up button".
5. Screen reader presses the "Tab" button.
6. Screen reader says "Entering list box. group".
7. Screen reader goes to the next element.
8. Screen reader says "Option 1 text (2 of 6)".
9. Screen reader presses the "Control+Option+Space" button.
10. Screen reader says "Label 1 Select an option, sir 🧐 list box pop up button".
