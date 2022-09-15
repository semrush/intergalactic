## Automated screen reader testing

_Intergalactic v12.5.1, React v17.0.1, Playwright v1.25.1,
Guidepup v0.13.0, MacOS Big Sur 11._

**Running screen reader against [this file](https://github.com/semrush/intergalactic/blob/master/website/docs/table-group/data-table/examples/base.jsx).**

1. Screen reader goes into the active element.
2. Screen reader says "In web content table 4 columns, 6 rows".
3. Screen reader goes into the active element.
4. Screen reader says "In table No selection. Keyword row 1 of 6 column 1 of 4".
5. Screen reader presses the "Control+Option+ArrowDown" button.
6. Screen reader says "row 1 of 0 ebay buy".
7. Screen reader presses the "Control+Option+ArrowDown" button.
8. Screen reader says "row 2 of 0 www.ebay.com".
9. Screen reader presses the "Control+Option+ArrowRight" button.
10. Screen reader says "KD,% 11.2 column 2 of 4".
11. Screen reader presses the "Control+Option+ArrowRight" button.
12. Screen reader says "CPC $3.4 column 3 of 4".
13. Screen reader presses the "Control+Option+ArrowDown" button.
14. Screen reader says "row 3 of 0 $0.65".
