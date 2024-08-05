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
  <template #dont>It makes us sound like Semrush &mdash; regardless of who the person behind the communication&nbsp;is.</template>
  <template #do>It makes us sound like Semrush&mdash;regardless of who the person behind the communication&nbsp;is.</template>
</DosDonts>
<table class="dosdonts">
    <tr>
        <th>Don’t</th>
        <th>Do</th>
    </tr>
    <tr>
        <td>
            It makes us sound like <nobr>Semrush &mdash; regardless</nobr>
            of who the person behind the communication is.
        </td>
        <td>
            It makes us sound like <nobr>Semrush&mdash;regardless</nobr>
            of who the person behind the communication is.
        </td>
    </tr>
</table>

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
            <p>100 &ndash; 100</p>
            <p>Sep 5 &ndash; Oct 4, 2016</p>
            <p>Sep 5, 2016 &ndash; Jan 4, 2017</p>
        </td>
        <td>
            <p>100&ndash;1000</p>
            <p>Sep 5&ndash;Oct 4, 2016 </p>
            <p>Sep 5, 2016&ndash;Jan 4, 2017</p>
        </td>
    </tr>
</table>

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
            <p>703&ndash;555&ndash;6593</p>
            <p>AI&ndash;powered</p>
        </td>
        <td>
            <p>703-555-6593</p>
            <p>AI-powered</p>
        </td>
    </tr>
</table>

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

## Non-breaking space

| Symbol       | HTML entity        |
| :----------: | :----------------: |
| &nbsp;       | `&nbsp;`           |

* Use to keep the words “glued”

::: tip
Use ⌥+space on MacOS to insert
:::

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
            <p>"Project name"</p>
            <p>Search for “small business websites”.</p>
            <p>Click “How can you help”?</p>
            <p>Enter the “My Profile” section</p>
        </td>
        <td>
            <p>“Project name”</p>
            <p>Search for “small business websites.”</p>
            <p>Click “How can you help?”</p>
            <p>Enter the <b>My Profile</b> section</p>
        </td>
    </tr>
</table>

### Apostrophe

| Symbol       | HTML code          |
| :----------: | :----------------: |
| &rsquo;      | `&rsquo;`          |

* Use the curly style, just like for the quotation marks

::: tip
Use ⌥+' on MacOS to insert a curly apostrophe
:::

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
            <p>5. If the error persists, contact us</p>
            <p>Click the edit button next to “Billing information”.</p>
            <p>Position → Pos</p>
            <p>==Cookie Policy.==</p>
        </td>
        <td>
            <p>5. If the error persists, contact us.</p>
            <p>Click the edit button next to “Billing information.”</p>
            <p>Position → Pos.</p>
            <p>==Cookie Policy==</p>
        </td>
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
            <p>☑️ Remind later.</p>
            <p>Your competitor https://rival.com.</p>
        </td>
        <td>
            <p>☑️ Remind later</p>
            <p>Your competitor https://rival.com</p>
        </td>
    </tr>
</table>
<br />

## Lists

* No period in bulleted lists and lists with icons<br/>(**But:** if there’s more than one sentence in a bullet—make all bullets end with periods)
* Add period in numbered lists
* Use sentence case capitalization

::: tip
Use numbered lists for a sequence of actions!
:::

<table class="dosdonts">
    <tr>
        <th>Don’t</th>
        <th>Do</th>
    </tr>
    <tr>
        <td>
            <p>Profile settings.</p>
            <p>1. Open the <b>Billing and Account</b> Tab</p>
        </td>
        <td>
            <p>Profile settings</p>
            <p>1. Open the <b>Billing and Account</b> Tab.</p>
        </td>
    </tr>
</table>

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
            <p>Plans&Pricing</p>
            <p>Questions & Answers</p>
        </td>
        <td>
            <p>Plans & Pricing</p>
            <p>Questions and Answers</p>
        </td>
    </tr>
</table>

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

### Percent sign

| Symbol       | HTML entity        |
| :----------: | :----------------: |
| &percnt;     | `&percnt;`         |

* In a column name, use at the end of the name preceded by a space
* Omit the space before the percent sign<br>
(**Exception:** German, French, Swedish languages)

<table class="dosdonts">
    <tr>
        <th>Don’t</th>
        <th>Do</th>
    </tr>
    <tr>
        <td>
            <p>%Traffic</p>
            <p>156 %</p>
        </td>
        <td>
            <p>Traffic %</p>
            <p>156%</p>
        </td>
    </tr>
</table>

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
            <p>190 + countries</p>
            <p>-45%</p>
        </td>
        <td>
            <p>190&plus; countries</p>
            <p>&minus;45%</p>
        </td>
    </tr>
</table>

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
            1080 x<span style="font-size: 0">.</span> 1920 px
            <!-- the period prevents Vitepress from converting x to &times; -->
        </td>
        <td>
            1080 &times; 1920 px
        </td>
    </tr>
</table>
