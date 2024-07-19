---
title: Punctuation and special symbols
---

<style>
    .dosdonts {
        border-radius: var(--intergalactic-surface-rounded);
    }
    .dosdonts td, .dosdonts th {
        background: var(--intergalactic-bg-secondary-neutral);
        text-align: center;
    }
    .dosdonts tr:first-of-type {
        border-bottom: none;
    }
    .dosdonts th {
        border-top: var(--intergalactic-spacing-4x) solid var(--intergalactic-bg-secondary-neutral);
        padding-top: 0;
        font-size: var(--intergalactic-fs-400);
        line-height: var(--intergalactic-lh-400);
        font-weight: var(--intergalactic-bold);
    }
    .dosdonts td {
        border-bottom: var(--intergalactic-spacing-4x) solid var(--intergalactic-bg-secondary-neutral);
        padding: var(--intergalactic-spacing-6x) var(--intergalactic-spacing-10x) var(--intergalactic-spacing-6x);
        font-size: var(--intergalactic-fs-200);
        line-height: var(--intergalactic-lh-200);
    }
    .dosdonts tr *:first-of-type {
        border-right: 1px solid var(--intergalactic-border-secondary);
    }
    .dosdonts th:first-of-type {
        color: var(--intergalactic-text-critical);
    }
    .dosdonts th:last-of-type {
        color: var(--intergalactic-text-success);
    }
</style>

## Dashes and hyphens

### Em dash

| Symbol       | HTML entity        |
| :----------: | :----------------: |
| &mdash;      | `&mdash;`          |

* Use sparingly in sentences in place of a comma or colon
* Omit the spaces on both sides of the dash

<table class="dosdonts">
    <tr>
        <th>Don't</th>
        <th>Do</th>
    </tr>
    <tr>
        <td>
            It makes us sound like Semrush &mdash; regardless of who the person behind the communication&nbsp;is.
        </td>
        <td>
            It makes us sound like Semrush&mdash;regardless of who the person behind the communication&nbsp;is.
        </td>
    </tr>
</table>

### En dash

| Symbol       | HTML entity        |
| :----------: | :----------------: |
| &ndash;      | `&ndash;`          |

* Use in a range of numbers, dates, and times
* Use as a minus sign
* Use to indicate an empty value in tables
* Omit the spaces on both sides of the dash

![](/content/punctuation/static/endash.png)

### Hyphen

| Symbol       | HTML entity   |
| :----------: | :-----------: |
| -            | `&hyphen;`    |

* Use for telephone numbers and compound modifiers

![](/content/punctuation/static/hyphen.png)

### Non-breaking hyphen

| Symbol       | HTML code          |
| :----------: | :----------------: |
| &#8209;      | `&#8209;`          |

* Use to prevent unwanted line breaks

![](/content/punctuation/static/nbhyphen.png)

### Soft hyphen

| Symbol       | HTML entity        |
| :----------: | :----------------: |
| &shy;        | `&shy;`            |

* Use to indicate where a hyphenated break is allowed. It’s invisible otherwise
* Useful in scenarios when the same string is displayed in different layouts 

![](/content/punctuation/static/softhyphen.png)

## Non-breaking space

| Symbol       | HTML entity        |
| :----------: | :----------------: |
| &nbsp;       | `&nbsp;`           |

* Use to keep the words "glued"
> Use ⌥+space on MacOS to insert

![](/content/punctuation/static/nbsp.png)


## Quotation marks and apostrophe

### Quotation marks

| Symbol       | HTML entity        |
| :----------: | :----------------: |
| &ldquo;      | `&ldquo;`          |
| &rdquo;      | `&rdquo;`          |

* Use double curly quotation marks
* Include periods
* Dashes, semicolons, exclamation points, and question marks go inside the quotation mark only if they relate to the quotation
* Use when quoting UI text, if text formatting is not available

![](/content/punctuation/static/quotationmarks.png)

### Apostrophe

| Symbol       | HTML code          |
| :----------: | :----------------: |
| &rsquo;      | `&rsquo;`          |

* Use the curly style, just like for the quotation marks

![](/content/punctuation/static/apostrophe.png)


## Period

* Use in numbered lists
* Include in quotation marks and brackets
* Use with shortened forms of words (mainly in table columns)

![](/content/punctuation/static/period.png)

**Omit:**
* in headings
* in placeholders
* in checkboxes
* in lists with bullets and icons
* in tooltips that serve as labels for icons or display the element’s full name
* after URLs

![](/content/punctuation/static/noperiod.png)


## Lists

* No period:
– bulleted lists (**But:** if there’s more than one sentence in a bullet—make all bullets end with periods)
– lists with icons
* Add period in:
– numbered lists
* Use sentence-style capitalization
> Use numbered lists for a sequence of actions!

![](/content/punctuation/static/lists.png)


## Special symbols

### Ampersand

| Symbol       | HTML entity        |
| :----------: | :----------------: |
| &amp;        | `&amp;`            |

* Enclose in spaces
* Avoid. If there’s enough space—always use “and”

![](/content/punctuation/static/ampersand.png)

### Number sign

| Symbol       | HTML code          |
| :----------: | :----------------: |
| &#35;        | `&#35;`            |

* Omit the space after the sign

![](/content/punctuation/static/number.png)

### Percent sign

| Symbol       | HTML entity        |
| :----------: | :----------------: |
| &percnt;     | `&percnt;`         |

* In a column name, use at the end of the name preceded by a space
* Omit the space before the percent sign
> Exception: German, French, Swedish languages

![](/content/punctuation/static/percent.png)

### Minus and plus signs

| Symbol       | HTML entity        |
| :----------: | :----------------: |
| &minus;      | `&minus;`          |
| &plus;       | `&plus;`           |

* Omit the spaces between the sign and a numeric value
* Use the en dash for the minus sign
* Use to show changes in metrics

![](/content/punctuation/static/minusplus.png)

### Slash

| Symbol       | HTML entity        |
| :----------: | :----------------: |
| &#8725;      | `&#8725;`          |

* Omit the spaces around the sign

![](/content/punctuation/static/slash.png)

### Multiplication sign

| Symbol       | HTML entity        |
| :----------: | :----------------: |
| &times;      | `&times;`          |

* Avoid using the “x” letter

![](/content/punctuation/static/multiplication.png)
