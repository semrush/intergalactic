## Automated screen reader testing

_Intergalactic v12.5.0, React v17.0.1, Playwright v1.25.1,
Guidepup v0.13.0, MacOS Monterey 12._

**Running screen reader against [this file](https://github.com/semrush/intergalactic/blob/master/website/docs/components/dropdown-menu/examples/basic.jsx).**

1. Screen reader presses the "Tab" button.
2. Screen reader says "Click me menu pop up button".
3. Screen reader presses the "Control+Option+Space" button.
4. Screen reader says "Press Tab to go to popover menu pop up button".
5. Screen reader presses the "Tab" button.
6. Screen reader says "submenu 4 items group".
7. Screen reader goes to the next element.
8. Screen reader says "submenu 4 items group menu 4 items".
9. Screen reader goes to the next element.
10. Screen reader says "Item 1 menu item".
11. Screen reader goes to the next element.
12. Screen reader says "Item 2 menu item".
13. Screen reader presses the "Escape" button.
14. Screen reader says "Click me menu pop up button".
