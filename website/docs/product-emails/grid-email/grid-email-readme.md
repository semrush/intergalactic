---
title: Readme
---

**Perfect way to use:**

- create a new folder (example: `mkdir myProject`);
- go to the created folder (example: `cd myProject`);
- copy everything from [package](https://github.com/semrush/intergalactic/tree/master/semcore/email) there (example: `https://download-directory.github.io`);
- install all dependencies (example: `npm i`);
- create your email to the following scheme `src/Name_Component/examples/any_name.html` (example: `mkdir -p src/test_email/examples; touch src/test_email/examples/index.html`);
- css, if necessary, you can place here `src/Name_Component/index.css` (example: `touch src/test_email/index.css`);.

**Including `@semcore/email` styles:**

- you can include separate files `@semcore/email/lib/button/index.css`;
- or include all styles `@semcore/email/lib/core/index.css`;
- you can also get all CSS variables `@semcore/email/lib/core/var.css`.

**For development we run:**

- `npm run watch` and `npm run serve` to get the result in the browser;

**For production we run:**

- `npm run build` to get our email template, which is located at `.tmp/Name_Component/examples/any_name.html`.
