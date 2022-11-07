## Automated screen reader testing

_Intergalactic v13.1.0, React v18.2.0, Playwright v1.25.1,
Guidepup v0.13.1, MacOS Big Sur 11._

**Running screen reader against [this file](https://github.com/semrush/intergalactic/blob/master/website/docs/components/inline-edit/examples/simple-text.jsx).**

```
1. Screen reader goes into the active element.
2. Screen reader says "Tap to edit group".
3. Screen reader triggers element default action.
4. Screen reader says "Martin Eden Insertion at end of text. edit text Press Enter to apply value, press Escape to discard changes group".
5. Screen reader presses the "Backspace" button.
6. Screen reader says "n".
7. Screen reader presses the "Backspace" button.
8. Screen reader says "e".
9. Screen reader presses the "Backspace" button.
10. Screen reader says "d".
11. Screen reader presses the "Backspace" button.
12. Screen reader says "E".
13. Screen reader presses the "Backspace" button.
14. Screen reader presses the "Backspace" button.
15. Screen reader says "n".
16. Screen reader presses the "Backspace" button.
17. Screen reader says "i".
18. Screen reader presses the "Backspace" button.
19. Screen reader says "t".
20. Screen reader presses the "Backspace" button.
21. Screen reader says "r".
22. Screen reader presses the "Backspace" button.
23. Screen reader presses the "Backspace" button.
24. Screen reader presses the "Backspace" button.
25. Screen reader types "Algernon".
26. Screen reader says "Algernon".
27. Screen reader presses the "Enter" button.
28. Screen reader triggers element default action.
29. Screen reader says "Algernon Insertion at end of text. edit text Press Enter to apply value, press Escape to discard changes group".
30. Screen reader types "Hello world?".
31. Screen reader says "world ?".
32. Screen reader presses the "Escape" button.
33. Screen reader says "Algernon".
```
