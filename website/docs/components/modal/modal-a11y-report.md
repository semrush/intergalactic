## Automated screen reader testing

_Intergalactic v12.5.1, React v17.0.1, Playwright v1.25.1,
Guidepup v0.13.0, MacOS Big Sur 11._

**Running screen reader against [this file](https://github.com/semrush/intergalactic/blob/master/website/docs/components/modal/examples/modal.jsx).**

1. Screen reader goes into the active element.
2. Screen reader says "Open modal button".
3. Screen reader triggers element default action.
4. Screen reader says "Modal window web dialog with 5 items Close button".
5. Screen reader goes to the next element.
6. Screen reader says "heading level 2 Do you want to save your changes?".
7. Screen reader goes to the next element.
8. Screen reader says "Your changes will be lost if you don't save them.".
9. Screen reader goes to the next element.
10. Screen reader says "Save changes button".
11. Screen reader triggers element default action.
12. Screen reader says "Open modal button".
