---
title: Buttons
---

Button labels should feel like the start of a new action — specific, verb-led, and connected to the surrounding context.

## Consider context

- Focus your attention on the expected outcome (What is the user trying to accomplish?)
- Connect the action with the result (What happens before? What happens after? "Can we say [Update] here, if it was [Renew] on the previous/next step?")
- Connect the action with the title or other text (What's the context — modal, form, standalone button? Is everything clearly connected?)

## Writing buttons

The button should feel like a start of a new action and kind of a forward motion. Use verbs such as:

- Create / launch / delete / connect / send / view
- Learn more (use sparingly)

ALWAYS match the button to the title.

<DosDonts>
    <template #dont>
        Title "Explore more keywords for your topic" + button "Start"
    </template>
    <template #do>
        Title "Explore more keywords for your topic" + button "Explore keywords"
    </template>
</DosDonts>

- Mostly use verb + noun format (e.g., "Save document" not just "Save"). Always consider context: it can be "Export all data" if there are multiple options to choose from AND "Export data" when it's just one option.
- Clearly indicate the result of clicking the button.
- Don't use articles.
- Use sentence case.
- Try to keep the text under 3 words.
- Avoid vague labels like "Submit" or "Click here".

<DosDonts>
    <template #dont>
        Submit (too vague — doesn't indicate what happens next)
    </template>
    <template #do>
        Save changes (Edit profile flow — indicates content will be preserved)
    </template>
</DosDonts>

Good example: Create account (Registration flow — clear outcome for the user)

## Corner cases

If the button is passive (Privacy policy, About us, etc.) then it's most likely to be a link. If you absolutely need a button, say "Read privacy policy" or "View terms of service".
