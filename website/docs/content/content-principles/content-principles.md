---
title: Content principles
---

## Use user-centered language

People don't care about your 50th new cool feature. They want their task complete as quickly and easily as possible. All writing must prioritize user goals and comprehension over business jargon or marketing speak.

<DosDonts>
    <template #dont>
        Transaction declined due to insufficient funds.
    </template>
    <template #do>
        Your payment failed.
    </template>
</DosDonts>

Eliminate "feature-speak". Always make sure the texts show benefit for the user.

<DosDonts>
    <template #dont>
        Fixing this issue is good for your visibility.
    </template>
    <template #do>
        Fixing this issue will allow Google to index your website.
    </template>
</DosDonts>

Cut corporate filler — phrases that exist to sound official rather than communicate something. In the context of web content and quick scanning you don't sound polite, you sound annoying.

<DosDonts>
    <template #dont>
        Please be advised that your subscription is due for renewal.
    </template>
    <template #do>
        Your subscription is up for renewal.
    </template>
</DosDonts>

## Write for scannability

People on the internet don't read like they read books. They scan, usually in the F pattern. That's why it's important to:

- Put important information at the front (front-loading).
- Keep sentences under 20 words when possible. If you need to take a breath to finish reading the sentence out loud — it's a bad sign.
- Have one idea per sentence, split complex thoughts.

<DosDonts>
    <template #dont>
        Your trial ends in 3 days and if you don't upgrade you will lose access to all your data.
    </template>
    <template #do>
        Your trial ends in 3 days. Upgrade to keep your data.
    </template>
</DosDonts>

- Use actionable language. Every button, link, and CTA must clearly indicate what happens when clicked. Never say "Click here".

Good examples: Save draft, Publish article, Delete account.

**Got it** — Exception. Use only for dismissible informational modals where no critical action is taken and the user is simply acknowledging they've read the information.

<DosDonts>
    <template #dont>
        <p>Ok, got it</p>
        <p>OK/okay</p>
        <p>Submit</p>
    </template>
    <template #do>
        Got it
    </template>
</DosDonts>

- Avoid using "We" in most cases. Focus on the user's experience.

<DosDonts>
    <template #dont>
        We've added a [feature name] to help you with your task.
    </template>
    <template #do>
        [Feature name] can help you with your task.
    </template>
</DosDonts>

- Only use "we" in cases when other wording feels unnatural or too wordy.

<DosDonts>
    <template #dont>
        Duplicate folders have been merged to keep your data in one place.
    </template>
    <template #do>
        We've merged duplicate folders to keep your data in one place.
    </template>
</DosDonts>

- Avoid "please" unless asking for something optional or inconvenient.

<DosDonts>
    <template #dont>
        Please add keywords to start tracking them.
    </template>
    <template #do>
        <p>Please tell us what you think about Position Tracking.</p>
        <p>Add keywords to start tracking them.</p>
    </template>
</DosDonts>

- Avoid passive voice unless the action is product-side.

<DosDonts>
    <template #dont>
        The report was deleted by the owner.
    </template>
    <template #do>
        <p>The report owner deleted the report.</p>
        <p>The report expired and has been deleted.</p>
    </template>
</DosDonts>

- Naturally connect texts within one UI element — the title, body, and button should form one coherent thought.

<DosDonts>
    <template #dont>
        Modal window: Title "Explore more keywords for your topic" + button "Start"
    </template>
    <template #do>
        Modal window: Title "Explore more keywords for your topic" + button "Explore keywords"
    </template>
</DosDonts>

- Cut unnecessary adverbs ("successfully") or those that reflect a writer's opinion ("quickly", "easily").
- Use parallel structure in lists.

<DosDonts>
    <template #dont>
        <p>1. Fill in the form</p>
        <p>2. Then it should be sent for review.</p>
    </template>
    <template #do>
        <p>1. Fill in the form.</p>
        <p>2. Send it for review.</p>
    </template>
</DosDonts>

- DO NOT break semantic blocks. Keep related information together.

<DosDonts>
    <template #dont>
        Enter the confirmation code to delete your account: 4872
    </template>
    <template #do>
        To delete your account, enter the confirmation code: 4872
    </template>
</DosDonts>

## Conversational writing

Write in a way a person talks to another person, not a system.

- Use contractions — they reduce formality without reducing clarity. Be mindful of how many contractions you use in a sentence. Too many contractions can make things difficult to read.

<DosDonts>
    <template #dont>
        You are almost done.
    </template>
    <template #do>
        You're almost done.
    </template>
</DosDonts>

It's okay to use a full version if you want to highlight an action:

> It will be permanently deleted.

- Read your text aloud. If it sounds unnatural spoken, rewrite it. Passive, overly formal, or instruction-heavy sentences fail this test immediately.

<DosDonts>
    <template #dont>
        Upgrade by clicking the button below.
    </template>
    <template #do>
        Upgrade to keep your data.
    </template>
</DosDonts>

- Match the emotional register of the moment. Conversational doesn't mean casual. An error moment calls for calm and direct tone, a success moment can be warmer.

## Plain language

Writing for a 6th-grade reading level on the Flesch-Kincaid readability scale includes more people. Write with short sentences, use simpler nouns, avoid adverbs and adjectives unless they carry real meaning. Use simple verb tenses (past, present, future) and active voice.

You can check readability using [hemingwayapp.com](https://hemingwayapp.com/).

## Consistency

Within a single tool, tab, window:

- Use the same term for the same concept. Don't create new notions without need.
- Don't use synonyms for the same actions, e.g. "delete" and "remove".
- Keep button patterns consistent: all verbs only or all verb+noun.

## Is content the issue?

Copy won't ever make up for poor experience design. Sometimes removing stuff, adding or revising interactions, or leaning on visual design works better.

## Testing

What you wrote will probably make sense to your team. Show it to someone who knows nothing about what you're working on.

## UX design principles

Several UX laws apply directly to text — they're based on how the human brain processes information.

### Cognitive load and Miller's law

The amount of information presented at once should be manageable. Break information into short paragraphs, use headings, and control the number of decisions users are asked to make at once.

### Selective attention

Important info should always be visible and close to a CTA or an input field. No matter how well you describe how something works in a hint text or a tooltip, users will most likely never see it unless they really need to.

### Serial position effect

Placing key information or actions in the beginning or the end will make it more memorable. Never hide the most important thing in the middle of a list, paragraph, or window.

## Localization

If your content will be localized, consider the following:

- Avoid idioms and word play that don't translate well.
- Avoid colloquial language and slang.
- Remember about character limits and allow for extra space. English text tends to expand to 30% and more in translation.
- When adding variables into text, remember that languages have different structures. What looks okay in UI in English can simply not work in another language.
- Try to use gender-neutral language.

<DosDonts>
    <template #dont>
        Your colleague shared this report with you. Contact him for more information.
    </template>
    <template #do>
        This report is owned by another team member. Contact the owner (/them) to request access.
    </template>
</DosDonts>

- (For frontend) Don't break one sentence into several parts: word order in many languages does not match word order in English.

If in doubt, always consult with localization managers.

## Accessibility and inclusivity

### Alt text

Add alt text only if the image brings additional value to the rest of the content. Do not use alt text for purely decorative images (graphics on a landing page, charts or graphs with no real data).

- Describe the image as objectively as possible
- Provide context to the image
- Use sentence case
- Capitalize proper nouns

<DosDonts>
    <template #dont>
        alt="shoe"
    </template>
    <template #do>
        <p>alt="Black Converse canvas shoe"</p>
        <p>alt="Black Converse canvas shoe with white laces on a white background"</p>
    </template>
</DosDonts>

### Age

Avoid ageist terms. When age context is needed, describe it neutrally. See the Glossary.

### Race and ethnicity

Default to the generally accepted descriptors "person of color," "POC," or "BIPOC". See the Glossary.

### Words and phrases to avoid

- Confusing and offensive acronyms (WTF, WTH, KYS, IYKYK, STFU, KMA, FU, FFS)
- Profanity and curse words
- Innuendos (sexual-related innuendos, dirty jokes, etc.)
- Things that can set off a safe-search filter (bomb, knife, gun, sex, etc.)

### Gender and sexuality

- Default to "they/their" and "you/your" for pronouns. Avoid "him/his" or "she/her" — never assume how someone identifies. When in doubt, use their name. If they have pronouns listed publicly, you may use those.
- Use gender-neutral terms: businessperson over businessman or businesswoman.

### Disabilities and mental health

Some phrases may seem ordinary but can be insensitive. Avoid these as descriptions:

- blind
- crazy
- cripple or crippling
- lame

## Creating terms and definitions

Define a word in simple and familiar terms. A definition should not make the reader look up explanations of other words.

### DO NOT use the same term to define a term

<DosDonts>
    <template #dont>
        Chair — a chair used for sitting, typically found in homes and offices.
    </template>
    <template #do>
        Chair — a piece of furniture with four legs and a back, designed for one person to sit on.
    </template>
</DosDonts>

### When referencing another term, use the term itself, not its definition

<DosDonts>
    <template #dont>
        Coffee is a beverage brewed from roasted, ground plant seeds.
    </template>
    <template #do>
        Coffee is a beverage brewed from roasted, ground coffee beans*.<br>*Coffee bean is a seed from the Coffea plant and the source for coffee.
    </template>
</DosDonts>

### A definition of a noun term cannot be a verb

<DosDonts>
    <template #dont>
        Cup — helps you bring tea or coffee to your mouth.
    </template>
    <template #do>
        Cup — a small container used to hold liquids.
    </template>
</DosDonts>
