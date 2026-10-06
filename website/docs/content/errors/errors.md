---
title: Errors
---

How to write calm, blame-free error messages that help users recover quickly.

## Prevent errors

Showing error messages should be a last resort. When you face creating one, ask yourself "Can we prevent this error from happening?" The system should be smart enough to minimize errors in user input or actions. For example, if you expect a particular data format, use an input mask.

## Anatomy of an error message

Regardless of the design component or message length, the most comprehensive error messages include three parts:

1. What happened
2. The underlying cause (if possible)
3. How to fix it

### What happened

This should be the first part of the message, like in a headline (if the UI element allows). Be sure to communicate the general outcome of the error. Use plain language and focus on what it means to the user.

<DosDontsCopy>
    <template #dont>
        Operation failed
    </template>
    <template #do>
        Couldn't send the invitation
    </template>
</DosDontsCopy>

### The cause

It's helpful to have an explanation of why something happened — it can increase the user's understanding of the issue.

<DosDontsCopy>
    <template #dont>
        <p>Cannot connect to server</p>
        <p>Something went wrong</p>
    </template>
    <template #do>
        <p>No Internet connection</p>
        <p>You're offline</p>
    </template>
</DosDontsCopy>

### How to fix it

This part tells the user what they can do about it. Offer a step-by-step resolution in the most simple and actionable way. If there's nothing for them to do, then explain what the product is doing. Offer a path forward within the error state itself, such as a "Try again" or "Go back" button. Linking to a help article can be useful, but only if that article is specific and descriptive to the error's use case.

<DosDontsCopy>
    <template #dont>
        Please try again later.
    </template>
    <template #do>
        Make sure you have admin rights to access this project.
    </template>
</DosDontsCopy>

## Main principles

### Center the language around user goals, not system constraints

Sometimes it seems like the best way to resolve an error is to explain the constraints of the system to the user. But most users don't care about the constraints of the system — they care about accomplishing their goals. Center the language around what the user is trying to accomplish, why that didn't happen, and how they might resolve the error.

### Use plain language, and avoid jargon

Users may not understand server architecture or client-side queries. Don't use internal product or technical jargon in most cases. However, technical terms are different than jargon. If you're confident that your audience would be readily familiar with technical terms, and if such terms are relevant to the message, you can include them.

### Use positive framing to keep the focus on what users can do

While a user will want to know what went wrong, be as clear as possible about what they can do to fix the error, or provide them with an alternative workaround. Sometimes it's simple ("try again in a few minutes") and sometimes the only solution can be time-intensive or potentially frustrating ("contact your IT administrator"). Avoid putting the focus on the problem, what a user can't do, or what they did incorrectly. Instead, offer context and help people understand what they can do.

### Create error states that are specific to each case whenever possible

It may be tempting to write a catch-all error message to accommodate dozens of similar scenarios, but that will tend to be wordier and less concise. Creating multiple, more specific error messages takes additional effort, but it ultimately creates a better user experience.

### While the error should be specific, use generic language

Generic language allows for better localization, and it also reduces the need to write many different versions of messages for similar use cases. It's usually unnecessary to include specific filenames, usernames, or folders because a user can get that context from elsewhere in the UI.

## Writing the message

**Voltage: low**

Lowest voltage in UI. Always stick to the point — avoid overly formal, technical, or alarming styles. Stay calm and blame-free. Every error should tell the user what to do next, not just what went wrong.

Use "please" and "sorry" only when:

- We are to blame for an error (e.g., maintenance on our servers, technical issues)
- The user skipped a required field (we prevent them from continuing)

### Critical

<DosDontsCopy>
    <template #dont>
        Attention! You must enter your domain!
    </template>
    <template #do>
        Enter a valid website, e.g., example.com
    </template>
</DosDontsCopy>

### Non-critical

<DosDontsCopy>
    <template #dont>
        Don't miss opportunities — finish setting up your account now.
    </template>
    <template #do>
        Couldn't create an account, but don't worry — we saved your settings.
    </template>
</DosDontsCopy>
