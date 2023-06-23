## Automated screen reader testing

_Intergalactic v14.6.0, React v18.2.0, Playwright v1.25.1,
Guidepup v0.13.1, MacOS Monterey 12._

**Running screen reader against [this file](https://github.com/semrush/intergalactic/blob/master/website/docs/components/dropdown/examples/dropdown.tsx).**

```
1. Screen reader goes into the active element.
2. Screen reader says "Trigger menu pop up button".
3. Screen reader presses the "Control+Option+Space" button.
4. Screen reader presses the "Tab" button.
5. Screen reader says "Content group".
6. Screen reader goes to the next element.
7. Screen reader says "Content  clickable".
8. Screen reader presses the "Escape" button.
9. Screen reader says "You are currently on a button, inside of web content. To display a list of options, press Control-Option-Space. To exit this web area, press Control-Option-Shift-Up Arrow.".
```
