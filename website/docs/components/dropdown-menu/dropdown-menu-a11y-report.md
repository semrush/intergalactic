## Automated screen reader testing

_Intergalactic v14.3.0, React v18.2.0, Playwright v1.25.1,
Guidepup v0.13.1, MacOS Big Sur 11._

**Running screen reader against [this file](https://github.com/semrush/intergalactic/blob/master/website/docs/components/dropdown-menu/examples/basic.tsx).**

```
1. Screen reader presses the "Tab" button.
2. Screen reader says "Click me menu pop up button".
3. Screen reader presses the "Control+Option+Space" button.
4. Screen reader says "menu 4 items Click me menu pop up pop up button".
5. Screen reader presses the "Tab" button.
6. Screen reader says "Click me submenu 4 items group".
7. Screen reader goes to the next element.
8. Screen reader says "Click me submenu 4 items group menu Click me 4 items".
9. Screen reader goes into the active element.
10. Screen reader goes to the next element.
11. Screen reader says "Item 1 menu item".
12. Screen reader goes to the next element.
13. Screen reader says "Item 2 menu item".
14. Screen reader presses the "Escape" button.
15. Screen reader says "Click me group".
16. Screen reader goes to the next element.
17. Screen reader says "Click me menu pop up button".
```
