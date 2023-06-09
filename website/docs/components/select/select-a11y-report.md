## Automated screen reader testing

_Intergalactic v13.31.1, React v18.2.0, Playwright v1.25.1,
Guidepup v0.13.1, MacOS Monterey 12._

**Running screen reader against [this file](https://github.com/semrush/intergalactic/blob/master/website/docs/components/select/examples/basic.tsx).**

```
1. Screen reader goes into the active element.
2. Screen reader says "Select an option, sir 🧐 list box pop up button".
3. Screen reader presses the "Control+Option+Space" button.
4. Screen reader presses the "Tab" button.
5. Screen reader says "Entering Select an option, sir 🧐 list box. Select an option, sir 🧐 group".
6. Screen reader goes into the active element.
7. Screen reader says "In Select an option, sir 🧐 list box Option 0 text (1 of 6)".
8. Screen reader goes to the next element.
9. Screen reader says "Option 1 text (2 of 6)".
10. Screen reader presses the "Control+Option+Space" button.
11. Screen reader says "Label 1 Select an option, sir 🧐 list box pop up button".
```
