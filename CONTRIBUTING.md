## How to make changes

First of all, thank you for your interest in the library. We'd love to accept your fixes and improvements ✨

We have templates for two types of issues: a Feature Request and a Bug. If you want to submit a bug please be patient and fill all required fields. This will help us to define the problem.

Try to follow this advice to fill a great issue:

- Check that issue tracker does not contain issues similar to your.
- Use a clear and descriptive title for the issue to identify the suggestion.
- Provide a step-by-step description of the suggested enhancement in as many details as possible.
- Provide specific examples to demonstrate the steps. Include copy/pasteable snippets which you use in those examples, as Markdown code blocks.
- Describe the current behavior and explain which behavior you expected to see instead and why.
- Include screenshots and animated GIFs which help you demonstrate the steps to reproduce issue.
- Explain why this enhancement would be useful to most Ui-kit users.
- Specify which version of UI-kit you're using.
- Contributions to Intergalactic UI-kit should be made in the form of GitHub pull requests. Each pull request will be reviewed by a core contributor (someone with permission to land patches) and either landed in the main tree or given feedback for changes that would be required.

##Pull Request Checklist

- Branch from the master branch and, if needed, rebase to the current master branch before submitting your pull request. If it doesn't merge cleanly with master you may be asked to rebase your changes.
- Commits should be as small as possible, while ensuring that each commit is correct independently (i.e., each commit should compile and pass tests).
- Don't put submodule updates in your pull request unless they are to landed commits.
- If your patch is not getting reviewed or you need a specific person to review it, you can @-reply a reviewer asking for a review in the pull request or a comment.
- Add tests relevant to the fixed bug or new feature.

## Code review

All changes, including changes by the project participants, require code reviewing.
Refer to the Github help for more usage information about
[pull-request](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests).

## Separating components

We create an `NPM` package for each **independent** component.
This allows us to release and manage dependencies as flexible as we can.

### Dependent component

A dependent component is an entity that depends on another component, most often a parent,
it cannot be used alone or with other independent components.

For example, a table head (TableHead) cannot be used without a table (Table) or somewhere in another component.

### Independent component

An independent component is an entity that can be reused, which has its own public API and CHANGELOG.

For example, Link, although logically part of typography, is, in practice, a separate component.

### NPM package

An `NPM` package is a container that has its own version and changelog.

It can contain:

- one component, for example a Button
- several **dependent** components, for example a table (Table, TableHead, TableRow, etc.)
- HOC component extending functionality, for example keyboard navigation (WithKeyboardFocus)
- meta package, for example a list of css variables with colors

##Conduct
All code in this repository is under the MIT License. By sending a pull request you agree to the terms of contributing under the [MIT license](https://github.com/semrush/intergalactic/blob/master/LICENSE)
