## Automated screen reader testing

_Intergalactic v13.31.1, React v18.2.0, Playwright v1.25.1,
Guidepup v0.13.1, MacOS Monterey 12._

**Running screen reader against [this file](https://github.com/semrush/intergalactic/blob/master/website/docs/components/inline-edit/examples/simple-text.tsx).**

```
1. Screen reader goes into the active element.
2. Screen reader says "Author:".
3. Screen reader goes to the next element.
4. Screen reader says "Tap to edit:Martin Eden button".
5. Screen reader triggers element default action.
6. Screen reader says "Martin Eden Insertion at end of text. Author: edit text Press Enter to apply value, press Escape to discard changes group".
7. Screen reader presses the "Backspace" button.
8. Screen reader says "n".
9. Screen reader presses the "Backspace" button.
10. Screen reader says "e".
11. Screen reader presses the "Backspace" button.
12. Screen reader says "d".
13. Screen reader presses the "Backspace" button.
14. Screen reader says "E".
15. Screen reader presses the "Backspace" button.
16. Screen reader presses the "Backspace" button.
17. Screen reader says "n".
18. Screen reader presses the "Backspace" button.
19. Screen reader says "i".
20. Screen reader presses the "Backspace" button.
21. Screen reader says "t".
22. Screen reader presses the "Backspace" button.
23. Screen reader says "r".
24. Screen reader presses the "Backspace" button.
25. Screen reader presses the "Backspace" button.
26. Screen reader presses the "Backspace" button.
27. Screen reader types "Algernon".
28. Screen reader says "Algernon".
29. Screen reader presses the "Enter" button.
30. Screen reader says "Tap to edit:Algernon button".
31. Screen reader triggers element default action.
32. Screen reader says "Algernon Insertion at end of text. Author: edit text Press Enter to apply value, press Escape to discard changes group".
33. Screen reader types "Hello world?".
34. Screen reader says "world ?".
35. Screen reader presses the "Escape" button.
36. Screen reader says "Tap to edit:Algernon button".
```
