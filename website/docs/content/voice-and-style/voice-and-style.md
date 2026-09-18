---
title: Voice and style
---

## Brand voice in product

Master brand voice is a starting point for multiple channels. It can be referenced for high-energy moments in user flows. See the [Brand Voice](https://drive.google.com/drive/folders/15d-wIWEK7qL5fE6ny_ruNJA_Kda9MPDo) and the [style guide](https://drive.google.com/file/d/1azSeVQYlCIPVummxjLE18e1vydBgnHOl/view?usp=drive_link).

The master brand voice is bold and energetic — but it's a starting point, not a fixed register. Just like a person speaks differently depending on the situation, the brand also adjusts how it speaks. User experience has many moments and each should use its own tone: happy and cheerful for celebration or empathetic for something like changes in pricing.

Voice varies depending on a pattern:

| UX pattern | Voice voltage |
| --- | --- |
| Onboarding and what's new | Medium-high |
| Pricing, sales | Medium-high to medium |
| Feedback | Medium |
| System states (success, loading, failed) | Medium-high to low |
| Warnings | Medium-low to low |
| Errors | Low |

## Capitalization

Use sentence case by default for all elements. It's easier to read and is more natural and approachable.

Only use title case for:

- Page titles (H1)
- Table titles
- Graph titles
- Widget titles
- Chart legends and axis descriptions
- Tabs
- Pills

### Words to capitalize

- Proper nouns
- First word of a title or subtitle
- Nouns, verbs, adjectives, adverbs, pronouns
- First word after a colon or em dash in a heading
- Second part of hyphenated major words: Award-Winning
- Second part of phrasal verbs: Sign Up

### Words NOT to capitalize

- Articles: the, a, an
- Prepositions (under 4 letters): for, with, to, in, on, at
- Conjunctions: and, or, but
- "To" in an infinitive

### Semrush product names

Capitalize the full name when referring to a specific Semrush tool. Use lowercase when referring to the functionality generically.

<DosDontsCopy>
    <template #dont>
        Run Site Audit to check for errors.
    </template>
    <template #do>
        Run a site audit to check for errors.
    </template>
</DosDontsCopy>

### "Toolkit"

Capitalize "Toolkit" only when it's part of an official product name. Otherwise use lowercase.

<DosDontsCopy>
    <template #dont>
        Site Audit is part of the SEO toolkit. It catches critical errors on your site. There are lots more features in this Toolkit too.
    </template>
    <template #do>
        Site Audit is part of the SEO Toolkit. It catches critical errors on your site. There are lots more features in this toolkit too.
    </template>
</DosDontsCopy>

### "Report" and "tool"

Do not capitalize "report" or "tool" unless they are part of an official product name.

<DosDontsCopy>
    <template #dont>
        Organic Positions Report
    </template>
    <template #do>
        Organic Positions report
    </template>
</DosDontsCopy>

| Element | Case |
| --- | --- |
| Page titles | Title case |
| Table / graph / widget titles | Title case |
| Chart legends and axes | Title case |
| Tabs and pills | Title case |
| Modal titles | Sentence case |
| Notice titles | Sentence case |
| Buttons | Sentence case |
| Field labels | Sentence case |
| Checkboxes | Sentence case |
| Menus and dropdowns | Sentence case |
| Tags | Sentence case |
| Links | Sentence case |
| Lists | Sentence case |
| Filter names | Sentence case |

## Punctuation and special symbols

### Oxford commas

Always use the Oxford comma, or serial comma, for a series of items.

<DosDontsCopy>
    <template #dont>
        Semrush offers clear pricing, easy setup and actionable dashboards built for marketers who move fast.
    </template>
    <template #do>
        Semrush offers clear pricing, easy setup, and actionable dashboards built for marketers who move fast.
    </template>
</DosDontsCopy>

### Periods

If your text is a full sentence, add a period. If it's a short, direct phrase — don't. Also use it with shortened forms of words (mainly in table columns) and include in quotation marks and brackets.

Omit in:

- headings
- lists (but: if there's more than one sentence in a bullet — make all bullets end with a punctuation mark)
- placeholders
- checkboxes
- lists with bullets and icons
- tooltips that serve as labels for icons or display the element's full name
- after URLs (not text links)
- lines above and below input fields
- "clean" designs where there are no other elements with periods
- buttons

<DosDontsCopy>
    <template #dont>
        <p>5. If the error persists, contact us</p>
        <p>Click the edit button next to "Billing information".</p>
        <p>Position → Pos</p>
        <p>[Cookie Policy.]</p>
    </template>
    <template #do>
        <p>5. If the error persists, contact us.</p>
        <p>Click the edit button next to "Billing information."</p>
        <p>Position → Pos.</p>
        <p>[Cookie Policy]</p>
    </template>
</DosDontsCopy>

### Semicolons

Don't use semicolons (**;**). They add a formal, academic tone and negatively affect user comprehension in UX writing. Use periods, commas, or em dashes instead.

### Colons

Use colons to offset a list or to join two closely related phrases. If a complete sentence follows a colon, capitalize the first word.

Good examples:

- We'll cover three topics: market changes, ecommerce strategy, and AI fundamentals.
- To rank well, you must follow best practices: Content quality is critical.

### Quotation marks

Only use them when quoting someone's words or referring to a file or asset name. Use curly ("") marks. Don't use quotes when directly referring to interface elements.

<DosDontsCopy>
    <template #dont>
        <p>Search for "small business websites."</p>
        <p>Switch to the "Overview" tab.</p>
    </template>
    <template #do>
        <p>Search for “small business websites.”</p>
        <p>Switch to the Overview tab.</p>
    </template>
</DosDontsCopy>

### Apostrophe

| Symbol | HTML code | Windows shortcut | MacOS shortcut |
| --- | --- | --- | --- |
| ' | `&rsquo;` | Alt + 0146 | ⌥ ⇧ ] |

Use the curly style, just like for the quotation marks.

<DosDontsCopy>
    <template #dont>
        What's new
    </template>
    <template #do>
        What’s new
    </template>
</DosDontsCopy>

### Em dashes

Use sparingly in place of a comma or colon. Include a space before and after the em dash.

<DosDontsCopy>
    <template #dont>
        It makes us sound like Semrush—regardless of who the person behind the communication is.
    </template>
    <template #do>
        It makes us sound like Semrush — regardless of who the person behind the communication is.
    </template>
</DosDontsCopy>

### Parentheses

The only acceptable use of parentheses in UI elements is short supplementary information. To decide whether the information is supplementary or primary, read your text without the part in the parentheses. If it loses its original meaning, the information you consider additional is in fact primary and it should not be in parentheses. If the text keeps the meaning you intend — consider removing the parentheses.

<DosDontsCopy>
    <template #dont>
        Upgrade your plan (to track more prompts)
    </template>
    <template #do>
        Cmd+C (Mac), Ctrl+C (Win)
    </template>
</DosDontsCopy>

### Ampersand

Avoid. If there's enough space — always use "and". If used, enclose in spaces.

<DosDontsCopy>
    <template #dont>
        <p>Plans&Pricing</p>
        <p>Questions & Answers</p>
    </template>
    <template #do>
        <p>Plans & Pricing</p>
        <p>Questions and Answers</p>
    </template>
</DosDontsCopy>

### Number sign

Omit the space after the sign.

<DosDontsCopy>
    <template #dont>
        # 1, # 3–6
    </template>
    <template #do>
        #1, #3–6
    </template>
</DosDontsCopy>

### Percent sign

In a column name, use at the end of the name preceded by a space. Omit the space before the percent sign (Exception: German, French, Swedish languages).

<DosDontsCopy>
    <template #dont>
        <p>%Traffic</p>
        <p>156 %</p>
    </template>
    <template #do>
        <p>Traffic %</p>
        <p>156%</p>
    </template>
</DosDontsCopy>

### Minus and plus signs

| Symbol | HTML entity |
| --- | --- |
| − | `&minus;` |
| + | `&plus;` |

- Omit the spaces between the sign and a numeric value.
- Use to show changes in metrics.
- If you can't use the minus character for some reason, use the en dash.

<DosDontsCopy>
    <template #dont>
        <p>190 + countries</p>
        <p>−45%</p>
    </template>
    <template #do>
        <p>190+ countries</p>
        <p>-45%</p>
    </template>
</DosDontsCopy>

### Slash

Omit the spaces around the sign.

<DosDontsCopy>
    <template #dont>
        24 / 7 competitor tracking
    </template>
    <template #do>
        24/7 competitor tracking
    </template>
</DosDontsCopy>

### Multiplication sign

Avoid using the "x" letter.

<DosDontsCopy>
    <template #dont>
        1080 x 1920 px
    </template>
    <template #do>
        1080 × 1920 px
    </template>
</DosDontsCopy>

## Emojis

Don't use emojis in UI. Never replace words with emojis.
