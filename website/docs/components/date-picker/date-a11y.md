---
title: A11y
---

@## Accessibility recommendations

- When the dropdown with the calendar grid opens a current date receives focus.
- When a date is chosen, the accessible name of the Choose Date button is updated to include the selected date.

@## Keyboard support

| Key              | Function                                                                                                                                                                           |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Enter`, `Space` | Open the date picker dropdown. Move focus to selected date, i.e., the date displayed in the date input text field. If no date has been selected, places focus on the current date. |
| `ESC`            | Closes the dialog and returns focus to the Choose Date button.                                                                                                                     |
| `Tab`            | Moves focus to next element in the dropdown `Tab` sequence. If focus is on the last button (i.e., OK), moves focus to the first button (i.e. Previous Year).                       |
| `Shift + Tab`    | Moves focus to previous element in the dialog `Tab` sequence. If focus is on the first button (i.e., Previous Year), moves focus to the last button (i.e. OK).                     |
| `Up Arrow`       | Moves focus to the same day of the previous week.                                                                                                                                  |
| `Down Arrow`     | Moves focus to the same day of the next week.                                                                                                                                      |
| `Right Arrow`    | Moves focus to the next day.                                                                                                                                                       |
| `Left Arrow`     | Moves focus to the previous day.                                                                                                                                                   |

@## Other recommendations

See more accessibility recommendations in the commom [Accessibility guide](/core-principles/a11y/).

@## Resources

[W3 date picker example and documentation](https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/datepicker-dialog.html) has detailed information about the accordion accessible behavior.
