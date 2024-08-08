---
title: InlineEdit
fileSource: inline-edit
tabs: Design('inline-edit'), A11y('inline-edit-a11y'), API('inline-edit-api'), Example('inline-edit-code'), Changelog('inline-edit-changelog')
---

## Description

**InlineEdit** is a wrapper component that enables a smooth transition between viewing and editing data.

**Use this component when:**

- You need to effortlessly switch between read-only and text editing modes without requiring a page reload.
- The interface is spatially constrained, necessitating efficient use of space.
- Transmitting data to the system isn't the primary focus of the interface (for example, providing supplementary information and notes within cards).

## Appearance

It's important to note that the example below serves merely as an illustration and isn't the default configuration. Any control component, whether it's a [Button](/components/button/button), an [Icon](/style/icon/icon), or text with an icon, can be utilized as a trigger.

![](static/inline-edit.png)

The placeholder's color aligns with that of a typical input element, using the `--text-placeholder` token. The text and icon share a single clickable zone.

## Interaction

- The user clicks the trigger, which opens an input of any type you need for your case ([InlineInput](/components/inline-input/inline-input), [Input](/components/input/input), [Textarea](/components/textarea/textarea), [Select](/components/select/select), [ColorPicker](/components/color-picker/color-picker) or [TimePicker](/components/time-picker/time-picker)).
- The input gets immediate `focus`.
- The user enters data and can submit it. Alternatively, the user can revert to view mode by using the **Cancel** button or the **Esc** key.
- When the input loses `focus` (for instance, if the user switches to another screen), the `onBlur` event saves the entered value.

Below is an example demonstrating how this component functions with one of the possible triggers.

Table: InlineEdit states

| State                   | Appearance example            | Styles                                                                                                                                                                                                                                                                                                                                         |
| ----------------------- | ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Normal                  | ![](static/normal.png)        | The placeholder's color matches that of a default input `--text-placeholder`.                                                                                                                                                                                                                                                                  |
| Hover                   | ![](static/hover.png)         | The cursor changes to a `pointer`.                                                                                                                                                                                                                                                                                                             |
| Focus                   | ![](static/opened.png)        | Display any input type required for data entry ([InlineInput](/components/inline-input/inline-input), [Input](/components/input/input), [Textarea](/components/textarea/textarea), [Select](/components/select/select), [ColorPicker](/components/color-picker/color-picker), [TimePicker](/components/time-picker/time-picker), for example). |
| Entered data            | ![](static/success.png)       | Text color changes to `--text-primary`.                                                                                                                                                                                                                                                                                                        |
| Entered data with hover | ![](static/success-hover.png) | The cursor changes to a `pointer`. The interactive trailing addon's color shifts to the darker one with CSS filters.                                                                                                                                                                                                                           |

## Animation

The transition between the wrapped trigger and the input field can be accomplished with an `ease-in-out` effect lasting `50ms`.

## UX/UI use

In view mode, ensure that the text size matches the size of the edit input you've selected.

For instance, if the heading you wish to edit employs a font size of 24px, maintain the same font size of 24px when transitioning to edit mode.

![](static/inline-edit-yes-no.png)
