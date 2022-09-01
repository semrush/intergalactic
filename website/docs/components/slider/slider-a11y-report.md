## Automated screen reader testing

_Intergalactic v12.5.0, React v17.0.1, Playwright v1.25.1,
Guidepup v0.13.0, MacOS Monterey 12._

**Running screen reader against [this file](https://github.com/semrush/intergalactic/blob/master/website/docs/components/slider/examples/slider.jsx).**

1. Screen reader goes into the active element.
2. Scren reader says "2 slider".
3. Screen reader goes into the active element.
4. Scren reader says "In slider".
5. Screen reader presses the "Control+Option+ArrowLeft" button.
6. Scren reader says "1".
7. Screen reader presses the "Control+Option+ArrowRight" button.
8. Scren reader says "2".
9. Screen reader presses the "Control+Option+ArrowRight" button.
10. Scren reader says "3".
11. Screen reader goes out of active element.
12. Scren reader says "Out of slider".
