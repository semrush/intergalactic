## Automated screen reader testing

_Intergalactic v12.5.1, React v17.0.1, Playwright v1.25.1,
Guidepup v0.13.0, MacOS Big Sur 11._

**Running screen reader against [this file](https://github.com/semrush/intergalactic/blob/master/website/docs/components/slider/examples/slider.jsx).**

1. Screen reader goes into the active element.
2. Screen reader says "Medium slider".
3. Screen reader goes into the active element.
4. Screen reader says "In slider".
5. Screen reader presses the "Control+Option+ArrowLeft" button.
6. Screen reader says "Small".
7. Screen reader presses the "Control+Option+ArrowRight" button.
8. Screen reader says "Medium".
9. Screen reader presses the "Control+Option+ArrowRight" button.
10. Screen reader says "Big".
11. Screen reader goes out of active element.
12. Screen reader says "Out of slider".
