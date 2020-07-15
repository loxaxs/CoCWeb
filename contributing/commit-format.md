# Commit format

Template markers starting by `??` are optional

## Complete format

> {headline}
>
> {?? keywords}
>
> {?? long-description}

### Headline

The headline may follow any of the following formats:

- > {category}
- > {category}: {description}
- > {category} ({context})
- > {category} ({context}): {description}
- > {category} ({verb})
- > {category} ({verb}): {description}
- > {category} ({context} {verb})
- > {category} ({context} {verb}): {description}
- > {category} ({verb} {object})
- > {category} ({verb} {object}): {description}

If the commit contains one or more flags, they should be put to the right of the leftmost word before `:`. Example:

- > {category}{flag}
- > {category}{flag}: {description}
- > {category} ({context}{flag}): {description}
- > {category} ({verb}{flag}): {description}
- > {category} ({context} {verb}{flag}): {description}
- > {category} ({verb} {object}{flag}): {description}

If using the form `({context} {verb})`, the context can be anything. If using the form `({verb} {object})`, the object must be what the verb applies to.

## Commit category

Example of category list:

- comment
- style
- refactor
- code

The categories are sorted from weakest to strongest. The **category of a commit** is the category **of the strongest of its changes**. The system of commit strength makes it easier to dig up commits which introduce breaking changes.

This means that to determine the category of a commit, you should proceed as follows: For each change a commit does, you should go through the category list from top to bottom, and pick the first that maches the change (the weakest category). The commit kind is the lowest category picked (the strongest of the categories picked).

## Commit flag

The recommended order for commit flags is the one defined in the [commit-word-list](./commit-word-list.md/#commit-flag-list).

Example of flag groups:

- `+~;` "major work in progress part of an unfinished series"
- `-~` "minor work in progress"
- `+~` "major work in progress"
- `-!` "minor last of a series of commits"

## Commit effect
