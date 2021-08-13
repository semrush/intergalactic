---
title: Readme
---

**Perfect way to use:**

- copy [email project](https://github.com/semrush/intergalactic/tree/master/semcore/email) (example: `https://download-directory.github.io`);
- install all dependencies `npm i`;
- create your email according to the following scheme `src/Name_Component/examples/any_name.html`;
- if necessary you can place CSS here `src/Name_Component/index.css`.

**Including `@semcore/email` styles:**

- you can include separate files `@semcore/email/lib/button/index.css`;
- or include all styles `@semcore/email/lib/core/index.css`;
- you can also get all CSS variables `@semcore/email/lib/core/var.css`.

**For development we run:**

- `npm run watch` and `npm run serve` to get the result in the browser;
- run `npm run build` to get our email template, which is located at `.tmp/Name_Component/examples/any_name.html`.
