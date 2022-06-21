---
title: ProjectCreate
tabName: Design
---

@## Description

**ProjectCreate** is a module for easy access to the project creation functionality on any Semrush product page.

See detailed information about the module in the [inner Figma library](https://www.figma.com/file/EWdX1ly5KsoNu8sywYJdKk/?node-id=39%3A18054).

@## Appearance

The module consists of:

- trigger (usually it is a button located in the upper-right corner of the product);
- modal window with a form.

### Trigger

The trigger must have a MathPlus icon with M size. It visually indicates the possibility of adding something.

For button label use the folliwing text: "Add new {Tool name}".

![ProjectCreate trigger example](static/projectCreate-trigger.png)

> 💡 Note that if this button should have a lower priority in the visual hierarchy in your product, you can use the secondary button.

### Modal window

For form use inputs and controls with L size.

![ProjectCreate default modal](static/default.png)

@## Interaction

> When the modal window opens, the first empty input gets the `focus` state. You can read more about the behavior of forms in the [Form guide](/components/form/).

If the user try to submit the form without the entered domain for the project, the input gets the `invalid` state. Focus moves to it and open the tooltip with an error message.

You can read more about form validation in the [Validation guide](/patterns/validation-form/).

![ProjectCreate modal with invalid inputs](static/invalid.png)

@## Limit

In some cases, adding a project may be restricted for some reason (for example, due to a limit). In this situation, show a dropdown with the corresponding text and button.

|        | Message in English                                                            |
| ------ | ----------------------------------------------------------------------------- |
| Title  | "You have reached the limit of projects available on your subscription plan." |
| Text   | "Upgrade your plan to get more projects."                                     |
| Button | "See plans and pricing."                                                      |

![ProjectCreate with limit dropdown](static/limit.png)

@page project-create-api
@page project-create-code
@page project-create-changelog
