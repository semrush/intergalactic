## Automated screen reader testing

_Intergalactic v14.1.1, React v18.2.0, Playwright v1.25.1,
Guidepup v0.13.1, MacOS Big Sur 11._

**Running screen reader against [this file](https://github.com/semrush/intergalactic/blob/master/website/docs/components/auto-suggest/examples/autosuggest.tsx).**

```
1. Screen reader goes into the active element.
2. Screen reader says "In web content Your website Your website".
3. Screen reader goes to the next element.
4. Screen reader says "Type domain or URL list box pop up Menu pop-up combo box".
5. Screen reader goes into the active element.
6. Screen reader says "In Menu pop-up combo box".
7. Screen reader goes into the active element.
8. Screen reader types "semrush".
9. Screen reader says "semrush".
10. Screen reader goes out of active element.
11. Screen reader goes out of active element.
12. Screen reader says "Out of web content".
13. Screen reader presses the "Tab" button.
14. Screen reader says "Entering Semrush list box. Semrush group".
15. Screen reader goes into the active element.
16. Screen reader says "In Semrush list box Semrush .com text (1 of 1)".
17. Screen reader goes to the next element.
18. Screen reader says "Semrush .com text (1 of 1)".
19. Screen reader goes to the next element.
20. Screen reader presses the "Control+Option+Space" button.
21. Screen reader says "web content".
22. Screen reader goes into the active element.
23. Screen reader goes to the next element.
24. Screen reader says "semrush.com".
```
