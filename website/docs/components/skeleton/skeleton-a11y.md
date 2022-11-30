---
title: A11y
a11y: AA
---

@## Considerations for developers

- When a change occurs in the UI, like a loading state, it's good to notify a user what is happening. While a skeleton loader visually indicates that a process is happening, it should also be announced by assistive technology through the use of `aria-live`.
- See the WAI-ARIA `aria-live` [documentation](https://www.w3.org/TR/wai-aria-1.1/#aria-live) for more details.
- Add the `screenreaderText` prop and add a message for assistive technology (Example: `screenreaderText=”Loading contents”`.
- If multiple skeletons exist on a screen, you likely only need to add the `screenreaderText` prop to one of them.

@## Resources

- [More Accessible Skeletons](https://adrianroselli.com/2020/11/more-accessible-skeletons.html) has detailed information about the skeleton accessible behavior.
- [Accessibility Principles](https://www.w3.org/WAI/fundamentals/accessibility-principles/) gives core recommendations for the accessible components.

@## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/).
