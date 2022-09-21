## Automated screen reader testing

_Intergalactic v12.5.0, React v17.0.1, Playwright v1.25.1,
Guidepup v0.13.0, MacOS Monterey 12._

**Running screen reader against [this file](https://github.com/semrush/intergalactic/blob/master/website/docs/components/dropdown/examples/dropdown.jsx).**

1. Screen reader goes into the active element.
2. Screen reader says "Trigger menu pop up button".
3. Screen reader presses the "Control+Option+Space" button.
4. Screen reader says "Press Tab to go to popover menu pop up button".
5. Screen reader presses the "Tab" button.
6. Screen reader says "Content group".
7. Screen reader goes to the next element.
8. Screen reader says "Content clickable".
9. Screen reader presses the "Escape" button.
10. Screen reader says "Trigger menu pop up button".
