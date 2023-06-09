## Automated screen reader testing

_Intergalactic v13.31.1, React v18.2.0, Playwright v1.25.1,
Guidepup v0.13.1, MacOS Monterey 12._

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
11. Screen reader says "Out of Menu pop-up combo box".
12. Screen reader goes out of active element.
13. Screen reader says "Out of web content".
14. Screen reader presses the "Tab" button.
15. Screen reader says "Entering semrush list box. semrush group".
16. Screen reader goes into the active element.
17. Screen reader says "In semrush list box semrush .com text (1 of 1)".
18. Screen reader goes to the next element.
19. Screen reader says "semrush .com text (1 of 1)".
20. Screen reader goes to the next element.
21. Screen reader says "Telegram,  Кристина, И носки взяла тебе и себе To open the notifications menu, press Control-Option-N.".
22. Screen reader presses the "Control+Option+Space" button.
23. Screen reader says "web content".
24. Screen reader goes into the active element.
25. Screen reader goes to the next element.
26. Screen reader says "semrush.com list box pop up Menu pop-up combo box".
```
