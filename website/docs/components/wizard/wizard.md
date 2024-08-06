---
title: Wizard
fileSource: wizard
tabs: Design('wizard'), A11y('wizard-a11y'), API('wizard-api'), Example('wizard-code'), Changelog('wizard-changelog')
---

## Description

**Wizard** is a component that guides users through a series of predefined steps to complete a larger task. It simplifies complex tasks by breaking them down into manageable steps, reducing the perceived complexity.

### When to use wizard

- Use a wizard when dealing with large tasks that cannot be simplified. Breaking them down into steps helps users focus on each part of the task.
- If a task requires a specific sequence of steps to be followed, a wizard ensures users don't miss important parts and make fewer mistakes.
- Wizards are suitable when a task involves three-five steps. For smaller tasks with just two steps or very large tasks with more than ten steps, consider alternative approaches and components.

### When don’t use wizard

- Avoid using wizards for educational purposes, as they focus on task completion rather than providing additional information for learning. Instead, use components like [FeaturePopover](/components/feature-popover/feature-popover), `Info` icons, [hint links](/style/typography/typography#hints_hint_links), or videos for education.
- Advanced users may find predefined steps in a wizard restrictive. Consider using wizards for audiences that would benefit from step-by-step guidance.

## Component composition

![](static/wizard-composition.png)

Component consists of the following:

- `Wizard.Sidebar`
- `Wizard.Stepper`
- `Wizard.Content`
- `Wizard.Step`

## Sidebar styles

Table: Wizard sidebar styles

|           | Appearance example |
| --------- | ------------------ |
| Sidebar styles | ![max-width: 220px; padding: 40px 8px; color: var(--white); background-color: var(--violet-600); font-size: var(--fs-300); line-height: var(--lh-300); font-weight: 700;](static/steps-paddings-margins.png) |
| Step styles    | ![20px * 24px](static/step-size.png) |
| Stepper styles | ![padding: 8px 12px; color: var(--white); font-size: var(--fs-200); line-height: var(--lh-200); font-weight: 700;](static/stepper-paddings-margins.png) If a stepper has optional text or a sub-step, they have the following styles: ![margin-top: 4px; color: color-mod(var(--white) a(75%)); font-size: var(--fs-100); line-height: var(--lh-100); font-weight: 400;](static/substep-paddings-margins.png) |

## Stepper states

Table: Stepper states

| State    | Appearance example     | Styles      |
| -------- | ---------------------- | ----------- |
| Normal   | ![](static/normal.png)                                                        | `background-color: var(--control-primary-advertising)`, `border-radius: var(--rounded-medium)`                                                                     |
| Hover    | ![](static/hover.png)                                                         | `background-color: var(--control-primary-advertising-hover)`, `cursor: pointer`                                                                                    |
| Active   | ![](static/active.png)                                                        | `background-color: var(--control-primary-advertising-active)`                                                                                                       |
| Disabled | ![](static/disabled.png) ![](static/disabled-tooltip.png) | Use `--disabled-opacity` token. When hovering on a button in this state, display a tooltip with a description of why the step is disabled. |
| checked  | ![](static/checked.png)                                                       | The number changes to a `Check` icon in size M.   |

## Content area styles

Table: Wizard content area styles

|          | Appearance example |
| -------- | ------------------ |
| Content area paddings | ![padding: 40px; background-color: var(--white); color: var(--gray-800); font-size: var(--fs-200); line-height: var(--lh-200); font-weight: 400;](static/wizard-paddings.png) |
| Header styles | ![margin-bottom: 20px; color: var(--gray-800); font-size: var(--fs-500); line-height: var(--lh-500); font-weight: 700;](static/header.png) |
| Footer styles | For basic controls use L size. ![margin-bottom: 20px; color: var(--gray-800); font-size: var(--fs-500); line-height: var(--lh-500);](static/footer.png) |

## Keyboard control

- When opening a Wizard, the focus should move to it.
- Users can move between interactive elements within the window using the `Tab` key.
- The Wizard can be closed with the `Esc` key.

When the Wizard closes, the focus should return to the page. Refer to [Accessibility](/core-principles/a11y/a11y) guidelines.

## Wizard in Modal

For the Wizard displayed in a Modal, ensure the following styles:

```CSS
max-width: 980px;
max-height: 700px;
```

![](static/wizard1.png)

![](static/wizard2.png)

### Collapsing panel with steps on screen less than 1060px

Collapse the panel to 44px, leaving only the step numbers. On hover per step, show the name of the step.

![](static/collapsing-stepper1.png)

![](static/collapsing-stepper2.png)

### Placement

The scroll behavior inside and outside the window, the general rules for content, etc. are the same as for the [Modal component](/components/modal/modal).

Center the Wizard relative to the user's viewport. And leave margins of 40px outside the window.

![](static/placement.png)

![](static/paddings.png)

## Usage in UX/UI

::: tip
For consistent user experience within products of the same platform, use a Wizard for setting up products.

In exceptional cases, steps can be placed in the content area of the page.
:::

Here are some scenarios where a universal solution is recommended:

### Form validation

After submitting a form, highlight all invalid inputs and focus on the first invalid input.

For more information about validation, refer to the [Validation](/patterns/validation-form/validation-form).

![](static/validation.png)

### Form loading error

If an error occurs on the backend while submitting a form, display the error message above the form.

![](static/error-all.png)

### Sizes of controls in the form

In the form, use the same sizes for inputs and controls.

![](static/form-yes-no.png)

### Saving the entered value

If data entered into the form by the user was not sent and the window is closed, save the entered data so that the user doesn't lose it.

