---
title: Feedback
tabs: Design('feedback'), A11y('feedback-form-a11y'), API('feedback-form-api'), Example('feedback-form-code'), Changelog('feedback-form-changelog')
---

## FeedbackForm

Ready component, using which you may assemble the form for feedback filling. Assembled using our components, and the [react-final-form](https://final-form.org/react) is responsible for the form validation. The component [Form](https://final-form.org/docs/react-final-form/api/Form) of the library `react-final-form`, inside which there is the `SpinContainer`, takes all the properties.

```jsx
import FeedbackForm from '@semcore/ui/feedback-form';
<FeedbackForm />;
```

<TypesView type="FeedbackFormProps" :types={...types} />

## FeedbackForm.Item

The pre-configured component [Field](https://final-form.org/docs/react-final-form/api/Field) of the library [react-final-form](https://final-form.org/react). Inside it there is the `Tooltip`, and you may set the trigger using the property `tag` or `render function`.

```jsx
import FeedbackForm from '@semcore/ui/feedback-form';
<FeedbackForm.Item />;
```

## FeedbackForm.Success

The pre-configured component `Box`.

```jsx
import FeedbackForm from '@semcore/ui/feedback-form';
<FeedbackForm.Success />;
```

## FeedbackForm.Submit, FeedbackForm.Cancel

The pre-configured component `Button`.

```jsx
import FeedbackForm from '@semcore/ui/feedback-form';
<FeedbackForm.Submit />;
<FeedbackForm.Cancel />;
```

## FeedbackForm.Notice

The pre-configured component `Notice`.

```jsx
import FeedbackForm from '@semcore/ui/feedback-form';
<FeedbackForm.Notice />;
```

<script setup>import { data as types } from '@types.data.ts';</script>