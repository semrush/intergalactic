This article will guide you through creating an email template with components included in the Semcore library. In the end, you will get HTML code that you can copy and paste to your email client.

## Setting up the project

1. Create a new directory for your project and navigate to it.

2. [Download the semcore/email package](https://download-directory.github.io/?url=https://github.com/semrush/intergalactic/tree/master/semcore/email) and place all the files to your project directory.

3. Install dependencies:

   ```
   npm install
   ```

4. Create a directory for your email template. Replace `template_name` with the name of your template:

   ```bash
   mkdir src/template_name/examples
   ```

5. Create an HTML page for your template:

   ```bash
   touch src/template_name/examples/index.html
   ```

   This is where the code of your template will live.

6. If you need additional CSS styles, create a stylesheet file and add your styles there:

   ```bash
   touch src/template_name/index.css
   ```

## Including `@semcore/email` styles

To use `@semcore/email` styles in your template, add `@semcore/email/lib/core/index.css` to your `index.css` file. This will include all available styles. You can also include styles of specific components, for example `@semcore/email/lib/button/index.css`.

To use CSS variables, include `@semcore/email/lib/core/var.css` in your `index.css` file.

## Using styles in the base template

All styles are included in the template `@semcore/email/lib/core/base.html` (example: `<link rel="stylesheet" href="../../../lib/core/index.css" />`);

To include your styles, link an external stylesheet, or put the styles in the `<style>` tag. You can use both options in one block.

```html
<block name="head">
  <!--You can use either a stylesheet or the <style> tag, or both-->
  <link rel="stylesheet" href="YOUR STYLES" />
  <style>
    YOUR STYLES
  </style>
</block>
```

or

```htmlqq
<block name="content">
  <style>
    YOUR STYLES
  </style>
</block>
```

## Using variables in HTML code

You can use both internal and external variables in your HTML code.

- Internal variables:

  ```html
  <p>{{text}}</p>
  <script locals>
    module.exports = {
      text: 'Hello',
    };
  </script>
  ```

- External variables:

  ```html
  <p>
    <raw>{{text}}</raw>
  </p>
  ```

## Rendering the template

To test your template in the browser, run:

```bash
npm run watch;
npm run serve
```

To build the email template ready for production, run:

```bash
npm run build
```

This command will render your email template to the file `.tmp/template-name/examples/index.html`. Copy and paste the code to your email client. Your emails will shine!
