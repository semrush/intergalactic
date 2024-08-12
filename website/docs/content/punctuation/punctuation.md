---
title: Punctuation and special symbols
---

## Dashes and hyphens

### Em dash

| Symbol       | HTML entity        |
| :----------: | :----------------: |
| &mdash;      | `&mdash;`          |

* Use sparingly in sentences in place of a comma or colon
* Omit the spaces on both sides of the dash

<DosDonts>
    <template #dont>
        It makes us sound like <nobr>Semrush &mdash; regardless</nobr>
        of who the person behind the communication is.
    </template>
    <template #do>
        It makes us sound like <nobr>Semrush&mdash;regardless</nobr>
        of who the person behind the communication is.
    </template>
</DosDonts>

### En dash

| Symbol       | HTML entity        |
| :----------: | :----------------: |
| &ndash;      | `&ndash;`          |

* Use in a range of numbers, dates, and times
* Use to indicate an empty value in tables
* Omit the spaces on both sides of the dash

<DosDonts>
    <template #dont>
        <p>100 &ndash; 100</p>
        <p>Sep 5 &ndash; Oct 4, 2016</p>
        <p>Sep 5, 2016 &ndash; Jan 4, 2017</p>
    </template>
    <template #do>
        <p>100&ndash;1000</p>
        <p>Sep 5&ndash;Oct 4, 2016 </p>
        <p>Sep 5, 2016&ndash;Jan 4, 2017</p>
    </template>
</DosDonts>

### Hyphen

| Symbol       | HTML entity   |
| :----------: | :-----------: |
| -            | `&hyphen;`    |

Use for telephone numbers and compound modifiers.

<DosDonts>
    <template #dont>
        <p>703&ndash;555&ndash;6593</p>
        <p>AI&ndash;powered</p>
    </template>
    <template #do>
        <p>703-555-6593</p>
        <p>AI-powered</p>
    </template>
</DosDonts>

### Non-breaking hyphen

| Symbol       | HTML code          |
| :----------: | :----------------: |
| &#8209;      | `&#8209;`          |

Use to prevent unwanted line breaks.

<DosDonts>
    <template #dont>
        Metrics like click-<br />through rate
    </template>
    <template #do>
        Metrics like<br />click&#8209;through rate
    </template>
</DosDonts>

### Soft hyphen

| Symbol       | HTML entity        |
| :----------: | :----------------: |
| &shy;        | `&shy;`            |

* Use to indicate where a hyphenated break is allowed. It’s invisible otherwise
* Useful in scenarios when the same string is displayed in different layouts 

<DosDonts>
    <template #dont>
        SEO-<br />friendly
    </template>
    <template #do>
        SEO­<br />friendly
    </template>
</DosDonts>

## Non-breaking space

| Symbol       | HTML entity        | Windows shortcut | MacOS shortcut |
| :----------: | :----------------: | :--------------: | :------------: |
| &nbsp;       | `&nbsp;`           | `Alt` + `255`    | ⌥ `Space`      |

Use to keep the words “glued.”

<DosDonts>
    <template #dont>
        Click here to<br /> subscribe
    </template>
    <template #do>
        Click here<br />to&nbsp;subscribe
    </template>
</DosDonts>

## Quotation marks and apostrophe

### Quotation marks

| Symbol       | HTML entity        | Windows shortcut | MacOS shortcut |
| :----------: | :----------------: | :--------------: | :------------: |
| &ldquo;      | `&ldquo;`          | `Alt` + `0147`   | ⌥ [            |
| &rdquo;      | `&rdquo;`          | `Alt` + `0148`   | ⌥ ⇧ [          |

* Use double curly quotation marks
* Include periods inside the quotation marks
* Dashes, semicolons, exclamation points, and question marks go inside the quotation mark only if they relate to the quotation
* Use when quoting UI text, if text formatting is not available

<DosDonts>
    <template #dont>
        <p>"Project name"</p>
        <p>Search for “small business websites”.</p>
        <p>Click “How can you help”?</p>
        <p>Enter the “My Profile” section</p>
    </template>
    <template #do>
        <p>“Project name”</p>
        <p>Search for “small business websites.”</p>
        <p>Click “How can you help?”</p>
        <p>Enter the <b>My Profile</b> section</p>
    </template>
</DosDonts>

### Apostrophe

| Symbol       | HTML code          | Windows shortcut | MacOS shortcut |
| :----------: | :----------------: | :--------------: | :------------: |
| &rsquo;      | `&rsquo;`          | `Alt` + `0146`   | ⌥ ⇧ ]          |

Use the curly style, just like for the quotation ‘a‘ ’marks

<DosDonts>
    <template #dont>
        What's new
    </template>
    <template #do>
        What’s new
    </template>
</DosDonts>

## Period

* Use in numbered lists
* Include in quotation marks and brackets
* Use with shortened forms of words (mainly in table columns)

<DosDonts>
    <template #dont>
        <p>5. If the error persists, contact us</p>
        <p>Click the edit button next to “Billing information”.</p>
        <p>Position → Pos</p>
        <p><u style="color: var(--intergalactic-text-link)">Cookie Policy.</u></p>
    </template>
    <template #do>
        <p>5. If the error persists, contact us.</p>
        <p>Click the edit button next to “Billing information.”</p>
        <p>Position → Pos.</p>
        <p><u style="color: var(--intergalactic-text-link)">Cookie Policy</u></p>
    </template>
</DosDonts>

**Omit:**
* in headings
* in placeholders
* in checkboxes
* in lists with bullets and icons
* in tooltips that serve as labels for icons or display the element’s full name
* after URLs

<DosDonts>
    <template #dont>
        <img src="static/period-dont.png" style="margin: auto" />
        <p><input type="checkbox"> Remind later.</p>
        <p>Your competitor <span style="color: var(--intergalactic-text-link)">https://rival.com</span>.</p>
    </template>
    <template #do>
        <img src="static/period-do.png" style="margin: auto" />
        <p><input type="checkbox"> Remind later</p>
        <p>Your competitor <span style="color: var(--intergalactic-text-link)">https://rival.com</span></p>
    </template>
</DosDonts>

## Lists

* No period in bulleted lists and lists with icons<br/>(**But:** if there’s more than one sentence in a bullet—make all bullets end with periods)
* Add period in numbered lists
* Use sentence case capitalization

::: warning NOTE
Use numbered lists for a sequence of actions!
:::

<DosDonts>
    <template #dont>
        <p>Profile settings.</p>
        <p>1. Open the <b>Billing and Account</b> Tab</p>
    </template>
    <template #do>
        <p>Profile settings</p>
        <p>1. Open the <b>Billing and Account</b> Tab.</p>
    </template>
</DosDonts>

## Special symbols

### Ampersand

| Symbol       | HTML entity        |
| :----------: | :----------------: |
| &amp;        | `&amp;`            |

* Enclose in spaces
* Avoid. If there’s enough space—always use “and”

<DosDonts>
    <template #dont>
        <p>Plans&Pricing</p>
        <p>Questions & Answers</p>
    </template>
    <template #do>
        <p>Plans & Pricing</p>
        <p>Questions and Answers</p>
    </template>
</DosDonts>

### Number sign

| Symbol       | HTML code          |
| :----------: | :----------------: |
| &#35;        | `&#35;`            |

Omit the space after the sign.

<DosDonts>
    <template #dont>
        # 1, # 3–6
    </template>
    <template #do>
        #1, #3–6
    </template>
</DosDonts>

### Percent sign

| Symbol       | HTML entity        |
| :----------: | :----------------: |
| &percnt;     | `&percnt;`         |

* In a column name, use at the end of the name preceded by a space
* Omit the space before the percent sign<br>
(**Exception:** German, French, Swedish languages)

<DosDonts>
    <template #dont>
        <p>%Traffic</p>
        <p>156 %</p>
    </template>
    <template #do>
        <p>Traffic %</p>
        <p>156%</p>
    </template>
</DosDonts>

### Minus and plus signs

| Symbol       | HTML entity        |
| :----------: | :----------------: |
| &minus;      | `&minus;`          |
| &plus;       | `&plus;`           |

* Omit the spaces between the sign and a numeric value
* Use to show changes in metrics
* If you cannot use the minus character for some reason, use the en dash

<DosDonts>
    <template #dont>
        <p>190 + countries</p>
        <p>-45%</p>
    </template>
    <template #do>
        <p>190&plus; countries</p>
        <p>&minus;45%</p>
    </template>
</DosDonts>

### Slash

| Symbol       | HTML entity        |
| :----------: | :----------------: |
| &#8725;      | `&#8725;`          |

Omit the spaces around the sign.

<DosDonts>
    <template #dont>
        24 / 7 competitor tracking
    </template>
    <template #do>
        24/7 competitor tracking
    </template>
</DosDonts>

### Multiplication sign

| Symbol       | HTML entity        |
| :----------: | :----------------: |
| &times;      | `&times;`          |

Avoid using the “x” letter.

<DosDonts>
    <template #dont>
        1080 x<span style="font-size: 0">.</span> 1920 px
        <!-- the period prevents Vitepress from converting x to &times; -->
    </template>
    <template #do>
        1080 &times; 1920 px        
    </template>
</DosDonts>
