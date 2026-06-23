---
title: Modals
---

Every modal should read as a single coherent thought — title, body, and button connected into one sentence.

## The rule

Treat a modal window (or any kind of window) as a single "sentence." It makes it easier for you to follow a structure, and easier for everyone else to see patterns and follow them. Every full sentence has a subject (usually a title), a predicate (a button), and everything in between that describes the subject or features of the subject.

## Simple modals

A simple modal is a short "sentence." It only contains a title, a body, and one or several buttons.

- Never start with "Are you sure" — get straight to the point.
- Don't replace action words or terms with synonyms.

<DosDonts>
    <template #dont>
        Are you sure you want to delete the file?
    </template>
    <template #do>
        Delete file?
    </template>
</DosDonts>

<DosDonts>
    <template #dont>
        Delete file? It cannot be restored. [Remove]
    </template>
    <template #do>
        Delete file? It cannot be restored. [Delete]
    </template>
</DosDonts>

## Complex windows

Complex windows are longer "sentences." Apply the same rules as for a simple modal, plus use the same wording pattern for the same elements.

Good example:

- (checkbox) Remove competitor mentions
- (checkbox) Send a copy to the team
- (switch) AI Summary
- (switch) Regular update
