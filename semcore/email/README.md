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

**Using styles in the base template**

- all styles are included in template `@semcore/email/lib/core/base.html` (example: `<link rel="stylesheet" href="../../../lib/core/index.css" />`);
- you can include your styles:

```html
<block name="head">
  <link rel="stylesheet" href="YOUR STYLES" />
  or
  <style>
    YOUR STYLES
  </style>
</block>
```

or

```html
<block name="content">
  <style>
    YOUR STYLES
  </style>
</block>
```

**Using variables in html**

- for work without outside variables:

```html
<p>{{text}}</p>
<script locals>
  module.exports = {
    text: 'Hello',
  };
</script>
```

- for work with outside variables:

```html
<p>
  <raw>{{text}}</raw>
</p>
```

**For development we run:**

- `npm run watch` and `npm run serve` to get the result in the browser;

**For production we run:**

- `npm run build` to get our email template, which is located at `.tmp/Name_Component/examples/any_name.html`.
