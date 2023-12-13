---
title: DataTable
tabs: Design('data-table'), Example('data-table-code'), API('data-table-api'), A11y('data-table-a11y'),  Changelog('data-table-changelog')
---

## Considerations for developers

* When your tables get complex, use the `<th>` element to identify the header cells by adding a scope attribute. For header rows use `<th scope="row">`. For header columns use `<th scope="col"`>
* Add the optional `<caption>` element before the table content to give users more information on the table contents. Think of it as a headline for your table. Note that the `caption` element must be the first child of the `table` element.

Refer to [A11y style guide](https://a11y-style-guide.com/style-guide/section-structure.html#kssref-structure-tables) for the examples.

## Considerations for designers

If you need to show different states of the table rows or cells, please don’t rely solely on color to convey information. Add some non-color visual indicator of the state, such as text or an icon with appropriate alternative text into the cells.

## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/a11y).

## Automated screen reader testing

<!--@include: ./data-table-a11y-report.md-->
