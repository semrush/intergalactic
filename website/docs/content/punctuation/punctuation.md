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
        <th>Don’t</th>
        <th>Do</th>
    </tr>
    <tr>
        <td>
            It makes us sound like Semrush &mdash; regardless<br />of who the personbehind the communication is.
        </td>
        <td>
            It makes us sound like Semrush&mdash;regardless<br />of who the personbehind the communication is.
        </td>
    </tr>
</table>
<br />

### En dash

| Symbol       | HTML entity        |
| :----------: | :----------------: |
| &ndash;      | `&ndash;`          |

* Use in a range of numbers, dates, and times
* Use to indicate an empty value in tables
* Omit the spaces on both sides of the dash

<table class="dosdonts">
    <tr>
        <th>Don’t</th>
        <th>Do</th>
    </tr>
    <tr>
        <td>
            100 – 100
        </td>
        <td>
            100–1000
        </td>
    </tr>
    <tr>
        <td>
            Sep 5 — Oct 4, 2016
        </td>
        <td>
            Sep 5–Oct 4, 2016
        </td>
    </tr>
    <tr>
        <td>
            Sep 5, 2016 – Jan 4, 2017
        </td>
        <td>
            Sep 5, 2016–Jan 4, 2017
        </td>
    </tr>
</table>
<br />

### Hyphen

| Symbol       | HTML entity   |
| :----------: | :-----------: |
| -            | `&hyphen;`    |

* Use for telephone numbers and compound modifiers

<table class="dosdonts">
    <tr>
        <th>Don’t</th>
        <th>Do</th>
    </tr>
    <tr>
        <td>
            703–555–6593
        </td>
        <td>
            703-555-6593
        </td>
    </tr>
    <tr>
        <td>
            AI–powered
        </td>
        <td>
            AI-powered
        </td>
    </tr>
</table>
<br />

### Non-breaking hyphen

| Symbol       | HTML code          |
| :----------: | :----------------: |
| &#8209;      | `&#8209;`          |

* Use to prevent unwanted line breaks

<table class="dosdonts">
    <tr>
        <th>Don’t</th>
        <th>Do</th>
    </tr>
    <tr>
        <td>
            Metrics like click-<br />through rate
        </td>
        <td>
            Metrics like<br />click&#8209;through rate
        </td>
    </tr>
</table>
<br />

### Soft hyphen

| Symbol       | HTML entity        |
| :----------: | :----------------: |
| &shy;        | `&shy;`            |

* Use to indicate where a hyphenated break is allowed. It’s invisible otherwise
* Useful in scenarios when the same string is displayed in different layouts 

<table class="dosdonts">
    <tr>
        <th>Don’t</th>
        <th>Do</th>
    </tr>
    <tr>
        <td>
            SEO-<br />friendly
        </td>
        <td>
            SEO­<br />friendly
        </td>
    </tr>
</table>
<br />

## Non-breaking space

| Symbol       | HTML entity        |
| :----------: | :----------------: |
| &nbsp;       | `&nbsp;`           |

* Use to keep the words "glued"
> Use ⌥+space on MacOS to insert

<table class="dosdonts">
    <tr>
        <th>Don’t</th>
        <th>Do</th>
    </tr>
    <tr>
        <td>
            Click here to<br /> subscribe
        </td>
        <td>
            Click here<br />to&nbsp;subscribe
        </td>
    </tr>
</table>
<br />

## Quotation marks and apostrophe

### Quotation marks

| Symbol       | HTML entity        |
| :----------: | :----------------: |
| &ldquo;      | `&ldquo;`          |
| &rdquo;      | `&rdquo;`          |

* Use double curly quotation marks
* Include periods inside the quotation marks
* Dashes, semicolons, exclamation points, and question marks go inside the quotation mark only if they relate to the quotation
* Use when quoting UI text, if text formatting is not available

<table class="dosdonts">
    <tr>
        <th>Don’t</th>
        <th>Do</th>
    </tr>
    <tr>
        <td>
            "Project name"
        </td>
        <td>
            “Project name”
        </td>
    </tr>
    <tr>
        <td>
            Search for “small business websites”.
        </td>
        <td>
            Search for “small business websites.”
        </td>
    </tr>
    <tr>
        <td>
            Click “How can you help”?
        </td>
        <td>
            Click “How can you help?”
        </td>
    </tr>
    <tr>
        <td>
            Enter the “My Profile” section
        </td>
        <td>
            Enter the **My Profile** section
        </td>
    </tr>
</table>
<br />

### Apostrophe

| Symbol       | HTML code          |
| :----------: | :----------------: |
| &rsquo;      | `&rsquo;`          |

* Use the curly style, just like for the quotation marks

<table class="dosdonts">
    <tr>
        <th>Don’t</th>
        <th>Do</th>
    </tr>
    <tr>
        <td>
            What's new
        </td>
        <td>
            What’s new
        </td>
    </tr>
</table>
<br />

## Period

* Use in numbered lists
* Include in quotation marks and brackets
* Use with shortened forms of words (mainly in table columns)

<table class="dosdonts">
    <tr>
        <th>Don’t</th>
        <th>Do</th>
    </tr>
    <tr>
        <td>
            5. If the error persists, contact us
        </td>
        <td>
            5. If the error persists, contact us.
        </td>
        <tr>
        <td>
            Click the edit button next to “Billing information”.
        </td>
        <td>
            Click the edit button next to “Billing information.”
        </td>
            <tr>
        <td>
            Position → Pos
        </td>
        <td>
            Position → Pos.
        </td>
    </tr>
    <tr>
        <td>
            ==Cookie Policy.==
        </td>
        <td>
            ==Cookie Policy==
        </td>
    </tr>
    </tr>
    </tr>
</table>

**Omit:**
* in headings
* in placeholders
* in checkboxes
* in lists with bullets and icons
* in tooltips that serve as labels for icons or display the element’s full name
* after URLs

<table class="dosdonts">
    <tr>
        <th>Don’t</th>
        <th>Do</th>
    </tr>
    <tr>
        <td>
            ☑️ Remind later.
        </td>
        <td>
            ☑️ Remind later
        </td>
    </tr>
    <tr>
        <td>
            ???
        </td>
        <td>
            ???
        </td>
    </tr>
    <tr>
        <td>
            Your competitor https://rival.com.
        </td>
        <td>
            Your competitor https://rival.com
        </td>
    </tr>
</table>
<br />

## Lists

* No period:
– bulleted lists (**But:** if there’s more than one sentence in a bullet—make all bullets end with periods)
– lists with icons
* Add period in:
– numbered lists
* Use sentence case capitalization
> Use numbered lists for a sequence of actions!

<table class="dosdonts">
    <tr>
        <th>Don’t</th>
        <th>Do</th>
    </tr>
    <tr>
        <td>
            Profile settings.
        </td>
        <td>
            Profile settings
        </td>
        <tr>
        <td>
            1. Open the **Billing and Account** Tab
        </td>
        <td>
            1. Open the Billing and Account Tab.
        </td>
    </tr>
    </tr>
</table>
<br />

## Special symbols

### Ampersand

| Symbol       | HTML entity        |
| :----------: | :----------------: |
| &amp;        | `&amp;`            |

* Enclose in spaces
* Avoid. If there’s enough space—always use “and”

<table class="dosdonts">
    <tr>
        <th>Don’t</th>
        <th>Do</th>
    </tr>
    <tr>
        <td>
            Plans&Pricing
        </td>
        <td>
            Plans & Pricing
        </td>
        <tr>
        <td>
            Questions & Answers
        </td>
        <td>
            Questions and Answers
        </td>
    </tr>
    </tr>
</table>
<br />

### Number sign

| Symbol       | HTML code          |
| :----------: | :----------------: |
| &#35;        | `&#35;`            |

* Omit the space after the sign

<table class="dosdonts">
    <tr>
        <th>Don’t</th>
        <th>Do</th>
    </tr>
    <tr>
        <td>
            # 1, # 3–6
        </td>
        <td>
            #1, #3–6
        </td>
    </tr>
</table>
<br />

### Percent sign

| Symbol       | HTML entity        |
| :----------: | :----------------: |
| &percnt;     | `&percnt;`         |

* In a column name, use at the end of the name preceded by a space
* Omit the space before the percent sign
> Exception: German, French, Swedish languages

<table class="dosdonts">
    <tr>
        <th>Don’t</th>
        <th>Do</th>
    </tr>
    <tr>
        <td>
            %Traffic
        </td>
        <td>
            Traffic %
        </td>
        <tr>
        <td>
            156 %
        </td>
        <td>
            156%
        </td>
    </tr>
    </tr>
</table>
<br />

### Minus and plus signs

| Symbol       | HTML entity        |
| :----------: | :----------------: |
| &minus;      | `&minus;`          |
| &plus;       | `&plus;`           |

* Omit the spaces between the sign and a numeric value
* Use to show changes in metrics
* If you cannot use the minus character for some reason, use the en dash

<table class="dosdonts">
    <tr>
        <th>Don’t</th>
        <th>Do</th>
    </tr>
    <tr>
        <td>
            190 + countries
        </td>
        <td>
            190&plus; countries
        </td>
        <tr>
        <td>
            -45%
        </td>
        <td>
            &minus;45%
        </td>
    </tr>
    </tr>
</table>
<br />

### Slash

| Symbol       | HTML entity        |
| :----------: | :----------------: |
| &#8725;      | `&#8725;`          |

* Omit the spaces around the sign

<table class="dosdonts">
    <tr>
        <th>Don’t</th>
        <th>Do</th>
    </tr>
    <tr>
        <td>
            24 / 7 competitor tracking
        </td>
        <td>
            24/7 competitor tracking
        </td>
    </tr>
</table>
<br />

### Multiplication sign

| Symbol       | HTML entity        |
| :----------: | :----------------: |
| &times;      | `&times;`          |

* Avoid using the “x” letter

<table class="dosdonts">
    <tr>
        <th>Don’t</th>
        <th>Do</th>
    </tr>
    <tr>
        <td>
            1080 x 1920 px
        </td>
        <td>
            1080 &times; 1920 px
        </td>
    </tr>
</table>
